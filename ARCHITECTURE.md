ARCHITECTURE: git-undo

1. System Architecture Overview

git-undo is engineered as a zero-dependency CLI application with strict isolation between command parsing, Git reflog extraction, recovery planning, and filesystem operations.

```
+-----------------------------------------------------------+
|                     CLI ENTRYPOINT                        |
|                     (bin/cli.js)                          |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                   REFLOG PARSER MODULE                    |
|  - Calls git reflog with custom format                    |
|  - Tokenizes hash, reflog index, action, and timestamp    |
|  - Filters noise and classifies incident patterns         |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                  RECOVERY PLANNER MODULE                  |
|  - Maps target hash from reflog history                   |
|  - Checks working tree cleanliness (git status --porcelain)|
|  - Formulates safety backup tag creation                  |
|  - Formulates git reset --soft or branch restoration      |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                   SAFE EXECUTION ENGINE                   |
|  - Creates refs/original/git-undo-backup-[timestamp]      |
|  - Applies verified git command with argv array           |
|  - Validates exit code and emits formatted output         |
+-----------------------------------------------------------+
```

2. Standard Library Mapping
- Child Process: Uses node:child_process execSync and spawnSync with argument vectors.
- Filesystem: Uses node:fs to verify .git directory presence and read configuration.
- Path Resolution: Uses node:path for cross-platform forward-slash normalization.

3. Failure Modes and Containment
- Dirty Working Directory: Aborts before applying reset to prevent overwriting uncommitted edits.
- Submodule Entanglement: Operates strictly at current repository root; does not alter nested submodules without explicit scoping.
- Non-Git Directory: Detects missing .git folder and halts immediately with exit code 2 and informative diagnosis.
