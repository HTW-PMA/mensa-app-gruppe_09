import 'dotenv/config';

export default {
    expo: {
        "sdkVersion": "51.0.0",
        name: "Foodloop Mensa-App",
        slug: "mensa-app",
        version: "1.0.0",
        platforms: ["ios", "android", "web"],
        extra: {
            mensaApiKey: process.env.MENSA_API_KEY
        },
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        // … deine anderen expo-Konfigurationen (icon, assetBundlePatterns, etc.) …
    }
};
