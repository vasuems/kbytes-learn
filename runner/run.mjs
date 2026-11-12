// Runs tip code and records whether it prints what the tip says it prints.
//
//   node runner/run.mjs --out results.json            tips that have no result for their current code
//   node runner/run.mjs --all --out results.json      every tip
//   node runner/run.mjs --selftest                    runner/selftest cases (some are meant to fail)
//   add --fail-on-failure to exit 1 when a tip fails (used for pull requests)
//
// Tip code is untrusted (written by AI or by anyone opening a pull request). It only ever runs
// inside `docker run --network none --read-only --user 65534` with time, memory and process limits,
// and this job holds no secrets and a read-only GitHub token.
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { LANGUAGES, languageOf, normalizeOutput, tipHash } from "./languages.mjs";

const root = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const KOTLIN_VERSION = "2.0.21";
const MAX_OUTPUT = 64 * 1024;

export function parseFrontMatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const data = {};
  if (!match) return data;
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (pair) data[pair[1]] = pair[2].trim().replace(/^(['"])(.*)\1$/, "$2");
  }
  return data;
}

function findTips(base) {
  const tips = [];
  if (!existsSync(base)) return tips;
  for (const group of readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const tip of readdirSync(join(base, group.name), { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const dir = join(base, group.name, tip.name);
      const mdPath = join(dir, "tip.md");
      if (!existsSync(mdPath)) continue;
      const meta = parseFrontMatter(readFileSync(mdPath, "utf8"));
      const language = languageOf(meta.language);
      const file = language ? LANGUAGES[language].file : null;
      const code = file && existsSync(join(dir, file)) ? readFileSync(join(dir, file), "utf8") : null;
      const expectedPath = join(dir, "expected.txt");
      const expected = existsSync(expectedPath) ? readFileSync(expectedPath, "utf8") : "";
      tips.push({ dir, path: relative(root, dir).replaceAll("\\", "/"), meta, language, code, expected });
    }
  }
  return tips.sort((a, b) => a.path.localeCompare(b.path));
}

function ensureKotlin() {
  const target = join(process.env.RUNNER_TEMP ?? "/tmp", `kotlinc-${KOTLIN_VERSION}`);
  if (existsSync(join(target, "kotlinc", "bin", "kotlinc"))) return join(target, "kotlinc");
  mkdirSync(target, { recursive: true });
  const zip = join(target, "kotlinc.zip");
  const url = `https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip`;
  if (spawnSync("curl", ["-fsSL", "-o", zip, url], { stdio: "inherit" }).status !== 0) throw new Error("Could not download kotlinc");
  if (spawnSync("unzip", ["-q", zip, "-d", target], { stdio: "inherit" }).status !== 0) throw new Error("Could not unzip kotlinc");
  return join(target, "kotlinc");
}

const pulled = new Set();
function pull(image) {
  if (pulled.has(image)) return;
  const result = spawnSync("docker", ["pull", "--quiet", image], { stdio: "inherit" });
  if (result.status !== 0) throw new Error(`Could not pull ${image}`);
  pulled.add(image);
}

function runContainer(tip, spec, kotlinDir) {
  return new Promise((done) => {
    const name = `tip-${process.pid}-${Math.random().toString(36).slice(2, 10)}`;
    const dockerArgs = [
      "run", "--rm", "--name", name, "--network", "none", "--read-only",
      "--tmpfs", "/tmp:rw,exec,size=512m", "--user", "65534:65534", "--workdir", "/tmp",
      "--memory", spec.memory ?? "512m", "--cpus", "1", "--pids-limit", "256",
      "--security-opt", "no-new-privileges", "--cap-drop", "ALL",
      "-e", "HOME=/tmp", "-v", `${tip.dir}:/tip:ro`, "-v", `${join(root, "runner")}:/runner:ro`
    ];
    for (const [key, value] of Object.entries(spec.env ?? {})) dockerArgs.push("-e", `${key}=${value}`);
    if (spec.needsKotlin) dockerArgs.push("-v", `${kotlinDir}:/opt/kotlinc:ro`);
    dockerArgs.push(spec.image, ...spec.cmd);

    const child = spawn("docker", dockerArgs);
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    child.stdout.on("data", (chunk) => { if (stdout.length < MAX_OUTPUT) stdout += chunk; });
    child.stderr.on("data", (chunk) => { if (stderr.length < MAX_OUTPUT) stderr += chunk; });
    const timer = setTimeout(() => {
      timedOut = true;
      spawnSync("docker", ["kill", name]);
    }, spec.timeout * 1000);
    child.on("close", (code) => {
      clearTimeout(timer);
      done({ code, stdout, stderr, timedOut });
    });
  });
}

async function check(tip, kotlinDir) {
  const base = { path: tip.path, id: tip.meta.id ?? null, checkedAt: new Date().toISOString() };
  if (tip.meta.runnable === "false") return { ...base, hash: await tipHash(tip.code ?? "", tip.expected), status: "not-runnable" };
  if (!tip.language) return { ...base, hash: null, status: "failed", message: `Unknown language "${tip.meta.language}"` };
  if (tip.code === null) return { ...base, hash: null, status: "failed", message: `Missing ${LANGUAGES[tip.language].file}` };
  const hash = await tipHash(tip.code, tip.expected);
  const spec = LANGUAGES[tip.language];
  try {
    pull(spec.image);
  } catch (error) {
    return { ...base, hash, status: "error", message: error.message };
  }
  const run = await runContainer(tip, spec, kotlinDir);
  const output = normalizeOutput(run.stdout);
  const expected = normalizeOutput(tip.expected);
  const short = (text) => text.slice(0, 2_000);
  if (run.timedOut) return { ...base, hash, status: "failed", output: short(output), message: `Timed out after ${spec.timeout}s` };
  if (run.code !== 0) return { ...base, hash, status: "failed", output: short(output), message: short(`Exit code ${run.code}\n${run.stderr}`) };
  if (output !== expected) {
    return { ...base, hash, status: "failed", output: short(output), message: short(`Output differs from expected.txt:\n${expected}`) };
  }
  return { ...base, hash, status: "passed", output: short(output) };
}

async function main() {
  const selftest = flag("--selftest");
  const tips = findTips(join(root, selftest ? "runner/selftest" : "tips"));
  const indexPath = join(root, "results", "index.json");
  const known = existsSync(indexPath) ? JSON.parse(readFileSync(indexPath, "utf8")).tips ?? {} : {};

  const todo = [];
  for (const tip of tips) {
    if (selftest || flag("--all")) { todo.push(tip); continue; }
    const previous = known[tip.path];
    const hash = tip.code === null ? null : await tipHash(tip.code, tip.expected);
    if (!previous || previous.hash !== hash || previous.status === "error") todo.push(tip);
  }
  console.log(`${tips.length} tips, ${todo.length} to check`);

  const kotlinDir = todo.some((tip) => tip.language === "kotlin" && tip.meta.runnable !== "false") ? ensureKotlin() : null;
  const results = [];
  for (const tip of todo) {
    const result = await check(tip, kotlinDir);
    results.push(result);
    console.log(`${result.status.padEnd(12)} ${tip.path}${result.message ? `\n             ${result.message.split("\n")[0]}` : ""}`);
  }

  const out = option("--out");
  if (out) writeFileSync(out, JSON.stringify({ results }, null, 2));

  if (selftest) {
    const wrong = results.filter((result, i) => result.status !== (todo[i].meta["expect-status"] ?? "passed"));
    for (const result of wrong) console.error(`SELFTEST: ${result.path} gave ${result.status}`);
    process.exit(wrong.length ? 1 : 0);
  }
  if (flag("--fail-on-failure") && results.some((result) => result.status !== "passed" && result.status !== "not-runnable")) process.exit(1);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) await main();
