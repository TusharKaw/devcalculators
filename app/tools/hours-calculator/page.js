import HoursCalculator from "./hours-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Hours Calculator | DevCalculators.com",
  description: "Free Hours Calculator. Add and subtract hours and minutes easily.",
  keywords: "hours calculator, time calculator, add hours, subtract hours",
  canonical: "https://DevCalculators.com/tools/hours-calculator.html",
}

export default function HoursCalculatorPage() {
  return (
    <CalculatorLayout title="Hours Calculator">
      <HoursCalculator />
    </CalculatorLayout>
  )
} 