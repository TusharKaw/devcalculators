import GradeCalculator from "./grade-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Grade Calculator | DevCalculators.com",
  description: "Free Grade Calculator. Calculate your final grade based on scores and weights.",
  keywords: "grade calculator, final grade calculator, weighted grade calculator",
  canonical: "https://DevCalculators.com/tools/grade-calculator.html",
}

export default function GradeCalculatorPage() {
  return (
    <CalculatorLayout title="Grade Calculator">
      <GradeCalculator />
    </CalculatorLayout>
  )
} 