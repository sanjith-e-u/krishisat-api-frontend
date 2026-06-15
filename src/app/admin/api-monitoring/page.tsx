"use client"

import React, { useState, useEffect } from "react"
import MetricCard from "@/components/shared/metric-card"
import { Activity, Clock, Shield, Key } from "lucide-react"
import { cn } from "@/lib/utils"

const endpointHealth = [
  { path: "/v1/vegetation/ndvi", method: "POST", requests: "89,421", avgLatency: "248ms", p99: "412ms", errorRate: "0.01%", status: "Operational" },
  { path: "/v1/vegetation/ndre", method: "POST", requests: "44,210", avgLatency: "261ms", p99: "438ms", errorRate: "0.02%", status: "Operational" },
  { path: "/v1/weather", method: "POST", requests: "28,944", avgLatency: "185ms", p99: "298ms", errorRate: "0.01%", status: "Operational" },
  { path: "/v1/farms", method: "POST", requests: "12,841", avgLatency: "312ms", p99: "521ms", errorRate: "0.03%", status: "Operational" },
  { path: "/v1/water/ndwi", method: "POST", requests: "6,832", avgLatency: "254ms", p99: "401ms", errorRate: "0.05%", status: "Operational" },
  { path: "/v1/water/ndmi", method: "POST", requests: "5,241", avgLatency: "258ms", p99: "419ms", errorRate: "0.02%", status: "Operational" },
  { path: "/v1/vegetation/savi", method: "POST", requests: "3,821", avgLatency: "243ms", p99: "388ms", errorRate: "0.00%", status: "Operational" },
  { path: "/v1/vegetation/ci", method: "POST", requests: "2,947", avgLatency: "238ms", p99: "374ms", errorRate: "0.01%", status: "Operational" }
]

const logTemplates = [
  { endpoint: "POST /v1/vegetation/ndvi", status: "200", latency: "247ms", credits: "1cr", keyHint: "ks_live_***Xq9", type: "success" },
  { endpoint: "POST /v1/weather", status: "200", latency: "183ms", credits: "1cr", keyHint: "ks_sandbox_***4mR", type: "success" },
  { endpoint: "POST /v1/water/ndwi", status: "200", latency: "261ms", credits: "2cr", keyHint: "ks_live_***8pL", type: "success" },
  { endpoint: "POST /v1/vegetation/ndre", status: "200", latency: "254ms", credits: "2cr", keyHint: "ks_live_***2kF", type: "success" },
  { endpoint: "POST /v1/farms", status: "201", latency: "312ms", credits: "0cr", keyHint: "ks_sandbox_***7bN", type: "success" },
  { endpoint: "POST /v1/vegetation/savi", status: "200", latency: "243ms", credits: "2cr", keyHint: "ks_live_***5wM", type: "success" },
  { endpoint: "POST /v1/vegetation/ci", status: "200", latency: "238ms", credits: "3cr", keyHint: "ks_sandbox_***3nT", type: "success" }
]

function getTimestamp() {
  return new Date().toTimeString().slice(0, 8)
}

export default function AdminApiMonitoring() {
  const [logs, setLogs] = useState<Array<{ id: number; time: string; template: typeof logTemplates[0] }>>([])
  const [, setLogCounter] = useState(0)

  useEffect(() => {
    // Seed initial logs
    const initial = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      time: getTimestamp(),
      template: logTemplates[i % logTemplates.length]
    }))
    setLogs(initial)
    setLogCounter(5)

    const interval = setInterval(() => {
      setLogCounter((prev) => {
        if (prev >= 20) {
          clearInterval(interval)
          return prev
        }
        const newLog = {
          id: prev,
          time: getTimestamp(),
          template: logTemplates[prev % logTemplates.length]
        }
        setLogs((current) => [newLog, ...current].slice(0, 20))
        return prev + 1
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Requests Today" value="284,921" trend="+14.2% vs yesterday" trendType="up" icon={<Activity className="w-5 h-5" />} />
        <MetricCard title="Avg Response Time" value="238ms" trend="-3ms improvement" trendType="up" icon={<Clock className="w-5 h-5" />} />
        <MetricCard title="Error Rate" value="0.024%" trend="stable" trendType="none" icon={<Shield className="w-5 h-5" />} />
        <MetricCard title="Active API Keys" value="2,341" trend="across all customers" trendType="none" icon={<Key className="w-5 h-5" />} />
      </div>

      {/* Live Request Feed */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live Request Feed</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time log of inbound API calls across all customers.</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full inline-flex items-center gap-1 animate-pulse select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-agri" /> Live
          </span>
        </div>
        <div className="max-h-64 overflow-y-auto bg-slate-950 rounded-b-xl font-mono text-xs p-4 space-y-1.5">
          {logs.map((log) => (
            <div key={log.id} className="flex flex-wrap gap-2 items-center text-[11px] leading-relaxed">
              <span className="text-slate-500">[{log.time}]</span>
              <span className="text-white">{log.template.endpoint}</span>
              <span className="text-sky-400">→ {log.template.status}</span>
              <span className="text-slate-400">{log.template.latency}</span>
              <span className="text-amber-400">{log.template.credits}</span>
              <span className="text-slate-600">{log.template.keyHint}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoint Health Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">API Endpoint Health</h3>
          <p className="text-xs text-slate-400 mt-1">24-hour aggregate performance metrics per route.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Endpoint</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6">Requests (24h)</th>
                <th className="py-3 px-6">Avg Latency</th>
                <th className="py-3 px-6">P99 Latency</th>
                <th className="py-3 px-6">Error Rate</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {endpointHealth.map((row, idx) => {
                const isHighError = parseFloat(row.errorRate) > 0.03
                return (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-700">{row.path}</td>
                    <td className="py-4 px-6">
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-mono tracking-wide">{row.method}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{row.requests}</td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-600">{row.avgLatency}</td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">{row.p99}</td>
                    <td className="py-4 px-6">
                      <span className={cn("font-mono text-xs font-semibold", isHighError ? "text-rose-600" : "text-slate-600")}>
                        {row.errorRate}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-primary inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-agri" /> {row.status}
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
