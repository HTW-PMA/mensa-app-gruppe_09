import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Mensen"
                options={{
                    title: 'Mensen',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="restaurant-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    title: 'Einstellungen',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}