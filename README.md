# The Amraqiyyah Oracle

A deterministic instrument of directed dhikr — web, mobile, and desktop from one codebase.
Every output is calculable from astronomy and the ratified specifications ([docs/](docs/)).
Nothing random carries authority (Quran 5:3).

## Layout

| Path | What it is |
|---|---|
| `packages/engine` | Pure TypeScript engines: AGOSS, Calendar (9 layers), Hexagram matrix, Moving Lines (exactly 3 checks), Stellar Court, Reading Protocol (Modes A/B/C), six-coordinate system. Zero UI. |
| `packages/api` | HTTP API: `GET /oracle-inputs` (Calendar §14 JSON), `POST /reading` |
| `apps/app` | Expo app — web, iOS, Android from one codebase |
| `apps/desktop` | Electron shell wrapping the web export |
| `scripts/demo.mjs` | End-to-end demo: Modes A/B/C + all three Stellar Court states |
| `docs/` | The ratified specifications (the authority for everything here) |

## Commands

```bash
npm install                          # all workspaces

# Engine — tests are the constitution
npm test                             # golden vectors + 10 hard-constraint guards + integration

# API
npm run build -w @amraqiyyah/engine && npm run build -w @amraqiyyah/api
node packages/api/dist/server.js     # → http://localhost:4770/oracle-inputs

# Web
cd apps/app && npx expo export --platform web     # → apps/app/dist

# iOS / Android (Hermes bundles; EAS/Xcode for store builds)
cd apps/app && npx expo export --platform ios --platform android --output-dir dist-native
cd apps/app && npx expo start        # live device preview via Expo Go

# Desktop
cd apps/desktop && cp -R ../app/dist web && npx electron-builder --dir   # → apps/desktop/release

# Demo — all modes, all Stellar Court states
node scripts/demo.mjs
```

## Verification

- **Golden vectors** (must always pass): the Appendix C worked reading (Sevenfold Seal L3, Hex 55 → 24, Psalm 81:3, Juz 17/Hizb 33), the 2026 great-year position (92.79° AGOSS, Age IV, 0.907), the 99-Names perfect exhaustion, and all 64 matrix cells vs the classical King Wen chart.
- **Guard tests**: one per hard constraint in [CLAUDE.md](CLAUDE.md).

## Engineering rulings (documented ijtihad)

1. **Sevenfold Seal**: Appendix C names a Check 2 + Check 3 convergence a Sevenfold Seal; the engine treats any convergence involving the Weave as Sevenfold (the §9.3 table's "1+2" is an instance, not the definition).
2. **Conjunction**: "Moon within 1° of Sirius" is ecliptic-longitude separation — Sirius sits 39.6° below the ecliptic, so a 3D separation of 1° never occurs, and the spec's "~2–4 hours" monthly window matches the longitude reading exactly.
3. **Heliacal rising**: first dawn visibility (star ≥ 5° altitude when the Sun crosses −9°) after a period of invisibility; the activation window is that day and the next.
4. **Astronomical Hijri**: months anchor to the new-moon conjunction (anchor: 1 Muharram 1447 = conjunction of 25 June 2025); lunar day = floor(days since conjunction) + 1.
