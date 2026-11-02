---
name: git-undo
description: Interactive Git disaster recovery CLI and agent skill. Restores broken repositories, undone rebases, accidental commits, and deleted branches using deterministic reflog analysis.
risk: safe
version: 1.0.0
---

NAME
git-undo - Deterministic Git state recovery and reflog analysis engine

SYNOPSIS
npx git-undo [command] [options]

COMMANDS
- scan: Display classified recent reflog operations.
- last: Revert the repository to the state immediately preceding the latest command.
- recover-branch <name>: Restore an accidentally deleted local branch to its last commit hash.

OPTIONS
- --dry-run: Simulate the recovery plan and print target hashes without modifying repository state.
- --limit <number>: Set scan window size (default 10, range 1 to 100).
- --json: Output structured JSON representation of reflog events.

DETERMINISTIC BEHAVIOR AND INVARIANTS
1. The tool must never perform destructive actions without creating a backup reference pointer at refs/original/git-undo-backup-[timestamp].
2. When the working tree has dirty uncommitted changes that would be overwritten by a reset, git-undo must abort with exit code 1.
3. Arguments to git are always passed as discrete argument arrays, never through shell string interpolation.
4. Output is generated exclusively in standard UTF-8 text with no external network requests.

AGENT INTEGRATION INSTRUCTIONS
When diagnosing an unintended Git state modification:
1. Run git-undo scan --json to inspect the sequence of recent reflog actions.
2. Verify if the target state matches the user objective.
3. Execute git-undo last --dry-run to confirm safety.
4. Apply git-undo last to execute restoration.

AUTHOR
Dhani078 (dhanisepeda@gmail.com)
