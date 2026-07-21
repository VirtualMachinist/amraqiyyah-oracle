# THE ORTHOGRAPHY OF RUNNING TEXT — R-057

**2026-07-21** · ratified by Ali (doubling rule by direct note; details under the R-058 delegation)
**This document is the bank** for these rules — `tools/orthography.js` implements them, the golden tests lock them, and *kitebi niḥewi·i* (the grammar textbook) will fold them into its script lessons.

The letter tables (R-008, R-048; `data/scripts.json`) say what each letter IS. This document says how letters behave **in motion** — across morpheme boundaries, in whole sentences, in each of the four layers.

---

## 1. What each layer renders from

| Layer | Source form | Character |
|---|---|---|
| **Display romanization** | `display` field | The teaching form — every morpheme boundary dotted (*Ni·gon·hariw·ba·a*) |
| **Community romanization** | `display` field | The typing form — every dot becomes a **hyphen** (*Ni-gon-hariw-ba-a*): plain keyboard, no boundary lost, no *aa*-reads-as-ā ambiguity |
| **Coptic** | `amr` field | Lived text — proclitics attach (ⲛⲁⲡⲁⲁϧⲁ̄ⲧ) |
| **Ajami** | `amr` field | Lived text — proclitics attach, with carriers and pointing |

## 2. The dot laws

The morpheme dot (·) is **display-only notation**. In the lived scripts, proclitics write attached — as the Arabic article and the Coptic article have always attached. Community translates each dot to a hyphen. Compound hyphens (*yiteč-ḫobizon*, *meḏu-wa*) are real orthography and survive in every layer.

## 3. Ajami vowel carriers

Arabic never opens a syllable with a bare vowel. A vowel takes a **carrier**:

- at a **word start**,
- at a **proclitic boundary** (the dot counts as a word start: *bi·i·hariwa* → بِاِهَرِوَ),
- in **hiatus** — any vowel directly after another vowel (*hariw·ba·a* → …بَاَ).

| Vowel | Carrier form | | Vowel | Carrier form |
|---|---|---|---|---|
| a | اَ | | ā | آ |
| i | اِ | | ī | اِي |
| u | اُ | | ū | اُو |
| e / ē | ئێ (Sorani carrier for the Sorani vowel) | | o / ō | ئۆ |

## 4. The doubling mark (Ali's ruling)

A doubled consonant writes **once, with the doubling mark** — Arabic **shadda ّ**; Coptic takes the **gemination dot ◌̇** (combining dot above, U+0307 — the one free slot in our diacritic system: underdot = deep, overline = soft, grave = glottal, macron = long, trema = y; kin to the Bohairic jinkim dot).

- Applies word-internally **including across an attached proclitic boundary** — *es·salām* → **ⲉⲥ̇ⲁⲗⲁ̄ⲙ** in Coptic; in Ajami the same doubling surfaces as the shadda of **السَّلام** (spelled via the article law, §5).
- *illa* → اِلَّ / ⲓⲗ̇ⲁ.

**Frozen-form exemption:** frozen sacred forms are exempt from the doubling mark in **every** script, because their letters are inheritance — Arabic writes both lams of الله, and Coptic mirrors the reverence: **ⲁⲗⲗⲁϩ**, never ⲁⲗ̇ⲁϩ. (In the shahada the ordinary particle *illa* geminates beside the exempt Name — the law teaching itself in one line.)

## 5. The sacred article wears ال (R-059)

Arabic always writes the article **ال** and lets the mouth assimilate (السَّلام is written with its lam, spoken *as-salām*). The sacred article *al·/el·* is that very article, and in the Arabic-derived script it keeps its dress:

- unassimilated: *al·mēr* → **المێر**, *al·baḥar·a* → **البَحَرَ**
- assimilated: the lam writes, the doubling shows as shadda on the sun letter — *es·salām* → **السَّلام**, *ed·diketi* → **الدِّكێتِ**
- the vowel variant (Classical *al* / Egyptian-colloquial *el*) is a register realization, unwritten — exactly as Arabic writes ال whether the speaker says *al-*, *il-*, or *el-*
- the **preposition en·** is not the article and stays phonetic: *en·salām·i* → **ئێنسَلامِ**

Coptic and the romanizations remain phonemic (*ⲉⲥ̇ⲁⲗⲁ̄ⲙ*, *es-salaam*) — each layer teaches its own truth: display shows the morphology, Ajami shows the heritage.

Known edge (documented, currently unattested): the preposition *en·* before an n-initial word would pattern-match the assimilated article; no such token exists in the corpus, and the renderer will be taught the distinction if one arrives.

**The Sorani merger (R-059):** ێ serves both *e/ē* and ۆ both *o/ō* — accepted as law, as Sorani itself does not mark the length split. With the article now wearing ال, the merger touches only rare ē/ō-bearing words (*mēr*, *dē·*). Coinage guard: no future pair may be distinguished **only** by e/ē or o/ō length; the other scripts (macron, doubled vowels) keep the distinction where it exists.

## 6. Frozen sacred orthography (R-022 extended to script)

Frozen forms carry their **inherited Arabic spelling** in Ajami, held in `data/frozen.json` (`ajami` field): **الله · بسم الله · الحمد لله · إن شاء الله**. Matching is by prefix, so case vowels ride the frozen spelling — *Allah·a* → **اللهَ**, exactly Quranic practice.

## 7. Punctuation

Ajami localizes: , → **،** and ? → **؟**. Coptic and the romanizations keep Western punctuation.

## 8. Hamza

Mid-word glottal ʾ writes as bare **ء** (*Saʾila* → سَءِلَ) — systematic, ruled fine by Ali. Classical hamza-seat rules (ya/waw seats by vowel context) are noted as a possible Optimize-pass refinement, not law.

## 9. For the textbook

Lesson hooks: (1) the dot is scaffolding — learners graduate from display to lived script by watching the dots vanish; (2) the carrier rule is one sentence — "no syllable opens bare"; (3) the doubling mark and its frozen exemption teach the sacred/ordinary distinction *typographically* — the shahada is the canonical example sentence; (4) community hyphens are the bridge for texting before script fluency.
