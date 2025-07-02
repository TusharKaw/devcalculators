"use client"

import { useState } from "react"

function stddev(arr) {
  const n = arr.length
  if (n === 0) return 0
  const mean = arr.reduce((a, b) => a + b, 0) / n
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n
  return Math.sqrt(variance)
}

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const arr = input.split(/,|\s+/).map(Number).filter(x => !isNaN(x))
    if (arr.length === 0) return setResult(null)
    setResult(stddev(arr).toFixed(4))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Standard Deviation Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Numbers (comma or space separated): </label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} style={{ marginLeft: 10, width: 300 }} />
        </div>
        <button onClick={calculate} style={{ background: "#6d4c41", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Standard Deviation: {result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Standard Deviation Calculator</h2>
        <p>
          The Standard Deviation Calculator helps you calculate the standard deviation of a set of numbers. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 