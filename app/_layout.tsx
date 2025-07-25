// app/_layout.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';

import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { TabBarIcon } from '../components/TabBarIcon';

// Prevent the native splash screen from auto-hiding before we're ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element | null {
    const colorScheme = useColorScheme();

    // Lade hier deine Custom Font(s)
    const [fontsLoaded] = useFonts({
        'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    // Tracke, ob wir bereit sind, die Splash zu verstecken und den Inhalt zu rendern
    const [isReady, setIsReady] = useState(false);

    // Wenn die Fonts geladen sind, SplashScreen hide und „ready“ setzen
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
            setIsReady(true);
        }
    }, [fontsLoaded]);

    // Rufe das erste Mal auf, sobald fontsLoaded sich ändert
    useEffect(() => {
        onLayoutRootView();
    }, [fontsLoaded, onLayoutRootView]);

    // Solange wir nicht bereit sind, rendern wir null (Splash bleibt sichtbar)
    if (!isReady) {
        return null;
    }

    // Endlich unser Tab-Layout
    return (
        <ThemedView style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
                <Tabs.Screen
                    name="menu"
                    options={{
                        title: 'Mahlzeiten',
                        tabBarIcon: ({ color }) => <TabBarIcon name="restaurant" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profil"
                    options={{
                        title: 'Profil',
                        tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
                    }}
                />
            </Tabs>
        </ThemedView>
    );
}
