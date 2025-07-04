import TimeCalculator from "./time-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Time Calculator | DevCalculators.com",
  description: "Free Time Calculator. Add, subtract, and convert time easily.",
  keywords: "time calculator, add time, subtract time, time conversion",
  canonical: "https://DevCalculators.com/tools/time-calculator.html",
}

export default function TimeCalculatorPage() {
  return (
    <CalculatorLayout title="Time Calculator">
      <TimeCalculator />
    </CalculatorLayout>
  )
} 