// Merges a results file from the "run" job into results/index.json.
//
//   node runner/record.mjs results.json
//
// This runs in the job that may push to the repository, so it never executes tip code: it only
// reads the JSON the run job produced, checks every field and keeps results for tips that exist.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const STATUSES = new Set(["passed", "failed", "not-runnable", "error"]);
const PATH = /^tips\/[a-z0-9-]{1,48}\/[a-z0-9-]{1,80}$/;
const text = (value, max) => (typeof value === "string" ? value.slice(0, max) : undefined);

export function mergeResults(index, incoming, exists) {
  const tips = { ...(index.tips ?? {}) };
  let changed = 0;
  for (const result of incoming) {
    if (!result || !PATH.test(result.path) || !STATUSES.has(result.status) || !exists(result.path)) continue;
    if (result.hash !== null && !/^[0-9a-f]{64}$/.test(result.hash ?? "")) continue;
    tips[result.path] = {
      id: text(result.id, 80) ?? null,
      status: result.status,
      hash: result.hash,
      checkedAt: text(result.checkedAt, 40) ?? new Date().toISOString(),
      ...(result.output !== undefined ? { output: text(result.output, 2_000) } : {}),
      ...(result.message !== undefined ? { message: text(result.message, 2_000) } : {})
    };
    changed++;
  }
  const sorted = Object.fromEntries(Object.entries(tips).sort(([a], [b]) => a.localeCompare(b)));
  return { index: { updatedAt: new Date().toISOString(), tips: sorted }, changed };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const { results } = JSON.parse(readFileSync(process.argv[2], "utf8"));
  const indexPath = join(root, "results", "index.json");
  const index = existsSync(indexPath) ? JSON.parse(readFileSync(indexPath, "utf8")) : {};
  const merged = mergeResults(index, Array.isArray(results) ? results : [], (path) => existsSync(join(root, path, "tip.md")));
  mkdirSync(join(root, "results"), { recursive: true });
  writeFileSync(indexPath, JSON.stringify(merged.index, null, 2) + "\n");
  console.log(`Recorded ${merged.changed} results`);
}
