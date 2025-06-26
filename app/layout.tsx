// app/layout.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenAPI from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SplashScreen, Tabs } from 'expo-router';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { TabBarIcon } from '../components/TabBarIcon';

// Verhindere, dass Expo den Splash automatisch ausblendet
SplashScreenAPI.preventAutoHideAsync();

export default function RootLayout(): JSX.Element | null {

    const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const [ready, setReady] = useState(false);

    // Sobald die Fonts geladen sind, Splash ausblenden und Layout freigeben
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
    let appIsReady;
    if (!appIsReady) {
        // noch im Splash, also nix rendern
        return null;
    }

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
            </Tabs>
        </ThemedView>
    );
}
