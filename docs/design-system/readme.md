# The Amraqiyyah Oracle — Design System

A design system for **The Amraqiyyah Oracle**: a deterministic spiritual
instrument (directed *dhikr*) delivered as one app across web, iOS, Android, and
desktop — *"the deck and the calendar."* It is **not** a horoscope or tarot app.
Every output is calculable from astronomy and a body of ratified specifications;
nothing random ever carries authority (Qur'an 5:3). The instrument belongs to
Al-Tariqa Amraqiyyah, an American Tariqa rooted in Kemetic tradition and governed
by Ibadhi fiqh, Mu'tazili aqeedah, and Sufi discipline.

The two halves of the product:
- **The Calendar** — nine concentric temporal layers (planetary hour, salah
  window, week, lunar mansion, lunar month, solar season, harmonic cycle, the
  Great Year / AGOSS), each a living dial.
- **The Deck** — 78 cards, 64 hexagrams, a 7×7 matrix, moving-line checks, the
  Stellar Court, the Nine Veils, and six coordinates per reading, culminating in
  the 99 Names as dhikr.

## Sources

This system was reverse-engineered from two repositories the user provided.
Explore them for deeper fidelity when building Amraqiyyah designs:

- **`VirtualMachinist/amraqiyyah-oracle`** — the product itself (the ground
  truth). The Expo app (`apps/app`) supplied the palette (`src/theme.ts`), the
  component vocabulary, and the five screens; `docs/` holds the ratified
  specifications (Oracle Deck, Calendar, Canon, 99 Names).
- **`Hedronite/hedronite-website`** — the sibling brand (same founder/lineage).
  Its `globals.css` supplied the serif type voice (Crimson Pro / EB Garamond),
  the copper/lapis metal palette confirmation, and the sacred-geometry
  background motif adopted here as `.aq-field`.

> Both are private/proprietary; this guide stores the references in case the
> reader has access. Nothing here assumes it.

---

## Content fundamentals

The Oracle's voice is **reverent, precise, and transparent** — a scholar-engineer,
never a fortune-teller.

- **Register.** Sacred and technical at once. Sentences are declarative and
  calm: *"An instrument of directed dhikr — deterministic, transparent."*
  Interface prompts are imperative and quiet: *"Read the sky", "Draw and read",
  "Cast the natal chart", "Hold position. Do not act. Witness."*
- **Person.** Mostly impersonal / instrument-voiced ("the reading", "the sky",
  "the querent"). It rarely says "you"; it never says "I". The user is *the
  querent*.
- **Determinism is the theme.** Copy repeatedly insists that nothing is random:
  *"Nothing random carries authority."* Draw language ("shuffle", "draw") is
  always qualified as carrying no interpretive weight.
- **Casing.** Section eyebrows and layer titles are UPPERCASE in mono with wide
  tracking (*"ALL NINE LAYERS — IN FULL"*, *"ORACLE INPUTS (MODE A)"*). Titles
  and Names are Title Case. Body prose is sentence case.
- **Names & transliteration.** Arabic terms are transliterated with diacritics
  where the app does (*Ẓuhr, Aṣr, Al-Fātiḥa, mizmār, āyāt, Ramaḍān*) and the
  99 Names are written *Al-Qadir, Ar-Razzaq, At-Tawwab* (assimilated article
  normalised to Al- when comparing). Arabic script is shown first as the source,
  translation beneath.
- **Numbers as sacred structure.** Copy leans on exact figures and coordinates —
  "Line 3", "Juz 17, Hizb 33", "Psalm 81:3", "90.7% complete", "Return ~8667" —
  never vague ("soon", "a lot"). Precision *is* the reassurance.
- **Punctuation.** The middot ` · ` separates coordinate fragments everywhere.
  Em dashes carry asides. The ` › ` chevron marks a link into the Texts.
- **Emoji.** Essentially none. The only glyphs used are *meaningful* symbols:
  planetary sigils (☉ ☾ ☿ ♀ ♂ ♃ ♄), trigram/hexagram marks (☶ ◈ ✶), the ✦ sacred
  marker, ⚠ for a threshold, and 📍 for location. Never decorative emoji.

---

## Visual foundations

**Palette (verbatim from `theme.ts`).** A deep-night ground (`--bg` `#0b0b12`)
carries panels (`--panel` `#14141f`) and sunken fields (`--panel-soft`). The
trim is metallic and sacred: **gold leaf** (`--gold` `#d4af6a`) for the primary
accent, active states and titles; **copper** (`#b87333`) for borders and focus;
**lapis lazuli** (`#26418f` / lit `#6d8fd8`) for the night sky and Arabic text.
Signal colours are **teal** (`#5ac8c8`, the deterministic mono readouts) and
**crimson** (`#c85a6e`, moving lines / errors / discordance). Hexagram lines are
gold (yang) over indigo (yin). Max one background colour: the night. See the
Colors cards.

**Typography.** *(See substitution note below.)* Display and headings in
**Crimson Pro** (serif, 700 / 600-italic); running prose in **EB Garamond**;
deterministic readouts and coordinates in **IBM Plex Mono** (teal); sacred
Arabic in **Amiri**, right-to-left. Eyebrows are uppercase mono at 0.18em
tracking. The clock numeral is an ultra-light (200) mono.

**Backgrounds.** Never flat. The night carries a faint concentric-circle ripple
(`.aq-field`, a lapis stroke at ~0.5 opacity) — a distant cousin of the sibling
site's flower-of-life field and a direct echo of the app's dials. No
photographic imagery; no gradients except the dial-core radial
(`--core-1`→`--core-2`) and the sky-band arcs.

**Geometry & motif.** The organising image is the **astrolabe / concentric
dial**: noon at top, midnight at bottom, clockwise, layers nested by speed. Arcs,
rings, needles, and rotated cards recur. Sacred geometry is structural, not
decorative.

**Corners & borders.** Radii are exact app values: 8px (inputs, chips, cards),
10px (buttons, dropdowns), 12px (panels, figures, layer cards), 20px pill (tabs,
verse-number pills, medallions). Borders are 1px hairlines in `--line`; a special
state recolours the border (gold = the Unmoved Axis, teal = Stellar Court). Cards
are outlined, not shadowed.

**Elevation.** The app is flat (React Native); "lift" here is **glow, not
shadow** — a soft coloured halo (`--glow-gold`, `--glow-lapis`) on hover/active,
because metallic trim reads as caught light. Only overlays (dropdowns, modals)
take a real drop shadow (`--shadow-drop`).

**Hover / press.** Quiet. Links move copper → gold; outlined controls gain a
coloured glow and swap border colour toward `--regent`/gold. Active pills/chips
fill gold with night-ink text. No scale-bounce; transitions are a calm
`0.25s cubic-bezier(.25,.1,.25,1)`. Disabled = 0.5 opacity.

**Transparency & blur.** Sparing. A jumped-to verse gets an 8%-gold wash
(`--highlight-wash`); a fixed header (in the sibling site) uses backdrop-blur.
Otherwise surfaces are opaque.

**Imagery vibe.** Cool and nocturnal — lapis and indigo — warmed only by the
gold/copper metals. No grain, no photography.

---

## The Deck — card design language

*(The Deck Design Document hold is lifted; this system now carries full card
art for all 78 cards.)*

- **Geometry is the art.** Card faces render real polyhedra in the **Hedronite
  glass-polyhedron language** (from `hedronite-website`'s canonical
  `PolyhedronScene`): lapis-tinted refractive glass faces (`--glass-face
  #33468c`, attenuation `#1e3a8a`), copper edges (`--glass-edge #9d684e`),
  glowing vertices (`--glass-glow #5d7fd0`). `SolidView` reproduces this as
  print-crisp SVG for every Platonic, Archimedean, and Catalan solid (exact
  vertex data copied from the website repo — kept at
  `assets/polyhedra-data.json`); the live WebGL recipe is in
  `guidelines/glass-polyhedron.card.html`.
- **The five strata, five face designs** (`DeckCard`): Stellar Court (1–3) —
  hieroglyph sigils on a starfield (djed 𓊽 / star 𓇼 / gate 𓉐); Planetary
  Council (4–10) — split yang/yin faces carrying the 14 threshold hexagrams,
  planet medallion at the seam; Platonic Keys (11–15) — the five glass solids;
  Archimedean Bridges (16–28) — Archimedean (yang) over its Catalan dual (yin),
  chiral ⟳ on 22/28; Hexagram Field (29–78) — the six-line figure flanked by
  planet sigils, Pure Resonance rings, the Solar Crown on 54.
- **Constraints honoured:** uniform rotation-symmetric back; split faces are
  two regions on one front (never reversible); the Agent lays sideways.
- **Mdw Ntr accents.** Egyptian hieroglyphs (the Kemetic root, Canon §13.4) are
  curated Unicode signs in `--font-hieroglyph` (Noto Sans Egyptian
  Hieroglyphs): element sigils 𓊮 𓇾 𓊡 𓈗 𓇯, court sigils 𓇼 𓊽 𓉐, the bridge
  boat 𓊛. Sigils and friezes only — never body text, never deity depictions.
- **Elemental suit palette:** `--element-fire/earth/ether/air/water` (see the
  Colors cards). Jalal = Fire + Earth, Jamal = Water + Air, Kamal = Ether.
- The full deck renders at `deck/index.html`; the registry itself is the `DECK`
  export next to `DeckCard`.

---

## Iconography

- **No icon font, no SVG icon set.** The Oracle deliberately uses **meaningful
  Unicode symbols**, not a UI icon library, plus curated Mdw Ntr hieroglyph
  sigils on the deck (see "The Deck" above). The vocabulary:
  - **Planetary sigils** — ♄ ♃ ♂ ☉ ♀ ☿ ☾ (the seven Chaldean planets; each has a
    fixed colour token `--planet-*`).
  - **Hexagram / card glyphs** — ☶ (Axial Witness / Gen), ◈ (Platonic Key),
    ✶ (Agent), ● (a moving line).
  - **Markers** — ✦ (sacred month), ⚠ (Solar Threshold), 📍 (location),
    › (link into Texts).
- **Brand mark.** `assets/hedronite-glyph-copper.png` — the canonical Hedronite
  node-lattice glyph in copper (from hedronite.com's brand assets) — is the
  logo, used on the card back, the thumbnail, and wherever a mark is needed.
  `assets/logo-mark.png` keeps the app-icon chevron; `icon.png`
  is the full app icon (with construction guides); `logo-mono.png` the
  monochrome variant; `favicon.png` the favicon.
- **No new icons should be drawn.** If a glyph is needed, prefer the Unicode
  symbol the app already uses. Do not introduce Lucide/Heroicons/etc. — it would
  read as foreign to this instrument.

---

## Typography substitution — please confirm

The Oracle app renders in the **platform system font** (React Native defaults);
it declares no custom typefaces. To give the design system a durable, portable
type voice I adopted the **sibling Hedronite brand's** serif pairing (Crimson Pro
+ EB Garamond), added **IBM Plex Mono** for the app's many `fontFamily:
"monospace"` readouts, and **Amiri** for the sacred Arabic the app renders in
`react-native-svg`/system Arabic. **All four are served from the Google Fonts
CDN** (`tokens/fonts.css`), so the compiler reports zero bundled `@font-face`
binaries — that is expected.

👉 **If you have preferred typefaces (or licensed font files) for the Oracle,
send them and I will swap them in.** Likewise if you'd rather the system stay on
a neutral system-font stack to match the shipping app exactly.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point (import this). Pulls in all tokens + base.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- `assets/` — `hedronite-glyph-copper.png` (the mark), `logo-mark.png`, `icon.png`, `logo-mono.png`, `favicon.png`, `polyhedra-data.json`.
- `thumbnail.html` — the homepage tile.
- `SKILL.md` — Agent-Skills-compatible entry point.

**Components** (`components/<group>/`, mounted via `window.AmraqiyyahOracleDesignSystem_484c79`)
- *core/* — **Button**, **TabBar**, **SegmentedControl**, **VeilSelector**, **Field**
- *display/* — **Panel**, **LayerCard**, **Medallion**, **DivineName**, **MonoLine**
- *oracle/* — **Meter**, **Hexagram**, **OracleCard**, **VerseRow**, **SolidView**, **DeckCard** (+ the **DECK** registry export)

Each has a `.jsx`, a `.d.ts` props contract, a `.prompt.md` usage note, and its
group shares one `@dsCard` HTML specimen.

**Guidelines** (`guidelines/`) — foundation specimen cards for the Design System
tab, grouped Colors / Type / Spacing / Brand.

**UI kit** (`ui_kits/oracle-app/`) — the interactive five-tab Oracle app
recreation (Now · Reading · Texts · Natal · Journal). See its README.

**The Deck** (`deck/index.html`) — all 78 cards + the uniform back, rendered
from the ratified registry.

### Intentional additions
- **Meter**, **Hexagram**, **OracleCard**, **VerseRow**, **DivineName**,
  **LayerCard**, **SacredClock** (in the UI kit) are domain figures lifted
  directly from the app's screens — they are the app's real reusable vocabulary,
  not generic primitives.
- No slide-deck templates were created: the "deck" here is the 78-card Oracle
  deck, not a slide presentation, and no slide template was provided.

## Caveats
- **OracleCard is the legacy placeholder slot**; `DeckCard` carries the full
  ratified art. Both remain exported.
- **Fonts are substituted** from Google Fonts (see the note above).
- **UI-kit data is demo data** (the Appendix C worked reading), not a live
  ephemeris engine.
- `docs/01-ORACLE-DECK-AND-99-NAMES.md` (the ratified spec) is kept in-project
  as the deck's source of truth.
