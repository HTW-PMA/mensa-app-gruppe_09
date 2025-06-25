// src/models/Favorites.ts
import { Meal } from './Meal';

export class Favorites {
    private items = new Map<string, Meal>();

    get all(): Meal[] {
        return Array.from(this.items.values());
    }

    add(meal: Meal): void {
        this.items.set(meal.id, meal);
    }

    remove(mealId: string): void {
        this.items.delete(mealId);
    }

    isFavorite(mealId: string): boolean {
        return this.items.has(mealId);
    }
}
