TROUBLESHOOTING: git-undo

Diagnostic Runbook for Common Failures

Problem 1: Fatal Error: Not a git repository
- Symptom: CLI exits with code 2 and message "fatal: not a git repository".
- Cause: The current working directory does not contain a .git directory or parent repository.
- Solution: Run git-undo from within the project directory or initialize a repository with git init.

Problem 2: Recovery Aborted: Working directory has uncommitted changes
- Symptom: git-undo halts with exit code 1 and warns of unstaged edits.
- Cause: Current unstaged or staged changes would be permanently overwritten by resetting HEAD.
- Solution: Run git stash to temporarily shelve changes, execute git-undo last, then run git stash pop.

Problem 3: Reflog is empty
- Symptom: git-undo scan returns zero entries.
- Cause: The repository was freshly cloned or git reflog expire --expire=now --all was executed.
- Solution: Check git log to inspect committed history. Without reflog records, pointer restoration relies on existing branch and tag references.

Problem 4: Branch recovery cannot find branch name
- Symptom: git-undo recover-branch <name> reports "Reference not found in reflog".
- Cause: The deleted branch was created and removed beyond the default reflog expiration window (90 days).
- Solution: Increase search limit with git-undo scan --limit 100 to search deeper records.

Problem 5: Permission denied accessing .git/refs/original
- Symptom: Error writing backup ref pointer.
- Cause: File permissions inside .git were altered by a process running with elevated credentials.
- Solution: Check file ownership on the .git folder and verify write permissions for your current user account.
