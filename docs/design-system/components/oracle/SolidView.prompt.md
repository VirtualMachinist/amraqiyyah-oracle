# SolidView
The Hedronite glass-polyhedron language as crisp SVG — lapis-tinted translucent faces, copper edges, glowing vertices. Covers all 5 Platonic, 13 Archimedean, and 13 Catalan solids (exact vertex data; convex-hull faces).

```jsx
<SolidView solid="dodecahedron" size={180}/>
<SolidView solid="snub_cube" size={140} mirror/>  {/* left-handed chiral form */}
<SolidView solid="rhombic_triacontahedron" size={100} tone="gold"/>
```

Keys are snake_case: `tetrahedron`, `cube`, `octahedron`, `dodecahedron`, `icosahedron`; `truncated_tetrahedron`, `cuboctahedron`, `truncated_cube`, `truncated_octahedron`, `rhombicuboctahedron`, `truncated_cuboctahedron`, `snub_cube`, `icosidodecahedron`, `truncated_dodecahedron`, `truncated_icosahedron`, `rhombicosidodecahedron`, `truncated_icosidodecahedron`, `snub_dodecahedron`; and their Catalan duals (`triakis_tetrahedron`, `rhombic_dodecahedron`, … `pentagonal_hexecontahedron`).
