# Google Stitch — Screen-wise Prompts
## Vaidik Mobile App (Consumer Lending Demo)

**App:** Vaidik Mobile App — Indian fintech personal loan + BNPL  
**Reference apps:** KreditBee, Moneyview, Navi, LazyPay  
**Frame:** Mobile iPhone/Android, 390×844px, portrait  
**Market:** India — UPI, Aadhaar, RBI compliance

---

## STEP 0 — Paste this GLOBAL STYLE first (every screen)

```
Design a mobile fintech lending app screen for the Indian market.

BRAND: "Vaidik Mobile App"
STYLE: Clean, modern, KreditBee-inspired. Premium but accessible.
COLORS:
- Primary dark: #1A1A2E (headers, text)
- Brand amber/gold CTA: #F5A623 gradient to #F7B731
- Success green: #00B894
- Background: #F7F8FA
- Cards: white #FFFFFF, rounded 16px, subtle border #E5E7EB
- Muted text: #6B7280

TYPOGRAPHY: Bold sans-serif (Inter/SF Pro style). Large rupee amounts in heavy weight.
BUTTONS: Full-width amber gradient pill buttons, dark text, 16px bold.
BADGES: Small rounded pills — green for success, amber for warning.
LAYOUT: Single column, 20px horizontal padding, safe area top/bottom.
TRUST: RBI registered NBFC partner, 4.5★ rating, security icons.
FOOTER CREDIT: "Designed by Abhishek Kumar" in small muted text.
Do NOT use stock photos. Use flat icons, simple illustrations, rupee symbol.
```

---

## SCREEN 1 — Welcome / Splash

```
[Use GLOBAL STYLE above]

Screen: Welcome / onboarding landing page for "Vaidik Mobile App"

CONTENT:
- Top: App logo "VAIDIK" in dark navy, bold letter-spacing
- Below logo: "4.5★ • 10M+ downloads" in small gray text
- Top-right: small "हिंदी" language toggle chip
- Hero center: Large gold circle with ₹ symbol inside
- Headline: "Get Personal Loan"
- Subheadline: "up to ₹5 Lakhs" in large amber/gold
- Tagline: "Paperless • 10 min disbursal • No collateral"
- Trust badges row: RBI Registered | 256-bit Secure | ISO Certified (3 small chips)
- Section "How it works" with 3 numbered steps:
  1. Register with mobile OTP
  2. KYC + Income (AA) verification
  3. KFS sign → eNACH → instant money
- Primary CTA button: "Continue with Mobile Number" (amber gradient, full width)
- Secondary button: "Skip to Demo Dashboard" (light amber background)
- Small link: "▼ Quick Demo States" in green
- Bottom footer: "Designed by Abhishek Kumar"

MOOD: Trustworthy, fast, aspirational. Like KreditBee welcome screen.
```

---

## SCREEN 2 — Login / OTP

```
[Use GLOBAL STYLE above]

Screen: Mobile OTP login for Indian fintech app

CONTENT:
- Back arrow "← Back" top left
- Title: "Enter Mobile Number"
- Subtitle: "We'll send a 6-digit OTP to verify your number"
- Phone input box: "+91 | 9876543210" in large text, white card with border
- Below: green checkmark "Valid Indian mobile number"
- OTP section (visible): 6 individual OTP boxes filled "4 8 2 9 1 0"
- Small text: "Resend OTP in 00:28"
- Consent checkbox checked: "I agree to credit bureau pull and RBI lending terms"
- Full-width amber button: "Verify OTP"
- Footer note: "By continuing you consent to CKYC, CIBIL soft pull per RBI norms"

NO header bar. Clean minimal form layout.
```

---

## SCREEN 3 — Aadhaar KYC (Step 1/5)

```
[Use GLOBAL STYLE above]

Screen: Aadhaar eKYC verification — step 1 of 5

HEADER: Back arrow + title "Verify Identity"
PROGRESS BAR: 20% filled, label "KYC Progress — Step 1 of 5"
BADGE: Blue/green pill "UIDAI Aadhaar OTP"

CONTENT:
- Card: "Enter Aadhaar Number"
- Input: "XXXX XXXX 4521" masked
- Info text: "OTP will be sent to Aadhaar-linked mobile"
- Integration callout box: "Powered by UIDAI • Licensed KUA"
- Illustration: simple Aadhaar card icon
- Button: "Send Aadhaar OTP" (amber, full width)

Show step indicator dots at bottom: ● ○ ○ ○ ○
```

---

## SCREEN 4 — CKYC (Step 2/5)

