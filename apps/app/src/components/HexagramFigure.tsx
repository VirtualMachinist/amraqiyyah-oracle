/**
 * HexagramFigure — the six-line figure with moving-line marks, shared by the
 * reading result and the ceremony. Lines render top (6) to bottom (1);
 * moving lines burn crimson.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Hexagram } from '@amraqiyyah/engine';
import { COLORS, FONTS } from '../theme';

export function HexagramFigure({
  hexagram,
  movingLines,
  title,
}: {
  hexagram: Hexagram;
  movingLines: number[];
  title: string;
}) {
  const rows = [5, 4, 3, 2, 1, 0].map((i) => ({
    index: i + 1,
    yang: hexagram.lines[i]!,
    moving: movingLines.includes(i + 1),
  }));
  return (
    <View style={styles.hexFigure}>
      <Text style={styles.dimSmall}>{title}</Text>
      <Text style={styles.hexTitle}>
        {hexagram.number} — {hexagram.name}
      </Text>
      {rows.map((r) => (
        <View key={r.index} style={styles.hexLineRow}>
          {r.yang ? (
            <View style={[styles.yangLine, r.moving && styles.movingLine]} />
          ) : (
            <View style={styles.yinRow}>
              <View style={[styles.yinLine, r.moving && styles.movingLine]} />
              <View style={styles.yinGap} />
              <View style={[styles.yinLine, r.moving && styles.movingLine]} />
            </View>
          )}
          {r.moving && <Text style={styles.movingMark}>●</Text>}
        </View>
      ))}
      <Text style={styles.dimSmall}>
        {hexagram.upper} over {hexagram.lower} · {hexagram.suit === 'Axial' ? 'Threshold/Axial' : `${hexagram.suit} suit`}
      </Text>
      <Text style={[styles.dimSmall, { color: COLORS.gold }]}>{hexagram.divineName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hexFigure: { backgroundColor: COLORS.panel, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.line, minWidth: 220, flexGrow: 1 },
  hexTitle: { color: COLORS.text, fontFamily: FONTS.displaySemi, fontSize: 16, marginBottom: 8 },
  hexLineRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 3, height: 12 },
  yangLine: { width: 120, height: 8, backgroundColor: COLORS.yang, borderRadius: 2 },
  yinRow: { flexDirection: 'row', width: 120 },
  yinLine: { flex: 1, height: 8, backgroundColor: COLORS.yin, borderRadius: 2 },
  yinGap: { width: 24 },
  movingLine: { backgroundColor: COLORS.crimson },
  movingMark: { color: COLORS.crimson, marginLeft: 8, fontSize: 10 },
  dimSmall: { color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 11, marginTop: 4 },
});
