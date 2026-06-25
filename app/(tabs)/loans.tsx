import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { formatDate, formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

export default function LoansScreen() {
  const { loan, emi, emiSchedule, outstandingBalance } = useDemo();
  const [showForeclose, setShowForeclose] = useState(false);

  const foreclosureFee = Math.round(outstandingBalance * 0.02);
  const foreclosureTotal = outstandingBalance + foreclosureFee;

  if (!loan.disbursed) {
    return (
      <LievScreen title="My Loans" subtitle="No active loans yet.">
        <LievCard>
          <Text style={styles.empty}>Apply for a personal loan to see your EMI schedule here.</Text>
        </LievCard>
      </LievScreen>
    );
  }

  const schedule = emiSchedule.length > 0 ? emiSchedule : [];

  return (
    <LievScreen
      title="My Loans"
      subtitle="Loan details, EMI schedule, and billing history."
      footer={
        <LievButton
          label={showForeclose ? 'Hide Foreclosure' : 'Prepay / Foreclose Loan'}
          variant="outline"
          onPress={() => setShowForeclose((v) => !v)}
        />
      }>
      <LievCard highlight>
        <Text style={styles.loanId}>{loan.loanId}</Text>
        <Text style={styles.principal}>{formatINR(outstandingBalance)}</Text>
        <Text style={styles.meta}>
          Outstanding • {loan.rate}% p.a. • EMI {formatINR(emi)}
        </Text>
        <LievStatusBadge label="Active" status="success" />
      </LievCard>

      {showForeclose ? (
        <LievCard style={styles.forecloseCard}>
          <Text style={styles.forecloseTitle}>Foreclosure Calculator</Text>
          <Row label="Outstanding Principal" value={formatINR(outstandingBalance)} />
          <Row label="Foreclosure Fee (2%)" value={formatINR(foreclosureFee)} />
          <Row label="Total Payable" value={formatINR(foreclosureTotal)} bold />
          <Text style={styles.forecloseNote}>
            Available after 6 EMIs per policy. Pay via UPI on Pay tab.
          </Text>
        </LievCard>
      ) : null}

      <Text style={styles.section}>EMI Schedule</Text>
      {schedule.map((item) => (
        <LievCard key={item.installment} style={styles.emiCard}>
          <View style={styles.emiRow}>
            <View>
              <Text style={styles.emiNum}>EMI #{item.installment}</Text>
              <Text style={styles.emiDate}>{formatDate(item.dueDate)}</Text>
            </View>
            <View style={styles.emiRight}>
              <Text style={styles.emiAmount}>{formatINR(item.emi)}</Text>
              <LievStatusBadge
                label={
                  item.status === 'paid' ? 'Paid' : item.status === 'due' ? 'Due' : 'Upcoming'
                }
                status={
                  item.status === 'paid' ? 'success' : item.status === 'due' ? 'warning' : 'pending'
                }
              />
            </View>
          </View>
          <View style={styles.breakdown}>
            <Text style={styles.breakdownText}>
              Principal {formatINR(item.principal)} • Interest {formatINR(item.interest)}
            </Text>
          </View>
        </LievCard>
      ))}

      <LievCard>
        <Text style={styles.kfsTitle}>Key Fact Statement</Text>
        <Text style={styles.kfs}>
          Total interest payable over tenure: approx. {formatINR(emi * loan.tenure - loan.amount)}.
          Prepayment allowed after 6 EMIs with 2% fee. Foreclosure charges as per RBI guidelines.
          KFS signed via Aadhaar eSign on {formatDate(new Date().toISOString())}.
        </Text>
      </LievCard>
    </LievScreen>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.rowBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    fontSize: 14,
    color: LievTheme.textMuted,
    lineHeight: 20,
    textAlign: 'center',
    paddingVertical: 20,
  },
  loanId: { fontSize: 12, color: LievTheme.textMuted, fontWeight: '600' },
  principal: { fontSize: 32, fontWeight: '900', color: LievTheme.primary, marginVertical: 4 },
  meta: { fontSize: 14, color: LievTheme.textMuted, marginBottom: 10 },
  forecloseCard: { backgroundColor: LievTheme.brandLight },
  forecloseTitle: { fontSize: 15, fontWeight: '800', color: LievTheme.text, marginBottom: 8 },
  forecloseNote: { fontSize: 12, color: LievTheme.textMuted, marginTop: 8, lineHeight: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  rowLabel: { fontSize: 13, color: LievTheme.textMuted },
  rowValue: { fontSize: 13, fontWeight: '700', color: LievTheme.text },
  rowBold: { fontSize: 15, fontWeight: '900', color: LievTheme.primary },
  section: { fontSize: 16, fontWeight: '700', color: LievTheme.text },
  emiCard: { paddingVertical: 12 },
  emiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  emiNum: { fontSize: 15, fontWeight: '700', color: LievTheme.text },
  emiDate: { fontSize: 13, color: LievTheme.textMuted, marginTop: 2 },
  emiRight: { alignItems: 'flex-end', gap: 4 },
  emiAmount: { fontSize: 16, fontWeight: '800', color: LievTheme.primary },
  breakdown: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: LievTheme.border,
  },
  breakdownText: { fontSize: 12, color: LievTheme.textMuted },
  kfsTitle: { fontSize: 14, fontWeight: '700', color: LievTheme.text, marginBottom: 6 },
  kfs: { fontSize: 13, color: LievTheme.textMuted, lineHeight: 18 },
});
