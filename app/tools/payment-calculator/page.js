import PaymentCalculator from "./payment-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Payment Calculator | DevCalculators.com",
  description: "Free Payment Calculator. Calculate loan or mortgage payments.",
  keywords: "payment calculator, loan payment, mortgage payment calculator",
  canonical: "https://DevCalculators.com/tools/payment-calculator.html",
}

export default function PaymentCalculatorPage() {
  return (
    <CalculatorLayout title="Payment Calculator">
      <PaymentCalculator />
    </CalculatorLayout>
  )
} 