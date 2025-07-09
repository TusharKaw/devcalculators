"use client";

import { useState } from "react";

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("hourly");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  const calculate = () => {
    const a = parseFloat(amount);
    if (!a) {
      setError("Please enter a valid amount.");
      setResult(null);
      return;
    }
    let hourly, monthly, yearly;
    if (period === "hourly") {
      hourly = a;
      yearly = a * 40 * 52;
      monthly = yearly / 12;
    } else if (period === "monthly") {
      monthly = a;
      yearly = a * 12;
      hourly = yearly / (40 * 52);
    } else {
      yearly = a;
      monthly = a / 12;
      hourly = a / (40 * 52);
    }
    setError("");
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setResult({ hourly: hourly.toFixed(2), monthly: monthly.toFixed(2), yearly: yearly.toFixed(2) });
    }, 300);
  };

  return (
    <div className="salary-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="salary-calculator">
            <div className="header">
              <h2>Salary Calculator</h2>
              <p className="subtitle">Convert your salary between hourly, monthly, and yearly rates</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <div className="input-group">
                  <div className="input-field">
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="0" />
                  </div>
                  <div className="input-field">
                    <label>Period</label>
                    <select value={period} onChange={e => setPeriod(e.target.value)}>
                      <option value="hourly">Hourly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <button onClick={calculate} className="calc-btn">Calculate</button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result && !error && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card salary-results">
                    <h2>
                      <span className="icon">💵</span>
                      Salary Breakdown
                    </h2>
                    <div className="salary-grid">
                      <div className="salary-box">
                        <div className="salary-label">Hourly</div>
                        <div className="salary-value">${result.hourly}</div>
                      </div>
                      <div className="salary-box">
                        <div className="salary-label">Monthly</div>
                        <div className="salary-value">${result.monthly}</div>
                      </div>
                      <div className="salary-box">
                        <div className="salary-label">Yearly</div>
                        <div className="salary-value">${result.yearly}</div>
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
              <h2>About Salary Calculator</h2>
              <div className="salary-calculator-description">
                <p>The <strong>Salary Calculator</strong> converts your salary between hourly, monthly, and yearly rates. Useful for job offers, budgeting, and more.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Use this tool to compare job offers and plan your finances!
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .salary-calculator-container {
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
        .salary-calculator {
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
        .input-section label {
          font-weight: 500;
          margin-top: 1rem;
          display: block;
          color: #28A844;
        }
        .input-group {
          margin-bottom: 1rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .input-field {
          flex: 1;
          min-width: 120px;
        }
        .input-field input[type="number"],
        .input-field select {
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #cbd5e0;
          width: 100%;
          font-size: 1rem;
          color: #1a1a1a;
        }
        .calc-btn {
          background: #28A844;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.7rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .calc-btn:hover {
          background: #21913a;
          transform: translateY(-2px) scale(1.03);
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
          transition: opacity 0.3s;
        }
        .results-section.animate {
          opacity: 0.5;
        }
        .results-card.salary-results {
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
        .salary-grid {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .salary-box {
          background: #fff;
          border-radius: 8px;
          padding: 1rem 2rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          font-size: 1.3rem;
          color: #28A844;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 120px;
          transition: transform 0.2s;
        }
        .salary-box:hover {
          background: #e8f9ee;
          transform: scale(1.05);
        }
        .salary-label {
          font-size: 1rem;
          color: #28A844;
          margin-bottom: 0.5rem;
        }
        .salary-value {
          font-size: 1.7rem;
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
          .input-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          .input-field input {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .calc-btn {
            width: 100%;
          }
          .salary-grid {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 