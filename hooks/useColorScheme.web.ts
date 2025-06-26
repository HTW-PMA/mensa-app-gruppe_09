// hooks/useColorScheme.web.ts
import { useEffect, useState } from 'react';

export function useColorScheme(): 'light' | 'dark' {
    const query = '(prefers-color-scheme: dark)';
    const media = window.matchMedia(query);
    const [scheme, setScheme] = useState<'light' | 'dark'>(
        media.matches ? 'dark' : 'light'
    );

    useEffect(() => {
        const listener = (e: MediaQueryListEvent) => {
            setScheme(e.matches ? 'dark' : 'light');
        };
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [media]);

    return scheme;
}
