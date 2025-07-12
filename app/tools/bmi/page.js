import BMICalculator from './bmi'

export const metadata = {
  title: 'BMI Calculator - Calculate Your Body Mass Index',
  description: 'Free BMI calculator to determine your Body Mass Index. Calculate BMI using height and weight. Get instant results and understand your weight status.',
  keywords: 'bmi calculator, body mass index calculator, bmi chart, weight calculator, height weight calculator, free bmi calculator',
  openGraph: {
    title: 'BMI Calculator - Calculate Your Body Mass Index',
    description: 'Free BMI calculator to determine your Body Mass Index. Calculate BMI using height and weight. Get instant results and understand your weight status.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/bmi'
  }
}

export default function BMIPage() {
  return <BMICalculator />
} 