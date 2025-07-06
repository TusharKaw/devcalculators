"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CalculatorLayout({ children, title = "Calculator" }) {
  return (
    <div className="app-container">
      <Link href="/">
      <header className="header">
        <h1 className="site-title">DevCalculators.com</h1>
      </header>
      </Link>

      <main className="calculator-main">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo" style={{color:'#fff'}}>DevCalculators.com</div>
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