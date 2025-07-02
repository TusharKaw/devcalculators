"use client"

import { useState } from "react"

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("")
  const [retireAge, setRetireAge] = useState("")
  const [savings, setSavings] = useState("")
  const [contrib, setContrib] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const ca = parseInt(currentAge)
    const ra = parseInt(retireAge)
    const s = parseFloat(savings)
    const c = parseFloat(contrib)
    const r = parseFloat(rate)
    if (!ca || !ra || !s || !c || !r || ra <= ca) return setResult(null)
    const years = ra - ca
    let fv = s * Math.pow(1 + r / 100, years)
    for (let i = 1; i <= years; i++) {
      fv += c * Math.pow(1 + r / 100, years - i)
    }
    setResult(fv.toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Retirement Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Current Age: </label>
          <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Retirement Age: </label>
          <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Current Savings: </label>
          <input type="number" value={savings} onChange={e => setSavings(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Annual Contribution: </label>
          <input type="number" value={contrib} onChange={e => setContrib(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Expected Return (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#0097a7", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Estimated Retirement Savings: ${result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Retirement Calculator</h2>
        <p>
          The Retirement Calculator helps you estimate your savings at retirement age. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 