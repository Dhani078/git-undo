CONTRIBUTING TO git-undo

Guidelines

1. Single Contributor Model
This project is authored and maintained by Dhani078. External contributions must strictly follow project conventions.

2. Code Standards
- Zero external dependencies: Only Node.js standard library (node:child_process, node:fs, node:path) is permitted.
- Maximum 200 lines of code per source file.
- ES Modules or clean CommonJS compatible with Node.js >= 20.0.0 LTS.
- Strictly no markdown hash headers and no asterisks in documentation.

3. Testing Requirements
Every change must include automated integration tests exercising simulated Git repositories. All tests must exit with code 0.
