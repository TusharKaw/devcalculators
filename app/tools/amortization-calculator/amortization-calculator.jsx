"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

function calculateAmortization(P, r, n) {
  const monthlyRate = r / 100 / 12
  const numPayments = n * 12
  const payment = P * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))
  let balance = P
  let schedule = []
  let annualData = []
  
  for (let i = 1; i <= numPayments; i++) {
    const interest = balance * monthlyRate
    const principal = payment - interest
    balance -= principal
    
    // Monthly schedule
    schedule.push({
      month: i,
      payment: payment,
      principal: principal,
      interest: interest,
      balance: balance > 0 ? balance : 0
    })
    
    // Annual data (every 12 months)
    if (i % 12 === 0 || i === numPayments) {
      const year = Math.ceil(i / 12)
      const yearStart = (year - 1) * 12
      const yearEnd = Math.min(year * 12, numPayments)
      
      const yearInterest = schedule.slice(yearStart, yearEnd).reduce((sum, x) => sum + x.interest, 0)
      const yearPrincipal = schedule.slice(yearStart, yearEnd).reduce((sum, x) => sum + x.principal, 0)
      
      annualData.push({
        year: year,
        interest: yearInterest,
        principal: yearPrincipal,
        endingBalance: balance > 0 ? balance : 0
      })
    }
  }
  
  return { payment, schedule, annualData }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AmortizationCalculator() {
  const [amount, setAmount] = useState('250000')
  const [rate, setRate] = useState('5')
  const [years, setYears] = useState('15')
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('annual')
  const [chartData, setChartData] = useState([
    { name: 'Principal', value: 250000 },
    { name: 'Interest', value: 106643 }
  ])
  const [errors, setErrors] = useState({
    amount: '',
    rate: '',
    years: ''
  })

  // Initialize with default values
  useEffect(() => {
    const defaultResult = calculateAmortization(250000, 5, 15)
    setResult(defaultResult)
  }, [])

  const validateInputs = () => {
    const newErrors = {
      amount: '',
      rate: '',
      years: ''
    }
    let isValid = true

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid loan amount'
      isValid = false
    } else if (parseFloat(amount) < 1000) {
      newErrors.amount = 'Minimum loan amount is $1,000'
      isValid = false
    }

    if (!rate || isNaN(rate) || parseFloat(rate) <= 0) {
      newErrors.rate = 'Please enter a valid interest rate'
      isValid = false
    } else if (parseFloat(rate) > 30) {
      newErrors.rate = 'Interest rate must be 30% or less'
      isValid = false
    }

    if (!years || isNaN(years) || parseInt(years) <= 0) {
      newErrors.years = 'Please enter a valid loan term'
      isValid = false
    } else if (parseInt(years) > 30) {
      newErrors.years = 'Maximum loan term is 30 years'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const calculate = () => {
    if (!validateInputs()) return

    const P = parseFloat(amount)
    const r = parseFloat(rate)
    const n = parseInt(years)
    
    const calcResult = calculateAmortization(P, r, n)
    setResult(calcResult)
    
    // Update pie chart data
    const totalInterest = calcResult.schedule.reduce((sum, x) => sum + x.interest, 0)
    const totalPrincipal = P
    setChartData([
      { name: 'Principal', value: totalPrincipal },
      { name: 'Interest', value: totalInterest }
    ])
  }

  const handleInputChange = (e, type) => {
    const value = e.target.value
    if (type === 'amount') setAmount(value)
    if (type === 'rate') setRate(value)
    if (type === 'years') setYears(value)

    // Clear error when user types
    if (errors[type]) {
      setErrors(prev => ({...prev, [type]: ''}))
    }
  }

  return (
    <div className="calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1 className="calculator-title">Amortization Calculator</h1>
          
          <div className="calculator-card">
            <div className="calculator-grid">
              <div className="input-section">
                <div className="input-group">
                  <div className="input-field">
                    <label>Loan Amount ($)</label>
                    <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => handleInputChange(e, 'amount')}
                      min="1000" 
                      step="1000"
                      placeholder="250,000"
                      className={errors.amount ? 'error' : ''}
                    />
                    {errors.amount && <span className="error-message">{errors.amount}</span>}
                  </div>
                  
                  <div className="input-field">
                    <label>Interest Rate (%)</label>
                    <input 
                      type="number" 
                      value={rate} 
                      onChange={(e) => handleInputChange(e, 'rate')}
                      min="0.1" 
                      step="0.1"
                      max="30"
                      placeholder="5.0"
                      className={errors.rate ? 'error' : ''}
                    />
                    {errors.rate && <span className="error-message">{errors.rate}</span>}
                  </div>
                  
                  <div className="input-field">
                    <label>Loan Term (years)</label>
                    <input 
                      type="number" 
                      value={years} 
                      onChange={(e) => handleInputChange(e, 'years')}
                      min="1" 
                      max="30"
                      placeholder="15"
                      className={errors.years ? 'error' : ''}
                    />
                    {errors.years && <span className="error-message">{errors.years}</span>}
                  </div>
                </div>
                
                <button className="calculate-btn" onClick={calculate}>
                  Calculate Amortization
                </button>
              </div>
              
              <div className="chart-section">
                <div className="payment-summary">
                  <h3>
                    {result ? (
                      <>Monthly Payment: <span>${result.payment.toFixed(2)}</span></>
                    ) : (
                      <>Enter your loan details to see payment</>
                    )}
                  </h3>
                  
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={500}
                          animationEasing="ease-out"
                          isAnimationActive={true}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            {result && (
              <div className="results-section">
                <div className="schedule-tabs">
                  <button 
                    className={activeTab === 'annual' ? 'active' : ''}
                    onClick={() => setActiveTab('annual')}
                  >
                    Annual Schedule
                  </button>
                  <button 
                    className={activeTab === 'monthly' ? 'active' : ''}
                    onClick={() => setActiveTab('monthly')}
                  >
                    Monthly Schedule
                  </button>
                </div>
                
                {activeTab === 'annual' ? (
                  <div className="schedule-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Interest</th>
                          <th>Principal</th>
                          <th>Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.annualData.map((row, i) => (
                          <tr key={i}>
                            <td>{row.year}</td>
                            <td>${row.interest.toFixed(2)}</td>
                            <td>${row.principal.toFixed(2)}</td>
                            <td>${row.endingBalance.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="schedule-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Payment</th>
                          <th>Principal</th>
                          <th>Interest</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.schedule.slice(0, 12).map((row, i) => (
                          <tr key={i}>
                            <td>{row.month}</td>
                            <td>${row.payment.toFixed(2)}</td>
                            <td>${row.principal.toFixed(2)}</td>
                            <td>${row.interest.toFixed(2)}</td>
                            <td>${row.balance.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="table-note">First 12 months shown</div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="about-section">
            <h2>About Amortization Calculator</h2>
            <p><strong>What is Loan Amortization?</strong> Loan amortization refers to the process of gradually paying off debt through regular, fixed payments that cover both principal and interest over a set period. This financial mechanism ensures that each payment reduces your outstanding loan balance while accounting for accrued interest. Common examples include mortgages, auto loans, and personal installment loans, where borrowers benefit from predictable repayment schedules and clear timelines for becoming debt-free.</p>
            <p><strong>How Amortization Works:</strong> Every payment consists of two components - interest charges based on your current balance and principal reduction. Early in the loan term, payments are interest-heavy, but as the principal decreases, more of each payment goes toward reducing the debt. Our amortization calculator visually demonstrates this shifting balance through interactive charts and detailed payment schedules, helping you understand your loan's true cost over time.</p>
            <p><strong>Amortization vs. Other Loan Types:</strong> Unlike revolving credit (like credit cards) or interest-only loans, amortized loans follow a systematic repayment structure. Fixed-rate mortgages are classic examples, where the same monthly payment consistently reduces your debt. Adjustable-rate mortgages and balloon loans operate differently, which our calculator accounts for when generating accurate repayment projections.</p>
          </div>
        </div>

        <div className="ad-banner">
          <div className="ad-content">
            <p>Advertisement</p>
            <div className="ad-placeholder">
              {/* Replace this with your actual ad component */}
              <span>300x250 Ad Banner</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 1.5rem;
        }
        
        .calculator-content {
          flex: 1;
          min-width: 0;
        }
        
        .ad-banner {
          width: 300px;
          flex-shrink: 0;
        }
        
        .ad-content {
          position: sticky;
          top: 1rem;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .ad-content p {
          color: #718096;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .ad-placeholder {
          width: 300px;
          height: 250px;
          background: #f7fafc;
          border: 1px dashed #cbd5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
        }
        
        .calculator-title {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 30px;
          font-size: 1.8rem;
        }
        
        .calculator-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }
        
        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        
        .input-section {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }
        
        .input-field {
          margin-bottom: 10px;
        }
        
        .input-field label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #34495e;
          font-size: 14px;
        }
        
        .input-field input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          transition: all 0.3s;
        }
        
        .input-field input.error {
          border-color: #e74c3c;
          background-color: #fdf3f2;
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 13px;
          margin-top: 5px;
          display: block;
        }
        
        .input-field input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
        }
        
        .input-field input::placeholder {
          color: #bbb;
        }
        
        .calculate-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          width: 100%;
          transition: all 0.3s;
          margin-top: 10px;
        }
        
        .calculate-btn:hover {
          background: #2980b9;
          transform: translateY(-1px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .calculate-btn:active {
          transform: translateY(0);
        }
        
        .chart-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .payment-summary h3 {
          font-size: 1.4rem;
          color: #2c3e50;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .payment-summary h3 span {
          color: #3498db;
          font-weight: 600;
        }
        
        .chart-container {
          height: 300px;
          margin: 0 auto;
        }
        
        .results-section {
          margin-top: 40px;
          border-top: 1px solid #eee;
          padding-top: 30px;
          grid-column: 1 / -1;
        }
        
        .schedule-tabs {
          display: flex;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        
        .schedule-tabs button {
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #7f8c8d;
          position: relative;
          transition: all 0.2s;
        }
        
        .schedule-tabs button:hover {
          color: #3498db;
        }
        
        .schedule-tabs button.active {
          color: #3498db;
          font-weight: 500;
        }
        
        .schedule-tabs button.active:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background: #3498db;
        }
        
        .schedule-table {
          color: #000;
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        th {
          background: #f8f9fa;
          font-weight: 500;
          color: #34495e;
        }
        
        tr:hover {
          background: #f8f9fa;
        }
        
        .table-note {
          font-size: 0.9rem;
          color: #7f8c8d;
          text-align: center;
          margin-top: 10px;
          padding: 10px;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .about-section h2 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.6rem;
        }
        
        .about-section p {
          color: #34495e;
          line-height: 1.6;
        }
        
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          
          .ad-banner {
            width: 100%;
            order: -1;
            margin-bottom: 0rem;
          }
          
          .ad-content {
            position: static;
          }
          
          .ad-placeholder {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 768px) {
          .calculator-grid {
            grid-template-columns: 1fr;
          }
          
          .chart-section {
            margin-top: 30px;
          }
        }
      `}</style>
    </div>
  )
}
