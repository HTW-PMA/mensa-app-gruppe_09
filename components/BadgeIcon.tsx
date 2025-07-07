import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

// Map badge IDs to image assets
const badgeIcons: Record<string, any> = {
  vegan: require('../assets/images/vegan.jpg'), // Jetzt korrektes veganes Badge-Bild
  bio: require('../assets/images/bio.png'),
  co2green: require('../assets/images/co2green.png'),
  co2orange: require('../assets/images/co2orange.png'),
  co2red: require('../assets/images/co2red.png'),
};

export function BadgeIcon({ badge, size = 22 }: { badge: string; size?: number }) {
  const icon = badgeIcons[badge];
  if (!icon) return null;
  return (
    <Image source={icon} style={{ width: size, height: size, marginRight: 4 }} resizeMode="contain" />
  );
}
