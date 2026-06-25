import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import 'react-native-reanimated';

import { MobileContainer } from '@/components/liev/MobileContainer';
import { DemoProvider } from '@/context/DemoContext';
import { LievTheme } from '@/constants/theme';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <DemoProvider>
      <MobileContainer>
        {Platform.OS === 'android' ? (
          <StatusBar barStyle="light-content" backgroundColor={LievTheme.primary} />
        ) : null}
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: LievTheme.surface },
            headerTintColor: LievTheme.primary,
            headerTitleStyle: { fontWeight: '700', fontSize: 16 },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: LievTheme.background },
          }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="demo/[preset]" options={{ headerShown: false }} />
          <Stack.Screen name="kyc/aadhaar" options={{ title: 'Verify Identity' }} />
          <Stack.Screen name="kyc/ckyc" options={{ title: 'CKYC' }} />
          <Stack.Screen name="kyc/pan" options={{ title: 'PAN & Credit Score' }} />
          <Stack.Screen name="kyc/video" options={{ title: 'Video KYC' }} />
          <Stack.Screen name="apply/index" options={{ title: 'Get Personal Loan' }} />
          <Stack.Screen name="apply/income" options={{ title: 'Income Verification' }} />
          <Stack.Screen name="apply/approval" options={{ title: 'Credit Decision' }} />
          <Stack.Screen name="apply/kfs" options={{ title: 'Key Fact Statement' }} />
          <Stack.Screen name="apply/bank-link" options={{ title: 'Link Bank' }} />
          <Stack.Screen name="apply/enach" options={{ title: 'Setup AutoPay' }} />
          <Stack.Screen name="apply/disburse" options={{ title: 'Money Transferred' }} />
          <Stack.Screen name="compliance" options={{ title: 'Regulatory Info' }} />
          <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
          <Stack.Screen name="help" options={{ title: 'Help & Support' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </MobileContainer>
    </DemoProvider>
  );
}
