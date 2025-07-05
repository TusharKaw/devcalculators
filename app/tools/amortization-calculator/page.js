import AmortizationCalculator from "./amortization-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Amortization Calculator | DevCalculators.com",
  description: "Free Amortization Calculator. Calculate loan amortization schedules.",
  keywords: "amortization calculator, loan amortization, amortization schedule",
  canonical: "https://DevCalculators.com/tools/amortization-calculator.html",
}

export default function AmortizationCalculatorPage() {
  return (
    <CalculatorLayout title="Amortization Calculator">
      <AmortizationCalculator />
    </CalculatorLayout>
  )
} 