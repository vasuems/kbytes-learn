---
id: b-f11e1b314aba456e
topic: sql
concept: "Subqueries in SELECT"
title: "Subqueries: nested queries for deep dives"
hook: "Find data by first running a search within a search."
language: sql
runnable: true
author: workers-ai-small
reviewer: workers-ai-coder
created: 2026-11-19
---

Subqueries let you use a SELECT statement inside another SELECT. The inner query runs first. Its result goes into the outer query. This helps when you want to filter data based on another set of data. For example, find the names of students who scored higher than the average score. First, find the average score. Then, find students who scored higher.
