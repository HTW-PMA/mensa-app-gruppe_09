// utils/api.ts
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { Meal } from '../components/MealAccordion';

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

// 1) Basis-URL und Key aus Expo-Constants (app.config.js / app.json)
const API_BASE = 'https://mensa.gregorflachs.de/api/v1';
const KEY = Constants.manifest?.extra?.MENSA_API_KEY as string;
if (!KEY) {
    throw new Error('Missing MENSA_API_KEY in Constants.manifest.extra');
}

// 2) Axios-Instanz mit Header-Vorbelegung
const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'X-API-KEY': KEY
    }
});

// 3) Echte Fetch-Funktionen
export async function fetchTodayMenu(canteenId: string): Promise<TodayResponse> {
    // Optional: Mit Datum filtern, je nach API-Support
    const today = new Date().toISOString().slice(0, 10);
    const res = await api.get<TodayResponse>('/menue', {
        params: { canteenId, date: today }
    });
    return res.data;
}

export async function fetchWeeklySchedule(canteenId: string): Promise<WeeklyResponse> {
    const res = await api.get<WeeklyResponse>('/menue', {
        params: { canteenId }
    });
    return res.data;
}

// 4) Hooks, die die echten Endpunkte nutzen
export function useFetchTodayMenu(canteenId: string) {
    const [data, setData] = useState<TodayResponse>({ meals: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Optional: Demo-Daten für Web
            setData({ meals: [] });
            setLoading(false);
            return;
        }
        fetchTodayMenu(canteenId)
            .then((d) => setData(d))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [canteenId]);

    return { data, loading, error };
}

export function useFetchWeeklySchedule(canteenId: string) {
    const [data, setData] = useState<WeeklyResponse>({ days: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Optional: Demo-Daten für Web
            setData({ days: [] });
            setLoading(false);
            return;
        }
        fetchWeeklySchedule(canteenId)
            .then((d) => setData(d))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [canteenId]);

    return { data, loading, error };
}
