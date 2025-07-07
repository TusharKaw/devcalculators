"use client"

import { useState } from "react";

const prefixes = ["Captain", "Doctor", "The", "Super", "Ultra", "Mega", "Power", "Shadow", "Light", "Dark", "Golden", "Silver", "Iron", "Steel", "Fire", "Ice", "Thunder", "Storm", "Star", "Moon"];

const suffixes = ["Man", "Woman", "Boy", "Girl", "Hero", "Avenger", "Guardian", "Protector", "Warrior", "Knight", "Phoenix", "Dragon", "Wolf", "Eagle", "Hawk", "Tiger", "Lion", "Bear", "Shark", "Spider"];

const powers = {
  "strength": ["Super Strength", "Invincibility", "Enhanced Durability", "Power Punch"],
  "speed": ["Super Speed", "Lightning Fast", "Time Manipulation", "Teleportation"],
  "intelligence": ["Genius Intellect", "Mind Reading", "Telepathy", "Technopathy"],
  "energy": ["Energy Blasts", "Force Fields", "Energy Absorption", "Power Generation"],
  "nature": ["Elemental Control", "Weather Manipulation", "Plant Control", "Animal Communication"]
};

const colors = {
  "red": "Crimson",
  "blue": "Azure", 
  "green": "Emerald",
  "yellow": "Golden",
  "purple": "Violet",
  "orange": "Amber",
  "black": "Shadow",
  "white": "Light",
  "pink": "Rose",
  "brown": "Terra"
};

function generateSuperheroName(name, color, power) {
  const nameLength = name.length;
  const colorName = colors[color] || "Mystic";
  
  // Generate name based on inputs
  let prefix = prefixes[nameLength % prefixes.length];
  let suffix = suffixes[nameLength % suffixes.length];
  
  // Sometimes use color in name
  if (Math.random() > 0.5) {
    prefix = colorName;
  }
  
  const superheroName = `${prefix} ${suffix}`;
  const powerList = powers[power] || powers["strength"];
  const selectedPower = powerList[Math.floor(Math.random() * powerList.length)];
  
  return {
    name: superheroName,
    power: selectedPower,
    description: generateDescription(superheroName, selectedPower, color)
  };
}

