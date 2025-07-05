"use client"

import { useState } from "react"

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [mortgageRate, setMortgageRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("30")
  const [monthlyRent, setMonthlyRent] = useState("")
  const [propertyTax, setPropertyTax] = useState("")
  const [insurance, setInsurance] = useState("")
  const [maintenance, setMaintenance] = useState("")
  const [years, setYears] = useState("5")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const price = parseFloat(homePrice)
    const down = parseFloat(downPayment)
    const rate = parseFloat(mortgageRate) / 100 / 12
    const term = parseInt(loanTerm)
    const rent = parseFloat(monthlyRent)
    const tax = parseFloat(propertyTax) || 0
    const ins = parseFloat(insurance) || 0
    const maint = parseFloat(maintenance) || 0
    const timeYears = parseInt(years)
    
    if (!price || !down || !rate || !rent) return setResult(null)
    
    const loanAmount = price - down
    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term * 12)) / (Math.pow(1 + rate, term * 12) - 1)
    const totalMonthlyCost = monthlyPayment + tax + ins + maint
    
    const totalRentCost = rent * 12 * timeYears
    const totalBuyCost = (totalMonthlyCost * 12 * timeYears) + down
    const equity = (monthlyPayment * 12 * timeYears) * 0.3 // Rough estimate of equity built
    
    const netBuyCost = totalBuyCost - equity
    const savings = totalRentCost - netBuyCost
    
    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalMonthlyCost: totalMonthlyCost.toFixed(2),
      totalRentCost: totalRentCost.toFixed(2),
      totalBuyCost: totalBuyCost.toFixed(2),
      netBuyCost: netBuyCost.toFixed(2),
      equity: equity.toFixed(2),
      savings: savings.toFixed(2),
      recommendation: savings > 0 ? "Buying" : "Renting"
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Rent vs Buy Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3>Home Purchase Details</h3>
            <div style={{ marginBottom: 10 }}>
              <label>Home Price ($): </label>
              <input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Down Payment ($): </label>
              <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Mortgage Rate (%): </label>
              <input type="number" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} step="0.1" />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Loan Term: </label>
              <select value={loanTerm} onChange={e => setLoanTerm(e.target.value)} style={{ marginLeft: 10 }}>
                <option value="15">15 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3>Monthly Costs</h3>
            <div style={{ marginBottom: 10 }}>
              <label>Monthly Rent ($): </label>
              <input type="number" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Property Tax ($/month): </label>
              <input type="number" value={propertyTax} onChange={e => setPropertyTax(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Insurance ($/month): </label>
              <input type="number" value={insurance} onChange={e => setInsurance(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Maintenance ($/month): </label>
              <input type="number" value={maintenance} onChange={e => setMaintenance(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Time Period (years): </label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="1" max="30" />
            </div>
          </div>
        </div>
        <button onClick={calculate} style={{ background: "#9c27b0", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16, marginTop: 20 }}>Compare Options</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 18, marginBottom: 15, textAlign: "center" }}>
              <strong>Recommendation: {result.recommendation}</strong>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, background: "#e3f2fd", padding: 15, borderRadius: 5 }}>
                <h4>Renting</h4>
                <div>Total Cost: ${result.totalRentCost}</div>
              </div>
              <div style={{ flex: 1, background: "#f3e5f5", padding: 15, borderRadius: 5 }}>
                <h4>Buying</h4>
                <div>Monthly Payment: ${result.monthlyPayment}</div>
                <div>Total Monthly Cost: ${result.totalMonthlyCost}</div>
                <div>Total Cost: ${result.totalBuyCost}</div>
                <div>Equity Built: ${result.equity}</div>
                <div>Net Cost: ${result.netBuyCost}</div>
              </div>
            </div>
            <div style={{ marginTop: 15, textAlign: "center", fontSize: 16 }}>
              <strong>Savings with {result.recommendation}:</strong> ${Math.abs(result.savings)}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Rent vs Buy Calculator</h2>
        <p>
          The Rent vs Buy Calculator helps you compare the financial implications of renting versus buying a home. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 