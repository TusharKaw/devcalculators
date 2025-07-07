import NameCompatibilityCalculator from "./name-compatibility-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Name Compatibility Calculator | Devcalculators.com",
  description: "Free Name Compatibility Calculator. Check compatibility between names.",
  keywords: "name compatibility calculator, name compatibility, name matching",
  canonical: "https://Devcalculators.com/tools/name-compatibility-calculator.html",
}

export default function NameCompatibilityCalculatorPage() {
  return (
    <CalculatorLayout title="Time Zone Converter">
      <NameCompatibilityCalculator />
    </CalculatorLayout>
  )
} 