import AgeCalculator from './age'

export const metadata = {
  title: 'Age Calculator - Calculate Exact Age Between Dates',
  description: 'Free age calculator to determine your exact age between two dates. Calculate age in years, months, days, hours, and minutes. Perfect for birthday calculations.',
  keywords: 'age calculator, birthday calculator, date calculator, how old am i, age between dates, free age calculator',
  openGraph: {
    title: 'Age Calculator - Calculate Exact Age Between Dates',
    description: 'Free age calculator to determine your exact age between two dates.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/age'
  }
}

export default function AgePage() {
  return <AgeCalculator />
} 