"use client"

import { useState } from "react"

export default function TimeCalculator() {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [op, setOp] = useState("add")
  const [value, setValue] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    let h = parseInt(hours) || 0
    let m = parseInt(minutes) || 0
    let v = parseInt(value) || 0
    if (op === "add") m += v
    else m -= v
    h += Math.floor(m / 60)
    m = ((m % 60) + 60) % 60
    if (m < 0) { h -= 1; m += 60 }
    setResult({ h, m })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Time Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Hours: </label>
          <input type="number" value={hours} onChange={e => setHours(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Minutes: </label>
          <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Operation: </label>
          <select value={op} onChange={e => setOp(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Value (minutes): </label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Result: {result.h} hours {result.m} minutes</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Time Calculator</h2>
        <p>
          The Time Calculator lets you add or subtract minutes from a given time. Useful for scheduling, time tracking, and more. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 