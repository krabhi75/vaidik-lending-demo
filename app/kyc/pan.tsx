import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievProgressBar } from '@/components/liev/ProgressBar';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { DEMO_USER } from '@/lib/demo-data';
import { useDemo } from '@/context/DemoContext';

export default function PanKycScreen() {
  const { completeKycStep } = useDemo();
  const [pan, setPan] = useState(DEMO_USER.pan);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      completeKycStep('pan');
      completeKycStep('bureau');
      setVerified(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <LievScreen
      title="PAN & Bureau Check"
      subtitle="PAN validation via NSDL + soft credit bureau pull (CIBIL/Experian) with explicit consent."
      footer={
        <LievButton
          label={verified ? 'Continue to Video KYC' : 'Verify PAN & Pull Bureau'}
          onPress={() => {
            if (verified) {
              router.push('/kyc/video');
            } else {
              verify();
            }
          }}
          loading={loading}
        />
      }>
      <LievProgressBar progress={60} label="KYC Progress — Step 3 of 5" />
      <LievStatusBadge label="NSDL + CIBIL" status="active" />

      <LievCard>
        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          value={pan}
          onChangeText={(t) => setPan(t.toUpperCase())}
          autoCapitalize="characters"
          maxLength={10}
        />
      </LievCard>

      {verified ? (
        <LievCard highlight>
          <Text style={styles.scoreLabel}>Credit Score</Text>
          <Text style={styles.score}>{DEMO_USER.creditScore}</Text>
          <Text style={styles.scoreBand}>Good — Eligible for instant approval</Text>
          <Text style={styles.bureau}>Bureau: CIBIL • Soft pull • No score impact</Text>
        </LievCard>
      ) : (
        <Text style={styles.consent}>
          I consent to Vaidik fetching my credit report from CIBIL/Experian for
          loan eligibility assessment. This is a soft inquiry.
        </Text>
      )}
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: LievTheme.textMuted,
    marginBottom: 8,
  },
  input: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 3,
    color: LievTheme.primary,
  },
  consent: {
    fontSize: 12,
    color: LievTheme.textMuted,
    lineHeight: 18,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
  },
  scoreLabel: {
    fontSize: 13,
    color: LievTheme.textMuted,
    fontWeight: '600',
  },
  score: {
    fontSize: 48,
    fontWeight: '900',
    color: LievTheme.primary,
    marginVertical: 4,
  },
  scoreBand: {
    fontSize: 15,
    fontWeight: '700',
    color: LievTheme.success,
  },
  bureau: {
    fontSize: 12,
    color: LievTheme.textMuted,
    marginTop: 8,
  },
});
