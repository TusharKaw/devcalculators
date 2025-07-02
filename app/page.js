"use client"

import { useState } from "react"

export default function HomePage() {
  const [display, setDisplay] = useState("0")
  const [isDegree, setIsDegree] = useState(true)

  const handleButtonClick = (value) => {
    if (value === "AC") {
      setDisplay("0")
    } else if (value === "=") {
      try {
        // Simple evaluation - in production, use a proper math parser
        const result = eval(display.replace(/×/g, "*").replace(/÷/g, "/"))
        setDisplay(result.toString())
      } catch {
        setDisplay("Error")
      }
    } else if (display === "0" && !isNaN(value)) {
      setDisplay(value)
    } else {
      setDisplay(display + value)
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
    { text: "π", type: "function" },
    { text: "e", type: "function" },
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
    { text: "M+", type: "function" },

    { text: "y/x", type: "function" },
    { text: "³√x", type: "function" },
    { text: "√x", type: "function" },
    { text: "ln", type: "function" },
    { text: "log", type: "function" },
    { text: "0", type: "number" },
    { text: ".", type: "number" },
    { text: "EXP", type: "function" },
    { text: "÷", type: "operator" },
    { text: "M-", type: "function" },

    { text: "(", type: "operator" },
    { text: ")", type: "operator" },
    { text: "1/x", type: "function" },
    { text: "%", type: "function" },
    { text: "n!", type: "function" },
    { text: "±", type: "function" },
    { text: "RND", type: "function" },
    { text: "AC", type: "function" },
    { text: "=", type: "operator" },
    { text: "MR", type: "function" },
  ]

  const categories = [
    {
      title: "Financial Calculators",
      icon: "/placeholder.svg?height=60&width=60",
      links: [
        "Mortgage Calculator",
        "Loan Calculator",
        "Auto Loan Calculator",
        "Interest Calculator",
        "Payment Calculator",
        "Retirement Calculator",
        "Amortization Calculator",
        "Investment Calculator",
        "Inflation Calculator",
        "Finance Calculator",
        "Income Tax Calculator",
        "Compound Interest Calculator",
        "Salary Calculator",
        "Interest Rate Calculator",
        "Sales Tax Calculator",
      ],
    },
    {
      title: "Fitness & Health Calculators",
      icon: "/placeholder.svg?height=60&width=60",
      links: [
        "BMI Calculator",
        "Calorie Calculator",
        "Body Fat Calculator",
        "BMR Calculator",
        "Ideal Weight Calculator",
        "Pace Calculator",
        "Pregnancy Calculator",
        "Pregnancy Conception Calculator",
        "Due Date Calculator",
      ],
    },
    {
      title: "Math Calculators",
      icon: "/placeholder.svg?height=60&width=60",
      links: [
        "Scientific Calculator",
        "Fraction Calculator",
        "Percentage Calculator",
        "Random Number Generator",
        "Triangle Calculator",
        "Standard Deviation Calculator",
      ],
    },
    {
      title: "Other Calculators",
      icon: "/placeholder.svg?height=60&width=60",
      links: [
        "Age Calculator",
        "Date Calculator",
        "Time Calculator",
        "Hours Calculator",
        "GPA Calculator",
        "Grade Calculator",
        "Concrete Calculator",
        "Subnet Calculator",
        "Password Generator",
        "Conversion Calculator",
      ],
    },
  ]

  return (
    <div>
      <header className="header">
        <h1>Calculator.net</h1>
        <a href="#" className="sign-in">
          sign in
        </a>
      </header>

      <div className="main-container">
        <div className="calculator-section">
          <div className="calculator-container">
            <div className="calculator-display">{display}</div>

            <div style={{ marginBottom: "10px", fontSize: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="deg-rad-toggle">
                <input type="radio" id="deg" name="angle" checked={isDegree} onChange={() => setIsDegree(true)} />
                <label htmlFor="deg">Deg</label>
                <input type="radio" id="rad" name="angle" checked={!isDegree} onChange={() => setIsDegree(false)} />
                <label htmlFor="rad">Rad</label>
              </div>
            </div>

            <div className="calculator-buttons">
              {calculatorButtons.map((btn, index) => (
                <button key={index} className={`calc-btn ${btn.type}`} onClick={() => handleButtonClick(btn.text)}>
                  {btn.text}
                </button>
              ))}
            </div>
          </div>

          <div className="categories-section">
            {categories.map((category, index) => (
              <div key={index} className="category">
                <div className="category-header">
                  <div className="category-icon" style={{ backgroundImage: `url(${category.icon})` }}></div>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                <ul className="category-links">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button className="all-calculators-btn">All Calculators ▶</button>
        </div>

        <div className="sidebar">
          <div className="search-box">
            <h3 className="search-title">Free Online Calculators</h3>
            <form className="search-form">
              <input type="text" className="search-input" placeholder="Search calculators..." />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
