'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [climate, setClimate] = useState('temperate')
  const [results, setResults] = useState(null)

  const calculateWaterIntake = (e) => {
    e.preventDefault()
    
    if (!weight) return

    const weightKg = parseFloat(weight)
    
    // Base calculation: 30-35ml per kg of body weight
    let baseWater = weightKg * 32.5 // ml per day
    
    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      veryActive: 1.4
    }
    
    // Climate adjustments
    const climateMultipliers = {
      cold: 0.9,
      temperate: 1.0,
      hot: 1.2,
      veryHot: 1.4
    }
    
    const adjustedWater = baseWater * 
      activityMultipliers[activityLevel] * 
      climateMultipliers[climate]
    
    const waterLiters = adjustedWater / 1000
    const waterGlasses = Math.round(adjustedWater / 250) // 250ml per glass

    setResults({
      liters: waterLiters,
      glasses: waterGlasses,
      milliliters: Math.round(adjustedWater)
    })
  }

  const clearForm = () => {
    setWeight('')
    setActivityLevel('moderate')
    setClimate('temperate')
    setResults(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Water Intake Calculator
      </div>

      <header className="header">
        <h1>Water Intake Calculator</h1>
        <p>Calculate your daily water intake recommendations</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateWaterIntake}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                id="activityLevel"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="sedentary">Sedentary (little exercise)</option>
                <option value="light">Light activity (1-3 days/week)</option>
                <option value="moderate">Moderate activity (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very active (intense daily exercise)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="climate">Climate</label>
              <select
                id="climate"
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
              >
                <option value="cold">Cold</option>
                <option value="temperate">Temperate</option>
                <option value="hot">Hot</option>
                <option value="veryHot">Very Hot</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Water Intake
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{results.liters.toFixed(1)}L</div>
              <div className="result-label">Daily Water Intake</div>
            </div>
            <div className="result-item">
              <div className="result-value">{results.glasses}</div>
              <div className="result-label">Glasses (250ml each)</div>
            </div>
            <div className="result-item">
              <div className="result-value">{results.milliliters}ml</div>
              <div className="result-label">Milliliters</div>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About Water Intake</h3>
        <ul>
          <li>Base calculation: 30-35ml per kg of body weight per day.</li>
          <li>Activity level and climate affect your water needs.</li>
          <li>This is a general guideline - individual needs may vary.</li>
          <li>Other factors: pregnancy, breastfeeding, illness, medications.</li>
          <li>Listen to your body's thirst signals.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 