import WaterIntakeCalculator from './water-intake'

export const metadata = {
  title: 'Water Intake Calculator - Calculate Daily Water Needs',
  description: 'Free water intake calculator to determine your daily water needs. Calculate recommended water intake based on weight, activity level, and climate.',
  keywords: 'water intake calculator, daily water calculator, hydration calculator, water needs calculator, free water intake calculator',
  openGraph: {
    title: 'Water Intake Calculator - Calculate Daily Water Needs',
    description: 'Free water intake calculator to determine your daily water needs.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/water-intake'
  }
}

export default function WaterIntakePage() {
  return <WaterIntakeCalculator />
} 