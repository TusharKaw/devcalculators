"use client"

import { useState } from "react"

export default function InflationCalculator() {
  const [amount, setAmount] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const amt = parseFloat(amount)
    const s = parseInt(start)
    const e = parseInt(end)
    const r = parseFloat(rate)
    if (!amt || !s || !e || !r || e <= s) return setResult(null)
    const years = e - s
    const adjusted = amt * Math.pow(1 + r / 100, years)
    setResult(adjusted.toFixed(2))
  }

  return (
    <div className="inflation-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1>Inflation Calculator</h1>
          <div className="calculator-card">
            <div style={{ marginBottom: 10 }}>
              <label>Initial Amount: </label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Start Year: </label>
              <input type="number" value={start} onChange={e => setStart(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>End Year: </label>
              <input type="number" value={end} onChange={e => setEnd(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Average Inflation Rate (%): </label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <button onClick={calculate} style={{ background: "#e65100", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
            {result && (
              <div style={{ marginTop: 20, fontSize: 18 }}>
                <strong>Adjusted Value: ${result}</strong>
              </div>
            )}
          </div>
          
          <div className="about-section">
            <h2>About Inflation Calculator</h2>
            <p>
              The Inflation Calculator helps you estimate the effect of inflation on money over time. (You can update this section later.)
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
        .inflation-calculator-container {
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