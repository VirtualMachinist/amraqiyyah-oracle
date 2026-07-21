# Session Handoff — The Amraqiyyah Oracle (2026-07-20)

You are picking up a **React Native / Expo** app (`apps/app`) for the Amraqiyyah Oracle — a deterministic spiritual instrument. The engine is done and tested; this handoff covers the **UI/aesthetic + card system** work. Read `CLAUDE.md` (the Engineering Constitution) and the `docs/` specs first. Auto-memory under `~/.claude/.../memory/` also carries this state.

**Your immediate job:** port the canonical **DeckCard** and wire it into the reading, so a reading shows real deck cards instead of the crude `PlaceholderCard`. Everything it depends on is already built and pushed.

---

## 1. Where things stand — the whole picture

The app has **five tabs** (`apps/app/App.tsx`): **Now** (the live Sacred Clock + cycle meters), **Reading** (the oracle), **Texts** (Qur'ān + Zabūr), **Natal** (birth chart), **Journal**.

**Complete and pushed to GitHub (`VirtualMachinist/amraqiyyah-oracle`, branch `main`):**
- **Engine** (`packages/engine`) — 61 tests green. AGOSS, 9-layer Calendar, Hexagram matrix, Moving Lines, Stellar Court, coordinates, reading protocol (Modes A/B/C), `daySchedule`, `natalChart`. Pure functions. **Do not** approximate astronomy by hand — use the engine.
- **Texts pillar** — Qur'ān (Uthmānī + Yusuf Ali) + Zabūr (Van Dyck Arabic + KJV), bundled offline in `apps/app/src/texts/`. Reading coordinates are tappable → jump to the verse.
- **Sacred Clock** (`apps/app/src/screens/SacredClock.tsx`) + **cycle meters** (`CycleMeters.tsx`) — the Now tab, a live astrolabe. Isha/Tahajjud night split is display-only. Real moon phase.
- **Natal pillar** (`apps/app/src/screens/NatalView.tsx`, engine `oracle/natal.ts`) — full AGOSS birth chart.
- **Location** (`apps/app/src/geo/`, `LocationPicker.tsx`) — offline city gazetteer + GPS; coordinates & timezone always coherent.
- **Aesthetic pass I–III** — typography (Crimson Pro / EB Garamond / IBM Plex Mono / Amiri via `@expo-google-fonts`), the `.aq-field` sacred-geometry lattice (`components/AqField.tsx`), glow elevation, and the Hedronite brand mark in the header.
- **Glass polyhedra** — `apps/app/src/solids/geometry.ts` (verbatim geometry) + `apps/app/src/screens/SolidView.tsx` (typed react-native-svg renderer). **Verified rendering.** This is what the Key/Bridge cards need.
- **Design System** committed at `docs/design-system/` (reference; it is web/DOM React — the app **ports** it, never imports it).

**Not started — YOUR TASK: the card faces in the reading (see §4).**

**Backlogged (do not do unless asked):** the glass polyhedra as a standalone hero showpiece (Phase IV) — but note SolidView already exists at card scale; matching the `ui_kits` reference layouts more precisely; the field opacity is deliberately subtle (user may ask to raise it — it's one number in `AqField.tsx`). Card *raster art* is still pending the Deck Design Document, but the **procedural** DeckCard design is ready to port.

---

## 2. Recent commits (all pushed)

```
164ca49 Glass polyhedra: SolidView ported to react-native-svg   ← most recent
6fab73b Aesthetics III — the Hedronite mark in the header
8e71e45 Aesthetics II — the sacred-geometry field + glow elevation
f09e207 docs: add the ratified Design System (reference)
a0b1a7b expo-font config plugin
c791e47 Aesthetics I — typography foundation
bdae53f Location: city picker + GPS
740f0eb Clock: split the night into Isha + Tahajjud; draw true moon phase
662ae11 Sacred Clock: the planetary day as a living astrolabe
3c4acdd Natal pillar
12f74f1 Texts pillar
```

---

## 3. How to run & verify (operational)

- **Engine must be built before the app bundles** (the app imports `@amraqiyyah/engine` → its `dist/`, which is gitignored):
  `npm run build -w @amraqiyyah/engine` (from repo root). Re-run after any engine change.
- **Run tests:** `npm test` (from root) → 61 pass.
- **Typecheck the app:** `npx tsc --noEmit -p apps/app/tsconfig.json` (use the ABSOLUTE path; the shell cwd resets to repo root between tool calls).
- **Dev server:** `cd apps/app && npx expo start --web` (detach it: `nohup … & disown` so it survives). Metro serves on `localhost:8081`. **Restart Metro (with `--clear`) after adding a dependency or a new engine export** — HMR won't pick those up.
- **The user is remote on a phone over Tailscale.** The Mac's Tailscale IP is `100.105.230.69` → the user opens `http://100.105.230.69:8081`.
- **You verify visually via the in-app Browser tools** (`mcp__Claude_Browser__*`): `preview_start {url:"http://localhost:8081"}`, `resize_window {preset:"mobile"}` (375×812), then `computer {action:"screenshot"}`. To click RN-web elements reliably, `read_page {filter:"interactive"}` then `computer {action:"left_click", ref:"ref_N"}` (coordinate clicks often miss). `form_input {ref, value}` fills TextInputs and triggers React state. **The clock ticks every second, so `scroll` actions time out waiting for idle** — screenshot instead, or scroll via `javascript_tool`.

### Git push — READ THIS
The machine has two GitHub identities. `id_rsa` = `NebuHedron` (offered first, **no write access**); `id_ed25519` = `VirtualMachinist` (the repo owner). The repo is already configured to use the right key:
`git config core.sshCommand "ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes"` — so `git push` **just works** from this repo. Don't switch to HTTPS. The history was purged of a 156 MB Electron build artifact to get under GitHub's limit; `backup-pre-purge` branch holds the original (local only).

---

## 4. YOUR TASK — port DeckCard + wire the reading

**Goal:** in the **Reading** tab, replace the placeholder cards with canonical `DeckCard`s.

### 4a. The source
`docs/design-system/components/oracle/DeckCard.jsx` (270 lines, web/DOM). It has:
- A **shared vocab**: `SIGIL`, `TRIGRAM`, `TRIG_LINES`, `EL_GLYPH`, `hexLines(upper,lower)`, plus color maps `PLANET_COLOR`/`EL_COLOR` (which use CSS `var()` — **redefine these from `apps/app/src/theme.ts`**, where `PLANET_COLOR` and `ELEMENT` already exist).
- The **ratified 78-card `DECK` registry** (`COURT` 1–3, `COUNCIL` 4–10, `KEYS` 11–15, `BRIDGES` 16–28, `FIELD` 29–78). **Extract this verbatim** (like `src/solids/geometry.ts` was extracted) into `apps/app/src/deck/registry.ts` with `// @ts-nocheck`, exporting `DECK`, `hexLines`, `SIGIL`, `TRIGRAM`, `EL_GLYPH`, `TRIG_LINES`. Do NOT hand-retype the registry — script the extraction to avoid errors.
- The **card render** by stratum:
  - Frame: dark radial-gradient card (2.75:4.75 ratio, `width*1.714`), copper inner border, a concentric-circle "ripple" background. In RN: use `react-native-svg` (or `expo-linear-gradient`) for the gradient; reuse an `AqField`-style `<Pattern>` for the ripple. No CSS gradients on RN `View`.
  - **Stratum 1 (Court):** big hieroglyph glyph + lapis glow + trigger text; star dots for Pleiades(#3)/Sirius(#2).
  - **Stratum 2 (Council):** split yang/yin halves, each a `HexFigure` + label, planet sigil medallion centered on the seam.
  - **Stratum 3 (Keys):** `<SolidView solid={c.solid} size=…/>` — **already ported** (`apps/app/src/screens/SolidView.tsx`). Note the registry's `solid` values are lowercase snake_case (`tetrahedron`, `cube`, `octahedron`, `dodecahedron`, `icosahedron`) — SolidView expects exactly those.
  - **Stratum 4 (Bridges):** two `SolidView`s — the Archimedean (`c.arch`) over its Catalan dual (`c.cat`, `tone="lapis"`), + a chiral ⟳ mark on 22/28.
  - **Stratum 5 (Field):** `HexFigure` with planet sigils/trigrams flanking; Pure-Resonance rings (`c.pure`); the Solar Crown on 54 (`c.crown`, gold lines).
  - Shared chrome: header (number medallion + Arabic letter/abjad OR element hieroglyph), display-serif title, hieroglyph frieze, Divine-Name block (name + Arabic + meaning + mansion/suit mono line).
- `HexFigure({upper,lower,w,k,accent})` — six bars (yang = solid gold bar; yin = two indigo bars). In RN this is `View`s, like the existing `HexagramFigure` in `App.tsx`.
- `card="back"` renders the uniform back (hieroglyph friezes + the Hedronite mark, already at `apps/app/assets/hedronite-glyph-copper.png`).

Write it as `apps/app/src/screens/DeckCard.tsx`, props `{card: number|"back", width?, orientation?: "upright"|"inverted"|"sideways"}`.

### 4b. Wiring — the mapping is already clean (verified)
The engine card numbers === the DS DECK numbers. In `ReadingResultView` (`App.tsx`), the current `PlaceholderCard`s map directly:
- **Axial Witness** → `<DeckCard card={29} />` (Hex 52 = FIELD #29).
- **Platonic Key** → `<DeckCard card={result.platonicKey.card} />` (`.card` is 11–15).
- **Planetary Agent** → `<DeckCard card={result.agent.card} orientation="sideways" />` (`.card` is 4–10; only present in Mode B/C).
- **Bridge** → `<DeckCard card={result.bridge.card} orientation={result.bridge.orientation} />` (`.card` is 16–28; `.orientation` is `'upright'|'inverted'|'sideways'`).

`result.platonicKey.card`, `result.agent.card`, `result.bridge.card` already exist on `ReadingResult` (see `packages/engine/src/oracle/reading.ts` ~lines 90–120, 209–245). No translation table needed.
- **Verify** the FIELD stratum's number→hexagram alignment between engine (`packages/engine/src/data/cards.ts`, `FIELD_CARDS` built via nested MATRIX loops) and the DS `FIELD` list, in case you also render field cards as DeckCards (the situation/trajectory hexagrams currently use `HexagramFigure`, not DeckCard — leave those unless asked).

### 4c. Fonts / gotchas
- The cards use **Egyptian hieroglyphs** (𓊮 𓇾 …). Currently NO hieroglyph font is loaded — they fall back to the system font (renders on web/iOS, may tofu on Android). Consider loading **Noto Sans Egyptian Hieroglyphs** (verify an `@expo-google-fonts` package exists; else bundle the `.ttf` via `expo-font`). Fonts are loaded in `App.tsx` via `useFonts` (gated render). Add the family to `theme.ts` `FONTS` as `hieroglyph`.
- **RN font rule:** each weight is its own family (e.g. `FONTS.displayBold = 'CrimsonPro_700Bold'`), NOT `fontWeight`. Arabic uses `FONTS.arabic` (Amiri) with `writingDirection:'rtl'`.
- **Astro/planet glyphs** (☉☽♂…) are NOT in Crimson/Plex/Amiri — leave those `Text`/`SvgText` on the system font (don't set a custom `fontFamily`), or they'll break. SolidView already avoids this.
- Typecheck with the absolute `-p` path; verify each stratum renders by temporarily mounting a few `DeckCard`s (as was done for SolidView), screenshot, then remove the temp block before committing.

### 4d. Suggested commit sequence
1. Extract registry → `src/deck/registry.ts`; commit.
2. `DeckCard.tsx` (frame + all 5 strata); verify each stratum; commit.
3. Wire `ReadingResultView`; run a Mode B reading in the browser and confirm real cards; commit.
4. (Optional) hieroglyph font; commit.

Push after each (git is set up).

---

## 5. Conventions & values (the user cares about these)
- This is a **spiritual endeavor**, reverent and precise — not a tech demo. Correctness is reverence; the engine refuses randomness as authority (Qur'an 5:3). Match that care.
- **Never violate the hard constraints in `CLAUDE.md`** (exactly 6 Salah windows→6 lines, Hex 52 never drawn, suit by upper trigram, retrograde ages, etc.). When the user proposes something that touches a ratified constraint, **surface it and let them decide** (e.g., the Isha split was made display-only to preserve the 6-line bridge).
- Aesthetic north star: **sacred, ancient, geometric — copper, lapis, gold, on deep night**; serif for reading, calligraphy reserved for card ornament. Design tokens live in `apps/app/src/theme.ts`.
- Commit messages: end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Commit/push only what the user asked; they want milestones pushed.
- Verify visually on the phone-sized browser before claiming done. Be honest about what's placeholder vs. real.
