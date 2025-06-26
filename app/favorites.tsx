// app/favorites.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import { MealAccordion } from '../components/MealAccordion';

export default function FavoritesScreen() {
    const { favorites } = useFavorites();

    return (
        favorites.length
            ? <ScrollView contentContainerStyle={{ padding: 16 }}>
                {favorites.map((meal) => <MealAccordion key={meal.id} meal={meal} />)}
            </ScrollView>
            : <Text style={{ padding: 16 }}>Keine Favoriten gesetzt.</Text>
    );
}
