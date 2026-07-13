# HANDOFF PROMPT — The Amraqiyyah Oracle Application

*Institutional briefing for the engineering context that will build the app. Ingest fully before writing code.*

## What You Are Building

A deterministic spiritual instrument — not a horoscope app, not a tarot app. The Amraqiyyah Oracle is an instrument of directed dhikr within Al-Tariqa Amraqiyyah, an American Tariqa rooted in Kemetic tradition and governed by Ibadhi fiqh, Mu'tazili aqeedah, and Sufi discipline (Ghazali + Ibn Arabi). Every output is calculable from astronomy and the ratified specifications. **Nothing is random: lot-casting is forbidden (Quran 5:3).** Mode A derives everything from the sky; Mode B uses physical/virtual card draws whose interpretive weight rests on deterministic astronomical checks.

## Authoritative Sources (ingest in this order)

1. **The Amraqiyyah Oracle Deck v1.0** — the constitution: 78 cards, 5 strata, 64 hexagrams, reading protocol, coordinates
2. **The Amraqiyyah Calendar v1.0** — the clock: nine temporal layers, AGOSS, the Twelve Ages, the week
3. **The 99 Names Registry v1.0** — every Name assignment (verified: perfect exhaustion)
4. **The Amraqiyyah Canon v1.1** — the textual authority structure
5. Changelogs + Corpus Alignment Ledger — engineering history; the ratified texts supersede

## The Core Engines to Implement

**1. AGOSS Engine.** λ_AGOSS(t) = (λ_tropical(t) − 266°51' − 50.29″×Δt) mod 360, Δt years from J2000. Mansions: floor(λ_AGOSS / 12°51'26.7") + 1. Ages: fixed 30° arcs; vernal point DESCENDS (retrograde). Use a real ephemeris (Swiss Ephemeris / astronomy-engine) for lunar/solar/planetary longitudes.

**2. Calendar Engine (9 layers).** Planetary hours (sunrise/sunset ÷ 12, Chaldean order, day-lord start); Salah windows → lines 1–6 (Tahajjud L1 … Maghrib-Isha L6); week (al-Ahad→al-Jumu'ah standing lines 1–6; **al-Sabt = axial, no line, sabt_axial_resonance flag**); mansions (abjadi letters, 4/planet Chaldean); Hijri months (astronomical, no intercalation); solar seasons (91-day, 6 lines, L6 holds 16 days; Solar Threshold ±3 days of solstice/equinox); harmonic cycle (11,694-day cycles from Age IV entry ~78 CE; currently cycle 61, boundary ~2031); Great Year (Age IV Pisces 78–2225 CE, 90.7% in 2026; next Age III Aquarius; Return ~8667).

**3. Moving Line Engine (exactly three checks — never add a fourth).** Check 1 lunar day→line (5-day bins); Check 2 Sevenfold Weave (active iff hour ruler == mansion ruler; line = Salah window); Check 3 season day→line. Resonance states: Base / Solar Seal / Sevenfold Seal / Triple Seal / Solar Threshold. Transformed hexagram = flip moving lines.

**4. Hexagram Engine.** 7×7 matrix (rows=lower/ground=hour ruler; cols=upper/sky=mansion ruler; suit by UPPER trigram). Gen=Sgr A* is the 8th trigram. Hex 52 = permanent Axial Witness (never drawn). 14 thresholds live on the 7 Council cards: yang half = Pleiadian (planet↑/Gen↓): 15,56,62,33,31,53,39; yin half = Sirian (Gen↑/planet↓): 23,22,27,26,41,18,4.

**5. Stellar Court Engine.** Triggers: Moon within 1° of Sirius / of Alcyone (conjunction, NOT mansion transit), or heliacal risings (annual, max weight). Three states per the spec's decision table (State 3 = hold; only Quranic+Zabur coordinates emitted).

**6. Reading Protocol (Modes A/B/C).** 8 steps; Platonic Key ALWAYS drawn; Bridge orientation deterministic by Key element; chiral cards (7, 13) by lunar illumination (>50% right, <50% left, =50% hold). Nine Veils: querent-declared depth n engages layers 1..n; check weighting by Veil band (1–3→Check 2, 4–6→Check 1, 7–9→Check 3); dhikr scale.

**7. Coordinate Engine (six per reading).** Hexagram · Divine Name(s) (from Registry) · Quranic (lunar day→Juz; pre/post-noon→Hizb 1st/2nd; Muqatta'at override in threshold readings: Surah = ((abjad−1) mod 114)+1) · **Zabur 6×5×5 grid: Psalm = (ℓ−1)×25 + (d−1)×5 + b** (ℓ=Check-1 line, d=day-in-window 1–5, b=Book from Key; verse=Salah window; Mode A prefers royal psalms in-band; Sabt adds Psalm 92 standing) · Abjad (mansion standing line ((v−1) mod 6)+1; question gematria→element; natal mansion ((name-sum−1) mod 28)+1 with natal-transit resonance) · Temporal (all 9 layers to Veil depth).

**8. The 99 Names layer.** Load the Registry as data. Per reading emit: hexagram Name, suit Name, Key Name, Veil-layer Name, (Stellar Names when active). Dhikr counts = Name's Abjad value.

## Build Order

Phase 1: AGOSS + Calendar engines with API matching the Calendar spec's JSON (endpoint /oracle-inputs). Phase 2: Hexagram + Moving Lines + coordinates (pure functions, golden tests). Phase 3: Reading protocol orchestration (Modes A/B/C, Stellar Court, Veils). Phase 4: UI — card imagery per the Deck Design Document (pending; use placeholders honoring: uniform backs, split faces, sideways placement). Phase 5: journaling/reading record (feeds the ~2076 Sirian Cycle review).

## Golden Test Vectors

- Worked reading (Oracle Appendix C): lunar day 17, season day 40, Mars hour, Mansion 9, Duha ⇒ Sevenfold Seal on L3 + L4; Hex 55 → flip 3,4 → Hex 24; Zabur ℓ4,d2,b1 ⇒ **Psalm 81:3**; Juz 17, Hizb 33.
- 2026 great-year: vernal ≈ 92.79° AGOSS, age IV, completion 0.907, exit 2225, next III-Aquarius, Return 8667.
- Registry: assert 99 slots, 99 distinct Names (normalize Ar-/Ash-/As-/Ad-/An-/At- → Al-).
- Matrix: all 49 cells vs King Wen; thresholds vs the corrected split table.

## Hard Constraints (violating any is a spec breach)

No randomness as authority · exactly 3 checks · Hex 52 never drawn · Key never suspended · conjunction (not mansion) stellar triggers · abjadi letter order · suit by upper trigram · retrograde ages · Sabt carries no line · the two documents' shared tables are ONE table (single data source).

*Bismillah. Build it deterministic, build it transparent, build it worthy of ratification.*
