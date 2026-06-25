import { StyleSheet, Text, View } from 'react-native';

import { LievTheme } from '@/constants/theme';

type Step = {
  key: string;
  label: string;
  done: boolean;
  active: boolean;
};

type Props = {
  steps: Step[];
};

/** Horizontal step tracker — KreditBee / Cashe style application progress. */
export function StepTracker({ steps }: Props) {
  return (
    <View style={styles.wrap}>
      {steps.map((step, index) => (
        <View key={step.key} style={styles.stepCol}>
          <View style={styles.row}>
            <View
              style={[
                styles.dot,
                step.done && styles.dotDone,
                step.active && styles.dotActive,
              ]}>
              {step.done ? (
                <Text style={styles.check}>✓</Text>
              ) : (
                <Text style={[styles.num, step.active && styles.numActive]}>
                  {index + 1}
                </Text>
              )}
            </View>
            {index < steps.length - 1 ? (
              <View style={[styles.line, step.done && styles.lineDone]} />
            ) : null}
          </View>
          <Text
            style={[styles.label, step.active && styles.labelActive]}
            numberOfLines={2}>
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  stepCol: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: LievTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotDone: {
    backgroundColor: LievTheme.success,
  },
  dotActive: {
    backgroundColor: LievTheme.brand,
  },
  check: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  num: {
    fontSize: 12,
    fontWeight: '700',
    color: LievTheme.textMuted,
  },
  numActive: {
    color: LievTheme.primary,
  },
  line: {
    position: 'absolute',
    left: '55%',
    right: '-45%',
    height: 2,
    backgroundColor: LievTheme.border,
    top: 13,
  },
  lineDone: {
    backgroundColor: LievTheme.success,
  },
  label: {
    fontSize: 10,
    color: LievTheme.textMuted,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
  },
  labelActive: {
    color: LievTheme.text,
    fontWeight: '700',
  },
});
