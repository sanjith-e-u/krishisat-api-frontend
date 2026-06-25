"use client"

import React, { useState } from "react"
import Link from "next/link"
import Logo from "@/components/brand/logo"
import { Check, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 600)
  }

  return (
    <div className="w-full max-w-[420px] bg-background border border-border rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <Link href="/" className="select-none flex justify-center">
          <Logo size="md" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            We will send you a password recovery link to your inbox.
          </p>
        </div>
      </div>

      {success ? (
        /* Success State */
        <div className="flex flex-col gap-5 text-center">
          <div className="p-4 bg-[#22C55E]/10 border border-[#22C55E]/20 text-accent rounded-xl flex flex-col items-center gap-2">
            <Check className="w-6 h-6 text-[#22C55E]" />
            <p className="text-xs font-bold">Reset Link Dispatched</p>
            <p className="text-xs leading-relaxed text-slate-650">
              If an account exists for <strong className="font-semibold text-foreground">{email}</strong>, a reset email has been sent.
            </p>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs font-semibold text-accent hover:underline"
          >
            Try another email address
          </button>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-accent hover:bg-[#114524] disabled:bg-accent/70 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center custom-shadow gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Send Reset Link</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Footer link */}
      <div className="text-center text-xs text-muted-foreground pt-2 border-t border-slate-100">
        Back to{" "}
        <Link href="/login" className="font-semibold text-accent hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  )
}
