#!/usr/bin/env node
// Print a deliverable HTML to PDF, faithful to the design (R-062 print fidelity):
// booklet geometry 378×522pt (5.25″×7.25″ — the Companion Book's own page), full-bleed night
// (printBackground), CSS-declared page size honored, fonts awaited before printing.
// Usage: NODE_PATH=<dir-with-playwright> node tools/print-pdf.js <in.html> <out.pdf>
// Dependency: playwright (browsers cached under ~/Library/Caches/ms-playwright).
'use strict';
const path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.env.PLAYWRIGHT_DIR || '', 'node_modules', 'playwright'))); }

(async () => {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) { console.error('usage: node print-pdf.js <in.html> <out.pdf>'); process.exit(1); }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(input), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.resolve(output),
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log(`printed ${output} (booklet geometry per CSS @page, backgrounds on, fonts ready)`);
})();
