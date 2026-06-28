import { Platform, StyleSheet, Text, View } from 'react-native';

import { LievTheme, MOBILE_WIDTH } from '@/constants/theme';
import { XceloreTheme } from '@/constants/xcelore-theme';

type Props = {
  children: React.ReactNode;
};

/** Centers app in phone-width frame on web — Android screenshot reference. */
export function MobileContainer({ children }: Props) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.desktop}>
      <View style={styles.phone}>
        <AndroidStatusBar />
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

export function AndroidStatusBar() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusTime}>9:41</Text>
      <View style={styles.statusRight}>
        <Text style={styles.statusIcon}>📶</Text>
        <Text style={styles.statusIcon}>🔋</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  desktop: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh' as unknown as number,
    paddingVertical: 24,
  },
  phone: {
    width: MOBILE_WIDTH,
    maxWidth: '100%',
    flex: 1,
    maxHeight: 844,
    backgroundColor: LievTheme.background,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 24,
  },
  content: {
    flex: 1,
  },
  statusBar: {
    height: 28,
    backgroundColor: XceloreTheme.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  statusTime: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statusRight: {
    flexDirection: 'row',
    gap: 6,
  },
  statusIcon: {
    fontSize: 11,
  },
});
