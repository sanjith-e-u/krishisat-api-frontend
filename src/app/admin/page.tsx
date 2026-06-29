"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Users, Code, Activity, Zap, ShieldAlert, ArrowRight } from "lucide-react"
import Link from "next/link"
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
        <div className="p-2.5 bg-subtle border border-slate-100 rounded-lg text-slate-650">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-foreground tracking-tight">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground font-medium">
            {trend}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminOverview() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // Platform metric states
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalKeys, setTotalKeys] = useState<number>(0)
  const [callsToday, setCallsToday] = useState<number>(0)
  const [callsMonth, setCallsMonth] = useState<number>(0)
  const [creditsConsumedMonth, setCreditsConsumedMonth] = useState<number>(0)
  
  // Lists
  const [recentUsers, setRecentUsers] = useState<any[]>([])

  useEffect(() => {
    async function checkAdminAndLoadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        // router.push("/login")
        return
      }

      try {
        // The server-side layout.tsx already guarantees the user is an admin.
        // Proceed directly to loading dashboard statistics.

        // 1. Fetch total registered users
        const usersCountRes = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          
        setTotalUsers(usersCountRes.count ?? 0)

        // 2. Fetch total API keys
        const keysCountRes = await supabase
          .from("api_keys")
          .select("*", { count: "exact", head: true })
          
        setTotalKeys(keysCountRes.count ?? 0)

        // 3. Fetch API calls today
        const startOfToday = new Date().toISOString().split("T")[0] + "T00:00:00Z"
        const todayCallsRes = await supabase
          .from("api_request_logs")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfToday)
          
        setCallsToday(todayCallsRes.count ?? 0)

        // 4. Fetch API calls this month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
        const monthCallsRes = await supabase
          .from("api_request_logs")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfMonth)
          
        setCallsMonth(monthCallsRes.count ?? 0)

        // 5. Fetch total credits deducted this month (negative values)
        const deductionsRes = await supabase
          .from("credit_transactions")
          .select("amount")
          .lt("amount", 0)
          .gte("created_at", startOfMonth)
          
        const totalDeducted = Math.abs(deductionsRes.data?.reduce((acc, t) => acc + (t.amount || 0), 0) || 0)
        setCreditsConsumedMonth(totalDeducted)

        // 6. Fetch 5 most recent signups
        const recentUsersRes = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5)
          
        setRecentUsers(recentUsersRes.data || [])

      } catch (err) {
        console.error("Admin overview fetch failed:", err)
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    checkAdminAndLoadData()
  }, [router])

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
    <div className="space-y-8 select-none">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Platform Admin Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform aggregate statistics and audit analytics.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="API Keys Generated"
          value={totalKeys.toLocaleString()}
          icon={<Code className="w-5 h-5" />}
        />
        <MetricCard
          title="Calls Today"
          value={callsToday.toLocaleString()}
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricCard
          title="Calls (Month)"
          value={callsMonth.toLocaleString()}
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricCard
          title="Credits Consumed (Month)"
          value={`${creditsConsumedMonth.toLocaleString()} cr`}
          icon={<Zap className="w-5 h-5" />}
        />
      </div>

      {/* Recent Activity / Signups */}
      <div className="bg-background border border-border rounded-2xl custom-shadow overflow-hidden max-w-5xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-foreground">Recent Platform Signups</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Latest registrations across all packages.</p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 focus:outline-none"
          >
            All Accounts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-subtle border-b border-border text-xs font-semibold text-slate-505 uppercase tracking-wider select-none">
                <th className="py-3 px-6 font-sans">Full Name</th>
                <th className="py-3 px-6 font-sans">Organization</th>
                <th className="py-3 px-6 font-sans">User ID</th>
                <th className="py-3 px-6 font-sans">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentUsers.map((row, idx) => (
                <tr key={row.id} className="hover:bg-subtle/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">{row.full_name || "New Developer"}</td>
                  <td className="py-4 px-6 text-muted-foreground font-medium">{row.organization || "N/A"}</td>
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground select-all">{row.id}</td>
                  <td className="py-4 px-6 text-muted-foreground font-medium select-none">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-muted-foreground select-none">
                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold">No registered users found in directory.</p>
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
