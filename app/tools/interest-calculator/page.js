import InterestCalculator from "./interest-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Interest Calculator | DevCalculators.com",
  description: "Free Interest Calculator. Calculate interest easily.",
  keywords: "interest calculator, simple interest, compound interest calculator",
  canonical: "https://DevCalculators.com/tools/interest-calculator.html",
}

export default function InterestCalculatorPage() {
  return (
    <CalculatorLayout title="Interest Calculator">
      <InterestCalculator />
    </CalculatorLayout>
  )
} 