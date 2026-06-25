"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sprout, Droplets, Cloud, MapPin, Search, Copy, Check, ExternalLink, ShieldAlert, ArrowRight, BarChart2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ApiProduct {
  name: string;
  endpoint: string;
  credits: number;
  desc: string;
  category: "Vegetation" | "Water" | "Core" | "Weather";
  longDesc?: string;
}

const apiProducts: ApiProduct[] = [
  {
    name: "NDVI",
    endpoint: "POST /v1/vegetation/ndvi",
    credits: 1,
    desc: "Crop Health Index",
    category: "Vegetation",
    longDesc: "Normalized Difference Vegetation Index representing overall canopy greenness, biomass, and chlorophyll density."
  },
  {
    name: "NDMI",
    endpoint: "POST /v1/water/ndmi",
    credits: 2,
    desc: "Water Stress Index",
    category: "Water",
    longDesc: "Normalized Difference Moisture Index tracking agricultural drought levels, water stress, and crop moisture logs."
  },
  {
    name: "NDRE",
    endpoint: "POST /v1/vegetation/ndre",
    credits: 2,
    desc: "Chlorophyll Vigor",
    category: "Vegetation",
    longDesc: "Red Edge Index optimized for nitrogen status logging, fertilizer monitoring, and dense canopy insights."
  },
  {
    name: "SAVI",
    endpoint: "POST /v1/vegetation/savi",
    credits: 2,
    desc: "Soil Adjusted Index",
    category: "Vegetation",
    longDesc: "Soil-Adjusted Vegetation Index filtering background soil noise in sparse crop structures or early growth stages."
  },
  {
    name: "NDWI",
    endpoint: "POST /v1/water/ndwi",
    credits: 2,
    desc: "Water Logging Index",
    category: "Water",
    longDesc: "Normalized Difference Water Index ideal for surface water mapping, logging, and reservoir boundary checks."
  },
  {
    name: "CI",
    endpoint: "POST /v1/vegetation/ci",
    credits: 3,
    desc: "Chlorophyll Index",
    category: "Vegetation",
    longDesc: "Early-season Chlorophyll Index mapping dynamic nitrogen loads and early vegetative growth stages."
  },
  {
    name: "Farm Registration",
    endpoint: "POST /v1/farms",
    credits: 0,
    desc: "Register Farm Boundary",
    category: "Core",
    longDesc: "Create spatial boundary references from GeoJSON polygons to target Sentinel imagery ingresses."
  },
  {
    name: "Weather",
    endpoint: "POST /v1/weather",
    credits: 1,
    desc: "Farm Weather Forecast",
    category: "Weather",
    longDesc: "Hyperlocal meteorological telemetry including Growing Degree Days (GDD), rainfall, and temperatures."
  }
]

const categoryIcons = {
  Vegetation: Sprout,
  Water: Droplets,
  Core: MapPin,
  Weather: Cloud
}

const categoryColors = {
  Vegetation: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Water: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Core: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Weather: "bg-purple-500/10 text-purple-400 border-purple-500/20"
}

