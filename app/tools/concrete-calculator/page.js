import ConcreteCalculator from "./concrete-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Concrete Calculator | DevCalculators.com",
  description: "Free Concrete Calculator. Estimate concrete volume for slabs, footings, and columns.",
  keywords: "concrete calculator, slab calculator, concrete volume calculator",
  canonical: "https://DevCalculators.com/tools/concrete-calculator.html",
}

export default function ConcreteCalculatorPage() {
  return (
    <CalculatorLayout title="Concrete Calculator">
      <ConcreteCalculator />
    </CalculatorLayout>
  )
} 