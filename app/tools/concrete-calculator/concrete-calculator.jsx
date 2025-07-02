"use client"

import { useState } from "react"

const shapeOptions = [
  { value: "slab", label: "Slab" },
  { value: "footing", label: "Footing" },
  { value: "column", label: "Column" },
]

export default function ConcreteCalculator() {
  const [shape, setShape] = useState("slab")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [result, setResult] = useState(null)

  const calculate = () => {
    let vol = 0
    const l = parseFloat(length)
    const w = parseFloat(width)
    const h = parseFloat(height)
    const q = parseInt(quantity)
    if (!l || !w || !h || !q) return setResult(null)
    if (shape === "slab" || shape === "footing") {
      vol = l * w * h * q
    } else if (shape === "column") {
      vol = Math.PI * (w / 2) * (w / 2) * h * q
    }
    // convert cubic inches to cubic yards (if input is in inches)
    // but let's assume input is in feet, so cubic feet to cubic yards
    const cubicYards = vol / 27
    setResult(cubicYards.toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Concrete Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <label>Shape: </label>
        <select value={shape} onChange={e => setShape(e.target.value)} style={{ marginLeft: 10, marginBottom: 15 }}>
          {shapeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <div style={{ marginTop: 10 }}>
          <label>Length (ft): </label>
          <input type="number" value={length} onChange={e => setLength(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>{shape === "column" ? "Diameter (ft)" : "Width (ft)"}: </label>
          <input type="number" value={width} onChange={e => setWidth(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Height (ft): </label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Quantity: </label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="1" />
        </div>
        <button onClick={calculate} style={{ marginTop: 20, background: "#795548", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Total Concrete: {result} cubic yards</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Concrete Calculator</h2>
        <p>
          The Concrete Calculator helps you estimate the amount of concrete needed for slabs, footings, and columns. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 