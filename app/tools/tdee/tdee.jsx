'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TDEECalculator() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate'
  })
  const [results, setResults] = useState(null)

  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    veryActive: 1.9      // Very hard exercise, physical job
  }

  const calculateTDEE = (e) => {
    e.preventDefault()
    
    const { age, gender, weight, height, activityLevel } = formData
    
    if (!age || !weight || !height) return

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    }

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[activityLevel]

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / TDEE Calculator
      </div>

      <header className="header">
        <h1>TDEE Calculator</h1>
        <p>Calculate your Total Daily Energy Expenditure</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateTDEE}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="age">Age (years)</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Enter your weight"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Enter your height"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="activityLevel">Activity Level</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
              <option value="active">Very active (hard exercise 6-7 days/week)</option>
              <option value="veryActive">Extremely active (very hard exercise, physical job)</option>
            </select>
          </div>

          <button type="submit" className="calculate-btn">
            Calculate TDEE
          </button>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{results.bmr}</div>
              <div className="result-label">Basal Metabolic Rate (BMR)</div>
              <p>Calories your body needs at complete rest</p>
            </div>
            
            <div className="result-item">
              <div className="result-value">{results.tdee}</div>
              <div className="result-label">Total Daily Energy Expenditure (TDEE)</div>
              <p>Calories you burn in a day with activity</p>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About TDEE</h3>
        <ul>
          <li>BMR (Basal Metabolic Rate) is calculated using the Mifflin-St Jeor Equation.</li>
          <li>TDEE includes your BMR plus calories burned through daily activities.</li>
          <li>Use TDEE to determine your daily calorie needs for weight management.</li>
          <li>These are estimates - individual needs may vary.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 