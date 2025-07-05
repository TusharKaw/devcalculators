import InvestmentCalculator from "./investment-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Investment Calculator | DevCalculators.com",
  description: "Free Investment Calculator. Calculate investment growth over time.",
  keywords: "investment calculator, investment growth, compound interest calculator",
  canonical: "https://DevCalculators.com/tools/investment-calculator.html",
}

export default function InvestmentCalculatorPage() {
  return (
    <CalculatorLayout title="Investment Calculator">
      <InvestmentCalculator />
    </CalculatorLayout>
  )
} 