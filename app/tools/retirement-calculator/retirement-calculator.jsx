"use client"

import { useState } from "react"

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("")
  const [retireAge, setRetireAge] = useState("")
  const [savings, setSavings] = useState("")
  const [contrib, setContrib] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const ca = parseInt(currentAge)
    const ra = parseInt(retireAge)
    const s = parseFloat(savings)
    const c = parseFloat(contrib)
    const r = parseFloat(rate)
    if (!ca || !ra || !s || !c || !r || ra <= ca) return setResult(null)
    const years = ra - ca
    let fv = s * Math.pow(1 + r / 100, years)
    for (let i = 1; i <= years; i++) {
      fv += c * Math.pow(1 + r / 100, years - i)
    }
    setResult(fv.toFixed(2))
  }

  return (
    <div className="retirement-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1>Retirement Calculator</h1>
          <div className="calculator-card">
            <div style={{ marginBottom: 10 }}>
              <label>Current Age: </label>
              <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Retirement Age: </label>
              <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Current Savings: </label>
              <input type="number" value={savings} onChange={e => setSavings(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Annual Contribution: </label>
              <input type="number" value={contrib} onChange={e => setContrib(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Expected Return (%): </label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <button onClick={calculate} style={{ background: "#0097a7", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
            {result && (
              <div style={{ marginTop: 20, fontSize: 18 }}>
                <strong>Estimated Retirement Savings: ${result}</strong>
              </div>
            )}
          </div>
          
          <div className="about-section">
            <h2>About Retirement Calculator</h2>
            <p>
              The Retirement Calculator helps you estimate your savings at retirement age. (You can update this section later.)
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
        .retirement-calculator-container {
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