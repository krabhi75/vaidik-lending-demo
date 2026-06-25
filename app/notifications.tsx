import { StyleSheet, Text, View } from 'react-native';

import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { DEMO_NOTIFICATIONS } from '@/lib/demo-data';

export default function NotificationsScreen() {
  return (
    <LievScreen title="Notifications" subtitle="EMI reminders, disbursement alerts, and offers.">
      {DEMO_NOTIFICATIONS.map((n) => (
        <LievCard key={n.id} style={!n.read ? styles.unread : undefined}>
          <View style={styles.row}>
            <Text style={styles.title}>{n.title}</Text>
            {!n.read ? <View style={styles.dot} /> : null}
          </View>
          <Text style={styles.body}>{n.body}</Text>
          <View style={styles.footer}>
            <Text style={styles.time}>{n.time}</Text>
            <LievStatusBadge
              label={n.type === 'reminder' ? 'EMI' : n.type === 'offer' ? 'Offer' : 'Alert'}
              status={n.type === 'reminder' ? 'warning' : n.type === 'offer' ? 'active' : 'success'}
            />
          </View>
        </LievCard>
      ))}
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  unread: { borderColor: LievTheme.brand, borderWidth: 1.5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: '800', color: LievTheme.text, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: LievTheme.brand },
  body: { fontSize: 13, color: LievTheme.textMuted, marginTop: 6, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  time: { fontSize: 11, color: LievTheme.textMuted },
});
