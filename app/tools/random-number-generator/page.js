import RandomNumberGenerator from "./random-number-generator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Random Number Generator | DevCalculators.com",
  description: "Free Random Number Generator. Generate random numbers in a range.",
  keywords: "random number generator, rng, randomizer",
  canonical: "https://DevCalculators.com/tools/random-number-generator.html",
}

export default function RandomNumberGeneratorPage() {
  return (
    <CalculatorLayout title="Random Number Generator">
      <RandomNumberGenerator />
    </CalculatorLayout>
  )
} 