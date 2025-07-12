import Link from 'next/link'

export const metadata = {
  title: 'Free Online Calculators - Math, Finance, Health & More',
  description: 'Free online calculators for math, finance, health, and more. Easy-to-use tools for everyday calculations. Calculate BMI, calories, mortgage, percentage, and more.',
  keywords: 'free calculator, online calculator, bmi calculator, calorie calculator, mortgage calculator, percentage calculator, math calculator',
  openGraph: {
    title: 'Free Online Calculators - Math, Finance, Health & More',
    description: 'Free online calculators for math, finance, health, and more. Easy-to-use tools for everyday calculations.',
  }
}

const calculators = [
  {
    category: 'Health & Fitness',
    tools: [
      { name: 'BMI Calculator', path: '/tools/bmi', description: 'Calculate your Body Mass Index (BMI) to assess your weight status' },
      { name: 'Calorie Calculator', path: '/tools/calorie', description: 'Calculate daily calorie needs based on age, weight, height, and activity level' },
      { name: 'Body Fat Calculator', path: '/tools/body-fat', description: 'Estimate body fat percentage using various measurement methods' },
      { name: 'TDEE Calculator', path: '/tools/tdee', description: 'Calculate Total Daily Energy Expenditure for weight management' },
    ]
  },
  {
    category: 'Finance',
    tools: [
      { name: 'Mortgage Calculator', path: '/tools/mortgage', description: 'Calculate monthly mortgage payments and total interest' },
      { name: 'Loan Calculator', path: '/tools/loan', description: 'Calculate loan payments, interest, and amortization schedule' },
      { name: 'Compound Interest Calculator', path: '/tools/compound-interest', description: 'Calculate compound interest growth over time' },
      { name: 'Percentage Calculator', path: '/tools/percentage', description: 'Calculate percentages, discounts, and markups' },
    ]
  },
  {
    category: 'Math',
    tools: [
      { name: 'Scientific Calculator', path: '/tools/scientific', description: 'Advanced mathematical calculations and functions' },
      { name: 'Age Calculator', path: '/tools/age', description: 'Calculate exact age between two dates' },
      { name: 'Unit Converter', path: '/tools/unit-converter', description: 'Convert between different units of measurement' },
      { name: 'Area Calculator', path: '/tools/area', description: 'Calculate area of various geometric shapes' },
    ]
  },
  {
    category: 'Lifestyle',
    tools: [
      { name: 'Pregnancy Calculator', path: '/tools/pregnancy', description: 'Calculate due date and pregnancy milestones' },
      { name: 'Sleep Calculator', path: '/tools/sleep', description: 'Find optimal sleep schedule based on wake time' },
      { name: 'Water Intake Calculator', path: '/tools/water-intake', description: 'Calculate daily water intake recommendations' },
      { name: 'Macro Calculator', path: '/tools/macro', description: 'Calculate macronutrient ratios for your diet' },
    ]
  }
]

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>Free Online Calculators</h1>
        <p>Professional tools for math, finance, health, and everyday calculations</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-grid">
        {calculators.map((category, index) => (
          <div key={index} className="category">
            <h2>{category.category}</h2>
            <ul className="tool-list">
              {category.tools.map((tool, toolIndex) => (
                <li key={toolIndex} className="tool-item">
                  <Link href={tool.path} className="tool-link">
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-description">{tool.description}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>

      <footer className="footer">
        <p>&copy; 2024 DevCalculators. All calculators are free to use.</p>
      </footer>
    </div>
  )
}
