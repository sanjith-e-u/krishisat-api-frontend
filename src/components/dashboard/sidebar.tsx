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
  { name: "APIs", href: "/dashboard/apis", icon: Code },
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
        "w-[260px] h-screen bg-card text-foreground flex flex-col justify-between border-r border-border z-30 select-none custom-shadow",
        className
      )}
    >
      <div>
        {/* Logo Header */}
        <div className="h-16 flex items-center px-6 border-b border-border bg-subtle">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-accent",
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

      {/* Sidebar Footer credit status wrapper */}
      <div className="p-4 border-t border-border bg-subtle">
        <div className="bg-background rounded-xl p-4 border border-border">
          <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-1">
            <span>Developer Plan</span>
            <span className="bg-accent/20 text-accent px-1.5 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider font-bold">Mock</span>
          </div>
          <div className="text-sm font-bold text-foreground mb-2.5">
            9,850 <span className="text-xs font-normal text-muted-foreground">credits left</span>
          </div>
          {/* Progress bar mapping remaining credits (9,850 / 10,000 quota) */}
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div className="bg-accent h-1.5 rounded-full" style={{ width: "98.5%" }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-2">
            <span>98.5% capacity</span>
            <Link href="/dashboard/billing" className="hover:text-foreground hover:underline transition-colors font-medium">Upgrade</Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
