import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievScreen } from '@/components/liev/Screen';
import { LievTheme } from '@/constants/theme';
import { useDemo } from '@/context/DemoContext';

export default function LoginScreen() {
  const { login } = useDemo();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtp('482910');
      setLoading(false);
    }, 800);
  };

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      login(phone);
      setLoading(false);
      router.replace('/kyc/aadhaar');
    }, 800);
  };

  return (
    <LievScreen
      scroll={false}
      style={styles.container}
      footer={
        <LievButton
          label={otpSent ? 'Verify OTP' : 'Get OTP'}
          onPress={otpSent ? verifyOtp : sendOtp}
          loading={loading}
          disabled={phone.length < 10 || (otpSent && otp.length < 6)}
        />
      }>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Enter Mobile Number</Text>
      <Text style={styles.subtitle}>
        We'll send a 6-digit OTP to verify your number
      </Text>

      <View style={styles.phoneBox}>
        <Text style={styles.prefix}>+91</Text>
        <View style={styles.divider} />
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          placeholder="Mobile number"
          placeholderTextColor={LievTheme.textMuted}
        />
      </View>

      {otpSent ? (
        <View style={styles.otpSection}>
          <Text style={styles.otpLabel}>Enter OTP sent to +91 {phone}</Text>
          <View style={styles.otpBoxes}>
            {otp.padEnd(6, ' ').split('').map((digit, i) => (
              <View key={i} style={[styles.otpBox, digit.trim() && styles.otpBoxFilled]}>
                <Text style={styles.otpDigit}>{digit.trim()}</Text>
              </View>
            ))}
          </View>
          <TextInput
            style={styles.otpHidden}
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            autoFocus
          />
          <Pressable>
            <Text style={styles.resend}>Resend OTP in 00:28</Text>
          </Pressable>
        </View>
      ) : null}

      <Text style={styles.consent}>
        By continuing, you agree to Vaidik's Terms & Privacy Policy. We follow RBI
        digital lending guidelines.
      </Text>
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  back: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 15,
    color: LievTheme.textMuted,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: LievTheme.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: LievTheme.textMuted,
    lineHeight: 20,
    marginBottom: 28,
  },
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LievTheme.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: LievTheme.brand,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 24,
  },
  prefix: {
    fontSize: 18,
    fontWeight: '700',
    color: LievTheme.text,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: LievTheme.border,
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: LievTheme.text,
    paddingVertical: 14,
    letterSpacing: 1,
  },
  otpSection: {
    gap: 12,
    marginBottom: 16,
  },
  otpLabel: {
    fontSize: 14,
    color: LievTheme.textMuted,
    fontWeight: '500',
  },
  otpBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: LievTheme.border,
    backgroundColor: LievTheme.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    borderColor: LievTheme.brand,
    backgroundColor: LievTheme.brandLight,
  },
  otpDigit: {
    fontSize: 22,
    fontWeight: '800',
    color: LievTheme.primary,
  },
  otpHidden: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  resend: {
    fontSize: 13,
    color: LievTheme.brandDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  consent: {
    fontSize: 11,
    color: LievTheme.textMuted,
    lineHeight: 16,
    marginTop: 'auto' as unknown as number,
  },
});
