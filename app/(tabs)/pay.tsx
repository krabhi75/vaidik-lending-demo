import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { formatDate, formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: 'G' },
  { id: 'phonepe', name: 'PhonePe', icon: 'Pe' },
  { id: 'paytm', name: 'Paytm', icon: 'P' },
  { id: 'bhim', name: 'BHIM UPI', icon: 'B' },
];

export default function PayScreen() {
  const { loan, emi, bank, markEmiPaid, payments, nextEmiDue } = useDemo();
  const [method, setMethod] = useState<'upi' | 'nach'>('upi');
  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastRef, setLastRef] = useState('');

  const pay = () => {
    const app = UPI_APPS.find((a) => a.id === selectedUpi);
    setLoading(true);
    setTimeout(() => {
      const ref = markEmiPaid(app?.name ?? 'UPI');
      setLastRef(ref);
      setPaid(true);
      setLoading(false);
    }, 2000);
  };

  if (!loan.disbursed) {
    return (
      <LievScreen title="Repay" subtitle="No dues yet.">
        <LievCard>
          <Text style={styles.empty}>Disburse a loan first to see repayment options.</Text>
        </LievCard>
      </LievScreen>
    );
  }

  return (
    <LievScreen
      title="Repay EMI"
      subtitle="Pay via UPI (instant) or rely on eNACH auto-debit on due date."
      footer={
        !paid && method === 'upi' ? (
          <LievButton
            label="Pay via UPI"
            onPress={pay}
            loading={loading}
            disabled={!selectedUpi}
          />
        ) : undefined
      }>
      <LievCard highlight>
        <Text style={styles.dueLabel}>EMI Amount Due</Text>
        <Text style={styles.dueAmount}>{formatINR(emi)}</Text>
        <Text style={styles.loanRef}>Loan: {loan.loanId}</Text>
      </LievCard>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, method === 'upi' && styles.tabActive]}
          onPress={() => setMethod('upi')}>
          <Text style={[styles.tabText, method === 'upi' && styles.tabTextActive]}>UPI</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, method === 'nach' && styles.tabActive]}
          onPress={() => setMethod('nach')}>
          <Text style={[styles.tabText, method === 'nach' && styles.tabTextActive]}>eNACH</Text>
        </Pressable>
      </View>

      {method === 'upi' ? (
        <>
          <Text style={styles.section}>Select UPI App</Text>
          <View style={styles.upiGrid}>
            {UPI_APPS.map((app) => (
              <Pressable
                key={app.id}
                style={[styles.upiApp, selectedUpi === app.id && styles.upiAppSelected]}
                onPress={() => setSelectedUpi(app.id)}>
                <Text style={styles.upiIcon}>{app.icon}</Text>
                <Text style={styles.upiName}>{app.name}</Text>
              </Pressable>
            ))}
          </View>
          {paid ? (
            <LievCard highlight>
              <Text style={styles.paidIcon}>✅</Text>
              <Text style={styles.paidTitle}>Payment Successful</Text>
              <Text style={styles.utr}>UPI Ref: {lastRef}</Text>
              <Text style={styles.paidSub}>
                EMI marked paid. Check My Loans for updated schedule.
              </Text>
            </LievCard>
          ) : null}
        </>
      ) : (
        <LievCard>
          <View style={styles.nachRow}>
            <Text style={styles.nachLabel}>Mandate Status</Text>
            <LievStatusBadge
              label={loan.enachSetup ? 'Active' : 'Not Setup'}
              status={loan.enachSetup ? 'success' : 'warning'}
            />
          </View>
          {loan.enachSetup ? (
            <>
              <Row label="UMRN" value="HDFC0001234567890" />
              <Row label="Bank" value={`${bank?.bankName ?? 'HDFC'} •••• ${bank?.accountLast4 ?? '4521'}`} />
              <Row label="EMI Amount" value={formatINR(emi)} />
              <Row label="Next Debit" value={nextEmiDue ? formatDate(nextEmiDue) : '—'} />
              <Text style={styles.nachNote}>
                NPCI NACH will auto-debit on due date. UPI payment marks EMI as paid early.
              </Text>
            </>
          ) : (
            <Text style={styles.nachNote}>Setup eNACH during loan application for auto-debit.</Text>
          )}
        </LievCard>
      )}

      {payments.length > 0 ? (
        <>
          <Text style={styles.section}>Payment History</Text>
          {payments.map((p) => (
            <LievCard key={p.id} style={styles.historyCard}>
              <View style={styles.historyRow}>
                <Text style={styles.historyTitle}>EMI #{p.installment} Paid</Text>
                <Text style={styles.historyAmount}>{formatINR(p.amount)}</Text>
              </View>
              <Text style={styles.historyMeta}>
                {p.method} • {formatDate(p.date)} • {p.ref}
              </Text>
            </LievCard>
          ))}
        </>
      ) : null}

      <Text style={styles.gateway}>
        Payment gateway: Razorpay / Cashfree aggregator • PCI-DSS compliant
      </Text>
    </LievScreen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { fontSize: 14, color: LievTheme.textMuted, textAlign: 'center', paddingVertical: 20 },
  dueLabel: { fontSize: 13, color: LievTheme.textMuted, fontWeight: '600' },
  dueAmount: { fontSize: 36, fontWeight: '900', color: LievTheme.primary, marginVertical: 4 },
  loanRef: { fontSize: 12, color: LievTheme.textMuted },
  tabs: {
    flexDirection: 'row',
    backgroundColor: LievTheme.border,
    borderRadius: 12,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: LievTheme.surface },
  tabText: { fontSize: 14, fontWeight: '600', color: LievTheme.textMuted },
  tabTextActive: { color: LievTheme.primary },
  section: { fontSize: 15, fontWeight: '700', color: LievTheme.text },
  upiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  upiApp: {
    width: '47%',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: LievTheme.border,
    backgroundColor: LievTheme.surface,
    alignItems: 'center',
    gap: 6,
  },
  upiAppSelected: {
    borderColor: LievTheme.primary,
    borderWidth: 2,
    backgroundColor: LievTheme.accentLight,
  },
  upiIcon: { fontSize: 24, fontWeight: '900', color: LievTheme.primary },
  upiName: { fontSize: 13, fontWeight: '600', color: LievTheme.text },
  paidIcon: { fontSize: 40, textAlign: 'center' },
  paidTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: LievTheme.success,
    textAlign: 'center',
    marginTop: 8,
  },
  utr: { fontSize: 12, fontWeight: '700', color: LievTheme.textMuted, textAlign: 'center', marginTop: 6 },
  paidSub: { fontSize: 13, color: LievTheme.textMuted, textAlign: 'center', marginTop: 4 },
  nachRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nachLabel: { fontSize: 15, fontWeight: '700', color: LievTheme.text },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowLabel: { fontSize: 13, color: LievTheme.textMuted },
  rowValue: { fontSize: 13, fontWeight: '700', color: LievTheme.text },
  nachNote: { fontSize: 12, color: LievTheme.textMuted, lineHeight: 18, marginTop: 10 },
  historyCard: { paddingVertical: 10 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between' },
  historyTitle: { fontSize: 14, fontWeight: '700', color: LievTheme.text },
  historyAmount: { fontSize: 14, fontWeight: '800', color: LievTheme.primary },
  historyMeta: { fontSize: 11, color: LievTheme.textMuted, marginTop: 4 },
  gateway: { fontSize: 11, color: LievTheme.textMuted, textAlign: 'center', lineHeight: 16 },
});
