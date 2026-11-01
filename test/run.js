const assert = require('node:assert');
const { getReflog } = require('../bin/cli.js');

console.log('Running git-undo tests...');
const entries = getReflog(5);
assert(Array.isArray(entries), 'getReflog must return an array');
console.log('git-undo tests passed cleanly.');
process.exit(0);
