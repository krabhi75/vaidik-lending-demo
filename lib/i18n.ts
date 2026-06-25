export type Lang = 'en' | 'hi';

const strings = {
  en: {
    welcomeTitle: 'Get Personal Loan',
    welcomeAmount: 'up to ₹5 Lakhs',
    welcomeSub: 'Paperless • 10 min disbursal • No collateral',
    getStarted: 'Continue with Mobile Number',
    skipDemo: 'Skip to Demo Dashboard',
    demoPresets: 'Quick Demo States',
    homePreApproved: "You're Pre-approved for",
    homeOutstanding: 'Outstanding Loan',
    payEmi: 'Pay EMI Now',
    applyNow: 'Apply Now',
    completeKyc: 'Complete KYC',
    productMetrics: 'Product Metrics (PO View)',
    notifications: 'Notifications',
    help: 'Help & Support',
  },
  hi: {
    welcomeTitle: 'पर्सनल लोन पाएं',
    welcomeAmount: '₹5 लाख तक',
    welcomeSub: 'बिना कागज • 10 मिनट में राशि • कोई गिरवी नहीं',
    getStarted: 'मोबाइल नंबर से जारी रखें',
    skipDemo: 'डेमो डैशबोर्ड पर जाएं',
    demoPresets: 'त्वरित डेमो स्थिति',
    homePreApproved: 'आपके लिए प्री-अप्रूव्ड',
    homeOutstanding: 'बकाया लोन',
    payEmi: 'अभी EMI भुगतान',
    applyNow: 'अभी आवेदन करें',
    completeKyc: 'KYC पूरा करें',
    productMetrics: 'उत्पाद मेट्रिक्स (PO दृश्य)',
    notifications: 'सूचनाएं',
    help: 'सहायता और समर्थन',
  },
} as const;

export function t(lang: Lang, key: keyof (typeof strings)['en']): string {
  return strings[lang][key];
}
