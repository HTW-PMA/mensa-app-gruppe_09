// components/LoadingSpinner.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';

export const LoadingSpinner: React.FC = () => {
    const scheme = useColorScheme();
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color={scheme === 'dark' ? '#fff' : '#000'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
