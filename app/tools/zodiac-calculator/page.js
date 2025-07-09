import CalculatorLayout from '@/components/CalculatorLayout';
import ZodiacCalculator from './zodiac-calculator.jsx';

export const metadata = {
  title: "Zodiac Calculator | Devcalculators.com",
  description: "Free Zodiac Calculator. Check your Zodiac Sign and learn about the characteristics of each sign.",
  keywords: "zodiac calculator, zodiac, zodiac sign",
  canonical: "https://devcalculators.com/tools/zodiac-calculator",
}

export default function Page() {
  return (
    <CalculatorLayout title="Zodiac Calculator">
      <ZodiacCalculator />
    </CalculatorLayout>
  );
} 