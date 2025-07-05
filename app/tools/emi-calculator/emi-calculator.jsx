"use client"

import { useState } from "react"

function calculateEMI(P, r, n) {
  const monthlyRate = r / 100 / 12
  const numPayments = n * 12
  return P * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1)
}

export default function EMICalculator() {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const P = parseFloat(amount)
    const r = parseFloat(rate)
    const n = parseInt(years)
    if (!P || !r || !n) return setResult(null)
    setResult(calculateEMI(P, r, n).toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>EMI Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Loan Amount: </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Interest Rate (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Tenure (years): </label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#3f51b5", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate EMI</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Monthly EMI: ₹{result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About EMI Calculator</h2>
        <p>
          The EMI Calculator helps you calculate Equated Monthly Installments for loans. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 