import { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LievTheme } from '@/constants/theme';

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
};

export function LievScreen({
  title,
  subtitle,
  children,
  footer,
  scroll = true,
  style,
}: Props) {
  const content = (
    <View style={[styles.content, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LievTheme.background,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: LievTheme.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: LievTheme.textMuted,
    lineHeight: 22,
    marginTop: -8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: LievTheme.border,
    backgroundColor: LievTheme.surface,
  },
});
