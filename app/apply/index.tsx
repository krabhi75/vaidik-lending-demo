import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { StepTracker } from '@/components/liev/StepTracker';
import { LievScreen } from '@/components/liev/Screen';
import { LievTheme } from '@/constants/theme';
import { LOAN_PRODUCTS } from '@/lib/demo-data';
import { calculateEmi, formatINR } from '@/lib/format';
import { useDemo } from '@/context/DemoContext';

export default function ApplyLoanScreen() {
  const { loan, updateLoan, resetApplicationState } = useDemo();
  const product = LOAN_PRODUCTS[0];
  const [amount, setAmount] = useState(loan.amount);
  const [tenure, setTenure] = useState(loan.tenure);

  const emi = calculateEmi(amount, product.rate, tenure);

  const submit = () => {
    resetApplicationState();
    updateLoan({
      amount,
      tenure,
      rate: product.rate,
      approved: false,
      disbursed: false,
      enachSetup: false,
      kfsAccepted: false,
      bankLinked: false,
      loanId: null,
      underwriting: 'pending',
    });
    router.push('/apply/approval');
  };

  return (
    <LievScreen
      title="Personal Loan"
      subtitle="Choose amount and tenure. Instant approval for verified users."
      footer={<LievButton label="Check Offer" onPress={submit} />}>
      <StepTracker
        steps={[
          { key: '1', label: 'Amount', done: true, active: true },
          { key: '2', label: 'Review', done: false, active: false },
          { key: '3', label: 'Sign', done: false, active: false },
          { key: '4', label: 'Money', done: false, active: false },
        ]}
      />

      <LievCard highlight>
        <Text style={styles.preApproved}>Pre-approved limit</Text>
        <Text style={styles.limit}>{formatINR(product.max)}</Text>
      </LievCard>

      <LievCard>
        <Text style={styles.label}>I need</Text>
        <Text style={styles.amount}>{formatINR(amount)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={product.min}
          maximumValue={product.max}
          step={5000}
          value={amount}
          onValueChange={setAmount}
          minimumTrackTintColor={LievTheme.brand}
          maximumTrackTintColor={LievTheme.border}
          thumbTintColor={LievTheme.brandDark}
        />
        <View style={styles.range}>
          <Text style={styles.rangeText}>{formatINR(product.min)}</Text>
          <Text style={styles.rangeText}>{formatINR(product.max)}</Text>
        </View>
      </LievCard>

      <LievCard>
        <Text style={styles.label}>For</Text>
        <View style={styles.chips}>
          {product.tenureOptions.map((months) => (
            <Pressable
              key={months}
              onPress={() => setTenure(months)}
              style={[styles.chip, tenure === months && styles.chipActive]}>
              <Text style={[styles.chipText, tenure === months && styles.chipTextActive]}>
                {months} months
              </Text>
            </Pressable>
          ))}
        </View>
      </LievCard>

      <LievCard style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Monthly EMI</Text>
          <Text style={styles.summaryValue}>{formatINR(emi)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Interest Rate</Text>
          <Text style={styles.summaryValue}>{product.rate}% p.a.</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Processing Fee</Text>
          <Text style={styles.summaryValue}>₹999 + GST</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.totalValue}>{formatINR(emi * tenure)}</Text>
        </View>
      </LievCard>

      <Text style={styles.disclosure}>
        Key Fact Statement shared before signing. 3-day cooling-off period per RBI norms.
      </Text>
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  preApproved: {
    fontSize: 12,
    color: LievTheme.textMuted,
    fontWeight: '600',
  },
  limit: {
    fontSize: 28,
    fontWeight: '900',
    color: LievTheme.primary,
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: LievTheme.textMuted,
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: '900',
    color: LievTheme.text,
    marginBottom: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: 11,
    color: LievTheme.textMuted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LievTheme.border,
    backgroundColor: LievTheme.background,
  },
  chipActive: {
    backgroundColor: LievTheme.brand,
    borderColor: LievTheme.brand,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: LievTheme.textMuted,
  },
  chipTextActive: {
    color: LievTheme.primary,
    fontWeight: '800',
  },
  summary: {
    backgroundColor: LievTheme.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: LievTheme.brand,
  },
  disclosure: {
    fontSize: 11,
    color: LievTheme.textMuted,
    lineHeight: 16,
  },
});
