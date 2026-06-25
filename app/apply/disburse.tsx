import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

export default function DisburseScreen() {
  const { loan, updateLoan, setPhase, bank, initScheduleOnDisburse } = useDemo();
  const [status, setStatus] = useState<'processing' | 'done'>(() =>
    loan.disbursed ? 'done' : 'processing',
  );
  const completedRef = useRef(loan.disbursed);

  useEffect(() => {
    if (completedRef.current) return;

    const timer = setTimeout(() => {
      completedRef.current = true;
      updateLoan({ disbursed: true });
      initScheduleOnDisburse();
      setStatus('done');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const goHome = () => {
    setPhase('active');
    router.replace('/(tabs)');
  };

  return (
    <LievScreen
      title="Disbursement"
      subtitle="Funds transferred to your registered bank account via IMPS (24x7 settlement)."
      footer={status === 'done' ? <LievButton label="Go to Dashboard" onPress={goHome} /> : undefined}>
      {status === 'processing' ? (
        <LievCard>
          <View style={styles.center}>
            <ActivityIndicator size="large" color={LievTheme.primary} />
            <Text style={styles.processing}>Initiating IMPS transfer...</Text>
            <Text style={styles.amount}>{formatINR(loan.amount)}</Text>
            <Text style={styles.bank}>
              {bank?.bankName ?? 'HDFC Bank'} •••• {bank?.accountLast4 ?? '4521'}
            </Text>
          </View>
        </LievCard>
      ) : (
        <>
          <LievStatusBadge label="Disbursed" status="success" />
          <LievCard highlight>
            <Text style={styles.successIcon}>💸</Text>
            <Text style={styles.successTitle}>Money on the way!</Text>
            <Text style={styles.successAmount}>{formatINR(loan.amount)}</Text>
            <Text style={styles.utr}>UTR: IMPS26061788421001</Text>
            <Text style={styles.eta}>Expected in account within 30 seconds</Text>
          </LievCard>
          <LievCard>
            <Text style={styles.kfsTitle}>Key Fact Statement</Text>
            <Text style={styles.kfs}>
              Loan agreement, KFS, and sanction letter sent to your registered email. Cooling-off
              period: 3 days from disbursement.
            </Text>
          </LievCard>
        </>
      )}
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  processing: {
    fontSize: 16,
    fontWeight: '700',
    color: LievTheme.text,
    marginTop: 12,
  },
  amount: {
    fontSize: 32,
    fontWeight: '900',
    color: LievTheme.primary,
  },
  bank: {
    fontSize: 14,
    color: LievTheme.textMuted,
  },
  successIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: LievTheme.text,
    textAlign: 'center',
    marginTop: 8,
  },
  successAmount: {
    fontSize: 36,
    fontWeight: '900',
    color: LievTheme.primary,
    textAlign: 'center',
    marginVertical: 4,
  },
  utr: {
    fontSize: 12,
    fontWeight: '700',
    color: LievTheme.textMuted,
    textAlign: 'center',
  },
  eta: {
    fontSize: 13,
    color: LievTheme.success,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  kfsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: LievTheme.text,
    marginBottom: 6,
  },
  kfs: {
    fontSize: 13,
    color: LievTheme.textMuted,
    lineHeight: 18,
  },
});
