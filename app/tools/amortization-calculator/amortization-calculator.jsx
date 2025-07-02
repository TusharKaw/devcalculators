"use client"

import { useState } from "react"

function calculateAmortization(P, r, n) {
  const monthlyRate = r / 100 / 12
  const numPayments = n * 12
  const payment = P * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))
  let balance = P
  let schedule = []
  for (let i = 1; i <= numPayments; i++) {
    const interest = balance * monthlyRate
    const principal = payment - interest
    balance -= principal
    schedule.push({
      month: i,
      payment: payment,
      principal: principal,
      interest: interest,
      balance: balance > 0 ? balance : 0
    })
  }
  return { payment, schedule }
}

export default function AmortizationCalculator() {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const P = parseFloat(amount)
    const r = parseFloat(rate)
    const n = parseInt(years)
    if (!P || !r || !n) return setResult(null)
    setResult(calculateAmortization(P, r, n))
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Amortization Calculator</h1>
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
        <button onClick={calculate} style={{ background: "#3f51b5", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div><strong>Monthly Payment: ${result.payment.toFixed(2)}</strong></div>
            <details style={{ marginTop: 10 }}>
              <summary>Show Amortization Schedule</summary>
              <table style={{ width: "100%", marginTop: 10, fontSize: 14 }}>
                <thead>
                  <tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0,12).map((row, i) => (
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
              <div style={{ fontSize: 12, marginTop: 5 }}>(First 12 months shown)</div>
            </details>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Amortization Calculator</h2>
        <p>
          The Amortization Calculator helps you calculate monthly payments and view an amortization schedule for your loan. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 