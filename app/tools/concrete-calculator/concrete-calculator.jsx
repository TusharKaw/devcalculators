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
    <div className="concrete-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1>Concrete Calculator</h1>
          <div className="calculator-card">
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
          
          <div className="about-section">
            <h2>About Concrete Calculator</h2>
            <p>
              The Concrete Calculator helps you estimate the amount of concrete needed for slabs, footings, and columns. (You can update this section later.)
            </p>
          </div>
        </div>

        <div className="ad-banner">
          <div className="ad-content">
            <p>Advertisement</p>
            <div className="ad-placeholder">
              {/* Replace this with your actual ad component */}
              <span>300x250 Ad Banner</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .concrete-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 0rem;
        }
        
        .calculator-content {
          flex: 1;
          min-width: 0;
        }
        
        .calculator-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        
        .about-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .ad-banner {
          width: 300px;
          flex-shrink: 0;
        }
        
        .ad-content {
          position: sticky;
          top: 1rem;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .ad-content p {
          color: #718096;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .ad-placeholder {
          width: 300px;
          height: 250px;
          background: #f7fafc;
          border: 1px dashed #cbd5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
        }
        
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          
          .ad-banner {
            width: 100%;
            order: -1;
            margin-bottom: 1.5rem;
          }
          
          .ad-content {
            position: static;
          }
          
          .ad-placeholder {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
} 