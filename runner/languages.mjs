// How each language's tip is run. Every run happens in a throwaway container with no network,
// a read-only root filesystem, a non-root user and limits on time, memory and processes.
// `file` is the name the code is saved under inside the tip folder; keep it in sync with
// TIP_FILES in the content API (backend/src/content/tips.ts).

export const LANGUAGES = {
  python: { file: "main.py", image: "python:3.12-slim", cmd: ["python", "/tip/main.py"], timeout: 30 },
  javascript: { file: "main.js", image: "node:22-slim", cmd: ["node", "/tip/main.js"], timeout: 30 },
  java: { file: "Main.java", image: "eclipse-temurin:21-jdk", cmd: ["java", "/tip/Main.java"], timeout: 60, memory: "768m" },
  kotlin: {
    file: "main.kt", image: "eclipse-temurin:21-jdk", timeout: 180, memory: "1536m", needsKotlin: true,
    cmd: ["sh", "-c", "/opt/kotlinc/bin/kotlinc /tip/main.kt -include-runtime -d /tmp/main.jar -nowarn 2>/tmp/err.txt || { cat /tmp/err.txt >&2; exit 1; }; java -jar /tmp/main.jar"]
  },
  rust: {
    file: "main.rs", image: "rust:1-slim", timeout: 120, memory: "1024m",
    cmd: ["sh", "-c", "rustc --edition 2021 -o /tmp/main /tip/main.rs && /tmp/main"]
  },
  go: { file: "main.go", image: "golang:1.23", cmd: ["go", "run", "/tip/main.go"], timeout: 120, memory: "1024m",
    env: { GOCACHE: "/tmp/gocache", GOPATH: "/tmp/go", GOTOOLCHAIN: "local" } },
  // SQL runs against an empty in-memory SQLite database; rows print like the sqlite3 shell (a|b).
  sql: { file: "main.sql", image: "python:3.12-slim", cmd: ["python", "/runner/sql_harness.py", "/tip/main.sql"], timeout: 30 },
  bash: { file: "main.sh", image: "debian:12-slim", cmd: ["bash", "/tip/main.sh"], timeout: 30 }
};

export const ALIASES = { py: "python", js: "javascript", node: "javascript", kt: "kotlin", rs: "rust", golang: "go",
  sqlite: "sql", shell: "bash", sh: "bash" };

export function languageOf(name) {
  const key = String(name ?? "").toLowerCase().trim();
  return LANGUAGES[key] ? key : ALIASES[key] ?? null;
}

/** Output is compared after normalising line endings and trailing spaces. */
export function normalizeOutput(text) {
  return String(text ?? "").replace(/\r\n?/g, "\n").split("\n").map((line) => line.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
}

/** The same fingerprint the content API computes, so a result is only applied to the code that was run. */
export async function tipHash(code, expected) {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(`${String(code).trimEnd()}\n---\n${String(expected ?? "").trimEnd()}`).digest("hex");
}
