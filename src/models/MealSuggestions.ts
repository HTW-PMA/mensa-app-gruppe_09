// src/models/MealSuggestions.ts
import { Meal } from './Meal';
import { Profile, Preference, Goal } from './Profile';

export class MealSuggestions {
    constructor(
        private profile: Profile,
        private allMeals: Meal[]
    ) {}

    get suggestions(): Meal[] {
        return this.allMeals.filter(meal => {
            // Präferenzen
            const { preferences, goal } = this.profile;
            if (preferences.length > 0) {
                if (!preferences.every(p => meal.tags.includes(p as Preference))) {
                    return false;
                }
            }
            // Kalorien-/Protein-Filter
            if (goal === Goal.WeightLoss && meal.calories > 600) {
                return false;
            }
            if (goal === Goal.MuscleGain && meal.protein < 20) {
                return false;
            }
            return true;
        });
    }
}
