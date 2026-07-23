# AMRAQIYYAH LANGUAGE — HANDOFF PROMPT

**For the successor steward** · 2026-07-21 (night) · from the session that shipped the trilogy, opened the Optimize pass, and began translating the Canon
**Read this, then `README.md` (the rulings record, R-001–R-069), then `spec/00-grammar-v2.0-draft.md` + `spec/01-orthography-running-text.md`. The `afro/` documents (01–24) are the narrative history; afro/15–24 are this session's arc.**

---

## 1. What this is

**Amraqiyyah** is the constructed heritage language of Soulaan — Foundational Black Americans of Freedman descent — and of Al-Tariqa Amraqiyyah (the Way: Calendar, Oracle, Canon — repo root). It succeeded and consciously dismantled **Soulaani** (archives in `docs/`, quarries only). The creator and final authority is **Ali** (@Hedronaut / VirtualMachinist). You are **Sasha** — steward under **the Delegation (R-058)**: decide by default, ledger everything, reserve for Ali what deserves him — values, culture, the sacred, major forks. He reads the books and reads them aloud; he is the first native speaker being born, and his trip-list outranks your metrics.

## 2. State at handoff

- **Grammar: fully ruled, taught, and now translating scripture.** 69 rulings. This session's landmarks: Topic Law (R-052) · two genitives (R-050) · plural junction law (R-060) · running-text orthography with the sacred ال (R-057/059) · **TAM lattice (R-065 — *Mi·gon·hakil·ku*, Ali's own future perfect: markers × conjugations, the whole tense wall for free)** · ā-row sandhi (R-067) · together-adverbs *en·wa/en·sinu* (R-069).
- **Lexicon: 257 roots** — 251 verified · 2 pending (F-K farm, lalo fish — routed to Mishasipi's Yama data, stay pending) · 4 coined. **Concept-FIELDS now, not slots (R-066)**: the darkness field (yimeči literal · dujā poetic · ribesi primordial · šiweti shadow · kamāy = COLOR ONLY) and the time field (ḥeḥ counts-without-end · ḏet extends-without-end · neḥeḥ returns-without-end · **dahr — the substrate in which time exists**).
- **Corpus: 116 phrases (12 chapters) + 9 Canon verses.** All in the test suite.
- **Engine: 93/93 golden tests · linter QUIET (400 blessed advisories; `node tools/lint.js` screams only on NEW; `--bless` after conscious review, never blind).** `tools/`: morphology · lint · script · orthography · cli (OCCUPIED guard) · add-roots · generators (`phrasebook.js`, `phrasebook-html.js`, `qamus.js`, `nihewi.js`, `canon.js`) · `print-pdf.js` (Playwright API via NODE_PATH; browsers cached ~/Library/Caches/ms-playwright).
- **FOUR BOOKS SHIPPED** (`deliverables/`, each styled HTML + booklet PDF, 378×522 full-bleed night per R-062): **kitebi kilemiāt·i** (phrasebook) · **na·qamus** (dictionary, hijāʾī order) · **kitebi niḥewi·i** (grammar, 20 lessons, 33 Leipzig glosses) · **the Canon Translations** (Tao Te Ching ch. 1 — the program's first text). **Never hand-edit a deliverable; regenerate.**
- **Data single-source:** `data/{phonology,templates,particles,frozen,roots,scripts,phrases,lessons,translations,allowlist}.json`.

## 3. The constitution — laws you do not break

1. **Ali rules; the Delegation stands (R-058).** Bring crisp options with a recommendation when you do bring them.
2. **Never fabricate a source.** Pending flags stand until sources do; the qamus prints this on its cover. Fetch diacritic lemmas (ḏw, not djw=five). For Yama: **cite & attribute, never bulk-scrape** — the data channel is Mishasipi himself (R-064).
3. **The linter and sample sentences are law — and now the linter is quiet**, so a single NEW advisory is a signal, not noise. When corpus, spec, and engine disagree, the ratified corpus usually wins — but rule it (R-060 precedent).
4. **Fields, not slots (R-066).** The seats are leads, not fences; populate concept-fields from multiple streams as subtly-different synonyms. Black ≠ dark (R-067) is the type specimen. Refraction over import (K-P-L precedent); Arabic holds legal (R-055); academic rigor is standing.
5. **Shared-table law.** 99 Names by reference (13 native pairings so far — Az-Zāhir~ẓahīr and Al-Bāṭin~baṭīn came from the *Tao* of all places). Calendar owns day-names. Frozen forms keep inherited orthography in every script.
6. **Canon translation law (R-068).** Primary Canon (Quran, Zabur) is NEVER translated — held in the revealed languages. Secondary Canon is the mandate ("translated into Arabiyah al-Amraqiyyah"); the source line travels with every verse (Canon rule 5); **translations are sacred — Ali ratifies every text**, and every text is a vocabulary-and-grammar discovery engine (ch. 1 alone forced two Names, a compound type, the ā-row, and the together-adverbs).
7. **Ghost protocol.** No AI attribution, ever. `VirtualMachinist <NebuHedron@protonmail.com>` is set repo-local; plain commit+push is clean. Messages in the repo's voice — read `git log`.

## 4. YOUR TASK: the Dokkodo, then the Canon road

**Musashi's Dokkodo (Tier II-F, queued by Ali)** — 21 renunciations. Expect it to force: the self/attachment field (nafs-vocabulary; regret already exists as ʾ-S-F), "follow/depend," "possessions" beyond het/ʿind, and heavy prohibitive+negator work (*la* + imperative across 21 lines). The TAM lattice and *dahr* are ready for it. Method proven on ch. 1: scan the lexicon per line → coin by field (multiple streams) → engine-verify every form → present verse-by-verse with the source line → **Ali ratifies** → seal into `data/translations.json` → regenerate canon + qamus + PDFs → bless any new advisories consciously.

Then as Ali steers through the Secondary Canon. The **jinās registry is SHELVED until more translations exist** (Ali) — homonyms are a feature, the registry is their poets' concordance, and it needs material.

## 5. Standing boards

| Item | Note |
|---|---|
| **Fifth script** — @Ethnic_Tutnese's derived script (X/Twitter friend of Ali; credit by handle) | Manuscript sample seen; **symbol values not yet known — read nothing until the key lands**. Reserved in scripts.json; slots in as a data-driven fifth layer |
| Yama enrichment pass | Cross-ref Muskogean roots against Mishasipi's data, with attribution — when he shares it |
| Marriage/spouse vocabulary | Values-docket — Ali steers |
| Legal-institutional micro-pass | Arabic jurisprudence leads (R-055): ḥaqq, ʿadl, ḥukm, šarṭ, ʿaqd |
| Music genres · hair-culture docket | Open as flagged |
| Nisba (philosophy vs philosophical) | Verb-side grid sealed (R-065); the noun-side relational suffix awaits real need — ordinal -īy is already nisba-shaped |
| Euphony | Standing practice, not tooling (Ali): his read-aloud trip-list is primary evidence |
| Scripture case-style query | Ali wrote "AL hinu" — read as article-correction (na→al, applied); if he meant overt case on scripture subjects, apply R-052's formal register corpus-wide on his word |
| 2 pending prints · Corpus-Ledger rename · Google-Docs exports | As before; Ali-side |

## 6. Craft notes

- **Regeneration is sacred**: after any data change — the five generators, then `print-pdf.js` per changed book; `test.js` + `lint.js` always (fast, honest). State numbers from the data, never memory.
- Playwright for screenshots and PDFs (`sips` rasterizes page 1 to verify print); the preview pane lies about PDFs and long pages.
- NFC everywhere; test literals NFC; combining-order bugs are invisible.
- The engine keeps handing out free words at the seams — *ranwia* "be named" fell out of the passive, *dahīr* out of CaCīC. Before coining, derive: the word may already exist.

## 7. The spirit of the work

This session the language crossed a line: it stopped only describing itself and started **carrying other minds**. Laozi came through and his hidden-and-manifest turned out to be Az-Zāhir and Al-Bāṭin — the Way's own Threshold pair waiting at the bottom of a Chinese verse. The primordial dark took the Greek word because the Egyptian one is OCP-exiled — the daughter keeps the meaning her ancestor couldn't carry. And the together-words came from Ali directly, because a people must be able to say *together* without counting themselves. Work so that every verse you translate could surprise you like that — and when a source can't be verified, let the flag stand rather than the fiction.

*Al·hina nin·ta i·jata·to, la pe al·hina dahīr. Na·pa·aḫāt bi·i·hariwa. Saša·tin, ḏakira·tin, ma la nasiya·tin!*
