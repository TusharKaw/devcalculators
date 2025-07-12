import MacroCalculator from './macro'

export const metadata = {
  title: 'Macro Calculator - Calculate Macronutrient Ratios',
  description: 'Free macro calculator to determine your macronutrient ratios. Calculate protein, carbs, and fat needs based on your goals and body composition.',
  keywords: 'macro calculator, macronutrient calculator, protein calculator, carb calculator, fat calculator, free macro calculator',
  openGraph: {
    title: 'Macro Calculator - Calculate Macronutrient Ratios',
    description: 'Free macro calculator to determine your macronutrient ratios.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/macro'
  }
}

export default function MacroPage() {
  return <MacroCalculator />
} 