"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Download, Eye, ShieldAlert, ShieldCheck, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

interface UserItem {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Developer" | "Professional" | "Enterprise";
  status: "Active" | "Suspended";
  created: string;
  balance: number;
  keysCount: number;
  callsCount: number;
}

export default function AdminUsers() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const itemsPerPage = 8

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const loadData = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(`
          id,
          full_name,
          organization,
          created_at,
          role,
          credit_balances(balance),
          api_keys(id, status),
          api_request_logs(id)
        `)
        .order("created_at", { ascending: false })
        

      if (error) throw error

      const mappedUsers: UserItem[] = (profiles || []).map((p: any) => {
        // credit_balances has 1-to-1 relationship, so it is an object in python, let's support either object or array
        let balance = 0
        if (p.credit_balances) {
          if (Array.isArray(p.credit_balances)) {
            balance = p.credit_balances[0]?.balance ?? 0
          } else {
            balance = (p.credit_balances as any).balance ?? 0
          }
        }
        const keysList = p.api_keys || []
        const logsList = p.api_request_logs || []
        
        let plan: "Developer" | "Professional" | "Enterprise" = "Developer"
        if (balance >= 5000) plan = "Enterprise"
        else if (balance >= 2000) plan = "Professional"

        const status = p.role === "suspended" ? "Suspended" : "Active"
        
        const fallbackName = p.full_name || "New Developer"
        const email = p.full_name 
          ? `${p.full_name.toLowerCase().replace(/\s+/g, ".")}@x-agi.dev` 
          : `dev-${p.id.substring(0, 8)}@x-agi.dev`

        return {
          id: p.id,
          name: fallbackName,
          email,
          company: p.organization || "N/A",
          plan,
          status,
          created: new Date(p.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          }),
          balance,
          keysCount: keysList.length,
          callsCount: logsList.length
        }
      })

      setUsers(mappedUsers)
    } catch (err: any) {
      console.error("Failed to load users:", err)
      showToast("Error loading user data from database.")
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
        // The server-side layout.tsx already guarantees the user is an admin.
        await loadData()
      } catch (err) {
        console.error("Admin check failed:", err)
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [router])

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const s = searchTerm.toLowerCase()
      return (
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.company.toLowerCase().includes(s)
      )
    })
  }, [users, searchTerm])

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredUsers.slice(start, start + itemsPerPage)
  }, [filteredUsers, currentPage])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1

  const handleToggleStatus = async (id: string, currentStatus: "Active" | "Suspended") => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active"
    const targetRole = newStatus === "Suspended" ? "suspended" : null
    const targetKeyStatus = newStatus === "Suspended" ? "inactive" : "active"
    const currentKeyStatus = newStatus === "Suspended" ? "active" : "inactive"

    try {
      // 1. Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ role: targetRole })
        .eq("id", id)
        

      if (profileError) throw profileError

      // 2. Update api_keys table status to suspend/reactivate API keys
      const { error: keysError } = await supabase
        .from("api_keys")
        .update({ status: targetKeyStatus })
        .eq("profile_id", id)
        .eq("status", currentKeyStatus)
        

      if (keysError) throw keysError

      showToast(`User status updated to ${newStatus}`)
      await loadData()
    } catch (err: any) {
      console.error("Failed to update status:", err)
      showToast("Error updating user status in database.")
    }
  }

  const handleDeleteUser = async (id: string, name: string) => {
    if (window.confirm(`Permanently delete the developer account for "${name}"? This action cannot be undone.`)) {
      try {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", id)
          

        if (error) throw error

        showToast(`Successfully deleted ${name}`)
        await loadData()
      } catch (err: any) {
        console.error("Failed to delete user profile:", err)
        showToast("Error deleting profile. Admin permissions may be required.")
      }
    }
  }

  const handleExportCSV = () => {
    if (users.length === 0) {
      showToast("No user data available to export.")
      return
    }
    const headers = ["User ID", "Name", "Email", "Company", "Plan", "Status", "Credits Balance", "API Keys Count", "API Calls Count", "Created At"]
    const rows = users.map(u => [
      u.id,
      u.name,
      u.email,
      u.company,
      u.plan,
      u.status,
      u.balance,
      u.keysCount,
      u.callsCount,
      u.created
    ])
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `x-agi_users_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    showToast("CSV export completed successfully.")
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
    <div className="space-y-8 select-none relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl custom-shadow flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">All registered developer accounts across X-AGI.</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Search bar */}
          <div className="relative w-56 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-subtle border border-border rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/10 focus:border-primary transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 border border-border hover:bg-subtle text-muted-foreground px-4 rounded-lg text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-1.5 custom-shadow shadow-slate-100"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-background border border-border rounded-xl custom-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-subtle border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-6 font-sans">Name</th>
                <th className="py-3 px-6 font-sans">Email</th>
                <th className="py-3 px-6 font-sans">Company</th>
                <th className="py-3 px-6 font-sans">Plan</th>
                <th className="py-3 px-6 font-sans">Credits</th>
                <th className="py-3 px-6 font-sans">API Keys</th>
                <th className="py-3 px-6 font-sans">API Calls</th>
                <th className="py-3 px-6 font-sans">Status</th>
                <th className="py-3 px-6 font-sans">Created</th>
                <th className="py-3 px-6 text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.map((row) => (
                <tr key={row.id} className="hover:bg-subtle/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">{row.name}</td>
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground select-all">{row.email}</td>
                  <td className="py-4 px-6 text-muted-foreground font-medium">{row.company}</td>
                  
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

                  {/* Credits, API Keys, API Calls */}
                  <td className="py-4 px-6 font-bold text-muted-foreground">{row.balance.toLocaleString()} cr</td>
                  <td className="py-4 px-6 font-semibold text-muted-foreground">{row.keysCount}</td>
                  <td className="py-4 px-6 font-semibold text-muted-foreground">{row.callsCount}</td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1",
                        row.status === "Active"
                          ? "bg-emerald-50 text-primary"
                          : "bg-rose-50 text-rose-700"
                      )}
                    >
                      <span className={cn("w-1 h-1 rounded-full", row.status === "Active" ? "bg-agri" : "bg-rose-500")} />
                      {row.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-muted-foreground font-medium">{row.created}</td>

                  {/* Actions buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => showToast(`Developer ID: ${row.id}`)}
                        className="p-2 border border-border text-muted-foreground hover:text-muted-foreground hover:bg-subtle rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
                        aria-label={`View ${row.name} profile`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(row.id, row.status)}
                        className={cn(
                          "p-2 border rounded-lg transition-colors focus:outline-none focus:ring-1",
                          row.status === "Active"
                            ? "border-border text-muted-foreground hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100"
                            : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                        )}
                        aria-label={row.status === "Active" ? `Suspend ${row.name}` : `Activate ${row.name}`}
                      >
                        {row.status === "Active" ? (
                          <ShieldAlert className="w-3.5 h-3.5" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(row.id, row.name)}
                        className="p-2 border border-border text-muted-foreground hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-rose-500"
                        aria-label={`Delete ${row.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-muted-foreground">
                    <p className="text-sm font-semibold">No developer accounts match your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {filteredUsers.length > 0 && (
          <div className="bg-subtle border-t border-slate-100 px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-muted-foreground">{Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)}</span> to{" "}
              <span className="font-semibold text-muted-foreground">{Math.min(filteredUsers.length, currentPage * itemsPerPage)}</span> of{" "}
              <span className="font-semibold text-muted-foreground">{filteredUsers.length}</span> users
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-border bg-background hover:bg-subtle rounded-lg text-muted-foreground disabled:text-slate-300 disabled:hover:bg-background disabled:cursor-not-allowed transition-colors focus:outline-none"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-border bg-background hover:bg-subtle rounded-lg text-muted-foreground disabled:text-slate-300 disabled:hover:bg-background disabled:cursor-not-allowed transition-colors focus:outline-none"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

