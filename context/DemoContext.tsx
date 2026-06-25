import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import {
  buildEmiSchedule,
  type EmiScheduleItem,
  type PaymentReceipt,
} from '@/lib/demo-data';
import type { Lang } from '@/lib/i18n';

export type AppPhase = 'welcome' | 'login' | 'kyc' | 'apply' | 'active';

export type DemoPreset =
  | 'welcome'
  | 'login'
  | 'kyc-aadhaar'
  | 'kyc-progress'
  | 'home-preapproved'
  | 'home-active'
  | 'apply'
  | 'approval'
  | 'repay'
  | 'bnpl'
  | 'declined';

export type KycStatus = {
  aadhaar: boolean;
  ckyc: boolean;
  pan: boolean;
  video: boolean;
  bureau: boolean;
};

export type LoanState = {
  amount: number;
  tenure: number;
  rate: number;
  approved: boolean;
  disbursed: boolean;
  enachSetup: boolean;
  loanId: string | null;
  kfsAccepted: boolean;
  incomeVerified: boolean;
  bankLinked: boolean;
  underwriting: 'pending' | 'approved' | 'declined' | 'review';
};

export type IncomeProfile = {
  type: 'salaried' | 'self-employed';
  employer: string;
  monthlyIncome: number;
};

export type BankProfile = {
  bankId: string;
  bankName: string;
  accountLast4: string;
  holderName: string;
};

type DemoContextValue = {
  phase: AppPhase;
  setPhase: (phase: AppPhase) => void;
  isLoggedIn: boolean;
  login: (phone: string) => void;
  kyc: KycStatus;
  completeKycStep: (step: keyof KycStatus) => void;
  loan: LoanState;
  updateLoan: (patch: Partial<LoanState>) => void;
  income: IncomeProfile | null;
  setIncome: (profile: IncomeProfile) => void;
  bank: BankProfile | null;
  setBank: (profile: BankProfile) => void;
  emi: number;
  emiSchedule: EmiScheduleItem[];
  payments: PaymentReceipt[];
  outstandingBalance: number;
  markEmiPaid: (method: string) => void;
  initScheduleOnDisburse: () => void;
  nextEmiDue: string | null;
  resetDemo: () => void;
  loadPreset: (preset: DemoPreset) => void;
  phone: string;
  lang: Lang;
  toggleLang: () => void;
  showPoMetrics: boolean;
  setShowPoMetrics: (show: boolean) => void;
};

const defaultKyc: KycStatus = {
  aadhaar: false,
  ckyc: false,
  pan: false,
  video: false,
  bureau: false,
};

const fullKyc: KycStatus = {
  aadhaar: true,
  ckyc: true,
  pan: true,
  video: true,
  bureau: true,
};

const defaultLoan: LoanState = {
  amount: 150000,
  tenure: 12,
  rate: 14.5,
  approved: false,
  disbursed: false,
  enachSetup: false,
  loanId: null,
  kfsAccepted: false,
  incomeVerified: false,
  bankLinked: false,
  underwriting: 'pending',
};

const activeLoan: LoanState = {
  amount: 150000,
  tenure: 12,
  rate: 14.5,
  approved: true,
  disbursed: true,
  enachSetup: true,
  loanId: 'VAIDIK-PL-2026-88421',
  kfsAccepted: true,
  incomeVerified: true,
  bankLinked: true,
  underwriting: 'approved',
};

const defaultBank: BankProfile = {
  bankId: 'hdfc',
  bankName: 'HDFC Bank',
  accountLast4: '4521',
  holderName: 'Abhishek Kumar',
};

const defaultIncome: IncomeProfile = {
  type: 'salaried',
  employer: 'Infosys Ltd',
  monthlyIncome: 85000,
};

const DemoContext = createContext<DemoContextValue | null>(null);

