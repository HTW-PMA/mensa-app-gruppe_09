// src/context/ProfileContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Profile, Preference, Goal } from '../models/Profile';

interface ProfileContextValue {
    profile: Profile;
    setName: (name: string) => void;
    togglePreference: (pref: Preference) => void;
    setGoal: (goal: Goal) => void;
}

// 1) Context anlegen (Default-Wert undefined, damit useContext fehlschlägt, wenn außen kein Provider ist)
const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

// 2) Provider-Komponente
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile] = useState<Profile>(() => new Profile());

    const setName = (name: string) => {
        profile.name = name;
        // Wenn du ein Re-Render brauchst, könntest du hier noch ein useState-Flag toggeln.
    };

    const togglePreference = (pref: Preference) => {
        profile.togglePreference(pref);
    };

    const setGoal = (goal: Goal) => {
        profile.goal = goal;
    };

    // **Hier wird der Provider-Wrapper geschlossen und zurückgegeben:**
    return (
        <ProfileContext.Provider value={{ profile, setName, togglePreference, setGoal }}>
            {children}
        </ProfileContext.Provider>
    );
}; // ← Achte auf dieses Semikolon und die geschlossene Klammer

// 3) Custom-Hook für leichteren Zugriff
export function useProfile() {
    const ctx = useContext(ProfileContext);
    if (!ctx) {
        throw new Error('useProfile muss innerhalb von ProfileProvider verwendet werden');
    }
    return ctx;
}
