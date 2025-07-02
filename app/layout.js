import "./globals.css"

export const metadata = {
  title: "Calculator.net - Free Online Calculators",
  description:
    "Free online calculators for math, finance, health, and more. Calculate BMI, loans, percentages, and other calculations easily.",
  keywords: "calculator, online calculator, math calculator, financial calculator, BMI calculator",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