function makeSchedule(amount: number, rate: number, tenure: number, firstPaid = false): EmiScheduleItem[] {
  const { schedule } = buildEmiSchedule(amount, rate, tenure);
  return schedule.map((item, index) => ({
    ...item,
    status:
      firstPaid && index === 0
        ? 'paid'
        : firstPaid && index === 1
          ? 'due'
          : index === 0
            ? 'due'
            : 'upcoming',
  })) as EmiScheduleItem[];
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [kyc, setKyc] = useState<KycStatus>(defaultKyc);
  const [loan, setLoan] = useState<LoanState>(defaultLoan);
  const [income, setIncomeState] = useState<IncomeProfile | null>(null);
  const [bank, setBankState] = useState<BankProfile | null>(null);
  const [emiSchedule, setEmiSchedule] = useState<EmiScheduleItem[]>([]);
  const [payments, setPayments] = useState<PaymentReceipt[]>([]);
  const [lang, setLang] = useState<Lang>('en');
  const [showPoMetrics, setShowPoMetrics] = useState(true);

  const { emi } = useMemo(
    () => buildEmiSchedule(loan.amount, loan.rate, loan.tenure),
    [loan.amount, loan.rate, loan.tenure],
  );

  const outstandingBalance = useMemo(() => {
    const paidPrincipal = emiSchedule
      .filter((s) => s.status === 'paid')
      .reduce((sum, s) => sum + s.principal, 0);
    return Math.max(0, loan.amount - paidPrincipal);
  }, [emiSchedule, loan.amount]);

  const nextEmiDue = useMemo(() => {
    const due = emiSchedule.find((s) => s.status === 'due');
    return due?.dueDate ?? null;
  }, [emiSchedule]);

  const login = useCallback((nextPhone: string) => {
    setPhone(nextPhone);
    setIsLoggedIn(true);
    setPhase('kyc');
  }, []);

  const completeKycStep = useCallback((step: keyof KycStatus) => {
    setKyc((prev) => ({ ...prev, [step]: true }));
  }, []);

  const updateLoan = useCallback((patch: Partial<LoanState>) => {
    setLoan((prev) => ({ ...prev, ...patch }));
  }, []);

  const setIncome = useCallback((profile: IncomeProfile) => {
    setIncomeState(profile);
    setLoan((prev) => ({ ...prev, incomeVerified: true }));
  }, []);

  const setBank = useCallback((profile: BankProfile) => {
    setBankState(profile);
    setLoan((prev) => ({ ...prev, bankLinked: true }));
  }, []);

  const initScheduleOnDisburse = useCallback(() => {
    setEmiSchedule(makeSchedule(loan.amount, loan.rate, loan.tenure));
  }, [loan.amount, loan.rate, loan.tenure]);

  const markEmiPaid = (method: string) => {
    setEmiSchedule((prev) => {
      const dueIndex = prev.findIndex((s) => s.status === 'due');
      if (dueIndex < 0) return prev;
      const next = prev.map((item, i) => {
        if (i === dueIndex) return { ...item, status: 'paid' as const };
        if (i === dueIndex + 1) return { ...item, status: 'due' as const };
        return item;
      });
      const paid = prev[dueIndex];
      setPayments((p) => [
        {
          id: `PAY-${Date.now()}`,
          installment: paid.installment,
          amount: paid.emi,
          method,
          date: new Date().toISOString(),
          ref: `VAIDIK${method.toUpperCase()}${paid.installment}99001`,
        },
        ...p,
      ]);
      return next;
    });
  };

  const resetAll = () => {
    setPhase('welcome');
    setIsLoggedIn(false);
    setPhone('');
    setKyc(defaultKyc);
    setLoan(defaultLoan);
    setIncomeState(null);
    setBankState(null);
    setEmiSchedule([]);
    setPayments([]);
  };

  const resetDemo = () => {
    resetAll();
  };

  const loadPreset = (preset: DemoPreset) => {
    switch (preset) {
      case 'welcome':
        resetAll();
        break;
      case 'login':
        resetAll();
        setPhase('login');
        break;
      case 'kyc-aadhaar':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(defaultKyc);
        setLoan(defaultLoan);
        setIncomeState(null);
        setBankState(null);
        setEmiSchedule([]);
        setPayments([]);
        setPhase('kyc');
        break;
      case 'kyc-progress':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc({ aadhaar: true, ckyc: true, pan: false, video: false, bureau: false });
        setLoan(defaultLoan);
        setIncomeState(null);
        setBankState(null);
        setEmiSchedule([]);
        setPayments([]);
        setPhase('kyc');
        break;
      case 'home-preapproved':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(fullKyc);
        setLoan({ ...defaultLoan, incomeVerified: true });
        setIncomeState(defaultIncome);
        setBankState(null);
        setEmiSchedule([]);
        setPayments([]);
        setPhase('active');
        break;
      case 'home-active':
      case 'repay':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(fullKyc);
        setLoan(activeLoan);
        setIncomeState(defaultIncome);
        setBankState(defaultBank);
        setEmiSchedule(makeSchedule(activeLoan.amount, activeLoan.rate, activeLoan.tenure));
        setPayments([]);
        setPhase('active');
        break;
      case 'apply':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(fullKyc);
        setLoan({ ...defaultLoan, incomeVerified: true });
        setIncomeState(defaultIncome);
        setBankState(null);
        setEmiSchedule([]);
        setPayments([]);
        setPhase('apply');
        break;
      case 'approval':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(fullKyc);
        setLoan({
          ...defaultLoan,
          approved: true,
          incomeVerified: true,
          loanId: 'VAIDIK-PL-2026-88421',
          underwriting: 'approved',
        });
        setIncomeState(defaultIncome);
        setBankState(null);
        setEmiSchedule([]);
        setPayments([]);
        setPhase('apply');
        break;
      case 'declined':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(fullKyc);
        setLoan({
          ...defaultLoan,
          incomeVerified: true,
          underwriting: 'declined',
        });
        setIncomeState(defaultIncome);
        setBankState(null);
        setEmiSchedule([]);
        setPayments([]);
        setPhase('apply');
        break;
      case 'bnpl':
        setPhone('9876543210');
        setIsLoggedIn(true);
        setKyc(fullKyc);
        setLoan(activeLoan);
        setIncomeState(defaultIncome);
        setBankState(defaultBank);
        setEmiSchedule(makeSchedule(activeLoan.amount, activeLoan.rate, activeLoan.tenure));
        setPayments([]);
        setPhase('active');
        break;
      default: {
        const _exhaustive: never = preset;
        return _exhaustive;
      }
    }
  };

  const toggleLang = () => {
    setLang((l) => (l === 'en' ? 'hi' : 'en'));
  };

  const value: DemoContextValue = {
    phase,
    setPhase,
    isLoggedIn,
    login,
    kyc,
    completeKycStep,
    loan,
    updateLoan,
    income,
    setIncome,
    bank,
    setBank,
    emi,
    emiSchedule,
    payments,
    outstandingBalance,
    markEmiPaid,
    initScheduleOnDisburse,
    nextEmiDue,
    resetDemo,
    loadPreset,
    phone,
    lang,
    toggleLang,
    showPoMetrics,
    setShowPoMetrics,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return ctx;
}
