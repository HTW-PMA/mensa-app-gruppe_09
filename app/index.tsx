// app/index.tsx
import React, { useEffect } from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useFetchTodayMenu, useFetchBerlinCanteens, fetchAdditives, fetchBadges } from '../utils/api';
import { MealAccordion } from '../components/MealAccordion';
import { FavoriteButton } from '../components/FavoriteButton';
import { useLocationContext } from '../hooks/LocationContext';

export default function TodayScreen(): JSX.Element {
    const { canteen } = useLocationContext();
    const { data, loading, error } = useFetchTodayMenu(canteen?.id);
    const [selectedAdditives, setSelectedAdditives] = React.useState<string[]>([]);
    const [selectedBadges, setSelectedBadges] = React.useState<string[]>([]);
    const [allAdditives, setAllAdditives] = React.useState<any[]>([]);
    const [allBadges, setAllBadges] = React.useState<any[]>([]);

    // Fetch all additives and badges when a canteen is selected
    useEffect(() => {
        if (!canteen?.id) return;
        fetchAdditives().then(setAllAdditives).catch(() => setAllAdditives([]));
        fetchBadges().then(setAllBadges).catch(() => setAllBadges([]));
    }, [canteen?.id]);

    // Filtering logic
    const filteredMeals = React.useMemo(() => {
        if (!Array.isArray(data.meals)) return [];
        return data.meals.filter((meal: any) => {
            // Normalize additives and badges to array of IDs
            const mealAdditives = Array.isArray(meal.additives)
                ? meal.additives.map((a: any) => (typeof a === 'string' ? a : a.id || a.ID))
                : [];
            const mealBadges = Array.isArray(meal.badges)
                ? meal.badges.map((b: any) => (typeof b === 'string' ? b : b.id || b.ID))
                : [];
            // Additives: must contain all selectedAdditives
            if (selectedAdditives.length > 0 && !selectedAdditives.every(a => mealAdditives.includes(a))) {
                return false;
            }
            // Badges: must contain all selectedBadges
            if (selectedBadges.length > 0 && !selectedBadges.every(b => mealBadges.includes(b))) {
                return false;
            }
            return true;
        });
    }, [data.meals, selectedAdditives, selectedBadges]);

    useEffect(() => {
        if (canteen) {
            console.log('[TodayScreen] Selected canteen ID:', canteen.id);
        }
    }, [canteen]);
    useEffect(() => {
        if (canteen && data) {
            console.log('[TodayScreen] Menu data for canteen', canteen.id, ':', data);
        }
    }, [canteen, data]);

    if (loading)
        return (
            <View style={s.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    if (error)
        return (
            <View style={s.center}>
                <Text>Fehler: {error}</Text>
            </View>
        );
    if (!canteen) {
        return (
            <View style={s.center}>
                <Text>Bitte wähle eine Mensa.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={s.list}>
            {/* Filter controls */}
            {(allAdditives.length > 0 || allBadges.length > 0) && (
                <View style={{ marginBottom: 16 }}>
                    {allAdditives.length > 0 && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ fontWeight: 'bold' }}>Additive filtern:</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {allAdditives.map((add: any) => (
                                    <TouchableOpacity
                                        key={add.id || add.ID}
                                        style={{
                                            padding: 6,
                                            margin: 2,
                                            borderRadius: 6,
                                            backgroundColor: selectedAdditives.includes(add.id || add.ID) ? '#007AFF' : '#eee',
                                        }}
                                        onPress={() => setSelectedAdditives(sel => sel.includes(add.id || add.ID)
                                            ? sel.filter(a => a !== (add.id || add.ID))
                                            : [...sel, add.id || add.ID])}
                                    >
                                        <Text style={{ color: selectedAdditives.includes(add.id || add.ID) ? '#fff' : '#333' }}>{add.name || add.text || add.ID}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                    {allBadges.length > 0 && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ fontWeight: 'bold' }}>Badges filtern:</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {allBadges.map((badge: any) => (
                                    <TouchableOpacity
                                        key={badge.id || badge.ID}
                                        style={{
                                            padding: 6,
                                            margin: 2,
                                            borderRadius: 6,
                                            backgroundColor: selectedBadges.includes(badge.id || badge.ID) ? '#007AFF' : '#eee',
                                        }}
                                        onPress={() => setSelectedBadges(sel => sel.includes(badge.id || badge.ID)
                                            ? sel.filter(b => b !== (badge.id || badge.ID))
                                            : [...sel, badge.id || badge.ID])}
                                    >
                                        <Text style={{ color: selectedBadges.includes(badge.id || badge.ID) ? '#fff' : '#333' }}>{badge.name || badge.text || badge.ID}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            )}
            {/* Grouped and filtered menu */}
            {filteredMeals.length > 0 ? (
                Object.entries(
                    filteredMeals.reduce((acc: any, meal: any) => {
                        const cat = meal.category || 'Sonstiges';
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push(meal);
                        return acc;
                    }, {})
                ).map(([category, meals], idx) => (
                    <View key={category} style={{ marginBottom: 24 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{category}</Text>
                        {(meals as any[]).map((meal, idx) => (
                            <View key={meal.id || meal.ID || idx} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f8f8f8', borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{meal.name}</Text>
                                    {meal.prices && Array.isArray(meal.prices) && meal.prices.length > 0 && (
                                        <Text style={{ color: '#666', fontSize: 14 }}>
                                            Preise: {meal.prices.map((p: any) => `${p.type}: ${p.price}€`).join(', ')}
                                        </Text>
                                    )}
                                    {meal.co2Bilanz !== undefined && (
                                        <Text style={{ color: '#666', fontSize: 13 }}>CO₂: {meal.co2Bilanz} g</Text>
                                    )}
                                    {meal.waterBilanz !== undefined && (
                                        <Text style={{ color: '#666', fontSize: 13 }}>Wasser: {meal.waterBilanz} l</Text>
                                    )}
                                </View>
                                <FavoriteButton meal={meal} />
                            </View>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={s.empty}>
                    {(() => {
                        const today = new Date();
                        const day = today.getDay(); // 0 = Sunday, 6 = Saturday
                        if (day === 0 || day === 6) {
                            return 'Wochenende';
                        } else {
                            return 'Heute keine Gerichte.';
                        }
                    })()}
                </Text>
            )}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    center: { flex:1, justifyContent:'center', alignItems:'center', padding:16 },
    list:   { padding:16, paddingBottom:32 },
    empty:  { textAlign:'center', marginTop:20 },
});
