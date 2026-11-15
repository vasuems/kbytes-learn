---
id: b-2f6f8d0626294656
topic: rust
concept: "String vs &str"
title: "String vs &str: owned vs borrowed text"
hook: "Tired of confusing strings?"
language: rust
runnable: true
author: workers-ai-large
reviewer: workers-ai-coder
created: 2026-11-15
---

Rust has two types of strings: String and &str. String is owned and &str is borrowed. This matters when passing strings to functions. For example, when you need to keep a string after calling a function, use String. When you only need to read a string, use &str.
