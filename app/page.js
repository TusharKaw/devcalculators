"use client"

import { useState } from "react"

const categories = [
  {
    title: "Financial Calculators",
    links: [
      "Mortgage Calculator",
      "Loan Calculator",
      "Interest Calculator",
      "Amortization Calculator",
      "Investment Calculator",
      "Retirement Calculator",
      "Payment Calculator",
      "Inflation Calculator",
      "Salary Calculator",
      "Sales Tax Calculator"
    ]
  },
  {
    title: "Fitness & Health Calculators",
    links: [
      "BMI Calculator",
      "Body Fat Calculator",
      "Calorie Calculator",
      "Ideal Weight Calculator",
      "Age Calculator"
    ]
  },
  {
    title: "Math Calculators",
    links: [
      "Percentage Calculator",
      "Fraction Calculator",
      "Scientific Calculator",
      "Standard Deviation Calculator",
      "Triangle Calculator",
      "GPA Calculator",
      "Grade Calculator",
      "Date Calculator",
      "Hours Calculator",
      "Time Calculator"
    ]
  },
  {
    title: "Other Calculators",
    links: [
      "Random Number Generator",
      "Password Generator",
      "Conversion Calculator",
      "Subnet Calculator",
      "Concrete Calculator"
    ]
  }
];

function calculatorRoute(link) {
  return "/tools/" + link.toLowerCase().replace(/ /g, "-");
}

export default function HomePage() {

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="site-title">DevCalculators.com</h1>
      </header>

      <main className="main-container">
        <div className="calculator-section">

          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-header">
                  <div className="category-icon">
                    {category.title.includes("Financial") && "💰"}
                    {category.title.includes("Fitness") && "💪"}
                    {category.title.includes("Math") && "🧮"}
                    {category.title.includes("Other") && "🔢"}
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                <ul className="category-links">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={calculatorRoute(link)} className="category-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button className="cta-button">
            Explore All Calculators
            <span className="arrow-icon">→</span>
          </button>
        </div>

        <aside className="sidebar">
          <div className="search-card">
            <h3 className="search-title">Free Online Calculators</h3>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search 200+ calculators..."
              />
              <button className="search-button">
                <svg className="search-icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="quick-links-card">
            <h4 className="quick-links-title">Popular Calculators</h4>
            <ul className="quick-links">
              <li><a href="#">BMI Calculator</a></li>
              <li><a href="#">Mortgage Calculator</a></li>
              <li><a href="#">Loan Calculator</a></li>
              <li><a href="#">Percentage Calculator</a></li>
              <li><a href="#">Age Calculator</a></li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo" style={{color: '#fff'}}>DevCalculators.com</div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} DevCalculators.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}