"use client"

import { useState } from "react"

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [compound, setCompound] = useState(false)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    if (!P || !r || !t) return setResult(null)
    let interest, total
    if (compound) {
      total = P * Math.pow(1 + r, t)
      interest = total - P
    } else {
      interest = P * r * t
      total = P + interest
    }
    setResult({ interest: interest.toFixed(2), total: total.toFixed(2) })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Interest Calculator</h1>
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
          <label>Time (years): </label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label><input type="checkbox" checked={compound} onChange={e => setCompound(e.target.checked)} /> Compound Interest</label>
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <div><strong>Interest: ${result.interest}</strong></div>
            <div><strong>Total Amount: ${result.total}</strong></div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Interest Calculator</h2>
        <p>
          This Interest Calculator allows you to calculate simple or compound interest and total amount for a given principal, rate, and time period. Useful for loans, savings, and investments. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 