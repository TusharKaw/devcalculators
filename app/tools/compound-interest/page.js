import CompoundInterestCalculator from './compound-interest'

export const metadata = {
  title: 'Compound Interest Calculator - Calculate Investment Growth',
  description: 'Free compound interest calculator to calculate investment growth over time. See how your money grows with compound interest, including monthly contributions.',
  keywords: 'compound interest calculator, investment calculator, interest calculator, growth calculator, compound interest formula, free compound interest calculator',
  openGraph: {
    title: 'Compound Interest Calculator - Calculate Investment Growth',
    description: 'Free compound interest calculator to calculate investment growth over time.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/compound-interest'
  }
}

export default function CompoundInterestPage() {
  return <CompoundInterestCalculator />
} 