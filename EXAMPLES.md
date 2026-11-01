EXAMPLES: git-undo

1. Basic Disaster Recovery

Scenario: You just ran `git reset --hard HEAD~1` by mistake and lost your unpushed commit.

Run:
```bash
npx git-undo
```

Result:
- git-undo analyzes `git reflog` entries.
- Displays the interactive selector with previous commit hashes, commit messages, and relative timestamps.
- Press Enter on the target commit.
- Creates a safety branch `rescue/recover-HEAD@{1}` pointing to the commit, then offers to move your current branch pointer.

---

2. Finding Lost Dangling Commits and Stashes

Scenario: You cleared stashes via `git stash clear` or abandoned a detached HEAD.

Run:
```bash
npx git-undo --dangling
```

Result:
- Executes `git fsck --lost-found --unreachable`.
- Scans all unreferenced blob and commit objects.
- Summarizes recovered commit messages and diff previews.

---

3. Dry Run Simulation

Scenario: Inspect what changes git-undo will perform without modifying Git state.

Run:
```bash
npx git-undo --dry-run
```

Result:
- Emits planned checkout, branch, and reset commands to stdout.
- Does not modify `.git/` or working tree files.

---

4. CI/CD Pre-Push Safety Check

Run in pre-push hook:
```bash
npx git-undo list --json
```
