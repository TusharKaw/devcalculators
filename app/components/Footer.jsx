import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const calculatorCategories = [
    {
      name: 'Health & Fitness',
      calculators: [
        { name: 'BMI Calculator', path: '/tools/bmi' },
        { name: 'Calorie Calculator', path: '/tools/calorie' },
        { name: 'Body Fat Calculator', path: '/tools/body-fat' },
        { name: 'TDEE Calculator', path: '/tools/tdee' },
        { name: 'Water Intake Calculator', path: '/tools/water-intake' },
        { name: 'Macro Calculator', path: '/tools/macro' },
        { name: 'Sleep Calculator', path: '/tools/sleep' }
      ]
    },
    {
      name: 'Finance',
      calculators: [
        { name: 'Mortgage Calculator', path: '/tools/mortgage' },
        { name: 'Loan Calculator', path: '/tools/loan' },
        { name: 'Compound Interest Calculator', path: '/tools/compound-interest' },
        { name: 'Percentage Calculator', path: '/tools/percentage' }
      ]
    },
    {
      name: 'Math',
      calculators: [
        { name: 'Scientific Calculator', path: '/tools/scientific' },
        { name: 'Age Calculator', path: '/tools/age' },
        { name: 'Unit Converter', path: '/tools/unit-converter' },
        { name: 'Area Calculator', path: '/tools/area' }
      ]
    }
  ]

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">DevCalculators</h3>
          <p className="footer-description">
            Free online calculators for math, finance, health, and more. 
            Professional tools for everyday calculations.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <span>📘</span>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <span>🐦</span>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <span>📷</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Popular Calculators</h4>
          <ul className="footer-links">
            <li><Link href="/tools/bmi">BMI Calculator</Link></li>
            <li><Link href="/tools/mortgage">Mortgage Calculator</Link></li>
            <li><Link href="/tools/calorie">Calorie Calculator</Link></li>
            <li><Link href="/tools/percentage">Percentage Calculator</Link></li>
            <li><Link href="/tools/scientific">Scientific Calculator</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Categories</h4>
          <ul className="footer-links">
            {calculatorCategories.map((category, index) => (
              <li key={index}>
                <Link href={`/tools/${category.calculators[0].path.split('/')[2]}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            &copy; {currentYear} DevCalculators. All rights reserved.
          </p>
          <p className="footer-disclaimer">
            All calculators are for educational purposes only. 
            Please consult professionals for financial or medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
} 