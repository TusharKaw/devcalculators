import SalaryCalculator from "./salary-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Salary Calculator | DevCalculators.com",
  description: "Free Salary Calculator. Convert salary between hourly, monthly, and yearly.",
  keywords: "salary calculator, hourly to yearly, monthly salary calculator",
  canonical: "https://DevCalculators.com/tools/salary-calculator.html",
}

export default function SalaryCalculatorPage() {
  return (
    <CalculatorLayout title="Salary Calculator">
      <SalaryCalculator />
    </CalculatorLayout>
  )
} 