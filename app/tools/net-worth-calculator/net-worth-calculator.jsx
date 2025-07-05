"use client"

import { useState } from "react"

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState({
    cash: "",
    investments: "",
    property: "",
    vehicles: "",
    other: ""
  })
  const [liabilities, setLiabilities] = useState({
    mortgage: "",
    carLoan: "",
    creditCards: "",
    studentLoans: "",
    other: ""
  })
  const [result, setResult] = useState(null)

  const handleAssetChange = (field, value) => {
    setAssets(prev => ({ ...prev, [field]: value }))
  }

  const handleLiabilityChange = (field, value) => {
    setLiabilities(prev => ({ ...prev, [field]: value }))
  }

  const calculate = () => {
    const totalAssets = Object.values(assets).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    const totalLiabilities = Object.values(liabilities).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    const netWorth = totalAssets - totalLiabilities
    
    setResult({
      totalAssets: totalAssets.toFixed(2),
      totalLiabilities: totalLiabilities.toFixed(2),
      netWorth: netWorth.toFixed(2),
      isPositive: netWorth >= 0
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Net Worth Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#4caf50" }}>Assets</h3>
            <div style={{ marginBottom: 10 }}>
              <label>Cash & Savings: </label>
              <input type="number" value={assets.cash} onChange={e => handleAssetChange('cash', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Investments: </label>
              <input type="number" value={assets.investments} onChange={e => handleAssetChange('investments', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Property Value: </label>
              <input type="number" value={assets.property} onChange={e => handleAssetChange('property', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Vehicles: </label>
              <input type="number" value={assets.vehicles} onChange={e => handleAssetChange('vehicles', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Other Assets: </label>
              <input type="number" value={assets.other} onChange={e => handleAssetChange('other', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#f44336" }}>Liabilities</h3>
            <div style={{ marginBottom: 10 }}>
              <label>Mortgage: </label>
              <input type="number" value={liabilities.mortgage} onChange={e => handleLiabilityChange('mortgage', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Car Loans: </label>
              <input type="number" value={liabilities.carLoan} onChange={e => handleLiabilityChange('carLoan', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Credit Cards: </label>
              <input type="number" value={liabilities.creditCards} onChange={e => handleLiabilityChange('creditCards', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Student Loans: </label>
              <input type="number" value={liabilities.studentLoans} onChange={e => handleLiabilityChange('studentLoans', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Other Debts: </label>
              <input type="number" value={liabilities.other} onChange={e => handleLiabilityChange('other', e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
          </div>
        </div>
        <button onClick={calculate} style={{ background: "#2196f3", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16, marginTop: 20 }}>Calculate Net Worth</button>
        {result && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ marginBottom: 10 }}>
              <strong>Total Assets:</strong> ${result.totalAssets}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Total Liabilities:</strong> ${result.totalLiabilities}
            </div>
            <div style={{ fontSize: 24, fontWeight: "bold", color: result.isPositive ? "#4caf50" : "#f44336" }}>
              <strong>Net Worth:</strong> ${result.netWorth}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Net Worth Calculator</h2>
        <p>
          The Net Worth Calculator helps you calculate your total financial net worth by subtracting liabilities from assets. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 