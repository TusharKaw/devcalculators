import ConversionCalculator from "./conversion-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Conversion Calculator | DevCalculators.com",
  description: "Free Conversion Calculator. Convert between units of length, weight, and more.",
  keywords: "conversion calculator, unit converter, length converter, weight converter",
  canonical: "https://DevCalculators.com/tools/conversion-calculator.html",
}

export default function ConversionCalculatorPage() {
  return (
    <CalculatorLayout title="Conversion Calculator">
      <ConversionCalculator />
    </CalculatorLayout>
  )
} 