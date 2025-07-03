// app/favorites.tsx
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteButton } from '../components/FavoriteButton';

export default function FavoritesScreen() {
    const { favorites } = useFavorites();

    if (!favorites.length) {
        return <Text style={styles.empty}>Keine Favoriten gesetzt.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Deine Favoriten</Text>
            {favorites.map((meal) => (
                <View key={meal.id} style={styles.card}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{meal.name}</Text>
                        {meal.description && <Text style={styles.desc}>{meal.description}</Text>}
                        {meal.prices && Array.isArray(meal.prices) && meal.prices.length > 0 && (
                            <Text style={styles.price}>
                                Preise: {meal.prices.map((p: any) => `${p.type}: ${p.price}€`).join(', ')}
                            </Text>
                        )}
                    </View>
                    <FavoriteButton meal={meal} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 18,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    desc: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    empty: {
        textAlign: 'center',
        marginTop: 32,
        fontSize: 16,
        color: '#888',
    },
});
