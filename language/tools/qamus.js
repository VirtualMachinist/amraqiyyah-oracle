#!/usr/bin/env node
// Na·Qamus — the Amraqiyyah dictionary, the ocean of words (HANDOFF §5; R-044 named it).
// Usage: node tools/qamus.js  → writes deliverables/qamus.html
// GENERATED — never hand-edit. Data: data/roots.json + data/frozen.json via the engine.
// R-055 governs: academic rigor — etymology verbatim, source status shown honestly, R-refs kept.
// R-061 (dictionary order): body in hijāʾī root-order, Ajami extensions after their base letters
// (b→p, j→č, z→ž, f→v, k→g); the alphabetical index uses extended-Latin order for lookup.
'use strict';
const fs = require('fs');
const path = require('path');
const M = require('./morphology');
const O = require('./orthography');

const roots = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'roots.json'), 'utf8')).roots;
const frozen = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'frozen.json'), 'utf8'));
const OUT = path.join(__dirname, '..', 'deliverables', 'qamus.html');

// R-061 hijāʾī order, extensions beside their bases
const HIJA = ["'", 'ʾ', 'ʿ', 'b', 'p', 't', 'ṯ', 'j', 'č', 'ḥ', 'ḫ', 'd', 'ḏ', 'r', 'z', 'ž', 's', 'š', 'ṣ', 'ḍ', 'ṭ', 'ẓ', 'ġ', 'f', 'v', 'q', 'k', 'g', 'l', 'm', 'n', 'h', 'w', 'y'];
const hijaRank = Object.fromEntries(HIJA.map((c, i) => [c, i]));
// Extended-Latin index order
const LATIN = ['a', 'ā', 'b', 'č', 'c', 'd', 'ḍ', 'ḏ', 'e', 'ē', 'f', 'g', 'ġ', 'h', 'ḥ', 'ḫ', 'i', 'ī', 'j', 'k', 'l', 'm', 'n', 'o', 'ō', 'p', 'q', 'r', 's', 'ṣ', 'š', 't', 'ṭ', 'ṯ', 'u', 'ū', 'v', 'w', 'y', 'z', 'ẓ', 'ž', 'ʿ', 'ʾ', "'"];
const latinRank = Object.fromEntries(LATIN.map((c, i) => [c, i]));
const latinCmp = (a, b) => {
  const A = [...a.toLowerCase()], B = [...b.toLowerCase()];
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const ra = latinRank[A[i]] ?? 99, rb = latinRank[B[i]] ?? 99;
    if (ra !== rb) return ra - rb;
  }
  return 0;
};

// IPA per spec §2.1
const IPA = { "'": 'ʔ', 'ʾ': 'ʔ', 'ʿ': 'ʕ', b: 'b', t: 't', ṯ: 'θ', j: 'dʒ', č: 'tʃ', ḥ: 'ħ', ḫ: 'x', d: 'd', ḏ: 'ð', r: 'r', z: 'z', ž: 'ʒ', s: 's', š: 'ʃ', ṣ: 'sˤ', ḍ: 'dˤ', ṭ: 'tˤ', ẓ: 'zˤ', ġ: 'ɣ', f: 'f', v: 'v', q: 'q', k: 'k', g: 'g', l: 'l', m: 'm', n: 'n', h: 'h', w: 'w', y: 'j', p: 'p', a: 'a', e: 'e', i: 'i', o: 'o', u: 'u', ā: 'aː', ē: 'eː', ī: 'iː', ō: 'oː', ū: 'uː', '·': '' };
const ipa = w => '/' + [...w.toLowerCase()].map(c => IPA[c] ?? c).join('') + '/';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Citation form: explicit citation > verb (bi/tri) > Pattern-I verb (quad) — rootless must carry one
function citationOf(r) {
  if (r.citation) return r.citation;
  if (!r.skeleton) return null;
  return M.derive(r.skeleton, 'verb');
}
const FAMILY = ['verb', 'abstract', 'agent', 'patient', 'locative', 'instrumental', 'collective', 'diminutive', 'augmentative', 'adjective', 'stative'];

// group by first radical (rootless: first letter of citation)
const sections = new Map();
for (const r of roots) {
  const key = r.skeleton ? r.skeleton[0] : citationOf(r)[0];
  const k = hijaRank[key] !== undefined ? key : "'";
  if (!sections.has(k)) sections.set(k, []);
  sections.get(k).push(r);
}
const orderedLetters = [...sections.keys()].sort((a, b) => (hijaRank[a] ?? 99) - (hijaRank[b] ?? 99));
for (const list of sections.values()) {
  list.sort((a, b) => {
    const A = a.skeleton || [...citationOf(a)], B = b.skeleton || [...citationOf(b)];
    for (let i = 0; i < Math.max(A.length, B.length); i++) {
      const ra = hijaRank[A[i]] ?? 50, rb = hijaRank[B[i]] ?? 50;
      if (ra !== rb) return ra - rb;
    }
    return 0;
  });
}

