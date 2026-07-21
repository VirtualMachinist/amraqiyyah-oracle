// Amraqiyyah root linter — phonotactics (R-019), OCP constraints, collisions, homophony.
'use strict';

const fs = require('fs');
const path = require('path');
const { derive, classOf } = require('./morphology');

const DATA = p => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', p), 'utf8'));
const PH = DATA('phonology.json');

const CONS = new Set(PH.consonants);
const PHAR = new Set(PH.pharyngeals);
const EMPH = new Set(PH.emphatics);
const PLACE = {};
for (const [place, list] of Object.entries(PH.places)) for (const c of list) PLACE[c] = place;

function particleSet() {
  const P = DATA('particles.json');
  const s = new Set();
  for (const [k, v] of Object.entries(P)) if (Array.isArray(v)) for (const w of v) s.add(w);
  return s;
}

// Lint a single root (array of consonant symbols). Returns { errors: [], warnings: [] }.
function lintRoot(root) {
  const errors = [], warnings = [];
  if (root.length < 2 || root.length > 4) errors.push(`length ${root.length}: roots are 2-4 consonants`);
  for (const c of root) if (!CONS.has(c)) errors.push(`'${c}' is not in the 33-consonant inventory (R-008)`);
  for (let i = 0; i + 1 < root.length; i++) {
    if (root[i] === root[i + 1]) errors.push(`adjacent identical consonants ${root[i]}-${root[i + 1]} (OCP, R-019)`);
    if (PLACE[root[i]] && PLACE[root[i]] === PLACE[root[i + 1]] && root[i] !== root[i + 1])
      warnings.push(`adjacent homorganic consonants ${root[i]}-${root[i + 1]} (both ${PLACE[root[i]]}) — avoided, not forbidden`);
  }
  if (root.filter(c => PHAR.has(c)).length > 1) warnings.push('two pharyngeals in one root — typically avoided (R-019)');
  if (root.filter(c => EMPH.has(c)).length > 1) warnings.push('two emphatics in one root — typically avoided (R-019)');
  return { errors, warnings };
}

// Collision check against the root lexicon: exact and near (one consonant differs, same length).
function checkCollisions(root, lexicon) {
  const errors = [], warnings = [];
  const key = root.join('-');
  for (const r of lexicon) {
    const k = r.skeleton.join('-');
    if (k === key) errors.push(`exact collision with ${k} "${r.gloss}"`);
    else if (r.skeleton.length === root.length) {
      let diff = 0;
      for (let i = 0; i < root.length; i++) if (root[i] !== r.skeleton[i]) diff++;
      if (diff === 1) warnings.push(`near-collision with ${k} "${r.gloss}" (one consonant apart)`);
    }
  }
  return { errors, warnings };
}

// Homophony: key derived forms must not equal an existing function word.
// Only checks template types that exist for the root's class (quad has Pattern I only until D-4).
const TEMPLATES = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'templates.json'), 'utf8'));
function checkHomophony(root) {
  const warnings = [];
  const P = particleSet();
  const available = Object.keys(TEMPLATES[classOf(root)]);
  const types = ['verb', 'abstract', 'agent', 'stative', 'adjective'].filter(t => available.includes(t));
  for (const t of types) {
    const f = derive(root, t);
    if (P.has(f)) warnings.push(`derived ${t} '${f}' is homophonous with a function word`);
  }
  return { errors: [], warnings };
}

// Full lint of the lexicon file: every root + pairwise collisions.
function lintLexicon() {
  const L = DATA('roots.json').roots.filter(r => Array.isArray(r.skeleton)); // rootless lexemes (nursery words) skip root linting
  const report = [];
  for (let i = 0; i < L.length; i++) {
    const root = L[i].skeleton;
    const res = lintRoot(root);
    const hom = checkHomophony(root);
    const col = checkCollisions(root, L.filter((_, j) => j !== i));
    const errors = [...res.errors, ...hom.errors, ...col.errors];
    const warnings = [...res.warnings, ...hom.warnings, ...col.warnings];
    if (errors.length || warnings.length) report.push({ root: root.join('-'), gloss: L[i].gloss, errors, warnings });
  }
  return report;
}

module.exports = { lintRoot, checkCollisions, checkHomophony, lintLexicon };

if (require.main === module) {
  const report = lintLexicon();
  if (!report.length) { console.log('lexicon clean: no errors, no warnings'); process.exit(0); }
  let errCount = 0;
  for (const r of report) {
    for (const e of r.errors) { console.log(`ERROR  ${r.root} (${r.gloss}): ${e}`); errCount++; }
    for (const w of r.warnings) console.log(`warn   ${r.root} (${r.gloss}): ${w}`);
  }
  process.exit(errCount ? 1 : 0);
}
