"use client"

import { useState } from "react"

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [qty, setQty] = useState(1)
  const [result, setResult] = useState([])

  const generate = () => {
    const minVal = parseInt(min)
    const maxVal = parseInt(max)
    const q = parseInt(qty)
    if (isNaN(minVal) || isNaN(maxVal) || isNaN(q) || minVal > maxVal || q < 1) return setResult([])
    const arr = []
    for (let i = 0; i < q; i++) {
      arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal)
    }
    setResult(arr)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Random Number Generator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Min: </label>
          <input type="number" value={min} onChange={e => setMin(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
          <label style={{ marginLeft: 15 }}>Max: </label>
          <input type="number" value={max} onChange={e => setMax(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
          <label style={{ marginLeft: 15 }}>Quantity: </label>
          <input type="number" value={qty} onChange={e => setQty(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="1" />
        </div>
        <button onClick={generate} style={{ background: "#673ab7", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Generate</button>
        {result.length > 0 && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Random Numbers: {result.join(", ")}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Random Number Generator</h2>
        <p>
          The Random Number Generator creates random numbers in a specified range. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 