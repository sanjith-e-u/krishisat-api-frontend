"use client"

import React, { useState } from "react"
import DashboardSidebar from "./sidebar"
import DashboardTopbar from "./topbar"
import { X } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar (hidden on mobile) */}
      <DashboardSidebar className="hidden lg:flex shrink-0 sticky top-0" />

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          />

          {/* Drawer Sidebar container */}
          <div className="relative flex flex-col w-[260px] h-full bg-[#14532D] shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Close button inside mobile header */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-emerald-100 hover:text-white hover:bg-emerald-800/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
              aria-label="Close menu drawer"
            >
              <X className="w-5 h-5" />
            </button>
            <DashboardSidebar onClose={() => setMobileSidebarOpen(false)} className="w-full h-full border-r-0 shadow-none" />
          </div>
        </div>
      )}

      {/* Right Column: Topbar + Main scrollable view */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <DashboardTopbar onMenuToggle={() => setMobileSidebarOpen(true)} />
        
        {/* Main page children content slot */}
        <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
