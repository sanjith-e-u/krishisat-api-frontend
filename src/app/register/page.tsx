"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Logo from "@/components/brand/logo"
import { Layers, Zap, Shield, BookOpen } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Validation States
  const [nameError, setNameError] = useState("")
  const [companyError, setCompanyError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const validateName = (val: string) => {
    if (!val.trim()) {
      setNameError("Full name is required")
      return false
    }
    setNameError("")
    return true
  }

  const validateCompany = (val: string) => {
    if (!val.trim()) {
      setCompanyError("Company name is required")
      return false
    }
    setCompanyError("")
    return true
  }

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError("Email is required")
      return false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError("Password is required")
      return false
    } else if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }
    setPasswordError("")
    // If confirm password has value, re-validate match
    if (confirmPassword && val !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match")
    } else if (confirmPassword) {
      setConfirmPasswordError("")
    }
    return true
  }

  const validateConfirmPassword = (val: string) => {
    if (!val) {
      setConfirmPasswordError("Please confirm your password")
      return false
    } else if (val !== password) {
      setConfirmPasswordError("Passwords do not match")
      return false
    }
    setConfirmPasswordError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isNameValid = validateName(fullName)
    const isCompanyValid = validateCompany(companyName)
    const isEmailValid = validateEmail(email)
    const isPassValid = validatePassword(password)
    const isConfirmValid = validateConfirmPassword(confirmPassword)

    if (!isNameValid || !isCompanyValid || !isEmailValid || !isPassValid || !isConfirmValid) {
      return
    }

    setLoading(true)

    // Set mock cookie
    document.cookie = "auth-token=mock-token; path=/; max-age=86400"

    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="w-full max-w-[1000px] bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
      {/* Left Column: Form */}
      <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col gap-6 justify-center">
        <div>
          <Link href="/" className="select-none flex mb-4 justify-start">
            <Logo size="sm" />
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Create Developer Account</h1>
          <p className="text-sm text-[#64748B] mt-1.5">Get API keys and start building in seconds.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => validateName(fullName)}
                className={`w-full h-10 px-3 text-sm bg-white border ${
                  nameError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-[#14532D]/10 focus:border-[#14532D]"
                } rounded-lg focus:outline-none focus:ring-2 transition-all`}
              />
              {nameError && (
                <p className="text-xs font-medium text-red-500 mt-0.5">{nameError}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="company" className="text-xs font-semibold text-slate-700">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                required
                placeholder="Acme Agritech"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={() => validateCompany(companyName)}
                className={`w-full h-10 px-3 text-sm bg-white border ${
                  companyError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-[#14532D]/10 focus:border-[#14532D]"
                } rounded-lg focus:outline-none focus:ring-2 transition-all`}
              />
              {companyError && (
                <p className="text-xs font-medium text-red-500 mt-0.5">{companyError}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              className={`w-full h-10 px-3 text-sm bg-white border ${
                emailError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-[#14532D]/10 focus:border-[#14532D]"
              } rounded-lg focus:outline-none focus:ring-2 transition-all`}
            />
            {emailError && (
              <p className="text-xs font-medium text-red-500 mt-0.5">{emailError}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                className={`w-full h-10 px-3 text-sm bg-white border ${
                  passwordError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-[#14532D]/10 focus:border-[#14532D]"
                } rounded-lg focus:outline-none focus:ring-2 transition-all`}
              />
              {passwordError && (
                <p className="text-xs font-medium text-red-500 mt-0.5">{passwordError}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateConfirmPassword(confirmPassword)}
                className={`w-full h-10 px-3 text-sm bg-white border ${
                  confirmPasswordError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-[#14532D]/10 focus:border-[#14532D]"
                } rounded-lg focus:outline-none focus:ring-2 transition-all`}
              />
              {confirmPasswordError && (
                <p className="text-xs font-medium text-red-500 mt-0.5">{confirmPasswordError}</p>
              )}
            </div>
          </div>

          {/* Accept terms checkbox */}
          <div className="flex items-start gap-2 select-none">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 mt-0.5 text-[#14532D] bg-white border-slate-200 rounded focus:ring-[#14532D]"
            />
            <label htmlFor="terms" className="text-xs text-[#64748B] cursor-pointer leading-normal">
              I agree to the KrishiSat{" "}
              <Link href="/terms" className="text-primary hover:underline font-semibold">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>,{" "}
              including automatic credits quota management.
            </label>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 mt-2 bg-[#14532D] hover:bg-[#114524] disabled:bg-[#14532D]/70 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center shadow-sm cursor-pointer"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              "Create Developer Account"
            )}
          </button>
        </form>

        <div className="text-center md:text-left text-xs text-[#64748B] mt-2">
          Already have a developer account?{" "}
          <Link href="/login" className="font-semibold text-[#14532D] hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Right Column: Benefits Panel */}
      <div className="col-span-1 md:col-span-5 bg-[#14532D] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden select-none">
        {/* Background topography-like subtle grid design */}
        <div className="absolute inset-0 bg-emerald-950 opacity-20 pointer-events-none topo-pattern" />

        <div className="relative z-10 space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Agricultural intelligence at your fingertips.</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            KrishiSat delivers planetary crop health telemetry and meteorological forecasts directly to your tech stack through unified REST endpoints.
          </p>

          <ul className="space-y-4 pt-4">
            <li className="flex gap-3 items-start">
              <div className="p-1.5 bg-[#22C55E]/20 text-[#22C55E] rounded-md shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Access NDVI APIs</h4>
                <p className="text-[11px] text-emerald-150 mt-0.5">Monitor live vegetation canopy health indexes at 10m resolutions.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="p-1.5 bg-[#22C55E]/20 text-[#22C55E] rounded-md shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Weather APIs</h4>
                <p className="text-[11px] text-emerald-150 mt-0.5">Query GDD metrics, relative humidity, and rainfall centroid grids.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="p-1.5 bg-[#22C55E]/20 text-[#22C55E] rounded-md shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Crop Monitoring APIs</h4>
                <p className="text-[11px] text-emerald-150 mt-0.5">Detect early nitrogen and water stress alerts dynamically.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="p-1.5 bg-[#22C55E]/20 text-[#22C55E] rounded-md shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Satellite Analytics APIs</h4>
                <p className="text-[11px] text-emerald-150 mt-0.5">Delineate open waterlogged zones and moisture saturation levels.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative z-10 pt-8 border-t border-emerald-800/80 text-[10px] text-emerald-200">
          Trusted by agritechs and developers worldwide.
        </div>
      </div>
    </div>
  )
}
