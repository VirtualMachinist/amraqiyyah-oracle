# PROOFREADING & EDITORS' NOTES — the error ledger

**Purpose:** future sessions inherit not just the work but the *mistakes* of past sessions.
Before sealing ANY Canon text or corpus batch, run the checklist in §3 against every line —
in a **fresh context**. The R-071 errata all cluster at the end of a marathon session: the
bloated-context window is itself the leading cause of error in this project. **The rule that
follows: nothing seals in the same session that drafted it. Draft hot, proof cold.**

---

## 1. Confirmed error classes (each caught at least once — check for them every time)

### E1 — Preposition drops its genitive
Preps govern GEN at the NP edge (R-016/R-007). Tao ch.1 lines 5–6 shipped *bilā šiweqi* /
*het šiweqi* for **bilā šiweqī / het šiweqī** — while line 9 of the same text did it right
(*en·ribesī*). Fixed R-071.
**Check:** every en/ʿala/taḥt/ben/min/ʿind/het/bi/bilā/ḍid/ra/bawt/kama/illa/qabl/baʿd/qudām/ḫalf/bayn/ḥawl
→ does the NP's final word carry -i (with sandhi: i+i→ī, a+i→ay, u+i→wi, ā+i→āy)?

### E2 — Possessive suffix disagrees with its antecedent
Tao ch.1 line 7 shipped *riniāt·to* ("its names") for **riniāt·sen** ("their names") — while
the same line's verb conjugated the plural correctly (*i·ḫarija·sen*). Fixed R-071.
**Check:** every -ku/-ki/-to/-ta/-nun/-tin/-sen → find its antecedent, match person AND number.

### E3 — Absolute entities missing their article
Tao ch.1 lines 3–4 shipped bare *Bilā-rini* / *Het-rini* for **Al·bilā-rini / Al·het-rini** —
the Nameless and the Named are absolutes, and absolutes wear the sacred THE (R-012). **Ali's
own catch.** Fixed R-071.
**Check:** every NP naming a unique/cosmological/sacred entity → deliberate article decision
(al· / na· / bare-as-role per R-033), recorded in the verse note if bare.

### E4 — Source word silently dropped
Tao ch.1 lines 5–6 lost 常 ("ever") — the very word lines 1–2 fought the dahr ruling for.
Restored R-071 as *en dahr*.
**Check:** account for EVERY word of the source line — translated, or note says why not.
The source travels with the verse (Canon rule 5) precisely so this audit stays possible.

## 2. Open questions surfaced by the R-071 proof pass (Ali rules)

- **Q1 — RESOLVED (R-073, Ali).** The copula doctrine: **overt pe/ne obligatory for nominal
  equations in sacred/plain** (the equation is the theology); **zero lawful for adjective/stative
  predicates in every register** (Arabic + AAVE outvote Coptic two streams to one). Applied:
  Tao 1:7 → *ne sinu* (the plural copula's first attestation), 1:9 → *pe na·seba*. Line 8's
  colon-naming stands (quotative apposition, exempt). Dokkodo 16/19 stand as lawful zeros.
- **Q2 — RESOLVED (R-072, Ali).** 可 restored: *nin·ta i·qadira jata·to* — the **ability
  auxiliary**: qadira carries the clitic/conjugation, the content verb stands as bare stem
  (the imperative's stem), the resumptive rides the content verb. AAVE-shaped ("can speak");
  the Arabic-faithful alternative (*i·qadira ya·jata·to*, yaqdiru ʾan) stands noted if the
  subjunctive lane is ever preferred. Bonus find while verifying: **Mawangdui reads 恆
  'enduring' where the received text reads 常** (Emperor Wen's naming taboo) — Laozi's own
  word vindicates dahīr.
- **Q3 — RESOLVED (R-073, Ali: "ratify the split").** Preposed = default everywhere (Late
  Egyptian → Coptic stream); **postposed = solemn-archaic configuration lawful in the sacred
  register** — Middle Egyptian *zj pn* syntax surfacing where the language reaches for
  antiquity. *Na·sinu nai* stands as the first attestation, an intentional archaism.
- **Q4 — RESOLVED (R-073, Ali).** Title ruled: **Jasima al·Hinā na·Tap·i** — "Embodying the
  Road of the Origin" — Heshang Gong's 體道 fused with the construct the draft was reaching
  for; *jasima* "to embody" is the body-root's free Pattern I, head al·hina bears the phrase's
  accusative (→ hinā), na·tap closes with the construct genitive. Ali's own composition.
- **Q5 — RESOLVED (R-072, Ali: "cases should be consistent").** Full-corpus E1 sweep run:
  two instances found and fixed — the proverb (*bilā ḏikerī*) and the mercy-line
  (*kama na·aḫet·i* — kama governs GEN like every other particle in the R-016 table).
  All other prep-phrases in the 116 audited clean. Frozen forms exempt as always
  (*La ʾilah illa Allah* stands untouched); interrogatives take no case (*Pen bi kam?*).

## 3. The proof checklist (run per line, fresh context, before sealing)

1. **E1 sweep** — every preposition's NP ends in genitive (sandhi applied).
2. **E2 sweep** — every pronominal suffix matched to antecedent person/number.
3. **E3 sweep** — every entity's article decision deliberate and, where bare, noted.
4. **E4 sweep** — every source word accounted for.
5. **Copula decision** per predicate (pe/ne/yit/wi/zero) consistent with the register ruling.
6. **Engine pass** — run every derived form and case-merge through `tools/morphology`
   (`deriveAll`, `attachCase`, `pluralize`) — the Dokkodo session's `verify-*.js` pattern:
   62 mechanical checks caught zero errors precisely because the checks ran BEFORE presentation.
7. **Sun-letter pass** — al· assimilation on t ṯ d ḏ r z s š ṣ ḍ ṭ ẓ l n (es·salām, ar·ribesi);
   moon letters keep al· (al·bilā-rini, al·het-rini).
8. **amr/display convention** — proclitic dots in amr; morpheme dots in display; pure-length
   merges written solid (ribesī, hinā, hawtpay), separable glide-clusters keep the dot
   (·ya/·wa/·wi/·kwa/·kī).
9. **Read the note aloud** — if a verse note can't say why each choice was made, the choice
   wasn't made; it happened.

## 4. Session hygiene (the meta-lesson)

The R-071 errors were not ignorance — every rule broken was applied correctly elsewhere in
the same text. They were *fatigue*: end-of-session, deep-context drafting. Therefore:

- **Draft hot, proof cold:** the sealing pass happens in a fresh session (or at minimum a
  fresh read of only spec + text, no drafting history in mind).
- **Never trust "it looked right when I wrote it"** — trust the checklist and the engine.
- When proofing, read the text as a hostile grammarian, not as its author; the author's
  context window is precisely what's bloated.
- Log every new error CLASS here with its instance; a class caught twice becomes a lint rule
  (docket: mechanize E1/E2 as a corpus-linter pass over phrases + translations).
