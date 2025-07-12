'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [results, setResults] = useState(null)

  const calculateLoan = (e) => {
    e.preventDefault()
    
    if (!loanAmount || !interestRate || !loanTerm) return

    const principal = parseFloat(loanAmount)
    const monthlyRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm) * 12

    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayments = monthlyPayment * numberOfPayments
    const totalInterest = totalPayments - principal

    setResults({
      monthlyPayment: monthlyPayment,
      totalPayments: totalPayments,
      totalInterest: totalInterest,
      principal: principal
    })
  }

  const clearForm = () => {
    setLoanAmount('')
    setInterestRate('')
    setLoanTerm('')
    setResults(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Loan Calculator
      </div>

      <header className="header">
        <h1>Loan Calculator</h1>
        <p>Calculate loan payments, interest, and total cost</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateLoan}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="loanAmount">Loan Amount ($)</label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interestRate">Annual Interest Rate (%)</label>
              <input
                type="number"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="loanTerm">Loan Term (years)</label>
              <input
                type="number"
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Loan
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">${results.monthlyPayment.toFixed(2)}</div>
              <div className="result-label">Monthly Payment</div>
            </div>
            <div className="result-item">
              <div className="result-value">${results.totalInterest.toFixed(2)}</div>
              <div className="result-label">Total Interest</div>
            </div>
            <div className="result-item">
              <div className="result-value">${results.totalPayments.toFixed(2)}</div>
              <div className="result-label">Total Payments</div>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About Loan Calculations</h3>
        <ul>
          <li>This calculator uses the standard loan payment formula.</li>
          <li>Interest is compounded monthly.</li>
          <li>Payments are calculated assuming equal monthly payments.</li>
          <li>This does not include additional fees or insurance costs.</li>
          <li>For accurate loan terms, consult with your lender.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 