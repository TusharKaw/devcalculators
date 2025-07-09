"use client"

import { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState("converter");
  const [lastUpdated, setLastUpdated] = useState("");

  // Light theme color palette
  const themeColors = {
    primary: "#FFFFFF",  // Background
    secondary: "#F5F5F7",  // Cards
    accent: "#2B2E3D",
    lightAccent: "#404457",
    text: "#2B2E3D",  // Dark text
    mutedText: "#5A5D6C",  // Slightly muted dark text
    cardBg: "#FFFFFF",
    inputBg: "#F5F5F7",
    border: "#D8D8DC"
  };

  const currencies = {
    USD: { name: "US Dollar", symbol: "$", color: "#6CC57C" },
    EUR: { name: "Euro", symbol: "€", color: "#3E7BFA" },
    GBP: { name: "British Pound", symbol: "£", color: "#B22222" },
    JPY: { name: "Japanese Yen", symbol: "¥", color: "#BC002D" },
    CAD: { name: "Canadian Dollar", symbol: "C$", color: "#D52B1E" },
    AUD: { name: "Australian Dollar", symbol: "A$", color: "#00843D" },
    CHF: { name: "Swiss Franc", symbol: "CHF", color: "#D52B1E" },
    CNY: { name: "Chinese Yuan", symbol: "¥", color: "#DE2910" },
    INR: { name: "Indian Rupee", symbol: "₹", color: "#FF9933" },
    BRL: { name: "Brazilian Real", symbol: "R$", color: "#009739" },
    MXN: { name: "Mexican Peso", symbol: "$", color: "#006341" },
    KRW: { name: "South Korean Won", symbol: "₩", color: "#003478" },
    RUB: { name: "Russian Ruble", symbol: "₽", color: "#D52B1E" },
    ZAR: { name: "South African Rand", symbol: "R", color: "#007749" },
    SEK: { name: "Swedish Krona", symbol: "kr", color: "#005293" },
    NOK: { name: "Norwegian Krone", symbol: "kr", color: "#EF2B2D" },
    DKK: { name: "Danish Krone", symbol: "kr", color: "#C60C30" },
    PLN: { name: "Polish Złoty", symbol: "zł", color: "#DC143C" },
    CZK: { name: "Czech Koruna", symbol: "Kč", color: "#11457E" },
    HUF: { name: "Hungarian Forint", symbol: "Ft", color: "#436F4D" }
  };

  // Demo rates for when API fails
  const demoRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, BRL: 5.2, MXN: 20.0, KRW: 1150, RUB: 75.0, ZAR: 14.5, SEK: 8.5, NOK: 8.8, DKK: 6.2, PLN: 3.8, CZK: 21.5, HUF: 300 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.5, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59, INR: 87.6, BRL: 6.12, MXN: 23.5, KRW: 1353, RUB: 88.2, ZAR: 17.1, SEK: 10.0, NOK: 10.4, DKK: 7.3, PLN: 4.47, CZK: 25.3, HUF: 353 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150.3, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.83, INR: 101.9, BRL: 7.12, MXN: 27.3, KRW: 1572, RUB: 102.5, ZAR: 19.9, SEK: 11.6, NOK: 12.1, DKK: 8.5, PLN: 5.2, CZK: 29.4, HUF: 410 }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError("");
    try {
      // Using a free API (you might want to use a paid service for production)
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.rates) {
        throw new Error("Invalid data format from API");
      }
      
      setRates(data.rates);
      setLastUpdated(new Date(data.date).toLocaleString());
      convertCurrency();
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch live rates. Using demo data.");
      setRates(demoRates[fromCurrency] || {});
      setLastUpdated(new Date().toLocaleString());
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    if (!amount || !rates[toCurrency]) return;
    
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      const numAmount = parseFloat(amount);
      const rate = rates[toCurrency];
      const converted = numAmount * rate;
      
      setResult({
        amount: numAmount,
        converted: converted,
        rate: rate,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency
      });
    }, 300);
  };

  useEffect(() => {
    if (rates[toCurrency]) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const popularConversions = [
    { from: "USD", to: "EUR", amount: "1" },
    { from: "USD", to: "GBP", amount: "1" },
    { from: "EUR", to: "USD", amount: "1" },
    { from: "GBP", to: "USD", amount: "1" },
    { from: "USD", to: "JPY", amount: "1" },
    { from: "USD", to: "CAD", amount: "100" },
    { from: "USD", to: "AUD", amount: "100" },
    { from: "EUR", to: "GBP", amount: "100" }
  ];

  return (
    <div className="currency-converter-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="currency-converter">
            <div className="header">
              <h2>Currency Converter</h2>
              <p className="subtitle">Convert between world currencies with real-time exchange rates</p>
            </div>

            <div className="calculator-card">
              <div className="input-section">
                <label htmlFor="amount">Enter Amount</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="currency-selectors">
                  <div className="selector">
                    <label htmlFor="fromCurrency">From Currency</label>
                    <select
                      id="fromCurrency"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      style={{ borderColor: currencies[fromCurrency]?.color }}
                    >
                      {Object.entries(currencies).map(([code, info]) => (
                        <option key={code} value={code}>
                          {code} - {info.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="swap-button">
                    <button onClick={swapCurrencies}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="17 1 21 5 17 9"></polyline>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="selector">
                    <label htmlFor="toCurrency">To Currency</label>
                    <select
                      id="toCurrency"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      style={{ borderColor: currencies[toCurrency]?.color }}
                    >
                      {Object.entries(currencies).map(([code, info]) => (
                        <option key={code} value={code}>
                          {code} - {info.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={fetchExchangeRates}
                  disabled={!amount || loading}
                  className={!amount ? 'disabled' : ''}
                >
                  {loading ? 'Updating...' : 'Convert'}
                </button>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <div className="conversion-result">
                      <div className="result-text">
                        {formatCurrency(result.amount, result.fromCurrency)} = {formatCurrency(result.converted, result.toCurrency)}
                      </div>
                      <div className="rate-text">
                        1 {result.fromCurrency} = {result.rate.toFixed(6)} {result.toCurrency}
                      </div>
                    </div>

                    <div className="tabs">
                      <button 
                        className={`tab ${activeTab === 'converter' ? 'active' : ''}`}
                        onClick={() => setActiveTab('converter')}
                      >
                        Converter
                      </button>
                      <button 
                        className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
                        onClick={() => setActiveTab('popular')}
                      >
                        Popular
                      </button>
                      <button 
                        className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => setActiveTab('info')}
                      >
                        Info
                      </button>
                    </div>
                    
                    <div className="tab-content">
                      {activeTab === 'converter' && (
                        <div className="converter-content">
                          <div className="currency-details">
                            <div className="currency-info" style={{ backgroundColor: `${currencies[fromCurrency]?.color}20` }}>
                              <h3>{currencies[fromCurrency]?.name} ({fromCurrency})</h3>
                              <p>Symbol: {currencies[fromCurrency]?.symbol}</p>
                            </div>
                            <div className="currency-info" style={{ backgroundColor: `${currencies[toCurrency]?.color}20` }}>
                              <h3>{currencies[toCurrency]?.name} ({toCurrency})</h3>
                              <p>Symbol: {currencies[toCurrency]?.symbol}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'popular' && (
                        <div className="popular-content">
                          <h3>Popular Conversions</h3>
                          <div className="popular-grid">
                            {popularConversions.map((conv, index) => (
                              <div 
                                key={index} 
                                className="popular-item"
                                onClick={() => {
                                  setFromCurrency(conv.from);
                                  setToCurrency(conv.to);
                                  setAmount(conv.amount);
                                }}
                              >
                                {conv.amount} {conv.from} → {conv.to}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'info' && (
                        <div className="info-content">
                          <div className="info-item">
                            <span>From Symbol:</span>
                            <span>{currencies[fromCurrency]?.symbol}</span>
                          </div>
                          <div className="info-item">
                            <span>To Symbol:</span>
                            <span>{currencies[toCurrency]?.symbol}</span>
                          </div>
                          <div className="info-item">
                            <span>Last Updated:</span>
                            <span>{lastUpdated || "Just now"}</span>
                          </div>
                          <div className="disclaimer">
                            Exchange rates are highly variable. Rates may vary across providers.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Ad Placeholder */}
            <div className="ad-placeholder mobile-ad">
              {/* Replace this with your actual ad component */}
              <span>300x250 Ad Banner</span>
            </div>
            
            <div className="about-section">
              <h2>About Currency Converter</h2>
              <div className="converter-description">
                <p>Our <strong>Currency Converter</strong> helps you convert between major world currencies using real-time exchange rates. Whether you're traveling abroad, making international purchases, or tracking forex markets, our tool provides accurate and up-to-date conversions.</p>

                <p>The converter supports <strong>20+ currencies</strong> including US Dollar, Euro, British Pound, Japanese Yen, and more. The rates are updated regularly to ensure accuracy.</p>

                <p>This tool is perfect for <strong>travelers</strong>, <strong>businesses</strong>, and <strong>investors</strong> who need quick currency conversions. The interface is designed to be simple yet powerful, with features like popular conversion presets and detailed currency information.</p>

                <p>The converter is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works on all devices. For the most accurate trading rates, always check with your bank or exchange as rates may vary slightly between providers.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Bookmark this page for quick access to currency conversions!
              </div>
            </div>
          </div>
        </div>

        <div className="ad-placeholder">
          {/* Replace this with your actual ad component */}
          <span>300x250 Ad Banner</span>
        </div>
      </div>

      <style jsx>{`
        .currency-converter-container {
          min-height: 100vh;
          background: ${themeColors.primary};
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: ${themeColors.text};
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
          background: ${themeColors.secondary};
          border: 1px dashed ${themeColors.border};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${themeColors.mutedText};
        }
        
        .mobile-ad {
          display: none;
        }
        
        .currency-converter {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: #2B2E3D;
          padding: 1.5rem;
          color: white;
        }
        
        .header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
          opacity: 0.9;
          color: white;
        }
        
        .calculator-card {
          background: ${themeColors.cardBg};
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 1rem;
          border-radius: 12px;
          border: 1px solid ${themeColors.border};
        }
        
        .input-section {
          padding: 1.5rem;
        }
        
        .input-section label {
          display: block;
          font-size: 1.125rem;
          font-weight: 500;
          color: ${themeColors.text};
          margin-bottom: 0.75rem;
        }
        
        .input-group {
          display: flex;
          margin-bottom: 1rem;
        }
        
        .input-group input {
          flex: 1;
          min-width: 0;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid ${themeColors.border};
          border-radius: 8px;
          transition: all 0.2s;
          background: ${themeColors.inputBg};
          color: ${themeColors.text};
        }
        
        .input-group input:focus {
          outline: none;
          border-color: ${themeColors.accent};
          box-shadow: 0 0 0 2px ${themeColors.accent}40;
        }
        
        .currency-selectors {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .selector {
          flex: 1;
        }
        
        .swap-button {
          display: flex;
          align-items: flex-end;
          padding-bottom: 1.5rem;
        }
        
        .swap-button button {
          background: ${themeColors.secondary};
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .swap-button button:hover {
          background: ${themeColors.accent};
          color: white;
        }
        
        .swap-button button svg {
          width: 20px;
          height: 20px;
        }
        
        .selector select {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid ${themeColors.border};
          border-radius: 8px;
          transition: all 0.2s;
          background: ${themeColors.inputBg};
          color: ${themeColors.text};
        }
        
        .selector select:focus {
          outline: none;
          border-color: ${themeColors.accent};
          box-shadow: 0 0 0 2px ${themeColors.accent}40;
        }
        
        .input-section button {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: ${themeColors.accent};
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }
        
        .input-section button:hover {
          background: ${themeColors.lightAccent};
        }
        
        .input-section button.disabled {
          background: ${themeColors.accent}80;
          cursor: not-allowed;
        }
        
        .error-message {
          padding: 0.75rem 1.5rem;
          background: #FFF5F5;
          color: #C53030;
          border-left: 4px solid #C53030;
          margin: 0 1.5rem 1.5rem;
          border-radius: 4px;
        }
        
        .results-section {
          padding: 0 1.5rem 1.5rem;
          transition: all 0.3s;
        }
        
        .results-section.animate {
          transform: scale(1.02);
          opacity: 0.9;
        }
        
        .results-card {
          background: ${themeColors.cardBg};
          border-radius: 8px;
          padding: 1.5rem;
          overflow: hidden;
          border: 1px solid ${themeColors.border};
        }
        
        .conversion-result {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .result-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${themeColors.text};
          margin-bottom: 0.5rem;
        }
        
        .rate-text {
          font-size: 1rem;
          opacity: 0.9;
          color: ${themeColors.mutedText};
        }
        
        .tabs {
          display: flex;
          margin-bottom: 1rem;
          border-bottom: 2px solid ${themeColors.border};
        }
        
        .tab {
          flex: 1;
          padding: 0.75rem;
          background: transparent;
          border: none;
          color: ${themeColors.mutedText};
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        
        .tab.active {
          color: ${themeColors.text};
        }
        
        .tab.active:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: ${themeColors.accent};
        }
        
        .tab:hover:not(.active) {
          background: ${themeColors.primary};
        }
        
        .tab-content {
          min-height: 150px;
        }
        
        .currency-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .currency-info {
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid ${themeColors.border};
        }
        
        .currency-info h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: ${themeColors.text};
        }
        
        .currency-info p {
          font-size: 0.9rem;
          color: ${themeColors.mutedText};
        }
        
        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .popular-item {
          background: ${themeColors.primary};
          color: ${themeColors.text};
          padding: 0.75rem;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          transition: all 0.2s;
          cursor: pointer;
          border: 1px solid ${themeColors.border};
        }
        
        .popular-item:hover {
          transform: translateY(-2px);
          background: ${themeColors.accent};
          color: white;
        }
        
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${themeColors.border};
          color: ${themeColors.text};
        }
        
        .disclaimer {
          margin-top: 1rem;
          padding: 0.75rem;
          background: ${themeColors.primary};
          border-radius: 6px;
          font-size: 0.8rem;
          color: ${themeColors.mutedText};
          border: 1px solid ${themeColors.border};
        }
        
        .about-section {
          background: ${themeColors.cardBg};
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid ${themeColors.border};
        }
        
        .about-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${themeColors.text};
          margin-bottom: 1rem;
        }
        
        .about-section p {
          color: ${themeColors.mutedText};
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          background: ${themeColors.accent}20;
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid ${themeColors.accent};
          color: ${themeColors.text};
          font-size: 0.875rem;
        }
        
        .tip span {
          margin-right: 0.5rem;
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
          
          /* Hide desktop ad on mobile */
          .main-content-wrapper > .ad-placeholder {
            display: none;
          }
          
          /* Show mobile ad */
          .mobile-ad {
            display: flex !important;
            width: 100%;
            max-width: 300px;
            margin: 1rem auto;
          }
        }
        
        @media (max-width: 640px) {
          .header h2 {
            font-size: 1.75rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .currency-selectors {
            flex-direction: column;
          }
          
          .swap-button {
            padding: 0.5rem 0;
            justify-content: center;
          }
          
          .tabs {
            flex-direction: column;
            border-bottom: none;
          }
          
          .tab {
            border-bottom: 1px solid ${themeColors.border};
          }
          
          .tab.active:after {
            display: none;
          }
          
          .currency-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CurrencyConverter;