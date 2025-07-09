"use client"

import { useState, useEffect, useRef } from "react";

const SEX_OPTIONS = ["Male", "Female", "Other"];
const OUTLOOK_OPTIONS = ["Optimistic", "Average", "Pessimistic"];
const ALCOHOL_OPTIONS = ["None", "Moderate", "Heavy"];
const COUNTRY_OPTIONS = ["USA", "UK", "India", "Australia", "Canada", "Other"];
const BMI_OPTIONS = ["Under 25", "25-30", "30-35", "35+"];

function estimateDeath({ birthdate, sex, smoke, bmi, outlook, alcohol, country, fitness }) {
  // Simple mock logic for demonstration
  if (!birthdate || !sex || !bmi || !country) return null;
  const birth = new Date(birthdate);
  if (isNaN(birth.getTime())) return null;
  let baseAge = 80;
  if (sex === "Male") baseAge -= 3;
  if (sex === "Other") baseAge -= 1;
  if (smoke) baseAge -= 8;
  if (bmi === "25-30") baseAge -= 2;
  if (bmi === "30-35") baseAge -= 5;
  if (bmi === "35+") baseAge -= 10;
  if (outlook === "Optimistic") baseAge += 2;
  if (outlook === "Pessimistic") baseAge -= 2;
  if (alcohol === "Heavy") baseAge -= 4;
  if (country === "India") baseAge -= 2;
  if (country === "Other") baseAge -= 1;
  if (fitness) baseAge += 2;
  // Clamp
  if (baseAge < 40) baseAge = 40;
  if (baseAge > 100) baseAge = 100;
  const deathDate = new Date(birth);
  deathDate.setFullYear(deathDate.getFullYear() + baseAge);
  // Cause of death (mock)
  let cause = "Natural Causes";
  if (smoke) cause = "Smoking-related illness";
  else if (bmi === "35+") cause = "Obesity-related illness";
  else if (alcohol === "Heavy") cause = "Alcohol-related illness";
  return { deathDate, cause };
}

function getSecondsLeft(deathDate) {
  const now = new Date();
  return Math.max(0, Math.floor((deathDate - now) / 1000));
}

export default function DeathCalculator() {
  const [inputs, setInputs] = useState({
    birthdate: "",
    sex: "",
    smoke: false,
    bmi: "",
    outlook: "",
    alcohol: "",
    country: "",
    fitness: false,
  });
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const intervalRef = useRef();
  const [animate, setAnimate] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      const res = estimateDeath(inputs);
      setResult(res);
      if (res && res.deathDate) {
        setSecondsLeft(getSecondsLeft(res.deathDate));
      } else {
        setSecondsLeft(null);
      }
    }, 300);
  };

  useEffect(() => {
    if (result && result.deathDate) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(getSecondsLeft(result.deathDate));
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
    return () => {};
  }, [result]);

  return (
    <div className="age-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="age-calculator">
            <div className="header">
              <h2>Death Calculator</h2>
              <p className="subtitle">Estimate your death date and see a live countdown</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <label>Date of Birth*</label>
                <div className="input-group">
                  <input
                    type="date"
                    name="birthdate"
                    value={inputs.birthdate}
                    onChange={handleChange}
                  />
                </div>
                <label>Sex*</label>
                <div className="input-group">
                  <select name="sex" value={inputs.sex} onChange={handleChange}>
                    <option value="">Choose</option>
                    {SEX_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <label>Do you smoke?</label>
                <div className="input-group">
                  <input
                    type="checkbox"
                    name="smoke"
                    checked={inputs.smoke}
                    onChange={handleChange}
                  /> Yes!
                </div>
                <label>BMI*</label>
                <div className="input-group">
                  <select name="bmi" value={inputs.bmi} onChange={handleChange}>
                    <option value="">Choose</option>
                    {BMI_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <label>Outlook</label>
                <div className="input-group">
                  <select name="outlook" value={inputs.outlook} onChange={handleChange}>
                    <option value="">Choose...</option>
                    {OUTLOOK_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <label>Alcohol Consumption</label>
                <div className="input-group">
                  <select name="alcohol" value={inputs.alcohol} onChange={handleChange}>
                    <option value="">Choose...</option>
                    {ALCOHOL_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <label>Country*</label>
                <div className="input-group">
                  <select name="country" value={inputs.country} onChange={handleChange}>
                    <option value="">Choose...</option>
                    {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <label>Include fitness & diet?</label>
                <div className="input-group">
                  <input
                    type="checkbox"
                    name="fitness"
                    checked={inputs.fitness}
                    onChange={handleChange}
                  />
                </div>
                <button
                  onClick={calculate}
                  disabled={!(inputs.birthdate && inputs.sex && inputs.bmi && inputs.country)}
                  className={!(inputs.birthdate && inputs.sex && inputs.bmi && inputs.country) ? 'disabled' : ''}
                >
                  Calculate
                </button>
              </div>
              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <h2>
                      <span className="icon">💀</span>
                      Your Death Date
                    </h2>
                    <div className="results-grid">
                      <div className="result-box">
                        <p>
                          <span className="highlight">{result.deathDate.toDateString()}</span>
                        </p>
                        <p style={{fontSize:'1.2em', color:'#c00'}}>
                          {secondsLeft !== null ? `${secondsLeft.toLocaleString()} seconds left` : ""}
                        </p>
                        <p style={{fontWeight:'bold', color:'#444'}}>Cause: {result.cause}</p>
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
              <h2>About Death Calculator</h2>
              <div className="age-calculator-description">
                <p>This <strong>death calculator</strong> estimates your expected date of death based on lifestyle, BMI, and other factors. The result is a fun, not scientific, prediction and should not be taken seriously.</p>
                <p>Factors like <strong>smoking, alcohol, BMI, and country</strong> are considered. The countdown shows your remaining seconds (for fun!).</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Stay healthy for a longer, happier life!
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .age-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
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
          border: 1px dashed #cbd5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
        }
        .mobile-ad {
          display: none;
        }
        .age-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        .header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color:rgb(255, 255, 255);
          margin-bottom: 0.5rem;
        }
        .subtitle {
          font-size: 1.25rem;
          color:rgb(196, 196, 196);
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
        .input-section label {
          font-weight: 500;
          margin-top: 1rem;
          display: block;
          color: #2d3748;
        }
        .input-group {
          margin-bottom: 1rem;
          display: flex;
          gap: 0.75rem;
        }
        .input-group input[type="date"],
        .input-group select {
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #cbd5e0;
          width: 100%;
          font-size: 1rem;
          color: #1a1a1a;
        }
        .input-group input[type="checkbox"] {
          margin-right: 0.5rem;
        }
        button {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        button.disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
        .results-section {
          margin-top: 2rem;
          transition: opacity 0.3s;
        }
        .results-section.animate {
          opacity: 0.5;
        }
        .results-card {
          background: #f0f4ff;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        .results-card h2 .icon {
          margin-right: 0.5rem;
        }
        .results-grid {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        .result-box {
          background: #fff;
          border-radius: 8px;
          padding: 1rem 2rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .result-box p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0;
          color: #1a1a1a;
        }
        .highlight {
          font-size: 2rem;
          color: #2563eb;
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
          color: #2d3748;
          margin-bottom: 1rem;
        }
        .about-section p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .tip {
          background: #f0f4ff;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          color: #2563eb;
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
          .input-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          .input-group input {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .input-group button {
            width: 100%;
          }
          .results-grid {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
