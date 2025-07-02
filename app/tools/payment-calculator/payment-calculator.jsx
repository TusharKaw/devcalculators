"use client"

import { useState } from "react"

function calculatePayment(P, r, n) {
  const monthlyRate = r / 100 / 12
  const numPayments = n * 12
  return P * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))
}

export default function PaymentCalculator() {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const P = parseFloat(amount)
    const r = parseFloat(rate)
    const n = parseInt(years)
    if (!P || !r || !n) return setResult(null)
    setResult(calculatePayment(P, r, n))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Payment Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Loan Amount: </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Interest Rate (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Term (years): </label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#1976d2", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Monthly Payment: ${result.toFixed(2)}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Payment Calculator</h2>
        <p>
          The Payment Calculator helps you estimate your monthly loan or mortgage payment. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 