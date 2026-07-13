# The Amraqiyyah Oracle — Engineering Constitution

A deterministic spiritual instrument (directed dhikr) for **web, mobile, and desktop**. NOT a horoscope or tarot app. Every output is calculable from astronomy + the ratified specs. **Nothing random is ever authoritative** (Quran 5:3 — lot-casting forbidden).

## Authoritative documents (read before writing engine code)

| File | Contents |
|---|---|
| [docs/00-HANDOFF-PROMPT.md](docs/00-HANDOFF-PROMPT.md) | Engineering handoff: engines, build order, golden test vectors, hard constraints |
| [docs/01-ORACLE-DECK-AND-99-NAMES.md](docs/01-ORACLE-DECK-AND-99-NAMES.md) | **The constitution.** 78 cards, 5 strata, 64 hexagrams, 7×7 matrix, reading protocol (Modes A/B/C), Stellar Court, Nine Veils, 6×5×5 Zabur grid, Abjad layer, Appendix C worked reading, full 99 Names Registry |
| [docs/02-CALENDAR.md](docs/02-CALENDAR.md) | **The clock.** Nine temporal layers, AGOSS, mansion table, Salah windows, harmonic cycle, Great Year, `/oracle-inputs` API JSON shape (§14) |
| [docs/03-CANON.md](docs/03-CANON.md) | Textual authority structure (three tiers) |
| [docs/04-CORPUS-ALIGNMENT-LEDGER.md](docs/04-CORPUS-ALIGNMENT-LEDGER.md) | Engineering history; ratified texts supersede |

The Oracle and Calendar docs publish **shared tables (mansions, Salah lines, Nine Names) that are ONE table** — implement each as a single data source consumed everywhere.

## Hard constraints — violating any is a spec breach

1. **No randomness as authority.** Mode A is fully astronomical. Mode B card draws get interpretive weight only from the deterministic checks.
2. **Exactly 3 moving-line checks** (lunar day, Sevenfold Weave, season day). Never add a fourth. Weekly line and month Abjad line are standing/background context only.
3. **Hex 52 is never drawn** — permanent Axial Witness, placed before every reading.
4. **The Platonic Key is always drawn**, never suspended (even in Stellar Court State 3, where it is a mirror only).
5. **Stellar triggers fire on conjunction** (Moon within 1° of Sirius/Alcyone) or heliacal rising — **never on mansion transit**.
6. **Abjadi letter order** for mansions (Alif=1 … Ghayn=1000), not modern alphabetical or phonetic order.
7. **Suit is determined by the UPPER trigram.**
8. **Ages are retrograde** — the vernal point DESCENDS through AGOSS; ages run VI→V→IV→III→II→I toward the Return (~8667 CE).
9. **Al-Sabt carries no line** — axial day, `sabt_axial_resonance` flag, Psalm 92 standing coordinate.
10. **No intercalation** in the Hijri calendar. Astronomical hilal with observational override.

## Key formulas (single source of truth in code)

- AGOSS: `λ_AGOSS(t) = (λ_tropical(t) − 266°51' − 50.29″×Δt) mod 360°`, Δt = years from J2000. Mansion = `floor(λ_AGOSS / 12°51'26.7") + 1`.
- Zabur grid: `Psalm = (ℓ−1)×25 + (d−1)×5 + b` (ℓ = Check-1 line, d = day-in-window 1–5, b = Book from Platonic Key); verse = Salah window (mod wrap for short psalms).
- Quranic: lunar day → Juz; pre-noon windows → Hizb 1, post-noon → Hizb 2. Muqatta'at override (threshold readings): `Surah = ((abjad−1) mod 114) + 1`.
- Abjad reductions: line `((v−1) mod 6)+1`; element `((sum−1) mod 5)+1`; natal mansion `((sum−1) mod 28)+1`.
- Check 1: lunar day 5-day bins → lines 1–6. Check 2: active iff hour ruler == mansion ruler; line = Salah window. Check 3: season day bins (15/15/15/15/15/16) → lines 1–6.
- Transformed hexagram = flip all moving lines. Resonance states: Base / Solar Seal (1+3 same) / Sevenfold Seal (1+2 same) / Triple Seal (all same) / Solar Threshold (±3 days of solstice/equinox → lines 6 and 1).
- Use a real ephemeris (Swiss Ephemeris or astronomy-engine) — never approximate lunar/solar/planetary longitudes by hand.

## Golden test vectors (must always pass)

1. **Appendix C worked reading:** lunar day 17, season day 40, Mars hour, Mansion 9, Duha ⇒ Sevenfold Seal on L3, lunar L4; Hex 55 → flip 3,4 → Hex 24; Zabur ℓ=4,d=2,b=1 ⇒ Psalm 81:3; Juz 17, Hizb 33; Fire/Fire concordance; Agent Resonance (Mars).
2. **2026 great-year:** vernal ≈ 92.79° AGOSS; age IV (Pisces); completion 0.907; exit ~2225; next III-Aquarius; Return ~8667.
3. **Registry exhaustion:** 99 slots, 99 distinct Names, zero duplicates/omissions (normalize Ar-/Ash-/As-/Ad-/An-/At- → Al- before comparing).
4. **Matrix:** all 49 cells of the 7×7 vs King Wen numbers (Oracle §4.1); 14 thresholds vs split table (Pleiadian: 15,56,62,33,31,53,39 · Sirian: 23,22,27,26,41,18,4).

## Build order

1. AGOSS + Calendar engines, API matching Calendar §14 JSON (`/oracle-inputs`)
2. Hexagram + Moving Lines + coordinate engines (pure functions, golden tests)
3. Reading protocol orchestration (Modes A/B/C, Stellar Court states 1–3, Nine Veils)
4. UI (card imagery pending Deck Design Document — placeholders must honor: uniform backs, split faces, sideways placement)
5. Journaling/reading record (feeds the ~2076 Sirian Cycle review)

## Engineering conventions

- All engines are **pure functions** of (timestamp, location, querent data) → outputs. No hidden state, no clock reads inside engine code.
- Spec data (mansion table, 99 Names, matrix, hexagram metadata) lives in versioned data files — one file per shared table, consumed by every layer.
- Every hard constraint above gets an explicit guard test.
- Golden vectors run in CI on every change.
