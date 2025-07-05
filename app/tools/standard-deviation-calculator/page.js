import StandardDeviationCalculator from "./standard-deviation-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Standard Deviation Calculator | DevCalculators.com",
  description: "Free Standard Deviation Calculator. Calculate standard deviation for a data set.",
  keywords: "standard deviation calculator, statistics calculator, stddev calculator",
  canonical: "https://DevCalculators.com/tools/standard-deviation-calculator.html",
}

export default function StandardDeviationCalculatorPage() {
  return (
    <CalculatorLayout title="Standard Deviation Calculator">
      <StandardDeviationCalculator />
    </CalculatorLayout>
  )
} 