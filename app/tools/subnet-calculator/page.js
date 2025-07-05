import SubnetCalculator from "./subnet-calculator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Subnet Calculator | DevCalculators.com",
  description: "Free Subnet Calculator. Calculate network, broadcast, and usable IPs.",
  keywords: "subnet calculator, ip calculator, network calculator",
  canonical: "https://DevCalculators.com/tools/subnet-calculator.html",
}

export default function SubnetCalculatorPage() {
  return (
    <CalculatorLayout title="Subnet Calculator">
      <SubnetCalculator />
    </CalculatorLayout>
  )
} 