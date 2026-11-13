---
id: b-2518f076dce34a97
topic: rust
concept: "borrowing"
title: "Borrowing: shared access"
hook: "Tired of copying data?"
language: rust
runnable: true
author: workers-ai-large
reviewer: workers-ai-coder
created: 2026-11-13
---

Borrowing lets you use data without taking ownership. It creates a reference to the original data. You can borrow immutable or mutable. Use it to avoid copying large data. For example, when sorting a list, you can borrow the list to compare elements.
