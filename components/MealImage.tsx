import React from 'react';
import { Image } from 'react-native';

// Map meal keywords to available images (fallback to icon.png)
const foodImages: Record<string, any> = {
  kartoffel: require('../assets/images/Kartoffeln.png'),
  salat: require('../assets/images/Salatschale.jpg'),
  'american-dressing': require('../assets/images/American-Dressing.png'),
  'kräuter-dressing': require('../assets/images/Kräuter-Dressing.png'),
  'chinagemüse': require('../assets/images/Chinagemüse.png'),
  'fingermöhren': require('../assets/images/Fingermöhren.png'),
  'edamame': require('../assets/images/Edamame-Bratling an Tahin-dip mit frischen Kräutern.png'),
  'paella': require('../assets/images/Paella Spanischen Gemüse-Reis-pfane.png'),
  'parboiledreis': require('../assets/images/Parboiledreis.png'),
  'weizeneiweißbällchen': require('../assets/images/6 Weizeneiweißbällchen an Tomaten-Zucchini-Sauce.png'),
  vegan: require('../assets/images/vegan.jpg'), // Korrigiert: vegan.png gibt es nicht, vegan.jpg verwenden
  bio: require('../assets/images/bio.png'),
  co2green: require('../assets/images/co2green.png'),
  co2orange: require('../assets/images/co2orange.png'),
  co2red: require('../assets/images/co2red.png'),
  'müsli-joghurt': require('../assets/images/Müslijoghurt.png'),
  'vanillepudding': require('../assets/images/Vanillepudding.png'),
  'quark': require('../assets/images/Quark mit gerösteten Nüssen.png'),
  'veganer joghurt': require('../assets/images/Veganer Joghurt mit Waldbeeren.png'),
  'veganem joghurt': require('../assets/images/Veganer Joghurt mit Waldbeeren.png'),
  'vinaigrette': require('../assets/images/Sauce Vinaigrette.png'),
  'french-dressing': require('../assets/images/French-Dressing.png'),
  'gemüsecremesuppe': require('../assets/images/Gemüsecremesuppe.png'),
  'sauce & dip': require('../assets/images/Sauce & Dip Extra.png'),
  'pasta mit rucolasauce': require('../assets/images/Pasta mit Rucolasauce, getrockneten Tomaten und gerösteten Walnüssen.png'),
  'veganen schmelz': require('../assets/images/Veganer Schmelz gerieben.png'),
  'balkangemüse': require('../assets/images/Balkangemüse.png'),
  'basmatireis': require('../assets/images/Basmatireis.png'),
  'birnen-hafer-joghurt': require('../assets/images/Birnen-Hafer-Joghurt.png'),
  'blattspinat': require('../assets/images/Blattspinat in Sojacreme.png'),
  'kräutersuppe': require('../assets/images/Kräutersuppe mit Sojasahne und Tomaten.png'),
  'nougatpudding': require('../assets/images/Nougatpudding.png'),
  'pasta mit paprikasauce': require('../assets/images/Pasta mit Paprikasauce grüner Pepperoni und veganem Käseschmelz.png'),
  default: require('../assets/images/icon.png'),
};

export function MealImage({ name, size = 64 }: { name: string; size?: number }) {
  const lower = name.toLowerCase();
  // Try to match a keyword in the meal name to an image
  // Versuche auch Bindestriche und Leerzeichen zu ignorieren
  const normalized = lower.replace(/[- ]/g, '');
  let found = Object.keys(foodImages).find(key => lower.includes(key));
  if (!found) {
    found = Object.keys(foodImages).find(key => normalized.includes(key.replace(/[- ]/g, '')));
  }
  const img = found ? foodImages[found] : foodImages.default;
  return <Image source={img} style={{ width: size, height: size, borderRadius: 12, marginRight: 12 }} resizeMode="cover" />;
}
