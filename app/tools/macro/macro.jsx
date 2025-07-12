'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MacroCalculator() {
  const [calories, setCalories] = useState('')
  const [goal, setGoal] = useState('maintain')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [results, setResults] = useState(null)

  const calculateMacros = (e) => {
    e.preventDefault()
    
    if (!calories) return

    const dailyCalories = parseFloat(calories)
    
    let proteinRatio, fatRatio, carbRatio
    
    switch (goal) {
      case 'lose':
        proteinRatio = 0.35 // 35% protein
        fatRatio = 0.30    // 30% fat
        carbRatio = 0.35   // 35% carbs
        break
      case 'maintain':
        proteinRatio = 0.25 // 25% protein
        fatRatio = 0.25    // 25% fat
        carbRatio = 0.50   // 50% carbs
        break
      case 'gain':
        proteinRatio = 0.20 // 20% protein
        fatRatio = 0.20    // 20% fat
        carbRatio = 0.60   // 60% carbs
        break
      default:
        proteinRatio = 0.25
        fatRatio = 0.25
        carbRatio = 0.50
    }

    const proteinGrams = Math.round((dailyCalories * proteinRatio) / 4)
    const fatGrams = Math.round((dailyCalories * fatRatio) / 9)
    const carbGrams = Math.round((dailyCalories * carbRatio) / 4)

    setResults({
      calories: dailyCalories,
      protein: proteinGrams,
      fat: fatGrams,
      carbs: carbGrams,
      goal: goal
    })
  }

  const clearForm = () => {
    setCalories('')
    setGoal('maintain')
    setActivityLevel('moderate')
    setResults(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Macro Calculator
      </div>

      <header className="header">
        <h1>Macro Calculator</h1>
        <p>Calculate macronutrient ratios for your diet</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateMacros}>
          <div className="form-group">
            <label htmlFor="calories">Daily Calories</label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Enter daily calorie target"
              required
            />
          </div>

          <div className="form-group">
            <label>Goal</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="goal"
                  value="lose"
                  checked={goal === 'lose'}
                  onChange={(e) => setGoal(e.target.value)}
                />
                Lose Weight
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="goal"
                  value="maintain"
                  checked={goal === 'maintain'}
                  onChange={(e) => setGoal(e.target.value)}
                />
                Maintain Weight
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="goal"
                  value="gain"
                  checked={goal === 'gain'}
                  onChange={(e) => setGoal(e.target.value)}
                />
                Gain Weight
              </label>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Macros
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{results.protein}g</div>
              <div className="result-label">Protein</div>
            </div>
            <div className="result-item">
              <div className="result-value">{results.fat}g</div>
              <div className="result-label">Fat</div>
            </div>
            <div className="result-item">
              <div className="result-value">{results.carbs}g</div>
              <div className="result-label">Carbohydrates</div>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About Macronutrients</h3>
        <ul>
          <li><strong>Protein:</strong> 4 calories per gram - essential for muscle building and repair</li>
          <li><strong>Fat:</strong> 9 calories per gram - important for hormone production and nutrient absorption</li>
          <li><strong>Carbohydrates:</strong> 4 calories per gram - primary energy source for the body</li>
          <li>Ratios are adjusted based on your fitness goal.</li>
          <li>These are general guidelines - individual needs may vary.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 