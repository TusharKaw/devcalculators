'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState('basic')
  const [formData, setFormData] = useState({
    value1: '',
    value2: '',
    percentage: '',
    originalValue: '',
    newValue: '',
    discountPercent: '',
    markupPercent: ''
  })
  const [results, setResults] = useState(null)

  const calculatePercentage = (e) => {
    e.preventDefault()
    let result = {}

    switch (calculationType) {
      case 'basic':
        if (formData.value1 && formData.value2) {
          const percentage = (parseFloat(formData.value1) / parseFloat(formData.value2)) * 100
          result = {
            type: 'Basic Percentage',
            calculation: `${formData.value1} is ${percentage.toFixed(2)}% of ${formData.value2}`,
            percentage: percentage.toFixed(2)
          }
        }
        break

      case 'percentageOf':
        if (formData.value1 && formData.percentage) {
          const resultValue = (parseFloat(formData.value1) * parseFloat(formData.percentage)) / 100
          result = {
            type: 'Percentage of Value',
            calculation: `${formData.percentage}% of ${formData.value1} = ${resultValue.toFixed(2)}`,
            result: resultValue.toFixed(2)
          }
        }
        break

      case 'percentageChange':
        if (formData.originalValue && formData.newValue) {
          const change = parseFloat(formData.newValue) - parseFloat(formData.originalValue)
          const percentageChange = (change / parseFloat(formData.originalValue)) * 100
          result = {
            type: 'Percentage Change',
            calculation: `Change from ${formData.originalValue} to ${formData.newValue}`,
            change: change.toFixed(2),
            percentageChange: percentageChange.toFixed(2),
            direction: change >= 0 ? 'increase' : 'decrease'
          }
        }
        break

      case 'discount':
        if (formData.originalValue && formData.discountPercent) {
          const discount = (parseFloat(formData.originalValue) * parseFloat(formData.discountPercent)) / 100
          const finalPrice = parseFloat(formData.originalValue) - discount
          result = {
            type: 'Discount Calculation',
            calculation: `${formData.discountPercent}% discount on $${formData.originalValue}`,
            discount: discount.toFixed(2),
            finalPrice: finalPrice.toFixed(2)
          }
        }
        break

      case 'markup':
        if (formData.originalValue && formData.markupPercent) {
          const markup = (parseFloat(formData.originalValue) * parseFloat(formData.markupPercent)) / 100
          const finalPrice = parseFloat(formData.originalValue) + markup
          result = {
            type: 'Markup Calculation',
            calculation: `${formData.markupPercent}% markup on $${formData.originalValue}`,
            markup: markup.toFixed(2),
            finalPrice: finalPrice.toFixed(2)
          }
        }
        break
    }

    setResults(result)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearForm = () => {
    setFormData({
      value1: '',
      value2: '',
      percentage: '',
      originalValue: '',
      newValue: '',
      discountPercent: '',
      markupPercent: ''
    })
    setResults(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Percentage Calculator
      </div>

      <header className="header">
        <h1>Percentage Calculator</h1>
        <p>Calculate percentages, discounts, markups, and percentage changes</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <div className="type-selector">
          <button
            type="button"
            className={`type-btn ${calculationType === 'basic' ? 'active' : ''}`}
            onClick={() => setCalculationType('basic')}
          >
            Basic Percentage
          </button>
          <button
            type="button"
            className={`type-btn ${calculationType === 'percentageOf' ? 'active' : ''}`}
            onClick={() => setCalculationType('percentageOf')}
          >
            Percentage of Value
          </button>
          <button
            type="button"
            className={`type-btn ${calculationType === 'percentageChange' ? 'active' : ''}`}
            onClick={() => setCalculationType('percentageChange')}
          >
            Percentage Change
          </button>
          <button
            type="button"
            className={`type-btn ${calculationType === 'discount' ? 'active' : ''}`}
            onClick={() => setCalculationType('discount')}
          >
            Discount Calculator
          </button>
          <button
            type="button"
            className={`type-btn ${calculationType === 'markup' ? 'active' : ''}`}
            onClick={() => setCalculationType('markup')}
          >
            Markup Calculator
          </button>
        </div>

        <form onSubmit={calculatePercentage}>
          {calculationType === 'basic' && (
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="value1">Value 1</label>
                <input
                  type="number"
                  id="value1"
                  name="value1"
                  value={formData.value1}
                  onChange={handleInputChange}
                  placeholder="Enter first value"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="value2">Value 2 (Total)</label>
                <input
                  type="number"
                  id="value2"
                  name="value2"
                  value={formData.value2}
                  onChange={handleInputChange}
                  placeholder="Enter second value"
                  step="0.01"
                  required
                />
              </div>
            </div>
          )}

          {calculationType === 'percentageOf' && (
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="value1">Value</label>
                <input
                  type="number"
                  id="value1"
                  name="value1"
                  value={formData.value1}
                  onChange={handleInputChange}
                  placeholder="Enter value"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="percentage">Percentage (%)</label>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleInputChange}
                  placeholder="Enter percentage"
                  step="0.01"
                  required
                />
              </div>
            </div>
          )}

          {calculationType === 'percentageChange' && (
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="originalValue">Original Value</label>
                <input
                  type="number"
                  id="originalValue"
                  name="originalValue"
                  value={formData.originalValue}
                  onChange={handleInputChange}
                  placeholder="Enter original value"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newValue">New Value</label>
                <input
                  type="number"
                  id="newValue"
                  name="newValue"
                  value={formData.newValue}
                  onChange={handleInputChange}
                  placeholder="Enter new value"
                  step="0.01"
                  required
                />
              </div>
            </div>
          )}

          {calculationType === 'discount' && (
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="originalValue">Original Price ($)</label>
                <input
                  type="number"
                  id="originalValue"
                  name="originalValue"
                  value={formData.originalValue}
                  onChange={handleInputChange}
                  placeholder="Enter original price"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="discountPercent">Discount Percentage (%)</label>
                <input
                  type="number"
                  id="discountPercent"
                  name="discountPercent"
                  value={formData.discountPercent}
                  onChange={handleInputChange}
                  placeholder="Enter discount percentage"
                  step="0.01"
                  required
                />
              </div>
            </div>
          )}

          {calculationType === 'markup' && (
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="originalValue">Cost Price ($)</label>
                <input
                  type="number"
                  id="originalValue"
                  name="originalValue"
                  value={formData.originalValue}
                  onChange={handleInputChange}
                  placeholder="Enter cost price"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="markupPercent">Markup Percentage (%)</label>
                <input
                  type="number"
                  id="markupPercent"
                  name="markupPercent"
                  value={formData.markupPercent}
                  onChange={handleInputChange}
                  placeholder="Enter markup percentage"
                  step="0.01"
                  required
                />
              </div>
            </div>
          )}

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{results.type}</div>
            </div>
            <div className="result-item">
              <div className="result-value">{results.calculation}</div>
            </div>
            <div className="result-values">
              {results.percentage && (
                <div className="result-item">
                  <div className="result-value">{results.percentage}%</div>
                  <div className="result-label">Percentage</div>
                </div>
              )}
              {results.result && (
                <div className="result-item">
                  <div className="result-value">{results.result}</div>
                  <div className="result-label">Result</div>
                </div>
              )}
              {results.change && (
                <div className="result-item">
                  <div className="result-value">{results.change}</div>
                  <div className="result-label">Change</div>
                </div>
              )}
              {results.percentageChange && (
                <div className="result-item">
                  <div className="result-value">{results.percentageChange}%</div>
                  <div className="result-label">{results.direction}</div>
                </div>
              )}
              {results.discount && (
                <div className="result-item">
                  <div className="result-value">${results.discount}</div>
                  <div className="result-label">Discount Amount</div>
                </div>
              )}
              {results.markup && (
                <div className="result-item">
                  <div className="result-value">${results.markup}</div>
                  <div className="result-label">Markup Amount</div>
                </div>
              )}
              {results.finalPrice && (
                <div className="result-item">
                  <div className="result-value">${results.finalPrice}</div>
                  <div className="result-label">Final Price</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="examples">
        <h3>Common Percentage Calculations</h3>
        <div className="example-grid">
          <div className="example-item">
            <div className="example-title">Basic Percentage</div>
            <div className="example-desc">What percentage is 25 of 100? Answer: 25%</div>
          </div>
          <div className="example-item">
            <div className="example-title">Percentage of Value</div>
            <div className="example-desc">What is 20% of 150? Answer: 30</div>
          </div>
          <div className="example-item">
            <div className="example-title">Percentage Change</div>
            <div className="example-desc">Price increased from $100 to $120. Change: 20%</div>
          </div>
          <div className="example-item">
            <div className="example-title">Discount</div>
            <div className="example-desc">$50 item with 20% discount = $40 final price</div>
          </div>
          <div className="example-item">
            <div className="example-title">Markup</div>
            <div className="example-desc">$30 cost with 50% markup = $45 selling price</div>
          </div>
        </div>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 