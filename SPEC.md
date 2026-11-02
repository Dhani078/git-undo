SPECIFICATION: git-undo

1. Scope and Technical Purpose
git-undo provides deterministic, reversible Git state recovery. It translates raw Git reflog entries into classified human-readable operations and safely rewinds repository state to a user-selected historical point.

2. Supported Incident Types

2.1. INCIDENT-01: Accidental Commit on Main
- Trigger: Commit made to default branch (main/master) instead of feature branch.
- Pre-condition: Reflog indicates commit action on current checked-out branch.
- Target Resolution: Move commit to new feature branch and rewind main by 1 commit.
- Verification: Branch pointer matches parent commit; new feature branch points to commit hash.

2.2. INCIDENT-02: Corrupted Rebase
- Trigger: Aborted or misapplied rebase creating duplicate commits or detached HEAD.
- Pre-condition: Reflog entries contain rebase (start) and subsequent conflicting steps.
- Target Resolution: Reset HEAD to ref immediately before rebase (start).
- Verification: git status reports clean working tree and expected upstream tracking.

2.3. INCIDENT-03: Hard Reset Data Loss
- Trigger: git reset --hard executed with unpushed commits.
- Pre-condition: HEAD@{1} records reset: moving to <hash>.
- Target Resolution: Restore HEAD pointer to commit hash recorded prior to reset.
- Verification: Commits restored to working tree and log history.

2.4. INCIDENT-04: Deleted Local Branch
- Trigger: git branch -D executed prematurely.
- Pre-condition: Reflog records commit hash of deleted branch tip.
- Target Resolution: Recreate branch pointer at last known commit recorded in reflog.
- Verification: git branch --list shows restored branch name.

3. Exit Codes
- 0: Successful scan or recovery operation.
- 1: Repository dirty with unstaged changes that would conflict with recovery.
- 2: Reflog empty or not a Git repository.
- 3: User aborted confirmation prompt.
- 4: Target ref not found in analyzed window.

4. Performance Bounds
- Execution time ceiling: 150 milliseconds on repositories up to 100,000 commits.
- Resident memory footprint: Under 30 megabytes.
- Zero npm package dependencies.