const statusCounts = { verified: 0, pending: 0, coined: 0, other: 0 };
for (const r of roots) {
  const s = (r.source && r.source.status) || 'other';
  if (statusCounts[s] === undefined) statusCounts.other++; else statusCounts[s]++;
}

const classOf = r => !r.skeleton ? 'lexeme' : ['', '', 'bi', 'tri', 'quad'][r.skeleton.length];

let body = '', indexItems = [];
let entryCount = 0;
for (const letter of orderedLetters) {
  const list = sections.get(letter);
  const display = letter === "'" ? 'ʾ' : letter;
  body += `
  <section class="letter-section">
    <div class="letter-head">
      <span class="letter-rom">${esc(display)}</span>
      <span class="letter-coptic">${esc(O.copticPhrase(display === 'ʾ' ? "'" : display))}</span>
      <span class="letter-ajami" dir="rtl">${esc(display === 'ʾ' ? 'ء' : O.ajamiPhrase(display))}</span>
      <span class="letter-count">${list.length} ${list.length === 1 ? 'root' : 'roots'}</span>
    </div>`;
  for (const r of list) {
    entryCount++;
    const cls = classOf(r);
    const head = r.skeleton ? r.skeleton.map(c => c === "'" ? 'ʾ' : c).join('-').toUpperCase() : citationOf(r);
    const cit = citationOf(r);
    const status = (r.source && r.source.status) || '—';
    indexItems.push([cit, head]);
    let family = '';
    if (cls === 'bi' || cls === 'tri') {
      const all = M.deriveAll(r.skeleton);
      family = `<div class="family">` + FAMILY.filter(f => all[f]).map(f => {
        if (!indexItems.some(([w]) => w === all[f])) indexItems.push([all[f], head]);
        return `<span class="fam-item"><span class="fam-label">${f}</span> ${esc(all[f])}</span>`;
      }).join('<span class="fam-sep"> · </span>') + `</div>`;
    } else if (cls === 'quad') {
      const v = M.derive(r.skeleton, 'verb');
      indexItems.push([v, head]);
      family = `<div class="family"><span class="fam-item"><span class="fam-label">Pattern I</span> ${esc(v)}</span><span class="fam-sep"> · </span><span class="fam-item"><span class="fam-label">nominals</span> from the citation with the regular suffix machinery (D-4)</span></div>`;
    }
    const flags = (r.flags || []).map(f => `<span class="flag">${esc(f)}</span>`).join('');
    body += `
    <article class="root-entry" id="root-${entryCount}">
      <div class="root-head">
        <span class="skeleton">${esc(head)}</span>
        <span class="chip chip-class">${cls}</span>
        <span class="chip chip-${esc(status)}">${esc(status)}</span>
      </div>
      <div class="cit-row">
        <span class="cit">${esc(cit)}</span>
        <span class="ipa">${esc(ipa(cit))}</span>
        <span class="community">${esc(O.communityPhrase(cit))}</span>
        <span class="coptic">${esc(O.copticPhrase(cit))}</span>
        <span class="ajami" dir="rtl">${esc(O.ajamiPhrase(cit))}</span>
      </div>
      <p class="gloss">${esc(r.gloss)}</p>
      <p class="etym"><span class="etym-lang">${esc(r.source.lang)}</span> · ${esc(r.source.word)}</p>
      ${family}
      ${flags ? `<div class="flags">${flags}</div>` : ''}
    </article>`;
  }
  body += `\n  </section>`;
}

// Frozen registry appendix
let frozenRows = '';
for (const f of frozen.frozen) {
  frozenRows += `<div class="frozen-row"><span class="cit">${esc(f.display)}</span><span class="ipa">${esc(ipa(f.form))}</span><span class="gloss-inline">${esc(f.gloss)}</span><span class="etym-inline">${f.root ? 'root ' + esc(f.root.toUpperCase()) : 'rootless'}</span>${f.ajami ? `<span class="ajami" dir="rtl">${esc(f.ajami)}</span>` : `<span class="ajami" dir="rtl">${esc(O.ajamiPhrase(f.form))}</span>`}</div>`;
}

