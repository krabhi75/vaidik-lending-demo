import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { BANKS, DEMO_USER } from '@/lib/demo-data';
import { useDemo } from '@/context/DemoContext';

export default function BankLinkScreen() {
  const { setBank } = useDemo();
  const [selected, setSelected] = useState('hdfc');
  const [step, setStep] = useState<'select' | 'penny' | 'done'>('select');
  const [loading, setLoading] = useState(false);

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setStep('penny');
      setLoading(false);
    }, 1000);
  };

  const complete = () => {
    setLoading(true);
    const bank = BANKS.find((b) => b.id === selected)!;
    setTimeout(() => {
      setBank({
        bankId: bank.id,
        bankName: bank.name,
        accountLast4: '4521',
        holderName: DEMO_USER.name,
      });
      setStep('done');
      setLoading(false);
    }, 2000);
  };

  return (
    <LievScreen
      title="Link Bank Account"
      subtitle="Penny-drop verification ensures disbursement to your account only (RBI norm)."
      footer={
        step === 'done' ? (
          <LievButton label="Setup eNACH Mandate" onPress={() => router.push('/apply/enach')} />
        ) : (
          <LievButton
            label={step === 'select' ? 'Continue' : 'Verify Account'}
            onPress={() => {
              if (step === 'select') verify();
              else complete();
            }}
            loading={loading}
          />
        )
      }>
      <LievStatusBadge label="Account Aggregator + Penny Drop" status="active" />

      {step === 'select' ? (
        <>
          <Text style={styles.section}>Select salary / primary account</Text>
          {BANKS.map((bank) => (
            <Pressable
              key={bank.id}
              onPress={() => setSelected(bank.id)}
              style={[styles.bankRow, selected === bank.id && styles.bankRowActive]}>
              <Text style={styles.bankIcon}>{bank.icon}</Text>
              <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{bank.name}</Text>
                <Text style={styles.bankMeta}>Fetch via AA • IFSC auto-detect</Text>
              </View>
              <View style={[styles.radio, selected === bank.id && styles.radioOn]} />
            </Pressable>
          ))}
        </>
      ) : step === 'penny' ? (
        <LievCard>
          <Text style={styles.pennyTitle}>Reverse Penny Drop</Text>
          <Text style={styles.pennySub}>
            Send ₹1 from your {BANKS.find((b) => b.id === selected)?.name} account to verify ownership.
          </Text>
          <View style={styles.pennyBox}>
            <Row label="Account" value="•••• 4521" />
            <Row label="Name Match" value={`${DEMO_USER.name} ✓`} />
            <Row label="Status" value="Awaiting verification..." />
          </View>
        </LievCard>
      ) : (
        <LievCard highlight>
          <Text style={styles.doneIcon}>✅</Text>
          <Text style={styles.doneTitle}>Account Verified</Text>
          <Row label="Bank" value={BANKS.find((b) => b.id === selected)?.name ?? ''} />
          <Row label="Account" value="•••• 4521" />
          <Row label="Holder" value={DEMO_USER.name} />
          <Text style={styles.note}>Disbursement & eNACH will use this account.</Text>
        </LievCard>
      )}
    </LievScreen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: 15, fontWeight: '700', color: LievTheme.text },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: LievTheme.border,
    backgroundColor: LievTheme.surface,
  },
  bankRowActive: { borderColor: LievTheme.primary, borderWidth: 2, backgroundColor: LievTheme.brandLight },
  bankIcon: { fontSize: 24 },
  bankInfo: { flex: 1 },
  bankName: { fontSize: 15, fontWeight: '700', color: LievTheme.text },
  bankMeta: { fontSize: 12, color: LievTheme.textMuted, marginTop: 2 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: LievTheme.border,
  },
  radioOn: { borderColor: LievTheme.primary, backgroundColor: LievTheme.primary },
  pennyTitle: { fontSize: 16, fontWeight: '800', color: LievTheme.text },
  pennySub: { fontSize: 13, color: LievTheme.textMuted, marginTop: 6, lineHeight: 18 },
  pennyBox: { marginTop: 14, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  rowLabel: { fontSize: 13, color: LievTheme.textMuted },
  rowValue: { fontSize: 13, fontWeight: '700', color: LievTheme.text },
  doneIcon: { fontSize: 40, textAlign: 'center' },
  doneTitle: { fontSize: 20, fontWeight: '800', color: LievTheme.success, textAlign: 'center', marginVertical: 8 },
  note: { fontSize: 12, color: LievTheme.textMuted, textAlign: 'center', marginTop: 8 },
});
