import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/liev/BrandMark';
import { LievCard } from '@/components/liev/Card';
import { LievMetricCard } from '@/components/liev/MetricCard';
import { StepTracker } from '@/components/liev/StepTracker';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievCopy, LievTheme } from '@/constants/theme';
import { PRODUCT_METRICS } from '@/lib/demo-data';
import { formatDate, formatINR } from '@/lib/format';
import { t } from '@/lib/i18n';
import { useDemo } from '@/context/DemoContext';

const SERVICES = [
  { icon: 'cash-outline' as const, label: 'Get Loan', route: '/apply' },
  { icon: 'card-outline' as const, label: 'Pay EMI', route: '/(tabs)/pay' },
  { icon: 'time-outline' as const, label: 'History', route: '/(tabs)/loans' },
  { icon: 'bag-handle-outline' as const, label: 'BNPL', route: '/(tabs)/bnpl' },
];

export default function HomeScreen() {
  const { loan, emi, nextEmiDue, kyc, outstandingBalance, lang, showPoMetrics } = useDemo();
  const kycComplete = Object.values(kyc).every(Boolean);

  const trackerSteps = [
    { key: 'kyc', label: 'KYC', done: kycComplete, active: !kycComplete },
    { key: 'income', label: 'Income', done: loan.incomeVerified, active: kycComplete && !loan.incomeVerified },
    { key: 'apply', label: 'Apply', done: loan.approved, active: loan.incomeVerified && !loan.approved },
    { key: 'money', label: 'Money', done: loan.disbursed, active: loan.approved && !loan.disbursed },
  ];

  return (
    <LievScreen scroll={false} style={styles.wrap}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.appBar}>
          <View style={styles.appBarBrand}>
            <Text style={styles.appBarTitle}>{LievCopy.companyName}</Text>
            <Text style={styles.appBarCredit}>{LievCopy.designedBy}</Text>
          </View>
          <View style={styles.appBarRight}>
            <Pressable onPress={() => router.push('/notifications')}>
              <Ionicons name="notifications-outline" size={22} color={LievTheme.text} />
            </Pressable>
            <Pressable onPress={() => router.push('/help')}>
              <Ionicons name="help-circle-outline" size={22} color={LievTheme.text} />
            </Pressable>
          </View>
        </View>

        <LinearGradient colors={[...LievTheme.ctaGradient]} style={styles.creditCard}>
          {loan.disbursed ? (
            <>
              <Text style={styles.cardLabel}>{t(lang, 'homeOutstanding')}</Text>
              <Text style={styles.cardAmount}>{formatINR(outstandingBalance)}</Text>
              <Text style={styles.cardSub}>
                EMI {formatINR(emi)} • Due {nextEmiDue ? formatDate(nextEmiDue) : '—'}
              </Text>
              <Pressable style={styles.cardCta} onPress={() => router.push('/(tabs)/pay')}>
                <Text style={styles.cardCtaText}>{t(lang, 'payEmi')}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardLabel}>{t(lang, 'homePreApproved')}</Text>
              <Text style={styles.cardAmount}>{formatINR(500000)}</Text>
              <Text style={styles.cardSub}>Personal Loan • 10 min disbursal</Text>
              <Pressable
                style={styles.cardCta}
                onPress={() =>
                  router.push(
                    !kycComplete ? '/kyc/aadhaar' : !loan.incomeVerified ? '/apply/income' : '/apply',
                  )
                }>
                <Text style={styles.cardCtaText}>
                  {!kycComplete
                    ? t(lang, 'completeKyc')
                    : !loan.incomeVerified
                      ? 'Verify Income'
                      : t(lang, 'applyNow')}
                </Text>
              </Pressable>
            </>
          )}
        </LinearGradient>

        <View style={styles.services}>
          {SERVICES.map((s) => (
            <Pressable key={s.label} style={styles.service} onPress={() => router.push(s.route as never)}>
              <View style={styles.serviceIcon}>
                <Ionicons name={s.icon} size={22} color={LievTheme.brandDark} />
              </View>
              <Text style={styles.serviceLabel}>{s.label}</Text>
            </Pressable>
          ))}
        </View>

        {showPoMetrics ? (
          <>
            <Text style={styles.metricsTitle}>{t(lang, 'productMetrics')}</Text>
            <View style={styles.metricsRow}>
              <LievMetricCard {...PRODUCT_METRICS.activation} />
              <LievMetricCard {...PRODUCT_METRICS.engagement} />
            </View>
            <View style={styles.metricsRow}>
              <LievMetricCard {...PRODUCT_METRICS.retention} />
              <LievMetricCard {...PRODUCT_METRICS.nachSuccess} />
            </View>
          </>
        ) : null}

        <LievCard style={styles.trackerCard}>
          <Text style={styles.trackerTitle}>Application Status</Text>
          <StepTracker steps={trackerSteps} />
        </LievCard>

        {loan.disbursed && nextEmiDue ? (
          <LievCard>
            <View style={styles.emiRow}>
              <View>
                <Text style={styles.emiLabel}>Upcoming EMI</Text>
                <Text style={styles.emiDate}>{formatDate(nextEmiDue)}</Text>
              </View>
              <View style={styles.emiRight}>
                <Text style={styles.emiAmount}>{formatINR(emi)}</Text>
                <LievStatusBadge label="AutoPay ON" status="success" />
              </View>
            </View>
          </LievCard>
        ) : null}

        <LievCard style={styles.promoCard}>
          <Text style={styles.promoTag}>NEW</Text>
          <Text style={styles.promoTitle}>Shop Now Pay Later</Text>
          <Text style={styles.promoSub}>0% interest for 15 days at partner stores</Text>
          <Pressable onPress={() => router.push('/(tabs)/bnpl')}>
            <Text style={styles.promoLink}>Explore BNPL →</Text>
          </Pressable>
        </LievCard>

        <BrandMark variant="footer" style={styles.footerBrand} />
      </ScrollView>
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 0, paddingTop: 0 },
  scroll: { paddingBottom: 24 },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: LievTheme.surface,
  },
  appBarBrand: { flex: 1 },
  appBarTitle: { fontSize: 15, fontWeight: '800', color: LievTheme.primary },
  appBarCredit: { fontSize: 10, fontWeight: '600', color: LievTheme.textMuted, marginTop: 2 },
  appBarRight: { flexDirection: 'row', gap: 16 },
  creditCard: { marginHorizontal: 20, marginTop: 12, borderRadius: 16, padding: 20 },
  cardLabel: { fontSize: 13, color: 'rgba(26,26,46,0.7)', fontWeight: '600' },
  cardAmount: { fontSize: 36, fontWeight: '900', color: LievTheme.primary, marginVertical: 4 },
  cardSub: { fontSize: 13, color: 'rgba(26,26,46,0.65)', marginBottom: 16 },
  cardCta: {
    backgroundColor: LievTheme.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardCtaText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  service: { alignItems: 'center', gap: 6 },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: LievTheme.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceLabel: { fontSize: 11, fontWeight: '600', color: LievTheme.text },
  metricsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: LievTheme.textMuted,
    marginHorizontal: 20,
    marginTop: 12,
  },
  metricsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 8 },
  trackerCard: { marginHorizontal: 20, marginTop: 12 },
  trackerTitle: { fontSize: 14, fontWeight: '700', color: LievTheme.text, marginBottom: 8 },
  emiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  emiLabel: { fontSize: 12, color: LievTheme.textMuted, fontWeight: '600' },
  emiDate: { fontSize: 16, fontWeight: '800', color: LievTheme.text, marginTop: 2 },
  emiRight: { alignItems: 'flex-end', gap: 4 },
  emiAmount: { fontSize: 18, fontWeight: '800', color: LievTheme.primary },
  promoCard: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: LievTheme.accentLight,
    borderColor: LievTheme.accent,
  },
  promoTag: {
    fontSize: 10,
    fontWeight: '800',
    color: LievTheme.accent,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  promoTitle: { fontSize: 16, fontWeight: '800', color: LievTheme.text },
  promoSub: { fontSize: 13, color: LievTheme.textMuted, marginTop: 4 },
  promoLink: { fontSize: 14, fontWeight: '700', color: LievTheme.accent, marginTop: 10 },
  footerBrand: { marginTop: 16, marginHorizontal: 20 },
});
