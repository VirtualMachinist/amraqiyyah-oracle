#!/usr/bin/env node
// Generate the phrasebook draft — every corpus phrase in four scripts (HANDOFF §4.3).
// Usage: node tools/phrasebook.js   → writes deliverables/phrasebook-draft.md
// The output is GENERATED — never hand-edit; change data/ or this tool and regenerate.
//
// Orthography rules live in tools/orthography.js (R-057) — spec/01-orthography-running-text.md is the bank.
'use strict';
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data', 'phrases.json');
const OUT_DIR = path.join(__dirname, '..', 'deliverables');
const OUT = path.join(OUT_DIR, 'phrasebook-draft.md');

const CHAPTERS = [
  ['greetings', 'Greetings — Silemiāt'],
  ['courtesy', 'Courtesy — the small graces'],
  ['family', 'Family — Sanupa'],
  ['table', 'The Table — Homipon'],
  ['heart', 'The Heart — Ib'],
  ['worship', 'Worship — ʿIbedi'],
  ['the-people', 'The People — Na·šaʿab'],
  ['the-world', 'The World — Na·yak ma na·pet'],
  ['the-road', 'The Road — Na·hina'],
  ['the-academy', 'The Academy — Sabeʾow'],
  ['numbers', 'Numbers — Ḥosibonāt'],
  ['market', 'The Market — Tajerow'],
];

const { communityPhrase, copticPhrase, ajamiPhrase } = require('./orthography');

const corpus = JSON.parse(fs.readFileSync(DATA, 'utf8'));
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const by = {};
for (const p of corpus.phrases) (by[p.chapter] = by[p.chapter] || []).push(p);

let md = `# Kitebi Kilemiāt·i — the Phrasebook (draft)

**GENERATED from \`data/phrases.json\` by \`tools/phrasebook.js\` — do not hand-edit.**
Corpus ${corpus.phrases.length} phrases · four scripts per phrase (R-008 single-source law) · registers: everyday / plain / sacred.
Orthographic policies in this render (proposed R-057): lived scripts attach proclitics (dots are display-only); Ajami initial-vowel carriers (alif for Arabic vowels, ئ for Sorani ē/ō); Ajami punctuation ، ؟

`;

let n = 0;
for (const [slug, title] of CHAPTERS) {
  const list = by[slug] || [];
  md += `\n## ${title}\n\n`;
  md += `| # | Amraqiyyah | English | Community | Coptic | Ajami |\n|---|---|---|---|---|---|\n`;
  for (const p of list) {
    n++;
    const reg = p.register === 'everyday' ? '' : ` *(${p.register})*`;
    md += `| ${n} | **${p.display}** | ${p.en}${reg} | ${communityPhrase(p.display)} | ${copticPhrase(p.amr)} | <div dir="rtl">${ajamiPhrase(p.amr)}</div> |\n`;
  }
}

md += `\n---\n*${n} phrases rendered. Ḏakira, saša, ma la nasiya.*\n`;
fs.writeFileSync(OUT, md);
console.log(`wrote ${OUT} — ${n} phrases in four scripts`);
