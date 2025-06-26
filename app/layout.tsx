// app/layout.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenAPI from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { TabBarIcon } from '../components/TabBarIcon';

// Verhindere, dass Expo den Splash automatisch ausblendet
SplashScreenAPI.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const [ready, setReady] = useState(false);

    // Wenn die Fonts geladen sind, Splash ausblenden und weiter rendern
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreenAPI.hideAsync();
            setReady(true);
        }
    }, [fontsLoaded]);

    useEffect(() => {
        onLayoutRootView();
    }, [fontsLoaded, onLayoutRootView]);

    // Solange noch nicht bereit, nichts rendern (Splash bleibt sichtbar)
    if (!ready) {
        return null;
    }

    return (
        <ThemedView
            style={{ flex: 1 }}
            onLayout={onLayoutRootView} // einmalige Layout-Callback
        >
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Heute',
                        tabBarIcon: ({ color }) => <TabBarIcon name="today" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="schedule"
                    options={{
                        title: 'Wochenplan',
                        tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="favorites"
                    options={{
                        title: 'Favoriten',
                        tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
                    }}
                />
            </Tabs>
        </ThemedView>
    );
}
