"use client"

import { useState, useEffect } from "react"

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("50")
  const [tipPercentage, setTipPercentage] = useState("15")
  const [numberOfPeople, setNumberOfPeople] = useState("2")
  const [customTip, setCustomTip] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const tipOptions = [
    { value: "10", label: "10%", description: "Poor service" },
    { value: "15", label: "15%", description: "Standard service" },
    { value: "18", label: "18%", description: "Good service" },
    { value: "20", label: "20%", description: "Excellent service" },
    { value: "25", label: "25%", description: "Outstanding service" }
  ]

  const calculateTip = () => {
    const bill = parseFloat(billAmount)
    const tipPercent = parseFloat(tipPercentage)
    const people = parseInt(numberOfPeople)

    if (isNaN(bill) || bill <= 0) {
      setError("Please enter a valid bill amount")
      return
    }

    if (isNaN(tipPercent) || tipPercent < 0 || tipPercent > 100) {
      setError("Please enter a valid tip percentage (0-100)")
      return
    }

    if (isNaN(people) || people <= 0) {
      setError("Please enter a valid number of people")
      return
    }

    try {
      // Calculate tip amount
      const tipAmount = (bill * tipPercent) / 100
      
      // Calculate total bill
      const totalBill = bill + tipAmount
      
      // Calculate per person amounts
      const tipPerPerson = tipAmount / people
      const totalPerPerson = totalBill / people
      const billPerPerson = bill / people

      // Calculate tax (assuming 8.5% tax rate)
      const taxRate = 8.5
      const taxAmount = (bill * taxRate) / 100
      const totalWithTax = bill + taxAmount + tipAmount
      const totalWithTaxPerPerson = totalWithTax / people

      setResult({
        bill: bill,
        tipPercentage: tipPercent,
        tipAmount: tipAmount,
        totalBill: totalBill,
        numberOfPeople: people,
        tipPerPerson: tipPerPerson,
        totalPerPerson: totalPerPerson,
        billPerPerson: billPerPerson,
        taxAmount: taxAmount,
        totalWithTax: totalWithTax,
        totalWithTaxPerPerson: totalWithTaxPerPerson
      })
      setError("")
    } catch (err) {
      setError("Error calculating tip. Please check your inputs.")
    }
  }

  useEffect(() => {
    if (billAmount && tipPercentage && numberOfPeople) {
      calculateTip()
    }
  }, [billAmount, tipPercentage, numberOfPeople])

  const clearAll = () => {
    setBillAmount("50")
    setTipPercentage("15")
    setNumberOfPeople("2")
    setCustomTip("")
    setResult(null)
    setError("")
  }

  const setPresetBill = (amount) => {
    setBillAmount(amount.toString())
  }

  const setPresetTip = (percentage) => {
    setTipPercentage(percentage.toString())
    setCustomTip("")
  }

  const setCustomTipPercentage = () => {
    const custom = parseFloat(customTip)
    if (!isNaN(custom) && custom >= 0 && custom <= 100) {
      setTipPercentage(custom.toString())
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="tip-calculator">
      <style jsx>{`
        .tip-calculator {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          padding: 30px 0;
        }
        
        .header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .header p {
          font-size: 1.1rem;
          color: #7f8c8d;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .grid {
          display: grid;
          gap: 20px;
        }
        
        .main-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        
        .card-header {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          padding: 20px;
        }
        
        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .card-content {
          padding: 25px;
        }
        
        .input-group {
          margin-bottom: 25px;
        }
        
        .input-group h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .input-field {
          margin-bottom: 15px;
        }
        
        .input-field label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #34495e;
        }
        
        .input-field input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }
        
        .input-field input:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        .tip-options {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .tip-option {
          padding: 12px;
          text-align: center;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid #ddd;
        }
        
        .tip-option:hover {
          background: #e9ecef;
        }
        
        .tip-option.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }
        
        .tip-option .label {
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .tip-option .description {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .custom-tip {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .custom-tip input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }
        
        .custom-tip button {
          padding: 0 20px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .custom-tip button:hover {
          background: #2980b9;
        }
        
        .quick-bills {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .quick-bill {
          padding: 10px;
          text-align: center;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid #ddd;
        }
        
        .quick-bill:hover {
          background: #e9ecef;
        }
        
        .action-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 25px 0;
        }
        
        .calculate-btn {
          padding: 12px 25px;
          background: #2ecc71;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .calculate-btn:hover {
          background: #27ae60;
          transform: translateY(-2px);
        }
        
        .reset-btn {
          padding: 12px 25px;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .reset-btn:hover {
          background: #c0392b;
          transform: translateY(-2px);
        }
        
        .error-message {
          padding: 15px;
          background: #fdecea;
          color: #d32f2f;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #d32f2f;
        }
        
        .result-container {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 25px;
          border-radius: 12px;
          margin-top: 20px;
          border: 1px solid #ddd;
        }
        
        .result-header {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .result-header h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .result-total {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2ecc71;
          margin-bottom: 5px;
        }
        
        .result-subtext {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        
        .result-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .result-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .result-label {
          color: #7f8c8d;
        }
        
        .result-value {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .tax-section {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
        }
        
        .tax-section h4 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .summary-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #ddd;
        }
        
        .summary-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3498db;
          margin-bottom: 5px;
        }
        
        .summary-label {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        
        .guidelines {
          margin-top: 30px;
        }
        
        .guidelines h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .guidelines-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .guideline-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .guideline-card h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #2c3e50;
        }
        
        .guideline-item {
          margin-bottom: 5px;
          font-size: 0.9rem;
          color: #34495e;
        }
        
        .ad-banner {
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          padding: 20px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 1px solid #ddd;
        }
        
        .ad-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f1f3f8 0%, #d9dde8 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7f8c8d;
          font-weight: 600;
        }
        
        .ad-label {
          margin-top: 10px;
          font-size: 0.8rem;
          color: #95a5a6;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          margin-top: 30px;
          padding: 25px;
          border: 1px solid #ddd;
        }
        
        .about-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .about-header h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.5rem;
        }
        
        .about-content {
          color: #34495e;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .feature-list h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #2c3e50;
        }
        
        .feature-item {
          margin-bottom: 5px;
          font-size: 0.9rem;
        }
        
        .tips-box {
          background: #e8f4fc;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }
        
        .tips-box h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #2980b9;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .tips-list {
          font-size: 0.9rem;
          color: #34495e;
        }
        
        .tips-list li {
          margin-bottom: 5px;
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          
          .result-details {
            grid-template-columns: 1fr;
          }
          
          .guidelines-grid {
            grid-template-columns: 1fr;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .ad-banner {
            height: 250px;
            margin-top: 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>Tip Calculator</h1>
          <p>Calculate tips, split bills, and determine fair amounts for service</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="main-content">
            <div className="card-header">
              <h2 className="card-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Tip Calculation
              </h2>
            </div>
            <div className="card-content">
              <div className="input-group">
                <h3>Bill Amount</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="input-field">
                    <label>Bill Amount ($)</label>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="Enter bill amount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="input-field">
                    <label>Number of People</label>
                    <input
                      type="number"
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                      placeholder="Number of people"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <h3>Tip Percentage</h3>
                <div className="tip-options">
                  {tipOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`tip-option ${tipPercentage === option.value ? 'active' : ''}`}
                      onClick={() => setPresetTip(option.value)}
                    >
                      <div className="label">{option.label}</div>
                      <div className="description">{option.description}</div>
                    </div>
                  ))}
                </div>
                <div className="custom-tip">
                  <input
                    type="number"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    placeholder="Custom tip %"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <button onClick={setCustomTipPercentage}>Set Custom</button>
                </div>
              </div>

              <div className="input-group">
                <h3>Quick Bill Amounts</h3>
                <div className="quick-bills">
                  {[10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 300, 500].map((amount) => (
                    <div
                      key={amount}
                      className="quick-bill"
                      onClick={() => setPresetBill(amount)}
                    >
                      ${amount}
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="calculate-btn" onClick={calculateTip}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <line x1="8" y1="6" x2="16" y2="6"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                    <line x1="8" y1="18" x2="16" y2="18"></line>
                  </svg>
                  Calculate Tip
                </button>
                <button className="reset-btn" onClick={clearAll}>
                  Reset
                </button>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {result && (
                <div className="result-container">
                  <div className="result-header">
                    <h3>Tip Calculation Result</h3>
                    <div className="result-total">{formatCurrency(result.totalPerPerson)}</div>
                    <div className="result-subtext">Per Person (Total: {formatCurrency(result.totalBill)})</div>
                  </div>

                  <div className="result-details">
                    <div>
                      <div className="result-row">
                        <span className="result-label">Bill Amount:</span>
                        <span className="result-value">{formatCurrency(result.bill)}</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Tip Amount:</span>
                        <span className="result-value" style={{ color: '#27ae60' }}>
                          {formatCurrency(result.tipAmount)} ({result.tipPercentage}%)
                        </span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Total Bill:</span>
                        <span className="result-value" style={{ color: '#27ae60' }}>
                          {formatCurrency(result.totalBill)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="result-row">
                        <span className="result-label">Bill per Person:</span>
                        <span className="result-value">{formatCurrency(result.billPerPerson)}</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Tip per Person:</span>
                        <span className="result-value" style={{ color: '#27ae60' }}>
                          {formatCurrency(result.tipPerPerson)}
                        </span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Total per Person:</span>
                        <span className="result-value" style={{ color: '#27ae60' }}>
                          {formatCurrency(result.totalPerPerson)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="tax-section">
                    <h4>With Tax (8.5%)</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <div className="result-row">
                          <span className="result-label">Tax Amount:</span>
                          <span className="result-value" style={{ color: '#3498db' }}>
                            {formatCurrency(result.taxAmount)}
                          </span>
                        </div>
                        <div className="result-row">
                          <span className="result-label">Total with Tax:</span>
                          <span className="result-value" style={{ color: '#3498db' }}>
                            {formatCurrency(result.totalWithTax)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="result-row">
                          <span className="result-label">Total per Person:</span>
                          <span className="result-value" style={{ color: '#3498db' }}>
                            {formatCurrency(result.totalWithTaxPerPerson)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="summary-cards">
                    <div className="summary-card">
                      <div className="summary-value" style={{ color: '#27ae60' }}>
                        {formatCurrency(result.tipAmount)}
                      </div>
                      <div className="summary-label">Tip Amount</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-value" style={{ color: '#27ae60' }}>
                        {formatCurrency(result.totalBill)}
                      </div>
                      <div className="summary-label">Total Bill</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-value" style={{ color: '#27ae60' }}>
                        {formatCurrency(result.totalPerPerson)}
                      </div>
                      <div className="summary-label">Per Person</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-value" style={{ color: '#27ae60' }}>
                        {result.tipPercentage}%
                      </div>
                      <div className="summary-label">Tip Rate</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="guidelines">
                <h3>Tip Guidelines</h3>
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <h4>Restaurant Service</h4>
                    <div className="guideline-item">• 10% - Poor service</div>
                    <div className="guideline-item">• 15% - Standard service</div>
                    <div className="guideline-item">• 18% - Good service</div>
                    <div className="guideline-item">• 20% - Excellent service</div>
                    <div className="guideline-item">• 25% - Outstanding service</div>
                  </div>
                  <div className="guideline-card">
                    <h4>Other Services</h4>
                    <div className="guideline-item">• Hairdresser: 15-20%</div>
                    <div className="guideline-item">• Taxi/Uber: 10-15%</div>
                    <div className="guideline-item">• Hotel bellhop: $2-5 per bag</div>
                    <div className="guideline-item">• Food delivery: 10-15%</div>
                    <div className="guideline-item">• Valet parking: $2-5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ad-banner">
            <div className="ad-placeholder">
              Advertisement
            </div>
            <div className="ad-label">300x600</div>
          </div>
        </div>

        <div className="about-section">
          <div className="about-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <h2>About Tip Calculator</h2>
          </div>
          <div className="about-content">
            Our Tip Calculator helps you determine the appropriate tip amount for various services. 
            Whether you're dining out, getting a haircut, or using other services, this tool ensures 
            you calculate fair and accurate tips while splitting bills among multiple people.
          </div>
          <div className="features-grid">
            <div className="feature-list">
              <h4>Features:</h4>
              <div className="feature-item">• Multiple tip percentage options</div>
              <div className="feature-item">• Bill splitting functionality</div>
              <div className="feature-item">• Tax calculation included</div>
              <div className="feature-item">• Per-person breakdown</div>
              <div className="feature-item">• Quick bill amount presets</div>
            </div>
            <div className="feature-list">
              <h4>Common Uses:</h4>
              <div className="feature-item">• Restaurant dining</div>
              <div className="feature-item">• Group meals</div>
              <div className="feature-item">• Service industry tips</div>
              <div className="feature-item">• Event planning</div>
              <div className="feature-item">• Business expenses</div>
            </div>
          </div>
          <div className="tips-box">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Tips
            </h4>
            <ul className="tips-list">
              <li>• Always tip on the pre-tax amount</li>
              <li>• Consider service quality when choosing tip percentage</li>
              <li>• For large groups, some restaurants add automatic gratuity</li>
              <li>• Don't forget to tip delivery drivers and service workers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipCalculator