import LoanCalculator from "./loan-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Loan Calculator | DevCalculators.com",
  description: "Free Loan Calculator. Calculate monthly payments and total cost.",
  keywords: "loan calculator, payment calculator, total loan cost",
  canonical: "https://DevCalculators.com/tools/loan-calculator.html",
}

export default function LoanCalculatorPage() {
  return (
    <CalculatorLayout title="Loan Calculator">
      <LoanCalculator />
    </CalculatorLayout>
  )
} 