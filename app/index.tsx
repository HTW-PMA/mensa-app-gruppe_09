// app/index.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { MealAccordion } from '../components/MealAccordion';
import { fetchTodayMenu } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function TodayScreen() {
    const { data, isLoading, error } = fetchTodayMenu();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <Text style={{ padding: 16 }}>Fehler beim Laden.</Text>;

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {data?.meals.length
                ? data.meals.map((meal) => <MealAccordion key={meal.id} meal={meal} />)
                : <Text>Heute keine Gerichte.</Text>
            }
        </ScrollView>
    );
}
