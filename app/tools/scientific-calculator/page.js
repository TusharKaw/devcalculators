import ScientificCalculator from "./scientific-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Scientific Calculator | DevCalculators.com",
  description: "Free Scientific Calculator. Perform advanced math calculations.",
  keywords: "scientific calculator, math calculator, advanced calculator",
  canonical: "https://DevCalculators.com/tools/scientific-calculator.html",
}

export default function ScientificCalculatorPage() {
  return (
    <CalculatorLayout title="Scientific Calculator">
      <ScientificCalculator />
    </CalculatorLayout>
  )
} 