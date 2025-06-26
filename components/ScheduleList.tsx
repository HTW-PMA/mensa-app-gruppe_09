// components/ScheduleList.tsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { MealAccordion, Meal } from './MealAccordion';

export interface DaySchedule {
    day: string;       // z.B. "Montag"
    meals: Meal[];     // Liste von Gerichten
}

interface Props {
    days: DaySchedule[];
}

export const ScheduleList: React.FC<Props> = ({ days }) => {
    return (
        <FlatList
            data={days}
            keyExtractor={(item) => item.day}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <View style={styles.dayBlock}>
                    <ThemedText style={styles.dayHeading}>{item.day}</ThemedText>
                    {item.meals.map((meal) => (
                        <MealAccordion key={meal.id} meal={meal} />
                    ))}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dayBlock: {
        marginBottom: 24,
    },
    dayHeading: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
});
