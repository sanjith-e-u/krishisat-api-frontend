"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Logo from "@/components/brand/logo"
import { supabase } from "@/lib/supabase"
import { AlertCircle, Lock } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("return_to") || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState("")

  // Validation States
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError("Email is required")
      return false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email address")
      return false
    } else {
      setEmailError("")
      return true
    }
  }

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError("Password is required")
      return false
    } else {
      setPasswordError("")
      return true
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")
    
    const isEmailValid = validateEmail(email)
    const isPassValid = validatePassword(password)

    if (!isEmailValid || !isPassValid) return

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (error) {
        setGeneralError(error.message)
        setLoading(false)
        return
      }

      if (data?.session) {
        // Verify admin role before allowing them in
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        console.log("=== CLIENT-SIDE LOGIN ROLE CHECK ===")
        console.log("User ID:", data.user.id)
        console.log("Profile Data returned:", profile)
        console.log("Profile Error returned:", profileError)
        console.log("Expected Role: admin")
        console.log("Actual Role:", profile?.role)
        console.log("====================================")

        if (profileError || profile?.role !== "admin") {
          // If not an admin, log them out immediately
          await supabase.auth.signOut()
          setGeneralError(`Access denied. Admin privileges required. (Role found: ${profile?.role || "null"})`)
          setLoading(false)
          return
        }

        // Set cookie for Next.js route middleware auth
        document.cookie = `auth-token=${data.session.access_token}; path=/; max-age=86400`
        
        const target = returnTo.startsWith("/") ? returnTo : "/admin"
        router.push(target)
      }
    } catch (err: any) {
      setGeneralError(err.message || "An unexpected authentication error occurred.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-surface to-surface">
      <div className="w-full max-w-[420px] bg-background border border-amber-500/20 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 relative overflow-hidden">
        
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700" />

        {/* Header with Logo */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Authorized personnel only.</p>
          </div>
        </div>

        {/* Main Authentication Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) validateEmail(e.target.value)
              }}
              className={`h-11 px-3 rounded-lg border bg-subtle text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background transition-all ${
                emailError 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'border-border focus:ring-amber-500'
              }`}
              placeholder="admin@x-agi.dev"
            />
            {emailError && <span className="text-xs text-destructive">{emailError}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) validatePassword(e.target.value)
              }}
              className={`h-11 px-3 rounded-lg border bg-subtle text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background transition-all ${
                passwordError 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'border-border focus:ring-amber-500'
              }`}
              placeholder="••••••••"
            />
            {passwordError && <span className="text-xs text-destructive">{passwordError}</span>}
          </div>

          {generalError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive font-medium leading-tight">{generalError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-11 mt-2 w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Access Portal"}
          </button>
        </form>

        <div className="text-center mt-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Return to main site
          </Link>
        </div>
      </div>
    </main>
  )
}
