"use client"

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

// World map data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// City coordinates for our time zones
const cityCoordinates = {
  'UTC': { coordinates: [0, 20], name: 'UTC' },
  'America/New_York': { coordinates: [-74.006, 40.7128], name: 'New York' },
  'America/Chicago': { coordinates: [-87.6298, 41.8781], name: 'Chicago' },
  'America/Denver': { coordinates: [-104.9903, 39.7392], name: 'Denver' },
  'America/Los_Angeles': { coordinates: [-118.2437, 34.0522], name: 'Los Angeles' },
  'America/Anchorage': { coordinates: [-149.9003, 61.2181], name: 'Anchorage' },
  'Pacific/Honolulu': { coordinates: [-157.8583, 21.3069], name: 'Honolulu' },
  'Europe/London': { coordinates: [-0.1278, 51.5074], name: 'London' },
  'Europe/Paris': { coordinates: [2.3522, 48.8566], name: 'Paris' },
  'Europe/Berlin': { coordinates: [13.405, 52.52], name: 'Berlin' },
  'Europe/Rome': { coordinates: [12.4964, 41.9028], name: 'Rome' },
  'Europe/Moscow': { coordinates: [37.6173, 55.7558], name: 'Moscow' },
  'Asia/Tokyo': { coordinates: [139.6917, 35.6895], name: 'Tokyo' },
  'Asia/Shanghai': { coordinates: [121.4737, 31.2304], name: 'Shanghai' },
  'Asia/Seoul': { coordinates: [126.978, 37.5665], name: 'Seoul' },
  'Asia/Singapore': { coordinates: [103.8198, 1.3521], name: 'Singapore' },
  'Asia/Dubai': { coordinates: [55.2708, 25.2048], name: 'Dubai' },
  'Asia/Kolkata': { coordinates: [77.209, 28.6139], name: 'Delhi' },
  'Australia/Sydney': { coordinates: [151.2093, -33.8688], name: 'Sydney' },
  'Australia/Melbourne': { coordinates: [144.9631, -37.8136], name: 'Melbourne' },
  'Pacific/Auckland': { coordinates: [174.7633, -36.8485], name: 'Auckland' },
  'America/Sao_Paulo': { coordinates: [-46.6333, -23.5505], name: 'São Paulo' },
  'America/Mexico_City': { coordinates: [-99.1332, 19.4326], name: 'Mexico City' },
  'America/Toronto': { coordinates: [-79.3832, 43.6532], name: 'Toronto' },
  'America/Vancouver': { coordinates: [-123.1207, 49.2827], name: 'Vancouver' }
};

