import ScientificCalculator from './scientific'

export const metadata = {
  title: 'Scientific Calculator - Advanced Math Functions',
  description: 'Free scientific calculator with advanced mathematical functions. Calculate trigonometric functions, logarithms, exponentials, and more complex mathematical operations.',
  keywords: 'scientific calculator, math calculator, trigonometric calculator, logarithm calculator, exponential calculator, advanced calculator, free scientific calculator',
  openGraph: {
    title: 'Scientific Calculator - Advanced Math Functions',
    description: 'Free scientific calculator with advanced mathematical functions.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/scientific'
  }
}

export default function ScientificPage() {
  return <ScientificCalculator />
} 