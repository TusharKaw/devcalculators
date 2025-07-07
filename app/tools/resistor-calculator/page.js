import ResistorCalculator from "./resistor-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Resistor Color Code Calculator | Devcalculators.com",
  description: "Free Resistor Color Code Calculator. Calculate resistor values from color bands.",
  keywords: "resistor calculator, color code calculator, resistor value calculator",
  canonical: "https://devcalculators.com/tools/resistor-calculator",
}

export default function ResistorCalculatorPage() {
  return (
    <CalculatorLayout title="Resistor Calculator">
      <ResistorCalculator />
    </CalculatorLayout>
  )
} 
