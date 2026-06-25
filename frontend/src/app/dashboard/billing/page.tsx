"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Check, Download, Zap, X, ShieldAlert } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface TransactionItem {
  id: string;
  profile_id: string;
  amount: number;
  type: string;
  payment_provider: string | null;
  payment_reference: string | null;
  created_at: string;
}

export default function DashboardBilling() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  // Supabase states
  const [balance, setBalance] = useState<number>(0)
  const [transactions, setTransactions] = useState<TransactionItem[]>([])
  
  // Modals
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  useEffect(() => {
    async function loadBillingData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        // router.push("/login")
        return
      }
      setUser(session.user)

      try {
        const userId = session.user.id

        // 1. Fetch balance
        const balanceRes = await supabase
          .from("credit_balances")
          .select("balance")
          .eq("profile_id", userId)
          .single()
          
        setBalance(balanceRes.data?.balance ?? 0)

        // 2. Fetch transaction history
        const txRes = await supabase
          .from("credit_transactions")
          .select("*")
          .eq("profile_id", userId)
          .order("created_at", { ascending: false })
          
        setTransactions(txRes.data || [])

      } catch (err) {
        console.error("Failed to load billing data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadBillingData()
  }, [router])

  // Helper to generate dynamic friendly descriptions based on transaction schema fields
  const getTransactionDescription = (tx: TransactionItem) => {
    if (tx.amount > 0) {
      if (tx.payment_provider && tx.payment_provider !== "none") {
        return `Top up via ${tx.payment_provider.toUpperCase()}`
      }
      return "Initial quota registration bonus"
    } else {
      return "API Endpoint usage charge"
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 select-none">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Billing & Quota</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage credit wallets, transaction history, and API usage budget limits.</p>
        </div>
        
        <button
          onClick={() => setBuyCreditsOpen(true)}
          className="h-10 bg-accent hover:bg-[#114524] text-white px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 custom-shadow focus:outline-none cursor-pointer"
        >
          <span>Buy Credits</span>
        </button>
      </div>

      {/* Top Wallet Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Wallet Balance Card */}
        <div className="bg-background border border-border rounded-2xl p-6 custom-shadow flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest select-none">Shared Wallet Balance</span>
            <div className="flex items-baseline gap-2 mt-3 select-all">
              <span className="text-4xl font-extrabold text-foreground tracking-tight">{balance.toLocaleString()}</span>
              <span className="text-sm font-bold text-accent">credits</span>
            </div>
            <p className="text-xs text-slate-450 mt-3.5 select-none leading-relaxed">
              These credits are shared across all active API keys generated on your account. Calls deduct credits dynamically per query cost.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 select-none">
            <button
              onClick={() => setBuyCreditsOpen(true)}
              className="w-full h-9 bg-accent hover:bg-[#114524] text-white rounded-lg text-xs font-semibold custom-shadow transition-colors cursor-pointer"
            >
              Add Wallet Funds
            </button>
          </div>
        </div>

        {/* Credit Cost Reference */}
        <div className="bg-background border border-border rounded-2xl p-6 custom-shadow flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Pricing Reference</span>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-muted-foreground font-medium">Farm boundary registration</span>
                <span className="font-bold text-foreground">0 cr (Free)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-muted-foreground font-medium">NDVI Index / Weather</span>
                <span className="font-bold text-foreground">1 cr</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-muted-foreground font-medium">NDRE / SAVI / NDWI / NDMI</span>
                <span className="font-bold text-foreground">2 cr</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground font-medium">CI Index</span>
                <span className="font-bold text-foreground">3 cr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Log Table */}
      <div className="bg-background border border-border rounded-2xl custom-shadow overflow-hidden max-w-5xl">
        <div className="p-6 border-b border-slate-100 select-none">
          <h3 className="text-sm font-bold text-foreground">Wallet Transaction History</h3>
          <p className="text-xs text-muted-foreground mt-1">Audit billing logs and quota top-ups.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-subtle border-b border-border text-xs font-semibold text-slate-505 uppercase tracking-wider select-none">
                <th className="py-3 px-6 font-sans">Date</th>
                <th className="py-3 px-6 font-sans">Type</th>
                <th className="py-3 px-6 font-sans">Amount</th>
                <th className="py-3 px-6 font-sans">Description</th>
                <th className="py-3 px-6 font-sans">Payment Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => {
                const isDebit = tx.amount < 0
                return (
                  <tr key={tx.id} className="hover:bg-subtle/40 transition-colors">
                    {/* Date */}
                    <td className="py-4 px-6 text-slate-505 font-medium select-none">
                      {new Date(tx.created_at).toLocaleDateString()} {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    {/* Type */}
                    <td className="py-4 px-6 select-none">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
                        isDebit ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                      )}>
                        {tx.type || (isDebit ? "debit" : "credit")}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className={cn(
                      "py-4 px-6 font-mono text-xs font-bold select-all",
                      isDebit ? "text-rose-650" : "text-emerald-600"
                    )}>
                      {isDebit ? "" : "+"}{tx.amount} cr
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 text-slate-650 font-medium select-none">
                      {getTransactionDescription(tx)}
                    </td>

                    {/* Payment Reference */}
                    <td className="py-4 px-6 font-mono text-xs text-muted-foreground select-all">
                      {tx.payment_reference || "N/A"}
                    </td>
                  </tr>
                )}
              )}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground select-none">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold">No transaction ledger entries recorded.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Plan Modal (Placeholder/Coming Soon) */}
      {buyCreditsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-none animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setBuyCreditsOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative bg-background border border-border rounded-3xl shadow-2xl p-7 w-full max-w-[420px] z-50 animate-in slide-in-from-top-4 duration-300 flex flex-col gap-5">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-accent rounded-full">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  Buy Quota Credits
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-normal max-w-xs mx-auto">
                  Self-serve Stripe billing packages are coming soon to the platform checkout portal.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 bg-amber-50 border border-amber-200/50 rounded-2xl select-none">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-700 leading-normal font-medium">
                Need more credits immediately for testing? Please contact support@x-agi.ai to request a free developer quota grant.
              </p>
            </div>

            {/* Close */}
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setBuyCreditsOpen(false)}
                className="h-10 bg-accent hover:bg-[#114524] text-white px-6 rounded-xl text-xs font-semibold custom-shadow transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
