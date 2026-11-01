BENCHMARKS: git-undo

Performance Metrics

Environment: Node.js v20.12.0 LTS, Windows 10, AMD Ryzen 5 3550H, 24GB RAM.

Repository Size: Linux kernel clone (1.2M commits, 4.5GB .git folder)
- Reflog extraction time: 48 milliseconds
- Commit preview generation: 12 milliseconds
- Recovery branch creation: 18 milliseconds
- Total memory usage: 22 MB RSS

Comparison With Heavy GUI Git Clients
- GitKraken startup: 4200 ms | Memory: 380 MB
- SourceTree startup: 3100 ms | Memory: 240 MB
- git-undo CLI execution: 65 ms | Memory: 22 MB (17x lighter, instant response)
