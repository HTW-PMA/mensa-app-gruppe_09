// app/index.tsx
import React from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFetchTodayMenu } from '../utils/api';
import { MealAccordion } from '../components/MealAccordion';

export default function TodayScreen(): JSX.Element {
    const { data, loading, error } = useFetchTodayMenu();

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
        <ScrollView contentContainerStyle={styles.list}>
            {data.meals.length > 0 ? (
                data.meals.map((meal) => <MealAccordion key={meal.id} meal={meal} />)
            ) : (
                <Text style={styles.empty}>Heute keine Gerichte.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    list:   { padding: 16, paddingBottom: 32 },
    empty:  { textAlign: 'center', marginTop: 20 },
});
