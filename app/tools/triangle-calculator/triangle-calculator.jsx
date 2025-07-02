"use client"

import { useState } from "react"

function calcArea(base, height) {
  return 0.5 * base * height
}
function calcPerimeter(a, b, c) {
  return a + b + c
}

export default function TriangleCalculator() {
  const [base, setBase] = useState("")
  const [height, setHeight] = useState("")
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")
  const [area, setArea] = useState(null)
  const [perimeter, setPerimeter] = useState(null)

  const calculate = () => {
    const baseVal = parseFloat(base)
    const heightVal = parseFloat(height)
    const aVal = parseFloat(a)
    const bVal = parseFloat(b)
    const cVal = parseFloat(c)
    if (baseVal && heightVal) setArea(calcArea(baseVal, heightVal).toFixed(2))
    else setArea(null)
    if (aVal && bVal && cVal) setPerimeter(calcPerimeter(aVal, bVal, cVal).toFixed(2))
    else setPerimeter(null)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Triangle Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Base: </label>
          <input type="number" value={base} onChange={e => setBase(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
          <label style={{ marginLeft: 15 }}>Height: </label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Side a: </label>
          <input type="number" value={a} onChange={e => setA(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
          <label style={{ marginLeft: 15 }}>Side b: </label>
          <input type="number" value={b} onChange={e => setB(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
          <label style={{ marginLeft: 15 }}>Side c: </label>
          <input type="number" value={c} onChange={e => setC(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#fbc02d", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {area && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Area: {area}</strong>
          </div>
        )}
        {perimeter && (
          <div style={{ marginTop: 10, fontSize: 18 }}>
            <strong>Perimeter: {perimeter}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Triangle Calculator</h2>
        <p>
          The Triangle Calculator helps you calculate the area and perimeter of a triangle. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 