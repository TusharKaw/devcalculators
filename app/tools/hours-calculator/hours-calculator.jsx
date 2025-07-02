"use client"

import { useState } from "react"

function parseTime(t) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

export default function HoursCalculator() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!start || !end) return setResult(null)
    const diff = Math.abs(parseTime(end) - parseTime(start))
    const hours = Math.floor(diff / 60)
    const mins = diff % 60
    setResult({ hours, mins })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Hours Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Start Time: </label>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} style={{ marginLeft: 10 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>End Time: </label>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={{ marginLeft: 10 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Difference: {result.hours} hours {result.mins} minutes</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Hours Calculator</h2>
        <p>
          The Hours Calculator helps you find the difference between two times in hours and minutes. Useful for work, study, and time management. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 