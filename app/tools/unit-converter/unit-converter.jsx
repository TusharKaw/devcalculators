'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [fromValue, setFromValue] = useState('')
  const [result, setResult] = useState(null)

  const units = {
    length: {
      meters: 1,
      kilometers: 1000,
      centimeters: 0.01,
      millimeters: 0.001,
      miles: 1609.34,
      yards: 0.9144,
      feet: 0.3048,
      inches: 0.0254
    },
    weight: {
      kilograms: 1,
      grams: 0.001,
      pounds: 0.453592,
      ounces: 0.0283495,
      tons: 1000
    },
    temperature: {
      celsius: 'celsius',
      fahrenheit: 'fahrenheit',
      kelvin: 'kelvin'
    },
    area: {
      'square meters': 1,
      'square kilometers': 1000000,
      'square feet': 0.092903,
      'square yards': 0.836127,
      acres: 4046.86,
      hectares: 10000
    },
    volume: {
      liters: 1,
      milliliters: 0.001,
      gallons: 3.78541,
      quarts: 0.946353,
      pints: 0.473176,
      cups: 0.236588
    }
  }

  const convert = () => {
    if (!fromValue || !fromUnit || !toUnit) return

    const value = parseFloat(fromValue)
    
    if (category === 'temperature') {
      let celsius
      
      // Convert to Celsius first
      switch (fromUnit) {
        case 'celsius':
          celsius = value
          break
        case 'fahrenheit':
          celsius = (value - 32) * 5/9
          break
        case 'kelvin':
          celsius = value - 273.15
          break
        default:
          return
      }
      
      // Convert from Celsius to target unit
      switch (toUnit) {
        case 'celsius':
          setResult(celsius)
          break
        case 'fahrenheit':
          setResult((celsius * 9/5) + 32)
          break
        case 'kelvin':
          setResult(celsius + 273.15)
          break
        default:
          return
      }
    } else {
      const fromFactor = units[category][fromUnit]
      const toFactor = units[category][toUnit]
      
      if (fromFactor && toFactor) {
        const result = (value * fromFactor) / toFactor
        setResult(result)
      }
    }
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  const getUnitOptions = () => {
    return Object.keys(units[category]).map(unit => (
      <option key={unit} value={unit}>{unit}</option>
    ))
  }

  const commonConversions = {
    length: [
      { from: '1 meter', to: '3.28 feet' },
      { from: '1 kilometer', to: '0.62 miles' },
      { from: '1 inch', to: '2.54 centimeters' },
      { from: '1 mile', to: '1.61 kilometers' }
    ],
    weight: [
      { from: '1 kilogram', to: '2.20 pounds' },
      { from: '1 pound', to: '0.45 kilograms' },
      { from: '1 ounce', to: '28.35 grams' },
      { from: '1 ton', to: '1000 kilograms' }
    ],
    temperature: [
      { from: '0°C', to: '32°F' },
      { from: '100°C', to: '212°F' },
      { from: '0°C', to: '273.15K' },
      { from: '25°C', to: '77°F' }
    ],
    area: [
      { from: '1 square meter', to: '10.76 square feet' },
      { from: '1 acre', to: '4046.86 square meters' },
      { from: '1 hectare', to: '2.47 acres' },
      { from: '1 square mile', to: '640 acres' }
    ],
    volume: [
      { from: '1 liter', to: '0.26 gallons' },
      { from: '1 gallon', to: '3.79 liters' },
      { from: '1 cup', to: '0.24 liters' },
      { from: '1 quart', to: '0.95 liters' }
    ]
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Unit Converter
      </div>

      <header className="header">
        <h1>Unit Converter</h1>
        <p>Convert between different units of measurement</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <div className="unit-toggle">
          <button
            className={`unit-btn ${category === 'length' ? 'active' : ''}`}
            onClick={() => setCategory('length')}
          >
            Length
          </button>
          <button
            className={`unit-btn ${category === 'weight' ? 'active' : ''}`}
            onClick={() => setCategory('weight')}
          >
            Weight
          </button>
          <button
            className={`unit-btn ${category === 'temperature' ? 'active' : ''}`}
            onClick={() => setCategory('temperature')}
          >
            Temperature
          </button>
          <button
            className={`unit-btn ${category === 'area' ? 'active' : ''}`}
            onClick={() => setCategory('area')}
          >
            Area
          </button>
          <button
            className={`unit-btn ${category === 'volume' ? 'active' : ''}`}
            onClick={() => setCategory('volume')}
          >
            Volume
          </button>
        </div>

        <div className="conversion-form">
          <div className="form-group">
            <label htmlFor="fromValue">Value</label>
            <input
              type="number"
              id="fromValue"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value"
              step="0.01"
            />
          </div>

          <button type="button" className="swap-btn" onClick={swapUnits}>
            ⇄
          </button>

          <div className="form-group">
            <label htmlFor="fromUnit">From Unit</label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              <option value="">Select unit</option>
              {getUnitOptions()}
            </select>
          </div>
        </div>

        <div className="conversion-arrow">↓</div>

        <div className="form-group">
          <label htmlFor="toUnit">To Unit</label>
          <select
            id="toUnit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            <option value="">Select unit</option>
            {getUnitOptions()}
          </select>
        </div>

        <button onClick={convert} className="calculate-btn">
          Convert
        </button>

        {result !== null && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{result.toFixed(4)}</div>
              <div className="result-label">{toUnit}</div>
            </div>
          </div>
        )}
      </div>

      <div className="common-conversions">
        <h3>Common {category.charAt(0).toUpperCase() + category.slice(1)} Conversions</h3>
        <div className="conversion-grid">
          {commonConversions[category].map((conversion, index) => (
            <div key={index} className="conversion-item">
              <div className="conversion-title">{conversion.from}</div>
              <div className="conversion-example">= {conversion.to}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3>About Unit Conversion</h3>
        <ul>
          <li>Length conversions use standard metric and imperial units.</li>
          <li>Weight conversions include metric and US customary units.</li>
          <li>Temperature conversions use Celsius, Fahrenheit, and Kelvin scales.</li>
          <li>Area conversions cover common land and building measurements.</li>
          <li>Volume conversions include liquid and dry measurements.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 