import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { LievCopy, LievTheme } from '@/constants/theme';

type Variant = 'header' | 'footer' | 'compact';

type Props = {
  variant?: Variant;
  style?: ViewStyle;
};

/** App branding: Vaidik Mobile App + Designed by Abhishek Kumar */
export function BrandMark({ variant = 'header', style }: Props) {
  if (variant === 'compact') {
    return (
      <View style={[styles.compact, style]}>
        <Text style={styles.compactName}>Vaidik</Text>
      </View>
    );
  }

  if (variant === 'footer') {
    return (
      <View style={[styles.footer, style]}>
        <Text style={styles.footerCompany}>{LievCopy.companyName}</Text>
        <Text style={styles.footerCredit}>{LievCopy.designedBy}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.header, style]}>
      <Text style={styles.companyName}>{LievCopy.companyName}</Text>
      <Text style={styles.designedBy}>{LievCopy.designedBy}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  companyName: {
    fontSize: 22,
    fontWeight: '800',
    color: LievTheme.primary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  designedBy: {
    fontSize: 12,
    fontWeight: '600',
    color: LievTheme.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 2,
  },
  footerCompany: {
    fontSize: 11,
    fontWeight: '700',
    color: LievTheme.textMuted,
    textAlign: 'center',
  },
  footerCredit: {
    fontSize: 10,
    color: LievTheme.textMuted,
    textAlign: 'center',
  },
  compact: {
    alignItems: 'flex-start',
  },
  compactName: {
    fontSize: 20,
    fontWeight: '900',
    color: LievTheme.primary,
    letterSpacing: 2,
  },
});
