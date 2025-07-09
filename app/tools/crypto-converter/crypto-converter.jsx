"use client"

import { useState, useEffect } from "react";

const CryptoConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState("converter");
  const [lastUpdated, setLastUpdated] = useState("");

  // Light theme color palette (reversed from original)
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

  const cryptocurrencies = {
    BTC: { name: "Bitcoin", symbol: "₿", color: "#F7931A" },
    ETH: { name: "Ethereum", symbol: "Ξ", color: "#627EEA" },
    USDT: { name: "Tether", symbol: "₮", color: "#26A17B" },
    BNB: { name: "BNB", symbol: "BNB", color: "#F3BA2F" },
    SOL: { name: "Solana", symbol: "◎", color: "#00FFA3" },
    ADA: { name: "Cardano", symbol: "₳", color: "#0033AD" },
    XRP: { name: "Ripple", symbol: "XRP", color: "#27A2DB" },
    DOT: { name: "Polkadot", symbol: "DOT", color: "#E6007A" },
    DOGE: { name: "Dogecoin", symbol: "Ð", color: "#CBAE5B" },
    AVAX: { name: "Avalanche", symbol: "AVAX", color: "#E84142" },
    MATIC: { name: "Polygon", symbol: "MATIC", color: "#8247E5" },
    LINK: { name: "Chainlink", symbol: "LINK", color: "#2A5ADA" },
    UNI: { name: "Uniswap", symbol: "UNI", color: "#FF007A" },
    LTC: { name: "Litecoin", symbol: "Ł", color: "#345D9D" },
    BCH: { name: "Bitcoin Cash", symbol: "BCH", color: "#0AC18E" }
  };

  const fiatCurrencies = {
    USD: { name: "US Dollar", symbol: "$", color: "#6CC57C" },
    EUR: { name: "Euro", symbol: "€", color: "#3E7BFA" },
    GBP: { name: "British Pound", symbol: "£", color: "#B22222" },
    JPY: { name: "Japanese Yen", symbol: "¥", color: "#BC002D" },
    CAD: { name: "Canadian Dollar", symbol: "C$", color: "#D52B1E" },
    AUD: { name: "Australian Dollar", symbol: "A$", color: "#00843D" },
    CHF: { name: "Swiss Franc", symbol: "CHF", color: "#D52B1E" },
    CNY: { name: "Chinese Yuan", symbol: "¥", color: "#DE2910" },
    INR: { name: "Indian Rupee", symbol: "₹", color: "#FF9933" },
    BRL: { name: "Brazilian Real", symbol: "R$", color: "#009739" }
  };

  // Demo rates for when API fails
  const demoRates = {
    USD: { BTC: 45000, ETH: 3000, USDT: 1, BNB: 400, SOL: 100, ADA: 0.5, XRP: 0.8, DOT: 20, DOGE: 0.15, AVAX: 80, MATIC: 1.5, LINK: 15, UNI: 25, LTC: 150, BCH: 300 },
    EUR: { BTC: 38000, ETH: 2500, USDT: 0.85, BNB: 340, SOL: 85, ADA: 0.42, XRP: 0.68, DOT: 17, DOGE: 0.13, AVAX: 68, MATIC: 1.28, LINK: 12.75, UNI: 21.25, LTC: 127.5, BCH: 255 },
    GBP: { BTC: 33000, ETH: 2200, USDT: 0.73, BNB: 292, SOL: 73, ADA: 0.36, XRP: 0.58, DOT: 14.6, DOGE: 0.11, AVAX: 58.4, MATIC: 1.1, LINK: 10.95, UNI: 18.25, LTC: 109.5, BCH: 219 }
  };

  useEffect(() => {
    fetchCryptoRates();
  }, []);

  const fetchCryptoRates = async () => {
    setLoading(true);
    setError("");
    try {
      const coinGeckoId = getCoinGeckoId(fromCrypto);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=${toCurrency.toLowerCase()}&include_last_updated_at=true`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data[coinGeckoId] || !data[coinGeckoId][toCurrency.toLowerCase()]) {
        throw new Error("Invalid data format from API");
      }
      
      const rate = data[coinGeckoId][toCurrency.toLowerCase()];
      const timestamp = data[coinGeckoId].last_updated_at;
      
      setRates({ [toCurrency]: rate });
      setLastUpdated(new Date(timestamp * 1000).toLocaleString());
      convertCrypto();
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch live rates. Using demo data.");
      setRates({ [toCurrency]: demoRates[toCurrency]?.[fromCrypto] || 1 });
      setLastUpdated(new Date().toLocaleString());
    } finally {
      setLoading(false);
    }
  };

  const getCoinGeckoId = (symbol) => {
    const mapping = {
      BTC: "bitcoin",
      ETH: "ethereum",
      USDT: "tether",
      BNB: "binancecoin",
      SOL: "solana",
      ADA: "cardano",
      XRP: "ripple",
      DOT: "polkadot",
      DOGE: "dogecoin",
      AVAX: "avalanche-2",
      MATIC: "matic-network",
      LINK: "chainlink",
      UNI: "uniswap",
      LTC: "litecoin",
      BCH: "bitcoin-cash"
    };
    return mapping[symbol] || "bitcoin";
  };

  const convertCrypto = () => {
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
        fromCrypto: fromCrypto,
        toCurrency: toCurrency
      });
    }, 300);
  };

  useEffect(() => {
    if (rates[toCurrency]) {
      convertCrypto();
    }
  }, [amount, fromCrypto, toCurrency, rates]);

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatCrypto = (value, crypto) => {
    const decimals = value < 0.01 ? 8 : value < 1 ? 4 : 2;
    return `${parseFloat(value).toFixed(decimals)} ${crypto}`;
  };

  const popularConversions = [
    { from: "BTC", to: "USD", amount: "1" },
    { from: "ETH", to: "USD", amount: "1" },
    { from: "BTC", to: "EUR", amount: "1" },
    { from: "SOL", to: "USD", amount: "10" },
    { from: "ADA", to: "USD", amount: "1000" },
    { from: "DOGE", to: "USD", amount: "10000" }
  ];

  return (
    <div className="crypto-converter-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="crypto-converter">
            <div className="header">
              <h2>Crypto Converter</h2>
              <p className="subtitle">Convert between cryptocurrencies and fiat currencies with real-time rates</p>
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
                    step="0.00000001"
                  />
                </div>

                <div className="currency-selectors">
                  <div className="selector">
                    <label htmlFor="fromCrypto">From Cryptocurrency</label>
                    <select
                      id="fromCrypto"
                      value={fromCrypto}
                      onChange={(e) => setFromCrypto(e.target.value)}
                      style={{ borderColor: cryptocurrencies[fromCrypto]?.color }}
                    >
                      {Object.entries(cryptocurrencies).map(([code, info]) => (
                        <option key={code} value={code}>
                          {code} - {info.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="selector">
                    <label htmlFor="toCurrency">To Currency</label>
                    <select
                      id="toCurrency"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      style={{ borderColor: fiatCurrencies[toCurrency]?.color }}
                    >
                      {Object.entries(fiatCurrencies).map(([code, info]) => (
                        <option key={code} value={code}>
                          {code} - {info.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={fetchCryptoRates}
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
                        {formatCrypto(result.amount, result.fromCrypto)} = {formatCurrency(result.converted, result.toCurrency)}
                      </div>
                      <div className="rate-text">
                        1 {result.fromCrypto} = {formatCurrency(result.rate, result.toCurrency)}
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
                            <div className="currency-info" style={{ backgroundColor: `${cryptocurrencies[fromCrypto]?.color}20` }}>
                              <h3>{cryptocurrencies[fromCrypto]?.name} ({fromCrypto})</h3>
                              <p>Symbol: {cryptocurrencies[fromCrypto]?.symbol}</p>
                            </div>
                            <div className="currency-info" style={{ backgroundColor: `${fiatCurrencies[toCurrency]?.color}20` }}>
                              <h3>{fiatCurrencies[toCurrency]?.name} ({toCurrency})</h3>
                              <p>Symbol: {fiatCurrencies[toCurrency]?.symbol}</p>
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
                                  setFromCrypto(conv.from);
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
                            <span>Crypto Symbol:</span>
                            <span>{cryptocurrencies[fromCrypto]?.symbol}</span>
                          </div>
                          <div className="info-item">
                            <span>Currency Symbol:</span>
                            <span>{fiatCurrencies[toCurrency]?.symbol}</span>
                          </div>
                          <div className="info-item">
                            <span>Last Updated:</span>
                            <span>{lastUpdated || "Just now"}</span>
                          </div>
                          <div className="disclaimer">
                            Crypto prices are highly volatile. Rates may vary across exchanges.
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
              <h2>About Crypto Converter</h2>
              <div className="converter-description">
                <p>Our <strong>Crypto Converter</strong> helps you convert between major cryptocurrencies and fiat currencies using real-time exchange rates from CoinGecko API. Whether you're tracking your portfolio, planning investments, or just curious about crypto values, our tool provides accurate and up-to-date conversions.</p>

                <p>The converter supports <strong>15+ cryptocurrencies</strong> including Bitcoin, Ethereum, Solana, and more, along with <strong>10+ fiat currencies</strong> like USD, EUR, GBP, and JPY. The rates are updated regularly to ensure accuracy.</p>

                <p>This tool is perfect for <strong>crypto investors</strong>, <strong>traders</strong>, and <strong>enthusiasts</strong> who need quick conversions. The interface is designed to be simple yet powerful, with features like popular conversion presets and detailed currency information.</p>

                <p>The converter is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works on all devices. For the most accurate trading rates, always check with your exchange as rates may vary slightly between platforms.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Bookmark this page for quick access to crypto conversions!
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
        .crypto-converter-container {
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
        
        .crypto-converter {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: #2B2E3D; /* Dark header background */
          padding: 1.5rem;
          color: white; /* White text on dark header */
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
          color: white; /* White text on dark header */
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

export default CryptoConverter;