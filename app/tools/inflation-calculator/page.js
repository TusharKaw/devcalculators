import InflationCalculator from "./inflation-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Inflation Calculator | DevCalculators.com",
  description: "Free Inflation Calculator. Calculate the effect of inflation on money.",
  keywords: "inflation calculator, inflation rate, value of money",
  canonical: "https://DevCalculators.com/tools/inflation-calculator.html",
}

export default function InflationCalculatorPage() {
  return (
    <CalculatorLayout title="Inflation Calculator">
      <InflationCalculator />
    </CalculatorLayout>
  )
} 