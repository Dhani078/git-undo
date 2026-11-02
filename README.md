git-undo

[![Release](https://img.shields.io/github/v/release/Dhani078/git-undo?color=blue)](https://github.com/Dhani078/git-undo/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](#)

Interactive Git disaster recovery CLI and deterministic state restoration engine. Restores broken repositories, undone rebases, accidental commits, and deleted branches using reflog sequence analysis with zero external dependencies.

---

THE PROBLEM

Git accidents happen daily and cause hours of engineering downtime:
- Committing to main or master instead of an isolated feature branch.
- Running git reset --hard and losing critical unpushed commits.
- Corrupted rebase or merge operations leaving the repository in a detached HEAD state.
- Accidental branch deletion via git branch -D before merging work upstream.
- Untangling raw reflog outputs requires parsing cryptic hashes under extreme stress.

---

THE SOLUTION

git-undo executes deterministic local reflog inspection:
- Identifies the exact repository state prior to the catastrophic command.
- Displays an interactive ASCII chronological timeline of recent state changes.
- Automatically creates safety backup pointers at refs/original/git-undo-backup before executing changes.
- Restores branches and HEAD positions cleanly in under 50 milliseconds.
- Operates 100 percent locally and offline with zero npm dependencies.

---

QUICKSTART

Run immediately via npx without installation:

```bash
npx git-undo
```

Install globally for instant access in any repository:

```bash
npm install -g git-undo
```

Verify version and health:

```bash
git-undo --version
```

---

COMMAND MATRIX

Command | Argument | Description | Default
--- | --- | --- | ---
git-undo scan | None | Show parsed recent reflog entries with human labels | 10 entries
git-undo last | None | Rewind repository to state before previous action | Previous commit
git-undo recover-branch | <name> | Recreate deleted branch at last known reflog hash | Required name
git-undo --help | None | Print comprehensive command list and flags | Flag
git-undo --version | None | Print current semantic version | Flag

---

CLI OPTIONS

- `--dry-run`: Simulate restoration, display planned ref changes without modifying state.
- `--limit <n>`: Set number of reflog entries to scan (default: 10, max: 100).
- `--json`: Output parsed reflog and planned actions in structured JSON format.
- `--force`: Bypass confirmation prompt when restoring detached HEAD or branch pointer.

---

INTERACTIVE WORKFLOW PREVIEW

```
$ npx git-undo scan

[git-undo] Analyzing local reflog entries for current repository...

Index | Hash    | Relative Time | Action Description
------|---------|---------------|--------------------------------------------
[0]   | a1b2c3d | 2 minutes ago  | commit: feat: add billing webhook handler
[1]   | f4e5d6c | 14 minutes ago | checkout: moving from feature to main
[2]   | 9a8b7c6 | 1 hour ago     | rebase (finish): returning to refs/heads/main
[3]   | 3d2e1f0 | 2 hours ago    | commit: fix: memory leak in worker pool

Target restoration point identified: [1] f4e5d6c
Created safety backup: refs/original/git-undo-backup-1714500000
Rewinding repository HEAD to f4e5d6c... Done in 32ms.
```

---

DATA SAFETY GUARANTEES

- Safety Backup Ref: Every state rewind creates a local backup tag before applying modifications.
- Zero Loss Architecture: In the event of an incorrect recovery, running git-undo last again rewinds to the backup.
- Strict Standard Library: Built entirely with node:child_process, node:fs, and node:path.

---

LICENSE AND AUTHOR

- License: MIT License
- Author: Dhani078 (dhanisepeda@gmail.com)
- Source Repository: https://github.com/Dhani078/git-undo
