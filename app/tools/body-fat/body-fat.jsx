'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BodyFatCalculator() {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [waist, setWaist] = useState('')
  const [neck, setNeck] = useState('')
  const [hip, setHip] = useState('')
  const [bodyFat, setBodyFat] = useState(null)

  const calculateBodyFat = (e) => {
    e.preventDefault()
    
    if (!age || !weight || !height || !waist || !neck) return

    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    const waistNum = parseFloat(waist)
    const neckNum = parseFloat(neck)
    const hipNum = parseFloat(hip)

    let bodyFatPercentage = 0

    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450
    } else {
      if (!hipNum) {
        alert('Hip measurement is required for women')
        return
      }
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.22100 * Math.log10(heightNum)) - 450
    }

    if (bodyFatPercentage > 0 && bodyFatPercentage < 50) {
      setBodyFat(bodyFatPercentage)
    } else {
      alert('Please check your measurements.')
    }
  }

  const clearForm = () => {
    setAge('')
    setWeight('')
    setHeight('')
    setWaist('')
    setNeck('')
    setHip('')
    setBodyFat(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Body Fat Calculator
      </div>

      <header className="header">
        <h1>Body Fat Calculator</h1>
        <p>Estimate your body fat percentage using the US Navy method</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateBodyFat}>
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="age">Age (years)</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                required
              />
            </div>

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
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter your height"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="waist">Waist (cm)</label>
              <input
                type="number"
                id="waist"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Enter waist circumference"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="neck">Neck (cm)</label>
              <input
                type="number"
                id="neck"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                placeholder="Enter neck circumference"
                step="0.1"
                required
              />
            </div>

            {gender === 'female' && (
              <div className="form-group">
                <label htmlFor="hip">Hip (cm)</label>
                <input
                  type="number"
                  id="hip"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  placeholder="Enter hip circumference"
                  step="0.1"
                  required
                />
              </div>
            )}
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Body Fat
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {bodyFat && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{bodyFat.toFixed(1)}%</div>
              <div className="result-label">Body Fat Percentage</div>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About Body Fat Calculation</h3>
        <ul>
          <li>This calculator uses the US Navy method for body fat estimation.</li>
          <li>Measurements should be taken at the narrowest point for waist and neck.</li>
          <li>For women, hip measurement is taken at the widest point.</li>
          <li>This is an estimation - for accurate results, consider professional testing.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 