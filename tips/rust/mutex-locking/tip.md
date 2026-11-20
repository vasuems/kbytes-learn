---
id: b-22d3ec200d3c404a
topic: rust
concept: "mutex locking"
title: "Mutex Locking: safe sharing of data"
hook: "Prevent data races when multiple threads want to access the same variable."
language: rust
runnable: true
author: workers-ai-small
reviewer: workers-ai-coder
created: 2026-11-20
---

Mutex stands for mutual exclusion. It lets only one thread access data at a time. Useful when threads need to update shared data safely. First, import the Mutex type from the standard library. Then, create a Mutex around the data. Lock the mutex to access the data. This prevents other threads from accessing it until the lock is released.
