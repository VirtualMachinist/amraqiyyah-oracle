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

- Applies word-internally **including across an attached proclitic boundary** — *es·salām* → **ئێسَّلام / ⲉⲥ̇ⲁⲗⲁ̄ⲙ**, exactly the السَّلام sun-letter pattern.
- *illa* → اِلَّ / ⲓⲗ̇ⲁ.

**Frozen-form exemption:** frozen sacred forms are exempt from the doubling mark in **every** script, because their letters are inheritance — Arabic writes both lams of الله, and Coptic mirrors the reverence: **ⲁⲗⲗⲁϩ**, never ⲁⲗ̇ⲁϩ. (In the shahada the ordinary particle *illa* geminates beside the exempt Name — the law teaching itself in one line.)

## 5. Frozen sacred orthography (R-022 extended to script)

Frozen forms carry their **inherited Arabic spelling** in Ajami, held in `data/frozen.json` (`ajami` field): **الله · بسم الله · الحمد لله · إن شاء الله**. Matching is by prefix, so case vowels ride the frozen spelling — *Allah·a* → **اللهَ**, exactly Quranic practice.

## 6. Punctuation

Ajami localizes: , → **،** and ? → **؟**. Coptic and the romanizations keep Western punctuation.

## 7. Hamza

Mid-word glottal ʾ writes as bare **ء** (*Saʾila* → سَءِلَ) — systematic, ruled fine by Ali. Classical hamza-seat rules (ya/waw seats by vowel context) are noted as a possible Optimize-pass refinement, not law.

## 8. For the textbook

Lesson hooks: (1) the dot is scaffolding — learners graduate from display to lived script by watching the dots vanish; (2) the carrier rule is one sentence — "no syllable opens bare"; (3) the doubling mark and its frozen exemption teach the sacred/ordinary distinction *typographically* — the shahada is the canonical example sentence; (4) community hyphens are the bridge for texting before script fluency.
