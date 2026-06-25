import { StyleSheet, Text, View } from 'react-native';

import { LievTheme } from '@/constants/theme';

type Props = {
  label: string;
  value: string;
  trend?: string;
  icon?: string;
};

export function LievMetricCard({ label, value, trend, icon }: Props) {
  return (
    <View style={styles.card}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {trend ? <Text style={styles.trend}>{trend}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    backgroundColor: LievTheme.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: LievTheme.border,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    color: LievTheme.primary,
  },
  label: {
    fontSize: 12,
    color: LievTheme.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  trend: {
    fontSize: 11,
    color: LievTheme.success,
    fontWeight: '700',
    marginTop: 6,
  },
});
