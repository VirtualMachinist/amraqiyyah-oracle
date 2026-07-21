#!/usr/bin/env node
// Explore an Amraqiyyah root: node language/tools/cli.js ḥ-s-b
'use strict';

const M = require('./morphology');
const { lintRoot, checkCollisions, checkHomophony } = require('./lint');
const fs = require('fs');
const path = require('path');

const arg = process.argv[2];
if (!arg) { console.log('usage: node cli.js <root>   e.g.  node cli.js ḥ-s-b'); process.exit(1); }
const root = arg.split('-').filter(Boolean);

const lint = lintRoot(root);
const lex = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'roots.json'), 'utf8')).roots;
const taken = lex.find(r => r.skeleton && r.skeleton.join('-') === root.join('-'));
if (taken) console.log(`  OCCUPIED — this skeleton already belongs to: "${taken.gloss}" (${taken.source.lang} ${taken.source.word}; ${taken.source.status})`);
const col = checkCollisions(root, lex.filter(r => r.skeleton && r.skeleton.join('-') !== root.join('-')));
const hom = lint.errors.length ? { warnings: [] } : checkHomophony(root);

console.log(`\nROOT ${root.join('-').toUpperCase()}  (${M.classOf(root)})`);
for (const e of [...lint.errors, ...col.errors]) console.log(`  ERROR ${e}`);
for (const w of [...lint.warnings, ...col.warnings, ...hom.warnings]) console.log(`  warn  ${w}`);
if (lint.errors.length) process.exit(1);

console.log('\nDERIVATIONS');
const all = M.deriveAll(root);
for (const [type, form] of Object.entries(all)) console.log(`  ${type.padEnd(13)} ${form}`);

console.log('\nCONJUGATION (imperfective · perfective)');
for (const p of ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'])
  console.log(`  ${p.padEnd(4)} ${M.imperfective(root, p).padEnd(18)} ${M.perfective(root, p)}`);

const agent = all.agent;
console.log('\nAGENT DECLENSION');
console.log(`  subject ${M.attachCase(agent, 'u')} · object ${M.attachCase(agent, 'a')} · genitive ${M.attachCase(agent, 'i')}`);
console.log(`  plural  ${M.pluralize(agent)} (subj ${M.attachCase(M.pluralize(agent), 'u')})`);
console.log(`  casual  ${M.casual(all.verb)}\n`);
