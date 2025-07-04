import BMICalculator from "./bmi-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index | DevCalculators.com",
  description:
    "Free BMI calculator to determine your body mass index. Calculate BMI for adults and children with metric and imperial units.",
  keywords: "BMI calculator, body mass index, BMI chart, healthy weight calculator",
  canonical: "https://DevCalculators.com/bmi-calculator.html",
}

export default function BMICalculatorPage() {
  return (
    <CalculatorLayout title="BMI Calculator">
      <BMICalculator />
    </CalculatorLayout>
  )
}
