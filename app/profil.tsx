// app/profil.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocationContext } from '../hooks/LocationContext';

export default function ProfilScreen(): JSX.Element {
    const { city, canteen, resetLocation } = useLocationContext();
    return (
        <ScrollView contentContainerStyle={{ padding: 24 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Profil</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Stadt: {city || '-'}</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Mensa: {canteen ? canteen.name : '-'}</Text>
            <TouchableOpacity style={styles.button} onPress={resetLocation}>
                <Text style={styles.buttonText}>Stadt/Mensa ändern</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    heading: { fontSize: 24, fontWeight: '700' },
    button: {
        marginTop: 24,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
