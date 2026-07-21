// Amraqiyyah running-text orthography (R-057) — THE BANK for kitebi niḥewi·i.
// script.js is the pure letter-table (R-048); this module is the law of letters in motion:
// dots, carriers, gemination, frozen sacred spellings, punctuation. Spec: spec/01-orthography-running-text.md
'use strict';
const fs = require('fs');
const path = require('path');
const S = require('./script');

const lower = s => s.toLowerCase();
const stripDots = s => s.replace(/·/g, '');
const SHADDA = 'ّ'; // Arabic doubling mark
const COPTIC_GEM = '̇'; // Coptic gemination dot (dot above — kin to the Bohairic jinkim)
const VOWEL = /[aeiouāēīōū]/;
const LETTER = /[a-zāēīōūʾʿ'ṯḏšḫġčžḥṣḍṭẓ]/;

// ---- Community: from the DISPLAY form; every morpheme dot becomes a typable hyphen ----
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
const communityPhrase = display =>
  display.replace(/·/g, '-').split(/([ -])/).map(seg => (/^[ -]$/.test(seg) ? seg : communitySeg(seg))).join('').normalize('NFC');

// ---- Gemination scan: CC or C·C (same consonant) writes once with the doubling mark ----
// Applies word-internally, including across attached proclitic boundaries (es·salām = السَّلام pattern).
function geminateAt(s, i) {
  const ch = s[i];
  if (!LETTER.test(ch) || VOWEL.test(ch)) return -1;
  let j = i + 1;
  if (s[j] === '·') j++;
  return s[j] === ch ? j : -1;
}

// ---- Coptic: dots attach silently; doubled consonant = single letter + gemination dot ----
// Frozen sacred forms are exempt from the doubling mark in EVERY script (as Arabic writes
// both lams of الله): Allah stays ⲁⲗⲗⲁϩ while the ordinary particle illa geminates to ⲓⲗ̇ⲁ.
function copticSpan(s, geminate) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '·') continue;
    if (geminate) {
      const g = geminateAt(s, i);
      if (g >= 0) { out += S.toCoptic(ch) + COPTIC_GEM; i = g; continue; }
    }
    out += LETTER.test(ch) ? S.toCoptic(ch) : ch;
  }
  return out;
}
function copticWord(word) {
  for (const [form] of FROZEN_AJAMI) {
    if (word.startsWith(form)) return copticSpan(form, false) + copticSpan(word.slice(form.length), true);
  }
  return copticSpan(word, true);
}
const copticPhrase = amr =>
  lower(amr).split(/(\s+)/).map(seg => (/^\s+$/.test(seg) ? seg : copticWord(seg))).join('').normalize('NFC');

// ---- Ajami: carriers, shadda, frozen sacred spellings, localized punctuation ----
const AJAMI_CARRIER = { 'a': 'اَ', 'i': 'اِ', 'u': 'اُ', 'ā': 'آ', 'ī': 'اِي', 'ū': 'اُو', 'e': 'ئێ', 'ē': 'ئێ', 'o': 'ئۆ', 'ō': 'ئۆ' };

// Frozen sacred forms keep their inherited Arabic orthography (R-022 extended); prefix-matched
// so case vowels ride the frozen spelling (Allah·a → اللهَ, Quranic practice). Data: frozen.json "ajami".
const FROZEN = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'frozen.json'), 'utf8')).frozen;
const FROZEN_AJAMI = FROZEN.filter(f => f.ajami).map(f => [lower(f.form), f.ajami]).sort((a, b) => b[0].length - a[0].length);

function ajamiTail(s, word_start = false) {
  let out = '', ws = word_start, prevVowel = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '·') { ws = true; continue; }
    if (ch === ' ' || ch === '-') { out += ch; ws = true; prevVowel = false; continue; }
    // a vowel needs a carrier at a word/proclitic start and in hiatus (no bare syllable onset)
    if ((ws || prevVowel) && AJAMI_CARRIER[ch]) { out += AJAMI_CARRIER[ch]; ws = false; prevVowel = true; continue; }
    const g = geminateAt(s, i);
    if (g >= 0) { out += S.toAjami(ch) + SHADDA; i = g; ws = false; prevVowel = false; continue; }
    if (LETTER.test(ch)) { out += S.toAjami(ch); ws = false; prevVowel = VOWEL.test(ch); }
    else { out += ch; ws = !/[\p{L}\p{M}]/u.test(ch); prevVowel = false; }
  }
  return out;
}
// The sacred article wears ال in Ajami (R-059), as Arabic itself always writes ال and lets
// pronunciation assimilate: unassimilated al·/el· → ال + tail; assimilated eC·C/aC·C (same
// sun letter) → ال + letter + shadda (es·salām → السَّلام). Known edge, documented in spec:
// the preposition en· before an n-initial word would false-match; no such token exists today.
const SUN = 'tṯdḏrzsšṣḍṭẓln';
function ajamiWord(word) {
  for (const [form, spelled] of FROZEN_AJAMI) {
    if (word.startsWith(form)) return spelled + ajamiTail(word.slice(form.length));
  }
  const assim = word.match(new RegExp(`^[ae]([${SUN}])·\\1`));
  if (assim) return 'ال' + S.toAjami(assim[1]) + SHADDA + ajamiTail(word.slice(assim[0].length));
  if (/^[ae]l·/.test(word)) return 'ال' + ajamiTail(word.slice(3));
  return ajamiTail(word, true);
}
function ajamiPhrase(amr) {
  const s = lower(amr);
  const out = s.split(/(\s+)/).map(seg => (/^\s+$/.test(seg) ? seg : ajamiWord(seg))).join('');
  return out.replace(/,/g, '،').replace(/\?/g, '؟').normalize('NFC');
}

module.exports = { communityPhrase, copticPhrase, ajamiPhrase, stripDots };
