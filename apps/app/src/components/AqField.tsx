/**
 * The sacred-geometry field — a faithful RN port of the Design System's
 * `.aq-field`: a quiet, tiled lattice of concentric lapis circles that sits
 * behind the whole instrument, so nested cosmological wheels glimmer between
 * the panels. Absolutely positioned, non-interactive, very low opacity.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Pattern, Rect } from 'react-native-svg';
import { COLORS } from '../theme';

export function AqField() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id="aqField" width={320} height={320} patternUnits="userSpaceOnUse">
            <G fill="none" stroke={COLORS.lapis} strokeWidth={0.6} strokeOpacity={0.28}>
              <Circle cx={160} cy={160} r={40} />
              <Circle cx={160} cy={160} r={80} />
              <Circle cx={160} cy={160} r={120} />
              <Circle cx={160} cy={160} r={158} />
            </G>
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#aqField)" opacity={0.5} />
      </Svg>
    </View>
  );
}
