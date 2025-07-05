"use client"

import { useState } from "react"

const colorCodes = {
  "black": { value: 0, multiplier: 1 },
  "brown": { value: 1, multiplier: 10 },
  "red": { value: 2, multiplier: 100 },
  "orange": { value: 3, multiplier: 1000 },
  "yellow": { value: 4, multiplier: 10000 },
  "green": { value: 5, multiplier: 100000 },
  "blue": { value: 6, multiplier: 1000000 },
  "violet": { value: 7, multiplier: 10000000 },
  "gray": { value: 8, multiplier: 100000000 },
  "white": { value: 9, multiplier: 1000000000 },
  "gold": { value: -1, multiplier: 0.1, tolerance: 5 },
  "silver": { value: -1, multiplier: 0.01, tolerance: 10 }
}

const toleranceColors = {
  "brown": 1,
  "red": 2,
  "gold": 5,
  "silver": 10,
  "none": 20
}

export default function ResistorCalculator() {
  const [band1, setBand1] = useState("brown")
  const [band2, setBand2] = useState("black")
  const [band3, setBand3] = useState("red")
  const [band4, setBand4] = useState("gold")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const firstDigit = colorCodes[band1].value
    const secondDigit = colorCodes[band2].value
    const multiplier = colorCodes[band3].multiplier
    const tolerance = toleranceColors[band4] || 20
    
    if (firstDigit === -1 || secondDigit === -1) {
      setResult({ error: "Invalid color combination" })
      return
    }
    
    const resistance = (firstDigit * 10 + secondDigit) * multiplier
    const formattedResistance = formatResistance(resistance)
    
    setResult({
      resistance: resistance,
      formatted: formattedResistance,
      tolerance: tolerance,
      range: {
        min: resistance * (1 - tolerance / 100),
        max: resistance * (1 + tolerance / 100)
      }
    })
  }

  const formatResistance = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MΩ`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`
    } else {
      return `${value.toFixed(2)} Ω`
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>🔌 Resistor Calculator 🔌</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>1st Band (1st digit): </label>
          <select value={band1} onChange={e => setBand1(e.target.value)} style={{ marginLeft: 10, width: 120 }}>
            {Object.keys(colorCodes).filter(color => colorCodes[color].value >= 0).map(color => (
              <option key={color} value={color} style={{ color: color, fontWeight: "bold" }}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>2nd Band (2nd digit): </label>
          <select value={band2} onChange={e => setBand2(e.target.value)} style={{ marginLeft: 10, width: 120 }}>
            {Object.keys(colorCodes).filter(color => colorCodes[color].value >= 0).map(color => (
              <option key={color} value={color} style={{ color: color, fontWeight: "bold" }}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>3rd Band (multiplier): </label>
          <select value={band3} onChange={e => setBand3(e.target.value)} style={{ marginLeft: 10, width: 120 }}>
            {Object.keys(colorCodes).map(color => (
              <option key={color} value={color} style={{ color: color, fontWeight: "bold" }}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>4th Band (tolerance): </label>
          <select value={band4} onChange={e => setBand4(e.target.value)} style={{ marginLeft: 10, width: 120 }}>
            {Object.keys(toleranceColors).map(color => (
              <option key={color} value={color} style={{ color: color === "none" ? "black" : color, fontWeight: "bold" }}>
                {color.charAt(0).toUpperCase() + color.slice(1)} ({toleranceColors[color]}%)
              </option>
            ))}
          </select>
        </div>
        <button onClick={calculate} style={{ background: "#795548", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate Resistance</button>
        {result && !result.error && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#795548" }}>
              {result.formatted}
            </div>
            <div style={{ fontSize: 16, marginBottom: 10 }}>
              <strong>Tolerance:</strong> ±{result.tolerance}%
            </div>
            <div style={{ fontSize: 14, color: "#666" }}>
              <strong>Range:</strong> {formatResistance(result.range.min)} - {formatResistance(result.range.max)}
            </div>
          </div>
        )}
        {result && result.error && (
          <div style={{ marginTop: 20, textAlign: "center", color: "#f44336" }}>
            {result.error}
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Resistor Calculator</h2>
        <p>
          The Resistor Calculator helps you determine the resistance value and tolerance of a resistor based on its color bands. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 