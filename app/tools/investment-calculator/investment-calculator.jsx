"use client"

import { useState } from "react"

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState("")
  const [contrib, setContrib] = useState("")
  const [years, setYears] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const P = parseFloat(initial)
    const C = parseFloat(contrib)
    const n = parseInt(years)
    const r = parseFloat(rate)
    if (!P || !C || !n || !r) return setResult(null)
    let fv = P * Math.pow(1 + r / 100, n)
    for (let i = 1; i <= n; i++) {
      fv += C * Math.pow(1 + r / 100, n - i)
    }
    setResult(fv.toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Investment Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Initial Investment: </label>
          <input type="number" value={initial} onChange={e => setInitial(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Annual Contribution: </label>
          <input type="number" value={contrib} onChange={e => setContrib(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Years: </label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Interest Rate (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#388e3c", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Future Value: ${result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Investment Calculator</h2>
        <p>
          The Investment Calculator helps you estimate the future value of your investments. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 