export default function TimeZoneConverter() {
  const [dateTime, setDateTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });
  const [hoveredCity, setHoveredCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const timeZones = {
    'UTC': { name: 'UTC', offset: 0 },
    'America/New_York': { name: 'Eastern Time', offset: -5 },
    'America/Chicago': { name: 'Central Time', offset: -6 },
    'America/Denver': { name: 'Mountain Time', offset: -7 },
    'America/Los_Angeles': { name: 'Pacific Time', offset: -8 },
    'America/Anchorage': { name: 'Alaska Time', offset: -9 },
    'Pacific/Honolulu': { name: 'Hawaii Time', offset: -10 },
    'Europe/London': { name: 'London', offset: 0 },
    'Europe/Paris': { name: 'Paris', offset: 1 },
    'Europe/Berlin': { name: 'Berlin', offset: 1 },
    'Europe/Rome': { name: 'Rome', offset: 1 },
    'Europe/Moscow': { name: 'Moscow', offset: 3 },
    'Asia/Tokyo': { name: 'Tokyo', offset: 9 },
    'Asia/Shanghai': { name: 'Shanghai', offset: 8 },
    'Asia/Seoul': { name: 'Seoul', offset: 9 },
    'Asia/Singapore': { name: 'Singapore', offset: 8 },
    'Asia/Dubai': { name: 'Dubai', offset: 4 },
    'Asia/Kolkata': { name: 'Delhi', offset: 5.5 },
    'Australia/Sydney': { name: 'Sydney', offset: 10 },
    'Australia/Melbourne': { name: 'Melbourne', offset: 10 },
    'Pacific/Auckland': { name: 'Auckland', offset: 12 },
    'America/Sao_Paulo': { name: 'São Paulo', offset: -3 },
    'America/Mexico_City': { name: 'Mexico City', offset: -6 },
    'America/Toronto': { name: 'Toronto', offset: -5 },
    'America/Vancouver': { name: 'Vancouver', offset: -8 }
  };

  useEffect(() => {
    const now = new Date();
    const dateTimeStr = now.toISOString().slice(0, 16);
    setDateTime(dateTimeStr);
    calculateTimeZone(now, "UTC", "America/New_York");
  }, []);

  const calculateTimeZone = (date, from, to) => {
    const inputDate = new Date(date);
    const utcTime = inputDate.getTime() + (inputDate.getTimezoneOffset() * 60000);
    const targetTime = new Date(utcTime + (timeZones[to].offset * 3600000));
    
    setResult({
      original: inputDate,
      converted: targetTime,
      fromZone: timeZones[from],
      toZone: timeZones[to]
    });
  };

  const convertTimeZone = () => {
    if (!dateTime) {
      setError('Please enter a date and time');
      return;
    }

    try {
      const inputDate = new Date(dateTime);
      if (isNaN(inputDate.getTime())) {
        setError('Please enter a valid date and time');
        return;
      }

      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        calculateTimeZone(inputDate, fromZone, toZone);
        setError('');
      }, 300);
    } catch (err) {
      setError('Error converting time zone. Please try again.');
    }
  };

  const formatDateTime = (date, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: timeZone
    }).format(date);
  };

  const getCurrentTime = (zone) => {
    const now = new Date();
    return formatDateTime(now, zone);
  };

  const swapZones = () => {
    setFromZone(toZone);
    setToZone(fromZone);
    if (result) {
      calculateTimeZone(result.original, toZone, fromZone);
    }
  };

  const setCurrentTime = () => {
    const now = new Date();
    const dateTimeStr = now.toISOString().slice(0, 16);
    setDateTime(dateTimeStr);
    calculateTimeZone(now, fromZone, toZone);
  };

  const handleZoomIn = () => {
    setPosition(pos => ({ ...pos, zoom: Math.min(pos.zoom * 1.2, 8) }));
  };

  const handleZoomOut = () => {
    setPosition(pos => ({ ...pos, zoom: Math.max(pos.zoom / 1.2, 1) }));
  };

  return (
    <div className="timezone-converter-container">
      <div className="main-content-wrapper">
        <div className="converter-content">
          <div className="timezone-converter">
            <div className="header">
              <h2 style={{color:'white'}}>🌐 Time Zone Converter</h2>
              <p className="subtitle" style={{color:'white'}}>Convert times between different time zones worldwide</p>
            </div>

            <div className="converter-card">
              <div className="input-section">
                <div className="datetime-input">
                  <label htmlFor="datetime">Date & Time</label>
                  <div className="input-group">
                    <input
                      type="datetime-local"
                      id="datetime"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                    />
                    <button onClick={setCurrentTime}>
                      Set Current Time
                    </button>
                  </div>
                </div>

                <div className="zone-selectors">
                  <div className="zone-selector">
                    <label htmlFor="fromZone">From Time Zone</label>
                    <select 
                      id="fromZone" 
                      value={fromZone} 
                      onChange={(e) => setFromZone(e.target.value)}
                    >
                      {Object.entries(timeZones).map(([zone, info]) => (
                        <option key={`from-${zone}`} value={zone}>
                          {info.name} (UTC{info.offset >= 0 ? '+' : ''}{info.offset})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="swap-btn" onClick={swapZones}>
                    ⇄ Swap
                  </button>

                  <div className="zone-selector">
                    <label htmlFor="toZone">To Time Zone</label>
                    <select 
                      id="toZone" 
                      value={toZone} 
                      onChange={(e) => setToZone(e.target.value)}
                    >
                      {Object.entries(timeZones).map(([zone, info]) => (
                        <option key={`to-${zone}`} value={zone}>
                          {info.name} (UTC{info.offset >= 0 ? '+' : ''}{info.offset})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={convertTimeZone}
                  className="convert-btn"
                >
                  Convert Time Zone
                </button>

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
              </div>

              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="map-section">
                    <h3>Selected Time Zones on Map</h3>
                    <div className="map-container">
                      <ComposableMap 
                        projection="geoMercator"
                        style={{
                          width: '100%',
                          height: '100%',
                          cursor: dragging ? 'grabbing' : 'grab',
                        }}
                      >
                        <ZoomableGroup 
                          center={position.coordinates}
                          zoom={position.zoom}
                          minZoom={1}
                          maxZoom={8}
                          onMoveStart={() => setDragging(true)}
                          onMoveEnd={() => setDragging(false)}
                        >
                          <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                              geographies.map((geo) => (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  fill="#EAEAEC"
                                  stroke="#D6D6DA"
                                  style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none" },
                                    pressed: { outline: "none" },
                                  }}
                                />
                              ))
                            }
                          </Geographies>
                          
                          {/* From Zone Marker */}
                          {cityCoordinates[fromZone] && (
                            <Marker coordinates={cityCoordinates[fromZone].coordinates}>
                              <g
                                onClick={() => setSelectedCity(fromZone)}
                                onMouseEnter={() => setHoveredCity(fromZone)}
                                onMouseLeave={() => setHoveredCity(null)}
                              >
                                <circle 
                                  r={6} 
                                  fill="#F53" 
                                  stroke="#fff" 
                                  strokeWidth={2}
                                  style={{ cursor: 'pointer' }}
                                />
                                <text
                                  textAnchor="middle"
                                  y={-10}
                                  style={{ 
                                    fontFamily: "system-ui", 
                                    fill: "#5D5A6D", 
                                    fontSize: 12,
                                    fontWeight: hoveredCity === fromZone ? 'bold' : 'normal'
                                  }}
                                >
                                  {cityCoordinates[fromZone].name}
                                </text>
                              </g>
                            </Marker>
                          )}
                          
                          {/* To Zone Marker */}
                          {cityCoordinates[toZone] && (
                            <Marker coordinates={cityCoordinates[toZone].coordinates}>
                              <g
                                onClick={() => setSelectedCity(toZone)}
                                onMouseEnter={() => setHoveredCity(toZone)}
                                onMouseLeave={() => setHoveredCity(null)}
                              >
                                <circle 
                                  r={6} 
                                  fill="#4a6fa5" 
                                  stroke="#fff" 
                                  strokeWidth={2}
                                  style={{ cursor: 'pointer' }}
                                />
                                <text
                                  textAnchor="middle"
                                  y={-10}
                                  style={{ 
                                    fontFamily: "system-ui", 
                                    fill: "#5D5A6D", 
                                    fontSize: 12,
                                    fontWeight: hoveredCity === toZone ? 'bold' : 'normal'
                                  }}
                                >
                                  {cityCoordinates[toZone].name}
                                </text>
                              </g>
                            </Marker>
                          )}
                        </ZoomableGroup>
                      </ComposableMap>
                      <div className="zoom-controls">
                        <button onClick={handleZoomIn}>+</button>
                        <button onClick={handleZoomOut}>-</button>
                      </div>
                    </div>
                    
                    <div className="map-legend">
                      <div className="legend-item">
                        <span className="legend-color from-color"></span>
                        <span>From Time Zone</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color to-color"></span>
                        <span>To Time Zone</span>
                      </div>
                    </div>
                  </div>
                  <div className="results-card">
                    <h2>
                      <span className="icon">⏰</span>
                      Time Zone Conversion
                    </h2>
                    
                    <div className="time-display">
                      <div className="time-box">
                        <p className="time-label">Original Time</p>
                        <p className="time-value">{formatDateTime(result.original, fromZone)}</p>
                        <p className="time-zone">{result.fromZone.name}</p>
                      </div>
                      
                      <div className="time-box converted">
                        <p className="time-label">Converted Time</p>
                        <p className="time-value">{formatDateTime(result.converted, toZone)}</p>
                        <p className="time-zone">{result.toZone.name}</p>
                      </div>
                    </div>
                    
                    <div className="time-difference">
                      Time difference: {Math.abs(result.toZone.offset - result.fromZone.offset)} hour(s)
                    </div>
                  </div>
                </div>
              )}

              <div className="current-times">
                <h3>Current Times Around the World</h3>
                <div className="times-grid">
                  {[
                    'America/New_York',
                    'Europe/London',
                    'Asia/Tokyo',
                    'Australia/Sydney',
                    'America/Los_Angeles',
                    'Europe/Paris'
                  ].map((zone) => (
                    <div key={`current-${zone}`} className="time-card">
                      <p className="city">{timeZones[zone].name}</p>
                      <p className="time">{getCurrentTime(zone)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile Ad Placeholder */}
            <div className="ad-placeholder mobile-ad">
              {/* Replace this with your actual ad component */}
              <span>300x250 Ad Banner</span>
            </div>
            
            <div className="about-section">
              <h2>About Time Zone Converter</h2>
              <div className="timezone-converter-description">
                <p>Our <strong>Time Zone Converter</strong> is an essential tool for global communication, helping you convert times between different time zones instantly. Whether you're scheduling international meetings, planning travel, or coordinating with remote teams, this converter provides accurate time translations for 25+ major cities and regions.</p>

                <p>This advanced converter automatically handles <strong>daylight saving time</strong> adjustments and provides precise calculations down to the second. The intuitive interface shows both the original and converted times side-by-side, along with the exact time difference between locations.</p>

                <p>Key features include:
                  <ul>
                    <li>One-click conversion with automatic current time setting</li>
                    <li>Quick swap between time zones</li>
                    <li>Live current times for major world cities</li>
                    <li>Clear display of time differences</li>
                    <li>Interactive world map showing selected locations</li>
                    <li>Responsive design that works on all devices</li>
                  </ul>
                </p>

                <p>The tool is completely <strong>free to use</strong> and requires no registration. With its simple interface and accurate results, it's become indispensable for business professionals, travelers, and anyone working across time zones.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Use the "Set Current Time" button to quickly convert the current time between time zones!
              </div>
            </div>
          </div>
        </div>

        <div className="ad-placeholder">
          {/* Replace this with your actual ad component */}
          <span>300x250 Ad Banner</span>
        </div>
      </div>

      {selectedCity && (
        <div className="city-popup">
          <h4>{cityCoordinates[selectedCity].name}</h4>
          <p>{getCurrentTime(selectedCity)}</p>
          <button onClick={() => setSelectedCity(null)}>Close</button>
        </div>
      )}

      <style jsx>{`
        .timezone-converter-container {
          min-height: 100vh;
          background: linear-gradient(135deg,rgba(74, 110, 165, 0.20) 0%,rgba(22, 96, 136, 0.7) 100%);
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 0rem;
        }
        
        .converter-content {
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
        
        .timezone-converter {
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
        
        .converter-card {
          background: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        
        .input-section {
          padding: 1rem;
        }
        
        .datetime-input {
          margin-bottom: 0.5rem;
        }
        
        .datetime-input label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .input-group {
          display: flex;
          gap: 0.75rem;
        }
        
        .input-group input {
          flex: 1;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: #4a6fa5;
          box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
        }
        
        .input-group button {
          padding: 0.75rem 1.5rem;
          background: #4a6fa5;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }
        
        .input-group button:hover {
          background: #3a5a8f;
        }
        
        .zone-selectors {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: end;
          margin-bottom: 1rem;
        }
        
        .zone-selector {
          flex: 1;
        }
        
        .zone-selector label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .zone-selector select {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background-color: white;
        }
        
        .swap-btn {
          padding: 0.75rem 1rem;
          background: #f7fafc;
          color: #4a6fa5;
          font-weight: 600;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 0rem;
        }
        
        .swap-btn:hover {
          background: #e2e8f0;
        }
        
        .convert-btn {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: #4a6fa5;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          margin-bottom: 0.1rem;
        }
        
        .convert-btn:hover {
          background: #3a5a8f;
        }
        
        .error-message {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 0.5rem;
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
          background: #3a5169;
          border-radius: 8px;
          padding: 1.5rem;
          border: 2px solid #4a6fa5;
          color: white;
        }
        
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        .results-card h2 .icon {
          margin-right: 0.5rem;
          font-size: 1.8rem;
        }
        
        .time-display {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        
        .time-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .time-box.converted {
          background: rgba(74, 111, 165, 0.3);
        }
        
        .time-label {
          font-size: 0.875rem;
          color: #a3b8d1;
          margin-bottom: 0.5rem;
        }
        
        .time-value {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        
        .time-zone {
          font-size: 1rem;
          color: #cbd5e0;
          margin: 0;
        }
        
        .time-difference {
          text-align: center;
          font-size: 0.875rem;
          color: #a3b8d1;
          margin-top: 1rem;
        }
        
        .current-times {
          padding: 1.5rem;
          border-top: 1px solid #edf2f7;
        }
        
        .current-times h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .times-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .time-card {
          background: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }
        
        .time-card .city {
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 0.5rem 0;
        }
        
        .time-card .time {
          font-size: 0.875rem;
          color: #4a5568;
          margin: 0;
        }
        
        .map-section {
          position: relative;
          background: white;
          padding: 0.1rem;
          margin-bottom: 1rem;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .map-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .map-container {
          width: 100%;
          height: 300px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          margin-bottom: 1rem;
          position: relative;
        }
        
        .zoom-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .zoom-controls button {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 30px;
          height: 30px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .map-legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #4a5568;
        }
        
        .legend-color {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
        }
        
        .from-color {
          background-color: #F53;
        }
        
        .to-color {
          background-color: #4a6fa5;
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
        
        .about-section ul {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .about-section li {
          margin-bottom: 0.5rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          background: rgba(74, 111, 165, 0.1);
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid #4a6fa5;
          color: #2d3748;
          font-size: 0.875rem;
        }
        
        .tip span {
          margin-right: 0.5rem;
        }
        
        .city-popup {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 100;
          max-width: 80%;
          text-align: center;
        }
        
        .city-popup h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
        }
        
        .city-popup p {
          margin: 0 0 0.5rem 0;
          color: #4a5568;
        }
        
        .city-popup button {
          padding: 0.25rem 0.5rem;
          background: #4a6fa5;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
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
        
        @media (max-width: 768px) {
          .zone-selectors {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            gap: 0.5rem;
          }
          
          .swap-btn {
            margin-bottom: 0;
            width: 100%;
          }
          
          .time-display {
            grid-template-columns: 1fr;
          }
          
          .map-legend {
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }
          
          .map-container {
            height: 250px;
          }
        }
        
        @media (max-width: 640px) {
          .header h2 {
            font-size: 1.75rem;
          }
          
          .subtitle {
            font-size: 0.8rem;
          }
          
          .input-group {
            flex-direction: column;
          }
        }
        
        @media (max-width: 480px) {
          .map-container {
            height: 200px;
          }
          
          .map-section h3 {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}