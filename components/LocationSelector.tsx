import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocationContext } from '../hooks/LocationContext';
import { useFetchBerlinCanteens } from '../utils/api';


export default function LocationSelector() {
  const { setCity, canteen, setCanteen } = useLocationContext();
  const { canteens, loading, error } = useFetchBerlinCanteens();

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Lade Mensen…</Text></View>;
  if (error) return <View style={styles.center}><Text>Fehler beim Laden der Mensen: {error}</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Mensa wählen (nur Berlin)</Text>
      <View style={styles.list}>
        {canteens.map((ct) => (
          <TouchableOpacity
            key={ct.id}
            style={[styles.item, canteen && canteen.id === ct.id && styles.selected]}
            onPress={() => {
              setCity('Berlin');
              setCanteen(ct);
            }}
          >
            <Text style={styles.itemText}>{ct.name} ({ct.address?.district || ct.address?.city})</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  heading: { fontSize: 22, fontWeight: '700', marginVertical: 16 },
  list: { width: '100%', marginBottom: 16 },
  item: { padding: 14, borderRadius: 8, backgroundColor: '#eee', marginBottom: 8 },
  selected: { backgroundColor: '#145A32' }, // Dunkelgrün für Auswahl
  itemText: { fontSize: 16, color: '#222' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
