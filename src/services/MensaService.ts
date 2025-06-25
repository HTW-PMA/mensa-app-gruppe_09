// src/services/MensaService.ts
import fetch from 'node-fetch';       // funktioniert nach esModuleInterop
import { Meal } from '../models/Meal';
import { Preference } from '../models/Profile';

interface RawMeal {
    id:       string;
    title:    string;
    calories: number;
    protein:  number;
    carbs:    number;
    fat:      number;
    tags:     Preference[];            // direkt das Enum-Array
}

export class MensaService {
    constructor(private baseUrl: string) {}

    async fetchDailyMeals(mensaId: string, date: Date): Promise<Meal[]> {
        const dateStr = date.toISOString().split('T')[0];
        const resp = await fetch(`${this.baseUrl}/mensa/${mensaId}/${dateStr}`);
        if (!resp.ok) throw new Error(`API-Error ${resp.status}`);
        const data = (await resp.json()) as RawMeal[];

        return data.map(m => new Meal({
            id:       m.id,
            title:    m.title,
            calories: m.calories,
            protein:  m.protein,
            carbs:    m.carbs,
            fat:      m.fat,
            tags:     m.tags,                // keine extra Umwandlung nötig
        }));
    }
}
