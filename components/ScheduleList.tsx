// components/ScheduleList.tsx
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { MealAccordion } from './MealAccordion';
import { BadgeIcon } from './BadgeIcon';
import { MealImage } from './MealImage'; // Import MealImage component

export interface DaySchedule {
    day: string;       // z.B. "Montag"
    meals: Meal[];     // Liste von Gerichten
}

interface Props {
    days: DaySchedule[];
}

const WEEKDAYS = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
];

export const ScheduleList: React.FC<Props> = ({ days }) => {
    // State: which day is expanded/selected
    const [selectedDay, setSelectedDay] = React.useState<string | null>(null);

    // Map days to a lookup for quick access
    const dayMap = React.useMemo(() => {
        const map: Record<string, DaySchedule> = {};
        days.forEach(d => { map[d.day] = d; });
        return map;
    }, [days]);

    return (
        <View style={styles.container}>
            <ThemedText style={styles.heading}>Wochenplan</ThemedText>
            {WEEKDAYS.map(day => {
                const schedule = dayMap[day];
                const isSelected = selectedDay === day;
                return (
                    <TouchableOpacity
                        key={day}
                        style={[styles.card, isSelected && styles.cardSelected]}
                        onPress={() => setSelectedDay(isSelected ? null : day)}
                        activeOpacity={0.8}
                    >
                        <ThemedText style={styles.dayHeading}>{day}</ThemedText>
                        {isSelected && (
                            <View style={{ marginTop: 8 }}>
                                {schedule && schedule.meals.length > 0 ? (
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                                        {schedule.meals.map((meal, mealIdx) => (
                                            <View key={meal.id ? `${meal.id}` : `${meal.name}-${mealIdx}` } style={{ alignItems: 'center', margin: 8 }}>
                                                <MealImage name={meal.name} size={64} />
                                                <ThemedText style={{ fontWeight: '700', fontSize: 15, marginTop: 4, textAlign: 'center' }}>{meal.name}</ThemedText>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <ThemedText style={styles.mealText}>Keine Gerichte</ThemedText>
                                )}
                            </View>
                        )}
                        {!isSelected && schedule && schedule.meals.length > 0 && (
                            <ThemedText style={styles.mealText} numberOfLines={1}>
                                {schedule.meals[0].name}
                                {schedule.meals.length > 1 ? `, ...` : ''}
                            </ThemedText>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    cardSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#f6faff',
    },
    dayHeading: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    mealText: {
        fontSize: 16,
        color: '#222',
        marginBottom: 2,
    },
});

// Extend Meal type for badges and prices
interface Meal {
    id: string;
    name: string;
    description?: string;
    price?: number;
    prices?: { type: string; price: number }[];
    badges?: string[];
}
