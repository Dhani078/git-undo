CHANGELOG: git-undo

All notable changes to this project are documented in this file.
This project adheres to Semantic Versioning.

---

v1.0.0 - 2026-11-01

Initial Release
- Scan and classify reflog entries for rebase, merge, reset, and commit.
- Interactive terminal menu for selecting restore points.
- Automatic local ref backup creation prior to execution.
- Command-line flags: --dry-run, --limit, --json, --verbose.
- Standalone zero-dependency executable compatible with Node >= 20.0.0 LTS.
