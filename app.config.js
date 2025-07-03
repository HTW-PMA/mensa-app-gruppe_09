import 'dotenv/config';

export default {
    expo: {
        "sdkVersion": "51.0.0",
        name: "Foodloop Mensa-App",
        slug: "mensa-app",
        version: "1.0.0",
        platforms: ["ios", "android", "web"],
        android: {
            package: 'com.foodloop.mensaApp',
            usesCleartextTraffic: true,   // = Erlaubt HTTP im eigenen Build
        },
        scheme: "mensaapp", // <-- Added scheme for deep linking
        extra: {
            mensaApiKey:process.env.MENSA_API_KEY,
            mensaBaseUrl:process.env.MENSA_API_BASE_URL,
            openaiApiKey: process.env.OPENAI_API_KEY, // <-- Added OpenAI key
        },
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        // … deine anderen expo-Konfigurationen (icon, assetBundlePatterns, etc.) …
    }
};
