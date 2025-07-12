'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [frequency, setFrequency] = useState('annually')
  const [results, setResults] = useState(null)

  const calculateCompoundInterest = (e) => {
    e.preventDefault()
    
    if (!principal || !rate || !time) return

    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(time)
    
    const frequencyMap = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365
    }
    
    const n = frequencyMap[frequency]
    const amount = p * Math.pow(1 + r/n, n*t)
    const interest = amount - p

    setResults({
      principal: p,
      interest: interest,
      amount: amount,
      rate: rate,
      time: time,
      frequency: frequency
    })
  }

  const clearForm = () => {
    setPrincipal('')
    setRate('')
    setTime('')
    setFrequency('annually')
    setResults(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Compound Interest Calculator
      </div>

      <header className="header">
        <h1>Compound Interest Calculator</h1>
        <p>Calculate compound interest growth over time</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateCompoundInterest}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="principal">Principal Amount ($)</label>
              <input
                type="number"
                id="principal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rate">Annual Interest Rate (%)</label>
              <input
                type="number"
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter interest rate"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time (years)</label>
              <input
                type="number"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time period"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="frequency">Compounding Frequency</label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="annually">Annually</option>
                <option value="semiannually">Semi-annually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Interest
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">${results.principal.toFixed(2)}</div>
              <div className="result-label">Principal Amount</div>
            </div>
            <div className="result-item">
              <div className="result-value">${results.interest.toFixed(2)}</div>
              <div className="result-label">Interest Earned</div>
            </div>
            <div className="result-item">
              <div className="result-value">${results.amount.toFixed(2)}</div>
              <div className="result-label">Total Amount</div>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About Compound Interest</h3>
        <ul>
          <li>Compound interest is interest earned on both the principal and accumulated interest.</li>
          <li>More frequent compounding (e.g., daily vs annually) results in higher returns.</li>
          <li>The formula used is: A = P(1 + r/n)^(nt)</li>
          <li>Where: A = final amount, P = principal, r = rate, n = compounding frequency, t = time</li>
          <li>This calculator assumes no additional deposits or withdrawals.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 