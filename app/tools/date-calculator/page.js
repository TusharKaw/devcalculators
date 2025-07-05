import DateCalculator from "./date-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Date Calculator | DevCalculators.com",
  description: "Free Date Calculator. Calculate date differences and add/subtract days.",
  keywords: "date calculator, date difference, add days, subtract days",
  canonical: "https://DevCalculators.com/tools/date-calculator.html",
}

export default function DateCalculatorPage() {
  return (
    <CalculatorLayout title="Date Calculator">
      <DateCalculator />
    </CalculatorLayout>
  )
} 