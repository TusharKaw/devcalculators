"use client"

import { useState } from "react"

export default function DateCalculator() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!start || !end) return setResult(null)
    const d1 = new Date(start)
    const d2 = new Date(end)
    const diff = Math.abs((d2 - d1) / (1000 * 60 * 60 * 24))
    setResult(diff)
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Date Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Start Date: </label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)} style={{ marginLeft: 10 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>End Date: </label>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} style={{ marginLeft: 10 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result !== null && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Difference: {result} days</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Date Calculator</h2>
        <p>
          The Date Calculator lets you find the number of days between two dates, or add/subtract days to a date. Useful for planning, scheduling, and more. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 