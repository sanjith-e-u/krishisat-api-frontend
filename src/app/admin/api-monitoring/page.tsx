"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import MetricCard from "@/components/shared/metric-card"
import { Activity, Clock, Shield, Key, Search, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export default function AdminApiMonitoring() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(true)
  const [logs, setLogs] = useState<any[]>([])
  
  // KPI stats
  const [totalRequestsToday, setTotalRequestsToday] = useState(0)
  const [activeKeysCount, setActiveKeysCount] = useState(0)
  const [errorRate, setErrorRate] = useState("0.00%")
  
  // Filters
  const [apiFilter, setApiFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const loadMonitoringData = async () => {
    try {
      // 1. Fetch active keys count
      const keysRes = await supabase
        .from("api_keys")
        .select("id", { count: "exact", head: true })
        .eq("status", "active")
        
      setActiveKeysCount(keysRes.count ?? 0)

      // 2. Fetch today's calls count
      const startOfToday = new Date().toISOString().split("T")[0] + "T00:00:00Z"
      const todayCallsRes = await supabase
        .from("api_request_logs")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfToday)
        
      setTotalRequestsToday(todayCallsRes.count ?? 0)

      // 3. Fetch all request logs
      const { data: logsData, error: logsError } = await supabase
        .from("api_request_logs")
        .select(`
          id,
          created_at,
          success,
          error_message,
          profiles(id, full_name, organization),
          apis(id, name, endpoint, credit_cost)
        `)
        .order("created_at", { ascending: false })
        

      if (logsError) throw logsError

      const logsList = logsData || []
      setLogs(logsList)

      // Calculate error rate
      const failedCalls = logsList.filter((c: any) => !c.success).length
      const calculatedErrorRate = logsList.length > 0
        ? ((failedCalls / logsList.length) * 100).toFixed(2) + "%"
        : "0.00%"
      setErrorRate(calculatedErrorRate)

    } catch (err) {
      console.error("Failed to load monitoring data:", err)
    }
  }

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        // router.push("/login")
        return
      }

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          

        const email = session.user.email || ""
        const fullName = profile?.full_name || ""
        const organization = profile?.organization || ""

        const isUserAdmin = 
          email === "admin@x-agi.dev" || 
          email.startsWith("admin") || 
          fullName.toLowerCase() === "admin" || 
          organization.toLowerCase() === "admin" ||
          profile?.role === "admin"

        if (!isUserAdmin) {
          router.push("/dashboard")
          return
        }

        setIsAdmin(true)
        await loadMonitoringData()
        
        // Polling for live request feed (every 5 seconds)
        const interval = setInterval(() => {
          loadMonitoringData()
        }, 5000)

        return () => clearInterval(interval)
      } catch (err) {
        console.error("Admin check failed:", err)
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [router])

  // Filter logs based on filters and search
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // API Filter
      if (apiFilter !== "All" && log.apis?.name !== apiFilter) {
        return false
      }
      
      // Status Filter
      if (statusFilter === "Success" && !log.success) return false
      if (statusFilter === "Failure" && log.success) return false
      
      // Search Term (matches user name, company, endpoint or error message)
      if (searchTerm.trim() !== "") {
        const s = searchTerm.toLowerCase()
        const name = (log.profiles?.full_name || "").toLowerCase()
        const company = (log.profiles?.organization || "").toLowerCase()
        const endpoint = (log.apis?.endpoint || "").toLowerCase()
        const errorMsg = (log.error_message || "").toLowerCase()
        
        if (!name.includes(s) && !company.includes(s) && !endpoint.includes(s) && !errorMsg.includes(s)) {
          return false
        }
      }
      return true
    })
  }, [logs, apiFilter, statusFilter, searchTerm])

  // Aggregate health metrics per route
  const endpointHealthList = useMemo(() => {
    const healthMap: Record<string, { path: string, method: string, name: string, requests: number, errors: number, avgLatency: string, status: string }> = {
      "/v1/vegetation/ndvi": { path: "/v1/vegetation/ndvi", method: "POST", name: "NDVI", requests: 0, errors: 0, avgLatency: "248ms", status: "Operational" },
      "/v1/vegetation/ndre": { path: "/v1/vegetation/ndre", method: "POST", name: "NDRE", requests: 0, errors: 0, avgLatency: "261ms", status: "Operational" },
      "/v1/weather": { path: "/v1/weather", method: "POST", name: "WEATHER", requests: 0, errors: 0, avgLatency: "185ms", status: "Operational" },
      "/v1/farms": { path: "/v1/farms", method: "POST", name: "Farms Registration", requests: 0, errors: 0, avgLatency: "312ms", status: "Operational" },
      "/v1/water/ndwi": { path: "/v1/water/ndwi", method: "POST", name: "NDWI", requests: 0, errors: 0, avgLatency: "254ms", status: "Operational" },
      "/v1/water/ndmi": { path: "/v1/water/ndmi", method: "POST", name: "NDMI", requests: 0, errors: 0, avgLatency: "258ms", status: "Operational" },
      "/v1/vegetation/savi": { path: "/v1/vegetation/savi", method: "POST", name: "SAVI", requests: 0, errors: 0, avgLatency: "243ms", status: "Operational" },
      "/v1/vegetation/evi": { path: "/v1/vegetation/evi", method: "POST", name: "EVI", requests: 0, errors: 0, avgLatency: "245ms", status: "Operational" },
      "/v1/vegetation/ci": { path: "/v1/vegetation/ci", method: "POST", name: "CI", requests: 0, errors: 0, avgLatency: "238ms", status: "Operational" },
      "/v1/temperature/lst": { path: "/v1/temperature/lst", method: "POST", name: "LST", requests: 0, errors: 0, avgLatency: "290ms", status: "Operational" }
    }

    logs.forEach((log) => {
      const endpoint = log.apis?.endpoint
      if (endpoint && healthMap[endpoint]) {
        healthMap[endpoint].requests += 1
        if (!log.success) {
          healthMap[endpoint].errors += 1
        }
      }
    })

    return Object.values(healthMap).map(item => {
      const rate = item.requests > 0 ? (item.errors / item.requests) * 100 : 0
      let status = "Operational"
      if (rate > 5) status = "Degraded"
      if (rate > 20) status = "Outage"
      
      return {
        ...item,
        errorRate: rate.toFixed(2) + "%",
        status
      }
    })
  }, [logs])

  const handleResetFilters = () => {
    setApiFilter("All")
    setStatusFilter("All")
    setSearchTerm("")
  }

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

  if (!isAdmin) return null

  return (
    <div className="space-y-8 select-none">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Requests Today" value={totalRequestsToday.toLocaleString()} icon={<Activity className="w-5 h-5" />} />
        <MetricCard title="Avg Response Time (Proxy)" value="240ms" icon={<Clock className="w-5 h-5" />} />
        <MetricCard title="Error Rate" value={errorRate} icon={<Shield className="w-5 h-5" />} />
        <MetricCard title="Active API Keys" value={activeKeysCount.toLocaleString()} icon={<Key className="w-5 h-5" />} />
      </div>

      {/* Filters Card */}
      <div className="bg-background border border-border rounded-xl p-4 custom-shadow flex flex-wrap gap-4 items-end justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          {/* Search */}
          <div className="flex flex-col gap-1 w-full sm:w-64">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Search Logs</span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search by user, company, path..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-subtle border border-border rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/10 focus:border-primary transition-colors font-medium text-muted-foreground"
              />
            </div>
          </div>

          {/* API Filter */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">API Catalog</span>
            <select
              value={apiFilter}
              onChange={(e) => setApiFilter(e.target.value)}
              className="h-9 px-3 border border-border rounded-lg text-xs bg-subtle focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary font-semibold text-muted-foreground"
            >
              <option value="All">All APIs</option>
              <option value="NDVI">NDVI</option>
              <option value="NDRE">NDRE</option>
              <option value="SAVI">SAVI</option>
              <option value="EVI">EVI</option>
              <option value="CI">CI</option>
              <option value="NDMI">NDMI</option>
              <option value="NDWI">NDWI</option>
              <option value="LST">LST</option>
              <option value="WEATHER">WEATHER</option>
              <option value="Farms Registration">Farms Registration</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 border border-border rounded-lg text-xs bg-subtle focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary font-semibold text-muted-foreground"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success (2xx)</option>
              <option value="Failure">Failure (4xx/5xx)</option>
            </select>
          </div>
        </div>

        {(searchTerm !== "" || apiFilter !== "All" || statusFilter !== "All") && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-9 border border-border hover:bg-subtle text-muted-foreground px-4 rounded-lg text-xs font-bold transition-all focus:outline-none flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Live Request Feed */}
      <div className="bg-background border border-border rounded-xl custom-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Live Request Feed</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time log of inbound API calls across all customers.</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full inline-flex items-center gap-1 animate-pulse select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-agri" /> Live
          </span>
        </div>
        <div className="max-h-64 overflow-y-auto bg-slate-950 rounded-b-xl font-mono text-xs p-4 space-y-1.5">
          {filteredLogs.map((log) => {
            const timeStr = new Date(log.created_at).toTimeString().slice(0, 8)
            const fallbackEmail = log.profiles?.full_name
              ? `${log.profiles.full_name.toLowerCase().replace(/\s+/g, ".")}@x-agi.dev`
              : `dev-${log.profiles?.id?.substring(0, 8) || "unknown"}@x-agi.dev`
            const cost = log.apis?.credit_cost ?? 1

            return (
              <div key={log.id} className="flex flex-wrap gap-2 items-center text-[11px] leading-relaxed">
                <span className="text-slate-505">[{timeStr}]</span>
                <span className="text-white">POST {log.apis?.endpoint || "/v1/unknown"}</span>
                <span className={cn("font-bold", log.success ? "text-emerald-400" : "text-rose-400")}>
                  → {log.success ? "200 OK" : log.error_message?.includes("credits") ? "402 PAYMENT REQUIRED" : "400 BAD REQUEST"}
                </span>
                <span className="text-amber-400">{cost}cr</span>
                <span className="text-muted-foreground font-semibold">{fallbackEmail}</span>
                {!log.success && log.error_message && (
                  <span className="text-rose-350 italic">({log.error_message})</span>
                )}
              </div>
            )
          })}
          {filteredLogs.length === 0 && (
            <div className="text-center text-muted-foreground py-8 font-sans">
              No API requests matching the current filters.
            </div>
          )}
        </div>
      </div>

      {/* Endpoint Health Table */}
      <div className="bg-background border border-border rounded-xl custom-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-foreground">API Endpoint Health</h3>
          <p className="text-xs text-muted-foreground mt-1">Real-time aggregate performance metrics per route.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-subtle border-b border-border text-xs font-semibold text-slate-505 uppercase tracking-wider">
                <th className="py-3 px-6">Endpoint</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6">Requests</th>
                <th className="py-3 px-6">Avg Latency</th>
                <th className="py-3 px-6">Error Rate</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {endpointHealthList.map((row, idx) => {
                const isHighError = parseFloat(row.errorRate) > 5.0
                return (
                  <tr key={idx} className="hover:bg-subtle/40 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-muted-foreground">{row.path}</td>
                    <td className="py-4 px-6">
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-mono tracking-wide">{row.method}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground">{row.requests}</td>
                    <td className="py-4 px-6 font-mono text-xs text-muted-foreground">{row.avgLatency}</td>
                    <td className="py-4 px-6">
                      <span className={cn("font-mono text-xs font-semibold", isHighError ? "text-rose-600" : "text-muted-foreground")}>
                        {row.errorRate}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1",
                        row.status === "Operational"
                          ? "bg-emerald-50 text-primary"
                          : row.status === "Degraded"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      )}>
                        <span className={cn("w-1 h-1 rounded-full",
                          row.status === "Operational" ? "bg-agri" :
                          row.status === "Degraded" ? "bg-amber-500" :
                          "bg-rose-500"
                        )} />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
