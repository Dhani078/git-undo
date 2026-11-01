---
name: git-undo
description: Interactive Git disaster recovery and reflog unwinder. Use when user accidentally commits to wrong branch, botches a rebase or merge, deletes a local branch, or loses work after git reset.
version: 1.0.0
author: Dhani078
---

Git Undo Skill

Use when working inside any Git repository where an unexpected, destructive, or mistaken Git command was executed.

Instructions

1. Triage the repository state:
   Run git status and git-undo scan --json to inspect the recent reflog entries without modifying state.

2. Identify the catastrophic action:
   - Accidental commit on wrong branch: Note commit hash and previous branch tip.
   - Botched rebase or merge: Identify the HEAD ref immediately preceding rebase (start) or merge.
   - Accidentally deleted branch: Find the last commit where the deleted ref was pointed.

3. Execute recovery:
   - In automated mode: invoke npx git-undo last --yes after confirming target commit with user.
   - In manual mode: guide user with exact atomic commands:
     ```bash
     git branch backup-before-undo
     git reset --hard HEAD@{1}
     ```

4. Verify repository integrity:
   Run git status and git log -n 3 --oneline to confirm that code is restored and zero commits were lost.
