import SuperheroNameGenerator from "./superhero-name-generator.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Superhero Name Generator | Devcalculators.com",
  description: "Free Superhero Name Generator. Convert your name to your Superhero name.",
  keywords: "superhero, superhero name, superhero name generator",
  canonical: "https://devcalculators.com/tools/superhero-name-generator",
}

export default function SuperheroNameGeneratorPage() {
  return (
    <CalculatorLayout title="Superhero Name Generator">
      <SuperheroNameGenerator />
    </CalculatorLayout>
  )
} 