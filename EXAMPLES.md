EXAMPLES: git-undo

The following scenarios demonstrate real-world usage of git-undo.

Scenario 1: Scanning Recent Repository Actions
```bash
$ npx git-undo scan
[git-undo] Reflog window: 5 entries
0: c8d2e1a (checkout: moving from feat/auth to main) - 3 mins ago
1: a9b8c7d (commit: feat(auth): implement token refresh endpoint) - 10 mins ago
2: 4e5f6a7 (commit: fix: handle null token in header) - 35 mins ago
3: 1b2c3d4 (rebase (finish): returning to refs/heads/feat/auth) - 1 hour ago
4: 8f9a0b1 (commit: test: add unit tests for auth service) - 2 hours ago
```

Scenario 2: Undoing Accidental Hard Reset
```bash
$ git reset --hard HEAD~1
HEAD is now at 4e5f6a7 fix: handle null token in header

$ npx git-undo last
[git-undo] Detected previous action: reset --hard
[git-undo] Target commit to restore: a9b8c7d (feat(auth): implement token refresh endpoint)
[git-undo] Backing up current state to refs/original/git-undo-backup-1714501234
[git-undo] Executing recovery: git reset --hard a9b8c7d
Repository successfully restored to a9b8c7d in 41ms.
```

Scenario 3: Recovering an Accidental Deleted Branch
```bash
$ git branch -D feat/payment-gateway
Deleted branch feat/payment-gateway (was 7d8e9f0).

$ npx git-undo recover-branch feat/payment-gateway
[git-undo] Searching reflog for references to feat/payment-gateway...
[git-undo] Found tip commit: 7d8e9f0 (feat: integrate stripe checkout session)
[git-undo] Recreating branch 'feat/payment-gateway' at 7d8e9f0...
Branch 'feat/payment-gateway' successfully restored.
```

Scenario 4: Dry-Run Simulation
```bash
$ npx git-undo last --dry-run
[git-undo] [DRY RUN] Simulation mode active. No files or references will be changed.
Target commit: a9b8c7d
Planned backup: refs/original/git-undo-backup-simulated
Planned command: git reset --hard a9b8c7d
Working directory status: Clean. Recovery is safe to execute.
```

Scenario 5: Structured JSON Output for Automation
```bash
$ npx git-undo scan --json
{
  "status": "success",
  "entries": [
    {
      "hash": "c8d2e1a",
      "ref": "HEAD@{0}",
      "action": "checkout: moving from feat/auth to main",
      "time": "3 mins ago"
    },
    {
      "hash": "a9b8c7d",
      "ref": "HEAD@{1}",
      "action": "commit: feat(auth): implement token refresh endpoint",
      "time": "10 mins ago"
    }
  ]
}
```
