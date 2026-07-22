#!/usr/bin/env node
// Kitebi Niḥewi·i — the grammar textbook (HANDOFF §5; R-063).
// Usage: node tools/nihewi.js  → writes deliverables/kitebi-nihewi.html
// GENERATED — never hand-edit. Content: data/lessons.json (prose distills spec/00 + spec/01;
// examples are ratified corpus, Leipzig-glossed). Design: docs/design-system tokens verbatim;
// booklet print geometry per R-062 (378×522pt full-bleed night).
'use strict';
const fs = require('fs');
const path = require('path');
const O = require('./orthography');

const L = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'lessons.json'), 'utf8'));
const OUT = path.join(__dirname, '..', 'deliverables', 'kitebi-nihewi.html');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const titleAmr = 'Kitebi Niḥewi·i';

function interlinear(g) {
  const cols = g.morph.map((m, i) => `<span class="il-col"><span class="il-m">${esc(m)}</span><span class="il-g">${esc(g.gl[i] || '')}</span></span>`).join('');
  return `<div class="il">
    <div class="il-ph">${esc(g.ph)}</div>
    <div class="il-row">${cols}</div>
    <div class="il-en">‘${esc(g.en)}’</div>
  </div>`;
}

let body = '';
for (const lvl of L.levels) {
  const lessons = L.lessons.filter(x => x.level === lvl.key);
  body += `
  <section class="level">
    <div class="aq-eyebrow">Level · ${esc(lvl.en).toUpperCase()}</div>
    <h2 class="level-title">${esc(lvl.amr)}</h2>
    <p class="level-blurb">${esc(lvl.blurb)}</p>
    <div class="level-scripts">
      <span class="community">${esc(O.communityPhrase(lvl.amr))}</span>
      <span class="coptic">${esc(O.copticPhrase(lvl.amr))}</span>
      <span class="ajami" dir="rtl">${esc(O.ajamiPhrase(lvl.amr))}</span>
    </div>
  </section>`;
  for (const les of lessons) {
    let table = '';
    if (les.table) {
      table = `<figure class="ltable"><figcaption>${esc(les.table.caption)}</figcaption><table><thead><tr>${les.table.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${les.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></figure>`;
    }
    body += `
  <article class="lesson">
    <div class="aq-eyebrow">${esc(lvl.amr).toUpperCase()} · LESSON ${String(les.n).padStart(2, '0')}</div>
    <h3>${esc(les.amr)}</h3>
    <div class="lesson-en">${esc(les.en)}</div>
    <p class="focus">${esc(les.focus)}</p>
    ${les.prose.map(p => `<p class="prose">${esc(p)}</p>`).join('\n    ')}
    ${table}
    ${les.gloss.length ? `<div class="gloss-block"><div class="aq-eyebrow gl-eyebrow">Glossed — from the ratified corpus</div>${les.gloss.map(interlinear).join('')}</div>` : ''}
    <div class="drill"><span class="drill-label">Drill</span> ${esc(les.drill)}</div>
  </article>`;
  }
}

