#!/usr/bin/env node
const { execSync } = require('node:child_process');

function getReflog(limit = 10) {
  try {
    const raw = execSync(`git reflog -n ${limit} --pretty=format:"%h|%gd|%gs|%cr"`, { encoding: 'utf-8' });
    return raw.trim().split('\n').map(line => {
      const [hash, ref, action, time] = line.split('|');
      return { hash, ref, action, time };
    });
  } catch (err) {
    return [];
  }
}

function run() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log('git-undo - Interactive Git disaster recovery CLI');
    console.log('Usage: npx git-undo [options]');
    console.log('Options:');
    console.log('  --list, -l      List recent reflog recovery candidates');
    console.log('  --dry-run       Simulate recovery actions without modifying git');
    console.log('  --version, -v   Show version');
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log('git-undo v1.0.0');
    process.exit(0);
  }

  const entries = getReflog(15);
  if (!entries.length) {
    console.log('No git reflog entries found or not inside a git repository.');
    process.exit(0);
  }

  console.log('Recent Git Recovery Points:');
  console.log('--------------------------------------------------');
  entries.forEach((e, i) => {
    console.log(`[${i + 1}] ${e.hash} (${e.time}): ${e.action}`);
  });
  console.log('--------------------------------------------------');
  console.log('Run `git checkout -b rescue/<name> <hash>` to recover.');
}

if (require.main === module) {
  run();
}

module.exports = { getReflog, run };
