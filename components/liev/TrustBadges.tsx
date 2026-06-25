import { StyleSheet, Text, View } from 'react-native';

import { LievTheme } from '@/constants/theme';

const BADGES = [
  { icon: '🏛️', label: 'RBI Registered' },
  { icon: '🔒', label: '256-bit Secure' },
  { icon: '⚡', label: '10 Min Disbursal' },
];

export function TrustBadges() {
  return (
    <View style={styles.wrap}>
      {BADGES.map((b) => (
        <View key={b.label} style={styles.badge}>
          <Text style={styles.icon}>{b.icon}</Text>
          <Text style={styles.label}>{b.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  badge: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LievTheme.surface,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LievTheme.border,
  },
  icon: {
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: LievTheme.textMuted,
    textAlign: 'center',
  },
});
