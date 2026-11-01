SECURITY POLICY: git-undo

Threat Model

git-undo executes local shell commands via the Git CLI. To ensure complete security:
- All Git arguments are passed as discrete argv arrays, never concatenated into shell strings. This prevents command injection.
- No network requests are made. git-undo operates 100 percent offline.
- Backup references are stored locally inside `.git/refs/original/` and are never pushed to remote servers.

Vulnerability Reporting

Report any vulnerability directly to the repository maintainer:
- Email: dhanisepeda@gmail.com
- Maintainer: Dhani078
