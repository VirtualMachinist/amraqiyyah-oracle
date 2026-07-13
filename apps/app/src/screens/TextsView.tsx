/**
 * The Texts pillar — read the Quran and the Zabur (Psalms) directly, and land
 * exactly where a reading points. Arabic is shown first (the source), the
 * translation beneath. A jumped-to verse is haloed in gold.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
import {
  QURAN_SURAHS,
  PSALM_COUNT,
  surahMeta,
  surahVerses,
  juz as getJuz,
  hizb as getHizb,
  psalm as getPsalm,
  type QuranVerse,
} from '../texts';

/** What a reading (or the index) asks the Texts pillar to open. */
export type TextTarget =
  | { book: 'quran'; kind: 'surah'; n: number; verse?: number }
  | { book: 'quran'; kind: 'juz'; n: number }
  | { book: 'quran'; kind: 'hizb'; n: number }
  | { book: 'zabur'; kind: 'psalm'; n: number; verse?: number };

type Nav =
  | { screen: 'index' }
  | { screen: 'reader'; target: TextTarget };

export function TextsView({
  target,
  onConsumeTarget,
}: {
  target: TextTarget | null;
  onConsumeTarget: () => void;
}) {
  const [book, setBook] = useState<'quran' | 'zabur'>('quran');
  const [nav, setNav] = useState<Nav>({ screen: 'index' });

  // A reading handed us a destination — honor it.
  useEffect(() => {
    if (target) {
      setBook(target.book);
      setNav({ screen: 'reader', target });
      onConsumeTarget();
    }
  }, [target]);

  return (
    <View style={styles.root}>
      {nav.screen === 'index' ? (
        <>
          <View style={styles.segment}>
            {(['quran', 'zabur'] as const).map((b) => (
              <Pressable
                key={b}
                onPress={() => setBook(b)}
                style={[styles.segBtn, book === b && styles.segBtnActive]}
              >
                <Text style={[styles.segText, book === b && styles.segTextActive]}>
                  {b === 'quran' ? "Qur'ān" : 'Zabūr · Psalms'}
                </Text>
              </Pressable>
            ))}
          </View>
          {book === 'quran' ? (
            <QuranIndex onOpen={(t) => setNav({ screen: 'reader', target: t })} />
          ) : (
            <ZaburIndex onOpen={(t) => setNav({ screen: 'reader', target: t })} />
          )}
        </>
      ) : (
        <Reader nav={nav.target} onBack={() => setNav({ screen: 'index' })} />
      )}
    </View>
  );
}

// ---------------------------------------------------------------- indexes

function QuranIndex({ onOpen }: { onOpen: (t: TextTarget) => void }) {
  return (
    <FlatList
      data={QURAN_SURAHS}
      keyExtractor={(s) => String(s.n)}
      contentContainerStyle={{ paddingBottom: 48 }}
      renderItem={({ item }) => (
        <Pressable style={styles.indexRow} onPress={() => onOpen({ book: 'quran', kind: 'surah', n: item.n })}>
          <View style={styles.numMedallion}>
            <Text style={styles.numMedallionText}>{item.n}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.indexTitle}>
              {item.en} <Text style={styles.indexTr}>· {item.tr}</Text>
            </Text>
            <Text style={styles.indexSub}>{item.ayahs} āyāt</Text>
          </View>
          <Text style={styles.indexArabic}>{item.ar}</Text>
        </Pressable>
      )}
    />
  );
}

function ZaburIndex({ onOpen }: { onOpen: (t: TextTarget) => void }) {
  const psalms = useMemo(() => Array.from({ length: PSALM_COUNT }, (_, i) => i + 1), []);
  return (
    <FlatList
      data={psalms}
      keyExtractor={(n) => String(n)}
      numColumns={4}
      columnWrapperStyle={{ gap: 10, paddingHorizontal: 16 }}
      contentContainerStyle={{ paddingBottom: 48, gap: 10, paddingTop: 4 }}
      ListHeaderComponent={
        <Text style={styles.zaburHint}>The 150 mizmār — Van Dyck Arabic with the King James rendering.</Text>
      }
      renderItem={({ item }) => (
        <Pressable style={styles.psalmChip} onPress={() => onOpen({ book: 'zabur', kind: 'psalm', n: item })}>
          <Text style={styles.psalmChipText}>{item}</Text>
        </Pressable>
      )}
    />
  );
}

