"use client"

import { useState } from "react"

function calcIdealWeight(height, gender) {
  // Devine formula
  if (gender === "male") return 50 + 2.3 * ((height / 2.54) - 60)
  if (gender === "female") return 45.5 + 2.3 * ((height / 2.54) - 60)
  return 0
}

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("male")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const h = parseFloat(height)
    if (!h) return setResult(null)
    setResult(calcIdealWeight(h, gender).toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Ideal Weight Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Height (cm): </label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Gender: </label>
          <select value={gender} onChange={e => setGender(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button onClick={calculate} style={{ background: "#607d8b", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Ideal Weight: {result} kg</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Ideal Weight Calculator</h2>
        <p>
          The Ideal Weight Calculator helps you estimate your ideal body weight based on height and gender. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 