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

export default function AadhaarKycScreen() {
  const { completeKycStep } = useDemo();
  const [aadhaar, setAadhaar] = useState('1234 5678 4521');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      completeKycStep('aadhaar');
      setLoading(false);
      router.push('/kyc/ckyc');
    }, 1500);
  };

  return (
    <LievScreen
      title="Aadhaar Verification"
      subtitle="UIDAI OTP-based eKYC. Your Aadhaar data is encrypted and used only for identity verification per RBI norms."
      footer={
        <LievButton
          label={otpSent ? 'Verify Aadhaar' : 'Send Aadhaar OTP'}
          onPress={() => {
            if (!otpSent) {
              setOtpSent(true);
              setOtp('839201');
            } else {
              verify();
            }
          }}
          loading={loading}
        />
      }>
      <LievProgressBar progress={20} label="KYC Progress — Step 1 of 5" />
      <LievStatusBadge label="UIDAI eKYC" status="active" />

      <LievCard>
        <Text style={styles.label}>Aadhaar Number</Text>
        <TextInput
          style={styles.input}
          value={aadhaar}
          onChangeText={setAadhaar}
          keyboardType="number-pad"
          placeholder="XXXX XXXX XXXX"
        />
        <Text style={styles.hint}>Linked to: {DEMO_USER.name}</Text>
      </LievCard>

      {otpSent ? (
        <LievCard highlight>
          <Text style={styles.label}>UIDAI OTP</Text>
          <TextInput
            style={styles.otp}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
          <Text style={styles.demo}>Demo OTP: 839201</Text>
        </LievCard>
      ) : null}

      <Text style={styles.note}>
        Integration: UIDAI Aadhaar OTP API via licensed KYC service provider.
        Consent captured before data fetch.
      </Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: LievTheme.text,
    letterSpacing: 2,
  },
  hint: {
    fontSize: 12,
    color: LievTheme.textMuted,
    marginTop: 8,
  },
  otp: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 6,
    textAlign: 'center',
    color: LievTheme.primary,
  },
  demo: {
    fontSize: 12,
    color: LievTheme.accent,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: LievTheme.textMuted,
    lineHeight: 18,
  },
});
