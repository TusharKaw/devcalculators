'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('metric')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')

  const calculateBMI = () => {
    if (!weight || !height) return

    let weightKg = parseFloat(weight)
    let heightM = parseFloat(height)

    if (unit === 'imperial') {
      // Convert pounds to kg and inches to meters
      weightKg = weightKg * 0.453592
      heightM = heightM * 0.0254
    }

    const bmiValue = weightKg / (heightM * heightM)
    setBmi(bmiValue.toFixed(1))

    // Determine category
    if (bmiValue < 18.5) {
      setCategory('Underweight')
      setColor('#3498db')
    } else if (bmiValue < 25) {
      setCategory('Normal weight')
      setColor('#27ae60')
    } else if (bmiValue < 30) {
      setCategory('Overweight')
      setColor('#f39c12')
    } else {
      setCategory('Obese')
      setColor('#e74c3c')
    }
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    calculateBMI()
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / BMI Calculator
      </div>

      <header className="header">
        <h1>BMI Calculator</h1>
        <p>Calculate your Body Mass Index (BMI) to assess your weight status</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={handleCalculate}>
          <div className="unit-toggle">
            <button
              type="button"
              className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => setUnit('metric')}
            >
              Metric (kg, cm)
            </button>
            <button
              type="button"
              className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => setUnit('imperial')}
            >
              Imperial (lbs, inches)
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="weight">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
              step="0.1"
              required
            />
          </div>

          <button type="submit" className="calculate-btn">
            Calculate BMI
          </button>
        </form>

        {bmi && (
          <div className="results" style={{ borderLeftColor: color }}>
            <div className="bmi-value">{bmi}</div>
            <div className="bmi-category" style={{ color }}>
              {category}
            </div>
            <p>Your Body Mass Index is {bmi}</p>
          </div>
        )}
      </div>

      <div className="bmi-chart">
        <h3 className="chart-title">BMI Categories</h3>
        <div className="chart-grid">
          <div className="chart-item underweight">
            <div>Underweight</div>
            <div>BMI &lt; 18.5</div>
          </div>
          <div className="chart-item normal">
            <div>Normal Weight</div>
            <div>BMI 18.5 - 24.9</div>
          </div>
          <div className="chart-item overweight">
            <div>Overweight</div>
            <div>BMI 25.0 - 29.9</div>
          </div>
          <div className="chart-item obese">
            <div>Obese</div>
            <div>BMI ≥ 30.0</div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>About BMI</h3>
        <ul>
          <li>BMI (Body Mass Index) is a measure of body fat based on height and weight.</li>
          <li>It's a useful screening tool but doesn't directly measure body fat.</li>
          <li>BMI may not be accurate for athletes, pregnant women, or the elderly.</li>
          <li>Consult with a healthcare professional for personalized health advice.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 