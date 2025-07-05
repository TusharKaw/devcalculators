import BodyFatCalculator from "./body-fat-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Body Fat Calculator | DevCalculators.com",
  description: "Free Body Fat Calculator. Calculate your body fat percentage easily.",
  keywords: "body fat calculator, body fat percentage, health calculator",
  canonical: "https://DevCalculators.com/tools/body-fat-calculator.html",
}

export default function BodyFatCalculatorPage() {
  return (
    <CalculatorLayout title="Body Fat Calculator">
      <BodyFatCalculator />
    </CalculatorLayout>
  )
} 