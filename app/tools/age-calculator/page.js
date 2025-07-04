import AgeCalculator from "./age-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Age Calculator | DevCalculators.com",
  description: "Free Age Calculator. Calculate your age in years, months, and days.",
  keywords: "age calculator, birthday calculator, calculate age",
  canonical: "https://DevCalculators.com/tools/age-calculator.html",
}

export default function AgeCalculatorPage() {
  return (
    <CalculatorLayout title="Age Calculator">
      <AgeCalculator />
    </CalculatorLayout>
  )
} 