import TriangleCalculator from "./triangle-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Triangle Calculator | DevCalculators.com",
  description: "Free Triangle Calculator. Calculate area, perimeter, and sides of a triangle.",
  keywords: "triangle calculator, area of triangle, triangle sides calculator",
  canonical: "https://DevCalculators.com/tools/triangle-calculator.html",
}

export default function TriangleCalculatorPage() {
  return (
    <CalculatorLayout title="Triangle Calculator">
      <TriangleCalculator />
    </CalculatorLayout>
  )
} 