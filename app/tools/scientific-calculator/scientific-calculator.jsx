"use client"

import { useState } from "react"

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    try {
      // Only basic math, no functions
      // eslint-disable-next-line no-eval
      setResult(eval(expr))
    } catch {
      setResult("Error")
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Scientific Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Expression: </label>
          <input type="text" value={expr} onChange={e => setExpr(e.target.value)} style={{ marginLeft: 10, width: 300 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result !== null && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Result: {result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Scientific Calculator</h2>
        <p>
          The Scientific Calculator lets you evaluate basic math expressions. Useful for quick calculations. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 