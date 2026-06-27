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
          <Stack.Screen name="kyc/aadhaar" options={{ headerShown: false }} />
          <Stack.Screen name="kyc/ckyc" options={{ headerShown: false }} />
          <Stack.Screen name="kyc/pan" options={{ headerShown: false }} />
          <Stack.Screen name="kyc/video" options={{ headerShown: false }} />
          <Stack.Screen name="apply/index" options={{ headerShown: false }} />
          <Stack.Screen name="apply/income" options={{ headerShown: false }} />
          <Stack.Screen name="apply/approval" options={{ headerShown: false }} />
          <Stack.Screen name="apply/kfs" options={{ headerShown: false }} />
          <Stack.Screen name="apply/bank-link" options={{ headerShown: false }} />
          <Stack.Screen name="apply/enach" options={{ headerShown: false }} />
          <Stack.Screen name="apply/disburse" options={{ headerShown: false }} />
          <Stack.Screen name="compliance" options={{ headerShown: false }} />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
          <Stack.Screen name="help" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </MobileContainer>
    </DemoProvider>
  );
}
