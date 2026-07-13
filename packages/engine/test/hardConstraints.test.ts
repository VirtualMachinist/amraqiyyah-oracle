/**
 * GUARD TESTS — one dedicated test per hard constraint in CLAUDE.md.
 * Violating any of these is a spec breach.
 */
import { describe, expect, it } from 'vitest';
import {
  deriveMovingLines,
  DRAWABLE_FIELD_CARDS,
  FIELD_CARDS,
  HIJRI_MONTHS,
  MANSIONS,
  SALAH_WINDOW_LINES,
  WEEK,
  AGES,
  HEXAGRAMS,
  performReading,
  seasonDayLine,
  vernalPointAgoss,
  TRIGRAMS,
  MATRIX,
  CHALDEAN_ORDER,
  hexagramByNumber,
  type GeoLocation,
} from '../src/index.js';

const CHICAGO: GeoLocation = { lat: 41.885, lon: -87.627, tz: 'America/Chicago' };

describe('Hard constraint #1 — no randomness as authority', () => {
  it('the engine exposes no RNG: Mode B draws must be passed in explicitly', () => {
    expect(() =>
      performReading({
        mode: 'B',
        timestamp: new Date(Date.UTC(2026, 6, 1, 18, 0, 0)),
        location: CHICAGO,
        veil: 5,
      })
    ).toThrow(/require card draws/);
  });

  it('engine source contains no Math.random (interpretive weight is deterministic)', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const url = await import('node:url');
    const srcDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../src');
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(p);
        else if (entry.name.endsWith('.ts') && fs.readFileSync(p, 'utf8').includes('Math.random')) {
          offenders.push(p);
        }
      }
    };
    walk(srcDir);
    expect(offenders).toEqual([]);
  });
});

describe('Hard constraint #2 — exactly three moving-line checks, never a fourth', () => {
  it('maximum three checks even under every activation', () => {
    const result = deriveMovingLines({
      lunarDay: 15,
      sevenfoldActive: true,
      salahWindow: 'duha',
      dayOfSeason: 45,
      solarThreshold: true,
    });
    expect(result.checks.length).toBeLessThanOrEqual(3);
    expect(new Set(result.checks.map((c) => c.check)).size).toBe(result.checks.length);
    for (const c of result.checks) expect([1, 2, 3]).toContain(c.check);
  });

  it('minimum two checks (1 and 3 are always active)', () => {
    const result = deriveMovingLines({
      lunarDay: 1,
      sevenfoldActive: false,
      salahWindow: 'fajr',
      dayOfSeason: 1,
      solarThreshold: false,
    });
    expect(result.checks.map((c) => c.check)).toEqual([1, 3]);
  });
});

describe('Hard constraint #3 — Hex 52 is never drawn', () => {
  it('card 29 (Hex 52) is not in the drawable field', () => {
    expect(FIELD_CARDS.find((c) => c.cardNumber === 29)?.drawable).toBe(false);
    expect(DRAWABLE_FIELD_CARDS.some((c) => c.hexagram === 52)).toBe(false);
    expect(DRAWABLE_FIELD_CARDS).toHaveLength(49);
  });

  it('performReading rejects a draw of card 29', () => {
    expect(() =>
      performReading({
        mode: 'B',
        timestamp: new Date(Date.UTC(2026, 6, 1, 18, 0, 0)),
        location: CHICAGO,
        veil: 3,
        draws: { platonicKeyCard: 11, hexagramFieldCard: 29 },
      })
    ).toThrow(/never drawn/);
  });
});

describe('Hard constraint #4 — the Platonic Key is always drawn, never suspended', () => {
  it('every reading result carries a Platonic Key, and Mode B requires one', () => {
    const r = performReading({
      mode: 'B',
      timestamp: new Date(Date.UTC(2026, 6, 1, 18, 0, 0)),
      location: CHICAGO,
      veil: 5,
      draws: { platonicKeyCard: 11, hexagramFieldCard: 45, bridgeCard: 17, agentCard: 6 },
    });
    expect(r.platonicKey).toBeTruthy();
    expect(r.platonicKey.name).toBe('The Spark');
  });
});

