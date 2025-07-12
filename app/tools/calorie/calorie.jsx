'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintain'
  })
  const [results, setResults] = useState(null)

  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    veryActive: 1.9      // Very hard exercise, physical job
  }

  const goalMultipliers = {
    lose: 0.85,          // 15% deficit for weight loss
    maintain: 1,         // Maintain current weight
    gain: 1.15           // 15% surplus for weight gain
  }

  const calculateCalories = (e) => {
    e.preventDefault()
    
    const { age, gender, weight, height, activityLevel, goal } = formData
    
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
    
    // Calculate target calories based on goal
    const targetCalories = Math.round(tdee * goalMultipliers[goal])

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      goal
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
        <Link href="/">Home</Link> / Calorie Calculator
      </div>

      <header className="header">
        <h1>Calorie Calculator</h1>
        <p>Calculate your daily calorie needs based on your personal information</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateCalories}>
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
                min="15"
                max="80"
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

          <div className="form-group">
            <label>Goal</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="goal"
                  value="lose"
                  checked={formData.goal === 'lose'}
                  onChange={handleInputChange}
                />
                Lose Weight
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="goal"
                  value="maintain"
                  checked={formData.goal === 'maintain'}
                  onChange={handleInputChange}
                />
                Maintain Weight
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="goal"
                  value="gain"
                  checked={formData.goal === 'gain'}
                  onChange={handleInputChange}
                />
                Gain Weight
              </label>
            </div>
          </div>

          <button type="submit" className="calculate-btn">
            Calculate Calories
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
            
            <div className="result-item">
              <div className="result-value">{results.targetCalories}</div>
              <div className="result-label">
                Target Calories to {results.goal === 'lose' ? 'Lose Weight' : 
                                 results.goal === 'gain' ? 'Gain Weight' : 'Maintain Weight'}
              </div>
              <p>Recommended daily calorie intake for your goal</p>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>Activity Level Guide</h3>
        <ul>
          <li><strong>Sedentary:</strong> Little or no exercise, desk job</li>
          <li><strong>Lightly Active:</strong> Light exercise 1-3 days/week</li>
          <li><strong>Moderately Active:</strong> Moderate exercise 3-5 days/week</li>
          <li><strong>Very Active:</strong> Hard exercise 6-7 days/week</li>
          <li><strong>Extremely Active:</strong> Very hard exercise, physical job</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>About Calorie Calculation</h3>
        <ul>
          <li>BMR (Basal Metabolic Rate) is calculated using the Mifflin-St Jeor Equation.</li>
          <li>TDEE includes your BMR plus calories burned through daily activities.</li>
          <li>For weight loss: Create a 15% calorie deficit.</li>
          <li>For weight gain: Create a 15% calorie surplus.</li>
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