// ----------------------------------------------------------------- reader

interface Row {
  key: string;
  arabic: string;
  english: string;
  label: string; // e.g. "2:255" or "81:3"
  highlight: boolean;
  surahHeader?: { ar: string; en: string; tr: string };
}

function Reader({ nav, onBack }: { nav: TextTarget; onBack: () => void }) {
  const listRef = useRef<FlatList<Row>>(null);
  const { title, subtitle, rows, targetIndex } = useMemo(() => buildRows(nav), [nav]);

  useEffect(() => {
    if (targetIndex != null && targetIndex > 0) {
      const t = setTimeout(() => {
        listRef.current?.scrollToIndex({ index: targetIndex, animated: true, viewPosition: 0.3 });
      }, 250);
      return () => clearTimeout(t);
    }
  }, [targetIndex]);

  return (
    <FlatList
      ref={listRef}
      data={rows}
      keyExtractor={(r) => r.key}
      contentContainerStyle={{ paddingBottom: 64 }}
      onScrollToIndexFailed={() => {}}
      ListHeaderComponent={
        <View style={styles.readerHeader}>
          <Pressable onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Texts</Text>
          </Pressable>
          <Text style={styles.readerTitle}>{title}</Text>
          {subtitle ? <Text style={styles.readerSub}>{subtitle}</Text> : null}
        </View>
      }
      renderItem={({ item }) => (
        <View>
          {item.surahHeader && (
            <View style={styles.surahDivider}>
              <Text style={styles.surahDividerAr}>{item.surahHeader.ar}</Text>
              <Text style={styles.surahDividerEn}>
                {item.surahHeader.en} · {item.surahHeader.tr}
              </Text>
            </View>
          )}
          <View style={[styles.verse, item.highlight && styles.verseHighlight]}>
            <View style={styles.verseHeadRow}>
              <View style={[styles.verseNum, item.highlight && styles.verseNumHi]}>
                <Text style={styles.verseNumText}>{item.label}</Text>
              </View>
            </View>
            <Text style={styles.arabic}>{item.arabic}</Text>
            <Text style={styles.english}>{item.english}</Text>
          </View>
        </View>
      )}
    />
  );
}

function buildRows(nav: TextTarget): {
  title: string;
  subtitle: string;
  rows: Row[];
  targetIndex: number | null;
} {
  if (nav.book === 'zabur') {
    const p = getPsalm(nav.n);
    const rows: Row[] =
      p?.verses.map((v) => ({
        key: `p${nav.n}:${v.v}`,
        arabic: v.ar,
        english: v.en,
        label: `${nav.n}:${v.v}`,
        highlight: nav.verse === v.v,
      })) ?? [];
    const targetIndex = nav.verse ? rows.findIndex((r) => r.highlight) : null;
    return {
      title: `Mizmār ${nav.n} · Psalm ${nav.n}`,
      subtitle: 'Van Dyck (Arabic) · King James (English)',
      rows,
      targetIndex: targetIndex != null && targetIndex >= 0 ? targetIndex : null,
    };
  }

  // Quran: surah / juz / hizb
  let verses: QuranVerse[] = [];
  let title = '';
  let subtitle = 'Uthmānī script · Yusuf Ali (1934)';
  let highlightVerse: { s: number; v: number } | null = null;

  if (nav.kind === 'surah') {
    const meta = surahMeta(nav.n);
    verses = surahVerses(nav.n);
    title = meta ? `${nav.n} · ${meta.en} — ${meta.tr}` : `Sūrah ${nav.n}`;
    if (nav.verse) highlightVerse = { s: nav.n, v: nav.verse };
  } else if (nav.kind === 'juz') {
    const j = getJuz(nav.n);
    verses = j?.verses ?? [];
    title = `Juzʾ ${nav.n}`;
    if (j) subtitle = `${j.division.startS}:${j.division.startV} → ${j.division.endS}:${j.division.endV} · Yusuf Ali`;
  } else {
    const h = getHizb(nav.n);
    verses = h?.verses ?? [];
    title = `Ḥizb ${nav.n}`;
    if (h) subtitle = `${h.division.startS}:${h.division.startV} → ${h.division.endS}:${h.division.endV} · Yusuf Ali`;
  }

  let lastSurah = -1;
  const showSurahHeaders = nav.kind !== 'surah';
  const rows: Row[] = verses.map((vv) => {
    const newSurah = showSurahHeaders && vv.s !== lastSurah;
    lastSurah = vv.s;
    const meta = newSurah ? surahMeta(vv.s) : undefined;
    return {
      key: `q${vv.s}:${vv.v}`,
      arabic: vv.ar,
      english: vv.en,
      label: `${vv.s}:${vv.v}`,
      highlight: !!highlightVerse && highlightVerse.s === vv.s && highlightVerse.v === vv.v,
      surahHeader: meta ? { ar: meta.ar, en: meta.en, tr: meta.tr } : undefined,
    };
  });
  const targetIndex = highlightVerse ? rows.findIndex((r) => r.highlight) : null;
  return { title, subtitle, rows, targetIndex: targetIndex != null && targetIndex >= 0 ? targetIndex : null };
}

