FAQ: git-undo

Q1: Does git-undo require installing heavy npm dependencies?
A: No. git-undo has zero external dependencies. It relies exclusively on the Node.js standard library and native Git binary already present on your machine.

Q2: Can git-undo recover uncommitted staged or unstaged changes after git reset --hard?
A: Git reflog only records commits and pointer moves. If files were never added or committed, Git itself does not create commit objects. However, if files were staged via git add, Git created blob objects which git-undo identifies in its deep inspection mode.

Q3: Is git-undo safe to run in a production or team repository?
A: Yes. git-undo only operates on your local Git database (.git directory). It never executes git push or alters remote references on GitHub or GitLab.

Q4: What if git-undo undid the wrong commit?
A: Every state modification made by git-undo automatically creates a local safety pointer at refs/original/git-undo-backup-[timestamp]. Running git-undo last again immediately rewinds repository state back to that backup pointer.

Q5: Does git-undo work on Windows, macOS, and Linux?
A: Yes. All internal process calls use argument arrays and normalized path separators, ensuring identical behavior across Windows PowerShell, CMD, Git Bash, macOS zsh, and Linux bash.

Q6: How does git-undo handle detached HEAD states?
A: When you end up in a detached HEAD after a failed rebase, git-undo detects the original branch name from earlier reflog records and offers to reattach HEAD cleanly.

Q7: What is the maximum reflog depth analyzed?
A: By default git-undo scans 10 entries for sub-50ms speed. You can pass --limit 50 or --limit 100 to scan deeper history.
