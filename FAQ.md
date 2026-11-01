FAQ: git-undo

Q: Can git-undo recover files that were never staged or committed?
A: No. Git only tracks files added to the index (`git add`) or committed (`git commit`). If a file was untracked and deleted with `rm -rf`, it never entered the Git object database. For all staged or committed work, git-undo recovers it completely via reflog and dangling object caches.

Q: Does git-undo execute destructive operations automatically?
A: Never. git-undo always defaults to creating a rescue branch (`rescue/<timestamp>`) before modifying your active branch. Your original HEAD reference remains untouched unless explicitly confirmed.

Q: What happens if `git reflog` was expired or pruned?
A: git-undo automatically falls back to low-level object scanning using `git fsck --lost-found`, examining loose commits stored in `.git/objects/`.

Q: Is network access required?
A: Zero network access. git-undo operates purely offline against local Git files.
