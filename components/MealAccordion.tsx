// components/MealAccordion.tsx
import React, { useState } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';
import { FavoriteButton } from './FavoriteButton';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface Meal {
    id: string;
    name: string;
    description?: string;
    price?: string;
}

interface Props {
    meal: Meal;
}

export const MealAccordion: React.FC<Props> = ({ meal }) => {
    const [open, setOpen] = useState(false);
    const bg = useThemeColor({}, 'card');
    const text = useThemeColor({}, 'text');

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
    };

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Pressable onPress={toggle} style={styles.header}>
                <View style={styles.titleRow}>
                    <Ionicons
                        name={open ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={text}
                    />
                    <ThemedText style={styles.title}>{meal.name}</ThemedText>
                </View>
                <FavoriteButton meal={meal} />
            </Pressable>
            {open && (
                <View style={styles.body}>
                    {meal.description ? (
                        <ThemedText style={styles.desc}>{meal.description}</ThemedText>
                    ) : null}
                    {meal.price ? (
                        <ThemedText style={styles.price}>{meal.price} €</ThemedText>
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        marginBottom: 12,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    body: {
        padding: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    desc: {
        marginBottom: 8,
    },
    price: {
        fontWeight: '500',
    },
});
