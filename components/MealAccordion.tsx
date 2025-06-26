// components/MealAccordion.tsx
import React, { useState } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Text,
} from 'react-native';

// Android Animation Enabler
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface Meal {
    id: string;
    name: string;
    description?: string;
    price?: number;
}

interface Props {
    meal: Meal;
}

export const MealAccordion: React.FC<Props> = ({ meal }) => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
    };

    return (
        <View style={styles.card}>
            <Pressable onPress={toggle} style={styles.header}>
                <Text style={styles.title}>{meal.name}</Text>
                <Text style={styles.indicator}>{open ? '−' : '+'}</Text>
            </Pressable>
            {open && (
                <View style={styles.body}>
                    {meal.description && <Text style={styles.text}>{meal.description}</Text>}
                    {meal.price != null && (
                        <Text style={[styles.text, styles.price]}>{meal.price.toFixed(2)} €</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    indicator: {
        fontSize: 18,
        fontWeight: '600',
    },
    body: {
        padding: 12,
        backgroundColor: '#fafafa',
    },
    text: {
        fontSize: 14,
        marginBottom: 8,
    },
    price: {
        fontWeight: '700',
    },
});
