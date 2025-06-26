// app/profil.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfilScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Dein Ernährungsprofil</Text>
            {/* … dein Profil-UI … */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    heading: { fontSize: 24, fontWeight: '700' },
});
