#!/usr/bin/env node
// Merge a JSON array of root entries into data/roots.json, then lint.
// Usage: node tools/add-roots.js <entries.json>
'use strict';
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) { console.error('usage: node add-roots.js <entries.json>'); process.exit(1); }
const entries = JSON.parse(fs.readFileSync(src, 'utf8'));
const p = path.join(__dirname, '..', 'data', 'roots.json');
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

const existing = new Set(d.roots.filter(r => Array.isArray(r.skeleton)).map(r => r.skeleton.join('-')));
let added = 0, skipped = 0;
for (const e of entries) {
  const key = Array.isArray(e.skeleton) ? e.skeleton.join('-') : `(lexeme:${e.citation})`;
  if (Array.isArray(e.skeleton) && existing.has(key)) { console.log(`skip ${key} — already present`); skipped++; continue; }
  d.roots.push(e); added++;
}
fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
console.log(`added ${added}, skipped ${skipped}, total ${d.roots.length}`);
