import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { LievTheme } from '@/constants/theme';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  highlight?: boolean;
};

export function LievCard({ children, style, highlight = false }: Props) {
  return (
    <View style={[styles.card, highlight && styles.highlight, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: LievTheme.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: LievTheme.border,
    shadowColor: '#0B3D91',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  highlight: {
    borderColor: LievTheme.accent,
    backgroundColor: LievTheme.accentLight,
  },
});
