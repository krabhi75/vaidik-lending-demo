import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { DemoPreset, useDemo } from '@/context/DemoContext';
import { LievTheme } from '@/constants/theme';

const ROUTES: Record<DemoPreset, string> = {
  welcome: '/',
  login: '/login',
  'kyc-aadhaar': '/kyc/aadhaar',
  'kyc-progress': '/kyc/pan',
  'home-preapproved': '/(tabs)',
  'home-active': '/(tabs)',
  apply: '/apply',
  approval: '/apply/approval',
  repay: '/(tabs)/pay',
  bnpl: '/(tabs)/bnpl',
  declined: '/apply/approval',
};

const VALID: DemoPreset[] = [
  'welcome',
  'login',
  'kyc-aadhaar',
  'kyc-progress',
  'home-preapproved',
  'home-active',
  'apply',
  'approval',
  'repay',
  'bnpl',
  'declined',
];

function isPreset(value: string): value is DemoPreset {
  return (VALID as string[]).includes(value);
}

/** Load a demo state then redirect — used for mobile screenshots. */
export default function DemoPresetScreen() {
  const { preset } = useLocalSearchParams<{ preset: string }>();
  const { loadPreset } = useDemo();

  useEffect(() => {
    if (!preset || !isPreset(preset)) {
      router.replace('/');
      return;
    }
    loadPreset(preset);
    router.replace(ROUTES[preset] as never);
  }, [preset, loadPreset]);

  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={LievTheme.brand} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LievTheme.background,
  },
});
