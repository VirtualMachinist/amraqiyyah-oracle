/**
 * Places — an offline city gazetteer (population ≥ 100k) carrying coordinates
 * AND timezone together, so choosing a place sets everything coherently. This
 * closes the class of bug where coordinates and timezone drift apart: location
 * is one source of truth for both the sun's position and the clock's angle.
 */
import citiesData from './cities.json';

export interface City {
  n: string; // name
  c: string; // country
  lat: number;
  lon: number;
  tz: string; // IANA timezone
  p: number; // population
  a?: string; // ascii search alias (accents stripped)
}

const CITIES = citiesData as City[]; // sorted by population, descending

/** Common English spellings → the gazetteer's names. */
const ALIASES: Record<string, string> = {
  mecca: 'makkah',
  madinah: 'medina',
  bombay: 'mumbai',
  calcutta: 'kolkata',
  peking: 'beijing',
  rangoon: 'yangon',
};

function norm(s: string): string {
  // strip combining diacritical marks (U+0300–U+036F) without a literal range
  return s
    .toLowerCase()
    .normalize('NFD')
    .split('')
    .filter((ch) => {
      const cp = ch.codePointAt(0) ?? 0;
      return cp < 0x300 || cp > 0x36f;
    })
    .join('')
    .trim();
}

/** Prefix matches first (both ranked by population), then substring matches. */
export function searchCities(query: string, limit = 8): City[] {
  const q0 = norm(query);
  if (!q0) return [];
  const q = ALIASES[q0] ?? q0;
  const starts: City[] = [];
  const contains: City[] = [];
  for (const c of CITIES) {
    const n = norm(c.n);
    const a = c.a ? norm(c.a) : '';
    if (n.startsWith(q) || a.startsWith(q)) {
      if (starts.length < limit) starts.push(c);
    } else if (contains.length < limit && (n.includes(q) || a.includes(q))) {
      contains.push(c);
    }
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

/** Largest city in a timezone (CITIES is population-sorted). */
export function cityForTz(tz: string): City | undefined {
  return CITIES.find((c) => c.tz === tz);
}

export function cityLabel(c: City): string {
  return `${c.n}, ${c.c}`;
}
