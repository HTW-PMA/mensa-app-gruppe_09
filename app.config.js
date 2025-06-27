// app.config.js
import 'dotenv/config';

// Dynamische Expo-Konfiguration, um .env-Werte in extra zu injizieren
export default ({ config }) => ({
    ...config,
    expo: {
        ...config.expo,
        // Linking-Schema für Deep-Links
        scheme: 'foodloop',
        sdkVersion: '51.0.0',
        name: 'Foodloop Mensa-App',
        slug: 'mensa-app',
        version: '1.0.0',
        platforms: ['ios', 'android', 'web'],
        extra: {
            // Uppercase-Variante für Konsistenz
            MENSA_API_KEY: process.env.MENSA_API_KEY,
            // Lowercase-Variante, wie in deinem Code genutzt
            mensaApiKey: process.env.MENSA_API_KEY
        },
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
        },
        // … weitere Expo-Konfigurationen (icon, assetBundlePatterns, etc.) …
    }
});
