// components/FavoriteButton.tsx
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meal } from './MealAccordion';
import { useFavorites } from '../hooks/useFavorites';

interface Props {
    meal: Meal;
}

export const FavoriteButton: React.FC<Props> = ({ meal }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFav = favorites.some((m) => m.id === meal.id);

    const toggle = () => {
        if (isFav) removeFavorite(meal.id);
        else addFavorite(meal);
    };

    return (
        <Pressable onPress={toggle} style={styles.button}>
            <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={20}
                color={isFav ? '#e74c3c' : '#888'}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 4,
    },
});