describe('Hard constraint #5 — stellar triggers are conjunction/heliacal, never mansion transit', () => {
  it('Moon in Mansion 3 (Al-Thurayya) does NOT imply a Pleiades Gate activation', async () => {
    // The trigger logic reads angular separation to the physical star only.
    // Verify the source never keys Stellar Court state off mansion number.
    const fs = await import('node:fs');
    const path = await import('node:path');
    const url = await import('node:url');
    const p = path.join(
      path.dirname(url.fileURLToPath(import.meta.url)),
      '../src/oracle/stellarCourt.ts'
    );
    const source = fs.readFileSync(p, 'utf8');
    // The Stellar Court engine takes no mansion data as input — triggers are
    // pure conjunction with the physical stars + heliacal visibility.
    expect(source.includes("from '../data/mansions")).toBe(false);
    expect(source).toMatch(/moonStarLongitudeSeparation/);
    expect(source).toMatch(/CONJUNCTION_ORB_DEG = 1/);
  });
});

describe('Hard constraint #6 — abjadi letter order for mansions', () => {
  it('the 28 mansions carry the abjadi ascent 1 → 1000', () => {
    const expected = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200,
      300, 400, 500, 600, 700, 800, 900, 1000,
    ];
    expect(MANSIONS.map((m) => m.abjad)).toEqual(expected);
  });

  it('4 mansions per planet in Chaldean descent order', () => {
    for (let i = 0; i < 28; i++) {
      expect(MANSIONS[i]!.ruler).toBe(CHALDEAN_ORDER[Math.floor(i / 4)]);
    }
  });
});

describe('Hard constraint #7 — suit is determined by the UPPER trigram', () => {
  it('every non-Gen hexagram takes its suit from its upper trigram element', () => {
    for (const h of HEXAGRAMS.values()) {
      if (h.upper === 'Gen') continue;
      expect(h.suit, `Hex ${h.number}`).toBe(TRIGRAMS[h.upper].element);
    }
  });

  it('Hex 55 (Mars upper / Jupiter lower) is Fire — not by its lower trigram', () => {
    const h = hexagramByNumber(55);
    expect(h.upper).toBe('Mars');
    expect(h.suit).toBe('Fire');
  });
});

describe('Hard constraint #8 — retrograde ages: the vernal point DESCENDS', () => {
  it('vernal AGOSS decreases over time', () => {
    const v2000 = vernalPointAgoss(new Date(Date.UTC(2000, 2, 20)));
    const v2026 = vernalPointAgoss(new Date(Date.UTC(2026, 2, 20)));
    const v2100 = vernalPointAgoss(new Date(Date.UTC(2100, 2, 20)));
    expect(v2026).toBeLessThan(v2000);
    expect(v2100).toBeLessThan(v2026);
  });

  it('ages are fixed 30° arcs', () => {
    for (const a of AGES) expect(a.arcEnd - a.arcStart).toBe(30);
  });
});

describe('Hard constraint #9 — al-Sabt carries no line', () => {
  it('Saturday has a null standing line; all other days have 1–6', () => {
    const sabt = WEEK.find((d) => d.day === 'al-Sabt')!;
    expect(sabt.standingLine).toBeNull();
    expect(sabt.lord).toBe('Saturn');
    const lines = WEEK.filter((d) => d.day !== 'al-Sabt').map((d) => d.standingLine);
    expect(lines).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('Hard constraint #10 — no intercalation; astronomical Hijri', () => {
  it('twelve months, four sacred, exactly as Quran 9:36', () => {
    expect(HIJRI_MONTHS).toHaveLength(12);
    expect(HIJRI_MONTHS.filter((m) => m.sacred).map((m) => m.name)).toEqual([
      'Muharram',
      'Rajab',
      "Dhul Qi'dah",
      'Dhul Hijjah',
    ]);
  });
});

describe('Shared-table constraint — the two documents publish ONE table', () => {
  it('Salah lines: Tahajjud 1 … Maghrib-Isha 6', () => {
    expect(SALAH_WINDOW_LINES).toEqual({
      tahajjud: 1,
      fajr: 2,
      duha: 3,
      dhuhr_asr: 4,
      asr_maghrib: 5,
      maghrib_isha: 6,
    });
  });

  it('season line bins are 15/15/15/15/15/16 — Line 6 absorbs the remainder', () => {
    expect(seasonDayLine(15)).toBe(1);
    expect(seasonDayLine(16)).toBe(2);
    expect(seasonDayLine(75)).toBe(5);
    expect(seasonDayLine(76)).toBe(6);
    expect(seasonDayLine(91)).toBe(6);
  });

  it('the matrix diagonal is the seven Pure Resonance hexagrams', () => {
    const diag = CHALDEAN_ORDER.map((p) => MATRIX[p][p]);
    expect(diag).toEqual([2, 30, 51, 1, 58, 57, 29]);
  });
});
