import { StyleSheet, Text, View } from 'react-native';

import { LievTheme } from '@/constants/theme';

type Status = 'pending' | 'active' | 'success' | 'warning' | 'error';

const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  pending: { bg: '#F1F5F9', text: '#64748B' },
  active: { bg: '#DBEAFE', text: '#1D4ED8' },
  success: { bg: '#D1FAE5', text: '#047857' },
  warning: { bg: '#FEF3C7', text: '#B45309' },
  error: { bg: '#FEE2E2', text: '#B91C1C' },
};

type Props = {
  label: string;
  status?: Status;
};

export function LievStatusBadge({ label, status = 'pending' }: Props) {
  const colors = STATUS_COLORS[status];

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
