// testApi.js
require('dotenv').config();
const axios = require('axios');

// Axios-Client konfigurieren
const api = axios.create({
    baseURL: 'https://mensa.gregorflachs.de/api/v1',
    headers: { 'X-API-KEY': process.env.MENSA_KEY }
});

(async () => {
    try {
        // 1) Canteens abrufen
        const canteensRes = await api.get('/canteen', { params: { clickandcollect: false } });
        console.log('Canteens:', canteensRes.data);

        // 2) Alle Gerichte abrufen
        const mealsRes = await api.get('/meal');
        console.log('All Meals:', mealsRes.data);

        // 3) Heute filtern für eine bestimmte Mensa
        const today = new Date().toISOString().slice(0,10);
        const canteenId = canteensRes.data[0]?.id; // erste Mensa
        if (canteenId) {
            const todays = mealsRes.data.filter(m =>
                m.canteenId === canteenId && m.date.startsWith(today)
            );
            console.log(`Today's meals for canteen ${canteenId}:`, todays);
        } else {
            console.log('Keine Mensa gefunden.');
        }
    } catch (err) {
        console.error('Fehler:', err.response?.status, err.message);
    }
})();
