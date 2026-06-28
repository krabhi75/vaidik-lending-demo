import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { XceloreBrandMark } from '@/components/liev/XceloreBrandMark';
import { DemoPreset, useDemo } from '@/context/DemoContext';
import { t } from '@/lib/i18n';
import { XceloreCopy, XceloreTheme } from '@/constants/xcelore-theme';

const DEMO_PRESETS: { preset: DemoPreset; label: string }[] = [
  { preset: 'home-active', label: 'Active Loan + Pay EMI' },
  { preset: 'home-preapproved', label: 'Pre-approved Home' },
  { preset: 'kyc-progress', label: 'KYC In Progress' },
  { preset: 'approval', label: 'Loan Approved' },
  { preset: 'declined', label: 'Declined Application' },
  { preset: 'bnpl', label: 'BNPL Checkout' },
];

const TRUST_BADGES = [
  { icon: '🏛️', label: 'RBI Aligned' },
  { icon: '🤖', label: 'AI-Ready UX' },
  { icon: '⚡', label: '10 Min Disbursal' },
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
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[...XceloreTheme.heroGradient]} style={styles.heroBand}>
          <View style={styles.heroTop}>
            <Pressable onPress={toggleLang} style={styles.langBtn}>
              <Text style={styles.langText}>{lang === 'en' ? 'हिंदी' : 'EN'}</Text>
            </Pressable>
          </View>
          <XceloreBrandMark />
          <View style={styles.statsRow}>
            {XceloreCopy.stats.map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.prototypeBadge}>
            <Text style={styles.prototypeBadgeText}>{XceloreCopy.prototypeLabel}</Text>
          </View>
          <Text style={styles.prototypeSub}>{XceloreCopy.prototypeSub}</Text>

          <View style={styles.productCard}>
            <View style={styles.productIcon}>
              <Text style={styles.rupee}>₹</Text>
            </View>
            <Text style={styles.heroTitle}>{t(lang, 'welcomeTitle')}</Text>
            <Text style={styles.heroAmount}>{t(lang, 'welcomeAmount')}</Text>
            <Text style={styles.heroSub}>{t(lang, 'welcomeSub')}</Text>
          </View>

          <View style={styles.badges}>
            {TRUST_BADGES.map((b) => (
              <View key={b.label} style={styles.badge}>
                <Text style={styles.badgeIcon}>{b.icon}</Text>
                <Text style={styles.badgeLabel}>{b.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.steps}>
            <Text style={styles.stepsTitle}>{t(lang, 'howItWorks')}</Text>
            <Step n="1" text={t(lang, 'step1')} />
            <Step n="2" text={t(lang, 'step2')} />
            <Step n="3" text={t(lang, 'step3')} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <XceloreButton label={t(lang, 'getStarted')} onPress={() => {
          setPhase('login');
          router.push('/login');
        }} />
        <XceloreButton label={t(lang, 'skipDemo')} variant="secondary" onPress={skipToDashboard} />
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
        <XceloreBrandMark variant="footer" />
      </View>
    </SafeAreaView>
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

function XceloreButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}) {
  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} disabled={loading} style={({ pressed }) => [pressed && styles.btnPressed]}>
        <LinearGradient colors={[...XceloreTheme.ctaGradient]} style={styles.btnPrimary}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnPrimaryText}>{label}</Text>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed]}>
      <Text style={styles.btnSecondaryText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: XceloreTheme.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroBand: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: XceloreTheme.textOnDark,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 8,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
    color: XceloreTheme.textOnDark,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: XceloreTheme.textMutedOnDark,
    textAlign: 'center',
    marginTop: 2,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
    paddingBottom: 8,
  },
  prototypeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: XceloreTheme.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(1,14,208,0.15)',
  },
  prototypeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: XceloreTheme.primary,
    letterSpacing: 0.3,
  },
  prototypeSub: {
    fontSize: 13,
    color: XceloreTheme.textMuted,
    marginTop: -8,
    fontWeight: '500',
  },
  productCard: {
    alignItems: 'center',
    backgroundColor: XceloreTheme.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: XceloreTheme.border,
    shadowColor: XceloreTheme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  productIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: XceloreTheme.primaryLight,
    borderWidth: 2,
    borderColor: XceloreTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  rupee: {
    fontSize: 32,
    fontWeight: '900',
    color: XceloreTheme.primary,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: XceloreTheme.text,
  },
  heroAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: XceloreTheme.primary,
    marginTop: 4,
  },
  heroSub: {
    fontSize: 13,
    color: XceloreTheme.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  badge: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: XceloreTheme.surface,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: XceloreTheme.border,
  },
  badgeIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: XceloreTheme.textMuted,
    textAlign: 'center',
  },
  steps: {
    gap: 10,
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: XceloreTheme.textMuted,
    marginBottom: 4,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: XceloreTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  stepText: {
    fontSize: 14,
    color: XceloreTheme.text,
    flex: 1,
  },
  footer: {
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: XceloreTheme.border,
    backgroundColor: XceloreTheme.surface,
  },
  btnPrimary: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  btnSecondary: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: XceloreTheme.primaryLight,
    borderWidth: 1,
    borderColor: 'rgba(1,14,208,0.2)',
  },
  btnSecondaryText: {
    color: XceloreTheme.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.88,
  },
  presetToggle: {
    fontSize: 13,
    fontWeight: '700',
    color: XceloreTheme.primary,
    textAlign: 'center',
    paddingVertical: 4,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: XceloreTheme.border,
    backgroundColor: XceloreTheme.background,
  },
  presetChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: XceloreTheme.text,
  },
});
