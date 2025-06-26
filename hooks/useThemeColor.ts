// hooks/useThemeColor.ts
import Colors from '../utils/Colors';
import { ColorValue } from 'react-native';

type ColorName = keyof typeof Colors.light;

interface Props {
    light?: ColorValue;
    dark?: ColorValue;
}

/**
 * Wählt für den gegebenen Farb-Key die passende Farbe aus dem Theme
 */
export function useThemeColor(
    props: Props,
    colorName: ColorName
): ColorValue {
    const { light: lightProp, dark: darkProp } = props;
    const theme = Colors; // Colors hat light und dark Objekte
    const colorScheme =
        // Platform-abhängig importieren:
        // auf Web wird useColorScheme.web automatisch genutzt
        require('./useColorScheme').useColorScheme() as 'light' | 'dark';

    if (colorScheme === 'light' && lightProp !== undefined) {
        return lightProp;
    }
    if (colorScheme === 'dark' && darkProp !== undefined) {
        return darkProp;
    }
    return theme[colorScheme][colorName];
}
