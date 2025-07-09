"use client";

import { useState } from "react";

function parseCIDR(cidr) {
  const [ip, mask] = cidr.split("/");
  if (!ip || isNaN(mask)) return null;
  const octets = ip.split(".").map(Number);
  if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) return null;
  const maskNum = parseInt(mask, 10);
  if (maskNum < 0 || maskNum > 32) return null;
  const ipNum = octets.reduce((acc, o) => (acc << 8) + o, 0);
  const netmask = maskNum === 0 ? 0 : (~0 << (32 - maskNum)) >>> 0;
  const network = ipNum & netmask;
  const broadcast = network | (~netmask >>> 0);
  const firstHost = maskNum === 32 ? network : network + 1;
  const lastHost = maskNum === 32 ? network : broadcast - 1;
  const hosts = maskNum >= 31 ? 0 : lastHost - firstHost + 1;
  return {
    ip,
    mask: maskNum,
    network: [network >>> 24, (network >> 16) & 255, (network >> 8) & 255, network & 255].join('.'),
    broadcast: [broadcast >>> 24, (broadcast >> 16) & 255, (broadcast >> 8) & 255, broadcast & 255].join('.'),
    firstHost: [firstHost >>> 24, (firstHost >> 16) & 255, (firstHost >> 8) & 255, firstHost & 255].join('.'),
    lastHost: [lastHost >>> 24, (lastHost >> 16) & 255, (lastHost >> 8) & 255, lastHost & 255].join('.'),
    hosts,
  };
}

export default function SubnetCalculator() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const res = parseCIDR(input.trim());
    if (!res) {
      setError("Please enter a valid IPv4 CIDR (e.g., 192.168.1.0/24)");
      setResult(null);
      return;
    }
    setError("");
    setResult(res);
  };

  return (
    <div className="subnet-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="subnet-calculator">
            <div className="header">
              <h2>Subnet Calculator</h2>
              <p className="subtitle">Calculate network, broadcast, and host ranges for IPv4 subnets</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <input
                  type="text"
                  className="subnet-input"
                  placeholder="Enter IPv4 CIDR (e.g., 192.168.1.0/24)"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button className="calc-btn" onClick={handleCalculate}>Calculate</button>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result && !error && (
                <div className="results-section">
                  <div className="results-card subnet-results">
                    <h2>
                      <span className="icon">🌐</span>
                      Subnet Details
                    </h2>
                    <ul className="subnet-details-list">
                      <li><strong>Network Address:</strong> {result.network}</li>
                      <li><strong>Broadcast Address:</strong> {result.broadcast}</li>
                      <li><strong>First Host:</strong> {result.firstHost}</li>
                      <li><strong>Last Host:</strong> {result.lastHost}</li>
                      <li><strong>Usable Hosts:</strong> {result.hosts}</li>
                    </ul>
                  </div>
                  <div className="subnet-visual-section">
                    <h3>Subnet Visualization</h3>
                    <div className="subnet-bar-visual">
                      <div className="subnet-bar network"></div>
                      <div className="subnet-bar hosts"></div>
                      <div className="subnet-bar broadcast"></div>
                    </div>
                    <div className="subnet-bar-labels">
                      <span>Network</span>
                      <span>Hosts</span>
                      <span>Broadcast</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Subnet Calculator</h2>
              <div className="subnet-calculator-description">
                <p>The <strong>Subnet Calculator</strong> helps you find network, broadcast, and host ranges for any IPv4 subnet. Enter a CIDR and get instant results and a visual summary.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: CIDR notation is like 192.168.1.0/24
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .subnet-calculator-container {
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
        .subnet-calculator {
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
        }
        .subnet-input {
          width: 100%;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }
        .calc-btn {
          background: #28A844;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .calc-btn:hover {
          background: #21913a;
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
        }
        .results-card.subnet-results {
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
        .subnet-details-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        .subnet-details-list li {
          font-size: 1.1rem;
          color: #1a1a1a;
          margin-bottom: 0.3rem;
        }
        .subnet-visual-section {
          margin-top: 1.5rem;
          background: #f7fafc;
          border-radius: 8px;
          padding: 1rem;
        }
        .subnet-visual-section h3 {
          color: #28A844;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .subnet-bar-visual {
          display: flex;
          height: 32px;
          margin-bottom: 0.5rem;
        }
        .subnet-bar {
          height: 100%;
          border-radius: 4px;
        }
        .subnet-bar.network {
          background: #28A844;
          width: 15%;
        }
        .subnet-bar.hosts {
          background: #a7f3d0;
          width: 70%;
        }
        .subnet-bar.broadcast {
          background: #21913a;
          width: 15%;
        }
        .subnet-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
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
        }
      `}</style>
    </div>
  );
} 