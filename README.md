git-undo

[![Release](https://img.shields.io/github/v/release/Dhani078/git-undo?color=blue)](https://github.com/Dhani078/git-undo/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](#)

Interactive Git disaster recovery CLI and agent skill. Restores broken repositories, undone rebases, accidental commits, and deleted branches using deterministic reflog analysis.

---

The Problem

Developers encounter critical Git accidents regularly:
- Accidentally running git rebase or git merge and corrupting branch history.
- Committing to main instead of a feature branch.
- Deleting an unmerged branch containing days of work.
- Landing in detached HEAD state and losing commit context.
- Running git reset --hard and losing staged files.

Manual recovery via raw git reflog is intimidating, error-prone, and risks further data loss.

---

The Solution

git-undo scans local reflog entries, identifies the exact moment before the catastrophic command occurred, displays an interactive timeline in plain human terms, and offers a single safe recovery command.

Before any destructive change is made, git-undo automatically saves a backup pointer at `refs/original/git-undo-backup-[timestamp]`.

---

Installation and Usage

Run directly without installing:

```bash
npx git-undo
```

Or install globally:

```bash
npm install -g git-undo
```

Commands

Scan recent actions:
```bash
git-undo scan
```

Undo the immediately preceding state-changing Git command:
```bash
git-undo last
```

Recover an accidentally deleted branch:
```bash
git-undo recover-branch <branch-name>
```

Dry-run simulation mode:
```bash
git-undo last --dry-run
```

---

CLI Options

- `--dry-run`: Display recovery plan and target commit hash without changing repository state.
- `--limit <n>`: Number of reflog entries to analyze (default: 25).
- `--json`: Output analysis result as machine-readable JSON.
- `--verbose`: Print complete command chain and reflog pointers.

---

Safety Guarantee

- Never runs git reset --hard without first creating an explicit backup ref under `.git/refs/original/`.
- Verifies working directory status before executing tree modifications.
- Fails safe if untracked files risk being overwritten.

---

Author

Dhani078
