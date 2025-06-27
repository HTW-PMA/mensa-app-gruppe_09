// app/index.tsx
import React from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useFetchTodayMenu } from '../utils/api';
import { MealAccordion } from '../components/MealAccordion';
import { useRouter } from 'expo-router';

// Feste Mensa-ID oder aus Kontext/Settings laden
const CANTEEN_ID = '655ff175136d3b580c970f80';

export default function TodayScreen(): JSX.Element {
    // Hook mit Mensa-ID aufrufen
    const { data, loading, error } = useFetchTodayMenu(CANTEEN_ID);
    const router = useRouter();

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text>Fehler beim Laden: {error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.list}>
                {data.meals.length > 0 ? (
                    data.meals.map((meal) => <MealAccordion key={meal.id} meal={meal} />)
                ) : (
                    <Text style={styles.empty}>Heute keine Gerichte.</Text>
                )}
            </ScrollView>
            <View style={styles.navButtons}>
                <Button title="Wochenplan" onPress={() => router.push('/schedule')} />
                <Button title="Favoriten" onPress={() => router.push('/favorites')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    list: {
        padding: 16,
        paddingBottom: 32
    },
    empty: {
        textAlign: 'center',
        marginTop: 20
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc'
    }
});