function generateDescription(name, power, color) {
  const descriptions = [
    `${name} is a legendary hero with the power of ${power}. Clad in ${color} armor, they protect the innocent and fight for justice.`,
    `When danger strikes, ${name} appears with incredible ${power} abilities. Their ${color} costume strikes fear into the hearts of villains.`,
    `${name} is known throughout the world for their mastery of ${power}. The ${color} symbol on their chest represents hope and courage.`,
    `With the extraordinary ability of ${power}, ${name} has become a symbol of justice. Their ${color} uniform is instantly recognizable.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export default function SuperheroNameGenerator() {
  const [realName, setRealName] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("blue");
  const [powerPreference, setPowerPreference] = useState("strength");
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);

  const generate = () => {
    if (!realName.trim()) {
      setResult(null);
      return;
    }
    
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      const superhero = generateSuperheroName(realName, favoriteColor, powerPreference);
      setResult({
        realName: realName,
        superhero: superhero
      });
    }, 300);
  };

  return (
    <div className="superhero-generator-container">
      <div className="main-content-wrapper">
        <div className="generator-content">
          <div className="superhero-generator">
            <div className="header">
              <h2 style={{color:'white'}}>🦸 Superhero Name Generator 🦸‍♀️</h2>
              <p className="subtitle" style={{color:'white'}}>Create your unique superhero identity based on your personality</p>
            </div>

            <div className="generator-card">
              <div className="input-section">
                <label htmlFor="realName">Enter your real name</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="realName"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    placeholder="Your secret identity"
                  />
                </div>

                <div className="select-group">
                  <div className="select-box">
                    <label htmlFor="favoriteColor">Favorite Color</label>
                    <select
                      id="favoriteColor"
                      value={favoriteColor}
                      onChange={(e) => setFavoriteColor(e.target.value)}
                    >
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="yellow">Yellow</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="black">Black</option>
                      <option value="white">White</option>
                      <option value="pink">Pink</option>
                      <option value="brown">Brown</option>
                    </select>
                  </div>

                  <div className="select-box">
                    <label htmlFor="powerPreference">Select Your Secret Power</label>
                    <select
                      id="powerPreference"
                      value={powerPreference}
                      onChange={(e) => setPowerPreference(e.target.value)}
                    >
                      <option value="strength">Strength</option>
                      <option value="speed">Speed</option>
                      <option value="intelligence">Intelligence</option>
                      <option value="energy">Energy</option>
                      <option value="nature">Nature</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generate}
                  disabled={!realName}
                  className={!realName ? 'disabled' : ''}
                >
                  Generate Superhero
                </button>
              </div>

              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <h2>
                      <span className="icon">🦸</span>
                      Your Superhero Identity
                    </h2>
                    
                    <div className="hero-results">
                      <div className="hero-name-box">
                        <p className="hero-label">Your Superhero Name</p>
                        <p className="hero-value">{result.superhero.name}</p>
                      </div>
                      
                      <div className="hero-details">
                        <div className="detail-box">
                          <p className="detail-label">Secret Identity</p>
                          <p className="detail-value">{result.realName}</p>
                        </div>
                        
                        <div className="detail-box">
                          <p className="detail-label">Superpower</p>
                          <p className="detail-value">{result.superhero.power}</p>
                        </div>
                        
                        <div className="detail-box">
                          <p className="detail-label">Costume Color</p>
                          <p className="detail-value">{colors[favoriteColor]}</p>
                        </div>
                      </div>
                      
                      <div className="hero-description">
                        <p>{result.superhero.description}</p>
                      </div>
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
              <h2>About Superhero Name Generator</h2>
              <div className="superhero-generator-description">
                <p>Our <strong>Superhero Name Generator</strong> creates unique, personalized superhero identities based on your real name, favorite color, and power preferences. Whether you're creating a character for a story, game, or just for fun, this tool provides creative results instantly.</p>

                <p>This advanced generator uses sophisticated algorithms to combine your inputs with heroic prefixes and suffixes, resulting in names like <strong>"Crimson Guardian"</strong> or <strong>"Doctor Thunder"</strong>. The system also selects appropriate superpowers that match your preferences, from <strong>super strength</strong> to <strong>elemental control</strong>.</p>

                <p>Perfect for <strong>writers</strong> needing character inspiration, <strong>game masters</strong> creating NPCs, <strong>cosplayers</strong> developing their persona, or <strong>kids</strong> imagining their heroic alter-ego. The generator accounts for color symbolism and power compatibility to create cohesive superhero identities.</p>

                <p>The tool is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works seamlessly across all devices. With its simple interface and creative results, it's become a favorite among comic fans, RPG players, and creative professionals worldwide.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Try different color and power combinations for unique results!
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
        .superhero-generator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 0rem;
        }
        
        .generator-content {
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
        
        .superhero-generator {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        
        .header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          font-size: 1.25rem;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .generator-card {
          background: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        
        .input-section {
          padding: 1.5rem;
        }
        
        .input-section label {
          display: block;
          font-size: 1.125rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.75rem;
        }
        
        .input-group {
          margin-bottom: 1rem;
        }
        
        .input-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: #ff5722;
          box-shadow: 0 0 0 2px rgba(255, 87, 34, 0.2);
        }
        
        .select-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .select-box {
          flex: 1;
        }
        
        .select-box label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .select-box select {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background-color: white;
        }
        
        .input-section button {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: #ff5722;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }
        
        .input-section button:hover {
          background: #e64a19;
        }
        
        .input-section button.disabled {
          background: rgba(255, 87, 34, 0.6);
          cursor: not-allowed;
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
          background: #3a3a3a;
          border-radius: 8px;
          padding: 1.5rem;
          border: 2px solid #ff5722;
        }
        
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        .results-card h2 .icon {
          margin-right: 0.5rem;
        }
        
        .hero-results {
          color: white;
        }
        
        .hero-name-box {
          text-align: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        
        .hero-label {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #ffccbc;
        }
        
        .hero-value {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          color: #ff8a65;
        }
        
        .hero-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .detail-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
        }
        
        .detail-label {
          font-size: 0.875rem;
          color: #ffccbc;
          margin: 0 0 0.5rem 0;
        }
        
        .detail-value {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          color: white;
        }
        
        .hero-description {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          font-style: italic;
          line-height: 1.6;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
          display: flex;
          align-items: center;
          background:rgba(255, 86, 34, 0.20);
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid #ff5722;
          color: #ff5722;
          font-size: 0.875rem;
        }
        
        .tip span {
          margin-right: 0.5rem;
        }
        
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          
          .ad-banner {
            width: 100%;
            order: -1;
            margin-bottom: 1.5rem;
          }
          
          .ad-content {
            position: static;
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
            font-size: 1.5rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .select-group {
            flex-direction: column;
            gap: 1rem;
          }
          
          .hero-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}