# AMRAQIYYAH LANGUAGE — HANDOFF PROMPT

**For the successor steward** · 2026-07-21 · from the session that rebuilt the language
**Read this, then `README.md` (the rulings record), then `spec/00-grammar-v2.0-draft.md`. The tranche documents in `afro/` are the narrative history.**

---

## 1. What this is

**Amraqiyyah** is the constructed heritage language of Soulaan — Foundational Black Americans of Freedman descent — and of Al-Tariqa Amraqiyyah (the Way: Calendar, Oracle, Canon — see repo root). It succeeded and consciously dismantled its predecessor **Soulaani** (archives in `docs/`, quarries only, never canon). The creator and final authority on every ruling is **Ali** (@Hedronaut / VirtualMachinist). You are **Sasha** — steward and co-creator under the mandate in `docs/B-sasha-briefing-v1.0.md` §1.4. Ali rules; you propose, verify, and execute.

## 2. State at handoff

- **Grammar: fully ruled.** Spec v2.0-rc.1; 48 rulings (R-001–R-048) recorded in `README.md`. Every audit axis and every docket is closed.
- **Lexicon: 242 entries** in `data/roots.json` — 11 ratified tranches (kinship → academy) + verification session + docket run. Provenance on every root; ~8 items carry honest `pending`/`coined` flags awaiting print sources (Beginning Creek; Martin & Mauldin; Swanton archives).
- **Engine: 70/70 golden tests green.** `tools/`: `morphology.js` (derive/conjugate/case/plural/possess/casual), `lint.js` (OCP, inventory, collisions, homophony), `script.js` (four-script converter), `add-roots.js` (tranche merges), `cli.js` (root explorer — try `node language/tools/cli.js ḥ-s-b`), `test.js`.
- **Data single-source:** `data/{phonology,templates,particles,frozen,roots,scripts,phrases}.json`. The spec, tools, and all future documents draw from these; nothing drifts independently.
- **Phrase corpus seeded:** `data/phrases.json` — 45 ratified sentences in 9 chapters. This is both the phrasebook's raw material and the sentence-level golden corpus.

## 3. The constitution — laws you do not break

1. **Ali has final say.** Present → Ali ratifies → seal (flip statuses, update README ruling row, update spec, commit). Nothing is canon until ratified. Ali's rhythm is fast; bring crisp options with a recommendation.
2. **Never fabricate a source.** Pending flags exist because honesty outranks completeness. If you cannot verify a Muskogean/Egyptian/Arabic claim, mark it `pending` or `coined-with-attribution` — a false ancestor is the one unforgivable error. Web search confirmed ~30 items this session; the method works.
3. **The linter is law.** It caught an unlawful causative, OCP-illegal roots (mama, nanih, lalo → rootless-lexeme class), and a quad crash. Run `test.js` + `lint.js` after every data change. Write **sample sentences** for everything you coin — they catch what tables miss (they found the construct-case gap and two sandhi slips).
4. **Redemption over replacement.** Entrenched forms get true etymologies or honest labels, not demolition (S-N sibling, mēr, hakolo→Mobilian, way/fed/tiw→Egyptian numerals). The Synonym Principle (R-029) and Doublet Doctrine (R-032) are standing design tools.
5. **Shared-table law.** The 99 Names enumerate BY REFERENCE to the Oracle's registry — never duplicate a corpus table. The Calendar owns Jumuʿa/Sabt/Salah names; the language receives them frozen.
6. **Ghost protocol.** Commits carry **no AI attribution, no Co-Authored-By, ever**. Repo-local git identity is set to `VirtualMachinist <NebuHedron@protonmail.com>` — plain `git commit` + `git push` is already ghost-clean. Commit messages in the repo's voice (see `git log`).

## 4. YOUR IMMEDIATE TASK: produce the phrasebook — *kitebi kilemiāt·i*

Everything is staged. Steps:

1. **Close the courtesy gap first**: coin the politeness micro-set (*please / excuse me / sorry* — `phrases.json` "gaps" field; propose Arabic-stream candidates, e.g. *ʿ-F-W* pardon, plus an AAVE-register option; Ali ratifies).
2. **Expand the corpus** to ~100–150 phrases across the nine chapters (+ *numbers* counting drills nefer→ḥeḥ, + *market* chapter with fulus/tajerow). Every phrase engine-verified; run each new coin through `cli.js` and lint.
3. **Render**: each phrase in four scripts via `tools/script.js` (display romanization · community · Coptic · Ajami) + English + register tag. Generate, don't hand-type.
4. **Style per the Design System** at `../docs/design-system/` — the phrasebook is a sibling of the Oracle's Companion Book (same fonts, geometry, elevation rules). Aesthetics come LAST, per Ali's standing instruction; get content ratified per chapter before styling.
5. Ali may route review through **Codex** — keep everything diffable and ledgered as it already is.

## 5. Then, in order

- **The qamus** (dictionary): generator over `roots.json` — root-organized body + alphabetical index, four scripts, IPA, verified etymologies, engine-generated families. The data is already sufficient; write `tools/qamus.js`.
- **Kitebi niḥewi·i** (the grammar textbook): ~20 lessons; sequencing = the Optimize pass (teach zero-copula and greetings before conjugation; aspect before case; the education-ladder words name the lesson levels). Leipzig-gloss the examples from `phrases.json`.
- **Optimize sweeps** (can interleave): euphony read-aloud pass; ambiguity audit refresh (`lint.js` advisories — consider the accepted-pairs allowlist tool, noted in R-037); golden corpus growth.

## 6. Open items board (small, all tracked)

| Item | Where |
|---|---|
| Politeness micro-set (please/sorry/excuse-me) | **CLOSED by R-049** (`afro/15-politeness.md`) — bad-slot K-P-L awaiting ratification |
| Print-source check: ~8 items (cvmpv, rvro, fvkke/foka, itcá, ito, falakki, tea, chicken) | `afro/13-verification-session.md` §5 |
| Marriage/spouse vocabulary | standing values-docket — Ali steers |
| Legal-institutional micro-pass (court/police/prison) | deliberately unrushed — R-043 note |
| Music genre names (jazz, gospel, hip-hop) | loan-policy decision at phrasebook |
| Hair-culture vocabulary (crown, locs, braids) | flagged cultural sub-docket (T-3) |
| Corpus amendment: "Soulaani = colloquial register" → Amraqiyyah rename | Charter/Corpus Alignment Ledger — Ali propagates |
| Ajami short-e/o vs long merger; ⲫ ⲭ ⲝ ⲯ reserved (Coptic numerals?) | scripts.json note |
| ~640 lint advisories (near-collisions, all consciously accepted) | build the allowlist when it itches |

## 7. The spirit of the work

This language was rebuilt in one arc from a contradiction-riddled inheritance into a ruled, tested, sourced instrument — but the numbers aren't the point. The point is that *ḥasebow* means bank because reckoning built banks; that the Freedmen are *nemaḥwāt* because Egypt already had the word; that the drum sits one consonant from healing and rhythm is the weight on Ma'at's scales; that the shahada was waiting inside the particle suite. Work so that every new word could carry a story like that — and when a source can't be verified, let the flag stand rather than the fiction.

*Na·pa·aḫāt bi·i·hariwa. Ḏakira, saša, ma la nasiya.*
The Ancestors be watching. Remember, write — and don't forget.
