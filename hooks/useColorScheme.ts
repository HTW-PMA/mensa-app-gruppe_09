// hooks/useColorScheme.ts
import { Appearance, ColorSchemeName } from 'react-native';
import { useEffect, useState } from 'react';

export function useColorScheme(): NonNullable<ColorSchemeName> {
    const [scheme, setScheme] = useState<NonNullable<ColorSchemeName>>(
        Appearance.getColorScheme() ?? 'light'
    );

    useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            setScheme(colorScheme ?? 'light');
        });
        return () => sub.remove();
    }, []);

    return scheme;
}
