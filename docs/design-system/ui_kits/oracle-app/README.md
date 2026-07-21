# UI Kit — The Amraqiyyah Oracle app

A high-fidelity, interactive recreation of the Oracle's Expo app (web/iOS/Android
from one codebase), rebuilt in HTML/React from `apps/app` in
`VirtualMachinist/amraqiyyah-oracle`. It composes the design-system primitives —
it does not re-implement them.

## Run
Open `index.html`. A portrait phone frame with the five product tabs:

- **Now** — the live substrate. The `SacredClock` astrolabe (a faithful SVG port
  of the app's dial: sky band, 24 planetary hours, six salah windows, gold
  needle), six `Meter` dials for the slow cycles, and the nine temporal layers as
  `LayerCard`s, plus the Mode-A oracle inputs.
- **Reading** — choose Mode (A/B/C) and Veil (1–9), pose a question, and read.
  The result lays out the drawn `OracleCard`s (Axial Witness, Platonic Key,
  sideways Agent, split Bridge), the situation + trajectory `Hexagram`s, the
  resonance checks, the six coordinates, and the active Names for dhikr.
- **Texts** — the Qur'ān surah index (`Medallion` + Arabic) and the Zabūr psalm
  grid; tap Psalm 81 to open the reader with gold-haloed `VerseRow`s.
- **Natal** — cast a birth chart; the seven Chaldean placements in AGOSS.
- **Journal** — the accumulated reading record.

## Files
- `index.html` — device frame, header, `TabBar` routing, screen mount
- `SacredClock.jsx` — the astrolabe dial (self-contained, ephemeris-free demo schedule)
- `screens.jsx` — the five screens, composing DS components with demo data

## Fidelity notes
Colours, radii, and layout are taken from the app's `theme.ts` and StyleSheets.
The deterministic engine is stubbed with representative demo data (the Appendix C
worked reading: Hex 55 → 24, Psalm 81:3, Juz 17). Card imagery is intentionally
placeholder per the ratified constraints (uniform backs, split faces, sideways
Agent) — the Deck Design Document is still pending.
