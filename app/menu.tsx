// app/menu.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const mealTypes = [
    { key: 'breakfast', label: 'Frühstück' },
    { key: 'lunch',     label: 'Mittagessen' },
    { key: 'dinner',    label: 'Abendessen' },
];

export default function MenuScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Mahlzeiten</Text>
            {mealTypes.map(({ key, label }) => (
                <View key={key} style={styles.item}>
                    <Button
                        title={label}
                        onPress={() => {
                            // Hier später durch Navigation ersetzen
                            console.log('Ausgewählt:', key);
                        }}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
    },
    item: {
        marginVertical: 8,
    },
});
