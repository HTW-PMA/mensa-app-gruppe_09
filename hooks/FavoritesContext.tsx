import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../components/MealAccordion';

const STORAGE_KEY = '@foodloop:favorites';

interface FavoritesContextType {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setFavorites(JSON.parse(json));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(console.error);
  }, [favorites]);

  const addFavorite = (meal: Meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === meal.id)) return prev;
      return [...prev, meal];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  return ctx;
}
