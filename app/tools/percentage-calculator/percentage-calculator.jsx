"use client"

import { useState } from "react"

export default function PercentageCalculator() {
  const [type, setType] = useState("of")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const X = parseFloat(x)
    const Y = parseFloat(y)
    if (!X || !Y) return setResult(null)
    let res
    if (type === "of") {
      res = (X / 100) * Y
    } else if (type === "iswhatpercent") {
      res = (X / Y) * 100
    } else if (type === "ispercentof") {
      res = (X * 100) / Y
    }
    setResult(res.toFixed(2))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Percentage Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Calculation Type: </label>
          <select value={type} onChange={e => setType(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="of">X% of Y</option>
            <option value="iswhatpercent">What % is X of Y</option>
            <option value="ispercentof">X is Y% of what?</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>X: </label>
          <input type="number" value={x} onChange={e => setX(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Y: </label>
          <input type="number" value={y} onChange={e => setY(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Result: {result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Percentage Calculator</h2>
        <p>
          The Percentage Calculator helps you solve common percentage problems, such as finding X% of Y, what percent X is of Y, and more. Useful for math, finance, and everyday calculations. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 