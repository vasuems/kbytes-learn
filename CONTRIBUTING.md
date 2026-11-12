# Contributing

Thanks for helping keep the tips correct.

## Fix a tip

1. Edit the files in `tips/<topic>/<concept>/`:
   - `tip.md`: the explanation. Keep it short, friendly and plain; readers are beginners.
   - The code file: it must run as is and print its result.
   - `expected.txt`: exactly what the code prints.
2. Open a pull request. The **Verify tips** check runs your code in a sandbox and must pass.
3. After it's merged, the app shows the updated tip.

## Rules for code

- Standard library only. No network, no files outside the working directory, no user input.
- Keep it short: at most about 24 lines of 80 characters.
- The output must be the same on every run (no random numbers, times or memory addresses).

## Don't

- Don't edit `results/index.json`; the workflow writes it.
- Don't add new tips by hand; new tips come from the content pipeline. Suggest a missing concept in an issue instead.
