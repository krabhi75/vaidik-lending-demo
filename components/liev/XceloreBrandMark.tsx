import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { XceloreCopy, XceloreTheme } from '@/constants/xcelore-theme';

type Variant = 'hero' | 'footer' | 'compact';

type Props = {
  variant?: Variant;
  style?: ViewStyle;
};

export function XceloreBrandMark({ variant = 'hero', style }: Props) {
  if (variant === 'compact') {
    return (
      <View style={[styles.compact, style]}>
        <Image
          source={{ uri: XceloreCopy.logoUri }}
          style={styles.compactLogo}
          resizeMode="contain"
          accessibilityLabel="Xcelore logo"
        />
      </View>
    );
  }

  if (variant === 'footer') {
    return (
      <View style={[styles.footer, style]}>
        <Text style={styles.footerBuiltBy}>{XceloreCopy.builtBy}</Text>
        <Text style={styles.footerNote}>{XceloreCopy.interviewNote}</Text>
        <Text style={styles.footerLink}>xcelore.com</Text>
      </View>
    );
  }

  return (
    <View style={[styles.hero, style]}>
      <Image
        source={{ uri: XceloreCopy.logoUri }}
        style={styles.heroLogo}
        resizeMode="contain"
        accessibilityLabel="Xcelore logo"
      />
      <Text style={styles.tagline}>{XceloreCopy.tagline}</Text>
      <Text style={styles.heroLine}>{XceloreCopy.heroLine}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: 6,
  },
  heroLogo: {
    width: 140,
    height: 36,
  },
  tagline: {
    fontSize: 11,
    fontWeight: '600',
    color: XceloreTheme.textMutedOnDark,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  heroLine: {
    fontSize: 13,
    fontWeight: '700',
    color: XceloreTheme.accent,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 2,
    paddingTop: 4,
  },
  footerBuiltBy: {
    fontSize: 11,
    fontWeight: '700',
    color: XceloreTheme.textMuted,
    textAlign: 'center',
  },
  footerNote: {
    fontSize: 10,
    color: XceloreTheme.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerLink: {
    fontSize: 10,
    color: XceloreTheme.textMuted,
    textAlign: 'center',
  },
  compact: {
    alignItems: 'flex-start',
  },
  compactLogo: {
    width: 100,
    height: 26,
  },
});
