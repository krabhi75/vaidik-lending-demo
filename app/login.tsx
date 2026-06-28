import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievScreen } from '@/components/liev/Screen';
import { XceloreBrandMark } from '@/components/liev/XceloreBrandMark';
import { LievTheme } from '@/constants/theme';
import { useDemo } from '@/context/DemoContext';
import { t } from '@/lib/i18n';

export default function LoginScreen() {
  const { login, lang } = useDemo();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const sendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtp('482910');
      setResendIn(30);
      setLoading(false);
    }, 800);
  };

  const resendOtp = () => {
    if (resendIn > 0) return;
    setOtp('');
    sendOtp();
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
          label={otpSent ? t(lang, 'verifyOtp') : t(lang, 'getOtp')}
          onPress={otpSent ? verifyOtp : sendOtp}
          loading={loading}
          disabled={phone.length < 10 || !consent || (otpSent && otp.length < 6)}
        />
      }>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>{t(lang, 'loginTitle')}</Text>
      <Text style={styles.subtitle}>{t(lang, 'loginSubtitle')}</Text>

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

      <Pressable style={styles.checkRow} onPress={() => setConsent((v) => !v)}>
        <View style={[styles.checkbox, consent && styles.checkboxOn]}>
          {consent ? <Text style={styles.checkMark}>✓</Text> : null}
        </View>
        <Text style={styles.checkText}>{t(lang, 'bureauConsent')}</Text>
      </Pressable>

      {otpSent ? (
        <View style={styles.otpSection}>
          <Text style={styles.otpLabel}>
            {t(lang, 'otpSent')} {phone}
          </Text>
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
          <Pressable onPress={resendOtp} disabled={resendIn > 0}>
            <Text style={[styles.resend, resendIn > 0 && styles.resendMuted]}>
              {resendIn > 0
                ? `${t(lang, 'resendOtp')} 00:${String(resendIn).padStart(2, '0')}`
                : t(lang, 'resendNow')}
            </Text>
          </Pressable>
        </View>
      ) : null}

      <XceloreBrandMark
        variant="poweredBy"
        before={t(lang, 'poweredByBefore')}
        after={t(lang, 'poweredByAfter')}
      />

      <Text style={styles.consent}>{t(lang, 'loginConsent')}</Text>
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
    marginBottom: 16,
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
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: LievTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxOn: {
    backgroundColor: LievTheme.brand,
    borderColor: LievTheme.brand,
  },
  checkMark: {
    color: LievTheme.primary,
    fontWeight: '900',
    fontSize: 14,
  },
  checkText: {
    flex: 1,
    fontSize: 12,
    color: LievTheme.textMuted,
    lineHeight: 18,
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
  resendMuted: {
    color: LievTheme.textMuted,
  },
  consent: {
    fontSize: 11,
    color: LievTheme.textMuted,
    lineHeight: 16,
    marginTop: 'auto' as unknown as number,
  },
});
