import PasswordGenerator from "./password-generator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Password Generator | DevCalculators.com",
  description: "Free Password Generator. Create strong, random passwords.",
  keywords: "password generator, random password, strong password",
  canonical: "https://DevCalculators.com/tools/password-generator.html",
}

export default function PasswordGeneratorPage() {
  return (
    <CalculatorLayout title="Password Generator">
      <PasswordGenerator />
    </CalculatorLayout>
  )
} 