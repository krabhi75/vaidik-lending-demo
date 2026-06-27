import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { LievTheme } from '@/constants/theme';
import { useDemo } from '@/context/DemoContext';
import { t } from '@/lib/i18n';

export default function TabLayout() {
  const { lang } = useDemo();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: LievTheme.brandDark,
        tabBarInactiveTintColor: LievTheme.textMuted,
        tabBarStyle: {
          backgroundColor: LievTheme.surface,
          borderTopColor: LievTheme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t(lang, 'tabHome'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loans"
        options={{
          title: t(lang, 'tabLoans'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bnpl"
        options={{
          title: t(lang, 'tabBnpl'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pay"
        options={{
          title: t(lang, 'tabPay'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t(lang, 'tabAccount'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
