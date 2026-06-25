import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { LievTheme } from '@/constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function LievButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: Props) {
  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.base,
          isDisabled && styles.disabled,
          pressed && !isDisabled && styles.pressed,
          style,
        ]}>
        <LinearGradient
          colors={[...LievTheme.ctaGradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}>
          {loading ? (
            <ActivityIndicator color={LievTheme.primary} />
          ) : (
            <Text style={styles.primaryText}>{label}</Text>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  const variantStyle =
    variant === 'secondary'
      ? styles.secondary
      : variant === 'danger'
        ? styles.danger
        : styles.outline;

  const textStyle =
    variant === 'outline' ? styles.outlineText : styles.secondaryText;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={LievTheme.primary} />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: LievTheme.primary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  secondary: {
    backgroundColor: LievTheme.brandLight,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  secondaryText: {
    color: LievTheme.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: LievTheme.border,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  outlineText: {
    color: LievTheme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  danger: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.88,
  },
});