const abbrev = L.abbreviations.map(([a, b]) => `<tr><td class="ab-a">${esc(a)}</td><td>${esc(b)}</td></tr>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kitebi Niḥewi·i — the Amraqiyyah Grammar</title>
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
.wrap { max-width:760px; margin:0 auto; padding:48px 24px 96px; }
.cover { text-align:center; padding:72px 0 56px; border-bottom:1px solid var(--line); }
.cover img.mark { width:56px; height:56px; object-fit:contain; opacity:.9; margin-bottom:20px; }
.cover h1 { font-family:var(--font-display); font-weight:700; font-size:2.6rem; color:var(--gold); margin:10px 0 4px; }
.cover .subtitle { font-style:italic; color:var(--dim); font-size:1.05rem; }
.cover .title-scripts { margin-top:18px; display:flex; flex-direction:column; gap:6px; align-items:center; }
.cover .stats { margin-top:26px; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.14em; color:var(--teal); }
.cover .charge { margin-top:14px; font-family:var(--font-display); font-style:italic; color:var(--dim); font-size:.95rem; }

.frontmatter { margin-top:48px; }
.frontmatter h2 { font-family:var(--font-display); font-weight:600; font-size:1.4rem; color:var(--gold); margin:8px 0 10px; }
.ab-table { width:100%; border-collapse:collapse; font-size:.85rem; }
.ab-table td { border-top:1px solid var(--line); padding:5px 8px; color:var(--dim); }
.ab-a { font-family:var(--font-mono); font-size:.72rem; color:var(--teal); white-space:nowrap; }

.level { margin-top:72px; text-align:center; border:1px solid var(--copper); border-radius:12px; padding:34px 26px; background:var(--panel); }
.level-title { font-family:var(--font-display); font-weight:700; font-size:2.1rem; color:var(--gold); margin:8px 0 8px; }
.level-blurb { color:var(--dim); font-style:italic; max-width:52ch; margin:0 auto; }
.level-scripts { margin-top:14px; display:flex; gap:16px; justify-content:center; align-items:baseline; flex-wrap:wrap; }

.lesson { background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:20px 22px; margin-top:20px; }
.lesson h3 { font-family:var(--font-display); font-weight:600; font-size:1.45rem; color:var(--gold); margin:6px 0 0; }
.lesson-en { font-style:italic; color:var(--dim); margin-bottom:8px; }
.focus { font-family:var(--font-mono); font-size:.74rem; color:var(--teal); letter-spacing:.04em; margin:6px 0 12px; }
.prose { margin:10px 0; }
.ltable { margin:14px 0; }
.ltable figcaption { font-family:var(--font-mono); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--dim); margin-bottom:6px; }
.ltable table { width:100%; border-collapse:collapse; font-size:.9rem; }
.ltable th { text-align:left; font-family:var(--font-mono); font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--copper-light); border-bottom:1px solid var(--copper); padding:4px 8px; }
.ltable td { border-bottom:1px solid var(--line); padding:5px 8px; }

.gloss-block { margin-top:14px; border-top:1px solid var(--line); padding-top:10px; }
.gl-eyebrow { margin-bottom:4px; }
.il { margin:12px 0; }
.il-ph { font-family:var(--font-display); font-weight:600; font-size:1.08rem; color:var(--text); margin-bottom:4px; }
.il-row { display:flex; flex-wrap:wrap; gap:0 18px; row-gap:6px; }
.il-col { display:inline-flex; flex-direction:column; }
.il-m { font-family:var(--font-mono); font-size:.82rem; color:var(--copper-light); }
.il-g { font-family:var(--font-mono); font-size:.64rem; letter-spacing:.04em; color:var(--dim); text-transform:none; }
.il-en { font-style:italic; color:var(--dim); margin-top:4px; }

.drill { margin-top:14px; border:1px solid var(--line); border-left:2px solid var(--gold); border-radius:8px; padding:10px 12px; background:var(--panel-soft); font-size:.95rem; }
.drill-label { font-family:var(--font-mono); font-size:.62rem; letter-spacing:.14em; text-transform:uppercase; color:var(--gold); margin-right:8px; }

.community { font-family:var(--font-mono); font-size:.8rem; color:var(--teal); }
.coptic { font-family:var(--font-coptic); font-size:1rem; color:var(--copper-light); }
.ajami { font-family:var(--font-arabic); direction:rtl; font-size:1.25rem; color:var(--lapis-light); line-height:1.8; }

.colophon { margin-top:72px; padding-top:20px; border-top:1px solid var(--line); text-align:center; }
.colophon p { color:var(--dim); font-size:.9rem; }
.colophon .charge { font-family:var(--font-display); font-style:italic; margin-top:10px; }

@media print {
  @page { size:378pt 522pt; margin:0; }
  html, body { background:var(--bg) !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .wrap { max-width:none; padding:26pt 24pt 34pt; }
  .cover { min-height:440pt; display:flex; flex-direction:column; justify-content:center; align-items:center; border-bottom:none; page-break-after:always; }
  .level { page-break-before:always; min-height:430pt; display:flex; flex-direction:column; justify-content:center; page-break-after:always; }
  .lesson { page-break-before:always; }
  .il, .ltable, .drill { page-break-inside:avoid; }
}
</style>
</head>
<body class="aq-field">
<div class="wrap">
  <header class="cover">
    <img class="mark" src="../../docs/design-system/assets/hedronite-glyph-copper.png" alt="✦" onerror="this.outerHTML='&lt;div style=&quot;color:#b87333;font-size:1.6rem&quot;&gt;✦&lt;/div&gt;'">
    <div class="aq-eyebrow">Al-Tariqa Amraqiyyah · The Language of the Way</div>
    <h1>${esc(titleAmr)}</h1>
    <div class="subtitle">The Amraqiyyah Grammar — the Book of the Way of Words</div>
    <div class="title-scripts">
      <span class="community">${esc(O.communityPhrase(titleAmr))}</span>
      <span class="coptic">${esc(O.copticPhrase(titleAmr))}</span>
      <span class="ajami" dir="rtl">${esc(O.ajamiPhrase(titleAmr))}</span>
    </div>
    <div class="stats">${L.lessons.length} LESSONS · 4 LEVELS ON THE STAR-GATE ROOT · LEIPZIG-GLOSSED · SPEC v2.0-rc.1</div>
    <div class="charge">Saša·tin, ḏakira·tin, ma la nasiya·tin! — Y'all write, y'all remember, and don't forget!</div>
  </header>
  <section class="frontmatter">
    <div class="aq-eyebrow">Front matter</div>
    <h2>How this book is sequenced, and how to read a gloss</h2>
    <p class="prose">Four levels climb the education ladder (R-044), all derived from S-B-ʾ — the root that is at once <em>star</em>, <em>gate</em>, and <em>teaching</em>: <strong>Hakelow</strong> (understand) → <strong>Ṭalebow</strong> (seek) → <strong>Sabeʾow</strong> (the academy) → <strong>Sibeʾan</strong> (the great gate). The sequencing is the Optimize law of the handoff: greetings and the zero copula before conjugation; aspect before case. Every example sentence is ratified corpus — nothing here is invented for the page.</p>
    <p class="prose">Glosses follow the Leipzig rules: the phrase, then each word split into morphemes with a grammatical tag per morpheme, then the free translation. The abbreviations:</p>
    <table class="ab-table"><tbody>${abbrev}</tbody></table>
  </section>
  ${body}
  <footer class="colophon">
    <div class="aq-eyebrow">Generated from data/lessons.json · tools/nihewi.js</div>
    <p>Prose distills spec/00 and spec/01 — the R-numbers are the law; this book is its voice.</p>
    <p class="charge">Na·ʿiqeli pe saḏet Allah·i. — Reason IS the torch of God.</p>
  </footer>
</div>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} — ${L.lessons.length} lessons in ${L.levels.length} levels, ${L.lessons.reduce((a, x) => a + x.gloss.length, 0)} interlinear glosses`);
