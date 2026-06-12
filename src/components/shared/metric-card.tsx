import React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

export interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: "up" | "down" | "none";
  icon: React.ReactNode;
}

export default function MetricCard({ title, value, trend, trendType = "none", icon }: MetricCardProps) {
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
                <TrendingDown className="w-3.5 h-3.5" /> {trend}
              </span>
            )}
            <span className="text-slate-400 font-medium">vs last period</span>
          </div>
        )}
      </div>
    </div>
  )
}
