'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/" className="nav-logo">
            DevCalculators
          </Link>
        </div>

        <div className="nav-menu">
          <Link href="/" className="nav-link">
            Home
          </Link>
          
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">
              Calculators
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="nav-dropdown-content">
              {calculatorCategories.map((category, index) => (
                <div key={index} className="dropdown-category">
                  <div className="dropdown-category-title">{category.name}</div>
                  {category.calculators.map((calc, calcIndex) => (
                    <Link
                      key={calcIndex}
                      href={calc.path}
                      className="dropdown-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="nav-mobile-menu">
          <Link href="/" className="nav-mobile-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          {calculatorCategories.map((category, index) => (
            <div key={index} className="nav-mobile-category">
              <div className="nav-mobile-category-title">{category.name}</div>
              {category.calculators.map((calc, calcIndex) => (
                <Link
                  key={calcIndex}
                  href={calc.path}
                  className="nav-mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
} 