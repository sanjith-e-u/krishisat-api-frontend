"use client"

import React, { useState } from "react"
import { CreditCard, Check, Download, ArrowUpRight, Lock, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface InvoiceItem {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

const initialInvoices: InvoiceItem[] = [
  { id: "INV-2026-003", date: "Jun 10, 2026", amount: "$15.40", status: "Paid" },
  { id: "INV-2026-002", date: "May 10, 2026", amount: "$8.20", status: "Paid" },
  { id: "INV-2026-001", date: "Apr 10, 2026", amount: "$12.80", status: "Paid" }
]

export default function DashboardBilling() {
  const [plan, setPlan] = useState<"Free" | "Pay-as-you-go" | "Enterprise">("Free")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlanTier, setSelectedPlanTier] = useState<"Free" | "Pay-as-you-go" | "Enterprise">("Free")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleUpgrade = (tier: "Free" | "Pay-as-you-go" | "Enterprise") => {
    setPlan(tier)
    setSelectedPlanTier(tier)
    setModalOpen(false)
    showToast(`Successfully switched to the ${tier} Plan!`)
  }

  const handleDownloadInvoice = (invId: string) => {
    showToast(`Downloading invoice ${invId} PDF...`)
  }

  const planCredits = {
    Free: { limit: 1000, remaining: 850, price: "$0/mo" },
    "Pay-as-you-go": { limit: 100000, remaining: 98450, price: "$0.005/credit" },
    Enterprise: { limit: 1000000, remaining: 998500, price: "Custom" }
  }

  const currentPlanDetails = planCredits[plan]
  const usagePercentage = ((currentPlanDetails.limit - currentPlanDetails.remaining) / currentPlanDetails.limit) * 100

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Quota</h1>
          <p className="text-sm text-slate-500 mt-1">Manage subscriptions, invoice histories, and payment information.</p>
        </div>
        
        <button
          onClick={() => {
            setSelectedPlanTier(plan)
            setModalOpen(true)
          }}
          className="h-10 bg-[#14532D] hover:bg-[#114524] text-white px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm focus:outline-none"
        >
          <span>Upgrade Subscription</span>
        </button>
      </div>

      {/* Top Grid: Plan Info + Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        
        {/* Active Subscription Plan */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Plan</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{plan} Plan</h3>
              </div>
              <span className="text-sm font-extrabold text-[#14532D] bg-[#14532D]/5 px-3 py-1 rounded-full font-mono">
                {currentPlanDetails.price}
              </span>
            </div>

            {/* Progress bar info */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                <span>Quota Consumed</span>
                <span>{currentPlanDetails.remaining.toLocaleString()} of {currentPlanDetails.limit.toLocaleString()} calls left</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/40">
                <div
                  className="bg-[#22C55E] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, 100 - usagePercentage)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Renews automatically on <span className="font-semibold text-slate-600">July 10, 2026</span>.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
            <button
              onClick={() => {
                setSelectedPlanTier(plan)
                setModalOpen(true)
              }}
              className="flex-1 h-9 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-all focus:outline-none flex items-center justify-center gap-1.5"
            >
              Change Plan <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Payment Method Details */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Payment Method</span>
            
            <div className="flex gap-4 mt-5 items-center">
              <div className="w-14 h-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-white shrink-0 shadow-inner">
                <CreditCard className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-sans">Visa ending in 4242</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Expires 12 / 2028</p>
              </div>
            </div>

            <div className="mt-5 space-y-1 text-xs text-slate-505 leading-normal">
              <p className="font-semibold text-slate-705">Billing Address:</p>
              <p>KrishiSat Agritech solutions, Sector 5</p>
              <p>New Delhi, DL 110001</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
            <button
              onClick={() => showToast("Payment editor is disabled in prototype mode.")}
              className="flex-1 h-9 border border-slate-200 hover:bg-slate-50 text-slate-605 rounded-lg text-xs font-bold transition-all focus:outline-none"
            >
              Update Details
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Logs */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Billing History</h3>
          <p className="text-xs text-slate-400 mt-1">Audit billing logs and download historical invoice files.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-505 uppercase tracking-wider">
                <th className="py-3 px-6 font-sans">Invoice ID</th>
                <th className="py-3 px-6 font-sans">Billing Date</th>
                <th className="py-3 px-6 font-sans">Amount</th>
                <th className="py-3 px-6 font-sans">Status</th>
                <th className="py-3 px-6 text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/40 transition-colors">
                  {/* ID */}
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-805">
                    {inv.id}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-505 font-medium">
                    {inv.date}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 text-slate-705 font-bold">
                    {inv.amount}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#14532D] inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      {inv.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="p-1.5 border border-slate-200 text-slate-505 hover:text-slate-905 bg-white hover:bg-slate-50 rounded-lg transition-colors focus:outline-none inline-flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          />

          {/* Modal Card */}
          <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-[850px] z-50 animate-in slide-in-from-top-4 duration-300 flex flex-col max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Select Developer Plan</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Scale your agricultural computational bandwidth with flexible limits.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Plans Tier Comparison List */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Plan: Free Tier */}
              <div
                onClick={() => setSelectedPlanTier("Free")}
                className={cn(
                  "border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all relative",
                  selectedPlanTier === "Free"
                    ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                {plan === "Free" && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold text-[#14532D] bg-[#14532D]/10 px-2 py-0.5 rounded uppercase tracking-wide">
                    Active
                  </span>
                )}
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Free</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Perfect for prototype and pre-seed developers.</p>
                  
                  <div className="my-4">
                    <span className="text-2xl font-black text-slate-900">$0</span>
                    <span className="text-xs text-slate-400 font-medium"> / month</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-200/50 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>1,000 monthly calls</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Core vegetation indexes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Standard API Latency</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUpgrade("Free")
                  }}
                  className={cn(
                    "w-full h-9 rounded-lg text-xs font-bold transition-colors mt-6 border focus:outline-none",
                    plan === "Free"
                      ? "bg-white border-slate-200 text-slate-505 cursor-default"
                      : "bg-[#14532D] hover:bg-[#114524] text-white border-transparent"
                  )}
                  disabled={plan === "Free"}
                >
                  {plan === "Free" ? "Current Plan" : "Choose Plan"}
                </button>
              </div>

              {/* Plan: Pay-as-you-go Tier */}
              <div
                onClick={() => setSelectedPlanTier("Pay-as-you-go")}
                className={cn(
                  "border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all relative",
                  selectedPlanTier === "Pay-as-you-go"
                    ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                {plan === "Pay-as-you-go" && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold text-[#14532D] bg-[#14532D]/10 px-2 py-0.5 rounded uppercase tracking-wide">
                    Active
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-extrabold text-slate-900">Pay-as-you-go</h4>
                    <span className="bg-emerald-50 border border-emerald-100 text-[#14532D] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Popular</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">For production monitoring applications.</p>
                  
                  <div className="my-4">
                    <span className="text-2xl font-black text-slate-900">$0.005</span>
                    <span className="text-xs text-slate-400 font-medium"> / credit</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-200/50 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>$0.005 per credit consumed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>All index registers + forecasts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Prioritized API speeds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Email & Slack support</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUpgrade("Pay-as-you-go")
                  }}
                  className={cn(
                    "w-full h-9 rounded-lg text-xs font-bold transition-colors mt-6 border focus:outline-none",
                    plan === "Pay-as-you-go"
                      ? "bg-white border-slate-200 text-slate-505 cursor-default"
                      : "bg-[#14532D] hover:bg-[#114524] text-white border-transparent"
                  )}
                  disabled={plan === "Pay-as-you-go"}
                >
                  {plan === "Pay-as-you-go" ? "Current Plan" : "Choose Plan"}
                </button>
              </div>

              {/* Plan: Enterprise Tier */}
              <div
                onClick={() => setSelectedPlanTier("Enterprise")}
                className={cn(
                  "border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all relative",
                  selectedPlanTier === "Enterprise"
                    ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                {plan === "Enterprise" && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold text-[#14532D] bg-[#14532D]/10 px-2 py-0.5 rounded uppercase tracking-wide">
                    Active
                  </span>
                )}
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Enterprise</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">For corporate scale sensory grid pipelines.</p>
                  
                  <div className="my-4">
                    <span className="text-2xl font-black text-slate-900">Custom</span>
                    <span className="text-xs text-slate-400 font-medium"> / contact us</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-200/50 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Custom volume limits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Dedicated analytical math grids</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Sub-150ms response guarantees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>Dedicated solutions architect</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUpgrade("Enterprise")
                  }}
                  className={cn(
                    "w-full h-9 rounded-lg text-xs font-bold transition-colors mt-6 border focus:outline-none",
                    plan === "Enterprise"
                      ? "bg-white border-slate-200 text-slate-550 cursor-default"
                      : "bg-[#14532D] hover:bg-[#114524] text-white border-transparent"
                  )}
                  disabled={plan === "Enterprise"}
                >
                  {plan === "Enterprise" ? "Current Plan" : "Contact Sales"}
                </button>
              </div>

            </div>

            {/* Secure Notice */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Secure 256-bit SSL checkout. Cancel or modify anytime.</span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="h-8 px-4 text-xs font-semibold hover:bg-slate-100 rounded-lg text-slate-605 transition-colors focus:outline-none"
              >
                Dismiss
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