```
[Use GLOBAL STYLE above]

Screen: CKYC Central KYC fetch — step 2 of 5

HEADER: "CKYC"
PROGRESS BAR: 40%, "KYC Progress — Step 2 of 5"
BADGE: "CERSAI CKYC Registry"

CONTENT:
- Loading animation area: "Fetching from CKYC registry..."
- Success state card with green checkmark:
  - Name: Abhishek Kumar (pre-filled, read-only)
  - DOB: 15/08/1995
  - Address: Patna, Bihar 800001
  - CKYC ID: XXXXXXXXXX4521
- Callout: "CKYC Hit — KYC reused from central registry"
- Button: "Confirm & Continue"

Clean form with pre-filled gray fields.
```

---

## SCREEN 5 — PAN + Credit Bureau (Step 3/5)

```
[Use GLOBAL STYLE above]

Screen: PAN verification and CIBIL credit score — step 3 of 5

HEADER: "PAN & Credit Score"
PROGRESS BAR: 60%, "KYC Progress — Step 3 of 5"
BADGES: "NSDL PAN" + "CIBIL Soft Pull"

CONTENT:
- PAN input: "ABCPK1234D" with green verify checkmark
- Credit score card (highlighted):
  - Large number: "742" in green
  - Label: "CIBIL Score"
  - Band: "Good — Eligible for instant approval"
  - Mini gauge/meter visualization (green zone)
- Bureau details: "2 active accounts • 0 DPD • Last pull: today"
- Consent line: "Soft pull — does not affect score"
- Button: "Continue to Video KYC"
```

---

## SCREEN 6 — Video KYC (Step 4/5)

```
[Use GLOBAL STYLE above]

Screen: Video KYC / V-CIP liveness check — step 4 of 5

HEADER: "Video KYC"
PROGRESS BAR: 80%, "KYC Progress — Step 4 of 5"
BADGE: "V-CIP In Progress"

CONTENT:
- Dark oval face guide frame in center (like selfie camera UI)
- Simple face silhouette inside oval
- Text: "Position face in the oval"
- Green text: "Liveness check: Blink detected ✓"
- Checklist before capture:
  • Keep PAN & Aadhaar handy
  • Ensure good lighting
  • Agent will ask 2 security questions
- Button: "Submit Verification"

OR show completed state:
- Large green checkmark
- "KYC Verified" headline
- "All 5 checks complete"
- Button: "Apply for Personal Loan"
```

---

## SCREEN 7 — Income Verification (Account Aggregator)

```
[Use GLOBAL STYLE above]

Screen: Income verification via RBI Account Aggregator (like Moneyview/Navi)

HEADER: "Income Verification"
SUBTITLE: "Account Aggregator fetches salary credits with your consent"
BADGE: "RBI Account Aggregator"
PROGRESS: "Onboarding — Income Check" 90%

CONTENT:
- Toggle chips: [Salaried ✓ selected] [Self Employed]
- Form card:
  - Employer Name: "Infosys Ltd"
  - Monthly Income: "₹85,000"
- OR AA flow state:
  - "Connect via Account Aggregator"
  - Steps with checkmarks:
    ✓ Consent captured
    ✓ Redirect to OneMoney AA
    ◉ Parsing salary credits...
    ○ Income score: 82/100
- Success card:
  - ✅ Income Verified
  - Type: Salaried | Employer: Infosys | Income: ₹85,000
- Button: "Apply for Personal Loan"
```

---

## SCREEN 8 — Loan Application (Amount & Tenure)

```
[Use GLOBAL STYLE above]

Screen: Personal loan application — amount and tenure selector

HEADER: "Get Personal Loan"
STEP TRACKER horizontal: Amount ✓ | Review | Sign | Money

CONTENT:
- Highlight card: "Pre-approved limit" → "₹5,00,000" large
- Card "I need":
  - Large amount: "₹1,50,000"
  - Horizontal slider (amber thumb) range ₹10,000 to ₹5,00,000
  - Min/max labels below slider
- Card "For":
  - Tenure chips: [6 mo] [12 mo ✓selected] [18 mo] [24 mo] [36 mo]
- Summary card (dark navy background, white text):
  - Monthly EMI: ₹13,542
  - Interest Rate: 14.5% p.a.
  - Processing Fee: ₹999 + GST
  - Total Payable: ₹1,62,504 (in amber)
- Disclosure: "Key Fact Statement shared before signing. 3-day cooling-off per RBI."
- Button: "Check Offer"
```

---

## SCREEN 9 — Credit Decision / Approval

