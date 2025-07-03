import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@foodloop:location';

interface LocationContextType {
  city: string | null;
  canteen: any | null;
  setCity: (city: string) => void;
  setCanteen: (canteen: any) => void;
  resetLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string | null>(null);
  const [canteen, setCanteenState] = useState<any | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) {
          const { city, canteen } = JSON.parse(json);
          setCityState(city);
          setCanteenState(canteen);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ city, canteen })).catch(console.error);
  }, [city, canteen]);

  const setCity = (newCity: string) => {
    setCityState(newCity);
    setCanteenState(null); // reset canteen when city changes
  };
  const setCanteen = (newCanteen: any) => setCanteenState(newCanteen);
  const resetLocation = () => { setCityState(null); setCanteenState(null); };

  return (
    <LocationContext.Provider value={{ city, canteen, setCity, setCanteen, resetLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocationContext must be used within a LocationProvider');
  return ctx;
}
