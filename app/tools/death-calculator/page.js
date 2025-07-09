import DeathCalculator from "./death-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Death Calculator | DevCalculators.com",
  description: "Estimate your death date and see a live countdown. Fun, not scientific!",
  keywords: "death calculator, life expectancy, death date, countdown",
  canonical: "https://DevCalculators.com/tools/death-calculator.html",
}

export default function DeathCalculatorPage() {
  return (
    <CalculatorLayout title="Death Calculator">
      <DeathCalculator />
    </CalculatorLayout>
  )
}
