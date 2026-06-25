import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LievButton } from '@/components/liev/Button';
import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievStatusBadge } from '@/components/liev/StatusBadge';
import { LievTheme } from '@/constants/theme';
import { BNPL_MERCHANTS } from '@/lib/demo-data';
import { formatINR } from '@/lib/format';

export default function BnplScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);

  const merchant = BNPL_MERCHANTS.find((m) => m.id === selected);

  return (
    <LievScreen
      title="Shop Now Pay Later"
      subtitle="Short-cycle credit at partner merchants. 0% interest for 15 days."
      footer={
        merchant && !activated ? (
          <LievButton
            label={`Activate BNPL at ${merchant.name}`}
            onPress={() => setActivated(true)}
          />
        ) : undefined
      }>
      <LievCard highlight>
        <Text style={styles.limitLabel}>BNPL Credit Line</Text>
        <Text style={styles.limit}>{formatINR(50000)}</Text>
        <Text style={styles.limitSub}>Pay in 3 interest-free EMIs at checkout</Text>
      </LievCard>

      <Text style={styles.section}>Partner Merchants</Text>
      {BNPL_MERCHANTS.map((m) => (
        <Pressable key={m.id} onPress={() => { setSelected(m.id); setActivated(false); }}>
          <LievCard
            style={
              selected === m.id
                ? { ...styles.merchant, ...styles.merchantSelected }
                : styles.merchant
            }>
            <View style={styles.merchantRow}>
              <View>
                <Text style={styles.merchantName}>{m.name}</Text>
                <Text style={styles.merchantCat}>{m.category}</Text>
              </View>
              <View style={styles.merchantRight}>
                <Text style={styles.merchantLimit}>Up to {formatINR(m.limit)}</Text>
                {selected === m.id && activated ? (
                  <LievStatusBadge label="Active" status="success" />
                ) : null}
              </View>
            </View>
          </LievCard>
        </Pressable>
      ))}

      {activated && merchant ? (
        <LievCard>
          <Text style={styles.checkoutTitle}>Checkout Simulation</Text>
          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutItem}>Order at {merchant.name}</Text>
            <Text style={styles.checkoutPrice}>{formatINR(12999)}</Text>
          </View>
          <View style={styles.emiPlan}>
            <Text style={styles.emiPlanTitle}>3x EMI Plan</Text>
            <Text style={styles.emiPlanValue}>{formatINR(4333)}/mo × 3</Text>
            <Text style={styles.emiPlanSub}>0% interest • First EMI in 15 days</Text>
          </View>
        </LievCard>
      ) : null}

      <Text style={styles.note}>
        BNPL is a short-cycle credit product. Underwriting uses real-time merchant
        risk scoring. Integrates with payment aggregator at checkout.
      </Text>
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  limitLabel: {
    fontSize: 13,
    color: LievTheme.textMuted,
    fontWeight: '600',
  },
  limit: {
    fontSize: 36,
    fontWeight: '900',
    color: LievTheme.primary,
    marginVertical: 4,
  },
  limitSub: {
    fontSize: 14,
    color: LievTheme.textMuted,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    color: LievTheme.text,
  },
  merchant: {
    marginBottom: 0,
  },
  merchantSelected: {
    borderColor: LievTheme.accent,
    borderWidth: 2,
  },
  merchantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '700',
    color: LievTheme.text,
  },
  merchantCat: {
    fontSize: 13,
    color: LievTheme.textMuted,
    marginTop: 2,
  },
  merchantRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  merchantLimit: {
    fontSize: 13,
    fontWeight: '600',
    color: LievTheme.primary,
  },
  checkoutTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: LievTheme.text,
    marginBottom: 10,
  },
  checkoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  checkoutItem: {
    fontSize: 14,
    color: LievTheme.textMuted,
  },
  checkoutPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: LievTheme.text,
  },
  emiPlan: {
    backgroundColor: LievTheme.accentLight,
    padding: 12,
    borderRadius: 10,
  },
  emiPlanTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: LievTheme.textMuted,
  },
  emiPlanValue: {
    fontSize: 20,
    fontWeight: '800',
    color: LievTheme.primary,
    marginVertical: 2,
  },
  emiPlanSub: {
    fontSize: 12,
    color: LievTheme.success,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: LievTheme.textMuted,
    lineHeight: 18,
  },
});
