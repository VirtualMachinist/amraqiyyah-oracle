#!/usr/bin/env node
// Kitebi Kilemiāt·i — the styled phrasebook (HANDOFF §4.4: aesthetics last, per the Design System).
// Usage: node tools/phrasebook-html.js  → writes deliverables/kitebi-kilemiat.html
// GENERATED — never hand-edit. Content: data/phrases.json via tools/orthography.js (R-057/R-059).
// Design: docs/design-system/ — tokens verbatim from tokens/colors.css & typography.css; the
// .aq-field ripple and .aq-eyebrow idiom from tokens/base.css; fonts per system convention
// (Google CDN) plus Noto Sans Coptic, a phrasebook-specific addition for the everyday script.
'use strict';
const fs = require('fs');
const path = require('path');
const O = require('./orthography');

const corpus = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'phrases.json'), 'utf8'));
const OUT = path.join(__dirname, '..', 'deliverables', 'kitebi-kilemiat.html');

const CHAPTERS = [
  ['greetings', 'Silemiāt', 'Greetings'],
  ['courtesy', 'Fiḍeli', 'Courtesy — the small graces'],
  ['family', 'Sanupa', 'Family'],
  ['table', 'Homipon', 'The Table'],
  ['heart', 'Ib', 'The Heart'],
  ['worship', 'ʿIbedi', 'Worship'],
  ['the-people', 'Na·šaʿab', 'The People'],
  ['the-world', 'Na·yak ma na·pet', 'The World'],
  ['the-road', 'Na·hina', 'The Road'],
  ['the-academy', 'Sabeʾow', 'The Academy'],
  ['numbers', 'Ḥosibonāt', 'Numbers'],
  ['market', 'Tajerow', 'The Market'],
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const amrOf = t => t; // titles are already display-form; orthography handles dots

const by = {};
for (const p of corpus.phrases) (by[p.chapter] = by[p.chapter] || []).push(p);

const titleAmr = 'Kitebi Kilemiāt·i';
const fourScriptTitle = {
  community: O.communityPhrase(titleAmr),
  coptic: O.copticPhrase(titleAmr),
  ajami: O.ajamiPhrase(titleAmr),
};

let entries = '', n = 0;
let chapters = '';
for (let c = 0; c < CHAPTERS.length; c++) {
  const [slug, amr, en] = CHAPTERS[c];
  const list = by[slug] || [];
  let rows = '';
  for (const p of list) {
    n++;
    rows += `
      <article class="entry">
        <div class="entry-head">
          <span class="num">${String(n).padStart(3, '0')}</span>
          <span class="display">${esc(p.display)}</span>
          <span class="chip chip-${p.register}">${p.register}</span>
        </div>
        <p class="english">${esc(p.en)}</p>
        <div class="scripts">
          <span class="community">${esc(O.communityPhrase(p.display))}</span>
          <span class="coptic">${esc(O.copticPhrase(p.amr))}</span>
          <span class="ajami" dir="rtl">${esc(O.ajamiPhrase(p.amr))}</span>
        </div>
      </article>`;
  }
  chapters += `
    <section class="chapter">
      <div class="aq-eyebrow">${String(c + 1).padStart(2, '0')} · ${esc(en).toUpperCase()}</div>
      <h2>${esc(amr)}</h2>
      <div class="chapter-scripts">
        <span class="community">${esc(O.communityPhrase(amr))}</span>
        <span class="coptic">${esc(O.copticPhrase(amr))}</span>
        <span class="ajami" dir="rtl">${esc(O.ajamiPhrase(amr))}</span>
      </div>
      ${rows}
    </section>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kitebi Kilemiāt·i — the Amraqiyyah Phrasebook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=Amiri:wght@400;700&family=Noto+Sans+Coptic&display=swap" rel="stylesheet">
<style>
/* Tokens verbatim from docs/design-system/tokens (colors.css, typography.css) */
:root {
  --bg:#0b0b12; --panel:#14141f; --panel-soft:#1b1b2a; --line:#2b2b40;
  --text:#e8e6f0; --dim:#9a96b8;
  --gold:#d4af6a; --copper:#b87333; --copper-light:#d99a5c;
  --lapis:#26418f; --lapis-light:#6d8fd8; --teal:#5ac8c8; --crimson:#c85a6e;
  --font-display:"Crimson Pro",Georgia,serif;
  --font-body:"EB Garamond",Georgia,serif;
  --font-mono:"IBM Plex Mono",ui-monospace,monospace;
  --font-arabic:"Amiri","Times New Roman",serif;
  --font-coptic:"Noto Sans Coptic",serif; /* phrasebook addition — the everyday script */
}
* { box-sizing:border-box; margin:0; }
body { background:var(--bg); color:var(--text); font-family:var(--font-body); line-height:1.55; }
.aq-field { position:relative; }
.aq-field::before { content:""; position:absolute; inset:0; pointer-events:none; z-index:0; opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cg fill='none' stroke='%2326418f' stroke-width='0.6' stroke-opacity='0.28'%3E%3Ccircle cx='160' cy='160' r='40'/%3E%3Ccircle cx='160' cy='160' r='80'/%3E%3Ccircle cx='160' cy='160' r='120'/%3E%3Ccircle cx='160' cy='160' r='158'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat:repeat; background-size:320px 320px; }
.aq-field > * { position:relative; z-index:1; }
.aq-eyebrow { font-family:var(--font-mono); font-size:.72rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:var(--dim); }
.wrap { max-width:760px; margin:0 auto; padding:48px 24px 96px; }

/* Cover */
.cover { text-align:center; padding:72px 0 56px; border-bottom:1px solid var(--line); }
.cover img.mark { width:56px; height:56px; object-fit:contain; opacity:.9; margin-bottom:20px; }
.cover .mark-fallback { color:var(--copper); font-size:1.6rem; }
.cover h1 { font-family:var(--font-display); font-weight:700; font-size:2.6rem; color:var(--gold); margin:10px 0 4px; }
.cover .subtitle { font-family:var(--font-body); font-style:italic; color:var(--dim); font-size:1.05rem; }
.cover .title-scripts { margin-top:18px; display:flex; flex-direction:column; gap:6px; align-items:center; }
.cover .stats { margin-top:26px; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.14em; color:var(--teal); }
.cover .charge { margin-top:14px; font-family:var(--font-display); font-style:italic; color:var(--dim); font-size:.95rem; }

/* Chapters */
.chapter { margin-top:56px; break-before:page; }
.chapter:first-of-type { break-before:auto; }
.chapter h2 { font-family:var(--font-display); font-weight:600; font-size:1.7rem; color:var(--gold); margin:6px 0 2px; }
.chapter-scripts { display:flex; gap:14px; align-items:baseline; flex-wrap:wrap; color:var(--dim);
  padding-bottom:14px; border-bottom:1px solid var(--line); margin-bottom:8px; }

/* Entries — outlined, never shadowed (system law) */
.entry { background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:14px 16px; margin-top:12px; break-inside:avoid; }
.entry-head { display:flex; align-items:baseline; gap:12px; }
.num { font-family:var(--font-mono); font-weight:300; font-size:.72rem; color:var(--dim); }
.display { font-family:var(--font-display); font-weight:600; font-size:1.18rem; color:var(--text); flex:1; }
.chip { font-family:var(--font-mono); font-size:.62rem; letter-spacing:.12em; text-transform:uppercase; border-radius:20px; padding:2px 10px; border:1px solid var(--line); color:var(--dim); }
.chip-sacred { background:var(--gold); border-color:var(--gold); color:#0b0b12; }
.chip-plain { border-color:var(--teal); color:var(--teal); }
.english { font-family:var(--font-body); font-style:italic; color:var(--dim); margin:4px 0 10px; padding-left:2.4rem; }
.scripts { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px 16px; align-items:baseline;
  border-top:1px solid var(--line); padding-top:10px; }
.community { font-family:var(--font-mono); font-size:.8rem; color:var(--teal); }
.coptic { font-family:var(--font-coptic); font-size:.98rem; color:var(--copper-light); }
.ajami { font-family:var(--font-arabic); direction:rtl; text-align:right; font-size:1.22rem; color:var(--lapis-light); line-height:1.9; }
@media (max-width:620px){ .scripts { grid-template-columns:1fr; } .ajami { text-align:left; direction:rtl; } }

/* Colophon */
.colophon { margin-top:72px; padding-top:20px; border-top:1px solid var(--line); text-align:center; }
.colophon .aq-eyebrow { margin-bottom:8px; }
.colophon p { color:var(--dim); font-size:.9rem; }
.colophon .charge { font-family:var(--font-display); font-style:italic; margin-top:10px; }

@media print {
  @page { size:378pt 522pt; margin:0; }
  html, body { background:var(--bg) !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .wrap { max-width:none; padding:26pt 24pt 34pt; }
  .cover { min-height:440pt; display:flex; flex-direction:column; justify-content:center; align-items:center; border-bottom:none; page-break-after:always; }
  .scripts { grid-template-columns:1fr; gap:4px; }
  .ajami { text-align:left; }
  .entry { page-break-inside:avoid; }
  .chapter { page-break-before:always; margin-top:0; padding-top:10pt; }
  .chapter:first-of-type { page-break-before:auto; }
}
</style>
</head>
<body class="aq-field">
<div class="wrap">
  <header class="cover">
    <img class="mark" src="../../docs/design-system/assets/hedronite-glyph-copper.png" alt="✦" onerror="this.outerHTML='&lt;div class=&quot;mark-fallback&quot;&gt;✦&lt;/div&gt;'">
    <div class="aq-eyebrow">Al-Tariqa Amraqiyyah · The Language of the Way</div>
    <h1>${esc(titleAmr)}</h1>
    <div class="subtitle">The Amraqiyyah Phrasebook — the Book of Words</div>
    <div class="title-scripts">
      <span class="community">${esc(fourScriptTitle.community)}</span>
      <span class="coptic">${esc(fourScriptTitle.coptic)}</span>
      <span class="ajami" dir="rtl">${esc(fourScriptTitle.ajami)}</span>
    </div>
    <div class="stats">${corpus.phrases.length} PHRASES · ${CHAPTERS.length} CHAPTERS · 4 SCRIPTS · R-049–R-059 · NOTHING HAND-TYPED</div>
    <div class="charge">Na·pa·aḫāt bi·i·hariwa. — The Ancestors be watching.</div>
  </header>
  ${chapters}
  <footer class="colophon">
    <div class="aq-eyebrow">Generated from data/phrases.json · tools/phrasebook-html.js</div>
    <p>Every phrase ratified; every script generated; every rule ledgered.</p>
    <p class="charge">Ḏakira, saša, ma la nasiya. — Remember, write, and don't forget.</p>
  </footer>
</div>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} — ${n} phrases, ${CHAPTERS.length} chapters, styled per the Design System`);