```
[Use GLOBAL STYLE above]

Screen: Automated loan underwriting — credit decision (processing OR approved)

HEADER: "Credit Decision"
SUBTITLE: "Automated underwriting using bureau score, cash flow, and fraud checks"

STATE A — Processing:
- White card with circular loading spinner
- "Running credit decision engine..."
- "Bureau ✓ • Fraud ✓ • AML ✓ • Policy rules..."
- Small green link: "Demo: simulate decline →"

STATE B — Approved (design this version):
- Green badge: "Approved"
- Highlight card:
  - "Congratulations!"
  - Large: "₹1,50,000"
  - "approved at 14.5% p.a."
  - Loan ID: VAIDIK-PL-2026-88421
  - EMI: ₹13,542/mo | Tenure: 12 months
- Button: "Review Key Fact Statement"

STATE C — Declined (optional separate frame):
- Amber badge "Not Approved"
- Reason: FOIR exceeds policy limit | Score: 742
```

---

## SCREEN 10 — Key Fact Statement (KFS) + eSign

```
[Use GLOBAL STYLE above]

Screen: RBI-mandated Key Fact Statement before loan acceptance

HEADER: "Key Fact Statement"
BADGE: "KFS • Sanction Letter"

CONTENT:
- Borrower card:
  - Name, PAN, Lender (RE): Vaidik NBFC Partner Ltd.
  - LSP: Vaidik Mobile App
- Loan Terms card (highlighted amber border):
  - Sanctioned: ₹1,50,000 | Rate: 14.5% | APR: 15.7%
  - Tenure: 12 mo | EMI: ₹13,542
  - Processing fee, Total interest, Total payable
- Rights card bullet list:
  - 3-day cooling-off period
  - Disbursement to borrower account only
  - Grievance officer contact
- Checkbox checked: "I have read KFS and accept terms"
- Button: "Sign with Aadhaar eSign"

OR signed state:
- ✍️ Aadhaar eSign Complete
- Doc ID: VAIDIK-ESIGN-88421
- Button: "Link Bank Account"
```

---

## SCREEN 11 — Bank Account Linking

```
[Use GLOBAL STYLE above]

Screen: Bank account linking with penny-drop verification

HEADER: "Link Bank Account"
BADGE: "Account Aggregator + Penny Drop"

CONTENT:
- Section: "Select salary / primary account"
- Bank list (radio select):
  - 🏦 HDFC Bank — selected (amber border) — "Fetch via AA"
  - 🏦 ICICI Bank
  - 🏦 State Bank of India
  - 🏦 Axis Bank
- OR verification card:
  - "Reverse Penny Drop"
  - Account: •••• 4521 | Name Match: Abhishek Kumar ✓
- Success:
  - ✅ Account Verified
  - HDFC Bank •••• 4521
- Button: "Setup eNACH Mandate"
```

---

## SCREEN 12 — eNACH Mandate Setup

```
[Use GLOBAL STYLE above]

Screen: NPCI eNACH auto-debit mandate registration

HEADER: "Setup AutoPay"
BADGE: "NPCI NACH"

CONTENT:
- "Why eNACH?" card with bullets:
  • Auto-debit EMIs on due date
  • 92% success rate vs manual UPI
  • RBI-recommended for digital lenders
  • EMI: ₹13,542/month
- Bank card:
  - HDFC Bank •••• 4521
  - Account holder: Abhishek Kumar
  - Mandate: Max ₹13,542 | Monthly | UMRN pending
- NPCI redirect note in green
- OR success:
  - ✅ Mandate Registered
  - UMRN: HDFC0001234567890
- Button: "Proceed to Disbursement"
```

---

## SCREEN 13 — Disbursement / Money Transferred

```
[Use GLOBAL STYLE above]

Screen: Loan disbursement via IMPS — money transferred

HEADER: "Money Transferred"

STATE A — Processing:
- Spinner + "Initiating IMPS transfer..."
- Amount: ₹1,50,000
- Bank: HDFC Bank •••• 4521

STATE B — Success:
- Green badge "Disbursed"
- 💸 illustration
- "Money on the way!"
- ₹1,50,000 large
- UTR: IMPS26061788421001
- "Expected in account within 30 seconds"
- KFS note: 3-day cooling-off period
- Button: "Go to Dashboard"
```

---

## SCREEN 14 — Home Dashboard (Active Loan)

