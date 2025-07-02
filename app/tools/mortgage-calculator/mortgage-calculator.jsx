"use client"

import { useState } from "react"

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(years) * 12
    if (!P || !r || !n) return setResult(null)
    const payment = (P * r) / (1 - Math.pow(1 + r, -n))
    setResult(payment.toFixed(2))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Mortgage Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Principal ($): </label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Annual Interest Rate (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Loan Term (years): </label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Monthly Payment: ${result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Mortgage Calculator</h2>
        <p>
          This Mortgage Calculator helps you estimate your monthly home loan payments based on principal, interest rate, and loan term. You can use it to plan your budget and compare different mortgage options. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 