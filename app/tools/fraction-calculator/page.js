import FractionCalculator from "./fraction-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Fraction Calculator | DevCalculators.com",
  description: "Free Fraction Calculator. Add, subtract, multiply, and divide fractions.",
  keywords: "fraction calculator, add fractions, subtract fractions, multiply fractions, divide fractions",
  canonical: "https://DevCalculators.com/tools/fraction-calculator.html",
}

export default function FractionCalculatorPage() {
  return (
    <CalculatorLayout title="Fraction Calculator">
      <FractionCalculator />
    </CalculatorLayout>
  )
} 