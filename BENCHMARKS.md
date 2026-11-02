BENCHMARKS: git-undo

Testing Environment:
- Platform: Node.js v20.12.0 LTS / Windows 10
- Processor: AMD Ryzen 5 3550H (4 Cores, 8 Threads)
- Memory: 24GB DDR4
- Disk: NVMe SSD PCIe 3.0

1. Execution Latency Comparison
Scenario: Scanning 20 reflog entries and calculating restoration target.

Tool | Startup Time | Memory RSS | Execution Total
--- | --- | --- | ---
git-undo (CLI native) | 28 ms | 21 MB | 49 ms
GitKraken (Electron) | 3800 ms | 340 MB | 4100 ms
SourceTree (Desktop) | 2900 ms | 210 MB | 3150 ms
Raw Bash Reflog Script | 15 ms | 12 MB | 45 ms (no safety checks)

2. Scaling Across Repository Sizes

Repository Scale | Commit Count | Scan Time | Plan Time | Reset Time
--- | --- | --- | --- | ---
Small (Personal App) | 250 commits | 18 ms | 2 ms | 12 ms
Medium (Enterprise Monorepo) | 15,000 commits | 26 ms | 3 ms | 15 ms
Large (Linux Kernel Clone) | 1,200,000 commits | 44 ms | 5 ms | 22 ms

Conclusion:
git-undo maintains consistent sub-100ms response times regardless of total repository commit count because reflog scanning is indexed and bounded by the limit parameter.
