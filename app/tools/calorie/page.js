import CalorieCalculator from './calorie'

export const metadata = {
  title: 'Calorie Calculator - Calculate Daily Calorie Needs',
  description: 'Free calorie calculator to determine your daily calorie needs. Calculate calories based on age, weight, height, gender, and activity level. Plan your diet effectively.',
  keywords: 'calorie calculator, daily calorie needs, bmr calculator, tdee calculator, weight loss calories, weight gain calories, free calorie calculator',
  openGraph: {
    title: 'Calorie Calculator - Calculate Daily Calorie Needs',
    description: 'Free calorie calculator to determine your daily calorie needs. Calculate calories based on age, weight, height, gender, and activity level.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/calorie'
  }
}

export default function CaloriePage() {
  return <CalorieCalculator />
} 