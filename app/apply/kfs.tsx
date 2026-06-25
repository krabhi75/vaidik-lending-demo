import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievCopy, LievTheme } from '@/constants/theme';
import { DEMO_USER } from '@/lib/demo-data';
import { formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

export default function KfsScreen() {
  const { loan, emi, updateLoan } = useDemo();
  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalInterest = emi * loan.tenure - loan.amount;
  const apr = loan.rate + 1.2;
  const processingFee = 999;

  const eSign = () => {
    setLoading(true);
    setTimeout(() => {
      updateLoan({ kfsAccepted: true });
      setSigned(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <LievScreen
      title="Key Fact Statement"
      subtitle="RBI-mandated disclosure before loan acceptance. Review all terms."
      footer={
        signed ? (
          <LievButton label="Link Bank Account" onPress={() => router.push('/apply/bank-link')} />
        ) : (
          <LievButton
            label="Sign with Aadhaar eSign"
            onPress={eSign}
            loading={loading}
            disabled={!agreed}
          />
        )
      }>
      <LievStatusBadge label="KFS • Sanction Letter" status="active" />

      <LievCard>
        <Text style={styles.section}>Borrower</Text>
        <Row label="Name" value={DEMO_USER.name} />
        <Row label="PAN" value={DEMO_USER.pan} />
        <Row label="Lender (RE)" value="Vaidik NBFC Partner Ltd." />
        <Row label="LSP" value={LievCopy.companyName} />
      </LievCard>

      <LievCard highlight>
        <Text style={styles.section}>Loan Terms</Text>
        <Row label="Sanctioned Amount" value={formatINR(loan.amount)} />
        <Row label="Interest Rate" value={`${loan.rate}% p.a.`} />
        <Row label="APR (incl. fees)" value={`${apr.toFixed(1)}%`} />
        <Row label="Tenure" value={`${loan.tenure} months`} />
        <Row label="EMI" value={formatINR(emi)} />
        <Row label="Processing Fee" value={`₹${processingFee} + GST`} />
        <Row label="Total Interest" value={formatINR(totalInterest)} />
        <Row label="Total Payable" value={formatINR(emi * loan.tenure)} bold />
      </LievCard>

      <LievCard>
        <Text style={styles.section}>Borrower Rights</Text>
        <Bullet text="3-day cooling-off period — cancel without penalty" />
        <Bullet text="Loan disbursed directly to your bank account" />
        <Bullet text="Grievance: grievance@vaidikedu.com • 1800-VAIDIK-HELP" />
        <Bullet text="RBI Ombudsman applicable for unresolved complaints" />
      </LievCard>

      {!signed ? (
        <Pressable style={styles.checkRow} onPress={() => setAgreed((v) => !v)}>
          <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
            {agreed ? <Text style={styles.checkMark}>✓</Text> : null}
          </View>
          <Text style={styles.checkText}>
            I have read the KFS and loan agreement. I accept terms and authorize credit bureau
            reporting.
          </Text>
        </Pressable>
      ) : (
        <LievCard highlight>
          <Text style={styles.signedIcon}>✍️</Text>
          <Text style={styles.signedTitle}>Aadhaar eSign Complete</Text>
          <Text style={styles.signedRef}>Doc ID: VAIDIK-ESIGN-88421 • 17 Jun 2026</Text>
        </LievCard>
      )}
    </LievScreen>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.rowBold]}>{value}</Text>
    </View>
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

const styles = StyleSheet.create({
  section: { fontSize: 14, fontWeight: '800', color: LievTheme.text, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  rowLabel: { fontSize: 13, color: LievTheme.textMuted, flex: 1 },
  rowValue: { fontSize: 13, fontWeight: '600', color: LievTheme.text },
  rowBold: { fontWeight: '900', color: LievTheme.primary, fontSize: 15 },
  bullet: { flexDirection: 'row', gap: 8, marginVertical: 3 },
  bulletDot: { color: LievTheme.primary, fontWeight: '700' },
  bulletText: { fontSize: 13, color: LievTheme.textMuted, flex: 1, lineHeight: 18 },
  checkRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: LievTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxOn: { backgroundColor: LievTheme.accent, borderColor: LievTheme.accent },
  checkMark: { color: '#fff', fontWeight: '800', fontSize: 14 },
  checkText: { fontSize: 13, color: LievTheme.text, flex: 1, lineHeight: 18 },
  signedIcon: { fontSize: 36, textAlign: 'center' },
  signedTitle: { fontSize: 18, fontWeight: '800', color: LievTheme.success, textAlign: 'center', marginTop: 8 },
  signedRef: { fontSize: 12, color: LievTheme.textMuted, textAlign: 'center', marginTop: 6 },
});