export default function MarketplacePage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  
  // Checkout States
  const [loadingApi, setLoadingApi] = useState<string | null>(null)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoadingSession(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleBuyAccess = async (apiName: string) => {
    if (loadingSession) return

    if (!session) {
      // Redirect to login page if unauthenticated
      router.push(`/login?return_to=/marketplace`)
      return
    }

    setLoadingApi(apiName)
    try {
      const response = await fetch("http://localhost:8000/v1/keys/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          api_name: apiName,
          env_scope: "sandbox"
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.detail?.error?.message || "Failed to purchase API access.")
      }

      const result = await response.json()
      if (result.key) {
        setGeneratedKey(result.key)
        setModalOpen(true)
      } else {
        throw new Error("No API key returned from gateway.")
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while generating your API key. Please check connection.")
    } finally {
      setLoadingApi(null)
    }
  }

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setGeneratedKey(null)
    router.push("/dashboard/api-keys")
  }

  // Filter logic
  const filteredApis = apiProducts.filter((api) => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          api.desc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || api.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="bg-subtle min-h-screen pt-20">
      {/* Hero Header */}
      <section className="bg-background border-b border-border py-16 px-6 text-center select-none">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">
            X-AGI Marketplace
          </span>
          <h1 className="text-4xl font-extrabold text-foreground mt-4 tracking-tight">
            Agricultural Intelligence APIs
          </h1>
          <p className="text-base text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            Purchase access to individual high-resolution crop indices, boundaries, and climate APIs. Keys generated separately per endpoint.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-background border-b border-border py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6 justify-center sm:justify-start text-sm text-muted-foreground font-sans">
          {[
            { label: "Live APIs", value: "8" },
            { label: "Beta APIs", value: "3" },
            { label: "Coming Soon", value: "4" },
            { label: "Avg Latency", value: "238ms" },
            { label: "Uptime", value: "99.98%" }
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5 text-slate-405" />
              <span className="font-bold text-foreground">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog Filters and Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 select-none">
            {["All", "Vegetation", "Water", "Core", "Weather"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent text-white custom-shadow"
                    : "bg-background border border-border text-muted-foreground hover:bg-subtle"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search index catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-background border border-border rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* API Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApis.map((api) => {
            const Icon = categoryIcons[api.category]
            const isFree = api.credits === 0

            return (
              <div
                key={api.name}
                className="shine-host tilt-glow bg-card border border-border rounded-2xl p-6 custom-shadow hover:border-accent/40 group hover-glow relative flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Category and cost badges */}
                  <div className="flex justify-between items-center mb-4 select-none">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider flex items-center gap-1 w-fit ${
                        categoryColors[api.category]
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {api.category}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground font-mono">
                      {isFree ? "Free (0 cr)" : `${api.credits} credit / call`}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-foreground tracking-tight">
                    {api.name} API
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium">{api.desc}</span>

                  <p className="text-xs text-muted-foreground mt-3.5 leading-relaxed font-sans font-medium bg-subtle border border-slate-100 rounded-xl p-3">
                    {api.longDesc}
                  </p>
                </div>

                {/* Footer and trigger button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3.5">
                  <div className="flex justify-between items-center select-all">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Endpoint</span>
                    <code className="font-mono text-[10px] text-muted-foreground bg-background border border-border/50 px-1.5 py-0.5 rounded font-bold">
                      {api.endpoint}
                    </code>
                  </div>

                  <button
                    onClick={() => handleBuyAccess(api.name)}
                    disabled={loadingApi !== null}
                    className="w-full h-10 bg-accent hover:bg-accent-strong disabled:bg-accent/50 text-accent-foreground rounded-xl text-xs font-semibold custom-shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loadingApi === api.name ? (
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <span>Buy Access</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
          {filteredApis.length === 0 && (
            <div className="col-span-full py-16 text-center select-none bg-background border border-border rounded-2xl">
              <Sprout className="w-8 h-8 mx-auto mb-2 text-slate-350" />
              <p className="text-sm font-semibold text-muted-foreground">No APIs match your filters.</p>
              <p className="text-xs text-slate-450 mt-1">Try resetting the search or category query.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-card border border-border py-16 px-6 text-center mt-12 rounded-3xl select-none relative overflow-hidden custom-shadow shine-host tilt-glow group hover-glow mx-auto max-w-6xl mb-12">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent opacity-10 blur-[100px] pointer-events-none transition-opacity group-hover:opacity-20" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3 font-sans text-foreground">Start building agricultural intelligence</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed font-sans">
            Join 847+ agritech developers using X-AGI&apos;s satellite APIs to power smart farming applications.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 btn-primary-hero text-accent-foreground h-11 px-8 rounded-xl font-bold text-sm transition-colors">
            Get your free API key <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Modal: Generated API Key */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-none animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative bg-background border border-border rounded-3xl shadow-2xl p-7 w-full max-w-[460px] z-50 animate-in slide-in-from-top-4 duration-300 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full select-none">
                Checkout Successful
              </span>
              <h3 className="text-lg font-bold text-foreground mt-3 tracking-tight">
                API Key Generated Successfully
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-normal">
                An active sandbox credential has been created for your requested API endpoint.
              </p>
            </div>

            {/* Warn box */}
            <div className="flex gap-3 p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-900">Security Notice</h4>
                <p className="text-xs text-rose-700 leading-normal mt-0.5 font-medium">
                  Copy this key now. It will not be shown again.
                </p>
              </div>
            </div>

            {/* Code Field */}
            <div className="bg-subtle border border-border rounded-xl p-3.5 flex items-center justify-between font-mono text-xs text-foreground">
              <span className="truncate max-w-[280px] select-all font-semibold font-mono tracking-tight text-foreground">
                {generatedKey}
              </span>
              <button
                onClick={handleCopyKey}
                className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
                title="Copy plaintext API Key"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in-50" />
                    <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[10px] font-semibold text-muted-foreground">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleCloseModal}
                className="h-10 bg-accent hover:bg-[#114524] text-white px-5 rounded-xl text-xs font-semibold custom-shadow transition-colors cursor-pointer"
              >
                Close & Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
