// src/models/Profile.ts

// 1) Exportiere die Enums
export enum Preference {
    Halal       = 'Halal',
    Vegan       = 'Vegan',
    LactoseFree = 'LactoseFree',
}

export enum Goal {
    MuscleGain  = 'MuscleGain',
    WeightLoss  = 'WeightLoss',
}

// 2) Interface für die rohen Profildaten (optional)
export interface ProfileData {
    name:        string;
    preferences: Preference[];
    goal?:       Goal;
}

// 3) Die Klasse selbst
export class Profile {
    private data: ProfileData;

    constructor(initial?: Partial<ProfileData>) {
        this.data = {
            name:        '',
            preferences: [],
            ...initial,
        };
    }

    get name(): string {
        return this.data.name;
    }
    set name(value: string) {
        this.data.name = value;
        // Hier könntest du ein Event feuern oder einen State-Manager updaten
    }

    get preferences(): Preference[] {
        // Gib eine Kopie zurück, damit außen nichts kaputt geht
        return [...this.data.preferences];
    }
    togglePreference(pref: Preference): void {
        const i = this.data.preferences.indexOf(pref);
        if (i >= 0) this.data.preferences.splice(i, 1);
        else        this.data.preferences.push(pref);
    }

    get goal(): Goal | undefined {
        return this.data.goal;
    }
    set goal(value: Goal | undefined) {
        this.data.goal = value;
    }
}
