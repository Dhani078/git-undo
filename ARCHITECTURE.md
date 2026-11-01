ARCHITECTURE: git-undo

Data Flow Diagram

```
+-----------------------------------------------------------+
|                        CLI Entrypoint                     |
|                      (bin/git-undo.js)                    |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                     Reflog Parser                         |
|   - Spawns: git reflog show -n 50 --format="%gD|%H|%gs"    |
|   - Parses: ref, commit hash, action description          |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                   Incident Classifier                     |
|   - Matches patterns: rebase, merge, commit, checkout     |
|   - Isolates pre-incident safe commit SHA                 |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                     Safety Guard                          |
|   - Checks git status for untracked/dirty files           |
|   - Writes backup ref: refs/original/git-undo-[epoch]     |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                   Execution Engine                        |
|   - Applies git update-ref / git reset                    |
|   - Verifies post-execution exit status                   |
+-----------------------------------------------------------+
```

Component Responsibilities

- bin/git-undo.js: Argument parser and CLI runner. Zero external dependencies.
- src/parser.js: Pure function string parser converting git reflog output into structured records.
- src/classifier.js: Heuristic engine identifying catastrophic state transitions.
- src/backup.js: Safe ref creator protecting previous state before modification.
- src/executor.js: Subprocess dispatcher invoking native git binary.
