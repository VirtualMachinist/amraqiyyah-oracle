/**
 * End-to-end demonstration: Modes A/B/C + all three Stellar Court states,
 * each producing a complete six-coordinate reading from the real ephemeris.
 * Run: node scripts/demo.mjs
 */
import {
  performReading,
  stellarCourtState,
  moonStarLongitudeSeparation,
} from '../packages/engine/dist/index.js';
import { SIRIUS, ALCYONE } from '../packages/engine/dist/astro/ephemeris.js';

const LOC = { lat: 41.885, lon: -87.627, tz: 'America/Chicago' };

function show(title, r) {
  console.log(`\n${'='.repeat(72)}\n${title}\n${'='.repeat(72)}`);
  console.log(`  Moment: ${r.calendar.amraqiyyah_date}  (${r.calendar.timestamp})`);
  console.log(`  Stellar Court: ${r.stellarCourt.state} (weight: ${r.stellarCourt.weight})`);
  if (r.holdAndWitness) {
    console.log('  STATE 3 — Hold position. Do not act. Witness.');
    console.log('  No hexagram is named. No lines move. The texts speak:');
    console.log(`    Quranic: Juz ${r.coordinates.quranic.juz}, Hizb ${r.coordinates.quranic.hizb}`);
    console.log(`    Zabur:   Psalm ${r.coordinates.zabur.psalm}:${r.coordinates.zabur.verse}`);
    console.log(`  Names: ${r.activeNames.map((n) => n.name).join(' · ')}`);
    return;
  }
  const h = r.hexagram, t = r.transformed, ml = r.movingLines;
  console.log(`  1 HEXAGRAM  ${h.number} — ${h.name} (${h.upper} over ${h.lower}, ${h.suit})`);
  console.log(`    moving lines [${ml.movingLines.join(', ')}] — ${ml.resonance}`);
  ml.checks.forEach((c) => console.log(`      check ${c.check} (${c.clock}) → line ${c.line}`));
  console.log(`    → transformed: ${t.number} — ${t.name}`);
  console.log(`  2 DIVINE NAMES  ${r.activeNames.map((n) => n.name).join(' · ')}`);
  const q = r.coordinates.quranic;
  console.log(`  3 QURANIC  ${q.muqattaatSurah ? `Surah ${q.muqattaatSurah} opening verse (Muqatta'at override)` : `Juz ${q.juz}, Hizb ${q.hizb} (${q.hizbHalf})`}`);
  const z = r.coordinates.zabur;
  console.log(`  4 ZABUR  Psalm ${z.psalm}:${z.verse} (ℓ${z.lineRegister} d${z.dayInWindow} b${z.book})${z.royalPsalm ? ` · royal: ${z.royalPsalm}` : ''}${z.sabtPsalm ? ` · Sabt: Psalm ${z.sabtPsalm}` : ''}`);
  const a = r.coordinates.abjad;
  console.log(`  5 ABJAD  mansion ${a.mansionLetter} (${a.mansionAbjad}) → standing line ${a.standingLine}${a.natal ? ` · natal mansion ${a.natal.mansionNumber} (${a.natal.ruler})${a.natal.natalTransit ? ' — NATAL TRANSIT' : ''}` : ''}`);
  const L = r.calendar.layers;
  console.log(`  6 TEMPORAL  hour ${L.planetary_hour.planet} · ${L.salah.current_window} L${L.salah.hexagram_line} · ${L.week.day} · mansion ${L.mansion.number} · day ${L.hijri.day} ${L.hijri.month_name} · season d${L.solar_season.day_of_season} L${L.solar_season.active_line} · cycle ${L.harmonic_cycle.cycle_number} · age ${L.great_year.age_label} ${(L.great_year.age_completion * 100).toFixed(1)}%`);
  if (r.resonanceCheck) {
    console.log(`  MODE C  astro Hex ${r.resonanceCheck.astronomicalHexagram} vs drawn Hex ${r.resonanceCheck.drawnHexagram} → ${r.resonanceCheck.verdict}`);
  }
  if (r.concordance) {
    console.log(`  CONCORDANCE  Key ${r.concordance.keyElement} vs ${r.concordance.comparedTo} → ${r.concordance.result}`);
  }
}

const NOW = new Date();

// ---- Modes A, B, C at the present moment -------------------------------
show('MODE A — Astronomical (the sky alone)', performReading({
  mode: 'A', timestamp: NOW, location: LOC, veil: 5, querentNameArabic: 'عبد القادر',
}));

show('MODE B — Deck reading (draws entered; weight stays astronomical)', performReading({
  mode: 'B', timestamp: NOW, location: LOC, veil: 3,
  draws: { platonicKeyCard: 11, hexagramFieldCard: 45, bridgeCard: 17, agentCard: 6 },
}));

show('MODE C — Resonance check (drawn vs astronomical)', performReading({
  mode: 'C', timestamp: NOW, location: LOC, veil: 7,
  draws: { platonicKeyCard: 14, hexagramFieldCard: 54, bridgeCard: 22, agentCard: 7 },
}));

// ---- Stellar Court states from the real ephemeris ----------------------
function findConjunction(star, from, maxDays = 40) {
  for (let h = 0; h < 24 * maxDays; h++) {
    const t = new Date(from.getTime() + h * 3600_000);
    if (moonStarLongitudeSeparation(star, t) <= 1) return t;
  }
  return null;
}

const siriusTime = findConjunction(SIRIUS, NOW);
if (siriusTime) {
  show(`STATE 1 — Witness Star (Moon–Sirius conjunction found ${siriusTime.toISOString()})`,
    performReading({ mode: 'B', timestamp: siriusTime, location: LOC, veil: 5,
      draws: { platonicKeyCard: 12, bridgeCard: 20, agentCard: 5 } }));
}

const alcyoneTime = findConjunction(ALCYONE, NOW);
if (alcyoneTime) {
  show(`STATE 2 — Pleiades Gate (Moon–Alcyone conjunction found ${alcyoneTime.toISOString()})`,
    performReading({ mode: 'B', timestamp: alcyoneTime, location: LOC, veil: 5,
      draws: { platonicKeyCard: 15, bridgeCard: 23, agentCard: 9 } }));
}

// ---- State 3: search for a real simultaneous activation; else replay ----
console.log('\nSearching for a real State 3 (both gates) occurrence…');
let bothTime = null;
outer: for (let d = 0; d < 366 * 4; d++) {
  const day = new Date(NOW.getTime() + d * 86400_000);
  // Cheap prefilter: only near-conjunction days need the full check.
  if (moonStarLongitudeSeparation(SIRIUS, day) > 14 && moonStarLongitudeSeparation(ALCYONE, day) > 14) continue;
  for (let h = 0; h < 24; h++) {
    const t = new Date(day.getTime() + h * 3600_000);
    const s = stellarCourtState(t, LOC);
    if (s.state === 'both') { bothTime = t; break outer; }
  }
}

if (bothTime) {
  show(`STATE 3 — The Unmoved Axis (real occurrence ${bothTime.toISOString()})`,
    performReading({ mode: 'B', timestamp: bothTime, location: LOC, veil: 9,
      draws: { platonicKeyCard: 14 } }));
} else {
  console.log('No real State 3 within 4 years (it is the rarest state) — replaying a recorded status:');
  const court = {
    state: 'both',
    sirius: { conjunction: false, separationDeg: 3.2, heliacalRising: true },
    pleiades: { conjunction: true, separationDeg: 0.7, heliacalRising: false },
    weight: 'maximum',
  };
  show('STATE 3 — The Unmoved Axis (replayed status: Sirius heliacal + Moon–Alcyone conjunction)',
    performReading({ mode: 'B', timestamp: NOW, location: LOC, veil: 9,
      draws: { platonicKeyCard: 14 }, courtOverride: court }));
}

console.log('\nDone. Every output above is deterministic from (timestamp, location, draws).');
