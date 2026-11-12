# kbytes-learn

Short, runnable programming tips for a lock-screen learning app. Each tip explains one concept in about 30 seconds and comes with a small program that **is run and checked here** before the app shows it.

Tips are drafted by AI, reviewed by a second AI model, and then tested by the workflow in this repository. Anyone can read them, reuse them under [CC BY 4.0](LICENSE), or send a fix.

## What a tip looks like

```
tips/<topic>/<concept>/
  tip.md         front matter (title, hook, language, …) and the explanation
  main.py        the code (file name depends on the language, see below)
  expected.txt   exactly what the code prints
```

`tip.md` front matter:

| Field | Meaning |
|---|---|
| `id` | The tip's id in the app |
| `topic`, `concept` | What the tip teaches. Concepts in a topic go from basic to advanced. |
| `title`, `hook` | The headline and one-line teaser shown on the lock screen |
| `language` | `python`, `javascript`, `java`, `kotlin`, `rust`, `go`, `sql` or `bash` |
| `runnable` | `false` for tips whose code cannot be run on its own (a keyboard shortcut, an interactive command). Those are only reviewed, not run. |
| `author`, `reviewer` | The AI models that wrote and reviewed the tip |

## How a tip is checked

1. The content API drafts a tip, checks its format, and makes sure the topic doesn't already cover it.
2. A **different** AI model reviews the code, the explanation and the expected output.
3. The tip is committed here. [`verify.yml`](.github/workflows/verify.yml) runs its code and compares what it prints with `expected.txt`.
4. The result is written to [`results/index.json`](results/index.json). The app only shows tips that passed (or, for `runnable: false`, passed the review).

| Language | File | Runs with |
|---|---|---|
| Python | `main.py` | `python:3.12-slim` |
| JavaScript | `main.js` | `node:22-slim` |
| Java | `Main.java` | `eclipse-temurin:21-jdk` (`java Main.java`) |
| Kotlin | `main.kt` | `kotlinc` 2.0 on `eclipse-temurin:21-jdk` |
| Rust | `main.rs` | `rust:1-slim` (`rustc --edition 2021`) |
| Go | `main.go` | `golang:1.23` (`go run`) |
| SQL | `main.sql` | an empty in-memory SQLite database; rows print as `a|b` |
| Bash | `main.sh` | `debian:12-slim` |

Output is compared after normalising line endings and trailing spaces.

### Safety

Tip code is treated as untrusted. It runs only inside `docker run` with **no network**, a read-only root filesystem, a non-root user, and limits on time, memory and processes. The job that runs code has no secrets and a read-only token. A separate job, which never runs tip code, records the results. Pull requests run with read-only permissions.

[`runner/selftest`](runner/selftest) holds known-good tips and known-bad ones (wrong output, an endless loop, network access, writing outside `/tmp`). [`selftest.yml`](.github/workflows/selftest.yml) checks that the good ones pass and the bad ones fail whenever the runner changes.

## Fixing a tip

Found a mistake? Open a pull request that edits the tip's files. Update `expected.txt` if the output changes. The workflow runs your version, and once it's merged the app picks up the fix. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

Tips (text and code) are licensed under [Creative Commons Attribution 4.0](LICENSE). Credit "kbytes-learn" and link to this repository.
