import CalorieCalculator from "./calorie-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Calorie Calculator | DevCalculators.com",
  description: "Free Calorie Calculator. Calculate your daily calorie needs easily.",
  keywords: "calorie calculator, daily calorie needs, nutrition calculator",
  canonical: "https://DevCalculators.com/tools/calorie-calculator.html",
}

export default function CalorieCalculatorPage() {
  return (
    <CalculatorLayout title="Calorie Calculator">
      <CalorieCalculator />
    </CalculatorLayout>
  )
} 