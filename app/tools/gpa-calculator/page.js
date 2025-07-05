import GPACalculator from "./gpa-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "GPA Calculator | DevCalculators.com",
  description: "Free GPA Calculator. Calculate your grade point average.",
  keywords: "gpa calculator, grade point average, college gpa calculator",
  canonical: "https://DevCalculators.com/tools/gpa-calculator.html",
}

export default function GPACalculatorPage() {
  return (
    <CalculatorLayout title="GPA Calculator">
      <GPACalculator />
    </CalculatorLayout>
  )
} 