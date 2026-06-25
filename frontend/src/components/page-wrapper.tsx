"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import Logo from "@/components/brand/logo"

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")
  const isAuth = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password"

  if (isDashboard) {
    return <div className="min-h-screen bg-card">{children}</div>
  }

  if (isAuth) {
    return (
      <div className="min-h-screen bg-subtle flex flex-col font-sans">
        <header className="h-14 border-b border-border bg-background flex items-center justify-between px-6 select-none shrink-0">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            ← Back to site
          </Link>
        </header>
        <div className="flex-grow flex items-center justify-center py-12 px-6">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow pt-[72px] md:pt-[88px] transition-all duration-200">
        {children}
      </main>
      <Footer />
    </div>
  )
}
