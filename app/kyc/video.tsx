import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievProgressBar } from '@/components/liev/ProgressBar';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { useDemo } from '@/context/DemoContext';

export default function VideoKycScreen() {
  const { completeKycStep } = useDemo();
  const [step, setStep] = useState<'intro' | 'capture' | 'done'>('intro');
  const [loading, setLoading] = useState(false);

  const complete = () => {
    setLoading(true);
    setTimeout(() => {
      completeKycStep('video');
      setStep('done');
      setLoading(false);
    }, 2000);
  };

  return (
    <LievScreen
      title="Video KYC"
      subtitle="RBI-mandated V-CIP for high-value loans. Live agent verification with liveness check."
      footer={
        step === 'done' ? (
          <LievButton label="Apply for Loan" onPress={() => router.push('/apply/income')} />
        ) : (
          <LievButton
            label={step === 'intro' ? 'Start Video KYC' : 'Submit Verification'}
            onPress={() => {
              if (step === 'intro') setStep('capture');
              else complete();
            }}
            loading={loading}
          />
        )
      }>
      <LievProgressBar progress={step === 'done' ? 100 : 80} label="KYC Progress — Step 4 of 5" />
      <LievStatusBadge
        label={step === 'done' ? 'KYC Complete' : 'V-CIP In Progress'}
        status={step === 'done' ? 'success' : 'active'}
      />

      <LievCard>
        {step === 'intro' ? (
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Before you begin:</Text>
            <Bullet text="Keep PAN & Aadhaar handy" />
            <Bullet text="Ensure good lighting on your face" />
            <Bullet text="Agent will ask 2 security questions" />
            <Bullet text="Session recorded per RBI V-CIP norms" />
          </View>
        ) : step === 'capture' ? (
          <View style={styles.camera}>
            <View style={styles.faceRing}>
              <Text style={styles.faceEmoji}>🧑</Text>
            </View>
            <Text style={styles.cameraText}>Position face in the oval</Text>
            <Text style={styles.liveness}>Liveness check: Blink detected ✓</Text>
          </View>
        ) : (
          <View style={styles.done}>
            <Text style={styles.doneIcon}>✅</Text>
            <Text style={styles.doneTitle}>KYC Verified</Text>
            <Text style={styles.doneSub}>
              All 5 checks complete. You're ready to apply for instant credit.
            </Text>
          </View>
        )}
      </LievCard>
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

const styles = StyleSheet.create({
  instructions: {
    gap: 10,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: LievTheme.text,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: 'row',
    gap: 8,
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
  camera: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  faceRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: LievTheme.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
  },
  faceEmoji: {
    fontSize: 64,
  },
  cameraText: {
    fontSize: 15,
    fontWeight: '600',
    color: LievTheme.text,
  },
  liveness: {
    fontSize: 13,
    color: LievTheme.success,
    fontWeight: '600',
  },
  done: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  doneIcon: {
    fontSize: 48,
  },
  doneTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: LievTheme.success,
  },
  doneSub: {
    fontSize: 14,
    color: LievTheme.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
