import { StyleSheet, Text, View } from 'react-native';

import { LievCard } from '@/components/liev/Card';
import { LievScreen } from '@/components/liev/Screen';
import { LievTheme } from '@/constants/theme';

const COMPLIANCE_ITEMS = [
  {
    title: 'RBI Digital Lending Guidelines (2022)',
    points: [
      'Lending only via RBI-registered NBFC entity',
      'Key Fact Statement (KFS) shared before disbursement',
      'Cooling-off period of 3 days for loan cancellation',
      'No automatic credit limit increase without consent',
      'Grievance redressal officer contact displayed in-app',
    ],
  },
  {
    title: 'KYC / AML Compliance',
    points: [
      'CKYC integration with CERSAI registry',
      'Aadhaar OTP eKYC via licensed KYC service provider',
      'Video KYC (V-CIP) for high-value loans per RBI norms',
      'PAN validation via NSDL',
      'AML screening before disbursement',
    ],
  },
  {
    title: 'Payment & Collection',
    points: [
      'UPI repayments via PCI-DSS compliant payment aggregator',
      'eNACH mandate registration via NPCI',
      'No access to contacts, gallery, or location without purpose',
      'Transparent APR disclosure including processing fees',
      'Fair Practices Code adherence for collections',
    ],
  },
  {
    title: 'Data Privacy',
    points: [
      'Explicit consent before bureau credit pull',
      'Data encrypted in transit (TLS 1.3) and at rest',
      'DPDP Act 2023 compliant privacy policy',
      'Right to data erasure post loan closure',
    ],
  },
];

export default function ComplianceScreen() {
  return (
    <LievScreen
      title="RBI Compliance"
      subtitle="Regulatory framework governing Vaidik Mobile App's consumer lending product.">
      {COMPLIANCE_ITEMS.map((section) => (
        <LievCard key={section.title}>
          <Text style={styles.title}>{section.title}</Text>
          {section.points.map((point) => (
            <View key={point} style={styles.bullet}>
              <Text style={styles.dot}>✓</Text>
              <Text style={styles.point}>{point}</Text>
            </View>
          ))}
        </LievCard>
      ))}

      <LievCard>
        <Text style={styles.grievanceTitle}>Grievance Redressal</Text>
        <Text style={styles.grievance}>
          Grievance Officer: grievance@vaidik.in{'\n'}
          RBI Ombudsman: https://cms.rbi.org.in{'\n'}
          Response SLA: 7 working days
        </Text>
      </LievCard>
    </LievScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: LievTheme.primary,
    marginBottom: 10,
  },
  bullet: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  dot: {
    color: LievTheme.success,
    fontWeight: '700',
    fontSize: 14,
  },
  point: {
    fontSize: 13,
    color: LievTheme.textMuted,
    flex: 1,
    lineHeight: 18,
  },
  grievanceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: LievTheme.text,
    marginBottom: 8,
  },
  grievance: {
    fontSize: 13,
    color: LievTheme.textMuted,
    lineHeight: 20,
  },
});
