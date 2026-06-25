import { router, Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

type DecisionStatus = 'processing' | 'approved' | 'declined';

function initialStatus(underwriting: string, approved: boolean): DecisionStatus {
  if (underwriting === 'declined') return 'declined';
  if (approved) return 'approved';
  return 'processing';
}

export default function ApprovalScreen() {
  const { loan, updateLoan, emi } = useDemo();
  const [status, setStatus] = useState<DecisionStatus>(() =>
    initialStatus(loan.underwriting, loan.approved),
  );
  const decidedRef = useRef(status !== 'processing');

  useEffect(() => {
    if (decidedRef.current) return;

    const timer = setTimeout(() => {
      decidedRef.current = true;
      if (loan.underwriting === 'declined') {
        setStatus('declined');
        return;
      }
      updateLoan({
        approved: true,
        loanId: 'VAIDIK-PL-2026-88421',
        underwriting: 'approved',
      });
      setStatus('approved');
    }, 2500);

    return () => clearTimeout(timer);
    // Run once on mount — timer must not reset when context re-renders
  }, []);

  const simulateDecline = () => {
    if (decidedRef.current && status !== 'processing') return;
    decidedRef.current = true;
    updateLoan({ underwriting: 'declined', approved: false, loanId: null });
    setStatus('declined');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title:
            status === 'approved'
              ? 'Loan Approved'
              : status === 'declined'
                ? 'Not Approved'
                : 'Credit Decision',
        }}
      />
      <LievScreen
        title="Credit Decision"
        subtitle="Automated underwriting using bureau score, cash flow signals, and fraud checks."
        footer={
          status === 'approved' ? (
            <LievButton label="Review Key Fact Statement" onPress={() => router.push('/apply/kfs')} />
          ) : status === 'declined' ? (
            <LievButton
              label="Back to Home"
              variant="outline"
              onPress={() => router.replace('/(tabs)')}
            />
          ) : undefined
        }>
        {status === 'processing' ? (
          <>
            <LievCard>
              <View style={styles.center}>
                <ActivityIndicator size="large" color={LievTheme.primary} />
                <Text style={styles.processing}>Running credit decision engine...</Text>
                <Text style={styles.checks}>Bureau ✓ • Fraud ✓ • AML ✓ • Policy rules...</Text>
              </View>
            </LievCard>
            <Pressable onPress={simulateDecline}>
              <Text style={styles.demoToggle}>Demo: simulate decline →</Text>
            </Pressable>
          </>
        ) : status === 'declined' ? (
          <>
            <LievStatusBadge label="Not Approved" status="warning" />
            <LievCard>
              <Text style={styles.declineTitle}>Application Declined</Text>
              <Text style={styles.declineSub}>
                Credit policy did not meet minimum bureau score threshold. You can re-apply after 30
                days or improve score via timely repayments.
              </Text>
              <Row label="Bureau Score" value="742" />
              <Row label="Reason" value="FOIR exceeds policy limit" />
            </LievCard>
          </>
        ) : (
          <>
            <LievStatusBadge label="Approved" status="success" />
            <LievCard highlight>
              <Text style={styles.congrats}>Congratulations!</Text>
              <Text style={styles.approvedAmount}>{formatINR(loan.amount)}</Text>
              <Text style={styles.approvedSub}>approved at {loan.rate}% p.a.</Text>
              <View style={styles.divider} />
              <Row label="Loan ID" value={loan.loanId ?? ''} />
              <Row label="EMI" value={`${formatINR(emi)}/mo`} />
              <Row label="Tenure" value={`${loan.tenure} months`} />
            </LievCard>
          </>
        )}
      </LievScreen>
    </>
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
  center: { alignItems: 'center', paddingVertical: 32, gap: 12 },
  processing: { fontSize: 16, fontWeight: '700', color: LievTheme.text },
  checks: { fontSize: 13, color: LievTheme.textMuted },
  demoToggle: {
    fontSize: 12,
    color: LievTheme.accent,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  congrats: { fontSize: 16, fontWeight: '600', color: LievTheme.textMuted },
  approvedAmount: { fontSize: 40, fontWeight: '900', color: LievTheme.primary, marginVertical: 4 },
  approvedSub: { fontSize: 14, color: LievTheme.textMuted },
  declineTitle: { fontSize: 18, fontWeight: '800', color: LievTheme.danger },
  declineSub: { fontSize: 13, color: LievTheme.textMuted, lineHeight: 18, marginVertical: 8 },
  divider: { height: 1, backgroundColor: LievTheme.border, marginVertical: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  rowLabel: { fontSize: 14, color: LievTheme.textMuted },
  rowValue: { fontSize: 14, fontWeight: '700', color: LievTheme.text },
});
