# Vaidik Mobile App — Fintech Lending Prototype

A **mobile-first consumer lending demo** built for Product Owner interviews in the Indian fintech lending space. The app walks through the full personal-loan lifecycle — from OTP login and KYC to underwriting, disbursement, EMI repayment, and BNPL — with RBI-aligned compliance touchpoints.

**Designed by [Abhishek Kumar](https://github.com/krabhi75)**

Inspired by market leaders: **KreditBee, Moneyview, Navi, LazyPay, Bajaj Finserv**.

---

## Table of contents

- [Why this prototype exists](#why-this-prototype-exists)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Demo flow (end-to-end)](#demo-flow-end-to-end)
- [Screen-by-screen guide](#screen-by-screen-guide)
- [Product Owner metrics](#product-owner-metrics)
- [JD coverage map](#jd-coverage-map)
- [Architecture](#architecture)
- [Interview demo script (15 min)](#interview-demo-script-15-min)
- [Screenshot automation](#screenshot-automation)
- [Reset demo](#reset-demo)
- [License](#license)

---

## Why this prototype exists

This is an **interactive product demo**, not a production lending app. It is designed to:

1. Show end-to-end **consumer lending UX** aligned with how Indian NBFCs and fintech lenders operate today.
2. Demonstrate **Product Owner thinking** — activation funnels, repayment metrics, decline paths, and compliance gates.
3. Map directly to a **Product Owner – Fintech (Lending)** job description: mobile app, KYC integrations, UPI/NACH, credit/billing/repayment, BNPL, and RBI digital lending guidelines.

All integrations (Aadhaar, CKYC, CIBIL, Account Aggregator, eNACH, IMPS) are **simulated** with realistic UI and copy — suitable for screen-share interviews without real API keys.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Expo SDK 56](https://expo.dev/) + React Native |
| Language | TypeScript |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| State | React Context (`DemoContext`) — in-memory demo state |
| Web demo | `react-native-web` via `expo start --web` |
| Theme | KreditBee-inspired palette — amber `#F5A623`, navy `#1A1A2E` |
| Screenshots | Playwright (`npm run screenshots`) |

---

## Quick start

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
git clone https://github.com/krabhi75/vaidik-lending-demo.git
cd vaidik-lending-demo
npm install
npm run web        # Browser — best for interview screen-share
# OR
npm start          # Scan QR with Expo Go on Android/iOS
```

### Other platforms

```bash
npm run android    # Android emulator / device
npm run ios        # iOS simulator (macOS only)
```

---

## Demo flow (end-to-end)

```
Welcome → Login (OTP) → KYC (Aadhaar → CKYC → PAN → Video)
       → Income (Account Aggregator) → Apply (amount/tenure/EMI)
       → Approval (underwriting) → KFS + eSign → Bank Link (penny drop)
       → eNACH mandate → Disburse (IMPS) → Home Dashboard
       → Pay (UPI EMI) / Loans (schedule + foreclosure) / BNPL / Profile
```

**Shortcuts on Welcome screen:**

| Action | Result |
|--------|--------|
| **Skip to Demo Dashboard** | Jumps to active loan state with EMI due |
| **Quick Demo States** | Preset jumps: KYC in progress, approved, declined, BNPL, etc. |
| **हिंदी / EN toggle** | Switches UI language (Welcome + Profile) |

---

## Screen-by-screen guide

### 1. Welcome (`/`)

**Purpose:** App entry point and interview control panel.

**What you see:**
- Vaidik brand mark, Play Store rating badge, trust badges (RBI registered, secure, instant)
- Hero: “Get instant personal loan up to ₹5,00,000”
- 3-step “How it works” explainer
- **Get Started** → Login flow
- **Skip to Demo Dashboard** → Active loan home (for fast demos)
- **Quick Demo States** → Expandable preset menu for jumping to any funnel stage
- Language toggle (English / Hindi)

**PO talking point:** First-time user education + trust signals before OTP friction.

---

### 2. Login (`/login`)

**Purpose:** Mobile OTP authentication with regulatory consent.

**What you see:**
- 10-digit mobile number input
- OTP entry (simulated — any 6 digits work)
- Checkbox: consent for bureau pull and data processing (RBI digital lending requirement)
- “Verify & Continue” → KYC flow

**PO talking point:** Consent capture before credit bureau inquiry is mandatory under RBI guidelines.

---

### 3. KYC — Aadhaar (`/kyc/aadhaar`)

**Purpose:** Identity verification via Aadhaar OTP (UIDAI).

**What you see:**
- Aadhaar number input (masked)
- OTP verification step
- Progress step tracker (Step 1 of 4)
- Success → routes to CKYC

**PO talking point:** Aadhaar e-KYC is the primary identity anchor for Indian lending.

---

### 4. KYC — CKYC (`/kyc/ckyc`)

**Purpose:** Central KYC registry lookup (CERSAI) to avoid duplicate KYC.

**What you see:**
- “Fetching from CKYC registry…” animation
- Pre-filled demographic data from central registry
- Confirm and continue → PAN verification

**PO talking point:** CKYC-first reduces onboarding time from days to minutes.

---

### 5. KYC — PAN + Bureau (`/kyc/pan`)

**Purpose:** PAN validation and soft credit bureau pull.

**What you see:**
- PAN input with format validation
- Simulated CIBIL/Experian score display (e.g. 742 — Good)
- Bureau consent already captured at login
- Continue → Video KYC

**PO talking point:** Bureau score drives pre-approval amount and pricing — key activation metric.

---

### 6. KYC — Video KYC (`/kyc/video`)

**Purpose:** RBI-mandated video verification for digital lending.

**What you see:**
- Camera permission prompt (simulated)
- Liveness check animation
- Agent verification status
- “Apply for Loan” → Income verification

**PO talking point:** Video KYC is required for loans above certain thresholds; impacts conversion if UX is poor.

---

### 7. Income Verification (`/apply/income`)

**Purpose:** Account Aggregator (AA) based salary/income proof — no manual payslip upload.

**What you see:**
- Choice: Salaried vs Self-employed
- “Connect via Account Aggregator” — bank consent flow
- Fetched income summary (employer, monthly salary)
- Income verified badge
- “Apply for Personal Loan” → Loan application

**PO talking point:** AA income verification (like Moneyview/Navi) cuts ops cost and fraud vs manual document review.

---

### 8. Loan Application (`/apply`)

**Purpose:** Loan amount, tenure selection, and EMI preview.

**What you see:**
- Slider: loan amount (₹10,000 – ₹5,00,000)
- Tenure chips: 3, 6, 9, 12 months
- Live EMI calculator (reducing balance)
- Interest rate display (e.g. 18% p.a.)
- Total payable breakdown
- “Check Eligibility” → Credit decision engine

**PO talking point:** EMI transparency upfront reduces drop-off at KFS stage.

---

### 9. Credit Decision / Approval (`/apply/approval`)

**Purpose:** Automated underwriting with approve and decline paths.

**What you see:**
- “Running credit decision engine…” (2-second simulation)
- **Approved path:** Loan amount, rate, tenure, EMI summary + “Review Key Fact Statement”
- **Decline path:** Tap “Simulate Decline” — shows rejection reason, re-apply CTA
- **Manual review path:** Rare edge case messaging

**PO talking point:** Decline UX matters — clear reason codes and re-engagement reduce support tickets.

---

### 10. Key Fact Statement + eSign (`/apply/kfs`)

**Purpose:** RBI-mandated KFS disclosure before loan acceptance.

**What you see:**
- Full KFS document: principal, interest, APR, processing fee, penal charges
- Cooling-off period notice (3 days)
- Grievance redressal officer details
- Aadhaar eSign checkbox + “I Accept KFS”
- Continue → Bank linking

**PO talking point:** KFS + eSign is non-negotiable under RBI digital lending directions (2022).

---

### 11. Bank Linking (`/apply/bank-link`)

**Purpose:** Disbursement account verification via penny drop.

**What you see:**
- Bank selection (HDFC, ICICI, SBI, Axis, etc.)
- Account number + IFSC
- Penny drop verification (₹1 credited and reversed)
- Account holder name match confirmation
- “Setup eNACH Mandate” → eNACH flow

**PO talking point:** Penny drop prevents disbursement to wrong accounts — critical ops control.

---

### 12. eNACH Mandate (`/apply/enach`)

**Purpose:** NPCI e-mandate for auto-debit EMI collections.

**What you see:**
- Mandate details: max amount, frequency (monthly), validity
- Bank authentication simulation (netbanking/debit card)
- UMRN (Unique Mandate Reference Number) generated
- “Proceed to Disbursement” → Disburse screen

**PO talking point:** NACH success rate directly impacts D7/D30 collection metrics.

---

### 13. Disbursement (`/apply/disburse`)

**Purpose:** Loan amount transfer to linked bank account.

**What you see:**
- IMPS transfer animation
- Loan ID generated
- Disbursement amount credited confirmation
- Cooling-off period reminder
- “Go to Dashboard” → Home tab

**PO talking point:** Time-to-money is the key activation metric — target under 10 minutes from approval.

---

### 14. Home Dashboard (`/(tabs)/index`)

**Purpose:** Post-disbursement hub with PO metrics and quick actions.

**What you see:**
- Greeting + outstanding balance card
- Next EMI due date and amount with “Pay Now” CTA
- **PO Metric Cards** (toggle in Profile): Activation rate, D7 repayment %, NACH success rate
- Service shortcuts: Apply again, Pay EMI, Loan details, BNPL, Help
- Notifications and Help icons in header
- Pre-approved offer banner (when applicable)

**PO talking point:** Home is the retention surface — EMI due reminders drive repayment.

---

### 15. Pay EMI (`/(tabs)/pay`)

**Purpose:** UPI-based EMI repayment with payment history.

**What you see:**
- Current EMI due amount and due date
- UPI payment simulation (GPay / PhonePe / Paytm)
- Payment success receipt
- EMI marked paid in schedule (persisted in demo state)
- Payment history list

**PO talking point:** UPI repayment has higher success rates than netbanking for Indian users.

---

### 16. Loans (`/(tabs)/loans`)

**Purpose:** Active loan details, EMI schedule, and foreclosure.

**What you see:**
- Loan summary: principal, outstanding, tenure remaining
- Full EMI schedule table (paid / due / upcoming)
- Foreclosure calculator: outstanding + prepayment charges
- “Foreclose Loan” CTA (simulated)

**PO talking point:** Foreclosure transparency reduces NPA disputes and improves NPS.

---

### 17. BNPL (`/(tabs)/bnpl`)

**Purpose:** Buy Now Pay Later — short-cycle credit at partner merchants.

**What you see:**
- BNPL credit limit display
- Partner merchant grid (Amazon, Flipkart, Swiggy, etc.)
- Checkout flow: select merchant → enter amount → instant approval
- EMI plan for BNPL purchase

**PO talking point:** BNPL is a separate product line with higher frequency and lower ticket sizes.

---

### 18. Profile (`/(tabs)/profile`)

**Purpose:** User settings, integrations overview, and demo controls.

**What you see:**
- User phone and KYC status badges
- Linked bank account details
- eNACH mandate status
- Integration list: Aadhaar, CKYC, CIBIL, AA, NPCI, UPI
- **Show PO Metrics** toggle (shows/hides metric cards on Home)
- **Hindi language** toggle
- RBI Compliance link
- **Reset Demo** — restarts from Welcome screen

**PO talking point:** Profile is where power users manage mandates and grievances.

---

### 19. Notifications (`/notifications`)

**Purpose:** Push notification center for loan lifecycle events.

**What you see:**
- EMI due reminders
- Payment confirmations
- Pre-approved offer alerts
- KYC pending nudges
- Promotional messages

**PO talking point:** Notification strategy drives D7 repayment — timing and copy A/B testing matter.

---

### 20. Help & Support (`/help`)

**Purpose:** FAQ and grievance redressal entry point.

**What you see:**
- FAQ categories: Loan application, Repayment, KYC, eNACH
- Expandable Q&A items
- Contact: email, phone, in-app chat (simulated)
- Grievance officer details (RBI requirement)

**PO talking point:** Help deflection reduces call center cost — measure ticket rate per 1000 users.

---

### 21. Compliance (`/compliance`)

**Purpose:** RBI digital lending compliance summary screen.

**What you see:**
- Key regulatory checkpoints: KFS, cooling-off, grievance officer, data consent
- LSP (Lending Service Provider) disclosure
- Links to RBI master directions (reference copy)

**PO talking point:** Compliance is a product requirement, not a legal afterthought.

---

### 22. Demo Presets (`/demo/[preset]`)

**Purpose:** Deep-link entry for specific demo states (used by Quick Demo States).

**Presets available:**
- `home-active` — Active loan with EMI due
- `home-preapproved` — Pre-approved offer on home
- `kyc-progress` — KYC partially complete
- `approval` — Loan approved, pending KFS
- `declined` — Underwriting declined
- `bnpl` — BNPL checkout state

---

## Product Owner metrics

Toggle **Show PO Metrics** in Profile to surface these on the Home dashboard:

| Metric | Definition | Why it matters |
|--------|------------|----------------|
| **Activation Rate** | % of registered users who complete first disbursement | Core funnel health |
| **D7 Repayment Rate** | % of users who pay first EMI within 7 days of due date | Early warning for NPA |
| **NACH Success Rate** | % of eNACH mandates successfully registered | Collection efficiency |

---

## JD coverage map

| Job description requirement | Demo implementation |
|----------------------------|---------------------|
| Mobile app (Android / iOS) | Expo React Native — runs on phone + web |
| Consumer lending product | Personal loan flow end-to-end |
| KYC integrations | Aadhaar, CKYC, PAN, Video KYC screens |
| UPI / NACH / payment gateway | Pay tab + eNACH mandate flow |
| Credit, billing, repayment | Loans tab with live EMI schedule |
| BNPL / short-cycle credit | BNPL tab with merchant checkout |
| RBI compliance | KFS, eSign, cooling-off, Compliance screen |
| Activation, engagement, retention | Metric cards on Home dashboard |
| Agile / product ownership | Each screen = a user story in the backlog |

---

## Architecture

```
liev-app/
├── app/                    # Expo Router screens
│   ├── index.tsx           # Welcome
│   ├── login.tsx
│   ├── kyc/                # Aadhaar, CKYC, PAN, Video
│   ├── apply/              # Income, Apply, Approval, KFS, Bank, eNACH, Disburse
│   ├── (tabs)/             # Home, Pay, Loans, BNPL, Profile
│   ├── notifications.tsx
│   ├── help.tsx
│   └── compliance.tsx
├── components/liev/        # Reusable UI (Button, Card, MetricCard, etc.)
├── context/
│   └── DemoContext.tsx     # Global demo state (loan, KYC, EMI, payments)
├── constants/
│   └── theme.ts            # Colors, copy, typography
├── lib/
│   ├── demo-data.ts        # EMI schedule builder, sample data
│   ├── format.ts           # Currency/date formatters
│   └── i18n.ts             # English/Hindi strings
└── docs/
    └── google-stitch-*.txt # UI design prompts for Google Stitch
```

**State management:** All demo state lives in `DemoContext` — no backend, no persistence across page refresh. Use **Reset Demo** in Profile to restart.

---

## Interview demo script (15 min)

| Step | Screen | What to say |
|------|--------|-------------|
| 0 | **Welcome** | “This is Vaidik — a consumer lending app prototype I designed for this role.” Tap *Skip to Demo Dashboard* OR use *Quick Demo States*. |
| 1 | **Login** | “OTP auth with RBI-mandated bureau consent before any credit pull.” |
| 2 | **KYC** | “CKYC-first onboarding — Aadhaar, central registry, PAN + bureau, video KYC.” |
| 3 | **Income** | “Account Aggregator income verification — no manual payslip, like Moneyview.” |
| 4 | **Apply** | “Transparent EMI calculator — amount, tenure, total payable upfront.” |
| 5 | **Approval** | “Automated underwriting. I can simulate decline to show rejection UX.” |
| 6 | **KFS + eSign** | “RBI Key Fact Statement with Aadhaar eSign — non-negotiable compliance gate.” |
| 7 | **Bank Link** | “Penny-drop verification before disbursement.” |
| 8 | **eNACH** | “NPCI mandate for auto-debit — directly impacts collection metrics.” |
| 9 | **Disburse** | “IMPS transfer with cooling-off period disclosure.” |
| 10 | **Home** | “PO metrics: activation, D7 repayment, NACH success — what I'd track weekly.” |
| 11 | **Pay** | “UPI repayment — EMI marked paid in schedule.” |
| 12 | **Loans** | “Full EMI schedule + foreclosure calculator.” |
| 13 | **BNPL** | “Short-cycle credit at partner merchants — separate product line.” |
| 14 | **Compliance** | “RBI digital lending guidelines baked into the product.” |

---

## Screenshot automation

Capture all screens to `docs/screenshots/` using Playwright:

```bash
npm run screenshots
```

Requires the web dev server running on port 8081 (script starts it automatically).

---

## Reset demo

**Profile → Reset Demo** — clears all state and returns to the Welcome screen.

---

## Related docs

- [`docs/google-stitch-screen-prompts.md`](docs/google-stitch-screen-prompts.md) — UI design prompts per screen
- [`docs/google-stitch-complete-prompts.txt`](docs/google-stitch-complete-prompts.txt) — Self-contained Stitch prompts (22 screens)

---

## License

MIT — see [LICENSE](LICENSE).

---

## Author

**Abhishek Kumar**  
Product Owner · Fintech Lending  
[GitHub](https://github.com/krabhi75)
