"use client"

import { useState } from "react"

function calcArea(base, height) {
  return 0.5 * base * height
}

function calcPerimeter(a, b, c) {
  return a + b + c
}

function calcSemiPerimeter(a, b, c) {
  return (a + b + c) / 2
}

function calcHeronsArea(a, b, c) {
  const s = calcSemiPerimeter(a, b, c)
  return Math.sqrt(s * (s - a) * (s - b) * (s - c))
}

export default function TriangleCalculator() {
  const [base, setBase] = useState("")
  const [height, setHeight] = useState("")
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")
  const [area, setArea] = useState(null)
  const [perimeter, setPerimeter] = useState(null)
  const [heronsArea, setHeronsArea] = useState(null)
  const [activeTab, setActiveTab] = useState("base-height")

  const calculate = () => {
    const baseVal = parseFloat(base)
    const heightVal = parseFloat(height)
    const aVal = parseFloat(a)
    const bVal = parseFloat(b)
    const cVal = parseFloat(c)

    if (activeTab === "base-height" && baseVal && heightVal) {
      setArea(calcArea(baseVal, heightVal).toFixed(2))
    } else {
      setArea(null)
    }

    if (aVal && bVal && cVal) {
      setPerimeter(calcPerimeter(aVal, bVal, cVal).toFixed(2))
      setHeronsArea(calcHeronsArea(aVal, bVal, cVal).toFixed(2))
    } else {
      setPerimeter(null)
      setHeronsArea(null)
    }
  }

  return (
    <div className="triangle-calculator">
      <style jsx>{`
        .triangle-calculator {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .header {
          text-align: center;
          padding: 20px 0;
          background: linear-gradient(135deg, #4a6bff 0%, #2a56e6 100%);
          color: white;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .header h1 {
          margin: 0;
          font-size: 2.5rem;
        }
        
        .header p {
          margin: 10px 0 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .content-wrapper {
          display: flex;
          gap: 20px;
        }
        
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .calculator-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .tabs {
          display: flex;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .tab {
          padding: 10px 20px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          font-weight: 600;
          color: #666;
          transition: all 0.2s;
        }
        
        .tab.active {
          color: #4a6bff;
          border-bottom: 3px solid #4a6bff;
        }
        
        .input-group {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .input-field {
          display: flex;
          flex-direction: column;
        }
        
        .input-field label {
          font-weight: 600;
          color: #555;
          margin-bottom: 5px;
        }
        
        .input-field input {
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          width: 120px;
        }
        
        .input-field input:focus {
          border-color: #4a6bff;
          outline: none;
        }
        
        .calculate-btn {
          background: linear-gradient(to right, #4a6bff, #2a56e6);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .calculate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(74, 107, 255, 0.3);
        }
        
        .results {
          margin-top: 30px;
          display: flex;
          gap: 30px;
        }
        
        .result-box {
          flex: 1;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #4a6bff;
        }
        
        .result-box h3 {
          margin-top: 0;
          color: #333;
        }
        
        .result-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2a56e6;
        }
        
        .triangle-visual {
          margin-top: 30px;
          text-align: center;
        }
        
        .triangle {
          width: 200px;
          height: 200px;
          margin: 0 auto;
          position: relative;
        }
        
        .triangle-base-height {
          width: 0;
          height: 0;
          border-left: 100px solid transparent;
          border-right: 100px solid transparent;
          border-bottom: 200px solid #4a6bff;
          opacity: 0.7;
        }
        
        .triangle-sides {
          width: 200px;
          height: 200px;
          background: conic-gradient(
            from 30deg at 50% 50%,
            #4a6bff 0% 20%,
            transparent 20% 100%
          );
        }
        
        .side-labels {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        
        .side-label {
          position: absolute;
          font-weight: 600;
          color: #333;
        }
        
        .about-section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .about-section h2 {
          color: #4a6bff;
          margin-top: 0;
        }
        
        .about-section p {
          line-height: 1.6;
          color: #555;
        }
        
        .ad-banner {
          width: 300px;
          height: 600px;
          background: #f5f5f5;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-weight: bold;
          border: 1px dashed #ccc;
        }
        
        .mobile-ad {
          display: none;
          width: 100%;
          height: 100px;
          background: #f5f5f5;
          border-radius: 8px;
          margin-bottom: 20px;
          align-items: center;
          justify-content: center;
          color: #999;
          font-weight: bold;
          border: 1px dashed #ccc;
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }
          
          .ad-banner {
            display: none;
          }
          
          .mobile-ad {
            display: flex;
          }
          
          .header h1 {
            font-size: 2rem;
          }
          
          .results {
            flex-direction: column;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Triangle Calculator</h1>
        <p>Calculate area, perimeter, and more for any triangle</p>
      </div>
      
      <div className="mobile-ad">
        Advertisement
      </div>
      
      <div className="content-wrapper">
        <div className="main-content">
          <div className="calculator-card">
            <div className="tabs">
              <div 
                className={`tab ${activeTab === "base-height" ? "active" : ""}`}
                onClick={() => setActiveTab("base-height")}
              >
                Base & Height
              </div>
              <div 
                className={`tab ${activeTab === "three-sides" ? "active" : ""}`}
                onClick={() => setActiveTab("three-sides")}
              >
                Three Sides
              </div>
            </div>
            
            {activeTab === "base-height" ? (
              <>
                <div className="input-group">
                  <div className="input-field">
                    <label>Base (b)</label>
                    <input 
                      type="number" 
                      value={base} 
                      onChange={e => setBase(e.target.value)} 
                      placeholder="Enter base"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="input-field">
                    <label>Height (h)</label>
                    <input 
                      type="number" 
                      value={height} 
                      onChange={e => setHeight(e.target.value)} 
                      placeholder="Enter height"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="triangle-visual">
                  <div className="triangle">
                    <div className="triangle-base-height"></div>
                    <div className="side-labels">
                      <div className="side-label" style={{ bottom: '-25px', left: '50%', transform: 'translateX(-50%)' }}>b = {base || '?'}</div>
                      <div className="side-label" style={{ top: '50%', right: '-40px', transform: 'translateY(-50%) rotate(90deg)' }}>h = {height || '?'}</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <div className="input-field">
                    <label>Side a</label>
                    <input 
                      type="number" 
                      value={a} 
                      onChange={e => setA(e.target.value)} 
                      placeholder="Enter side a"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="input-field">
                    <label>Side b</label>
                    <input 
                      type="number" 
                      value={b} 
                      onChange={e => setB(e.target.value)} 
                      placeholder="Enter side b"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="input-field">
                    <label>Side c</label>
                    <input 
                      type="number" 
                      value={c} 
                      onChange={e => setC(e.target.value)} 
                      placeholder="Enter side c"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="triangle-visual">
                  <div className="triangle">
                    <div className="triangle-sides"></div>
                    <div className="side-labels">
                      <div className="side-label" style={{ top: '10px', left: '50%', transform: 'translateX(-50%)' }}>a = {a || '?'}</div>
                      <div className="side-label" style={{ bottom: '20px', left: '20px' }}>b = {b || '?'}</div>
                      <div className="side-label" style={{ bottom: '20px', right: '20px' }}>c = {c || '?'}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <button className="calculate-btn" onClick={calculate}>
              Calculate
            </button>
            
            {(area || perimeter || heronsArea) && (
              <div className="results">
                {area && (
                  <div className="result-box">
                    <h3>Area (½ × b × h)</h3>
                    <div className="result-value">{area}</div>
                  </div>
                )}
                {heronsArea && (
                  <div className="result-box">
                    <h3>Area (Heron's Formula)</h3>
                    <div className="result-value">{heronsArea}</div>
                  </div>
                )}
                {perimeter && (
                  <div className="result-box">
                    <h3>Perimeter (a + b + c)</h3>
                    <div className="result-value">{perimeter}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="about-section">
            <h2>About Triangle Calculator</h2>
            <p>
              This calculator helps you find various properties of a triangle. You can calculate:
            </p>
            <ul>
              <li><strong>Area using base and height:</strong> Area = ½ × base × height</li>
              <li><strong>Area using Heron's formula:</strong> When you know all three sides</li>
              <li><strong>Perimeter:</strong> Sum of all three sides</li>
            </ul>
            <p>
              Simply enter the required measurements and click calculate. The visual triangle helps you understand which dimensions you're working with.
            </p>
          </div>
        </div>
        
        <div className="ad-banner">
          Advertisement
        </div>
      </div>
    </div>
  )
}