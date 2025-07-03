// app/menu.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFetchTodayMenu } from '../utils/api';
import { useFavorites } from '../hooks/useFavorites';
import { useLocationContext } from '../hooks/LocationContext';
import { getHealthScoreAnalysis } from '../utils/openai';
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function MenuScreen() {
    const { canteen } = useLocationContext();
    const { data: todayData, loading: loadingMenu } = useFetchTodayMenu(canteen?.id);
    const { favorites } = useFavorites();
    const [result, setResult] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const menuList = todayData.meals.map(m => `${m.name}${m.description ? ': ' + m.description : ''}`).join('\n');
            const favList = favorites.map(m => m.name).join(', ');
            const prompt = `von allen griechten heute an der mensa und meine favorite essen gib mir als ergebniss welche ist gesund zu essen und breschnen sie das kalorei und protine egal ob ich eine frau oder man.\n\nHeutige Gerichte:\n${menuList}\n\nMeine Favoriten: ${favList}`;
            const res = await getHealthScoreAnalysis(prompt);
            setResult(res);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Health Score Analyse</Text>
            <Text style={styles.sub}>Klicke auf den Button, um eine Gesundheitsanalyse der heutigen Gerichte und deiner Favoriten zu erhalten.</Text>
            <TouchableOpacity style={styles.button} onPress={handleAnalyze} disabled={loading || loadingMenu}>
                <Text style={styles.buttonText}>{loading ? 'Analysiere...' : 'Gesundheitsanalyse starten'}</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>Fehler: {error}</Text>}
            {result && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultHeading}>Ergebnis</Text>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    sub: {
        fontSize: 15,
        color: '#555',
        marginBottom: 18,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginBottom: 18,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: '#e74c3c',
        marginBottom: 10,
        textAlign: 'center',
    },
    resultBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 18,
        marginTop: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    resultHeading: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    resultText: {
        fontSize: 15,
        color: '#222',
        lineHeight: 22,
    },
});
