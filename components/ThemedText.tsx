// components/ThemedText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

type ThemeProps = {
    light?: string;
    dark?: string;
};

export const ThemedText: React.FC<TextProps & ThemeProps> = ({
                                                                 style,
                                                                 light,
                                                                 dark,
                                                                 ...props
                                                             }) => {
    const color = useThemeColor({ light, dark }, 'text');
    return <Text style={[{ color }, styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'SpaceMono-Regular',
    },
});
