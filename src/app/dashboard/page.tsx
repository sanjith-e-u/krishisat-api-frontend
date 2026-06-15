"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Code,
  TrendingUp,
  Activity,
  Zap,
  Database,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  Copy
} from "lucide-react"

// Reusable Metric Card component
interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: "up" | "down" | "none";
  icon: React.ReactNode;
}

function MetricCard({ title, value, trend, trendType = "none", icon }: MetricCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</span>
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 mt-1.5 text-xs">
            {trendType === "up" && (
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> {trend}
              </span>
            )}
            {trendType === "down" && (
              <span className="text-rose-600 font-semibold flex items-center gap-0.5">
                ↓ {trend}
              </span>
            )}
            <span className="text-slate-400 font-medium">vs last month</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Reusable Section Header
function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default function DashboardOverview() {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [apiKey, setApiKey] = useState("ks_sandbox_9jF2k8L1m9P4w0XqZ")
  const [revealKey, setRevealKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3050)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    showToast("API Key copied to clipboard!")
  }

  const handleRegenerateKey = () => {
    if (!window.confirm("Regenerating your key will immediately invalidate the current one.\nAll integrations using it will break. Are you sure?")) {
      return
    }
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let randomString = ""
    for (let i = 0; i < 17; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    const newKey = "ks_sandbox_" + randomString
    setApiKey(newKey)
    showToast("API Key regenerated successfully!")
  }

  // Chart Mock Data: 30 Days of API Requests
  const chartData = [
    { day: "May 13", value: 3100 },
    { day: "May 16", value: 3400 },
    { day: "May 19", value: 3200 },
    { day: "May 22", value: 4100 },
    { day: "May 25", value: 3900 },
    { day: "May 28", value: 4500 },
    { day: "May 31", value: 4200 },
    { day: "Jun 03", value: 5200 },
    { day: "Jun 06", value: 4900 },
    { day: "Jun 09", value: 5800 },
    { day: "Jun 12", value: 6128 }
  ]

  // Generating coordinates for SVG Line/Area
  const width = 800
  const height = 220
  const padding = 30
  
  const maxX = chartData.length - 1
  const maxY = 7000
  const minY = 2000

  const getX = (index: number) => padding + (index / maxX) * (width - 2 * padding)
  const getY = (value: number) => height - padding - ((value - minY) / (maxY - minY)) * (height - 2 * padding)

  // SVG path definitions
  const points = chartData.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ")
  const areaPoints = `${getX(0)},${height - padding} ${points} ${getX(maxX)},${height - padding}`

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Workspace Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time status of your agricultural telemetry operations.</p>
        </div>

        {/* Phase 3 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total API Calls"
            value="128,542"
            trend="+12.4%"
            trendType="up"
            icon={<Activity className="w-5 h-5" />}
          />
          <MetricCard
            title="Credits Remaining"
            value="9,850"
            trend="-150 today"
            trendType="none"
            icon={<Zap className="w-5 h-5" />}
          />
          <MetricCard
            title="Current Plan"
            value="Free"
            icon={<Database className="w-5 h-5" />}
          />
          <MetricCard
            title="Active APIs"
            value="6"
            icon={<Code className="w-5 h-5" />}
          />
        </div>

        {/* Main Grid: Chart + Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Usage Chart Card - Left Column */}
          <div className="xl:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <SectionHeader
              title="API Requests"
              subtitle="Total programmatic requests recorded over the last 30 days"
              action={
                <Link
                  href="/dashboard/usage"
                  className="text-xs font-semibold text-[#14532D] hover:underline flex items-center gap-1"
                >
                  Full Usage Analytics <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              }
            />

            {/* Custom Interactive SVG Chart (responsive & stable) */}
            <div className="relative w-full overflow-hidden pt-4">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <defs>
                  {/* Green fill gradient */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[2000, 3500, 5000, 6500].map((val) => (
                  <line
                    key={val}
                    x1={padding}
                    y1={getY(val)}
                    x2={width - padding}
                    y2={getY(val)}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Shaded Area */}
                <polygon points={areaPoints} fill="url(#chartGradient)" />

                {/* Highlight Stroke Line */}
                <polyline points={points} fill="none" stroke="#22C55E" strokeWidth="2.5" />

                {/* Data Points */}
                {chartData.map((d, i) => (
                  <circle
                    key={i}
                    cx={getX(i)}
                    cy={getY(d.value)}
                    r={hoveredIdx === i ? 6 : 4}
                    fill="#FFFFFF"
                    stroke="#14532D"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    role="button"
                    tabIndex={0}
                    aria-label={`${d.day}: ${d.value.toLocaleString()} requests`}
                    onMouseEnter={() => {
                      setHoveredIdx(i)
                      setHoveredPoint({ x: getX(i), y: getY(d.value), label: d.day, value: d.value })
                    }}
                    onMouseLeave={() => { setHoveredIdx(null); setHoveredPoint(null) }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setHoveredPoint({ x: getX(i), y: getY(d.value), label: d.day, value: d.value })
                      }
                    }}
                  />
                ))}

                {/* X-Axis labels */}
                {chartData.filter((_, idx) => idx % 2 === 0).map((d, i) => (
                  <text
                    key={i}
                    x={getX(i * 2)}
                    y={height - 5}
                    textAnchor="middle"
                    fill="#64748B"
                    className="text-[10px] font-mono font-medium"
                  >
                    {d.day}
                  </text>
                ))}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredPoint && (
                <div
                  className="absolute bg-slate-900 text-white rounded-lg p-2.5 shadow-xl text-xs z-25 flex flex-col gap-0.5 border border-slate-800"
                  style={{
                    left: `${(hoveredPoint.x / width) * 100}%`,
                    top: `${(hoveredPoint.y / height) * 100 - 32}%`,
                    transform: "translate(-50%, -100%)"
                  }}
                >
                  <span className="text-slate-400 font-mono text-[9px] uppercase font-bold">{hoveredPoint.label}</span>
                  <span className="font-bold text-[#22C55E]">{hoveredPoint.value.toLocaleString()} calls</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stacked API Key + Recent Activity */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* API Key Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <SectionHeader
                title="Primary API Key"
                subtitle="Sandbox developer credentials"
              />
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between font-mono text-xs text-slate-650">
                <span className="truncate max-w-[170px] select-all">
                  {revealKey ? apiKey : `${apiKey.substring(0, 8)}••••••••••••••••`}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setRevealKey(!revealKey)}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    title={revealKey ? "Hide API key" : "Show API key"}
                  >
                    {revealKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleCopyKey}
                    className="p-1 text-slate-400 hover:text-slate-650 transition-colors focus:outline-none flex items-center gap-1"
                    title="Copy API key"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium text-slate-400">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <button
                  onClick={handleRegenerateKey}
                  className="text-primary hover:text-[#114524] font-semibold transition-colors focus:outline-none"
                >
                  Regenerate Key
                </button>
                <Link
                  href="/dashboard/api-keys"
                  className="text-slate-400 hover:text-slate-650 font-medium transition-colors"
                >
                  Manage Keys →
                </Link>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between flex-grow">
              <div>
                <SectionHeader title="Recent Activity" subtitle="Outbound developer request logs" />
                
                <ul className="space-y-4">
                  <li className="flex justify-between items-start py-1 border-b border-slate-50 last:border-b-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">NDVI API Called</h4>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">POST /v1/vegetation/ndvi</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#14532D]">1 credit</span>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">Success 200</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-start py-1 border-b border-slate-50 last:border-b-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Weather API Called</h4>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">POST /v1/weather</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#14532D]">1 credit</span>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">Success 200</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-start py-1 border-b border-slate-50 last:border-b-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">NDRE API Called</h4>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">POST /v1/vegetation/ndre</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#14532D]">2 credits</span>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">Success 200</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-start py-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Farm Registration</h4>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">POST /v1/farms</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#14532D]">0 credits</span>
                      <p className="text-[10px] text-slate-405 font-mono mt-0.5">Success 201</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded inline-block select-none animate-pulse">
                  ● Connected (mock)
                </span>
                <span className="text-[10px] text-slate-405 font-mono">
                  region: ap-south-1
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* API Catalog Grid */}
        <div>
          <SectionHeader
            title="API Index Catalog"
            subtitle="Current operational telemetry indexes"
            action={
              <Link
                href="/marketplace"
                className="text-xs font-semibold text-[#14532D] hover:underline flex items-center gap-1"
              >
                Open API Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* API 1: NDVI */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-350 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[9px] font-bold text-[#14532D] bg-[#14532D]/10 px-2 py-0.5 rounded uppercase tracking-wide">POST</span>
                  <span className="bg-emerald-50 border border-emerald-150 text-[#14532D] text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">Active</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">NDVI API</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Vegetation density index to monitor overall canopy vigor.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span className="font-mono">/v1/vegetation/ndvi</span>
                <span className="font-semibold text-slate-700">1 credit</span>
              </div>
            </div>

            {/* API 2: NDRE */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-350 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[9px] font-bold text-[#14532D] bg-[#14532D]/10 px-2 py-0.5 rounded uppercase tracking-wide">POST</span>
                  <span className="bg-emerald-50 border border-emerald-150 text-[#14532D] text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">Active</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">NDRE API</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Canopy chlorophyll and nitrogen status monitoring.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span className="font-mono">/v1/vegetation/ndre</span>
                <span className="font-semibold text-slate-700">2 credits</span>
              </div>
            </div>

            {/* API 3: Weather */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-350 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[9px] font-bold text-[#14532D] bg-[#14532D]/10 px-2 py-0.5 rounded uppercase tracking-wide">POST</span>
                  <span className="bg-emerald-50 border border-emerald-150 text-[#14532D] text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">Active</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Weather API</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Centroid degree days, relative humidity and wind forecasts.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span className="font-mono">/v1/weather</span>
                <span className="font-semibold text-slate-700">1 credit</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}
