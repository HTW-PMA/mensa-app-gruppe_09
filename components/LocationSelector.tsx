import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocationContext } from '../hooks/LocationContext';
import { useFetchBerlinCanteens, fetchCanteens } from '../utils/api';

export default function LocationSelector() {
  const { city, canteen, setCity, setCanteen } = useLocationContext();
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [canteens, setCanteens] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(city);

  useEffect(() => {
    fetchCanteens().then((all) => {
      const uniqueCities = Array.from(new Set(all.map((c: any) => c.address?.city).filter((x: any): x is string => typeof x === 'string')));
      setCities(uniqueCities);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchCanteens().then((all) => {
        setCanteens(all.filter((c: any) => c.address?.city === selectedCity));
      });
    } else {
      setCanteens([]);
    }
  }, [selectedCity]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Lade Städte…</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Stadt wählen</Text>
      <View style={styles.list}>
        {cities.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.item, selectedCity === c && styles.selected]}
            onPress={() => setSelectedCity(c)}
          >
            <Text style={styles.itemText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedCity && (
        <>
          <Text style={styles.heading}>Mensa wählen</Text>
          <View style={styles.list}>
            {canteens.map((ct) => (
              <TouchableOpacity
                key={ct.id}
                style={[styles.item, canteen && canteen.id === ct.id && styles.selected]}
                onPress={() => { setCity(selectedCity); setCanteen(ct); }}
              >
                <Text style={styles.itemText}>{ct.name} ({ct.address?.district || ct.address?.city})</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
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
