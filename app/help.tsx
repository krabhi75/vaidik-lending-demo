import { Linking, Pressable, StyleSheet, Text } from 'react-native';

import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievCopy, LievTheme } from '@/constants/theme';
import { HELP_FAQ } from '@/lib/demo-data';

export default function HelpScreen() {
  return (
    <LievScreen title="Help & Support" subtitle="FAQs, grievance redressal, and callback request.">
      <LievCard highlight>
        <Text style={styles.supportTitle}>Need help?</Text>
        <Text style={styles.supportSub}>Grievance Officer • Mon–Sat 9am–6pm</Text>
        <Pressable onPress={() => Linking.openURL(`mailto:${LievCopy.grievanceEmail}`)}>
          <Text style={styles.link}>{LievCopy.grievanceEmail}</Text>
        </Pressable>
        <Text style={styles.phone}>{LievCopy.support}</Text>
      </LievCard>

      <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
      {HELP_FAQ.map((item) => (
        <LievCard key={item.q}>
          <Text style={styles.question}>{item.q}</Text>
          <Text style={styles.answer}>{item.a}</Text>
        </LievCard>
      ))}

      <LievCard>
        <Text style={styles.rbi}>RBI Ombudsman</Text>
        <Text style={styles.rbiSub}>
          Unresolved complaints after 30 days can be escalated to RBI CMS portal.
        </Text>
        <Pressable onPress={() => Linking.openURL('https://cms.rbi.org.in')}>
          <Text style={styles.link}>cms.rbi.org.in →</Text>
        </Pressable>
      </LievCard>
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  supportTitle: { fontSize: 18, fontWeight: '800', color: LievTheme.primary },
  supportSub: { fontSize: 13, color: LievTheme.textMuted, marginTop: 4 },
  link: { fontSize: 14, fontWeight: '700', color: LievTheme.accent, marginTop: 10 },
  phone: { fontSize: 16, fontWeight: '800', color: LievTheme.text, marginTop: 8 },
  faqTitle: { fontSize: 16, fontWeight: '700', color: LievTheme.text },
  question: { fontSize: 14, fontWeight: '800', color: LievTheme.text },
  answer: { fontSize: 13, color: LievTheme.textMuted, marginTop: 6, lineHeight: 18 },
  rbi: { fontSize: 14, fontWeight: '800', color: LievTheme.text },
  rbiSub: { fontSize: 13, color: LievTheme.textMuted, marginTop: 4, lineHeight: 18 },
});
