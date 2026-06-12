"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Logo from "@/components/brand/logo"
import {
  LayoutDashboard,
  Code,
  Key,
  BarChart3,
  CreditCard,
  Settings as SettingsIcon
} from "lucide-react"

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "APIs", href: "/marketplace", icon: Code },
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Usage", href: "/dashboard/usage", icon: BarChart3 },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon }
]

export default function DashboardSidebar({ onClose, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "w-[260px] h-screen bg-[#14532D] text-white flex flex-col justify-between border-r border-[#114524] z-30 select-none shadow-lg",
        className
      )}
    >
      <div>
        {/* Logo Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#114524] bg-emerald-950/20">
          <Link href="/" className="select-none flex">
            <Logo size="sm" dark />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Dashboard navigation" className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#22C55E]",
                  isActive
                    ? "bg-[#22C55E]/15 text-white border-l-2 border-l-[#22C55E]"
                    : "text-emerald-100 hover:text-white hover:bg-emerald-800/40"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[#22C55E]" : "text-emerald-200")} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer credit status wrapper */}
      <div className="p-4 border-t border-[#114524] bg-emerald-950/10">
        <div className="bg-[#114524]/60 rounded-xl p-4 border border-emerald-800/25">
          <div className="flex justify-between items-center text-xs font-semibold text-emerald-250 mb-1">
            <span>Developer Plan</span>
            <span className="bg-[#22C55E]/20 text-[#22C55E] px-1.5 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider font-bold">Mock</span>
          </div>
          <div className="text-sm font-bold text-white mb-2.5">
            9,850 <span className="text-xs font-normal text-emerald-200">credits left</span>
          </div>
          {/* Progress bar mapping remaining credits (9,850 / 10,000 quota) */}
          <div className="w-full bg-[#114524] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: "98.5%" }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-emerald-200 mt-2">
            <span>98.5% capacity</span>
            <Link href="/dashboard/billing" className="hover:text-white hover:underline transition-colors font-medium">Upgrade</Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