```
[Use GLOBAL STYLE above]

Screen: Home dashboard with active loan + PO metrics

NO top header bar. Custom app bar:
- Left: "Vaidik Mobile App" + "Designed by Abhishek Kumar"
- Right: notification bell + help icon

CONTENT:
- Amber gradient hero card:
  - "Outstanding Loan"
  - ₹1,50,000 large
  - "EMI ₹13,542 • Due 17 Jul 2026"
  - Dark button: "Pay EMI Now"
- 4-icon service row: Get Loan | Pay EMI | History | BNPL
- Section "Product Metrics (PO View)" — 2×2 grid:
  - 🚀 KYC→First Loan: 68% +4.2%
  - 📲 D7 Repayment: 54% +2.1%
  - 🔁 M3 Repeat Borrow: 31% +1.8%
  - ✅ NACH Success: 92% +0.6%
- Application status step tracker: KYC ✓ Income ✓ Apply ✓ Money ✓
- Upcoming EMI card with "AutoPay ON" green badge
- BNPL promo card: "Shop Now Pay Later — 0% for 15 days"

BOTTOM TAB BAR: Home | My Loans | BNPL | Pay | Account (Home active in amber)
```

---

## SCREEN 15 — Home Dashboard (Pre-approved)

```
[Use GLOBAL STYLE above]

Screen: Home dashboard — pre-approved, no active loan yet

Same layout as Screen 14 but hero card shows:
- "You're Pre-approved for"
- ₹5,00,000 large
- "Personal Loan • 10 min disbursal"
- Button: "Apply Now" or "Complete KYC"

Step tracker shows partial progress (e.g. KYC done, Income pending).
Rest: services row, metrics, BNPL promo, tab bar.
```

---

## SCREEN 16 — My Loans / EMI Schedule

```
[Use GLOBAL STYLE above]

Screen: Loan details and EMI schedule

HEADER: "My Loans"
SUBTITLE: "Loan details, EMI schedule, and billing history"

CONTENT:
- Highlight card:
  - VAIDIK-PL-2026-88421
  - ₹1,50,000 outstanding
  - "14.5% p.a. • EMI ₹13,542"
  - Green badge "Active"
- Foreclosure calculator card (optional):
  - Outstanding: ₹1,50,000
  - Fee 2%: ₹3,000
  - Total: ₹1,53,000
- EMI Schedule list:
  - EMI #1 — 17 Jul 2026 — ₹13,542 — badge "Due" (amber)
  - EMI #2 — 17 Aug 2026 — ₹13,542 — "Upcoming"
  - (show 3-4 rows with principal/interest breakdown)
- KFS snippet card at bottom
- Button outline: "Prepay / Foreclose Loan"

Tab bar visible, "My Loans" tab active.
```

---

## SCREEN 17 — Pay EMI / UPI Repayment

```
[Use GLOBAL STYLE above]

Screen: EMI repayment via UPI or eNACH

HEADER: "Repay EMI"

CONTENT:
- Highlight card: "EMI Amount Due" → ₹13,542 large
- Loan ref: VAIDIK-PL-2026-88421
- Tab switcher: [UPI ✓] [eNACH]
- "Select UPI App" — 2×2 grid:
  - Google Pay (G) — selected with amber border
  - PhonePe (Pe)
  - Paytm (P)
  - BHIM UPI (B)
- OR payment success card:
  - ✅ Payment Successful
  - UPI Ref: VAIDIKUPI26061799001
- Payment history row: EMI #1 Paid — ₹13,542 — Google Pay
- Footer: "Payment gateway: Razorpay / Cashfree • PCI-DSS"
- Button: "Pay via UPI"

Tab bar, "Pay" active.
```

---

## SCREEN 18 — BNPL (Shop Now Pay Later)

```
[Use GLOBAL STYLE above]

Screen: BNPL credit line and merchant checkout

HEADER: "Shop Now Pay Later"
SUBTITLE: "0% interest for 15 days at partner merchants"

CONTENT:
- Highlight card:
  - "BNPL Credit Line"
  - ₹50,000 large
  - "Pay in 3 interest-free EMIs at checkout"
- Partner merchants list (selectable cards):
  - Flipkart — E-commerce — Up to ₹25,000
  - Amazon — E-commerce — Up to ₹30,000
  - Swiggy — Food — Up to ₹5,000
  - MakeMyTrip — Travel — Up to ₹40,000
  - Flipkart selected with amber border + "Active" badge
- Checkout simulation card:
  - Order at Flipkart: ₹12,999
  - 3x EMI Plan: ₹4,333/mo × 3
  - "0% interest • First EMI in 15 days"
- Button: "Activate BNPL at Flipkart"

Tab bar, BNPL active.
```

