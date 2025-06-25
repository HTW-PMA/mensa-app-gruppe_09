// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }   from '@react-navigation/stack';
import { ProfileProvider }         from './context/ProfileContext';
import ProfileScreen               from './screens/ProfileScreen';
import { registerRootComponent } from 'expo';
const Stack = createStackNavigator();
// App.tsx


registerRootComponent(App);
export default function App() {
    return (
        <ProfileProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Profile">
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    {/* weitere Screens hier */}
                </Stack.Navigator>
            </NavigationContainer>
        </ProfileProvider>
    );
}
