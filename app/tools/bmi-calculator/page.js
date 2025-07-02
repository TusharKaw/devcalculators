import BMICalculator from "./bmi-calculator"

export const metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index | Calculator.net",
  description:
    "Free BMI calculator to determine your body mass index. Calculate BMI for adults and children with metric and imperial units.",
  keywords: "BMI calculator, body mass index, BMI chart, healthy weight calculator",
  canonical: "https://calculator.net/bmi-calculator.html",
}

export default function BMICalculatorPage() {
  return <BMICalculator />
}
