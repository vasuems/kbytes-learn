---
id: b-cf77f2feb6f44447
topic: rust
concept: "error handling"
title: "Error Handling: safe fails"
hook: "Code crashes are annoying"
language: rust
runnable: true
author: workers-ai-large
reviewer: workers-ai-coder
created: 2026-11-17
---

Error handling helps when things go wrong. Rust uses Result to handle errors. It has two types: Ok and Err. Ok is for success and Err is for failure. We use match to handle these results. For example, we can use it to divide two numbers and handle division by zero.
