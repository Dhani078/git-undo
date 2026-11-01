SPECIFICATION: git-undo

1. Scope and Objective

git-undo provides deterministic, reversible Git state recovery. It translates raw Git reflog entries into classified human-readable operations and safely rewinds repository state to a user-selected historical point.

2. Supported Incident Types

2.1. INCIDENT-01: Accidental Commit on Main
- Trigger: Commit made to default branch (main/master) instead of feature branch.
- Target Resolution: Move commit to new feature branch and rewind main by 1 commit.

2.2. INCIDENT-02: Corrupted Rebase
- Trigger: Aborted or misapplied rebase creating duplicate commits or detached HEAD.
- Target Resolution: Reset HEAD to ref immediately before rebase (start).

2.3. INCIDENT-03: Hard Reset Data Loss
- Trigger: git reset --hard executed with unpushed commits.
- Target Resolution: Restore HEAD pointer to commit hash recorded prior to reset.

2.4. INCIDENT-04: Deleted Local Branch
- Trigger: git branch -D executed prematurely.
- Target Resolution: Recreate branch pointer at last known commit recorded in reflog.

3. Exit Codes

- 0: Successful scan or recovery operation.
- 1: Repository dirty with unstaged changes that would conflict with recovery.
- 2: Reflog empty or not a Git repository.
- 3: User aborted confirmation prompt.
- 4: Target ref not found in analyzed window.
