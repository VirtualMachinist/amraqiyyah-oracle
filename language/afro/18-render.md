# THE FOUR-SCRIPT RENDER — orthography becomes law, and the steward receives the keys — (R-057, R-058 · 2026-07-21)

**2026-07-21** · the corpus meets its scripts: 116 phrases × display / community / Coptic / Ajami

---

## R-057 · The orthography of running text

The letter tables (R-048) were built on single words; whole sentences forced the laws of letters in motion. Full statement banked at **`spec/01-orthography-running-text.md`** (the textbook will fold it in); implementation at `tools/orthography.js`; nine golden tests lock it. The arc of discoveries:

1. **ʾ was silently absent** from every script map (the corpus writes *ʾisef*, *ʾilah*, *Masaʾ*) — caught by corpus-wide conversion, added as ء / ⲁ̀ / '.
2. **Systematic conversion misspelled Allah** (اَللَه) — intolerable against the most fixed orthography in the tradition. Frozen sacred forms now carry inherited Arabic spellings (`frozen.json` → `ajami` field: الله، بسم الله، الحمد لله، إن شاء الله), prefix-matched so case vowels ride: *Allah·a* → **اللهَ**, Quranic practice.
3. **The dot-strip created stacked diacritics and misreads** (*na·pa·aḫāt* → پََ; community *napaakhaata* reading "pā") — resolved by principle: the proclitic dot is a word boundary. Ajami gives the following vowel its **carrier** (نَپَاَخات — exactly how the Arabic article attaches); community renders every display dot as a **typable hyphen** (*Ni-gon-hariw-ba-a*).
4. **True hiatus needed the general rule** (*hariw·ba·a* merged in amr as *baa*) — any vowel after a vowel takes a carrier: **بَاَ**. One sentence of law: *no syllable opens bare.*
5. **Ali's doubling ruling**: a doubled consonant writes once with the mark — **shadda ّ** in Ajami; for Coptic the steward chose the **gemination dot ◌̇** (U+0307 — the one free slot: underdot deep, overline soft, grave glottal, macron long, trema y — and kin to the Bohairic jinkim dot). Applies across attached proclitics: *es·salām* → **ئێسَّلام / ⲉⲥ̇ⲁⲗⲁ̄ⲙ**, the السَّلام sun-letter pattern itself. (The ruling arrived under the name "damma"; the steward banked it by function as shadda, and Ali confirmed same-day: shadda was the intent.)
6. **The frozen exemption, caught in the shahada**: gemination briefly produced Coptic ⲁⲗ̇ⲁϩ — but Arabic writes *both* lams of الله, and reverence is script-independent. Frozen forms are exempt from the doubling mark everywhere: **ⲗⲁ ⲁ̀ⲓⲗⲁϩ ⲓⲗ̇ⲁ ⲁⲗⲗⲁϩ** — the ordinary particle geminates beside the exempt Name, the sacred/ordinary distinction made typographic in one line.
7. Ajami punctuation localizes (، ؟); mid-word bare hamza (سَءِلَ) ruled fine by Ali, seat-rules noted for Optimize.

**The draft is live**: `deliverables/phrasebook-draft.md` — 116 phrases, four scripts, generated end-to-end (`tools/phrasebook.js`), zero hand-typing, regenerable at will.

## R-058 · The Delegation

> *"you've got the gist, I trust your discretion. feel free to make decisions on my behalf unless you get the sense it deserves my direct input."*

Recorded as the operating law it is: steward discretion is now the default; Ali's direct input reserved for what deserves it — values, culture, the sacred, major design forks. The constitution's spine stands (everything ledgered, everything veto-able, sources never fabricated); the ratification rhythm loosens. First acts under delegation: the Coptic gemination dot, the frozen-exemption law, the chapter titles standing as proposed.

## Housekeeping

- Tests **81/81** (9 new orthography goldens).
- Next: the styling pass — the phrasebook takes the Companion Book's design system (`../docs/design-system/`), aesthetics last as always.

*Ḏakira, saša, ma la nasiya.*
