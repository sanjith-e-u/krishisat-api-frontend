"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Logo from "@/components/brand/logo"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    // Simulating redirect
    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      {/* Header with Logo */}
      <div className="flex flex-col items-center text-center gap-4">
        <Link href="/" className="select-none flex justify-center">
          <Logo size="md" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Welcome Back</h1>
          <p className="text-sm text-[#64748B] mt-1.5">Access your KrishiSat developer workspace.</p>
        </div>
      </div>

      {/* Main Authentication Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]/10 focus:border-[#14532D] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-xs font-semibold text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#14532D] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]/10 focus:border-[#14532D] transition-all"
          />
        </div>

        {/* Remember me option */}
        <div className="flex items-center gap-2 select-none">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-[#14532D] bg-white border-slate-200 rounded focus:ring-[#14532D]"
          />
          <label htmlFor="remember" className="text-xs text-[#64748B] cursor-pointer">
            Remember this device for 30 days
          </label>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-[#14532D] hover:bg-[#114524] disabled:bg-[#14532D]/70 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center shadow-sm"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink mx-4 text-[10px] uppercase font-mono tracking-widest text-[#64748B]">or</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* Mock Social Logins */}
      <div className="flex flex-col gap-2">
        <button
          disabled
          type="button"
          className="relative w-full h-10 border border-slate-200 bg-slate-50 text-[#64748B] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 select-none cursor-not-allowed"
        >
          {/* Mock Google Icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.83 21.56,11.45 21.35,11.1z" fill="#4285F4" />
              <path d="M12,20.72c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.91,0.61 -2.08,0.98 -3.3,0.98 -2.35,0 -4.34,-1.59 -5.05,-3.72H2.9v2.66C4.38,18.8 7.98,20.72 12,20.72z" fill="#34A853" />
              <path d="M6.95,13.2a5.2,5.2 0 0,1 0,-3.3V7.24H2.9a9.7,9.7 0 0,0 0,8.62l4.05,-3.16z" fill="#FBBC05" />
              <path d="M12,7.18c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.47,4.45 14.43,3.6 12,3.6c-4.02,0 -7.62,1.92 -9.1,4.96l4.05,3.16C7.66,8.77 9.65,7.18 12,7.18z" fill="#EA4335" />
            </g>
          </svg>
          Continue with Google
          <span className="absolute right-3 px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-200 text-slate-500 uppercase tracking-wide">
            Soon
          </span>
        </button>
      </div>

      {/* Footer redirects */}
      <div className="text-center text-xs text-[#64748B]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-[#14532D] hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  )
}
