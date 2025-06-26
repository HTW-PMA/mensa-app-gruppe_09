// hooks/useFavorites.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../components/MealAccordion';

const STORAGE_KEY = '@foodloop:favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Meal[]>([]);

    // Beim Mounten aus AsyncStorage laden
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((json) => {
                if (json) setFavorites(JSON.parse(json));
            })
            .catch(console.error);
    }, []);

    // Änderungen speichern
    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(
            console.error
        );
    }, [favorites]);

    const addFavorite = (meal: Meal) => {
        setFavorites((prev) => [...prev, meal]);
    };

    const removeFavorite = (id: string) => {
        setFavorites((prev) => prev.filter((m) => m.id !== id));
    };

    return { favorites, addFavorite, removeFavorite };
}
