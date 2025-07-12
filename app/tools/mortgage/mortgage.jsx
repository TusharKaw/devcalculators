'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MortgageCalculator() {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: '30',
    downPayment: '',
    propertyTax: '',
    insurance: ''
  })
  const [results, setResults] = useState(null)
  const [amortizationSchedule, setAmortizationSchedule] = useState([])

  const calculateMortgage = (e) => {
    e.preventDefault()
    
    const { loanAmount, interestRate, loanTerm, downPayment, propertyTax, insurance } = formData
    
    if (!loanAmount || !interestRate) return

    const principal = parseFloat(loanAmount) - (parseFloat(downPayment) || 0)
    const monthlyRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseInt(loanTerm) * 12

    // Calculate monthly payment using the mortgage payment formula
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayments = monthlyPayment * numberOfPayments
    const totalInterest = totalPayments - principal

    // Calculate additional monthly costs
    const monthlyTax = (parseFloat(propertyTax) || 0) / 12
    const monthlyInsurance = (parseFloat(insurance) || 0) / 12
    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance

    setResults({
      principal: principal.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2)
    })

    // Generate amortization schedule
    generateAmortizationSchedule(principal, monthlyRate, numberOfPayments, monthlyPayment)
  }

  const generateAmortizationSchedule = (principal, monthlyRate, numberOfPayments, monthlyPayment) => {
    const schedule = []
    let remainingBalance = principal

    for (let year = 1; year <= Math.min(5, numberOfPayments / 12); year++) {
      const yearStart = (year - 1) * 12 + 1
      const yearEnd = Math.min(year * 12, numberOfPayments)
      
      let yearInterest = 0
      let yearPrincipal = 0

      for (let month = yearStart; month <= yearEnd; month++) {
        const interestPayment = remainingBalance * monthlyRate
        const principalPayment = monthlyPayment - interestPayment
        
        yearInterest += interestPayment
        yearPrincipal += principalPayment
        remainingBalance -= principalPayment
      }

      schedule.push({
        year,
        payment: (monthlyPayment * 12).toFixed(2),
        principal: yearPrincipal.toFixed(2),
        interest: yearInterest.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2)
      })
    }

    setAmortizationSchedule(schedule)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Mortgage Calculator
      </div>

      <header className="header">
        <h1>Mortgage Calculator</h1>
        <p>Calculate your monthly mortgage payments and total interest</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateMortgage}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="loanAmount">Loan Amount ($)</label>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                placeholder="Enter loan amount"
                min="0"
                step="1000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interestRate">Interest Rate (%)</label>
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
                placeholder="Enter interest rate"
                min="0"
                max="20"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="loanTerm">Loan Term (years)</label>
              <select
                id="loanTerm"
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
              >
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="downPayment">Down Payment ($)</label>
              <input
                type="number"
                id="downPayment"
                name="downPayment"
                value={formData.downPayment}
                onChange={handleInputChange}
                placeholder="Enter down payment"
                min="0"
                step="1000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyTax">Annual Property Tax ($)</label>
              <input
                type="number"
                id="propertyTax"
                name="propertyTax"
                value={formData.propertyTax}
                onChange={handleInputChange}
                placeholder="Enter annual property tax"
                min="0"
                step="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="insurance">Annual Insurance ($)</label>
              <input
                type="number"
                id="insurance"
                name="insurance"
                value={formData.insurance}
                onChange={handleInputChange}
                placeholder="Enter annual insurance"
                min="0"
                step="100"
              />
            </div>
          </div>

          <button type="submit" className="calculate-btn">
            Calculate Mortgage
          </button>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{formatCurrency(results.monthlyPayment)}</div>
              <div className="result-label">Monthly Payment</div>
            </div>
            <div className="result-item">
              <div className="result-value">{formatCurrency(results.totalMonthlyPayment)}</div>
              <div className="result-label">Total Monthly Payment</div>
            </div>
            <div className="result-item">
              <div className="result-value">{formatCurrency(results.totalInterest)}</div>
              <div className="result-label">Total Interest</div>
            </div>
            <div className="result-item">
              <div className="result-value">{formatCurrency(results.totalPayments)}</div>
              <div className="result-label">Total Payments</div>
            </div>
          </div>
        )}
      </div>

      {amortizationSchedule.length > 0 && (
        <div className="info-section">
          <h3>Amortization Schedule (First 5 Years)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e1e5e9' }}>Year</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e1e5e9' }}>Annual Payment</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e1e5e9' }}>Principal</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e1e5e9' }}>Interest</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e1e5e9' }}>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e1e5e9' }}>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{row.year}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{formatCurrency(row.payment)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{formatCurrency(row.principal)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{formatCurrency(row.interest)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{formatCurrency(row.remainingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="info-section">
        <h3>About Mortgage Calculations</h3>
        <ul>
          <li>This calculator uses the standard mortgage payment formula.</li>
          <li>Property tax and insurance are added to the monthly payment.</li>
          <li>Down payment reduces the principal loan amount.</li>
          <li>Interest rates are compounded monthly.</li>
          <li>Results are estimates - actual payments may vary.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 