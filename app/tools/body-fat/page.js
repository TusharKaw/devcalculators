import BodyFatCalculator from './body-fat'

export const metadata = {
  title: 'Body Fat Calculator - Calculate Body Fat Percentage',
  description: 'Free body fat calculator to estimate your body fat percentage using various measurement methods. Calculate body fat using skinfold measurements or body measurements.',
  keywords: 'body fat calculator, body fat percentage calculator, skinfold calculator, body composition calculator, free body fat calculator',
  openGraph: {
    title: 'Body Fat Calculator - Calculate Body Fat Percentage',
    description: 'Free body fat calculator to estimate your body fat percentage using various measurement methods.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/body-fat'
  }
}

export default function BodyFatPage() {
  return <BodyFatCalculator />
} 