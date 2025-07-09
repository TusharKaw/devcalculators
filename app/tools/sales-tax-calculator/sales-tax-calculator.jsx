"use client";

import { useState } from "react";

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(rate) / 100;
    if (!p || !r) {
      setError("Please enter valid price and tax rate.");
      setResult(null);
      return;
    }
    setError("");
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      const tax = p * r;
      const total = p + tax;
      setResult({ tax: tax.toFixed(2), total: total.toFixed(2) });
    }, 300);
  };

  return (
    <div className="sales-tax-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="sales-tax-calculator">
            <div className="header">
              <h2>Sales Tax Calculator</h2>
              <p className="subtitle">Calculate sales tax and total price</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <div className="input-group">
                  <div className="input-field">
                    <label>Price ($)</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" />
                  </div>
                  <div className="input-field">
                    <label>Tax Rate (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" />
                  </div>
                  <button onClick={calculate} className="calc-btn">Calculate</button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result && !error && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card sales-results">
                    <h2>
                      <span className="icon">🧾</span>
                      Sales Tax Breakdown
                    </h2>
                    <div className="sales-grid">
                      <div className="sales-box">
                        <div className="sales-label">Tax</div>
                        <div className="sales-value">${result.tax}</div>
                      </div>
                      <div className="sales-box">
                        <div className="sales-label">Total Price</div>
                        <div className="sales-value">${result.total}</div>
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
              <h2>About Sales Tax Calculator</h2>
              <div className="sales-tax-calculator-description">
                <p>The <strong>Sales Tax Calculator</strong> helps you find the tax amount and total price for a given price and tax rate. Useful for shopping, business, and accounting.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Use this tool to quickly calculate your total bill!
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .sales-tax-calculator-container {
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
        .sales-tax-calculator {
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
        .input-field input[type="number"] {
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
        .results-card.sales-results {
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
        .sales-grid {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .sales-box {
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
        .sales-box:hover {
          background: #e8f9ee;
          transform: scale(1.05);
        }
        .sales-label {
          font-size: 1rem;
          color: #28A844;
          margin-bottom: 0.5rem;
        }
        .sales-value {
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
          .sales-grid {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 