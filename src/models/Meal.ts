// src/models/Meal.ts
import { Preference } from './Profile';

export interface MealProps {
    id:       string;
    title:    string;
    calories: number;
    protein:  number;
    carbs:    number;
    fat:      number;
    tags?:    Preference[];
}

export class Meal {
    readonly id:       string;
    readonly title:    string;
    readonly calories: number;
    readonly protein:  number;
    readonly carbs:    number;
    readonly fat:      number;
    readonly tags:     Preference[];

    constructor(props: MealProps) {
        this.id       = props.id;
        this.title    = props.title;
        this.calories = props.calories;
        this.protein  = props.protein;
        this.carbs    = props.carbs;
        this.fat      = props.fat;
        this.tags     = props.tags ?? [];
    }
}
