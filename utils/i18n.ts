// utils/i18n.ts
export type Language = 'de' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  de: {
    profile: 'Profil',
    city: 'Stadt',
    canteen: 'Mensa',
    changeLocation: 'Stadt/Mensa ändern',
    language: 'Sprache',
    german: 'Deutsch',
    english: 'Englisch',
  },
  en: {
    profile: 'Profile',
    city: 'City',
    canteen: 'Canteen',
    changeLocation: 'Change City/Canteen',
    language: 'Language',
    german: 'German',
    english: 'English',
  },
};

export function t(lang: Language, key: string): string {
  return translations[lang][key] || key;
}
