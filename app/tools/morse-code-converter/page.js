import MorseCodeConverter from "./morse-code-converter.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Morse Code Converter | Devcalculators.com",
  description: "Free Morse Code Converter. Convert text to Morse code and binary.",
  keywords: "morse code converter, binary converter, text to morse code",
  canonical: "https://Devcalculators.com/tools/morse-code-converter.html",
}

export default function AgeCalculatorPage() {
  return (
    <CalculatorLayout title="Morse Code Converter">
      <MorseCodeConverter />
    </CalculatorLayout>
  )
} 