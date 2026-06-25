import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/liev/BrandMark';
import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievCopy, LievTheme } from '@/constants/theme';
import { DEMO_USER } from '@/lib/demo-data';
import { useDemo } from '@/context/DemoContext';

export default function ProfileScreen() {
  const { kyc, loan, phone, resetDemo, lang, toggleLang, showPoMetrics, setShowPoMetrics, income, bank } =
    useDemo();

  const kycItems = [
    { key: 'aadhaar', label: 'Aadhaar eKYC', done: kyc.aadhaar },
    { key: 'ckyc', label: 'CKYC Registry', done: kyc.ckyc },
    { key: 'pan', label: 'PAN + Bureau', done: kyc.pan },
    { key: 'video', label: 'Video KYC', done: kyc.video },
    { key: 'bureau', label: 'Credit Bureau', done: kyc.bureau },
  ];

  return (
    <LievScreen title="Profile" subtitle="Account, KYC status, and compliance settings.">
      <LievCard>
        <Text style={styles.name}>{DEMO_USER.name}</Text>
        <Text style={styles.phone}>+91 {phone || DEMO_USER.phone}</Text>
        <Text style={styles.email}>{DEMO_USER.email}</Text>
        <LievStatusBadge
          label={kyc.video ? 'Fully Verified' : 'KYC Pending'}
          status={kyc.video ? 'success' : 'warning'}
        />
      </LievCard>

      <Text style={styles.section}>KYC Status</Text>
      {kycItems.map((item) => (
        <LievCard key={item.key} style={styles.kycItem}>
          <View style={styles.kycRow}>
            <Text style={styles.kycLabel}>{item.label}</Text>
            <LievStatusBadge
              label={item.done ? 'Verified' : 'Pending'}
              status={item.done ? 'success' : 'pending'}
            />
          </View>
        </LievCard>
      ))}

      <Text style={styles.section}>Integrations</Text>
      <LievCard>
        <IntegrationRow name="UIDAI Aadhaar" status="Connected" />
        <IntegrationRow name="CERSAI CKYC" status="Connected" />
        <IntegrationRow name="CIBIL Bureau" status="Connected" />
        <IntegrationRow name="Account Aggregator" status={loan.incomeVerified ? 'Verified' : 'Pending'} />
        <IntegrationRow name="Bank Account" status={bank ? `${bank.bankName} •••• ${bank.accountLast4}` : 'Pending'} />
        <IntegrationRow name="NPCI NACH" status={loan.enachSetup ? 'Active' : 'Pending'} />
        <IntegrationRow name="UPI / Payment Gateway" status="Razorpay" />
      </LievCard>

      {income ? (
        <LievCard>
          <Text style={styles.section}>Income Profile</Text>
          <IntegrationRow name="Type" status={income.type === 'salaried' ? 'Salaried' : 'Self Employed'} />
          <IntegrationRow name="Employer" status={income.employer} />
          <IntegrationRow name="Monthly Income" status={`₹${income.monthlyIncome.toLocaleString('en-IN')}`} />
        </LievCard>
      ) : null}

      <LievCard>
        <Pressable style={styles.toggleRow} onPress={toggleLang}>
          <Text style={styles.toggleLabel}>Language</Text>
          <Text style={styles.toggleValue}>{lang === 'en' ? 'English' : 'हिंदी'}</Text>
        </Pressable>
        <Pressable style={styles.toggleRow} onPress={() => setShowPoMetrics(!showPoMetrics)}>
          <Text style={styles.toggleLabel}>Show PO Metrics on Home</Text>
          <Text style={styles.toggleValue}>{showPoMetrics ? 'ON' : 'OFF'}</Text>
        </Pressable>
      </LievCard>

      <Pressable onPress={() => router.push('/compliance')}>
        <LievCard style={styles.linkCard}>
          <Text style={styles.linkText}>RBI Compliance & Disclosures →</Text>
        </LievCard>
      </Pressable>

      <LievButton
        label="Reset Demo"
        variant="outline"
        onPress={() => {
          resetDemo();
          router.replace('/');
        }}
      />

      <BrandMark variant="footer" />
      <Text style={styles.support}>Support: {LievCopy.support}</Text>
    </LievScreen>
  );
}

function IntegrationRow({ name, status }: { name: string; status: string }) {
  return (
    <View style={styles.intRow}>
      <Text style={styles.intName}>{name}</Text>
      <Text style={styles.intStatus}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: LievTheme.text,
  },
  phone: {
    fontSize: 15,
    color: LievTheme.textMuted,
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: LievTheme.textMuted,
    marginBottom: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    color: LievTheme.text,
    marginTop: 4,
  },
  kycItem: {
    paddingVertical: 12,
  },
  kycRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kycLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: LievTheme.text,
  },
  intRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: LievTheme.border,
  },
  intName: {
    fontSize: 14,
    color: LievTheme.text,
  },
  intStatus: {
    fontSize: 13,
    fontWeight: '700',
    color: LievTheme.accent,
  },
  linkCard: {
    backgroundColor: LievTheme.accentLight,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '700',
    color: LievTheme.primary,
  },
  footer: {
    fontSize: 11,
    color: LievTheme.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  support: {
    fontSize: 12,
    color: LievTheme.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: LievTheme.border,
  },
  toggleLabel: { fontSize: 14, color: LievTheme.text },
  toggleValue: { fontSize: 14, fontWeight: '700', color: LievTheme.accent },
});
