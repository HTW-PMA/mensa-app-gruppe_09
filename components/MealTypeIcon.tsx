import React from 'react';
import { Image } from 'react-native';

// Map meal categories or types to icons
const mealIcons: Record<string, any> = {
  vegan: require('../assets/images/vegan.png'),
  bio: require('../assets/images/bio.png'),
  co2green: require('../assets/images/co2green.png'),
  co2orange: require('../assets/images/co2orange.png'),
  co2red: require('../assets/images/co2red.png'),
  default: require('../assets/images/icon.png'),
};

export function MealTypeIcon({ badges = [], size = 22 }: { badges?: string[]; size?: number }) {
  // Pick the first matching badge icon, fallback to default
  const found = badges.find(b => mealIcons[b]);
  const icon = found ? mealIcons[found] : mealIcons.default;
  return <Image source={icon} style={{ width: size, height: size, marginRight: 6 }} resizeMode="contain" />;
}
