SECURITY POLICY: git-undo

1. Threat Model and Boundary Analysis
git-undo interacts directly with the local Git command line interface. The threat model accounts for:
- Malicious branch names containing shell metacharacters (semicolons, backticks, pipes).
- Malicious reflog messages attempting command injection.
- Unintended data destruction from invalid pointer rewinds.

2. Defense Invariants
- Argument Vector Isolation: All calls to child_process use execSync or spawn with explicit argument arrays. Shell string concatenation is strictly prohibited in the codebase.
- Offline Guarantee: git-undo makes zero network calls. It contains no analytics, telemetry, or remote reporting endpoints.
- Non-Destructive Fallback: A safety backup reference is created in refs/original/ before executing any pointer mutation.

3. Vulnerability Reporting
If you identify any security issue, command injection vector, or unexpected behavior:
- Maintainer: Dhani078
- Security Contact: dhanisepeda@gmail.com
- Expected Response Time: Within 24 hours.
