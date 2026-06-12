"use client"

import React, { useState, useMemo } from "react"
import { Search, Download, Eye, ShieldAlert, ShieldCheck, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserItem {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Developer" | "Professional" | "Enterprise";
  status: "Active" | "Suspended";
  created: string;
}

const initialUsers: UserItem[] = [
  { id: "1", name: "Arjun Mehta", email: "arjun@agrivision.ai", company: "AgriVision AI", plan: "Professional", status: "Active", created: "Jun 12, 2026" },
  { id: "2", name: "Priya Nair", email: "priya@cropsense.io", company: "CropSense Labs", plan: "Developer", status: "Active", created: "Jun 11, 2026" },
  { id: "3", name: "Rohit Sharma", email: "rohit@farmtech.in", company: "FarmTech Delhi", plan: "Enterprise", status: "Active", created: "Jun 10, 2026" },
  { id: "4", name: "Sanya Patel", email: "sanya@greenfield.co", company: "GreenField Co", plan: "Developer", status: "Suspended", created: "Jun 09, 2026" },
  { id: "5", name: "Vikram Iyer", email: "vikram@agrocorp.com", company: "AgroCorp MH", plan: "Professional", status: "Active", created: "Jun 08, 2026" },
  { id: "6", name: "Meera Krishnan", email: "meera@khetworks.in", company: "KhetWorks", plan: "Developer", status: "Active", created: "Jun 07, 2026" },
  { id: "7", name: "Aditya Singh", email: "aditya@cropai.dev", company: "CropAI Labs", plan: "Professional", status: "Active", created: "Jun 06, 2026" },
  { id: "8", name: "Kavya Reddy", email: "kavya@fieldtech.io", company: "FieldTech Hyd", plan: "Developer", status: "Active", created: "Jun 05, 2026" },
  { id: "9", name: "Nikhil Joshi", email: "nikhil@agrismart.in", company: "AgriSmart", plan: "Enterprise", status: "Active", created: "Jun 04, 2026" },
  { id: "10", name: "Tanvi Desai", email: "tanvi@farmapi.dev", company: "FarmAPI Dev", plan: "Developer", status: "Suspended", created: "Jun 03, 2026" },
  { id: "11", name: "Suresh Kumar", email: "suresh@cropmonitor.io", company: "CropMonitor", plan: "Professional", status: "Active", created: "Jun 02, 2026" },
  { id: "12", name: "Divya Menon", email: "divya@agricloud.in", company: "AgriCloud", plan: "Developer", status: "Active", created: "Jun 01, 2026" }
]

export default function AdminUsers() {
  const [users, setUsers] = useState<UserItem[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const itemsPerPage = 8

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

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
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredUsers.slice(start, start + itemsPerPage)
  }, [filteredUsers, currentPage])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === "Active" ? "Suspended" : "Active"
          showToast(`Account status updated for ${u.name}`)
          return { ...u, status: newStatus }
        }
        return u
      })
    )
  }

  const handleDeleteUser = (id: string, name: string) => {
    if (window.confirm(`Permanently delete the developer account for "${name}"? This action cannot be undone.`)) {
      setUsers(users.filter((u) => u.id !== id))
      showToast(`Successfully deleted ${name}`)
    }
  }

  const handleExportCSV = () => {
    showToast("CSV export initiated. Generating file...")
  }

  return (
    <div className="space-y-8 select-none relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-sm flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">All registered developer accounts across KrishiSat.</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Search bar */}
          <div className="relative w-56 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 rounded-lg text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6 font-sans">Name</th>
                <th className="py-3 px-6 font-sans">Email</th>
                <th className="py-3 px-6 font-sans">Company</th>
                <th className="py-3 px-6 font-sans">Plan</th>
                <th className="py-3 px-6 font-sans">Status</th>
                <th className="py-3 px-6 font-sans">Created</th>
                <th className="py-3 px-6 text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-500">{row.email}</td>
                  <td className="py-4 px-6 text-slate-500 font-medium">{row.company}</td>
                  
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

                  <td className="py-4 px-6 text-slate-400 font-medium">{row.created}</td>

                  {/* Actions buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => showToast(`Viewing ${row.name}'s profile details`)}
                        className="p-2 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
                        aria-label={`View ${row.name} profile`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(row.id)}
                        className={cn(
                          "p-2 border rounded-lg transition-colors focus:outline-none focus:ring-1",
                          row.status === "Active"
                            ? "border-slate-200 text-slate-400 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100"
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
                        className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-rose-500"
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
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No developer accounts match your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {filteredUsers.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)}</span> to{" "}
              <span className="font-semibold text-slate-700">{Math.min(filteredUsers.length, currentPage * itemsPerPage)}</span> of{" "}
              <span className="font-semibold text-slate-700">{filteredUsers.length}</span> users
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-slate-500 disabled:text-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors focus:outline-none"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-slate-500 disabled:text-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors focus:outline-none"
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
