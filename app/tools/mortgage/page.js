import MortgageCalculator from './mortgage'

export const metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Mortgage Payments',
  description: 'Free mortgage calculator to estimate monthly payments, total interest, and loan amortization. Calculate mortgage payments based on loan amount, interest rate, and term.',
  keywords: 'mortgage calculator, home loan calculator, monthly payment calculator, mortgage payment calculator, loan calculator, interest calculator, free mortgage calculator',
  openGraph: {
    title: 'Mortgage Calculator - Calculate Monthly Mortgage Payments',
    description: 'Free mortgage calculator to estimate monthly payments, total interest, and loan amortization.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/mortgage'
  }
}

export default function MortgagePage() {
  return <MortgageCalculator />
} 