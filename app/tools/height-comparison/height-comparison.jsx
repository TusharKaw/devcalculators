"use client"

import { useState } from "react"

export default function HeightComparison() {
  const [height1, setHeight1] = useState("")
  const [height2, setHeight2] = useState("")
  const [result, setResult] = useState(null)

  const compare = () => {
    const h1 = parseFloat(height1)
    const h2 = parseFloat(height2)
    if (!h1 || !h2) return setResult(null)
    
    const diff = Math.abs(h1 - h2)
    const taller = h1 > h2 ? "Height 1" : "Height 2"
    const shorter = h1 > h2 ? "Height 2" : "Height 1"
    
    setResult({
      height1: h1,
      height2: h2,
      difference: diff,
      taller,
      shorter
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Height Comparison Visualizer</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Height 1 (cm): </label>
          <input type="number" value={height1} onChange={e => setHeight1(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Height 2 (cm): </label>
          <input type="number" value={height2} onChange={e => setHeight2(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <button onClick={compare} style={{ background: "#4caf50", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Compare</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 18, marginBottom: 15 }}>
              <strong>Difference: {result.difference} cm</strong>
            </div>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "center", gap: 20, marginTop: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  width: 60, 
                  height: result.height1 * 2, 
                  backgroundColor: "#2196f3", 
                  margin: "0 auto 10px",
                  borderRadius: "5px 5px 0 0"
                }}></div>
                <div>Height 1: {result.height1} cm</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  width: 60, 
                  height: result.height2 * 2, 
                  backgroundColor: "#ff9800", 
                  margin: "0 auto 10px",
                  borderRadius: "5px 5px 0 0"
                }}></div>
                <div>Height 2: {result.height2} cm</div>
              </div>
            </div>
            <div style={{ marginTop: 15, fontSize: 16 }}>
              <strong>{result.taller}</strong> is taller by {result.difference} cm
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Height Comparison Visualizer</h2>
        <p>
          The Height Comparison Visualizer helps you compare two heights with a visual representation. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 