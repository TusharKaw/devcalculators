"use client";

import { useState } from "react";

const CATEGORIES = [
  {
    name: "Length",
    units: [
      { label: "Meters", value: "m", factor: 1 },
      { label: "Kilometers", value: "km", factor: 1000 },
      { label: "Centimeters", value: "cm", factor: 0.01 },
      { label: "Millimeters", value: "mm", factor: 0.001 },
      { label: "Miles", value: "mi", factor: 1609.34 },
      { label: "Yards", value: "yd", factor: 0.9144 },
      { label: "Feet", value: "ft", factor: 0.3048 },
      { label: "Inches", value: "in", factor: 0.0254 },
    ],
  },
  {
    name: "Weight",
    units: [
      { label: "Kilograms", value: "kg", factor: 1 },
      { label: "Grams", value: "g", factor: 0.001 },
      { label: "Milligrams", value: "mg", factor: 0.000001 },
      { label: "Pounds", value: "lb", factor: 0.453592 },
      { label: "Ounces", value: "oz", factor: 0.0283495 },
    ],
  },
  {
    name: "Temperature",
    units: [
      { label: "Celsius", value: "C" },
      { label: "Fahrenheit", value: "F" },
      { label: "Kelvin", value: "K" },
    ],
  },
];

function convertValue(value, from, to, category) {
  if (category === "Temperature") {
    if (from === to) return value;
    if (from === "C" && to === "F") return value * 9/5 + 32;
    if (from === "F" && to === "C") return (value - 32) * 5/9;
    if (from === "C" && to === "K") return value + 273.15;
    if (from === "K" && to === "C") return value - 273.15;
    if (from === "F" && to === "K") return (value - 32) * 5/9 + 273.15;
    if (from === "K" && to === "F") return (value - 273.15) * 9/5 + 32;
    return value;
  }
  const fromUnit = CATEGORIES.find(c => c.name === category).units.find(u => u.value === from);
  const toUnit = CATEGORIES.find(c => c.name === category).units.find(u => u.value === to);
  return (value * fromUnit.factor) / toUnit.factor;
}

export default function ConversionCalculator() {
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [fromUnit, setFromUnit] = useState(CATEGORIES[0].units[0].value);
  const [toUnit, setToUnit] = useState(CATEGORIES[0].units[1].value);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const units = CATEGORIES.find(c => c.name === category).units;
  const isTemp = category === "Temperature";
  const result = input && !isNaN(input) ? convertValue(Number(input), fromUnit, toUnit, category) : "";

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setFromUnit(CATEGORIES.find(c => c.name === cat).units[0].value);
    setToUnit(CATEGORIES.find(c => c.name === cat).units[1].value);
    setInput("");
    setError("");
  };

  return (
    <div className="conversion-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="conversion-calculator">
            <div className="header">
              <h2>Conversion Calculator</h2>
              <p className="subtitle">Convert between common units (length, weight, temperature, etc.)</p>
            </div>
            <div className="calculator-card">
              <div className="category-row">
                {CATEGORIES.map(c => (
                  <button
                    key={c.name}
                    className={`category-btn${category === c.name ? " active" : ""}`}
                    onClick={() => handleCategoryChange(c.name)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="input-section">
                <input
                  type="number"
                  className="conv-input"
                  placeholder="Enter value"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <select
                  className="unit-select"
                  value={fromUnit}
                  onChange={e => setFromUnit(e.target.value)}
                >
                  {units.map(u => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
                <span className="arrow">→</span>
                <select
                  className="unit-select"
                  value={toUnit}
                  onChange={e => setToUnit(e.target.value)}
                >
                  {units.map(u => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
              {error && <div className="error-message">{error}</div>}
              {result !== "" && !error && (
                <div className="results-section">
                  <div className="results-card conv-results">
                    <h2>
                      <span className="icon">🔄</span>
                      Conversion Result
                    </h2>
                    <div className="conv-result-value">{input} {fromUnit} = {result} {toUnit}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Conversion Calculator</h2>
              <div className="conversion-calculator-description">
                <p>The <strong>Conversion Calculator</strong> helps you convert between common units of length, weight, and temperature. Choose a category and units to get started.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Switch categories for more unit options.
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .conversion-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f9ee 0%, #d2f4e3 100%);
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 0rem;
        }
        .calculator-content {
          flex: 1;
          min-width: 0;
        }
        .ad-placeholder {
          width: 300px;
          height: 250px;
          padding: 1rem;
          background: #f7fafc;
          border: 1px dashed #28A844;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #28A844;
        }
        .mobile-ad {
          display: none;
        }
        .conversion-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: #28A844;
          color: #fff;
          padding: 1.5rem 1rem 1rem 1rem;
        }
        .header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .subtitle {
          font-size: 1.25rem;
          color: #fff;
          max-width: 500px;
          margin: 0 auto;
        }
        .calculator-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          margin-bottom: 2rem;
        }
        .category-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .category-btn {
          background: #e8f9ee;
          color: #28A844;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .category-btn.active, .category-btn:hover {
          background: #28A844;
          color: #fff;
        }
        .input-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .conv-input {
          width: 120px;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
        }
        .unit-select {
          padding: 0.7rem 1rem;
          font-size: 1.1rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
          background: #f7fafc;
        }
        .arrow {
          font-size: 1.5rem;
          color: #28A844;
          margin: 0 0.5rem;
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
        }
        .results-card.conv-results {
          background: #e8f9ee;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 2px solid #28A844;
        }
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #28A844;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .results-card h2 .icon {
          margin-right: 0.5rem;
        }
        .conv-result-value {
          font-size: 1.5rem;
          color: #28A844;
          font-weight: bold;
        }
        .about-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .about-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #28A844;
          margin-bottom: 1rem;
        }
        .about-section p {
          color: #1a1a1a;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .tip {
          background: #e8f9ee;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          color: #28A844;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          .ad-placeholder {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          .main-content-wrapper > .ad-placeholder {
            display: none;
          }
          .mobile-ad {
            display: flex !important;
            width: 100%;
            max-width: 300px;
            margin: 1rem auto;
          }
        }
        @media (max-width: 640px) {
          .header h2 {
            font-size: 2rem;
          }
          .subtitle {
            font-size: 1rem;
          }
          .input-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
          }
        }
      `}</style>
    </div>
  );
} 