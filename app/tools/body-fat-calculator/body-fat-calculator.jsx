"use client"

import { useState, useEffect } from "react"

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [result, setResult] = useState(null)
  const [pointerPosition, setPointerPosition] = useState(10) // Default position
  const [showPointer, setShowPointer] = useState(false)

  const bodyFatCategories = [
    { name: "Essential", range: "2-5%", color: "#4CAF50", min: 2, max: 5 },
    { name: "Athletes", range: "6-13%", color: "#8BC34A", min: 6, max: 13 },
    { name: "Fitness", range: "14-17%", color: "#FFC107", min: 14, max: 17 },
    { name: "Average", range: "18-24%", color: "#FF9800", min: 18, max: 24 },
    { name: "Obese", range: "25%+", color: "#F44336", min: 25, max: 40 }
  ]

  const calculate = () => {
    const h = parseFloat(height)
    const n = parseFloat(neck)
    const w = parseFloat(waist)
    const hp = parseFloat(hip)
    if (!h || !n || !w || (gender === "female" && !hp)) {
      setShowPointer(false)
      return setResult(null)
    }
    
    let bf
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
    }
    
    const roundedBF = parseFloat(bf.toFixed(1))
    setResult(roundedBF)
    setShowPointer(true)
    
    // Calculate pointer position (0-100 scale)
    const position = Math.min(Math.max(roundedBF, 2), 40) // Clamp between 2-40
    const calculatedPosition = ((position - 2) / 38) * 100 // Convert to 0-100 scale
    setPointerPosition(calculatedPosition)
  }

  useEffect(() => {
    // Reset pointer when inputs are cleared
    if (!height || !neck || !waist || (gender === "female" && !hip)) {
      setPointerPosition(10)
      setResult(null)
      setShowPointer(false)
    }
  }, [height, neck, waist, hip, gender])

  const getCategory = (value) => {
    if (!value) return null
    return bodyFatCategories.find(
      cat => value >= cat.min && value <= cat.max
    ) || bodyFatCategories[bodyFatCategories.length - 1] // Default to obese if over max
  }

  const currentCategory = getCategory(result)

  return (
    <div className="calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1 className="calculator-title">Body Fat Percentage Calculator</h1>
          
          <div className="calculator-card">
            <div className="calculator-grid">
              <div className="input-section">
                <div className="input-group">
                  <div className="input-field">
                    <label>Gender</label>
                    <div className="gender-toggle">
                      <button
                        className={`gender-option ${gender === "male" ? "active" : ""}`}
                        onClick={() => setGender("male")}
                      >
                        Male
                      </button>
                      <button
                        className={`gender-option ${gender === "female" ? "active" : ""}`}
                        onClick={() => setGender("female")}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                  
                  <div className="input-field">
                    <label>Age (years)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      min="18"
                      max="100"
                      className="styled-input"
                    />
                  </div>
                  
                  <div className="input-field">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="175"
                      min="100"
                      max="250"
                      className="styled-input"
                    />
                  </div>
                  
                  <div className="input-field">
                    <label>Neck (cm)</label>
                    <input
                      type="number"
                      value={neck}
                      onChange={(e) => setNeck(e.target.value)}
                      placeholder="40"
                      min="20"
                      max="60"
                      className="styled-input"
                    />
                  </div>
                  
                  <div className="input-field">
                    <label>Waist (cm)</label>
                    <input
                      type="number"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      placeholder="80"
                      min="50"
                      max="150"
                      className="styled-input"
                    />
                  </div>
                  
                  {gender === "female" && (
                    <div className="input-field">
                      <label>Hip (cm)</label>
                      <input
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder="95"
                        min="60"
                        max="150"
                        className="styled-input"
                      />
                    </div>
                  )}
                </div>
                
                <button className="calculate-btn" onClick={calculate}>
                  Calculate Body Fat
                </button>
              </div>
              
              <div className="results-section">
                <div className="scale-container">
                  <div className="body-fat-scale">
                    <div className="scale-labels">
                      {bodyFatCategories.map((category, index) => (
                        <div key={index} className="scale-label">
                          <span className="label-name">{category.name}</span>
                          <span className="label-range">{category.range}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="scale-visualization">
                      <div className="scale-bar">
                        {bodyFatCategories.map((category, index) => (
                          <div
                            key={index}
                            className="scale-segment"
                            style={{
                              backgroundColor: category.color,
                              width: `${(category.max - category.min) / 0.38}%`
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {showPointer && (
                        <div
                          className="scale-pointer"
                          style={{
                            left: `${pointerPosition}%`,
                            transition: "left 0.5s ease-out"
                          }}
                        >
                          <div className="pointer-line"></div>
                          <div className="pointer-dot"></div>
                          <div className="pointer-value">{result}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {result && (
                    <div className="result-display">
                      <div className="result-value">
                        <h2>{result}%</h2>
                        <span>Body Fat Percentage</span>
                      </div>
                      {currentCategory && (
                        <div 
                          className="result-category"
                          style={{ backgroundColor: currentCategory.color }}
                        >
                          {currentCategory.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>About Body Fat Calculator</h2>
            <p>
              The Body Fat Percentage Calculator uses the U.S. Navy method to estimate your body fat percentage based on measurements of your neck, waist, and hip (for women). This calculator provides a quick and easy way to track your body composition and fitness progress.
            </p>
            <p>
              Body fat percentage is a more accurate indicator of health and fitness than weight alone, as it accounts for muscle mass and overall body composition. Regular monitoring can help you set realistic fitness goals and track your progress more effectively.
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
        .calculator-container {
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
        
        .calculator-title {
          text-align: center;
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-weight: 700;
        }
        
        .calculator-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }
        
        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        
        .input-section {
          display: flex;
          flex-direction: column;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .input-field label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 14px;
        }
        
        .styled-input {
          padding: 12px 16px;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s;
          background: #f8f9fa;
        }
        
        .styled-input:focus {
          outline: none;
          border-color: #3498db;
          background: white;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .gender-toggle {
          display: flex;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          overflow: hidden;
          background: #f8f9fa;
        }
        
        .gender-option {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }
        
        .gender-option.active {
          background: #3498db;
          color: white;
        }
        
        .calculate-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          width: 100%;
          transition: all 0.3s;
          margin-top: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .calculate-btn:hover {
          background: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .results-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .scale-container {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .body-fat-scale {
          margin-top: 10px;
        }
        
        .scale-visualization {
          position: relative;
          height: 60px;
          margin-top: 15px;
        }
        
        .scale-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .scale-label {
          text-align: center;
          flex: 1;
        }
        
        .label-name {
          display: block;
          font-weight: 600;
          font-size: 13px;
          color: #2c3e50;
        }
        
        .label-range {
          display: block;
          font-size: 12px;
          color: #7f8c8d;
        }
        
        .scale-bar {
          height: 16px;
          border-radius: 8px;
          background: #f0f0f0;
          display: flex;
          overflow: hidden;
          position: relative;
        }
        
        .scale-segment {
          height: 100%;
        }
        
        .scale-pointer {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 60px;
        }
        
        .pointer-line {
          width: 2px;
          height: 20px;
          background: #2c3e50;
          margin-bottom: -2px;
        }
        
        .pointer-dot {
          width: 16px;
          height: 16px;
          background: #2c3e50;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .pointer-value {
          margin-top: 8px;
          background: #2c3e50;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .result-display {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .result-value h2 {
          font-size: 2.8rem;
          color: #2c3e50;
          margin: 0;
          line-height: 1;
        }
        
        .result-value span {
          display: block;
          color: #7f8c8d;
          margin-top: 5px;
          font-size: 14px;
        }
        
        .result-category {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          margin-top: 15px;
          font-size: 14px;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .about-section h2 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.6rem;
        }
        
        .about-section p {
          color: #34495e;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .calculator-grid {
            grid-template-columns: 1fr;
          }
          
          .results-section {
            margin-top: 30px;
          }
          
          .scale-labels {
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .scale-label {
            flex: 0 0 calc(50% - 10px);
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}