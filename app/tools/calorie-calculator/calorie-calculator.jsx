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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Calorie Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
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
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Calorie Calculator</h2>
        <p>
          The Calorie Calculator estimates your daily caloric needs based on age, gender, height, weight, and activity level. Useful for weight management and nutrition planning. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 