---
id: b-537ee9cf83a844c8
topic: rust
concept: "Result and the ? operator"
title: "Result: handling errors without drama"
hook: "Tired of crashing when something goes wrong?"
language: rust
runnable: true
author: workers-ai-small
reviewer: workers-ai-coder
created: 2026-11-13
---

Result is like a box that can hold a value or an error. The ? operator makes it easy to return errors. It checks if a Result is Ok. If so, it unwraps the value. If not, it returns the error. This keeps code clean and error-free. Imagine asking a user for their age. If they enter a number, you use it. If not, you tell them to try again. The ? operator handles both cases.
