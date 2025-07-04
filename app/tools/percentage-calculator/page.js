import PercentageCalculator from "./percentage-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Percentage Calculator | DevCalculators.com",
  description: "Free Percentage Calculator. Calculate percentages easily.",
  keywords: "percentage calculator, percent calculator, math calculator",
  canonical: "https://DevCalculators.com/tools/percentage-calculator.html",
}

export default function PercentageCalculatorPage() {
  return (
    <CalculatorLayout title="Percentage Calculator">
      <PercentageCalculator />
    </CalculatorLayout>
  )
} 