"use client"

import { useState } from "react"

export default function BMICalculator() {
  const [units, setUnits] = useState("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [result, setResult] = useState(null)

  const calculateBMI = () => {
    let heightInMeters, weightInKg

    if (units === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
      weightInKg = Number.parseFloat(weight)
    } else {
      const totalInches = Number.parseFloat(feet) * 12 + Number.parseFloat(inches)
      heightInMeters = totalInches * 0.0254
      weightInKg = Number.parseFloat(weight) * 0.453592
    }

    if (heightInMeters && weightInKg) {
      const bmi = weightInKg / (heightInMeters * heightInMeters)
      let category = ""

      if (bmi < 18.5) category = "Underweight"
      else if (bmi < 25) category = "Normal weight"
      else if (bmi < 30) category = "Overweight"
      else category = "Obese"

      setResult({
        bmi: bmi.toFixed(1),
        category,
      })
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>BMI Calculator</h1>

      <div
        style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "20px" }}>
            <input
              type="radio"
              value="metric"
              checked={units === "metric"}
              onChange={(e) => setUnits(e.target.value)}
            />
            Metric Units
          </label>
          <label>
            <input
              type="radio"
              value="imperial"
              checked={units === "imperial"}
              onChange={(e) => setUnits(e.target.value)}
            />
            US Units
          </label>
        </div>

        {units === "metric" ? (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <label>Height (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <label>Height:</label>
              <input
                type="number"
                placeholder="feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                style={{ marginLeft: "10px", padding: "5px", width: "80px" }}
              />
              <span style={{ margin: "0 5px" }}>ft</span>
              <input
                type="number"
                placeholder="inches"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                style={{ padding: "5px", width: "80px" }}
              />
              <span style={{ marginLeft: "5px" }}>in</span>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Weight (lbs):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
              />
            </div>
          </div>
        )}

        <button
          onClick={calculateBMI}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Calculate BMI
        </button>

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f8f9fa",
              borderRadius: "4px",
              border: "1px solid #dee2e6",
            }}
          >
            <h3>Your BMI Result</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>BMI: {result.bmi}</p>
            <p style={{ fontSize: "18px" }}>
              Category: <strong>{result.category}</strong>
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About BMI Calculator</h2>
        <p>
          The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while
          taking age into consideration. Use the "Metric Units" tab for the International System of Units or the "US
          Units" tab for the Imperial system.
        </p>
      </div>
    </div>
  )
}