---

## SCREEN 19 — Profile / Account

```
[Use GLOBAL STYLE above]

Screen: User profile, KYC status, integrations

HEADER: "Profile"

CONTENT:
- User card:
  - Abhishek Kumar (large name)
  - +91 9876543210
  - abhishek@example.com
  - Badge: "Fully Verified" green
- KYC Status section — list with Verified/Pending badges:
  Aadhaar eKYC, CKYC Registry, PAN + Bureau, Video KYC, Credit Bureau
- Integrations card:
  UIDAI, CERSAI, CIBIL, Account Aggregator, Bank HDFC •••• 4521, NPCI NACH Active, Razorpay
- Income Profile: Salaried, Infosys, ₹85,000
- Settings toggles: Language English | PO Metrics ON
- Link card: "RBI Compliance & Disclosures →"
- Outline button: "Reset Demo"
- Footer: Designed by Abhishek Kumar | Support: 1800-VAIDIK-HELP

Tab bar, Account active.
```

---

## SCREEN 20 — Notifications

```
[Use GLOBAL STYLE above]

Screen: In-app notifications center

HEADER: "Notifications"

CONTENT:
- Notification cards:
  1. (unread, amber left border) "EMI due in 3 days" — ₹13,542 due 17 Jul — 2h ago — badge EMI
  2. "Loan disbursed successfully" — ₹1,50,000 credited — 1d ago — badge Alert
  3. "Pre-approved limit increased" — credit line ₹5L — 3d ago — badge Offer

Clean list, white cards, subtle shadows.
Back arrow in header. No tab bar (stack screen).
```

---

## SCREEN 21 — Help & Support

```
[Use GLOBAL STYLE above]

Screen: FAQ and customer support

HEADER: "Help & Support"

CONTENT:
- Highlight card:
  - "Need help?"
  - Grievance Officer • Mon–Sat 9am–6pm
  - grievance@vaidikedu.com (green link)
  - 1800-VAIDIK-HELP
- FAQ accordion cards:
  Q: How long does disbursement take?
  Q: What is cooling-off period?
  Q: Can I prepay my loan?
  Q: Who is the lender?
- RBI Ombudsman card with link cms.rbi.org.in

Back arrow. No tab bar.
```

---

## SCREEN 22 — RBI Compliance

```
[Use GLOBAL STYLE above]

Screen: Regulatory compliance disclosures

HEADER: "Regulatory Info"

CONTENT:
- 4 expandable-style cards:
  1. RBI Digital Lending Guidelines (2022) — 5 bullet points
  2. KYC / AML Compliance — CKYC, Aadhaar, Video KYC, PAN, AML
  3. Payment & Collection — UPI, eNACH, APR disclosure
  4. Data Privacy — DPDP Act 2023, consent, encryption
- Grievance officer details at bottom
- Trust seals: RBI | NPCI | CERSAI | PCI-DSS (icon row)

Professional, legal-but-readable layout. Back arrow.
```

---

## BONUS — Stitch batch prompt (all screens at once)

If Stitch supports multi-screen generation, use:

```
Create a complete mobile UI kit — 22 screens — for "Vaidik Mobile App", 
an Indian consumer lending fintech app (personal loan + BNPL).

Style: KreditBee-inspired. Amber #F5A623 CTAs, navy #1A1A2E text, 
white cards, green #00B894 success. 390px wide mobile frames.

Screens in order:
1.Welcome 2.OTP Login 3.Aadhaar KYC 4.CKYC 5.PAN+CIBIL 6.Video KYC 
7.Income AA 8.Loan Apply 9.Credit Approval 10.KFS eSign 11.Bank Link 
12.eNACH 13.Disbursement 14.Home Active 15.Home Pre-approved 
16.EMI Schedule 17.UPI Pay 18.BNPL 19.Profile 20.Notifications 
21.Help 22.Compliance

Include bottom tab bar on screens 14-19. Indian rupee formatting. 
RBI trust badges. Footer "Designed by Abhishek Kumar" on welcome.
```

---

## Tips for Google Stitch

1. **Generate one screen per prompt** — best quality
2. **Always paste GLOBAL STYLE** before each screen prompt
3. **Name exports:** `vaidik-01-welcome.png`, `vaidik-09-approval.png`, etc.
4. **Iterate:** Add "make CTA more prominent" or "more like KreditBee" on weak outputs
5. **Consistent frame:** Request "same device frame and spacing as previous screen"

---

*Generated for Vaidik Mobile App demo — aligned with liev-app codebase flows.*
