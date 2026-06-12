"use client"

import React from "react"
import MetricCard from "@/components/shared/metric-card"
import LineChart from "@/components/shared/line-chart"
import { Users, TrendingUp, Activity, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const revenueData = [
  { label: "Jul 25", value: 6.2 },
  { label: "Aug 25", value: 7.1 },
  { label: "Sep 25", value: 7.8 },
  { label: "Oct 25", value: 8.4 },
  { label: "Nov 25", value: 9.2 },
  { label: "Dec 25", value: 10.1 },
  { label: "Jan 26", value: 9.8 },
  { label: "Feb 26", value: 10.6 },
  { label: "Mar 26", value: 11.2 },
  { label: "Apr 26", value: 11.9 },
  { label: "May 26", value: 12.3 },
  { label: "Jun 26", value: 12.84 }
]

const recentSignups = [
  { name: "Arjun Mehta", company: "AgriVision AI", plan: "Professional", date: "Jun 12, 2026" },
  { name: "Priya Nair", company: "CropSense Labs", plan: "Developer", date: "Jun 11, 2026" },
  { name: "Rohit Sharma", company: "FarmTech Delhi", plan: "Enterprise", date: "Jun 10, 2026" },
  { name: "Sanya Patel", company: "GreenField Co", plan: "Developer", date: "Jun 09, 2026" },
  { name: "Vikram Iyer", company: "AgroCorp MH", plan: "Professional", date: "Jun 08, 2026" }
]

const plansBreakdown = [
  { name: "Developer Plan", count: 612, percentage: 48 },
  { name: "Professional Plan", count: 198, percentage: 16 },
  { name: "Enterprise Plan", count: 37, percentage: 3 },
  { name: "Free Tier (Coming Soon)", count: 437, percentage: 34 }
]

export default function AdminOverview() {
  return (
    <div className="space-y-8 select-none">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value="1,284"
          trend="+34 this month"
          trendType="up"
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Monthly Revenue"
          value="₹12,84,000"
          trend="+8.2% MoM"
          trendType="up"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="API Requests"
          value="4,821,093"
          trend="+22.4% vs last month"
          trendType="up"
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricCard
          title="Active Subscriptions"
          value="847"
          trend="+12 this week"
          trendType="up"
          icon={<CreditCard className="w-5 h-5" />}
        />
      </div>

      {/* Main Sections: Chart + Top Plans */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Revenue Trend Chart Card */}
        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Trend (FY26)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly revenue trends mapped in lakhs (₹)</p>
            </div>
            <Link
              href="/admin/revenue"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
            >
              Full Revenue Audit <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-56">
            <LineChart
              data={revenueData}
              color="#22C55E"
              tooltipFormatter={(v) => `₹ ${v.toFixed(2)} Lakhs`}
            />
          </div>
        </div>

        {/* Top Plans Breakdown Card */}
        <div className="xl:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-6">Plan Allocations</h3>
            <div className="space-y-4">
              {plansBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span className="text-slate-400 font-normal">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/40">
                    <div
                      className="bg-agri h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-6 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Subscription Mix audit
            </span>
          </div>
        </div>

      </div>

      {/* Recent Activity / Signups */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Signups</h3>
            <p className="text-xs text-slate-400 mt-0.5">Latest registrations across all packages.</p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
          >
            All Accounts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6 font-sans">Name</th>
                <th className="py-3 px-6 font-sans">Company</th>
                <th className="py-3 px-6 font-sans">Plan</th>
                <th className="py-3 px-6 font-sans">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSignups.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-4 px-6 text-slate-500 font-medium">{row.company}</td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-0.5 rounded font-mono uppercase tracking-wide",
                        row.plan === "Enterprise"
                          ? "bg-amber-100 text-amber-800"
                          : row.plan === "Professional"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {row.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-medium">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
