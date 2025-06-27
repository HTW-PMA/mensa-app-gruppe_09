

// 1) dotenv laden, damit process.env.MENSA_API_KEY verfügbar ist
require('dotenv').config();

// 2) axios importieren
const axios = require('axios');

// 3) Hier erzeugst du dein "api"-Objekt (keine Klasse, sondern eine Instanz)
const api = axios.create({
    baseURL: 'https://mensa.gregorflachs.de/api/v1',
    headers: {
        'X-API-KEY': process.env.MENSA_API_KEY
    }
});

// 4) Exportiere deine Funktionen, die intern das api-Objekt nutzen
module.exports = {
    fetchCanteens: () =>
        api.get('/canteen', { params: { clickandcollect: false } })
            .then(res => res.data),

    fetchMeals: () =>
        api.get('/meal')
            .then(res => res.data),

    fetchMenu: (canteenId) =>
        api.get('/menue', { params: { canteenId } })
            .then(res => res.data)
};
