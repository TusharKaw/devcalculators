import MortgageCalculator from "./mortgage-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Mortgage Calculator | DevCalculators.com",
  description: "Free Mortgage Calculator. Calculate your monthly mortgage payments easily.",
  keywords: "mortgage calculator, home loan calculator, mortgage payment calculator",
  canonical: "https://DevCalculators.com/tools/mortgage-calculator.html",
}

export default function MortgageCalculatorPage() {
  return (
    <CalculatorLayout title="Mortgage Calculator">
      <MortgageCalculator />
    </CalculatorLayout>
  )
} 