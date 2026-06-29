"use client"

import React, { useState, useEffect, useRef } from "react"
import { Bell, Search, Menu, ChevronDown, User, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface TopbarProps {
  onMenuToggle: () => void;
}

export default function DashboardTopbar({ onMenuToggle }: TopbarProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const workspaceRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (workspaceRef.current && !workspaceRef.current.contains(target)) {
        setWorkspaceOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 right-0 z-20 bg-background border-b border-border h-16 px-6 flex items-center justify-between select-none">
      
      {/* Left: Mobile Menu Trigger + Workspace Selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-subtle focus:outline-none"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Workspace Selector (Mock Dropdown) */}
        <div className="relative" ref={workspaceRef}>
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-slate-905 transition-colors px-2 py-1.5 rounded-lg hover:bg-subtle focus:outline-none"
          >
            <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full" />
            <span className="max-w-[140px] truncate">Acme Workspace</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {workspaceOpen && (
            <div className="absolute left-0 mt-1.5 w-56 bg-background border border-border rounded-xl shadow-lg p-1 space-y-0.5 z-40 animate-in fade-in slide-in-from-top-1.5 duration-100">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-1.5 block select-none">
                Workspaces
              </span>
              <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-accent bg-accent/5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full" />
                <span>Acme Workspace</span>
              </button>
              <button
                onClick={() => setWorkspaceOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-subtle flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-slate-400 rounded-full" />
                <span>Personal Sandbox</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => setWorkspaceOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-accent hover:bg-subtle"
              >
                + Create Workspace
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Search + Notifications + Profile dropdown */}
      <div className="flex items-center gap-4">
        
        {/* Mock Search input */}
        <div className="relative hidden md:block w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search API keys, logs..."
            className="w-full h-9 pl-9 pr-4 py-1.5 bg-subtle border border-border rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:bg-background focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
          />
        </div>

        {/* Mock Notification bell */}
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-subtle transition-colors focus:outline-none"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
        </button>

        <div className="w-px h-6 bg-slate-200" />

        {/* Profile Dropdown */}
        <div className="relative flex" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-subtle focus:outline-none"
          >
            {/* Avatar Circle with Initial */}
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
              A
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-10 w-56 bg-background border border-border rounded-xl shadow-lg p-1 space-y-0.5 z-40 animate-in fade-in slide-in-from-top-1.5 duration-100">
              <div className="px-3 py-2 select-none">
                <p className="text-xs font-bold text-foreground">Admin User</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">admin@acme.com</p>
              </div>
              <div className="border-t border-slate-100" />
              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="w-full px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-subtle flex items-center gap-2.5"
              >
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="w-full px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-subtle flex items-center gap-2.5"
              >
                <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Settings</span>
              </Link>
              <div className="border-t border-slate-100 my-1" />
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
  )
}
