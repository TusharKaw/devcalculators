"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CalculatorLayout({ children, title = "Calculator" }) {
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="header-content">
          <Link href="/" className="back-button">
            <span className="back-icon">←</span>
            <span className="back-text">Back to Home</span>
          </Link>
          <h1 className="header-title">
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
          </div>
        </div>
      </header>

      <main className="calculator-main">
        {children}
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