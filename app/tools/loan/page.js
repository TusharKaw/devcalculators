import LoanCalculator from './loan'

export const metadata = {
  title: 'Loan Calculator - Calculate Loan Payments & Amortization',
  description: 'Free loan calculator to estimate monthly payments, total interest, and create amortization schedules. Calculate loan payments based on principal, interest rate, and term.',
  keywords: 'loan calculator, payment calculator, amortization calculator, interest calculator, loan payment calculator, free loan calculator',
  openGraph: {
    title: 'Loan Calculator - Calculate Loan Payments & Amortization',
    description: 'Free loan calculator to estimate monthly payments, total interest, and create amortization schedules.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/loan'
  }
}

export default function LoanPage() {
  return <LoanCalculator />
} 