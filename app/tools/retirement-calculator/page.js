import RetirementCalculator from "./retirement-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Retirement Calculator | DevCalculators.com",
  description: "Free Retirement Calculator. Estimate retirement savings and income.",
  keywords: "retirement calculator, retirement savings, retirement income calculator",
  canonical: "https://DevCalculators.com/tools/retirement-calculator.html",
}

export default function RetirementCalculatorPage() {
  return (
    <CalculatorLayout title="Retirement Calculator">
      <RetirementCalculator />
    </CalculatorLayout>
  )
} 