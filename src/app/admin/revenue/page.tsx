"use client"

import React, { useState } from "react"
import MetricCard from "@/components/shared/metric-card"
import LineChart from "@/components/shared/line-chart"
import { TrendingUp, Users, CreditCard, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const data12m = [
  { label: "Jul", value: 6.2 }, { label: "Aug", value: 7.1 }, { label: "Sep", value: 7.8 },
  { label: "Oct", value: 8.4 }, { label: "Nov", value: 9.2 }, { label: "Dec", value: 10.1 },
  { label: "Jan", value: 9.8 }, { label: "Feb", value: 10.6 }, { label: "Mar", value: 11.2 },
  { label: "Apr", value: 11.9 }, { label: "May", value: 12.3 }, { label: "Jun", value: 12.84 }
]
const data6m = data12m.slice(6)
const data24m = [
  { label: "Jul 24", value: 3.1 }, { label: "Aug 24", value: 3.4 }, { label: "Sep 24", value: 3.8 },
  { label: "Oct 24", value: 4.2 }, { label: "Nov 24", value: 4.7 }, { label: "Dec 24", value: 5.1 },
  { label: "Jan 25", value: 5.4 }, { label: "Feb 25", value: 5.7 }, { label: "Mar 25", value: 5.9 },
  { label: "Apr 25", value: 6.0 }, { label: "May 25", value: 6.1 }, { label: "Jun 25", value: 6.2 },
  ...data12m
]

const planRevenue = [
  { plan: "Professional", mrr: "₹9,89,502", percentage: 77, color: "#22C55E" },
  { plan: "Enterprise", mrr: "₹1,85,126", percentage: 14, color: "#14532D" },
  { plan: "Developer", mrr: "₹6,10,620", percentage: 9, color: "#94A3B8" }
]

const planBreakdown = [
  { plan: "Developer", customers: 612, mrr: "₹6,10,620", share: "48%", avgRevenue: "₹999", renewal: "94.2%" },
  { plan: "Professional", customers: 198, mrr: "₹9,89,502", share: "77%", avgRevenue: "₹4,999", renewal: "96.8%" },
  { plan: "Enterprise", customers: 37, mrr: "₹1,85,126", share: "14%", avgRevenue: "₹5,003", renewal: "98.1%" }
]

const recentTransactions = [
  { id: "INV-2026-847", customer: "Arjun Mehta", plan: "Professional", amount: "₹4,999", date: "Jun 12, 2026" },
  { id: "INV-2026-846", customer: "Rohit Sharma", plan: "Enterprise", amount: "₹Custom", date: "Jun 11, 2026" },
  { id: "INV-2026-845", customer: "Vikram Iyer", plan: "Professional", amount: "₹4,999", date: "Jun 10, 2026" },
  { id: "INV-2026-844", customer: "Meera Krishnan", plan: "Developer", amount: "₹999", date: "Jun 09, 2026" },
  { id: "INV-2026-843", customer: "Aditya Singh", plan: "Professional", amount: "₹4,999", date: "Jun 08, 2026" },
  { id: "INV-2026-842", customer: "Nikhil Joshi", plan: "Enterprise", amount: "₹Custom", date: "Jun 07, 2026" }
]

type Range = "6M" | "12M" | "24M"

export default function AdminRevenue() {
  const [range, setRange] = useState<Range>("12M")
  const chartData = range === "6M" ? data6m : range === "24M" ? data24m : data12m

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="MRR" value="₹12,84,000" trend="+8.2%" trendType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <MetricCard title="ARR (Run Rate)" value="₹1,54,08,000" trend="+8.2%" trendType="up" icon={<CreditCard className="w-5 h-5" />} />
        <MetricCard title="Active Customers" value="847" trend="+12 this week" trendType="up" icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Monthly Churn" value="1.4%" trend="-0.3% improvement" trendType="down" icon={<TrendingDown className="w-5 h-5" />} />
      </div>

      {/* Chart + Revenue by Plan */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly recurring revenue in ₹ Lakhs</p>
            </div>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
              {(["6M", "12M", "24M"] as Range[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                    range === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <LineChart data={chartData} color="#22C55E" tooltipFormatter={(v) => `₹${v.toFixed(2)}L`} />
        </div>

        <div className="xl:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 mb-6">Revenue by Plan</h3>
          <div className="space-y-5 flex-1">
            {planRevenue.map((item) => (
              <div key={item.plan} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.plan}</span>
                  <span className="text-slate-500 font-normal">{item.mrr} — {item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Breakdown Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Plan Revenue Breakdown</h3>
          <p className="text-xs text-slate-400 mt-1">Subscription performance metrics by pricing tier.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Plan</th>
                <th className="py-3 px-6">Customers</th>
                <th className="py-3 px-6">MRR</th>
                <th className="py-3 px-6">MRR Share</th>
                <th className="py-3 px-6">Avg Revenue</th>
                <th className="py-3 px-6">Renewal Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {planBreakdown.map((row) => (
                <tr key={row.plan} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide",
                      row.plan === "Developer" ? "bg-primary/10 text-primary" :
                      row.plan === "Professional" ? "bg-sky-50 text-sky-700 border border-sky-100" :
                      "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>{row.plan}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{row.customers}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">{row.mrr}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-agri h-1.5 rounded-full" style={{ width: row.share }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{row.share}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-600">{row.avgRevenue}</td>
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-primary inline-flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-agri" /> {row.renewal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-1">Latest billing activity across all accounts.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Invoice ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Plan</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-800">{row.id}</td>
                  <td className="py-4 px-6 font-semibold text-slate-700">{row.customer}</td>
                  <td className="py-4 px-6">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide",
                      row.plan === "Developer" ? "bg-primary/10 text-primary" :
                      row.plan === "Professional" ? "bg-sky-50 text-sky-700 border border-sky-100" :
                      "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>{row.plan}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{row.amount}</td>
                  <td className="py-4 px-6 text-slate-400">{row.date}</td>
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-primary inline-flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-agri" /> Paid
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
