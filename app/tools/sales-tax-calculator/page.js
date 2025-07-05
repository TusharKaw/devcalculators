import SalesTaxCalculator from "./sales-tax-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Sales Tax Calculator | DevCalculators.com",
  description: "Free Sales Tax Calculator. Calculate sales tax and total price.",
  keywords: "sales tax calculator, tax calculator, total price calculator",
  canonical: "https://DevCalculators.com/tools/sales-tax-calculator.html",
}

export default function SalesTaxCalculatorPage() {
  return (
    <CalculatorLayout title="Sales Tax Calculator">
      <SalesTaxCalculator />
    </CalculatorLayout>
  )
} 