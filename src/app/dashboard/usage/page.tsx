"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Activity, Clock, CheckCircle, Zap, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface RequestLogItem {
  id: string;
  profile_id: string;
  api_id: string;
  success: boolean;
  error_message: string | null;
  created_at: string;
  apis?: {
    name: string;
    endpoint: string;
    credit_cost: number;
  };
}

interface EndpointBreakdownItem {
  name: string;
  path: string;
  method: string;
  calls: number;
  percentage: number;
  credits: number;
  successRate: string;
}

export default function UsageAnalytics() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [logs, setLogs] = useState<RequestLogItem[]>([])
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d")

  // Fetch session and logs
  useEffect(() => {
    async function loadLogs() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        router.push("/login")
        return
      }
      setUser(session.user)

      try {
        const { data, error } = await supabase
          .from("api_request_logs")
          .select("*, apis(name, endpoint, credit_cost)")
          .eq("profile_id", session.user.id)
          .order("created_at", { ascending: false })
          

        if (error) throw error
        if (data) setLogs(data)
      } catch (err) {
        console.error("Failed to load request logs:", err)
      } finally {
        setLoading(false)
      }
    }

    loadLogs()
  }, [router])

  // Filter logs based on selected timeRange
  const getFilteredLogs = () => {
    const now = new Date()
    return logs.filter((log) => {
      const logDate = new Date(log.created_at)
      if (timeRange === "7d") {
        const diffTime = Math.abs(now.getTime() - logDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
      } else if (timeRange === "30d") {
        const diffTime = Math.abs(now.getTime() - logDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 30
      }
      return true // 'all'
    })
  }

  const activeLogs = getFilteredLogs()

  // Calculate Metrics
  const totalCalls = activeLogs.length
  const successfulCalls = activeLogs.filter((l) => l.success).length
  const successRate = totalCalls > 0 ? ((successfulCalls / totalCalls) * 100).toFixed(2) : "100.00"
  
  const totalCreditsUsed = activeLogs.reduce((acc, log) => {
    if (log.success && log.apis) {
      return acc + (log.apis.credit_cost || 0)
    }
    return acc
  }, 0)

  // CSV Exporter
  const handleExportCSV = () => {
    if (activeLogs.length === 0) return
    const headers = ["Timestamp", "API Name", "Endpoint", "Success", "Error Message", "Credits Spent"];
    const rows = activeLogs.map((log) => [
      log.created_at,
      log.apis?.name || "Unknown",
      log.apis?.endpoint || "/v1",
      log.success ? "true" : "false",
      log.error_message || "",
      log.success ? (log.apis?.credit_cost || 0) : 0
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `krishisat-usage-${timeRange}-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Group by Endpoint Breakdown
  const endpointGroups: { [apiId: string]: RequestLogItem[] } = {}
  activeLogs.forEach((log) => {
    const apiId = log.api_id
    if (!endpointGroups[apiId]) {
      endpointGroups[apiId] = []
    }
    endpointGroups[apiId].push(log)
  })

  const endpointBreakdown: EndpointBreakdownItem[] = []
  Object.keys(endpointGroups).forEach((apiId) => {
    const group = endpointGroups[apiId]
    const sample = group[0]
    const apiName = sample.apis?.name || "Unknown API"
    const apiEndpoint = sample.apis?.endpoint || "/v1"
    const cost = sample.apis?.credit_cost || 0
    
    const apiCalls = group.length
    const share = totalCalls > 0 ? Math.round((apiCalls / totalCalls) * 100) : 0
    const apiSuccess = group.filter((g) => g.success).length
    const apiSuccessRate = apiCalls > 0 ? ((apiSuccess / apiCalls) * 100).toFixed(2) + "%" : "100.00%"
    
    const apiCredits = group.reduce((acc, log) => {
      if (log.success && log.apis) {
        return acc + (log.apis.credit_cost || 0)
      }
      return acc
    }, 0)

    endpointBreakdown.push({
      name: apiName,
      path: apiEndpoint,
      method: "POST",
      calls: apiCalls,
      percentage: share,
      credits: apiCredits,
      successRate: apiSuccessRate
    })
  })

  // Sort by request volume
  endpointBreakdown.sort((a, b) => b.calls - a.calls)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <svg className="animate-spin h-8 w-8 text-[#14532D]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 select-none">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Usage Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Detailed logging and consumption metrics for your API applications.</p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              disabled={activeLogs.length === 0}
              className="h-9 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              Export CSV
            </button>

            {/* Timeframe selector */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
              <button
                onClick={() => setTimeRange("7d")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
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
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                  timeRange === "30d"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange("all")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                  timeRange === "all"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                All Time
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: API Requests */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">API Requests</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{totalCalls.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 font-medium">
                Total requests made this period
              </div>
            </div>
          </div>

          {/* Card 2: Success Rate */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Success Rate</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{successRate}%</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 font-medium">
                Success rate over this timeframe
              </div>
            </div>
          </div>

          {/* Card 3: Credits Used */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Credits Consumed</span>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{totalCreditsUsed.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 font-medium">
                Total credits deducted from balance
              </div>
            </div>
          </div>
        </div>

        {/* Endpoint Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Endpoint Request Breakdown</h3>
            <p className="text-xs text-slate-400 mt-1">Telemetry calls sorted by route volume.</p>
          </div>

          {endpointBreakdown.length === 0 ? (
            <div className="py-16 text-center select-none">
              <Activity className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No telemetry log entries found.</p>
              <p className="text-xs text-slate-450 mt-1.5 max-w-xs mx-auto">
                Once you integrate generated keys and request indices, statistics will populate here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider select-none">
                    <th className="py-3 px-6 font-sans">API Name & Route</th>
                    <th className="py-3 px-6 font-sans">Total Requests</th>
                    <th className="py-3 px-6 font-sans">Traffic Share</th>
                    <th className="py-3 px-6 font-sans">Credits Charged</th>
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
                        <span className="block text-[10px] text-slate-400 font-sans mt-0.5">{row.name} API</span>
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
                      <td className="py-4 px-6 font-medium text-slate-650 font-mono text-xs">
                        {row.credits.toLocaleString()} cr
                      </td>

                      {/* Success Rate */}
                      <td className="py-4 px-6">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#14532D] inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                          {row.successRate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

    </div>
  )
}
