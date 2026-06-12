"use client"

import React, { useState } from "react"
import { Download, X as CloseIcon, RotateCcw, CreditCard, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubscriptionItem {
  id: string;
  company: string;
  plan: "Developer" | "Professional" | "Enterprise";
  customer: string;
  mrr: string;
  renewal: string;
  status: "Active" | "Cancelled" | "Paused";
}

const initialSubscriptions: SubscriptionItem[] = [
  { id: "1", company: "AgriVision AI", plan: "Professional", customer: "Arjun Mehta", mrr: "₹4,999", renewal: "Jun 22, 2026", status: "Active" },
  { id: "2", company: "CropSense Labs", plan: "Developer", customer: "Priya Nair", mrr: "₹999", renewal: "Jun 25, 2026", status: "Active" },
  { id: "3", company: "FarmTech Delhi", plan: "Enterprise", customer: "Rohit Sharma", mrr: "₹15,000", renewal: "Jul 02, 2026", status: "Active" },
  { id: "4", company: "GreenField Co", plan: "Developer", customer: "Sanya Patel", mrr: "₹999", renewal: "Jun 18, 2026", status: "Cancelled" },
  { id: "5", company: "AgroCorp MH", plan: "Professional", customer: "Vikram Iyer", mrr: "₹4,999", renewal: "Jul 05, 2026", status: "Active" },
  { id: "6", company: "KhetWorks", plan: "Developer", customer: "Meera Krishnan", mrr: "₹999", renewal: "Jun 20, 2026", status: "Active" },
  { id: "7", company: "CropAI Labs", plan: "Professional", customer: "Aditya Singh", mrr: "₹4,999", renewal: "Jul 10, 2026", status: "Paused" },
  { id: "8", company: "FieldTech Hyd", plan: "Developer", customer: "Kavya Reddy", mrr: "₹999", renewal: "Jun 29, 2026", status: "Active" },
  { id: "9", company: "AgriSmart", plan: "Enterprise", customer: "Nikhil Joshi", mrr: "₹12,500", renewal: "Jul 04, 2026", status: "Active" },
  { id: "10", company: "FarmAPI Dev", plan: "Developer", customer: "Tanvi Desai", mrr: "₹999", renewal: "Jun 14, 2026", status: "Cancelled" },
  { id: "11", company: "CropMonitor", plan: "Professional", customer: "Suresh Kumar", mrr: "₹4,999", renewal: "Jul 01, 2026", status: "Active" },
  { id: "12", company: "AgriCloud", plan: "Developer", customer: "Divya Menon", mrr: "₹999", renewal: "Jun 28, 2026", status: "Active" }
]

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(initialSubscriptions)
  const [planFilter, setPlanFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleCancelSub = (id: string, company: string) => {
    if (window.confirm(`Are you sure you want to cancel the subscription for "${company}"?`)) {
      setSubscriptions(
        subscriptions.map((s) => {
          if (s.id === id) {
            showToast(`Subscription cancelled for ${company}`)
            return { ...s, status: "Cancelled" }
          }
          return s
        })
      )
    }
  }

  const handleResetFilters = () => {
    setPlanFilter("All")
    setStatusFilter("All")
    showToast("Filters reset to default")
  }

  const filteredSubs = subscriptions.filter((s) => {
    const planMatch = planFilter === "All" || s.plan === planFilter
    const statusMatch = statusFilter === "All" || s.status === statusFilter
    return planMatch && statusMatch
  })

  return (
    <div className="space-y-8 select-none relative">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-sm flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Active */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active Subscriptions</span>
            <div className="text-2xl font-bold text-slate-900 mt-2">847</div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-primary">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Pending */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pending Renewals</span>
            <div className="text-2xl font-bold text-slate-900 mt-2">23</div>
            <span className="text-[10px] text-slate-400 font-medium">Renewing in next 7 days</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Cancelled */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Cancelled This Month</span>
            <div className="text-2xl font-bold text-slate-900 mt-2">8</div>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Plan filter */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan Tier</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="h-9 px-3 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary font-semibold text-slate-700"
            >
              <option value="All">All Plans</option>
              <option value="Developer">Developer</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary font-semibold text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetFilters}
          className="h-9 border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 rounded-lg text-xs font-bold transition-all focus:outline-none flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6 font-sans">Company</th>
                <th className="py-3 px-6 font-sans">Plan</th>
                <th className="py-3 px-6 font-sans">Customer</th>
                <th className="py-3 px-6 font-sans">MRR</th>
                <th className="py-3 px-6 font-sans">Renewal Date</th>
                <th className="py-3 px-6 font-sans">Status</th>
                <th className="py-3 px-6 text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubs.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{row.company}</td>
                  
                  {/* Plan Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide",
                        row.plan === "Developer"
                          ? "bg-primary/10 text-primary"
                          : row.plan === "Professional"
                          ? "bg-sky-50 text-sky-700 border border-sky-100"
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      )}
                    >
                      {row.plan}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-slate-500 font-medium">{row.customer}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">{row.mrr}</td>
                  <td className="py-4 px-6 text-slate-400 font-medium">{row.renewal}</td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1",
                        row.status === "Active"
                          ? "bg-emerald-50 text-primary"
                          : row.status === "Paused"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1 h-1 rounded-full",
                          row.status === "Active"
                            ? "bg-agri"
                            : row.status === "Paused"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        )}
                      />
                      {row.status}
                    </span>
                  </td>

                  {/* Action triggers */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => showToast(`Downloading invoice statement for ${row.company}`)}
                        className="p-1.5 border border-slate-200 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary inline-flex items-center gap-1 text-xs font-semibold shadow-sm"
                        title="Download latest Invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>

                      {row.status !== "Cancelled" && (
                        <button
                          type="button"
                          onClick={() => handleCancelSub(row.id, row.company)}
                          className="p-1.5 border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 bg-white hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-rose-500 inline-flex items-center gap-1 text-xs font-semibold"
                          title="Cancel subscription"
                        >
                          <CloseIcon className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No active subscriptions match your filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
