"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Nav from "@/components/nav"
import Footer from "@/components/footer"

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")
  const isAuth = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password"

  if (isDashboard) {
    return <div className="min-h-screen bg-[#F8FAFC]">{children}</div>
  }

  if (isAuth) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">{children}</div>
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
