// app/schedule.tsx
import React from 'react';
import { Text } from 'react-native';
import { ScheduleList } from '../components/ScheduleList';
import { fetchWeeklySchedule } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function ScheduleScreen() {
    const { data, isLoading, error } = fetchWeeklySchedule();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <Text style={{ padding: 16 }}>Fehler beim Laden.</Text>;

    return data?.days
        ? <ScheduleList days={data.days} />
        : <Text style={{ padding: 16 }}>Keine Daten vorhanden.</Text>;
}
