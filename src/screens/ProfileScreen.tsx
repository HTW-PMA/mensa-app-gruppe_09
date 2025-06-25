// src/screens/ProfileScreen.tsx
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    StyleSheet,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';
import BottomNav from '../components/BottomNav';
import { Preference } from '../models/Profile';

const ProfileScreen: React.FC<any> = ({ navigation }) => {
    const { profile } = useProfile();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hallo {profile.name || 'Gast'}
            </Text>

            <ScrollView
                horizontal
                contentContainerStyle={styles.chipContainer}
            >
                {profile.preferences.map((pref: Preference) => (
                    <View key={pref} style={styles.chip}>
                        <Text>{pref}</Text>
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.subtitle}>Mensa-Übersicht</Text>
            <Text style={styles.text}>Hauptmensa</Text>
            <Button
                title="Wochenübersicht"
                onPress={() => navigation.navigate('MensaOverview')}
            />

            <BottomNav
                active="Profile"
                onNavigate={(screen) => navigation.navigate(screen)}
            />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    chipContainer: {
        marginVertical: 12,
    },
    chip: {
        marginRight: 8,
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    text: {
        marginBottom: 12,
    },
});
