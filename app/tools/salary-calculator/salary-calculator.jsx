"use client"

import { useState } from "react"

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("hourly")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const a = parseFloat(amount)
    if (!a) return setResult(null)
    let hourly, monthly, yearly
    if (period === "hourly") {
      hourly = a
      yearly = a * 40 * 52
      monthly = yearly / 12
    } else if (period === "monthly") {
      monthly = a
      yearly = a * 12
      hourly = yearly / (40 * 52)
    } else {
      yearly = a
      monthly = a / 12
      hourly = a / (40 * 52)
    }
    setResult({ hourly: hourly.toFixed(2), monthly: monthly.toFixed(2), yearly: yearly.toFixed(2) })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Salary Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Amount: </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Period: </label>
          <select value={period} onChange={e => setPeriod(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="hourly">Hourly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <div><strong>Hourly: ${result.hourly}</strong></div>
            <div><strong>Monthly: ${result.monthly}</strong></div>
            <div><strong>Yearly: ${result.yearly}</strong></div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Salary Calculator</h2>
        <p>
          The Salary Calculator converts your salary between hourly, monthly, and yearly rates. Useful for job offers, budgeting, and more. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 