// Amraqiyyah script converter (D-2, R-048): scholarly romanization → Coptic / Ajami / community.
// Input: dotless engine forms (dots · and hyphens pass through untouched).
'use strict';
const fs = require('fs');
const path = require('path');

const MAPS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'scripts.json'), 'utf8'));

function convert(form, mapName) {
  const map = MAPS[mapName];
  if (!map) throw new Error(`unknown script '${mapName}'`);
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  let out = '', i = 0;
  while (i < form.length) {
    const ch = form[i];
    if (ch === '·' || ch === '-' || ch === ' ') { out += ch; i++; continue; }
    let hit = null;
    for (const k of keys) if (form.startsWith(k, i)) { hit = k; break; }
    if (hit) { out += map[hit]; i += hit.length; }
    else { out += ch; i++; } // pass through (community map is sparse by design)
  }
  return out;
}

const toCoptic = f => convert(f, 'coptic');
const toAjami = f => convert(f, 'ajami');
const toCommunity = f => convert(f, 'community');

module.exports = { convert, toCoptic, toAjami, toCommunity };

if (require.main === module) {
  const form = process.argv[2];
  if (!form) { console.log('usage: node script.js <form>   e.g. node script.js ḥasiba'); process.exit(1); }
  console.log(`scholarly  ${form}`);
  console.log(`community  ${toCommunity(form)}`);
  console.log(`coptic     ${toCoptic(form)}`);
  console.log(`ajami      ${toAjami(form)}`);
}
