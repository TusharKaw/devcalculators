'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AreaCalculator() {
  const [shape, setShape] = useState('rectangle')
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    base: '',
    height: '',
    radius: '',
    side: ''
  })
  const [area, setArea] = useState(null)

  const calculateArea = (e) => {
    e.preventDefault()
    
    let calculatedArea = 0

    switch (shape) {
      case 'rectangle':
        if (dimensions.length && dimensions.width) {
          calculatedArea = parseFloat(dimensions.length) * parseFloat(dimensions.width)
        }
        break
      
      case 'square':
        if (dimensions.side) {
          calculatedArea = Math.pow(parseFloat(dimensions.side), 2)
        }
        break
      
      case 'triangle':
        if (dimensions.base && dimensions.height) {
          calculatedArea = (parseFloat(dimensions.base) * parseFloat(dimensions.height)) / 2
        }
        break
      
      case 'circle':
        if (dimensions.radius) {
          calculatedArea = Math.PI * Math.pow(parseFloat(dimensions.radius), 2)
        }
        break
      
      case 'trapezoid':
        if (dimensions.length && dimensions.width && dimensions.height) {
          calculatedArea = ((parseFloat(dimensions.length) + parseFloat(dimensions.width)) * parseFloat(dimensions.height)) / 2
        }
        break
      
      case 'parallelogram':
        if (dimensions.base && dimensions.height) {
          calculatedArea = parseFloat(dimensions.base) * parseFloat(dimensions.height)
        }
        break
      
      case 'ellipse':
        if (dimensions.length && dimensions.width) {
          calculatedArea = Math.PI * parseFloat(dimensions.length) * parseFloat(dimensions.width) / 4
        }
        break
      
      default:
        break
    }

    if (calculatedArea > 0) {
      setArea(calculatedArea)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearForm = () => {
    setDimensions({
      length: '',
      width: '',
      base: '',
      height: '',
      radius: '',
      side: ''
    })
    setArea(null)
  }

  const renderInputs = () => {
    switch (shape) {
      case 'rectangle':
        return (
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="length">Length</label>
              <input
                type="number"
                id="length"
                name="length"
                value={dimensions.length}
                onChange={handleInputChange}
                placeholder="Enter length"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="width">Width</label>
              <input
                type="number"
                id="width"
                name="width"
                value={dimensions.width}
                onChange={handleInputChange}
                placeholder="Enter width"
                step="0.01"
                required
              />
            </div>
          </div>
        )
      
      case 'square':
        return (
          <div className="form-group">
            <label htmlFor="side">Side Length</label>
            <input
              type="number"
              id="side"
              name="side"
              value={dimensions.side}
              onChange={handleInputChange}
              placeholder="Enter side length"
              step="0.01"
              required
            />
          </div>
        )
      
      case 'triangle':
        return (
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="base">Base</label>
              <input
                type="number"
                id="base"
                name="base"
                value={dimensions.base}
                onChange={handleInputChange}
                placeholder="Enter base"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                name="height"
                value={dimensions.height}
                onChange={handleInputChange}
                placeholder="Enter height"
                step="0.01"
                required
              />
            </div>
          </div>
        )
      
      case 'circle':
        return (
          <div className="form-group">
            <label htmlFor="radius">Radius</label>
            <input
              type="number"
              id="radius"
              name="radius"
              value={dimensions.radius}
              onChange={handleInputChange}
              placeholder="Enter radius"
              step="0.01"
              required
            />
          </div>
        )
      
      case 'trapezoid':
        return (
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="length">Base 1</label>
              <input
                type="number"
                id="length"
                name="length"
                value={dimensions.length}
                onChange={handleInputChange}
                placeholder="Enter base 1"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="width">Base 2</label>
              <input
                type="number"
                id="width"
                name="width"
                value={dimensions.width}
                onChange={handleInputChange}
                placeholder="Enter base 2"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                name="height"
                value={dimensions.height}
                onChange={handleInputChange}
                placeholder="Enter height"
                step="0.01"
                required
              />
            </div>
          </div>
        )
      
      case 'parallelogram':
        return (
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="base">Base</label>
              <input
                type="number"
                id="base"
                name="base"
                value={dimensions.base}
                onChange={handleInputChange}
                placeholder="Enter base"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                name="height"
                value={dimensions.height}
                onChange={handleInputChange}
                placeholder="Enter height"
                step="0.01"
                required
              />
            </div>
          </div>
        )
      
      case 'ellipse':
        return (
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="length">Major Axis</label>
              <input
                type="number"
                id="length"
                name="length"
                value={dimensions.length}
                onChange={handleInputChange}
                placeholder="Enter major axis"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="width">Minor Axis</label>
              <input
                type="number"
                id="width"
                name="width"
                value={dimensions.width}
                onChange={handleInputChange}
                placeholder="Enter minor axis"
                step="0.01"
                required
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Area Calculator
      </div>

      <header className="header">
        <h1>Area Calculator</h1>
        <p>Calculate the area of various geometric shapes</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <div className="shape-selector">
          <button
            className={`shape-btn ${shape === 'rectangle' ? 'active' : ''}`}
            onClick={() => setShape('rectangle')}
          >
            Rectangle
          </button>
          <button
            className={`shape-btn ${shape === 'square' ? 'active' : ''}`}
            onClick={() => setShape('square')}
          >
            Square
          </button>
          <button
            className={`shape-btn ${shape === 'triangle' ? 'active' : ''}`}
            onClick={() => setShape('triangle')}
          >
            Triangle
          </button>
          <button
            className={`shape-btn ${shape === 'circle' ? 'active' : ''}`}
            onClick={() => setShape('circle')}
          >
            Circle
          </button>
          <button
            className={`shape-btn ${shape === 'trapezoid' ? 'active' : ''}`}
            onClick={() => setShape('trapezoid')}
          >
            Trapezoid
          </button>
          <button
            className={`shape-btn ${shape === 'parallelogram' ? 'active' : ''}`}
            onClick={() => setShape('parallelogram')}
          >
            Parallelogram
          </button>
          <button
            className={`shape-btn ${shape === 'ellipse' ? 'active' : ''}`}
            onClick={() => setShape('ellipse')}
          >
            Ellipse
          </button>
        </div>

        <form onSubmit={calculateArea}>
          {renderInputs()}
          
          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Area
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {area && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{area.toFixed(4)}</div>
              <div className="result-label">Square Units</div>
            </div>
          </div>
        )}
      </div>

      <div className="shapes-info">
        <h3>Geometric Shapes Information</h3>
        <div className="shapes-grid">
          <div className="shape-info">
            <div className="shape-name">Rectangle</div>
            <div className="shape-desc">Area = Length × Width</div>
          </div>
          <div className="shape-info">
            <div className="shape-name">Square</div>
            <div className="shape-desc">Area = Side²</div>
          </div>
          <div className="shape-info">
            <div className="shape-name">Triangle</div>
            <div className="shape-desc">Area = (Base × Height) ÷ 2</div>
          </div>
          <div className="shape-info">
            <div className="shape-name">Circle</div>
            <div className="shape-desc">Area = π × Radius²</div>
          </div>
          <div className="shape-info">
            <div className="shape-name">Trapezoid</div>
            <div className="shape-desc">Area = (Base1 + Base2) × Height ÷ 2</div>
          </div>
          <div className="shape-info">
            <div className="shape-name">Parallelogram</div>
            <div className="shape-desc">Area = Base × Height</div>
          </div>
          <div className="shape-info">
            <div className="shape-name">Ellipse</div>
            <div className="shape-desc">Area = π × Major Axis × Minor Axis ÷ 4</div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>About Area Calculations</h3>
        <ul>
          <li>All measurements should be in the same units (e.g., all in meters or all in feet).</li>
          <li>For triangles, height is the perpendicular distance from the base to the opposite vertex.</li>
          <li>For trapezoids, the height is the perpendicular distance between the two parallel sides.</li>
          <li>Circle area uses π (pi) ≈ 3.14159.</li>
          <li>Results are rounded to 4 decimal places for precision.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 