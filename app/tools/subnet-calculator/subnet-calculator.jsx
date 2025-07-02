"use client"

import { useState } from "react"

function ipToInt(ip) {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0)
}
function intToIp(int) {
  return [24, 16, 8, 0].map(shift => (int >> shift) & 255).join('.')
}
function maskFromCidr(cidr) {
  return 0xffffffff << (32 - cidr) & 0xffffffff
}
function countUsable(mask) {
  const hostBits = 32 - Math.clz32(~mask)
  return hostBits <= 2 ? 0 : (1 << (32 - hostBits)) - 2
}

export default function SubnetCalculator() {
  const [ip, setIp] = useState("")
  const [cidr, setCidr] = useState(24)
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(ip) || cidr < 1 || cidr > 32) return setResult(null)
    const ipInt = ipToInt(ip)
    const mask = maskFromCidr(cidr)
    const network = ipInt & mask
    const broadcast = network | (~mask >>> 0)
    const usable = cidr >= 31 ? 0 : (broadcast - network - 1)
    setResult({
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      usable: usable < 0 ? 0 : usable,
      mask: intToIp(mask)
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Subnet Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>IP Address: </label>
          <input type="text" value={ip} onChange={e => setIp(e.target.value)} style={{ marginLeft: 10, width: 140 }} placeholder="192.168.1.1" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Subnet Mask (CIDR): </label>
          <input type="number" value={cidr} onChange={e => setCidr(e.target.value)} style={{ marginLeft: 10, width: 60 }} min="1" max="32" />
          <span style={{ marginLeft: 10 }}>/ {cidr}</span>
        </div>
        <button onClick={calculate} style={{ background: "#607d8b", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 16 }}>
            <div><strong>Network Address:</strong> {result.network}</div>
            <div><strong>Broadcast Address:</strong> {result.broadcast}</div>
            <div><strong>Subnet Mask:</strong> {result.mask}</div>
            <div><strong>Usable IPs:</strong> {result.usable}</div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Subnet Calculator</h2>
        <p>
          The Subnet Calculator helps you find network, broadcast, and usable IPs for a given IP and subnet mask. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 