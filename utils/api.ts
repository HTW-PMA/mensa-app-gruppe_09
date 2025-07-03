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

// setze hier deine echte Port-Nummer falls nötig (API läuft z.B. auf 3000)
const HOST = Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'       // Android-Emulator
    : 'http://localhost:3000';     // iOS-Simulator oder Web

// For CORS workaround in development (web), use cors-anywhere proxy
const CORS_PROXY = Platform.OS === 'web' ? 'https://cors-anywhere.herokuapp.com/' : '';
const API_KEY  = Constants.expoConfig?.extra?.mensaApiKey as string;
const BASE_URL = 'https://mensa.gregorflachs.de/api/v1';
const CANTEEN_ID = '5f6b9c6c7c8a9e0017a5f3b7';

function getTodayDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// GET /canteen
export async function fetchCanteens(params: Record<string, string> = {}) {
    const url = `${BASE_URL}/canteen?${new URLSearchParams(params)}`;
    const res = await fetch(url, {
        headers: {
            'x-api-key': API_KEY,
            'accept': 'application/json',
        },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

// GET /meal
export async function fetchMeals(params: Record<string, string> = {}) {
    const url = `${BASE_URL}/meal?${new URLSearchParams(params)}`;
    const res = await fetch(url, {
        headers: {
            'x-api-key': API_KEY,
            'accept': 'application/json',
        },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

// GET /additive
export async function fetchAdditives() {
    const url = `${BASE_URL}/additive`;
    const res = await fetch(url, {
        headers: {
            'x-api-key': API_KEY,
            'accept': 'application/json',
        },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

// GET /badge
export async function fetchBadges() {
    const url = `${BASE_URL}/badge`;
    const res = await fetch(url, {
        headers: {
            'x-api-key': API_KEY,
            'accept': 'application/json',
        },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

// GET /menue
export async function fetchMenues(params: Record<string, string> = {}) {
    const url = `${BASE_URL}/menue?${new URLSearchParams(params)}`;
    const res = await fetch(url, {
        headers: {
            'x-api-key': API_KEY,
            'accept': 'application/json',
        },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

// Updated: fetch today's menu for a given canteen
export async function fetchTodayMenu(canteenId?: string): Promise<any> {
    if (!canteenId) return { meals: [] };
    const today = getTodayDateString();
    const menueResult = await fetchMenues({
        loadingtype: 'lazy',
        canteenId, // correct for /menue
        startdate: today,
        enddate: today,
    });
    // If result is an array, extract meal IDs and fetch meal objects
    if (Array.isArray(menueResult) && menueResult.length > 0) {
        const mealIds = menueResult[0].meals;
        if (mealIds && mealIds.length > 0) {
            // Fetch all meals (no date param), then filter by IDs
            const allMeals = await fetchMeals();
            const meals = allMeals.filter((meal: any) => {
                const mealId = meal.id || meal.ID;
                // Some APIs may have canteenId or canteen property on meal
                const mealCanteenId = meal.canteenId || meal.canteen || meal.CanteenID;
                return mealIds.includes(mealId) && (!mealCanteenId || mealCanteenId === canteenId);
            });
            return { meals };
        }
    }
    // If result is object with meals or empty
    if (menueResult.meals) return { meals: menueResult.meals };
    return { meals: [] };
}

/**
 * Demo-/Mock-Hook für das heutige Menü
 */
export function useFetchTodayMenu(canteenId?: string) {
    const [data, setData] = useState<TodayResponse>({ meals: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!canteenId) {
            setLoading(false);
            setData({ meals: [] });
            return;
        }
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchTodayMenu(canteenId);
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [canteenId]);

    return { data, loading, error };
}

/**
 * Fetches the weekly schedule for a given canteen by fetching each weekday's menu individually.
 */
export function useFetchWeeklySchedule(canteenId?: string) {
    const [data, setData] = useState<WeeklyResponse>({ days: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!canteenId) {
            setData({ days: [] });
            setLoading(false);
            return;
        }
        async function fetchWeek() {
            setLoading(true);
            setError(null);
            try {
                // Get Monday to Friday of current week
                const today = new Date();
                const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
                // Find Monday
                const monday = new Date(today);
                monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
                const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
                const weekDays = Array.from({ length: 5 }, (_, i) => {
                    const d = new Date(monday);
                    d.setDate(monday.getDate() + i);
                    return d;
                });
                // Fetch each day's menu
                const results = await Promise.all(
                    weekDays.map(async (date, idx) => {
                        const yyyy = date.getFullYear();
                        const mm = String(date.getMonth() + 1).padStart(2, '0');
                        const dd = String(date.getDate()).padStart(2, '0');
                        const dateStr = `${yyyy}-${mm}-${dd}`;
                        try {
                            const menueResult = await fetchMenues({
                                loadingtype: 'lazy',
                                canteenId,
                                startdate: dateStr,
                                enddate: dateStr,
                            });
                            let meals: any[] = [];
                            if (Array.isArray(menueResult) && menueResult.length > 0) {
                                const mealIds = menueResult[0].meals;
                                if (mealIds && mealIds.length > 0) {
                                    const allMeals = await fetchMeals();
                                    meals = allMeals.filter((meal: any) => {
                                        const mealId = meal.id || meal.ID;
                                        const mealCanteenId = meal.canteenId || meal.canteen || meal.CanteenID;
                                        return mealIds.includes(mealId) && (!mealCanteenId || mealCanteenId === canteenId);
                                    });
                                }
                            } else if (menueResult.meals) {
                                meals = menueResult.meals;
                            }
                            return { day: days[idx], meals };
                        } catch (e) {
                            return { day: days[idx], meals: [] };
                        }
                    })
                );
                setData({ days: results });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchWeek();
    }, [canteenId]);

    return { data, loading, error };
}

// React hook to fetch all canteens in Berlin
export function useFetchBerlinCanteens() {
    const [canteens, setCanteens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const allCanteens = await fetchCanteens();
                console.log('[useFetchBerlinCanteens] All canteens (no filter):', allCanteens);
                // Filter for Berlin by address.city (case-insensitive)
                const berlinCanteens = allCanteens.filter(
                    (c: any) =>
                        c.address && c.address.city && c.address.city.toLowerCase() === 'berlin'
                );
                console.log('[useFetchBerlinCanteens] Filtered Berlin canteens:', berlinCanteens);
                setCanteens(berlinCanteens);
            } catch (err: any) {
                console.error('[useFetchBerlinCanteens] Error (all canteens):', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log('[useFetchBerlinCanteens] State update:', { canteens, loading, error });
    }, [canteens, loading, error]);

    return { canteens, loading, error };
}