// ------------------------------------------------------------------ styles

const styles = StyleSheet.create({
  root: { flex: 1 },
  segment: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  segBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: COLORS.panel, alignItems: 'center', borderWidth: 1, borderColor: COLORS.line },
  segBtnActive: { backgroundColor: COLORS.panelSoft, borderColor: COLORS.copper },
  segText: { color: COLORS.dim, fontWeight: '600' },
  segTextActive: { color: COLORS.copperLight },

  indexRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  numMedallion: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: COLORS.copper, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.panel },
  numMedallionText: { color: COLORS.gold, fontWeight: '700', fontSize: 13 },
  indexTitle: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  indexTr: { color: COLORS.dim, fontWeight: '400', fontSize: 13 },
  indexSub: { color: COLORS.dim, fontSize: 12, marginTop: 2 },
  indexArabic: { color: COLORS.lapisLight, fontSize: 20, writingDirection: 'rtl' },

  zaburHint: { color: COLORS.dim, fontSize: 12, paddingHorizontal: 16, paddingVertical: 10 },
  psalmChip: { flex: 1, aspectRatio: 1, borderRadius: 10, backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.line, alignItems: 'center', justifyContent: 'center' },
  psalmChipText: { color: COLORS.text, fontWeight: '600' },

  readerHeader: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  backBtn: { paddingVertical: 6 },
  backText: { color: COLORS.copperLight, fontSize: 14, fontWeight: '600' },
  readerTitle: { color: COLORS.gold, fontSize: 20, fontWeight: '700', marginTop: 4 },
  readerSub: { color: COLORS.dim, fontSize: 12, marginTop: 2 },

  surahDivider: { alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16 },
  surahDividerAr: { color: COLORS.lapisLight, fontSize: 24, writingDirection: 'rtl' },
  surahDividerEn: { color: COLORS.dim, fontSize: 12, marginTop: 4 },

  verse: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  verseHighlight: { backgroundColor: 'rgba(212,175,106,0.08)', borderLeftWidth: 2, borderLeftColor: COLORS.gold },
  verseHeadRow: { flexDirection: 'row', marginBottom: 8 },
  verseNum: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.panel },
  verseNumHi: { borderColor: COLORS.gold },
  verseNumText: { color: COLORS.gold, fontSize: 11, fontWeight: '700' },
  arabic: { color: COLORS.text, fontSize: 26, lineHeight: 48, writingDirection: 'rtl', textAlign: 'right' },
  english: { color: COLORS.dim, fontSize: 15, lineHeight: 23, marginTop: 10 },
});
