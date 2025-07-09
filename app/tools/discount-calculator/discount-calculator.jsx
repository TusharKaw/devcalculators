"use client";

import { useState } from "react";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");

  let finalPrice = "";
  let amountSaved = "";
  if (price && discount && !isNaN(price) && !isNaN(discount)) {
    amountSaved = (Number(price) * Number(discount) / 100).toFixed(2);
    finalPrice = (Number(price) - amountSaved).toFixed(2);
  }

  return (
    <div className="discount-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="discount-calculator">
            <div className="header">
              <h2>Discount Calculator</h2>
              <p className="subtitle">Calculate your savings and final price after discount</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <input
                  type="number"
                  className="price-input"
                  placeholder="Original Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  min="0"
                />
                <input
                  type="number"
                  className="discount-input"
                  placeholder="Discount %"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  min="0"
                  max="100"
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              {finalPrice && !error && (
                <div className="results-section">
                  <div className="results-card discount-results">
                    <h2>
                      <span className="icon">💸</span>
                      Savings Summary
                    </h2>
                    <div className="discount-summary">
                      <div><strong>Original Price:</strong> ${Number(price).toFixed(2)}</div>
                      <div><strong>Discount:</strong> {discount}%</div>
                      <div><strong>Amount Saved:</strong> ${amountSaved}</div>
                      <div><strong>Final Price:</strong> <span className="final-price">${finalPrice}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Discount Calculator</h2>
              <div className="discount-calculator-description">
                <p>The <strong>Discount Calculator</strong> helps you quickly find the final price and your savings after applying a discount. Enter the original price and discount percentage to get started.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: You can use this for sales, shopping, and more!
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .discount-calculator-container {
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
        .discount-calculator {
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
        }
        .price-input, .discount-input {
          width: 160px;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
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
        .results-card.discount-results {
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
        .discount-summary {
          font-size: 1.1rem;
          color: #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: center;
        }
        .final-price {
          color: #28A844;
          font-weight: bold;
          font-size: 1.2rem;
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
        }
      `}</style>
    </div>
  );
} 