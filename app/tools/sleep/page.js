import SleepCalculator from './sleep'

export const metadata = {
  title: 'Sleep Calculator - Find Your Optimal Sleep Schedule',
  description: 'Free sleep calculator to find your optimal sleep schedule. Calculate when to go to bed and wake up for better sleep quality and energy levels.',
  keywords: 'sleep calculator, sleep schedule calculator, bedtime calculator, wake up time calculator, sleep cycle calculator, free sleep calculator',
  openGraph: {
    title: 'Sleep Calculator - Find Your Optimal Sleep Schedule',
    description: 'Free sleep calculator to find your optimal sleep schedule.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/sleep'
  }
}

export default function SleepPage() {
  return <SleepCalculator />
} 