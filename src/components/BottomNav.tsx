// src/components/BottomNav.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

interface BottomNavProps {
    active: string;
    onNavigate: (screen: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
    const tabs = ['Home', 'Profile', 'Settings'];

    return (
        <View style={styles.container}>
            {tabs.map(screen => {
                const isActive = screen === active;
                return (
                    <Pressable
                        key={screen}
                        onPress={() => onNavigate(screen)}
                        style={[styles.button, isActive && styles.buttonActive]}
                    >
                        <Text style={[styles.label, isActive && styles.labelActive]}>
                            {screen}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default BottomNav;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
        backgroundColor: '#fff',
    },
    button: {
        padding: 8,
    },
    buttonActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    label: {
        fontSize: 16,
        color: '#555',
    },
    labelActive: {
        fontWeight: 'bold',
        color: '#000',
    },
});
