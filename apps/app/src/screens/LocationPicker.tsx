/**
 * Location picker — choose a place by name (coordinates + timezone set together),
 * or tap "Use my location" to take the device's GPS coordinates and its own
 * reported timezone. Either way, the sun's position and the clock's angle stay
 * coherent — there is no way to leave them mismatched.
 */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../theme';
import { searchCities, cityLabel, type City } from '../geo';
import type { GeoLocation } from '@amraqiyyah/engine';

export function LocationPicker({
  label,
  onChange,
}: {
  label: string;
  onChange: (loc: GeoLocation, label: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [geo, setGeo] = useState<'idle' | 'locating' | 'error'>('idle');

  const results = query.trim() ? searchCities(query, 8) : [];

  const pick = (c: City) => {
    onChange({ lat: c.lat, lon: c.lon, tz: c.tz }, cityLabel(c));
    setQuery('');
    setOpen(false);
  };

  const useMyLocation = () => {
    const nav = typeof navigator !== 'undefined' ? navigator : undefined;
    if (!nav?.geolocation) {
      setGeo('error');
      return;
    }
    setGeo('locating');
    nav.geolocation.getCurrentPosition(
      (pos) => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        onChange(
          { lat: Number(pos.coords.latitude.toFixed(4)), lon: Number(pos.coords.longitude.toFixed(4)), tz },
          'My location'
        );
        setGeo('idle');
        setQuery('');
        setOpen(false);
      },
      () => setGeo('error'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.current} numberOfLines={1}>📍 {label}</Text>
        <Pressable style={styles.gpsBtn} onPress={useMyLocation}>
          <Text style={styles.gpsText}>{geo === 'locating' ? 'Locating…' : 'Use my location'}</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(t) => {
          setQuery(t);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search a city…"
        placeholderTextColor={COLORS.dim}
        autoCorrect={false}
      />
      {geo === 'error' && <Text style={styles.err}>Couldn’t read your location — search a city instead.</Text>}
      {open && results.length > 0 && (
        <View style={styles.dropdown}>
          {results.map((c, i) => (
            <Pressable key={`${c.n}-${c.c}-${i}`} style={styles.item} onPress={() => pick(c)}>
              <Text style={styles.itemCity} numberOfLines={1}>
                {c.n}
                <Text style={styles.itemCountry}> · {c.c}</Text>
              </Text>
              <Text style={styles.itemTz}>{c.tz}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  current: { flex: 1, color: COLORS.text, fontSize: 14, fontWeight: '600' },
  gpsBtn: { backgroundColor: COLORS.panelSoft, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: COLORS.copper },
  gpsText: { color: COLORS.copperLight, fontSize: 12, fontWeight: '600' },
  input: { backgroundColor: COLORS.panelSoft, color: COLORS.text, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9, marginTop: 8, borderWidth: 1, borderColor: COLORS.line },
  err: { color: COLORS.crimson, fontSize: 12, marginTop: 6 },
  dropdown: { backgroundColor: COLORS.panel, borderRadius: 10, borderWidth: 1, borderColor: COLORS.line, marginTop: 6, overflow: 'hidden' },
  item: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.line, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemCity: { color: COLORS.text, fontSize: 14, flex: 1 },
  itemCountry: { color: COLORS.dim, fontSize: 13 },
  itemTz: { color: COLORS.copperLight, fontSize: 10 },
});
