// app/schedule.tsx
import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFetchWeeklySchedule } from '../utils/api';
import { ScheduleList } from '../components/ScheduleList';
import { useLocationContext } from '../hooks/LocationContext';

export default function ScheduleScreen(): JSX.Element {
    const { canteen } = useLocationContext();
    const { data, loading, error } = useFetchWeeklySchedule(canteen?.id);

    if (!canteen) {
        return (
            <View style={styles.center}>
                <Text>Bitte wähle eine Mensa.</Text>
            </View>
        );
    }
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text>Fehler beim Laden: {error}</Text>
            </View>
        );
    }

    return data.days.length > 0 ? (
        <ScheduleList days={data.days} />
    ) : (
        <View style={styles.center}>
            <Text>Keine Einträge im Wochenplan.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
