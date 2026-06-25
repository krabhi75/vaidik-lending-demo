import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievProgressBar } from '@/components/liev/ProgressBar';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { DEMO_USER } from '@/lib/demo-data';
import { useDemo } from '@/context/DemoContext';

export default function IncomeScreen() {
  const { setIncome } = useDemo();
  const [type, setType] = useState<'salaried' | 'self-employed'>('salaried');
  const [employer, setEmployer] = useState('Infosys Ltd');
  const [income, setIncomeAmount] = useState('85000');
  const [step, setStep] = useState<'form' | 'aa' | 'done'>('form');
  const [loading, setLoading] = useState(false);

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setStep('aa');
      setLoading(false);
    }, 1200);
  };

  const complete = () => {
    setLoading(true);
    setTimeout(() => {
      setIncome({
        type,
        employer: type === 'salaried' ? employer : 'Self Employed',
        monthlyIncome: Number(income) || 85000,
      });
      setStep('done');
      setLoading(false);
    }, 1800);
  };

  return (
    <LievScreen
      title="Income Verification"
      subtitle="Account Aggregator fetches salary credits with your consent — like Moneyview & Navi."
      footer={
        step === 'done' ? (
          <LievButton label="Apply for Personal Loan" onPress={() => router.push('/apply')} />
        ) : (
          <LievButton
            label={step === 'form' ? 'Verify Income' : 'Authorize via AA'}
            onPress={() => {
              if (step === 'form') verify();
              else complete();
            }}
            loading={loading}
          />
        )
      }>
      <LievProgressBar progress={step === 'done' ? 100 : 90} label="Onboarding — Income Check" />
      <LievStatusBadge
        label={step === 'done' ? 'Income Verified' : 'RBI Account Aggregator'}
        status={step === 'done' ? 'success' : 'active'}
      />

      {step === 'form' ? (
        <>
          <View style={styles.typeRow}>
            <Pressable
              style={[styles.typeChip, type === 'salaried' && styles.typeChipActive]}
              onPress={() => setType('salaried')}>
              <Text style={[styles.typeText, type === 'salaried' && styles.typeTextActive]}>Salaried</Text>
            </Pressable>
            <Pressable
              style={[styles.typeChip, type === 'self-employed' && styles.typeChipActive]}
              onPress={() => setType('self-employed')}>
              <Text style={[styles.typeText, type === 'self-employed' && styles.typeTextActive]}>
                Self Employed
              </Text>
            </Pressable>
          </View>
          <LievCard>
            {type === 'salaried' ? (
              <>
                <Text style={styles.label}>Employer Name</Text>
                <TextInput style={styles.input} value={employer} onChangeText={setEmployer} />
              </>
            ) : null}
            <Text style={styles.label}>Monthly Income (₹)</Text>
            <TextInput
              style={styles.input}
              value={income}
              onChangeText={setIncomeAmount}
              keyboardType="number-pad"
            />
            <Text style={styles.hint}>Used for FOIR-based eligibility. Not shared without consent.</Text>
          </LievCard>
        </>
      ) : step === 'aa' ? (
        <LievCard>
          <Text style={styles.aaTitle}>Connect via Account Aggregator</Text>
          <Text style={styles.aaSub}>
            Fetching last 6 months bank statement for {DEMO_USER.name}...
          </Text>
          <View style={styles.aaSteps}>
            <AaStep done label="Consent captured (purpose: lending)" />
            <AaStep done label="Redirect to OneMoney AA" />
            <AaStep active label="Parsing salary credits & cash flow" />
            <AaStep label="Income score: 82/100" />
          </View>
        </LievCard>
      ) : (
        <LievCard highlight>
          <Text style={styles.doneIcon}>✅</Text>
          <Text style={styles.doneTitle}>Income Verified</Text>
          <Row label="Type" value={type === 'salaried' ? 'Salaried' : 'Self Employed'} />
          <Row label="Employer" value={type === 'salaried' ? employer : 'Business'} />
          <Row label="Monthly Income" value={`₹${Number(income).toLocaleString('en-IN')}`} />
          <Row label="AA Consent ID" value="AA-CONSENT-88421" />
        </LievCard>
      )}
    </LievScreen>
  );
}

function AaStep({ label, done, active }: { label: string; done?: boolean; active?: boolean }) {
  return (
    <View style={styles.aaStep}>
      <Text style={styles.aaStepIcon}>{done ? '✓' : active ? '◉' : '○'}</Text>
      <Text style={[styles.aaStepText, active && styles.aaStepActive]}>{label}</Text>
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
  typeRow: { flexDirection: 'row', gap: 10 },
  typeChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LievTheme.border,
    alignItems: 'center',
  },
  typeChipActive: { backgroundColor: LievTheme.brand, borderColor: LievTheme.brand },
  typeText: { fontSize: 14, fontWeight: '600', color: LievTheme.textMuted },
  typeTextActive: { color: LievTheme.primary, fontWeight: '800' },
  label: { fontSize: 13, fontWeight: '600', color: LievTheme.textMuted, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: LievTheme.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: LievTheme.text,
  },
  hint: { fontSize: 12, color: LievTheme.textMuted, lineHeight: 18 },
  aaTitle: { fontSize: 16, fontWeight: '800', color: LievTheme.text },
  aaSub: { fontSize: 13, color: LievTheme.textMuted, marginTop: 6, marginBottom: 12 },
  aaSteps: { gap: 10 },
  aaStep: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aaStepIcon: { width: 20, fontSize: 14, fontWeight: '800', color: LievTheme.accent },
  aaStepText: { fontSize: 14, color: LievTheme.textMuted, flex: 1 },
  aaStepActive: { color: LievTheme.text, fontWeight: '700' },
  doneIcon: { fontSize: 40, textAlign: 'center' },
  doneTitle: { fontSize: 20, fontWeight: '800', color: LievTheme.success, textAlign: 'center', marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  rowLabel: { fontSize: 13, color: LievTheme.textMuted },
  rowValue: { fontSize: 13, fontWeight: '700', color: LievTheme.text },
});
