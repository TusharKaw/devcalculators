"use client";

import { useState } from "react";

const COUNTRIES = [
  { name: "United States", area: 9833520 },
  { name: "Canada", area: 9984670 },
  { name: "China", area: 9596961 },
  { name: "India", area: 3287263 },
  { name: "Brazil", area: 8515767 },
  { name: "Australia", area: 7692024 },
  { name: "Russia", area: 17098242 },
  { name: "United Kingdom", area: 243610 },
  { name: "France", area: 551695 },
  { name: "Germany", area: 357022 },
  { name: "Japan", area: 377975 },
  { name: "South Africa", area: 1219090 },
  { name: "Argentina", area: 2780400 },
  { name: "Mexico", area: 1964375 },
  { name: "Saudi Arabia", area: 2149690 },
];

export default function CountrySizeComparison() {
  const [country1, setCountry1] = useState(COUNTRIES[0].name);
  const [country2, setCountry2] = useState(COUNTRIES[1].name);
  const c1 = COUNTRIES.find(c => c.name === country1);
  const c2 = COUNTRIES.find(c => c.name === country2);
  const maxArea = Math.max(c1.area, c2.area);
  return (
    <div className="country-size-comparison-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="country-size-comparison">
            <div className="header">
              <h2>Country Size Comparison</h2>
              <p className="subtitle">Compare the land area of two countries visually</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <label>
                  Country 1:
                  <select value={country1} onChange={e => setCountry1(e.target.value)} className="country-select">
                    {COUNTRIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Country 2:
                  <select value={country2} onChange={e => setCountry2(e.target.value)} className="country-select">
                    {COUNTRIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="results-section">
                <div className="results-card country-results">
                  <h2>
                    <span className="icon">🌍</span>
                    Area Comparison
                  </h2>
                  <div className="country-bars">
                    <div className="country-bar-wrapper">
                      <div className="country-bar" style={{ width: `${(c1.area / maxArea) * 100}%`, background: '#28A844' }}></div>
                      <span className="country-label">{c1.name} ({c1.area.toLocaleString()} km²)</span>
                    </div>
                    <div className="country-bar-wrapper">
                      <div className="country-bar" style={{ width: `${(c2.area / maxArea) * 100}%`, background: '#21913a' }}></div>
                      <span className="country-label">{c2.name} ({c2.area.toLocaleString()} km²)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Country Size Comparison</h2>
              <div className="country-size-comparison-description">
                <p>The <strong>Country Size Comparison</strong> tool lets you visually compare the land area of two countries. Select any two countries to see how their sizes stack up.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: The bars are proportional to each country's area.
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .country-size-comparison-container {
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
        .country-size-comparison {
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
        .country-select {
          margin-left: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #cbd5e0;
          font-size: 1rem;
          color: #1a1a1a;
        }
        .results-section {
          margin-top: 2rem;
        }
        .results-card.country-results {
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
        .country-bars {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .country-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .country-bar {
          height: 32px;
          border-radius: 8px;
          transition: width 0.3s;
        }
        .country-label {
          font-size: 1.1rem;
          color: #1a1a1a;
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