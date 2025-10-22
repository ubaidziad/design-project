# FundFi - LP Borrower Flow (Phase 1)

A desktop-first DeFi lending platform that allows Limited Partners (LPs) in hedge funds or private equity funds to borrow stablecoins (USDC) against their fund NAV value.

## 🎨 Design Inspiration

- **Aave** - Flow structure and clarity
- **Maple Finance** - Institutional trust and dashboard visuals  
- **Uniswap** - Minimalism and delightful UI flow

## ✨ Features

### 1️⃣ LP Dashboard
- Fund holdings display with NAV visualization
- Interactive NAV performance chart (6-month history)
- Borrowing eligibility calculator based on LTV ratio
- Loan health indicators
- "Verified by GP" status badges

### 2️⃣ Loan Quote Screen
- Real-time NAV display from fund manager
- Interactive loan amount selector
- Auto-calculated loan terms:
  - Loan-to-Value (LTV) ratio
  - Annual Percentage Rate (APR)
  - Loan duration
  - Collateral type
- Estimated monthly payment calculator
- Terms acceptance interface

### 3️⃣ Loan Confirmation
- Animated status timeline
- Smart contract address display
- Transaction hash with Etherscan integration
- On-chain verification badge
- Loan summary overview
- Disbursement timeline

### 4️⃣ Loan Management View
- Active loan overview with key metrics
- Repayment progress tracker
- Collateral health monitoring
- Interactive repayment schedule chart
- Detailed payment breakdown table
- Quick action buttons (with MVP limitations)

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library

## 📦 Installation

```bash
npm install
```

## 🏃 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎨 Theme

The application supports both **dark** and **light** modes with a professional DeFi color palette:

- **Primary**: Purple (#8B5CF6) - Action buttons, highlights
- **Accent**: Blue gradients - Branding, emphasis
- **Neutral**: Grays - Professional, institutional feel

## 🔑 Key Components

### UI Components
- `Card` - Flexible card container
- `Button` - Multi-variant button system
- `Badge` - Status indicators
- `Progress` - Visual progress bars

### Pages
- `Dashboard.jsx` - Main LP overview
- `LoanQuote.jsx` - Loan terms and configuration
- `LoanConfirmation.jsx` - Transaction confirmation
- `LoanManagement.jsx` - Active loan tracking

## 📊 Sample Data

The application uses placeholder data for **Tyr Capital Fund I**:
- NAV: $1,200,000
- Eligible to Borrow: $480,000 (40% LTV)
- 6-month NAV growth: +26.3%

## 🎯 Design Goals

- **Trust**: Institutional-grade UI with verified badges and on-chain records
- **Transparency**: Clear visualization of NAV-to-loan conversion
- **Simplicity**: Intuitive flow that explains NAV lending in 30 seconds
- **Confidence**: Professional design that builds user trust

## 🔮 Future Enhancements

- GP (General Partner) flow
- Lender flow
- Real blockchain integration
- Live wallet connection
- Actual smart contract deployment
- Real-time NAV updates
- Payment processing

## 📝 Notes

- Connect Wallet button is mock-only (no Web3 integration in Phase 1)
- All transactions and hashes are simulated
- "Make Repayment" button is disabled for MVP
- Designed for desktop-first, responsive to tablet

---

Built with ❤️ for institutional DeFi lending
