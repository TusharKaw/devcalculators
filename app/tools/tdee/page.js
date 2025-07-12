import TDEECalculator from './tdee'

export const metadata = {
  title: 'TDEE Calculator - Calculate Total Daily Energy Expenditure',
  description: 'Free TDEE calculator to determine your Total Daily Energy Expenditure. Calculate daily calorie needs based on BMR and activity level for weight management.',
  keywords: 'tdee calculator, total daily energy expenditure calculator, calorie needs calculator, bmr calculator, metabolism calculator, free tdee calculator',
  openGraph: {
    title: 'TDEE Calculator - Calculate Total Daily Energy Expenditure',
    description: 'Free TDEE calculator to determine your Total Daily Energy Expenditure.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/tdee'
  }
}

export default function TDEEPage() {
  return <TDEECalculator />
} 