"use client"

import { useState, useEffect } from "react"
import Head from "next/head"

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
  // Converts "BMI Calculator" to "/tools/bmi-calculator"
  return "/tools/" + link.toLowerCase().replace(/ /g, "-");
}

export default function HomePage() {
  const [display, setDisplay] = useState("0")
  const [isDegree, setIsDegree] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [memory, setMemory] = useState(0)
  const [history, setHistory] = useState([])

  // Toggle dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  const handleButtonClick = (value) => {
    if (value === "AC") {
      setDisplay("0")
      setHistory([])
    } else if (value === "=") {
      try {
        let expression = display
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/sin/g, isDegree ? "Math.sin(Math.PI/180*" : "Math.sin(")
          .replace(/cos/g, isDegree ? "Math.cos(Math.PI/180*" : "Math.cos(")
          .replace(/tan/g, isDegree ? "Math.tan(Math.PI/180*" : "Math.tan(")
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/\^/g, "**")
          .replace(/√/g, "Math.sqrt(")
          .replace(/log/g, "Math.log10(")
          .replace(/ln/g, "Math.log(")
          .replace(/!/g, "factorial(")

        // Close any open parentheses from functions
        const openParens = (expression.match(/\(/g) || []).length
        const closeParens = (expression.match(/\)/g) || []).length
        expression += ")".repeat(openParens - closeParens)

        // Custom factorial function
        const factorial = (n) => {
          if (n < 0) return NaN
          if (n === 0 || n === 1) return 1
          let result = 1
          for (let i = 2; i <= n; i++) result *= i
          return result
        }

        const result = eval(expression)
        setHistory([...history, `${display} = ${result}`])
        setDisplay(result.toString())
      } catch {
        setDisplay("Error")
        setTimeout(() => setDisplay("0"), 1000)
      }
    } else if (value === "Back") {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : "0")
    } else if (value === "±") {
      setDisplay(prev => prev.startsWith("-") ? prev.slice(1) : `-${prev}`)
    } else if (value === "M+") {
      setMemory(prev => prev + parseFloat(display))
    } else if (value === "M-") {
      setMemory(prev => prev - parseFloat(display))
    } else if (value === "MR") {
      setDisplay(memory.toString())
    } else if (value === "Ans" && history.length > 0) {
      const lastResult = history[history.length - 1].split("=")[1].trim()
      setDisplay(lastResult)
    } else if (display === "0" && !isNaN(value)) {
      setDisplay(value)
    } else {
      setDisplay(prev => prev === "0" && value !== "." ? value : prev + value)
    }
  }

  const calculatorButtons = [
    { text: "sin", type: "function" },
    { text: "cos", type: "function" },
    { text: "tan", type: "function" },
    { text: "7", type: "number" },
    { text: "8", type: "number" },
    { text: "9", type: "number" },
    { text: "+", type: "operator" },
    { text: "Back", type: "function" },

    { text: "sin⁻¹", type: "function" },
    { text: "cos⁻¹", type: "function" },
    { text: "tan⁻¹", type: "function" },
    { text: "π", type: "constant" },
    { text: "e", type: "constant" },
    { text: "4", type: "number" },
    { text: "5", type: "number" },
    { text: "6", type: "number" },
    { text: "-", type: "operator" },
    { text: "Ans", type: "function" },

    { text: "x^y", type: "function" },
    { text: "x³", type: "function" },
    { text: "x²", type: "function" },
    { text: "eˣ", type: "function" },
    { text: "10ˣ", type: "function" },
    { text: "1", type: "number" },
    { text: "2", type: "number" },
    { text: "3", type: "number" },
    { text: "×", type: "operator" },
    { text: "M+", type: "memory" },

    { text: "y/x", type: "function" },
    { text: "³√x", type: "function" },
    { text: "√x", type: "function" },
    { text: "ln", type: "function" },
    { text: "log", type: "function" },
    { text: "0", type: "number" },
    { text: ".", type: "number" },
    { text: "EXP", type: "function" },
    { text: "÷", type: "operator" },
    { text: "M-", type: "memory" },

    { text: "(", type: "operator" },
    { text: ")", type: "operator" },
    { text: "1/x", type: "function" },
    { text: "%", type: "function" },
    { text: "n!", type: "function" },
    { text: "±", type: "function" },
    { text: "RND", type: "function" },
    { text: "AC", type: "clear" },
    { text: "=", type: "equals" },
    { text: "MR", type: "memory" },
  ]

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Head>
        <title>DevCalculators.com | Free Online Calculators</title>
        <meta name="description" content="Free online calculators for finance, health, math and more" />
      </Head>

      <header className="header">
        <div className="header-content">
          <h1>
            <span className="logo-icon">🧮</span>
            <span>DevCalculators</span>
            <span className="logo-net">.com</span>
          </h1>
          <div className="header-actions">
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="sign-in-btn">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="calculator-section">
          <div className="calculator-card">
            <div className="calculator-display">
              <div className="display-history">
                {history.length > 0 && (
                  <div className="history-item">{history[history.length - 1]}</div>
                )}
              </div>
              <div className="display-current">{display}</div>
              <div className="memory-indicator">
                {memory !== 0 && `M: ${memory}`}
              </div>
            </div>

            <div className="calculator-settings">
              <div className="angle-toggle">
                <button
                  className={`angle-btn ${isDegree ? 'active' : ''}`}
                  onClick={() => setIsDegree(true)}
                >
                  DEG
                </button>
                <button
                  className={`angle-btn ${!isDegree ? 'active' : ''}`}
                  onClick={() => setIsDegree(false)}
                >
                  RAD
                </button>
              </div>
            </div>

            <div className="calculator-buttons">
              {calculatorButtons.map((btn, index) => (
                <button
                  key={index}
                  className={`calc-btn ${btn.type} ${btn.text === display ? 'active' : ''}`}
                  onClick={() => handleButtonClick(btn.text)}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>

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
          <div className="footer-logo">DevCalculators.com</div>
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