"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Building2, ShieldCheck, Mail, ArrowLeft, Send } from "lucide-react"

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "ndvi",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Validation States
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError("Email is required")
      return false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid work email address")
      return false
    } else {
      setEmailError("")
      return true
    }
  }

  const validateName = (val: string) => {
    if (!val.trim()) {
      setNameError("Contact name is required")
      return false
    } else {
      setNameError("")
      return true
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const isEmailValid = validateEmail(formData.email)
    const isNameValid = validateName(formData.name)

    if (!isEmailValid || !isNameValid) return

    setLoading(true)
    setError(null)

    setTimeout(() => {
      setLoading(false)
      if (formData.email.toLowerCase() === "error@X-AGI.dev") {
        setError("An error occurred while submitting your request. Please try again.")
      } else {
        setSubmitted(true)
      }
    }, 1000)
  }

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8 pb-20 px-6 font-sans">
      
      {/* Left Column: Form Info & Value Proposition */}
      <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
        <div>
          <Link href="/pricing" className="text-primary hover:text-[#114524] text-xs font-bold inline-flex items-center gap-1 mb-4 select-none">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Pricing
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Scale crop intelligence dynamically</h1>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Connect with our solutions architects to discuss custom satellite ingress schedules, high-frequency radar coverage, and custom volume pricing tiers.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="p-3 bg-primary/5 rounded-xl text-primary border border-primary/10 shrink-0 select-none">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Enterprise SLA Guarantees</h4>
              <p className="text-xs text-slate-405 mt-1 leading-relaxed">
                99.9% API uptime contracts with sub-150ms calculation response periods backed by hardware failovers.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-primary/5 rounded-xl text-primary border border-primary/10 shrink-0 select-none">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Custom Sat-Pipeline Ingress</h4>
              <p className="text-xs text-slate-405 mt-1 leading-relaxed">
                Direct target coordinates scheduling on Sentinel and private radar constellations for low-latency orthomosaics.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-primary/5 rounded-xl text-primary border border-primary/10 shrink-0 select-none">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Direct Developer Inquiries</h4>
              <p className="text-xs text-slate-405 mt-1 leading-relaxed">
                Have system architecture questions? E-mail our operations desk directly at <a href="mailto:hello@X-AGI.dev" className="text-primary hover:underline font-semibold">hello@X-AGI.dev</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium select-none">
          Used by agritech teams, precision farming operators, and farm management platforms
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-12 px-4 space-y-4 font-sans">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 select-none">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request received</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Our solutions team will contact you within 24 hours.
            </p>
            <div className="pt-6 select-none">
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: "", email: "", company: "", interest: "ndvi", message: "" })
                }}
                className="bg-primary hover:bg-[#114524] text-white px-5 py-2.5 text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Corporate System Architecture Inquiry</h3>
              <p className="text-xs text-slate-400 mt-1 select-none">Fill out the form below and an engineer will review your request.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullname" className="text-xs font-semibold text-slate-700 select-none">Contact Name</label>
                <input
                  id="fullname"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onBlur={() => validateName(formData.name)}
                  className={`w-full h-10 px-3 text-sm bg-white border ${
                    nameError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-primary/10 focus:border-primary"
                  } rounded-lg focus:outline-none focus:ring-2 transition-all`}
                />
                {nameError && (
                  <p className="text-xs font-medium text-red-500 mt-0.5">{nameError}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-slate-700 select-none">Work Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => validateEmail(formData.email)}
                  className={`w-full h-10 px-3 text-sm bg-white border ${
                    emailError ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:ring-primary/10 focus:border-primary"
                  } rounded-lg focus:outline-none focus:ring-2 transition-all`}
                />
                {emailError && (
                  <p className="text-xs font-medium text-red-500 mt-0.5">{emailError}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-xs font-semibold text-slate-700 select-none">Company Name</label>
                <input
                  id="company"
                  type="text"
                  required
                  placeholder="Acme Agritech"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="interest" className="text-xs font-semibold text-slate-700 select-none">Primary API Interest</label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                >
                  <option value="ndvi">Vegetation Index APIs (NDVI/NDRE)</option>
                  <option value="weather">Meteorological Centroid APIs</option>
                  <option value="farms">Crop Boundary / Farm API</option>
                  <option value="water">Moisture Index APIs (NDWI/NDMI)</option>
                  <option value="enterprise">Full Orbital Custom Pipeline</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-700 select-none">Describe your coverage area or use case</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Describe your active geographic hectares, target query frequencies, and expected API request volumes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none font-sans"
                />
              </div>
            </div>

            {error && (
              <div className="text-xs font-semibold text-rose-600 mt-2 select-text">
                {error}
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex flex-col items-end gap-3">
              <button
                type="submit"
                disabled={loading}
                className="h-10 bg-primary hover:bg-[#114524] disabled:bg-primary/70 text-white px-5 rounded-lg text-xs font-bold transition-all shadow-sm focus:outline-none flex items-center gap-1.5 cursor-pointer select-none"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Architecture Request</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-right leading-normal select-none">
                We typically respond within 1 business day. For urgent inquiries, email{" "}
                <a href="mailto:hello@X-AGI.dev" className="text-primary hover:underline font-semibold">
                  hello@X-AGI.dev
                </a>
              </p>
            </div>
          </form>
        )}
      </div>

    </div>
  )
}
