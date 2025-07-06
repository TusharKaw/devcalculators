"use client"

import { useState } from "react"

export default function CalorieCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activity, setActivity] = useState(1.2)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const a = parseFloat(age)
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!a || !h || !w) return setResult(null)
    let bmr
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161
    }
    const calories = bmr * parseFloat(activity)
    setResult(calories.toFixed(0))
  }

  return (
    <div className="calorie-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1>Calorie Calculator</h1>
          <div className="calculator-card">
            <div style={{ marginBottom: 15 }}>
              <label>Age: </label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label>Gender: </label>
              <select value={gender} onChange={e => setGender(e.target.value)} style={{ marginLeft: 10 }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div style={{ marginBottom: 15 }}>
              <label>Height (cm): </label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label>Weight (kg): </label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label>Activity Level: </label>
              <select value={activity} onChange={e => setActivity(e.target.value)} style={{ marginLeft: 10 }}>
                <option value={1.2}>Sedentary</option>
                <option value={1.375}>Lightly active</option>
                <option value={1.55}>Moderately active</option>
                <option value={1.725}>Very active</option>
                <option value={1.9}>Extra active</option>
              </select>
            </div>
            <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
            {result && (
              <div style={{ marginTop: 20, fontSize: 18 }}>
                <strong>Estimated Daily Calories: {result} kcal</strong>
              </div>
            )}
          </div>
          
          <div className="about-section">
            <h2>About Calorie Calculator</h2>
            <p>
              The Calorie Calculator estimates your daily caloric needs based on age, gender, height, weight, and activity level. Useful for weight management and nutrition planning. (You can update this section later.)
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
        .calorie-calculator-container {
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