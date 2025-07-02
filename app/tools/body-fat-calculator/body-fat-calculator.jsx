"use client"

import { useState } from "react"

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const h = parseFloat(height)
    const n = parseFloat(neck)
    const w = parseFloat(waist)
    const hp = parseFloat(hip)
    if (!h || !n || !w || (gender === "female" && !hp)) return setResult(null)
    let bf
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
    }
    setResult(bf.toFixed(1))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Body Fat Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Gender: </label>
          <select value={gender} onChange={e => setGender(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Age: </label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Height (cm): </label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Neck (cm): </label>
          <input type="number" value={neck} onChange={e => setNeck(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Waist (cm): </label>
          <input type="number" value={waist} onChange={e => setWaist(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        {gender === "female" && (
          <div style={{ marginBottom: 15 }}>
            <label>Hip (cm): </label>
            <input type="number" value={hip} onChange={e => setHip(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
          </div>
        )}
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Body Fat Percentage: {result}%</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Body Fat Calculator</h2>
        <p>
          The Body Fat Calculator estimates your body fat percentage using the US Navy method. Enter your measurements to get an estimate of your body composition. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 