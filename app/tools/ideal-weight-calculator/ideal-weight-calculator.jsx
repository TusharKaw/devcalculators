"use client";

import { useState } from "react";

function calcIdealWeight(heightCm, gender) {
  // Devine formula
  if (!heightCm || isNaN(heightCm)) return null;
  const heightIn = heightCm / 2.54;
  const base = gender === "male" ? 50 : 45.5;
  const extra = Math.max(0, heightIn - 60) * 2.3;
  return (base + extra).toFixed(1);
}

function getRange(heightCm, gender) {
  // Range: -10% to +10% of ideal
  const ideal = Number(calcIdealWeight(heightCm, gender));
  if (!ideal) return null;
  return [
    (ideal * 0.9).toFixed(1),
    (ideal * 1.1).toFixed(1)
  ];
}

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");

  const ideal = calcIdealWeight(height, gender);
  const range = getRange(height, gender);

  return (
    <div className="ideal-weight-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="ideal-weight-calculator">
            <div className="header">
              <h2>Ideal Weight Calculator</h2>
              <p className="subtitle">Estimate your ideal weight range based on height and gender</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <label>
                  Height (cm):
                  <input
                    type="number"
                    className="height-input"
                    min="100"
                    max="250"
                    value={height}
                    onChange={e => setHeight(Number(e.target.value))}
                  />
                </label>
                <label>
                  Gender:
                  <select
                    className="gender-select"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                {error && <div className="error-message">{error}</div>}
              </div>
              {ideal && !error && (
                <div className="results-section">
                  <div className="results-card ideal-weight-results">
                    <h2>
                      <span className="icon">⚖️</span>
                      Ideal Weight
                    </h2>
                    <div className="ideal-weight-result-value">{ideal} kg</div>
                    <div className="ideal-weight-range">Range: {range[0]} – {range[1]} kg</div>
                  </div>
                  <div className="bar-chart-section">
                    <h3>Ideal Weight Range</h3>
                    <div className="bar-chart">
                      <div className="bar-wrapper">
                        <div
                          className="bar"
                          style={{ height: "100%", background: '#28A844', width: '60px' }}
                          title={`Ideal: ${ideal} kg`}
                        ></div>
                        <span className="bar-label">{ideal} kg</span>
                      </div>
                      <div className="bar-wrapper">
                        <div
                          className="bar"
                          style={{ height: "80%", background: '#a7f3d0', width: '60px' }}
                          title={`Low: ${range[0]} kg`}
                        ></div>
                        <span className="bar-label">{range[0]} kg</span>
                      </div>
                      <div className="bar-wrapper">
                        <div
                          className="bar"
                          style={{ height: "80%", background: '#a7f3d0', width: '60px' }}
                          title={`High: ${range[1]} kg`}
                        ></div>
                        <span className="bar-label">{range[1]} kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Ideal Weight Calculator</h2>
              <div className="ideal-weight-calculator-description">
                <p>The <strong>Ideal Weight Calculator</strong> estimates your ideal weight and healthy range based on height and gender, using the Devine formula. Enter your height and gender to see your results and a visual range.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: This is a guideline; individual healthy weights may vary.
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .ideal-weight-calculator-container {
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
        .ideal-weight-calculator {
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
        .input-section {
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .height-input {
          width: 100px;
          padding: 0.7rem 1rem;
          font-size: 1.1rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
          margin-left: 0.5rem;
        }
        .gender-select {
          margin-left: 0.5rem;
          padding: 0.7rem 1rem;
          font-size: 1.1rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
        }
        .results-card.ideal-weight-results {
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
        .ideal-weight-result-value {
          font-size: 2rem;
          color: #28A844;
          font-weight: bold;
        }
        .ideal-weight-range {
          font-size: 1.1rem;
          color: #1a1a1a;
          margin-top: 0.5rem;
        }
        .bar-chart-section {
          margin-top: 1.5rem;
          background: #f7fafc;
          border-radius: 8px;
          padding: 1rem;
        }
        .bar-chart-section h3 {
          color: #28A844;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 1.5rem;
          height: 120px;
          margin-top: 0.5rem;
        }
        .bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 60px;
        }
        .bar {
          width: 100%;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s;
        }
        .bar-label {
          font-size: 0.9rem;
          color: #1a1a1a;
          margin-top: 0.2rem;
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
            gap: 0.3rem;
          }
          .bar-chart {
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
} 