// Amraqiyyah morphology engine — pure functions, zero dependencies.
// Spec: language/spec/00-grammar-v2.0-draft.md (v2.0-rc.1). Data: language/data/*.json.
'use strict';

const fs = require('fs');
const path = require('path');

const DATA = p => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', p), 'utf8'));
const T = DATA('templates.json');

function classOf(root) {
  if (root.length === 2) return 'bi';
  if (root.length === 3) return 'tri';
  if (root.length === 4) return 'quad';
  throw new Error(`root must have 2-4 consonants, got ${root.length}`);
}

// Substitute digits 1-4 in a template with root consonants.
function apply(root, pattern) {
  return pattern.replace(/[1-4]/g, d => root[Number(d) - 1]);
}

// Derive one form. type ∈ templates for the root's class; 'causative' prefixes sa- to the verb.
function derive(root, type) {
  const cls = classOf(root);
  if (type === 'causative') return T.causativePrefix + derive(root, 'verb');
  const pattern = T[cls][type];
  if (!pattern) throw new Error(`no template '${type}' for ${cls} root ${root.join('-')}`);
  return apply(root, pattern);
}

function deriveAll(root) {
  const cls = classOf(root);
  const out = {};
  for (const type of Object.keys(T[cls])) out[type] = apply(root, T[cls][type]);
  out.causative = T.causativePrefix + out.verb;
  return out;
}

// Perfective stem: tri/quad = verb minus final -a; bi = 1a2im (R-013 augment).
function perfStem(root) {
  const cls = classOf(root);
  if (cls === 'bi') return apply(root, T.bi.perfstem);
  return derive(root, 'verb').slice(0, -1);
}

// Imperfective: weak subject clitic + verb form (R-005). Returns dotless string.
function imperfective(root, person) {
  const base = derive(root, 'verb');
  const c = T.clitics[person];
  if (Array.isArray(c)) return c[0] + base + c[1];
  return c + base;
}

// Perfective: stem + agreement suffix (clitic optional per R-005; not included here).
function perfective(root, person) {
  return perfStem(root) + T.perfSuffixes[person];
}

// Stative conjugation: clitic + stative form.
function stative(root, person) {
  const base = derive(root, 'stative');
  const c = T.clitics[person];
  if (Array.isArray(c)) return c[0] + base + c[1];
  return c + base;
}

const LONG = { a: 'ā', i: 'ī', u: 'ū' };

// Case attachment with sandhi (R-007, R-026). c ∈ 'u' | 'a' | 'i'. Arguments only — never predicates.
function attachCase(form, c) {
  const last = form.slice(-1);
  if (last === 'u' || last === 'i' || last === 'a') {
    if (last === c) return form.slice(0, -1) + LONG[c];
    if (last === 'u') return form.slice(0, -1) + 'w' + c;
    if (last === 'i') return form.slice(0, -1) + 'y' + c;
    // last === 'a'
    if (c === 'u') return form.slice(0, -1) + 'aw';
    if (c === 'i') return form.slice(0, -1) + 'ay';
  }
  return form + c;
}

// Plural -āt, universal (R-015).
function pluralize(form) {
  const last = form.slice(-1);
  if (last === 'u') return form.slice(0, -1) + 'wāt';
  if (last === 'i') return form.slice(0, -1) + 'yāt';
  if (last === 'a') return form.slice(0, -1) + 'āt';
  return form + 'āt';
}

// Possessive suffix (order STEM-PL-POSS-CASE per R-027).
function possess(form, person) {
  const s = T.possessives[person];
  if (!s) throw new Error(`unknown possessor '${person}'`);
  return form + s;
}

// Casual-register realization (R-020 lawful mergers).
function casual(form) {
  const M = DATA('phonology.json').casualMergers;
  return form.split('').map(ch => M[ch] || ch).join('');
}

module.exports = { classOf, apply, derive, deriveAll, perfStem, imperfective, perfective, stative, attachCase, pluralize, possess, casual };
