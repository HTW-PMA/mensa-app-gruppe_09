// components/ThemedView.tsx
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

type ThemeProps = {
    light?: string;
    dark?: string;
};

export const ThemedView: React.FC<ViewProps & ThemeProps> = ({
                                                                 style,
                                                                 light,
                                                                 dark,
                                                                 ...props
                                                             }) => {
    const backgroundColor = useThemeColor({ light, dark }, 'background');
    return <View style={[{ backgroundColor }, styles.view, style]} {...props} />;
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
