import IdealWeightCalculator from "./ideal-weight-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Ideal Weight Calculator | DevCalculators.com",
  description: "Free Ideal Weight Calculator. Estimate your ideal body weight.",
  keywords: "ideal weight calculator, healthy weight, body weight calculator",
  canonical: "https://DevCalculators.com/tools/ideal-weight-calculator.html",
}

export default function IdealWeightCalculatorPage() {
  return (
    <CalculatorLayout title="Ideal Weight Calculator">
      <IdealWeightCalculator />
    </CalculatorLayout>
  )
} 