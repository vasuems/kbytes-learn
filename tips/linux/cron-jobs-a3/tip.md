---
id: b-4a542529e8684a96
topic: linux
concept: "cron jobs"
title: "Cron jobs: automate your tasks"
hook: "Tired of doing the same tasks every day? Automate them with cron jobs."
language: bash
runnable: true
author: workers-ai-small
reviewer: workers-ai-coder
created: 2026-11-22
---

Cron jobs run commands at scheduled times. You write them in a crontab file. The first 5 numbers are the schedule. The last part is the command. First number is minute, 0 to 59. Second number is hour, 0 to 23. Third is day of month, 1 to 31. Fourth is month, 1 to 12. Fifth is day of week, 0 to 7. 0 and 7 are Sunday. This script shows two cron jobs. One runs every day at 3 AM. It prints 'Daily backup started'. Another runs every Monday at 5 PM. It prints 'Weekly report generated'. Use cron jobs to automate backups or reports.
