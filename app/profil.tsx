// app/profil.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocationContext } from '../hooks/LocationContext';
import { t, translations, Language } from '../utils/i18n';

export default function ProfilScreen(): JSX.Element {
    const { city, canteen, resetLocation } = useLocationContext();
    const [lang, setLang] = React.useState<Language>('de');
    return (
        <ScrollView contentContainerStyle={{ padding: 24 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Lieblings-Mensa</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Stadt: {city || '-'}</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Mensa: {canteen ? canteen.name : '-'}</Text>
            <View style={{ marginTop: 18, marginBottom: 8, backgroundColor: '#f6f6f6', borderRadius: 10, padding: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#145A32' }}>Öffnungszeiten</Text>
                {canteen && canteen.openingHours && Array.isArray(canteen.openingHours) && canteen.openingHours.length > 0 ? (
                    canteen.openingHours.map((oh: any, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontWeight: '500', color: '#333' }}>{oh.day || oh.tag || '-'}</Text>
                            <Text style={{ color: '#555' }}>{oh.time || oh.zeit || '-'}</Text>
                        </View>
                    ))
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '500', color: '#333' }}>Mo. – Fr.</Text>
                        <Text style={{ color: '#555' }}>07:45 – 14:30 Uhr</Text>
                    </View>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={resetLocation}>
                <Text style={styles.buttonText}>Stadt/Mensa ändern</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 32 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Sprache:</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                        style={[styles.langBtn, lang === 'de' && styles.langBtnActive]}
                        onPress={() => setLang('de')}
                    >
                        <Text style={{ color: lang === 'de' ? '#fff' : '#145A32' }}>Deutsch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
                        onPress={() => setLang('en')}
                    >
                        <Text style={{ color: lang === 'en' ? '#fff' : '#145A32' }}>Englisch</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    heading: { fontSize: 24, fontWeight: '700' },
    button: {
        marginTop: 24,
        backgroundColor: '#145A32', // Dunkelgrün
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    langBtn: {
        borderWidth: 1,
        borderColor: '#145A32',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 18,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    langBtnActive: {
        backgroundColor: '#145A32',
        borderColor: '#145A32',
    },
});
