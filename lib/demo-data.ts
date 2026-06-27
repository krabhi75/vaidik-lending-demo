import { calculateEmi, formatDate, formatINR } from './format';

export const DEMO_USER = {
  name: 'Abhishek Kumar',
  phone: '9876543210',
  email: 'abhishek@example.com',
  pan: 'ABCPK1234D',
  aadhaarMasked: 'XXXX-XXXX-4521',
  creditScore: 742,
  address: 'Patna, Bihar 800001',
};

export const LOAN_PRODUCTS = [
  {
    id: 'personal',
    title: 'Instant Personal Loan',
    min: 10000,
    max: 500000,
    rate: 14.5,
    tenureOptions: [6, 12, 18, 24, 36],
  },
  {
    id: 'bnpl',
    title: 'Shop Now Pay Later',
    min: 1000,
    max: 50000,
    rate: 0,
    tenureOptions: [1, 2, 3],
    description: '0% interest for 15 days on partner merchants',
  },
];

export const BNPL_MERCHANTS = [
  { id: '1', name: 'Flipkart', category: 'E-commerce', limit: 25000 },
  { id: '2', name: 'Amazon', category: 'E-commerce', limit: 30000 },
  { id: '3', name: 'Swiggy', category: 'Food', limit: 5000 },
  { id: '4', name: 'MakeMyTrip', category: 'Travel', limit: 40000 },
];

export function buildEmiSchedule(principal: number, rate: number, months: number) {
  const emi = calculateEmi(principal, rate, months);
  const schedule = [];
  let balance = principal;
  const start = new Date();

  for (let i = 1; i <= months; i += 1) {
    const interest = Math.round(balance * (rate / 12 / 100));
    const principalPart = emi - interest;
    balance = Math.max(0, balance - principalPart);
    const due = new Date(start);
    due.setMonth(due.getMonth() + i);
    schedule.push({
      installment: i,
      emi,
      principal: principalPart,
      interest,
      dueDate: due.toISOString(),
      status: i === 1 ? 'due' : 'upcoming',
    });
  }

  return { emi, schedule };
}

export const PRODUCT_METRICS = {
  activation: { label: 'KYC → First Loan', value: '68%', trend: '+4.2%', icon: '🚀' },
  engagement: { label: 'D7 Repayment Open', value: '54%', trend: '+2.1%', icon: '📲' },
  retention: { label: 'M3 Repeat Borrow', value: '31%', trend: '+1.8%', icon: '🔁' },
  nachSuccess: { label: 'NACH Success Rate', value: '92%', trend: '+0.6%', icon: '✅' },
};

export type EmiStatus = 'due' | 'upcoming' | 'paid';

export type EmiScheduleItem = {
  installment: number;
  emi: number;
  principal: number;
  interest: number;
  dueDate: string;
  status: EmiStatus;
};

export type PaymentReceipt = {
  id: string;
  installment: number;
  amount: number;
  method: string;
  date: string;
  ref: string;
};

export const BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', icon: '🏦' },
  { id: 'icici', name: 'ICICI Bank', icon: '🏦' },
  { id: 'sbi', name: 'State Bank of India', icon: '🏦' },
  { id: 'axis', name: 'Axis Bank', icon: '🏦' },
];

export function buildDemoNotifications(
  emi: number,
  nextEmiDue: string | null,
  loanDisbursed: boolean,
) {
  const dueLabel = nextEmiDue ? formatDate(nextEmiDue) : 'soon';
  return [
    {
      id: '1',
      title: 'EMI due in 3 days',
      body: `${formatINR(emi)} due on ${dueLabel}. Pay early to avoid late fee.`,
      time: '2h ago',
      read: false,
      type: 'reminder' as const,
    },
    ...(loanDisbursed
      ? [
          {
            id: '2',
            title: 'Loan disbursed successfully',
            body: '₹1,50,000 credited to HDFC •••• 4521. UTR: VAIDIKIMPS88421',
            time: '1d ago',
            read: true,
            type: 'success' as const,
          },
        ]
      : []),
    {
      id: '3',
      title: 'Pre-approved limit increased',
      body: 'Your credit line is now ₹5,00,000 based on repayment behaviour.',
      time: '3d ago',
      read: true,
      type: 'offer' as const,
    },
  ];
}

export const DEMO_NOTIFICATIONS = buildDemoNotifications(13542, null, true);

export const HELP_FAQ = [
  {
    q: 'How long does disbursement take?',
    a: 'Verified users receive funds in 10 minutes via IMPS after eNACH setup.',
  },
  {
    q: 'What is cooling-off period?',
    a: 'RBI mandates 3-day window to cancel loan without penalty after disbursement.',
  },
  {
    q: 'Can I prepay my loan?',
    a: 'Yes, after 6 EMIs with 2% prepayment fee. Use Foreclose option in My Loans.',
  },
  {
    q: 'Who is the lender?',
    a: 'Loans are disbursed by our RBI-registered NBFC partner. Vaidik is the LSP.',
  },
];
