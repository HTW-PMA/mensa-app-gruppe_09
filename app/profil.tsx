// app/profil.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocationContext } from '../hooks/LocationContext';
import { t, translations, Language } from '../utils/i18n';
import { berlinCanteens } from '../utils/berlinCanteens';

export default function ProfilScreen(): JSX.Element {
    const { city, canteen, resetLocation } = useLocationContext();
    const [lang, setLang] = React.useState<Language>('de');
    // Hole die Mensa-Details aus der Liste, falls vorhanden
    const canteenDetails = canteen ? berlinCanteens.find(c => c.name === canteen.name) : undefined;

    return (
        <ScrollView contentContainerStyle={{ padding: 24 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>{lang === 'de' ? 'Lieblings-Mensa' : 'Favorite Canteen'}</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{t(lang, 'city')}: {city || '-'}</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{t(lang, 'canteen')}: {canteen ? canteen.name : '-'}</Text>
            {canteenDetails && (
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#555' }}>ID: {canteenDetails.id}</Text>
                    <Text style={{ fontSize: 14, color: '#555' }}>{lang === 'de' ? 'Adresse' : 'Address'}: {canteenDetails.address}</Text>
                </View>
            )}
            <View style={{ marginTop: 18, marginBottom: 8, backgroundColor: '#f6f6f6', borderRadius: 10, padding: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#145A32' }}>{lang === 'de' ? 'Öffnungszeiten' : 'Opening hours'}</Text>
                {canteen && canteen.openingHours && Array.isArray(canteen.openingHours) && canteen.openingHours.length > 0 ? (
                    canteen.openingHours.map((oh: any, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontWeight: '500', color: '#333' }}>{oh.day || oh.tag || '-'}</Text>
                            <Text style={{ color: '#555' }}>{oh.time || oh.zeit || '-'}</Text>
                        </View>
                    ))
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '500', color: '#333' }}>{lang === 'de' ? 'Mo. – Fr.' : 'Mon – Fri'}</Text>
                        <Text style={{ color: '#555' }}>07:45 – 14:30 {lang === 'de' ? 'Uhr' : 'a.m. – 2:30 p.m.'}</Text>
                    </View>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={resetLocation}>
                <Text style={styles.buttonText}>{t(lang, 'changeLocation')}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 32 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>{t(lang, 'language')}:</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                        style={[styles.langBtn, lang === 'de' && styles.langBtnActive]}
                        onPress={() => setLang('de')}
                    >
                        <Text style={{ color: lang === 'de' ? '#fff' : '#145A32' }}>{t(lang, 'german')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
                        onPress={() => setLang('en')}
                    >
                        <Text style={{ color: lang === 'en' ? '#fff' : '#145A32' }}>{t(lang, 'english')}</Text>
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
