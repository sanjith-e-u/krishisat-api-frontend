"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

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
    <div className="bg-background border border-border rounded-xl p-6 custom-shadow">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">{title}</span>
        <div className="p-2.5 bg-subtle border border-slate-100 rounded-lg text-muted-foreground">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-foreground tracking-tight">{value}</div>
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
            <span className="text-muted-foreground font-medium">vs last month</span>
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
        <h2 className="text-lg font-bold text-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default function DashboardOverview() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  // Real data states
  const [creditBalance, setCreditBalance] = useState<number>(0)
  const [totalKeysCount, setTotalKeysCount] = useState<number>(0)
  const [callsThisMonth, setCallsThisMonth] = useState<number>(0)
  const [apisPurchasedCount, setApisPurchasedCount] = useState<number>(0)
  const [recentLogs, setRecentLogs] = useState<any[]>([])

  // Chart state
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    async function loadOverviewData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        // router.push("/login")
        return
      }
      setUser(session.user)

      try {
        const userId = session.user.id

        // 1. Fetch credit balance
        const balanceRes = await supabase
          .from("credit_balances")
          .select("balance")
          .eq("profile_id", userId)
          .single()
          
        setCreditBalance(balanceRes.data?.balance ?? 0)

        // 2. Fetch total API keys
        const keysRes = await supabase
          .from("api_keys")
          .select("id, api_id, status")
          .eq("profile_id", userId)
          
        const keysList = keysRes.data || []
        setTotalKeysCount(keysList.length)

        // 3. Count APIs purchased (distinct api_id with active keys)
        const activeKeys = keysList.filter((k) => k.status === "active")
        const distinctApiIds = new Set(activeKeys.map((k) => k.api_id))
        setApisPurchasedCount(distinctApiIds.size)

        // 4. Fetch logs this month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
        const monthlyCallsRes = await supabase
          .from("api_request_logs")
          .select("id")
          .eq("profile_id", userId)
          .gte("created_at", startOfMonth)
          
        setCallsThisMonth(monthlyCallsRes.data?.length ?? 0)

        // 5. Fetch last 5 logs joined with apis
        const recentLogsRes = await supabase
          .from("api_request_logs")
          .select("*, apis(name, endpoint)")
          .eq("profile_id", userId)
          .order("created_at", { ascending: false })
          .limit(5)
          
        setRecentLogs(recentLogsRes.data || [])

      } catch (err) {
        console.error("Error loading workspace overview data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadOverviewData()
  }, [router])

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <svg className="animate-spin h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-8 relative">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Workspace Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time status of your agricultural telemetry operations.</p>
        </div>

        {/* Dynamic KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Credits Remaining"
            value={creditBalance.toLocaleString()}
            icon={<Zap className="w-5 h-5" />}
          />
          <MetricCard
            title="Total API Keys"
            value={totalKeysCount.toString()}
            icon={<Code className="w-5 h-5" />}
          />
          <MetricCard
            title="API Calls (Month)"
            value={callsThisMonth.toLocaleString()}
            icon={<Activity className="w-5 h-5" />}
          />
          <MetricCard
            title="APIs Purchased"
            value={apisPurchasedCount.toString()}
            icon={<Database className="w-5 h-5" />}
          />
        </div>

        {/* Main Grid: Chart + Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Usage Chart Card - Left Column */}
          <div className="xl:col-span-8 bg-background border border-border rounded-xl p-6 custom-shadow">
            <SectionHeader
              title="API Requests"
              subtitle="Total programmatic requests recorded over the last 30 days"
              action={
                <Link
                  href="/dashboard/usage"
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
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
                  <span className="text-muted-foreground font-mono text-[9px] uppercase font-bold">{hoveredPoint.label}</span>
                  <span className="font-bold text-[#22C55E]">{hoveredPoint.value.toLocaleString()} calls</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="bg-background border border-border rounded-xl p-6 custom-shadow flex flex-col justify-between flex-grow">
              <div>
                <SectionHeader title="Recent Activity" subtitle="Outbound developer request logs" />
                
                {recentLogs.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground select-none">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-slate-350" />
                    <p className="text-xs font-semibold">No recent activity logs recorded.</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {recentLogs.map((log) => {
                      const apiName = log.apis?.name || "Unknown API"
                      const endpoint = log.apis?.endpoint || log.endpoint || "/v1"
                      const cost = log.success ? "Charged" : "0 credits"

                      return (
                        <li key={log.id} className="flex justify-between items-start py-1 border-b border-slate-50 last:border-b-0">
                          <div>
                            <h4 className="text-xs font-bold text-foreground">{apiName} API Called</h4>
                            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">POST {endpoint}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-muted-foreground font-medium font-sans block">
                              {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className={cn(
                              "text-[10px] font-bold mt-0.5 inline-block px-1.5 py-0.5 rounded",
                              log.success ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"
                            )}>
                              {log.success ? "Success" : "Failed"}
                            </span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center select-none text-[10px]">
                <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded inline-block">
                  ● Gateway Connected
                </span>
                <span className="text-muted-foreground font-mono">
                  region: ap-south-1
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* API Catalog Quick Links */}
        <div>
          <SectionHeader
            title="Operational Indices"
            subtitle="Current active telemetry index products available"
            action={
              <Link
                href="/marketplace"
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
              >
                Open API Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* NDVI Card */}
            <div className="bg-background border border-border rounded-xl p-5 custom-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3 select-none">
                  <span className="font-mono text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wide">POST</span>
                  <span className="bg-emerald-50 border border-emerald-150 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">Active</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">NDVI API</h4>
                <p className="text-xs text-slate-505 mt-1 leading-relaxed">Vegetation density index representing overall canopy greenness, biomass and chlorophyll.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-muted-foreground select-none">
                <span className="font-mono">/v1/vegetation/ndvi</span>
                <span className="font-semibold text-muted-foreground">1 credit</span>
              </div>
            </div>

            {/* NDRE Card */}
            <div className="bg-background border border-border rounded-xl p-5 custom-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3 select-none">
                  <span className="font-mono text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wide">POST</span>
                  <span className="bg-emerald-50 border border-emerald-150 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">Active</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">NDRE API</h4>
                <p className="text-xs text-slate-505 mt-1 leading-relaxed">Red Edge Index optimized for crop nitrogen logging and dense canopy insights.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-muted-foreground select-none">
                <span className="font-mono">/v1/vegetation/ndre</span>
                <span className="font-semibold text-muted-foreground">2 credits</span>
              </div>
            </div>

            {/* Weather Card */}
            <div className="bg-background border border-border rounded-xl p-5 custom-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3 select-none">
                  <span className="font-mono text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wide">POST</span>
                  <span className="bg-emerald-50 border border-emerald-150 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">Active</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">Weather API</h4>
                <p className="text-xs text-slate-505 mt-1 leading-relaxed">Hyperlocal meteorological telemetry including GDD calculations, rainfall, and wind speeds.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-muted-foreground select-none">
                <span className="font-mono">/v1/weather</span>
                <span className="font-semibold text-muted-foreground">1 credit</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}
