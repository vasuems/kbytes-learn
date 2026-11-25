---
id: b-a3bf29bf7f8a4b0c
topic: rust
concept: "Thread Local Storage"
title: "Thread Local Storage: per-thread data"
hook: "Need data that's unique to each thread?"
language: rust
runnable: true
author: workers-ai-large
reviewer: workers-ai-coder
created: 2026-11-25
---

Thread local storage lets each thread have its own data. We use the thread_local macro to define a static variable that's unique to each thread. This is useful when you want to avoid sharing data between threads. For example, in a web server, each thread can have its own request context.
