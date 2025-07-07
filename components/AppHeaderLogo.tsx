import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export function AppHeaderLogo() {
  return (
    <View style={styles.headerLogoBox}>
      <Image source={require('../assets/images/icon.png')} style={styles.headerLogo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerLogoBox: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#145A32', // Dunkelgrün
    zIndex: 30,
    height: 80, // Schmaler grüner Streifen (jetzt 30px)
    justifyContent: 'center',
  },
  headerLogo: {
    width: 100,
    height: 120,
    marginTop: -0, // Logo überlappt den Streifen nach unten, stärker für größere Wirkung
  },
});
