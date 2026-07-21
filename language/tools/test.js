// Golden tests for the Amraqiyyah morphology engine. Run: node language/tools/test.js
'use strict';

const M = require('./morphology');
const { lintRoot } = require('./lint');

let pass = 0, fail = 0;
function eq(actual, expected, label) {
  if (actual === expected) { pass++; }
  else { fail++; console.log(`FAIL ${label}: expected '${expected}', got '${actual}'`); }
}

const SKM = ['s', 'k', 'm'], HKL = ['h', 'k', 'l'], FK = ['f', 'k'], HSB = ['ḥ', 's', 'b'];

// Triconsonantal templates (R-010 strict, R-015 reforms)
eq(M.derive(SKM, 'verb'), 'sakima', 'SKM verb');
eq(M.derive(SKM, 'abstract'), 'sikemi', 'SKM abstract');
eq(M.derive(SKM, 'agent'), 'sekamu', 'SKM agent');
eq(M.derive(SKM, 'patient'), 'sokimon', 'SKM patient');
eq(M.derive(SKM, 'locative'), 'sakemow', 'SKM locative');
eq(M.derive(SKM, 'instrumental'), 'sakimet', 'SKM instrumental');
eq(M.derive(SKM, 'adjective'), 'sakīm', 'SKM adjective CaCīC (R-015)');
eq(M.derive(SKM, 'diminutive'), 'sukaym', 'SKM diminutive CuCayC (R-015)');
eq(M.derive(SKM, 'stative'), 'sikem', 'SKM stative');

// Renormalization (R-010): HKL obeys strict templates
eq(M.derive(HKL, 'verb'), 'hakila', 'HKL verb renormalized');
eq(M.derive(HKL, 'abstract'), 'hikeli', 'HKL abstract renormalized');
eq(M.derive(HKL, 'agent'), 'hekalu', 'HKL agent renormalized');
eq(M.derive(HKL, 'adjective'), 'hakīl', 'HKL adjective');

// Biconsonantal suite + fak·ow fix + R-013 perfective augment
eq(M.derive(FK, 'verb'), 'faka', 'FK verb');
eq(M.derive(FK, 'agent'), 'feku', 'FK agent');
eq(M.derive(FK, 'locative'), 'fakow', 'FK locative (Doc A fok·ow bug fixed)');
eq(M.derive(FK, 'adjective'), 'fakāy', 'FK adjective CaCāy');
eq(M.perfStem(FK), 'fakim', 'FK perfective stem -im (R-013)');
eq(M.perfStem(HKL), 'hakil', 'HKL perfective stem');

// Conjugation (R-005 clitics, suffix perfective)
eq(M.imperfective(HKL, '1sg'), 'mihakila', 'imperfective 1SG');
eq(M.imperfective(HKL, '2pl'), 'tihakilatin', 'imperfective 2PL circum');
eq(M.imperfective(HKL, '3pl'), 'ihakilasen', 'imperfective 3PL');
eq(M.perfective(HKL, '1sg'), 'hakilku', 'perfective 1SG');
eq(M.perfective(HKL, '3sg'), 'hakil', 'perfective 3SG bare');
eq(M.perfective(FK, '1sg'), 'fakimku', 'FK perfective 1SG');
eq(M.stative(SKM, '1pl'), 'nisikem', 'stative 1PL');

// Voice (R-025 sa·, passive/reflexive/reciprocal/intensive/iterative)
eq(M.derive(FK, 'causative'), 'safaka', 'causative sa· (R-025)');
eq(M.derive(HKL, 'causative'), 'sahakila', 'causative teach');
eq(M.derive(SKM, 'passive'), 'sakwiima', 'passive -wi- after C2');
eq(M.derive(FK, 'passive'), 'fakwia', 'biliteral passive');
eq(M.derive(SKM, 'reflexive'), 'sakimtwa', 'reflexive -tw');
eq(M.derive(SKM, 'reciprocal'), 'sakimbaa', 'reciprocal -ba·a');
eq(M.derive(SKM, 'intensive'), 'sākima', 'intensive CāCiCa');
eq(M.derive(SKM, 'iterative'), 'saksakima', 'iterative reduplication');
eq(M.derive(FK, 'iterative'), 'fakfaka', 'biliteral iterative (Doc A attested)');

