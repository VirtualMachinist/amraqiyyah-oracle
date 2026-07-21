---
name: amraqiyyah-oracle-design
description: Use this skill to generate well-branded interfaces and assets for The Amraqiyyah Oracle (a deterministic dhikr instrument — the deck and calendar app), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **`styles.css`** is the single stylesheet entry — link it and you get every token + the base layer (night background, `.aq-field` sacred-geometry ripple, link colours, `.aq-eyebrow`, `.aq-arabic`).
- **Palette**: deep-night ground; gold-leaf + copper + lapis trim; teal for deterministic mono readouts; crimson for moving lines/errors. One background colour only — the night.
- **Type**: Crimson Pro (display) · EB Garamond (body) · IBM Plex Mono (readouts, teal) · Amiri (Arabic, RTL). Served from Google Fonts.
- **Voice**: reverent + precise + transparent; determinism is the theme; uppercase mono eyebrows; meaningful Unicode symbols, never decorative emoji.
- **Components** live in `components/<group>/` and mount from `window.AmraqiyyahOracleDesignSystem_484c79`. Read each `.prompt.md` for usage. `DeckCard` renders any of the 78 ratified cards (registry: the `DECK` export); `SolidView` renders any Platonic/Archimedean/Catalan solid in the glass language.
- **The deck** renders in full at `deck/index.html`; the ratified spec is kept at `docs/01-ORACLE-DECK-AND-99-NAMES.md`.
- **UI kit** at `ui_kits/oracle-app/` is the interactive five-tab app recreation — the best reference for real screen composition.

Do not invent icon sets or card art; use the Unicode symbol vocabulary and the placeholder-card constraints documented in README.md.
