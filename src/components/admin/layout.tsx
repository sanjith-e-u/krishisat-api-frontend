"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "@/components/brand/logo"
import { supabase } from "@/lib/supabase"

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminMenuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Revenue", href: "/admin/revenue", icon: TrendingUp },
  { name: "API Monitoring", href: "/admin/api-monitoring", icon: Activity }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // Determine page title based on route
  const getPageTitle = () => {
    const activeItem = adminMenuItems.find((item) => item.href === pathname)
    return activeItem ? activeItem.name : "Admin Panel"
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Logo Header */}
        <div className="h-16 flex items-center px-6 border-b border-border bg-subtle">
          <Link href="/" className="select-none flex">
            <Logo size="sm" dark />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Admin navigation" className="p-4 space-y-1">
          {adminMenuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500",
                  isActive
                    ? "bg-accent/10 text-accent border-l-2 border-l-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-subtle"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-accent" : "text-muted-foreground")} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border bg-subtle">
        <div className="bg-background border border-border rounded-xl p-4">
          <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-3">
            <span>Access Mode</span>
            <span className="bg-amber-500/15 text-accent border border-amber-500/20 px-2 py-0.5 rounded-full text-[9px] uppercase font-mono tracking-wider font-bold">
              Admin Panel
            </span>
          </div>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="w-full h-9 border border-border hover:bg-muted hover:border-accent text-foreground rounded-lg text-xs font-bold transition-all hover:text-accent focus:outline-none flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop Sidebar */}
      <aside className="w-[260px] h-screen bg-card text-foreground flex flex-col justify-between border-r border-border shrink-0 sticky top-0 z-30 select-none custom-shadow hidden lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          />

          {/* Drawer Sidebar container */}
          <div className="relative flex flex-col w-[260px] h-full bg-card shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Close button inside mobile header */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-subtle rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              aria-label="Close menu drawer"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Column: Topbar + Main scrollable view */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* Admin Topbar */}
        <header className="sticky top-0 right-0 z-20 bg-background border-b border-border h-16 px-6 flex items-center justify-between select-none">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-subtle focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-foreground tracking-tight">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Amber Badge "Admin Mode" */}
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none border border-amber-200">
              Admin Mode
            </span>

            <div className="w-px h-6 bg-border" />

            {/* Profile Dropdown */}
            <div className="relative flex" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-subtle focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-accent-foreground flex items-center justify-center font-bold text-sm shadow-inner">
                  A
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-10 w-52 bg-background border border-border rounded-xl shadow-lg p-1 space-y-0.5 z-40 animate-in fade-in slide-in-from-top-1.5 duration-100">
                  <div className="px-3 py-2 select-none">
                    <p className="text-xs font-bold text-foreground">Administrator</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">admin@x-agi.dev</p>
                  </div>
                  <div className="border-t border-border" />
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="w-full px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-subtle flex items-center gap-2.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>User Portal</span>
                  </Link>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={async () => {
                      setProfileOpen(false)
                      // 1. Clear Supabase local session
                      await supabase.auth.signOut()
                      
                      // 2. Clear Next.js middleware cookie
                      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                      
                      // 3. Force hard navigation to clear server component state
                      window.location.href = "/"
                    }}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Slot */}
        <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
