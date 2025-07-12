'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [age, setAge] = useState(null)

  const calculateAge = (e) => {
    e.preventDefault()
    
    if (!birthDate) return

    const birth = new Date(birthDate)
    const target = targetDate ? new Date(targetDate) : new Date()
    
    if (birth > target) {
      alert('Birth date cannot be in the future!')
      return
    }

    const timeDiff = target.getTime() - birth.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
    
    const years = Math.floor(daysDiff / 365.25)
    const months = Math.floor((daysDiff % 365.25) / 30.44)
    const days = Math.floor((daysDiff % 365.25) % 30.44)
    
    const totalMonths = Math.floor(daysDiff / 30.44)
    const totalWeeks = Math.floor(daysDiff / 7)
    const totalDays = daysDiff
    const totalHours = Math.floor(timeDiff / (1000 * 3600))
    const totalMinutes = Math.floor(timeDiff / (1000 * 60))
    const totalSeconds = Math.floor(timeDiff / 1000)

    setAge({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds
    })
  }

  const setToday = () => {
    const today = new Date().toISOString().split('T')[0]
    setTargetDate(today)
  }

  const clearForm = () => {
    setBirthDate('')
    setTargetDate('')
    setAge(null)
  }

  const getFunFacts = () => {
    if (!age) return []
    
    const facts = []
    
    // Heartbeats (average 80 beats per minute)
    const heartbeats = age.totalMinutes * 80
    facts.push({
      title: 'Heartbeats',
      desc: `Your heart has beaten approximately ${heartbeats.toLocaleString()} times`
    })
    
    // Breaths (average 16 breaths per minute)
    const breaths = age.totalMinutes * 16
    facts.push({
      title: 'Breaths',
      desc: `You have taken approximately ${breaths.toLocaleString()} breaths`
    })
    
    // Sleep (average 8 hours per day)
    const sleepHours = Math.floor(age.totalDays * 8)
    facts.push({
      title: 'Sleep',
      desc: `You have slept approximately ${sleepHours.toLocaleString()} hours`
    })
    
    // Steps (average 7,500 steps per day)
    const steps = age.totalDays * 7500
    facts.push({
      title: 'Steps',
      desc: `You have walked approximately ${steps.toLocaleString()} steps`
    })
    
    // Blinks (average 15-20 times per minute)
    const blinks = age.totalMinutes * 17.5
    facts.push({
      title: 'Blinks',
      desc: `You have blinked approximately ${blinks.toLocaleString()} times`
    })
    
    return facts
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Age Calculator
      </div>

      <header className="header">
        <h1>Age Calculator</h1>
        <p>Calculate your exact age between two dates</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateAge}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="targetDate">Target Date (Optional)</label>
              <input
                type="date"
                id="targetDate"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Age
            </button>
            <button type="button" className="today-btn" onClick={setToday}>
              Set Today
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {age && (
          <div className="results">
            <div className="age-display">
              {age.years} years, {age.months} months, {age.days} days
            </div>
            
            <div className="age-breakdown">
              <div className="age-item">
                <div className="age-value">{age.years}</div>
                <div className="age-label">Years</div>
              </div>
              <div className="age-item">
                <div className="age-value">{age.months}</div>
                <div className="age-label">Months</div>
              </div>
              <div className="age-item">
                <div className="age-value">{age.days}</div>
                <div className="age-label">Days</div>
              </div>
            </div>

            <div className="total-breakdown">
              <div className="total-title">Total Breakdown</div>
              <div className="total-grid">
                <div className="total-item">
                  <div className="total-value">{age.totalMonths}</div>
                  <div className="total-label">Months</div>
                </div>
                <div className="total-item">
                  <div className="total-value">{age.totalWeeks}</div>
                  <div className="total-label">Weeks</div>
                </div>
                <div className="total-item">
                  <div className="total-value">{age.totalDays}</div>
                  <div className="total-label">Days</div>
                </div>
                <div className="total-item">
                  <div className="total-value">{age.totalHours.toLocaleString()}</div>
                  <div className="total-label">Hours</div>
                </div>
                <div className="total-item">
                  <div className="total-value">{age.totalMinutes.toLocaleString()}</div>
                  <div className="total-label">Minutes</div>
                </div>
                <div className="total-item">
                  <div className="total-value">{age.totalSeconds.toLocaleString()}</div>
                  <div className="total-label">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fun-facts">
        <h3>Fun Facts About Your Age</h3>
        <div className="facts-grid">
          {getFunFacts().map((fact, index) => (
            <div key={index} className="fact-item">
              <div className="fact-title">{fact.title}</div>
              <div className="fact-desc">{fact.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3>About Age Calculation</h3>
        <ul>
          <li>Age is calculated using the exact number of days between dates.</li>
          <li>Years are calculated using 365.25 days (accounting for leap years).</li>
          <li>Months are calculated using 30.44 days (average month length).</li>
          <li>If no target date is provided, today's date is used.</li>
          <li>Fun facts are estimates based on average human statistics.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 