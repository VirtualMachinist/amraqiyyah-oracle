#!/usr/bin/env node
// The Canon Translations — Secondary Canon texts in Amraqiyyah (R-068; docs/03-CANON.md mandate).
// Usage: node tools/canon.js  → writes deliverables/canon-translations.html
// GENERATED — never hand-edit. Data: data/translations.json via tools/orthography.js.
// Canon hierarchy rule 5: the source language is authoritative — the source line travels with every verse.
'use strict';
const fs = require('fs');
const path = require('path');
const O = require('./orthography');

const T = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'translations.json'), 'utf8'));
const OUT = path.join(__dirname, '..', 'deliverables', 'canon-translations.html');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let body = '', total = 0;
for (const t of T.texts) {
  body += `
  <section class="text">
    <div class="aq-eyebrow">${esc(t.canon).toUpperCase()}</div>
    <h2>${esc(t.title)}</h2>
    <div class="text-amr-title">${esc(t.titleAmr)}</div>
    <div class="src-note">Source: ${esc(t.sourceLang)} — authoritative in ambiguity (Canon rule 5)</div>`;
  for (const l of t.lines) {
    total++;
    body += `
    <article class="verse">
      <div class="verse-head"><span class="vnum">${String(l.n).padStart(2, '0')}</span><span class="src">${esc(l.src)}</span></div>
      <div class="amr-line">${esc(l.display)}</div>
      <div class="scripts">
        <span class="community">${esc(O.communityPhrase(l.display))}</span>
        <span class="coptic">${esc(O.copticPhrase(l.amr))}</span>
        <span class="ajami" dir="rtl">${esc(O.ajamiPhrase(l.amr))}</span>
      </div>
      <p class="english">${esc(l.en)}</p>
      ${l.note ? `<p class="tnote">${esc(l.note)}</p>` : ''}
    </article>`;
  }
  body += `\n  </section>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Canon Translations — Amraqiyyah</title>
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
body { background:var(--bg); color:var(--text); font-family:var(--font-body); line-height:1.55; }
.aq-field { position:relative; }
.aq-field::before { content:""; position:absolute; inset:0; pointer-events:none; z-index:0; opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cg fill='none' stroke='%2326418f' stroke-width='0.6' stroke-opacity='0.28'%3E%3Ccircle cx='160' cy='160' r='40'/%3E%3Ccircle cx='160' cy='160' r='80'/%3E%3Ccircle cx='160' cy='160' r='120'/%3E%3Ccircle cx='160' cy='160' r='158'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat:repeat; background-size:320px 320px; }
.aq-field > * { position:relative; z-index:1; }
.aq-eyebrow { font-family:var(--font-mono); font-size:.72rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:var(--dim); }
.wrap { max-width:720px; margin:0 auto; padding:48px 24px 96px; }
.cover { text-align:center; padding:72px 0 56px; border-bottom:1px solid var(--line); }
.cover img.mark { width:56px; height:56px; object-fit:contain; opacity:.9; margin-bottom:20px; }
.cover h1 { font-family:var(--font-display); font-weight:700; font-size:2.4rem; color:var(--gold); margin:10px 0 4px; }
.cover .subtitle { font-style:italic; color:var(--dim); font-size:1.05rem; }
.cover .stats { margin-top:24px; font-family:var(--font-mono); font-size:.76rem; letter-spacing:.14em; color:var(--teal); }
.cover .charge { margin-top:14px; font-family:var(--font-display); font-style:italic; color:var(--dim); font-size:.95rem; }

.text { margin-top:56px; }
.text h2 { font-family:var(--font-display); font-weight:600; font-size:1.7rem; color:var(--gold); margin:6px 0 0; }
.text-amr-title { font-family:var(--font-display); font-style:italic; color:var(--copper-light); font-size:1.1rem; }
.src-note { font-family:var(--font-mono); font-size:.68rem; letter-spacing:.08em; color:var(--dim); margin:6px 0 10px; padding-bottom:10px; border-bottom:1px solid var(--line); }

.verse { background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:16px 18px; margin-top:14px; break-inside:avoid; }
.verse-head { display:flex; gap:12px; align-items:baseline; }
.vnum { font-family:var(--font-mono); font-weight:300; font-size:.72rem; color:var(--dim); }
.src { font-family:"Noto Serif SC",serif; font-size:1.05rem; color:var(--lapis-light); }
.amr-line { font-family:var(--font-display); font-weight:600; font-size:1.22rem; color:var(--text); margin:8px 0 8px; }
.scripts { display:flex; flex-wrap:wrap; gap:6px 18px; align-items:baseline; border-top:1px solid var(--line); padding-top:8px; }
.community { font-family:var(--font-mono); font-size:.78rem; color:var(--teal); }
.coptic { font-family:var(--font-coptic); font-size:.95rem; color:var(--copper-light); }
.ajami { font-family:var(--font-arabic); direction:rtl; font-size:1.2rem; color:var(--lapis-light); line-height:1.8; }
.english { font-style:italic; color:var(--text); margin-top:8px; }
.tnote { font-family:var(--font-mono); font-size:.7rem; color:var(--dim); margin-top:6px; line-height:1.5; }

.colophon { margin-top:72px; padding-top:20px; border-top:1px solid var(--line); text-align:center; }
.colophon p { color:var(--dim); font-size:.9rem; }
.colophon .charge { font-family:var(--font-display); font-style:italic; margin-top:10px; }

@media print {
  @page { size:378pt 522pt; margin:0; }
  html, body { background:var(--bg) !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .wrap { max-width:none; padding:26pt 24pt 34pt; }
  .cover { min-height:440pt; display:flex; flex-direction:column; justify-content:center; align-items:center; border-bottom:none; page-break-after:always; }
  .verse { page-break-inside:avoid; }
  .text { page-break-before:always; margin-top:0; padding-top:10pt; }
  .text:first-of-type { page-break-before:auto; }
}
</style>
</head>
<body class="aq-field">
<div class="wrap">
  <header class="cover">
    <img class="mark" src="../../docs/design-system/assets/hedronite-glyph-copper.png" alt="✦" onerror="this.outerHTML='&lt;div style=&quot;color:#b87333;font-size:1.6rem&quot;&gt;✦&lt;/div&gt;'">
    <div class="aq-eyebrow">Al-Tariqa Amraqiyyah · The Language of the Way</div>
    <h1>The Canon Translations</h1>
    <div class="subtitle">The Secondary Canon, rendered into Arabiyah al-Amraqiyyah — as the Canon itself mandates</div>
    <div class="stats">${T.texts.length} TEXT${T.texts.length === 1 ? '' : 'S'} · ${total} VERSES · SOURCE AUTHORITATIVE IN AMBIGUITY (CANON RULE 5)</div>
    <div class="charge">Na·hina nin·ta i·jata·to, la pe al·hina ḏatāy.</div>
  </header>
  ${body}
  <footer class="colophon">
    <div class="aq-eyebrow">Generated from data/translations.json · tools/canon.js</div>
    <p>Queued: ${esc((T.queue || []).join(' · '))}</p>
    <p class="charge">Ar·ribesi en·ribesī — na·seba na·pa·biṭeniāt·i.</p>
  </footer>
</div>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} — ${T.texts.length} text(s), ${total} verses, four scripts each`);
