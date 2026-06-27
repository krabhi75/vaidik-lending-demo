import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/liev/BrandMark';
import { LievButton } from '@/components/liev/Button';
import { LievScreen } from '@/components/liev/Screen';
import { TrustBadges } from '@/components/liev/TrustBadges';
import { LievCopy, LievTheme } from '@/constants/theme';
import { DemoPreset, useDemo } from '@/context/DemoContext';
import { t } from '@/lib/i18n';

const DEMO_PRESETS: { preset: DemoPreset; label: string }[] = [
  { preset: 'home-active', label: 'Active Loan + Pay EMI' },
  { preset: 'home-preapproved', label: 'Pre-approved Home' },
  { preset: 'kyc-progress', label: 'KYC In Progress' },
  { preset: 'approval', label: 'Loan Approved' },
  { preset: 'declined', label: 'Declined Application' },
  { preset: 'bnpl', label: 'BNPL Checkout' },
];

export default function WelcomeScreen() {
  const { phase, setPhase, loadPreset, lang, toggleLang } = useDemo();
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    if (phase === 'active') {
      router.replace('/(tabs)');
    }
  }, [phase]);

  const skipToDashboard = () => {
    loadPreset('home-active');
    setPhase('active');
    router.replace('/(tabs)');
  };

  const jumpTo = (preset: DemoPreset) => {
    loadPreset(preset);
    if (preset.startsWith('home') || preset === 'repay' || preset === 'bnpl') {
      setPhase('active');
      router.replace(preset === 'repay' ? '/(tabs)/pay' : preset === 'bnpl' ? '/(tabs)/bnpl' : '/(tabs)');
    } else if (preset === 'approval' || preset === 'declined') {
      router.push('/apply/approval');
    } else if (preset === 'kyc-progress' || preset === 'kyc-aadhaar') {
      router.push(preset === 'kyc-progress' ? '/kyc/pan' : '/kyc/aadhaar');
    } else {
      router.push('/login');
    }
  };

  return (
    <LievScreen scroll={false} style={styles.container}>
      <View style={styles.top}>
        <BrandMark />
        <Pressable onPress={toggleLang} style={styles.langBtn}>
          <Text style={styles.langText}>{lang === 'en' ? 'हिंदी' : 'EN'}</Text>
        </Pressable>
        <Text style={styles.rating}>{LievCopy.playStore}</Text>
      </View>

      <View style={styles.heroIllustration}>
        <View style={styles.coinStack}>
          <Text style={styles.coin}>₹</Text>
        </View>
        <Text style={styles.heroTitle}>{t(lang, 'welcomeTitle')}</Text>
        <Text style={styles.heroAmount}>{t(lang, 'welcomeAmount')}</Text>
        <Text style={styles.heroSub}>{t(lang, 'welcomeSub')}</Text>
      </View>

      <TrustBadges />

      <View style={styles.steps}>
        <Text style={styles.stepsTitle}>{t(lang, 'howItWorks')}</Text>
        <Step n="1" text={t(lang, 'step1')} />
        <Step n="2" text={t(lang, 'step2')} />
        <Step n="3" text={t(lang, 'step3')} />
      </View>

      <View style={styles.actions}>
        <LievButton
          label={t(lang, 'getStarted')}
          onPress={() => {
            setPhase('login');
            router.push('/login');
          }}
        />
        <LievButton label={t(lang, 'skipDemo')} variant="secondary" onPress={skipToDashboard} />
        <Pressable onPress={() => setShowPresets((v) => !v)}>
          <Text style={styles.presetToggle}>
            {showPresets ? '▲ Hide' : '▼'} {t(lang, 'demoPresets')}
          </Text>
        </Pressable>
        {showPresets ? (
          <View style={styles.presetGrid}>
            {DEMO_PRESETS.map((p) => (
              <Pressable key={p.preset} style={styles.presetChip} onPress={() => jumpTo(p.preset)}>
                <Text style={styles.presetChipText}>{p.label}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        <BrandMark variant="footer" />
      </View>
    </LievScreen>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <View style={styles.step}>
      <View style={styles.stepNum}>
        <Text style={styles.stepNumText}>{n}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  top: { alignItems: 'center', paddingTop: 12 },
  langBtn: {
    position: 'absolute',
    right: 0,
    top: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LievTheme.border,
  },
  langText: { fontSize: 12, fontWeight: '700', color: LievTheme.primary },
  rating: { fontSize: 12, color: LievTheme.textMuted, marginTop: 4 },
  heroIllustration: { alignItems: 'center', paddingVertical: 16 },
  coinStack: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: LievTheme.brandLight,
    borderWidth: 3,
    borderColor: LievTheme.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coin: { fontSize: 40, fontWeight: '900', color: LievTheme.brandDark },
  heroTitle: { fontSize: 22, fontWeight: '700', color: LievTheme.text },
  heroAmount: { fontSize: 28, fontWeight: '900', color: LievTheme.brandDark, marginTop: 4 },
  heroSub: { fontSize: 13, color: LievTheme.textMuted, marginTop: 8, textAlign: 'center' },
  steps: { gap: 10 },
  stepsTitle: { fontSize: 14, fontWeight: '700', color: LievTheme.textMuted, marginBottom: 4 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: LievTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  stepText: { fontSize: 14, color: LievTheme.text, flex: 1 },
  actions: { gap: 10 },
  presetToggle: {
    fontSize: 13,
    fontWeight: '700',
    color: LievTheme.accent,
    textAlign: 'center',
    paddingVertical: 4,
  },
  presetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  presetChip: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LievTheme.border,
    backgroundColor: LievTheme.surface,
  },
  presetChipText: { fontSize: 11, fontWeight: '600', color: LievTheme.text },
});
