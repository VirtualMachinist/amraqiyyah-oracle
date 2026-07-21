/**
 * SolidView — the Hedronite glass-polyhedron visual language as pure SVG (no
 * WebGL), ported to react-native-svg: lapis-tinted translucent faces, copper
 * edges, glowing vertices. All 5 Platonic, 13 Archimedean, and 13 Catalan duals
 * via ../solids/geometry (verbatim from the Design System). Used by the deck
 * cards (Platonic Keys, Archimedean Bridges).
 */
import React, { useMemo } from 'react';
import Svg, { Circle, Defs, G, Path, RadialGradient, Stop } from 'react-native-svg';
import { getSolid, normalize, dot } from '../solids/geometry';

type Vec = number[];
let GID = 0;

export function SolidView({
  solid = 'tetrahedron',
  size = 120,
  mirror = false,
  yaw = 0.55,
  pitch = -0.42,
  tone = 'lapis',
}: {
  solid?: string;
  size?: number;
  mirror?: boolean;
  yaw?: number;
  pitch?: number;
  tone?: 'lapis' | 'gold';
}) {
  const { verts, faces } = useMemo(() => getSolid(solid) as { verts: Vec[]; faces: any[] }, [solid]);
  const gid = useMemo(() => `sv${++GID}`, []);

  const cy0 = Math.cos(yaw), sy = Math.sin(yaw), cx0 = Math.cos(pitch), sx = Math.sin(pitch);
  const rot = (v: Vec): Vec => {
    const x = v[0]! * cy0 + v[2]! * sy;
    const z = -v[0]! * sy + v[2]! * cy0;
    const y = v[1]!;
    const y2 = y * cx0 - z * sx;
    const z2 = y * sx + z * cx0;
    return [mirror ? -x : x, y2, z2];
  };
  const R = verts.map(rot);
  const C = size / 2, S = size * 0.4;
  const px = (p: Vec) => C + p[0]! * S;
  const py = (p: Vec) => C - p[1]! * S;
  const L = normalize([0.45, 0.75, 0.5]);

  const drawn = faces
    .map((f: any) => {
      const rn = normalize(rot(f.normal));
      const depth = rot(f.centroid)[2]!;
      const front = rn[2]! > 0;
      const lit = Math.max(0, dot(rn, L));
      const path = f.verts.map((i: number, k: number) => `${k ? 'L' : 'M'}${px(R[i]!).toFixed(2)} ${py(R[i]!).toFixed(2)}`).join(' ') + ' Z';
      return { path, front, depth, lit };
    })
    .sort((a: any, b: any) => a.depth - b.depth);

  const edgeCopper = tone === 'gold' ? '#d4af6a' : '#9d684e';

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id={`${gid}g`} cx="50%" cy="46%" r="52%">
          <Stop offset="0%" stopColor="#26418f" stopOpacity="0.5" />
          <Stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.14" />
          <Stop offset="100%" stopColor="#0b0b12" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx={C} cy={C * 0.96} r={S * 1.18} fill={`url(#${gid}g)`} />
      {drawn.filter((f: any) => !f.front).map((f: any, i: number) => (
        <Path key={`b${i}`} d={f.path} fill="#1e3a8a" fillOpacity={0.1} stroke="#5d7fd0" strokeOpacity={0.22} strokeWidth={size * 0.004} />
      ))}
      {drawn.filter((f: any) => f.front).map((f: any, i: number) => (
        <Path key={`f${i}`} d={f.path} fill="#33468c" fillOpacity={Number((0.12 + 0.22 * f.lit).toFixed(3))} stroke={edgeCopper} strokeOpacity={0.9} strokeWidth={size * 0.008} strokeLinejoin="round" />
      ))}
      {R.map((p: Vec, i: number) => (p[2]! > 0.15 ? (
        <G key={`v${i}`}>
          <Circle cx={px(p)} cy={py(p)} r={size * 0.016} fill="#5d7fd0" fillOpacity={0.35} />
          <Circle cx={px(p)} cy={py(p)} r={size * 0.007} fill="#aebfe8" />
        </G>
      ) : null))}
    </Svg>
  );
}
