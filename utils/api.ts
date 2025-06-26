// utils/api.ts
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import { Meal } from '../components/MealAccordion';
import Constants from 'expo-constants';
export interface TodayResponse {
    meals: Meal[];
}

export interface DaySchedule {
    day: string;
    meals: Meal[];
}
export interface WeeklyResponse {
    days: DaySchedule[];
}



const API_BASE = 'https://api.deine-mensa.de';
const KEY = Constants.manifest?.extra?.mensaApiKey as string;

export async function fetchTodayMenu(): Promise<TodayResponse> {
    const res = await axios.get<TodayResponse>(`${API_BASE}/menu/today`, {
        headers: { 'X-API-Key': KEY },
    });
    return res.data;
}

/**
 * Demo-/Mock-Hook für das heutige Menü
 */
export function useFetchTodayMenu() {
    const [data, setData] = useState<TodayResponse>({ meals: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Sofort Demo-Daten auf Web
            setData({
                meals: [
                    { id: '1', name: 'Web-Demo: Spaghetti', price: 4.2 },
                    { id: '2', name: 'Web-Demo: Salat',      price: 3.0 },
                ],
            });
            setLoading(false);
        } else {
            // Mock-Timeout auf Mobile
            setTimeout(() => {
                setData({
                    meals: [
                        { id: '1', name: 'Spaghetti Bolognese', description: 'mit Rinderhack', price: 4.5 },
                        { id: '2', name: 'Gemischter Salat',    price: 2.8 },
                        { id: '3', name: 'Curry mit Reis',      price: 3.9 },
                    ],
                });
                setLoading(false);
            }, 1000);
        }
    }, []);

    return { data, loading, error };
}

/**
 * Demo-/Mock-Hook für den Wochenplan
 */
export function useFetchWeeklySchedule() {
    const [data, setData] = useState<WeeklyResponse>({ days: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Demo-Daten Web
            setData({
                days: [
                    { day: 'Mo', meals: [{ id: 'm1', name: 'Web-Pasta', price: 3.5 }] },
                    { day: 'Di', meals: [{ id: 'm2', name: 'Web-Salat', price: 2.8 }] },
                ],
            });
            setLoading(false);
        } else {
            // Mock-Mobil
            setTimeout(() => {
                setData({
                    days: [
                        { day: 'Mo', meals: [{ id: 'm1', name: 'Spaghetti Bolognese', price: 4.5 }] },
                        { day: 'Di', meals: [{ id: 'm2', name: 'Vegetarisches Curry',  price: 3.9 }] },
                    ],
                });
                setLoading(false);
            }, 1000);
        }
    }, []);

    return { data, loading, error };
}
