import { StyleSheet, Text, View } from 'react-native';

import { LievTheme } from '@/constants/theme';

type Props = {
  progress: number;
  label?: string;
};

export function LievProgressBar({ progress, label }: Props) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped}%` }]} />
      </View>
      <Text style={styles.percent}>{clamped}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: LievTheme.textMuted,
    fontWeight: '600',
  },
  track: {
    height: 8,
    backgroundColor: LievTheme.border,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: LievTheme.accent,
    borderRadius: 999,
  },
  percent: {
    fontSize: 12,
    color: LievTheme.textMuted,
    textAlign: 'right',
  },
});