// Case sandhi (R-007, R-026)
eq(M.attachCase('feku', 'u'), 'fekū', 'NOM u+u→ū');
eq(M.attachCase('feku', 'a'), 'fekwa', 'ACC u+a→wa');
eq(M.attachCase('feku', 'i'), 'fekwi', 'GEN u+i→wi');
eq(M.attachCase('fiki', 'a'), 'fikya', 'ACC i+a→ya');
eq(M.attachCase('fiki', 'i'), 'fikī', 'GEN i+i→ī');
eq(M.attachCase('fokon', 'a'), 'fokona', 'ACC after consonant');
eq(M.attachCase('šey', 'u'), 'šeyu', 'NOM after glide');
eq(M.attachCase('sikempa', 'u'), 'sikempaw', 'NOM a+u→aw');

// Possession then case (R-027 order STEM-POSS-CASE)
eq(M.attachCase(M.possess('šey', '1sg'), 'u'), 'šeykū', 'šey·kū my-thing.NOM');

// Plural -āt (R-015)
eq(M.pluralize('feku'), 'fekwāt', 'plural u-stem');
eq(M.pluralize('šey'), 'šeyāt', 'plural after glide');
eq(M.pluralize('din'), 'dināt', 'plural after consonant');
eq(M.pluralize('fiki'), 'fikyāt', 'plural i-stem');

// R-017 showcase family: Ḥ-S-B
eq(M.derive(HSB, 'verb'), 'ḥasiba', 'Ḥ-S-B compute (= Arabic ḥasiba!)');
eq(M.derive(HSB, 'agent'), 'ḥesabu', 'computer');
eq(M.derive(HSB, 'instrumental'), 'ḥasibet', 'calculator');
eq(M.derive(HSB, 'locative'), 'ḥasebow', 'bank / counting-house');

// Casual register (R-020)
eq(M.casual('ḥasiba'), 'hasiba', 'casual ḥ→h');
eq(M.casual('maʿati'), "ma'ati", "casual ʿ→'");

// Quad root path (regression: linter must not crash on quad's Pattern-I-only template set)
const MSDR = ['m', 's', 'ḏ', 'r'];
eq(M.derive(MSDR, 'verb'), 'masaḏira', 'quad Pattern I');
eq(require('./lint').checkHomophony(MSDR).errors.length, 0, 'quad homophony check survives');

// Linter (R-019)
eq(lintRoot(['k', 'k', 'b']).errors.length > 0, true, 'OCP rejects K-K-B');
eq(lintRoot(['ḥ', 'ʿ', 'r']).warnings.length > 0, true, 'two pharyngeals warned');
eq(lintRoot(['ḥ', 's', 'b']).errors.length, 0, 'Ḥ-S-B clean');
eq(lintRoot(['x', 'y', 'z']).errors.length > 0, true, 'non-inventory consonant rejected');

// Script converter (D-2, R-048)
const S = require('./script');
eq(S.toCoptic('salām'), 'ⲥⲁⲗⲁ̄ⲙ', 'Coptic salām');
eq(S.toCoptic('šey'), 'ϣⲉⲓ̈', 'Coptic šey (y as trema-iota)');
eq(S.toCoptic('ḥasiba'), 'ϩ̣ⲁⲥⲓⲃⲁ', 'Coptic deep-h underdot');
eq(S.toCoptic('qadīs'), 'ⲕ̅ⲁⲇⲓ̄ⲥ', 'Coptic q as soft-k overline');
eq(S.toCoptic('maʿati'), 'ⲙⲁⲁ̣ⲁⲧⲓ', 'Coptic ʿayin as deep-alpha');
eq(S.toCoptic('feku'), 'ϥⲉⲕⲟⲩ', 'Coptic u as native ou');
eq(S.toCommunity('ḫobizon'), 'khobizon', 'community kh');
eq(S.toCommunity('ḏikeri'), 'dhikeri', 'community dh');
eq(S.toCommunity('hakīl'), 'hakiil', 'community long vowel doubling');
eq(S.toAjami('salām'), 'سَلام', 'Ajami salām pointed');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
