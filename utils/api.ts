// utils/api.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Meal } from '../components/MealAccordion';

const BASE_URL = 'https://api.foodloop.example.com';

interface TodayResponse {
    meals: Meal[];
}

interface DaySchedule {
    day: string;
    meals: Meal[];
}

interface WeeklyResponse {
    days: DaySchedule[];
}

interface UseFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

// Gemeinsamer Hook für alle Requests
function useFetch<T>(endpoint: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let canceled = false;

        axios
            .get<T>(`${BASE_URL}${endpoint}`)
            .then((res) => {
                if (!canceled) setData(res.data);
            })
            .catch((err) => {
                if (!canceled) setError(err);
            })
            .finally(() => {
                if (!canceled) setLoading(false);
            });

        return () => {
            canceled = true;
        };
    }, [endpoint]);

    return { data, isLoading, error };
}

/**
 * Holt das Speiseplan-Menü für heute.
 */
export function fetchTodayMenu() {
    return useFetch<TodayResponse>('/menu/today');
}

/**
 * Holt den kompletten Wochenplan.
 */
export function fetchWeeklySchedule() {
    return useFetch<WeeklyResponse>('/menu/week');
}

/**
 * Holt detaillierte Gerichte nach Mahlzeit-Typ.
 * @param mealType 'breakfast' | 'lunch' | 'dinner'
 */
export function fetchMealByType(mealType: string) {
    return useFetch<TodayResponse>(`/menu/${mealType}`);
}
