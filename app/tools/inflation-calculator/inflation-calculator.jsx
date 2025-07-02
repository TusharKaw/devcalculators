"use client"

import { useState } from "react"

export default function InflationCalculator() {
  const [amount, setAmount] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const amt = parseFloat(amount)
    const s = parseInt(start)
    const e = parseInt(end)
    const r = parseFloat(rate)
    if (!amt || !s || !e || !r || e <= s) return setResult(null)
    const years = e - s
    const adjusted = amt * Math.pow(1 + r / 100, years)
    setResult(adjusted.toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Inflation Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Initial Amount: </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Start Year: </label>
          <input type="number" value={start} onChange={e => setStart(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>End Year: </label>
          <input type="number" value={end} onChange={e => setEnd(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Average Inflation Rate (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#e65100", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Adjusted Value: ${result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Inflation Calculator</h2>
        <p>
          The Inflation Calculator helps you estimate the effect of inflation on money over time. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 