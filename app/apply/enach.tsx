import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

export default function EnachScreen() {
  const { loan, updateLoan, emi, bank } = useDemo();
  const [step, setStep] = useState<'intro' | 'bank' | 'done'>('intro');
  const [loading, setLoading] = useState(false);

  const setup = () => {
    setLoading(true);
    setTimeout(() => {
      updateLoan({ enachSetup: true });
      setStep('done');
      setLoading(false);
    }, 2000);
  };

  return (
    <LievScreen
      title="eNACH Mandate"
      subtitle="NPCI NACH mandate for auto-debit of EMIs. Reduces DPD and improves collection efficiency."
      footer={
        step === 'done' ? (
          <LievButton label="Proceed to Disbursement" onPress={() => router.push('/apply/disburse')} />
        ) : (
          <LievButton
            label={step === 'intro' ? 'Setup Auto-Debit' : 'Authorize Mandate'}
            onPress={() => {
              if (step === 'intro') setStep('bank');
              else setup();
            }}
            loading={loading}
          />
        )
      }>
      <LievStatusBadge label="NPCI NACH" status="active" />

      {step === 'intro' ? (
        <LievCard>
          <Text style={styles.title}>Why eNACH?</Text>
          <Bullet text="Auto-debit EMIs on due date" />
          <Bullet text="92% success rate vs manual UPI" />
          <Bullet text="RBI-recommended for digital lenders" />
          <Bullet text={`EMI amount: ${formatINR(emi)}/month`} />
        </LievCard>
      ) : step === 'bank' ? (
        <LievCard>
          <Text style={styles.bankLabel}>Selected Bank Account</Text>
          <Text style={styles.bankName}>
            {bank?.bankName ?? 'HDFC Bank'} •••• {bank?.accountLast4 ?? '4521'}
          </Text>
          <Text style={styles.bankHolder}>{bank?.holderName ?? 'Abhishek Kumar'}</Text>
          <View style={styles.mandateBox}>
            <Text style={styles.mandateTitle}>Mandate Details</Text>
            <Row label="Max Amount" value={formatINR(emi)} />
            <Row label="Frequency" value="Monthly" />
            <Row label="UMRN" value="Pending authorization" />
          </View>
          <Text style={styles.npci}>Redirecting to NPCI eSign gateway...</Text>
        </LievCard>
      ) : (
        <LievCard highlight>
          <Text style={styles.doneIcon}>✅</Text>
          <Text style={styles.doneTitle}>Mandate Registered</Text>
          <Text style={styles.umrn}>UMRN: HDFC0001234567890</Text>
          <Text style={styles.doneSub}>
            First EMI will be auto-debited on due date. You can also pay via UPI anytime.
          </Text>
        </LievCard>
      )}
    </LievScreen>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: LievTheme.text,
    marginBottom: 8,
  },
  bullet: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  bulletDot: {
    color: LievTheme.primary,
    fontWeight: '700',
  },
  bulletText: {
    fontSize: 14,
    color: LievTheme.textMuted,
    flex: 1,
  },
  bankLabel: {
    fontSize: 13,
    color: LievTheme.textMuted,
    fontWeight: '600',
  },
  bankName: {
    fontSize: 20,
    fontWeight: '800',
    color: LievTheme.text,
    marginTop: 4,
  },
  bankHolder: {
    fontSize: 14,
    color: LievTheme.textMuted,
    marginTop: 2,
  },
  mandateBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: LievTheme.background,
    borderRadius: 10,
    gap: 6,
  },
  mandateTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: LievTheme.text,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 13,
    color: LievTheme.textMuted,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    color: LievTheme.text,
  },
  npci: {
    fontSize: 12,
    color: LievTheme.accent,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  doneIcon: {
    fontSize: 40,
    textAlign: 'center',
  },
  doneTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: LievTheme.success,
    textAlign: 'center',
    marginTop: 8,
  },
  umrn: {
    fontSize: 13,
    fontWeight: '700',
    color: LievTheme.primary,
    textAlign: 'center',
    marginTop: 8,
  },
  doneSub: {
    fontSize: 13,
    color: LievTheme.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
});
