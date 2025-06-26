// components/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}

export const TabBarIcon: React.FC<Props> = ({ name, color }) => {
    return <Ionicons name={name} size={24} color={color} />;
};
