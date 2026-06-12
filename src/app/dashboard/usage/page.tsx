"use client"

import React, { useState } from "react"
import { Activity, Clock, CheckCircle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UsageAnalytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("30d")
  const [hoveredPoints, setHoveredPoints] = useState<{
    requests?: { x: number; y: number; label: string; value: number };
    latency?: { x: number; y: number; label: string; value: number };
  }>({})

  // Mock data for Last 30 Days
  const data30d = {
    requests: [
      { date: "May 14", value: 3200, latency: 248 },
      { date: "May 17", value: 3500, latency: 242 },
      { date: "May 20", value: 3100, latency: 250 },
      { date: "May 23", value: 4200, latency: 238 },
      { date: "May 26", value: 3800, latency: 245 },
      { date: "May 29", value: 4600, latency: 241 },
      { date: "Jun 01", value: 4300, latency: 252 },
      { date: "Jun 04", value: 5100, latency: 239 },
      { date: "Jun 07", value: 4800, latency: 243 },
      { date: "Jun 10", value: 5900, latency: 235 },
      { date: "Jun 12", value: 6128, latency: 231 }
    ],
    summary: {
      totalCalls: "128,542",
      totalCallsTrend: "+12.4%",
      avgLatency: "241 ms",
      avgLatencyTrend: "-4.2%",
      successRate: "99.98%",
      successRateTrend: "+0.02%",
      creditsUsed: "34,120",
      creditsUsedTrend: "+15.8%"
    }
  }

  // Mock data for Last 7 Days
  const data7d = {
    requests: [
      { date: "Jun 06", value: 4900, latency: 240 },
      { date: "Jun 07", value: 4800, latency: 243 },
      { date: "Jun 08", value: 5200, latency: 237 },
      { date: "Jun 09", value: 5800, latency: 236 },
      { date: "Jun 10", value: 5900, latency: 235 },
      { date: "Jun 11", value: 6050, latency: 233 },
      { date: "Jun 12", value: 6128, latency: 231 }
    ],
    summary: {
      totalCalls: "38,778",
      totalCallsTrend: "+4.8%",
      avgLatency: "236 ms",
      avgLatencyTrend: "-1.5%",
      successRate: "99.99%",
      successRateTrend: "+0.01%",
      creditsUsed: "10,242",
      creditsUsedTrend: "+6.1%"
    }
  }

  const activeData = timeRange === "30d" ? data30d : data7d

  // Chart Rendering calculations
  const width = 600
  const height = 180
  const padding = 25

  // Requests Chart Config
  const reqMaxX = activeData.requests.length - 1
  const reqMaxY = Math.max(...activeData.requests.map(d => d.value)) * 1.15
  const reqMinY = Math.min(...activeData.requests.map(d => d.value)) * 0.85
  const getReqX = (index: number) => padding + (index / reqMaxX) * (width - 2 * padding)
  const getReqY = (value: number) => height - padding - ((value - reqMinY) / (reqMaxY - reqMinY)) * (height - 2 * padding)

  const reqPoints = activeData.requests.map((d, i) => `${getReqX(i)},${getReqY(d.value)}`).join(" ")
  const reqAreaPoints = `${getReqX(0)},${height - padding} ${reqPoints} ${getReqX(reqMaxX)},${height - padding}`

  // Latency Chart Config
  const latMaxX = activeData.requests.length - 1
  const latMaxY = Math.max(...activeData.requests.map(d => d.latency)) * 1.05
  const latMinY = Math.min(...activeData.requests.map(d => d.latency)) * 0.95
  const getLatX = (index: number) => padding + (index / latMaxX) * (width - 2 * padding)
  const getLatY = (value: number) => height - padding - ((value - latMinY) / (latMaxY - latMinY)) * (height - 2 * padding)

  const latPoints = activeData.requests.map((d, i) => `${getLatX(i)},${getLatY(d.latency)}`).join(" ")
  const latAreaPoints = `${getLatX(0)},${height - padding} ${latPoints} ${getLatX(latMaxX)},${height - padding}`

  // Endpoint breakdown mock data
  const endpointBreakdown = [
    {
      path: "/v1/vegetation/ndvi",
      method: "POST",
      calls: 64271,
      percentage: 50,
      credits: 128542,
      successRate: "99.99%",
      avgLatency: "248ms"
    },
    {
      path: "/v1/vegetation/ndre",
      method: "POST",
      calls: 32135,
      percentage: 25,
      credits: 64270,
      successRate: "99.98%",
      avgLatency: "261ms"
    },
    {
      path: "/v1/weather",
      method: "POST",
      calls: 19281,
      percentage: 15,
      credits: 19281,
      successRate: "99.97%",
      avgLatency: "185ms"
    },
    {
      path: "/v1/farms",
      method: "POST",
      calls: 8504,
      percentage: 7,
      credits: 8504,
      successRate: "100.00%",
      avgLatency: "312ms"
    },
    {
      path: "/v1/vegetation/ndwi",
      method: "POST",
      calls: 4351,
      percentage: 3,
      credits: 8702,
      successRate: "99.95%",
      avgLatency: "254ms"
    }
  ]

  return (
    <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Usage Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Detailed logging and consumption metrics for your API applications.</p>
          </div>

          {/* Timeframe selector */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 self-start sm:self-auto">
            <button
              onClick={() => setTimeRange("7d")}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all",
                timeRange === "7d"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange("30d")}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all",
                timeRange === "30d"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              30 Days
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: API Requests */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">API Requests</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{activeData.summary.totalCalls}</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                <span className="text-emerald-600 font-semibold">{activeData.summary.totalCallsTrend}</span>
                <span className="text-slate-400 font-medium">vs last period</span>
              </div>
            </div>
          </div>

          {/* Card 2: Average Latency */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Avg Response Time</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{activeData.summary.avgLatency}</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                <span className="text-emerald-600 font-semibold">{activeData.summary.avgLatencyTrend}</span>
                <span className="text-slate-400 font-medium">vs last period</span>
              </div>
            </div>
          </div>

          {/* Card 3: Success Rate */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Success Rate</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{activeData.summary.successRate}</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                <span className="text-emerald-600 font-semibold">{activeData.summary.successRateTrend}</span>
                <span className="text-slate-400 font-medium">vs last period</span>
              </div>
            </div>
          </div>

          {/* Card 4: Credits Invoiced */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Credits Consumed</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{activeData.summary.creditsUsed}</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                <span className="text-emerald-600 font-semibold">{activeData.summary.creditsUsedTrend}</span>
                <span className="text-slate-400 font-medium">vs last period</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: API Request Volume */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">API Requests Volume</h3>
              <p className="text-xs text-slate-400 mt-0.5">Sum total of inbound request endpoints.</p>
            </div>

            <div className="relative w-full overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-axis guidelines */}
                {[0.25, 0.5, 0.75, 1].map((p, idx) => {
                  const val = reqMinY + (reqMaxY - reqMinY) * p
                  return (
                    <line
                      key={idx}
                      x1={padding}
                      y1={getReqY(val)}
                      x2={width - padding}
                      y2={getReqY(val)}
                      stroke="#F1F5F9"
                      strokeWidth="1.5"
                    />
                  )
                })}

                {/* Area Fill */}
                <polygon points={reqAreaPoints} fill="url(#reqGrad)" />

                {/* Grid Line */}
                <polyline points={reqPoints} fill="none" stroke="#22C55E" strokeWidth="2" />

                {/* Trigger Points */}
                {activeData.requests.map((d, i) => (
                  <circle
                    key={i}
                    cx={getReqX(i)}
                    cy={getReqY(d.value)}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#14532D"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => {
                      setHoveredPoints(prev => ({
                        ...prev,
                        requests: { x: getReqX(i), y: getReqY(d.value), label: d.date, value: d.value }
                      }))
                    }}
                    onMouseLeave={() => {
                      setHoveredPoints(prev => ({ ...prev, requests: undefined }))
                    }}
                  />
                ))}

                {/* Dates */}
                {activeData.requests.filter((_, idx) => idx % 2 === 0).map((d, i) => (
                  <text
                    key={i}
                    x={getReqX(i * 2)}
                    y={height - 2}
                    textAnchor="middle"
                    fill="#94A3B8"
                    className="text-[9px] font-mono font-bold"
                  >
                    {d.date}
                  </text>
                ))}
              </svg>

              {/* Tooltip */}
              {hoveredPoints.requests && (
                <div
                  className="absolute bg-slate-900 text-white rounded-lg p-2 shadow-lg text-[10px] z-10 flex flex-col gap-0.5 border border-slate-800"
                  style={{
                    left: `${(hoveredPoints.requests.x / width) * 100}%`,
                    top: `${(hoveredPoints.requests.y / height) * 100 - 30}%`,
                    transform: "translate(-50%, -100%)"
                  }}
                >
                  <span className="text-slate-400 font-mono text-[8px] font-bold uppercase">{hoveredPoints.requests.label}</span>
                  <span className="font-bold text-[#22C55E]">{hoveredPoints.requests.value.toLocaleString()} calls</span>
                </div>
              )}
            </div>
          </div>

          {/* Chart 2: Average Latency */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">Average API Latency</h3>
              <p className="text-xs text-slate-400 mt-0.5">Average roundtrip endpoint computational speeds.</p>
            </div>

            <div className="relative w-full overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14532D" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#14532D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y guidelines */}
                {[0.25, 0.5, 0.75, 1].map((p, idx) => {
                  const val = latMinY + (latMaxY - latMinY) * p
                  return (
                    <line
                      key={idx}
                      x1={padding}
                      y1={getLatY(val)}
                      x2={width - padding}
                      y2={getLatY(val)}
                      stroke="#F1F5F9"
                      strokeWidth="1.5"
                    />
                  )
                })}

                {/* Area Fill */}
                <polygon points={latAreaPoints} fill="url(#latGrad)" />

                {/* Line */}
                <polyline points={latPoints} fill="none" stroke="#14532D" strokeWidth="2" />

                {/* Points */}
                {activeData.requests.map((d, i) => (
                  <circle
                    key={i}
                    cx={getLatX(i)}
                    cy={getLatY(d.latency)}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#22C55E"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => {
                      setHoveredPoints(prev => ({
                        ...prev,
                        latency: { x: getLatX(i), y: getLatY(d.latency), label: d.date, value: d.latency }
                      }))
                    }}
                    onMouseLeave={() => {
                      setHoveredPoints(prev => ({ ...prev, latency: undefined }))
                    }}
                  />
                ))}

                {/* Dates */}
                {activeData.requests.filter((_, idx) => idx % 2 === 0).map((d, i) => (
                  <text
                    key={i}
                    x={getLatX(i * 2)}
                    y={height - 2}
                    textAnchor="middle"
                    fill="#94A3B8"
                    className="text-[9px] font-mono font-bold"
                  >
                    {d.date}
                  </text>
                ))}
              </svg>

              {/* Tooltip */}
              {hoveredPoints.latency && (
                <div
                  className="absolute bg-slate-900 text-white rounded-lg p-2 shadow-lg text-[10px] z-10 flex flex-col gap-0.5 border border-slate-800"
                  style={{
                    left: `${(hoveredPoints.latency.x / width) * 100}%`,
                    top: `${(hoveredPoints.latency.y / height) * 100 - 30}%`,
                    transform: "translate(-50%, -100%)"
                  }}
                >
                  <span className="text-slate-400 font-mono text-[8px] font-bold uppercase">{hoveredPoints.latency.label}</span>
                  <span className="font-bold text-[#22C55E]">{hoveredPoints.latency.value} ms</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Endpoint Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Endpoint Request breakdown</h3>
            <p className="text-xs text-slate-400 mt-1">Telemetry calls sorted by route volume.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6 font-sans">Route & Method</th>
                  <th className="py-3 px-6 font-sans">Total Requests</th>
                  <th className="py-3 px-6 font-sans">Traffic Share</th>
                  <th className="py-3 px-6 font-sans">Credits Charged</th>
                  <th className="py-3 px-6 font-sans">Avg Latency</th>
                  <th className="py-3 px-6 font-sans">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {endpointBreakdown.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    {/* Route */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-700">
                      <span className="font-bold text-[#14532D] bg-[#14532D]/5 px-2 py-0.5 rounded text-[9px] mr-2 uppercase tracking-wide">
                        {row.method}
                      </span>
                      {row.path}
                    </td>

                    {/* Total Requests */}
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {row.calls.toLocaleString()}
                    </td>

                    {/* Traffic Share */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 w-40">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#22C55E] h-1.5 rounded-full"
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500">{row.percentage}%</span>
                      </div>
                    </td>

                    {/* Credits Charged */}
                    <td className="py-4 px-6 font-medium text-slate-600">
                      {row.credits.toLocaleString()}
                    </td>

                    {/* Avg Latency */}
                    <td className="py-4 px-6 text-slate-500 font-medium font-mono text-xs">
                      {row.avgLatency}
                    </td>

                    {/* Success Rate */}
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#14532D] inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#22C55E]" />
                        {row.successRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    </div>
  )
}
