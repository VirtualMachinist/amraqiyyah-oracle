#!/usr/bin/env node
// Generate the phrasebook draft — every corpus phrase in four scripts (HANDOFF §4.3).
// Usage: node tools/phrasebook.js   → writes deliverables/phrasebook-draft.md
// The output is GENERATED — never hand-edit; change data/ or this tool and regenerate.
//
// Orthographic policies applied here (proposed R-057, pending Ali):
//   1. Dot policy: the display romanization keeps morpheme dots (its whole job);
//      the three lived scripts (community, Coptic, Ajami) attach proclitics — dots stripped —
//      as the Arabic and Coptic traditions themselves attach articles. Hyphens stay everywhere.
//   2. Ajami word-initial vowels take a carrier: Arabic-faithful alif for a/i/u/ā/ī/ū
//      (اَ اِ اُ آ اِي اُو), Sorani hamza-carrier ئ for the Sorani vowels e/ē/o/ō (ئێ ئۆ).
//   3. Ajami punctuation localizes: , → ، and ? → ؟
'use strict';
const fs = require('fs');
const path = require('path');
const S = require('./script');

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

const stripDots = s => s.replace(/·/g, '');
const lower = s => s.toLowerCase();

// Restore a leading capital on the converted community segment when the source segment had one.
function communitySeg(seg) {
  const conv = S.toCommunity(lower(seg));
  const firstCased = [...seg].find(c => c.toLowerCase() !== c.toUpperCase());
  if (firstCased && firstCased === firstCased.toUpperCase()) {
    const chars = [...conv];
    const i = chars.findIndex(c => c.toLowerCase() !== c.toUpperCase());
    if (i >= 0) chars[i] = chars[i].toUpperCase();
    return chars.join('');
  }
  return conv;
}
// Community generates from the DISPLAY form: every morpheme dot becomes a typable hyphen
// (Ni·gon·hariw·ba·a → Ni-gon-hariw-ba-a) — keyboard-friendly and ambiguity-free.
const communityPhrase = amr => amr.replace(/·/g, '-').split(/([ -])/).map(seg => (/^[ -]$/.test(seg) ? seg : communitySeg(seg))).join('');

const copticPhrase = amr => S.toCoptic(stripDots(lower(amr)));

const AJAMI_CARRIER = { 'a': 'اَ', 'i': 'اِ', 'u': 'اُ', 'ā': 'آ', 'ī': 'اِي', 'ū': 'اُو', 'e': 'ئێ', 'ē': 'ئێ', 'o': 'ئۆ', 'ō': 'ئۆ' };

// Frozen sacred forms keep their inherited Arabic orthography in Ajami (R-022 extended):
// prefix-matched so case vowels ride on the frozen spelling (Allah·a → اللهَ, Quranic practice).
const FROZEN = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'frozen.json'), 'utf8')).frozen;
const FROZEN_AJAMI = FROZEN.filter(f => f.ajami).map(f => [lower(f.form), f.ajami]).sort((a, b) => b[0].length - a[0].length);

function ajamiWord(word) {
  for (const [form, spelled] of FROZEN_AJAMI) {
    if (word.startsWith(form)) return spelled + ajamiTail(word.slice(form.length));
  }
  return ajamiTail(word, true);
}
function ajamiTail(s, word_start = false) {
  // Initial-vowel carriers apply at a word start — and the proclitic dot COUNTS as one:
  // the dot vanishes (proclitics attach, as the Arabic article does) but the vowel after it
  // gets its carrier (na·pa·aḫāt → نَپَاَخات, never a stacked double-fatha).
  const VOWEL = /[aeiouāēīōū]/;
  let out = '', ws = word_start, prevVowel = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '·') { ws = true; continue; }
    if (ch === ' ' || ch === '-') { out += ch; ws = true; prevVowel = false; continue; }
    // a vowel needs a carrier at a word/proclitic start AND in hiatus (Arabic never opens a syllable bare)
    if ((ws || prevVowel) && AJAMI_CARRIER[ch]) { out += AJAMI_CARRIER[ch]; ws = false; prevVowel = true; continue; }
    if (/[a-zāēīōūʾʿ'ṯḏšḫġčžḥṣḍṭẓ]/.test(ch)) { out += S.toAjami(ch); ws = false; prevVowel = VOWEL.test(ch); }
    else { out += ch; ws = !/[\p{L}\p{M}]/u.test(ch); prevVowel = false; }
  }
  return out;
}
function ajamiPhrase(amr) {
  const s = lower(amr); // dots survive into ajamiTail, which treats them as carrier triggers
  const out = s.split(/(\s+)/).map(seg => (/^\s+$/.test(seg) ? seg : ajamiWord(seg))).join('');
  return out.replace(/,/g, '،').replace(/\?/g, '؟');
}

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
