import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievProgressBar } from '@/components/liev/ProgressBar';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { DEMO_USER } from '@/lib/demo-data';
import { useDemo } from '@/context/DemoContext';

export default function CkycScreen() {
  const { completeKycStep } = useDemo();
  const [fetching, setFetching] = useState(true);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetching(false);
      setFetched(true);
      completeKycStep('ckyc');
    }, 2000);
    return () => clearTimeout(timer);
  }, [completeKycStep]);

  return (
    <LievScreen
      title="CKYC Registry"
      subtitle="Fetching your Central KYC record from CERSAI. Reduces repeat document uploads."
      footer={
        fetched ? (
          <LievButton label="Continue to PAN" onPress={() => router.push('/kyc/pan')} />
        ) : undefined
      }>
      <LievProgressBar progress={40} label="KYC Progress — Step 2 of 5" />
      <LievStatusBadge label="CERSAI CKYC" status="active" />

      <LievCard>
        {fetching ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={LievTheme.primary} />
            <Text style={styles.fetching}>Querying CKYC Registry...</Text>
            <Text style={styles.ckycId}>CKYC ID: 12345678901234</Text>
          </View>
        ) : (
          <View style={styles.details}>
            <Row label="CKYC Number" value="12345678901234" />
            <Row label="Name" value={DEMO_USER.name} />
            <Row label="PAN" value={DEMO_USER.pan} />
            <Row label="Address" value={DEMO_USER.address} />
            <Row label="KYC Status" value="Verified" highlight />
          </View>
        )}
      </LievCard>

      <Text style={styles.note}>
        Integration: CERSAI CKYC API via regulated entity. CKYC reduces onboarding
        time by 60% for returning customers.
      </Text>
    </LievScreen>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && styles.highlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  fetching: {
    fontSize: 15,
    fontWeight: '600',
    color: LievTheme.text,
  },
  ckycId: {
    fontSize: 12,
    color: LievTheme.textMuted,
  },
  details: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowLabel: {
    fontSize: 13,
    color: LievTheme.textMuted,
    flex: 1,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    color: LievTheme.text,
    flex: 1,
    textAlign: 'right',
  },
  highlight: {
    color: LievTheme.success,
  },
  note: {
    fontSize: 12,
    color: LievTheme.textMuted,
    lineHeight: 18,
  },
});