// Alphabetical index (extended-Latin order), deduped
const seen = new Set();
const index = indexItems
  .filter(([w]) => { const k = w.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
  .sort((a, b) => latinCmp(a[0], b[0]));
const indexHtml = index.map(([w, root]) => `<span class="ix"><span class="ix-w">${esc(w)}</span> <span class="ix-r">${esc(root)}</span></span>`).join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Na·Qamus — the Amraqiyyah Dictionary</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=Amiri:wght@400;700&family=Noto+Sans+Coptic&display=swap" rel="stylesheet">
<style>
:root {
  --bg:#0b0b12; --panel:#14141f; --panel-soft:#1b1b2a; --line:#2b2b40;
  --text:#e8e6f0; --dim:#9a96b8;
  --gold:#d4af6a; --copper:#b87333; --copper-light:#d99a5c;
  --lapis:#26418f; --lapis-light:#6d8fd8; --teal:#5ac8c8; --crimson:#c85a6e;
  --font-display:"Crimson Pro",Georgia,serif; --font-body:"EB Garamond",Georgia,serif;
  --font-mono:"IBM Plex Mono",ui-monospace,monospace; --font-arabic:"Amiri","Times New Roman",serif;
  --font-coptic:"Noto Sans Coptic",serif;
}
* { box-sizing:border-box; margin:0; }
body { background:var(--bg); color:var(--text); font-family:var(--font-body); line-height:1.5; }
.aq-field { position:relative; }
.aq-field::before { content:""; position:absolute; inset:0; pointer-events:none; z-index:0; opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cg fill='none' stroke='%2326418f' stroke-width='0.6' stroke-opacity='0.28'%3E%3Ccircle cx='160' cy='160' r='40'/%3E%3Ccircle cx='160' cy='160' r='80'/%3E%3Ccircle cx='160' cy='160' r='120'/%3E%3Ccircle cx='160' cy='160' r='158'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat:repeat; background-size:320px 320px; }
.aq-field > * { position:relative; z-index:1; }
.aq-eyebrow { font-family:var(--font-mono); font-size:.72rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:var(--dim); }
.wrap { max-width:820px; margin:0 auto; padding:48px 24px 96px; }
.cover { text-align:center; padding:72px 0 56px; border-bottom:1px solid var(--line); }
.cover img.mark { width:56px; height:56px; object-fit:contain; opacity:.9; margin-bottom:20px; }
.cover h1 { font-family:var(--font-display); font-weight:700; font-size:2.6rem; color:var(--gold); margin:10px 0 4px; }
.cover .subtitle { font-style:italic; color:var(--dim); font-size:1.05rem; }
.cover .title-scripts { margin-top:18px; display:flex; flex-direction:column; gap:6px; align-items:center; }
.cover .stats { margin-top:26px; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.14em; color:var(--teal); }
.cover .honesty { margin-top:8px; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.1em; color:var(--dim); }

.letter-section { margin-top:52px; }
.letter-head { display:flex; align-items:baseline; gap:16px; border-bottom:1px solid var(--copper); padding-bottom:8px; }
.letter-rom { font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:var(--gold); }
.letter-coptic { font-family:var(--font-coptic); font-size:1.4rem; color:var(--copper-light); }
.letter-ajami { font-family:var(--font-arabic); font-size:1.6rem; color:var(--lapis-light); }
.letter-count { margin-left:auto; font-family:var(--font-mono); font-size:.72rem; color:var(--dim); letter-spacing:.12em; }

.root-entry { background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:14px 16px; margin-top:12px; break-inside:avoid; }
.root-head { display:flex; align-items:baseline; gap:10px; }
.skeleton { font-family:var(--font-mono); font-weight:500; font-size:1.05rem; color:var(--gold); letter-spacing:.08em; flex:1; }
.chip { font-family:var(--font-mono); font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; border-radius:20px; padding:2px 10px; border:1px solid var(--line); color:var(--dim); }
.chip-verified { border-color:var(--teal); color:var(--teal); }
.chip-pending { border-color:var(--crimson); color:var(--crimson); }
.chip-coined { border-color:var(--copper); color:var(--copper-light); }
.cit-row { display:flex; flex-wrap:wrap; gap:6px 16px; align-items:baseline; margin-top:8px; }
.cit { font-family:var(--font-display); font-weight:600; font-size:1.3rem; color:var(--text); }
.ipa { font-family:var(--font-mono); font-size:.78rem; color:var(--dim); }
.community { font-family:var(--font-mono); font-size:.8rem; color:var(--teal); }
.coptic { font-family:var(--font-coptic); font-size:1rem; color:var(--copper-light); }
.ajami { font-family:var(--font-arabic); direction:rtl; font-size:1.25rem; color:var(--lapis-light); line-height:1.7; }
.gloss { margin-top:8px; color:var(--text); }
.etym { margin-top:4px; font-family:var(--font-mono); font-size:.74rem; color:var(--dim); }
.etym-lang { color:var(--copper-light); }
.family { margin-top:10px; padding-top:8px; border-top:1px solid var(--line); font-size:.92rem; color:var(--text); }
.fam-label { font-family:var(--font-mono); font-size:.62rem; letter-spacing:.1em; text-transform:uppercase; color:var(--dim); margin-right:4px; }
.fam-sep { color:var(--line); }
.flags { margin-top:8px; display:flex; flex-wrap:wrap; gap:6px; }
.flag { font-family:var(--font-mono); font-size:.62rem; color:var(--dim); border:1px solid var(--line); border-radius:8px; padding:2px 8px; }

.appendix { margin-top:64px; }
.appendix h2, .index-section h2 { font-family:var(--font-display); font-weight:600; font-size:1.6rem; color:var(--gold); margin:8px 0 12px; }
.frozen-row { display:flex; flex-wrap:wrap; gap:6px 14px; align-items:baseline; border-bottom:1px solid var(--line); padding:8px 2px; }
.gloss-inline { color:var(--dim); font-style:italic; flex:1; min-width:200px; }
.etym-inline { font-family:var(--font-mono); font-size:.68rem; color:var(--dim); }

.index-section { margin-top:64px; }
.index-grid { columns:3; column-gap:24px; font-size:.9rem; }
@media (max-width:640px){ .index-grid { columns:2; } }
.ix { display:block; break-inside:avoid; padding:1px 0; }
.ix-w { color:var(--text); }
.ix-r { font-family:var(--font-mono); font-size:.68rem; color:var(--dim); }

.colophon { margin-top:72px; padding-top:20px; border-top:1px solid var(--line); text-align:center; }
.colophon p { color:var(--dim); font-size:.9rem; }
.colophon .charge { font-family:var(--font-display); font-style:italic; margin-top:10px; }

@media print {
  @page { size:378pt 522pt; margin:0; }
  html, body { background:var(--bg) !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .wrap { max-width:none; padding:26pt 24pt 34pt; }
  .cover { min-height:440pt; display:flex; flex-direction:column; justify-content:center; align-items:center; border-bottom:none; page-break-after:always; }
  .index-grid { columns:2; }
  .root-entry { page-break-inside:avoid; }
  .letter-section { page-break-before:always; margin-top:0; padding-top:10pt; }
  .letter-section:first-of-type { page-break-before:auto; }
}
</style>
</head>
<body class="aq-field">
<div class="wrap">
  <header class="cover">
    <img class="mark" src="../../docs/design-system/assets/hedronite-glyph-copper.png" alt="✦" onerror="this.outerHTML='&lt;div style=&quot;color:#b87333;font-size:1.6rem&quot;&gt;✦&lt;/div&gt;'">
    <div class="aq-eyebrow">Al-Tariqa Amraqiyyah · The Language of the Way</div>
    <h1>Na·Qamus</h1>
    <div class="subtitle">The Amraqiyyah Dictionary — the Ocean of Words</div>
    <div class="title-scripts">
      <span class="community">${esc(O.communityPhrase('Na·Qamus'))}</span>
      <span class="coptic">${esc(O.copticPhrase('Na·Qamus'))}</span>
      <span class="ajami" dir="rtl">${esc(O.ajamiPhrase('Na·Qamus'))}</span>
    </div>
    <div class="stats">${roots.length} ROOTS · ${statusCounts.verified} VERIFIED · ${statusCounts.pending} PENDING · ${statusCounts.coined} COINED · ${frozen.frozen.length} FROZEN · R-061 ORDER</div>
    <div class="honesty">A FALSE ANCESTOR IS THE ONE UNFORGIVABLE ERROR — PENDING FLAGS STAND UNTIL SOURCES DO</div>
  </header>
  ${body}
  <section class="appendix">
    <div class="aq-eyebrow">Appendix</div>
    <h2>The Frozen Lexeme Registry</h2>
    <p style="color:var(--dim);font-style:italic;margin-bottom:10px">Sacred citation forms exempt from renormalization (R-010, R-022); the 99 Names enumerate by reference to the Oracle registry — one table, consumed everywhere.</p>
    ${frozenRows}
  </section>
  <section class="index-section">
    <div class="aq-eyebrow">Index</div>
    <h2>Alphabetical Index — ${index.length} forms</h2>
    <div class="index-grid">
${indexHtml}
    </div>
  </section>
  <footer class="colophon">
    <div class="aq-eyebrow">Generated from data/roots.json + data/frozen.json · tools/qamus.js</div>
    <p>Root-organized per the hijāʾī order (R-061) · every family engine-derived · every source status shown.</p>
    <p class="charge">Na·qamus pe baḥar kilemiāt·i. — The dictionary IS an ocean of words.</p>
  </footer>
</div>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} — ${roots.length} roots in ${orderedLetters.length} letter-sections, ${index.length} indexed forms, ${frozen.frozen.length} frozen`);
