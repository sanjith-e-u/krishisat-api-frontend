"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Sprout, Droplets, Cloud, MapPin, Key, Copy, Check, ShieldAlert, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface PurchasedApiItem {
  id: string;
  name: string;
  endpoint: string;
  credit_cost: number;
  description: string;
  activeKeysCount: number;
  totalCalls: number;
  category: "Vegetation" | "Water" | "Core" | "Weather";
}

const categoryIcons = {
  Vegetation: Sprout,
  Water: Droplets,
  Core: MapPin,
  Weather: Cloud
}

export default function DashboardApis() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [purchasedApis, setPurchasedApis] = useState<PurchasedApiItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Key Generation States
  const [generatingApiName, setGeneratingApiName] = useState<string | null>(null)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadPurchasedApis() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        return
      }
      setSession(session)

      try {
        // 1. Fetch user keys
        const keysRes = await supabase
          .from("api_keys")
          .select("*")
          .eq("profile_id", session.user.id)
          .eq("status", "active")
          

        const activeKeys = keysRes.data || []

        // 2. Fetch all APIs
        const apisRes = await supabase
          .from("apis")
          .select("*")
          
        const apisList = apisRes.data || []

        // 3. Fetch request logs count for each api_id
        const logsRes = await supabase
          .from("api_request_logs")
          .select("api_id")
          .eq("profile_id", session.user.id)
          
        const logs = logsRes.data || []

        // 4. Assemble purchased APIs list
        const assembledList: PurchasedApiItem[] = []

        apisList.forEach((api: any) => {
          const apiKeys = activeKeys.filter((k: any) => k.api_id === api.id)
          if (apiKeys.length > 0) {
            // Determine category based on endpoint prefix
            let category: "Vegetation" | "Water" | "Core" | "Weather" = "Core"
            if (api.endpoint.includes("/vegetation/")) {
              category = "Vegetation"
            } else if (api.endpoint.includes("/water/")) {
              category = "Water"
            } else if (api.endpoint.includes("/weather")) {
              category = "Weather"
            }

            const apiLogsCount = logs.filter((l: any) => l.api_id === api.id).length

            assembledList.push({
              id: api.id,
              name: api.name,
              endpoint: api.endpoint,
              credit_cost: api.credit_cost,
              description: api.description || "Agricultural index telemetry.",
              activeKeysCount: apiKeys.length,
              totalCalls: apiLogsCount,
              category
            })
          }
        })

        setPurchasedApis(assembledList)
      } catch (err) {
        console.error("Error loading purchased APIs:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPurchasedApis()
  }, [])

  const handleGenerateAnotherKey = async (apiName: string) => {
    if (!session) return

    setGeneratingApiName(apiName)
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
        throw new Error(errData.detail?.error?.message || "Failed to generate key.")
      }

      const result = await response.json()
      if (result.key) {
        setGeneratedKey(result.key)
        setModalOpen(true)
      }
    } catch (err: any) {
      alert(err.message || "Error generating API key.")
    } finally {
      setGeneratingApiName(null)
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

  // Search filter
  const filteredApis = purchasedApis.filter((api) =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <svg className="animate-spin h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight font-sans">Purchased APIs</h1>
          <p className="text-sm text-muted-foreground mt-1">APIs you have unlocked credentials for.</p>
        </div>

        {/* Filter */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search purchased endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-background border border-border rounded-xl text-xs placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {/* Empty State */}
      {purchasedApis.length === 0 ? (
        <div className="py-16 text-center select-none bg-background border border-border rounded-xl max-w-3xl">
          <Sprout className="w-10 h-10 mx-auto mb-3 text-slate-350" />
          <p className="text-sm font-semibold text-foreground">No active APIs purchased.</p>
          <p className="text-xs text-slate-450 mt-1.5 max-w-xs mx-auto">
            You currently have no active credentials. Purchase endpoint access in the API Catalog.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 mt-5 h-9 px-4 bg-accent hover:bg-[#114524] text-white rounded-lg text-xs font-semibold custom-shadow transition-colors"
          >
            Browse API Catalog
          </Link>
        </div>
      ) : (
        /* Purchased APIs Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {filteredApis.map((api) => {
            const Icon = categoryIcons[api.category]
            const isFree = api.credit_cost === 0

            return (
              <div
                key={api.id}
                className="bg-background border border-border rounded-2xl p-6 custom-shadow hover:border-accent/35 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Badge Category Header */}
                  <div className="flex justify-between items-center mb-4 select-none">
                    <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono">
                      {api.category}
                    </span>
                    <span className="text-[10px] font-bold text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                      {isFree ? "Free" : `${api.credit_cost} credit / call`}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <Icon className="w-4.5 h-4.5 text-accent shrink-0" />
                    {api.name} API
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {api.description}
                  </p>
                </div>

                {/* Specs and action triggers */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground font-medium select-none">Endpoint</span>
                    <code className="font-mono text-[10px] font-semibold text-muted-foreground bg-subtle border border-slate-100 p-1 rounded select-all">
                      {api.endpoint}
                    </code>
                  </div>
                  <div className="flex justify-between items-center text-xs select-none">
                    <span className="text-muted-foreground font-medium">Active Keys</span>
                    <span className="font-bold text-foreground">{api.activeKeysCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs select-none">
                    <span className="text-muted-foreground font-medium">Total Calls</span>
                    <span className="font-bold text-foreground">{api.totalCalls}</span>
                  </div>

                  <div className="flex gap-2.5 pt-2 select-none">
                    <Link
                      href="/dashboard/usage"
                      className="flex-1 h-9 border border-border hover:bg-subtle text-muted-foreground text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 focus:outline-none"
                    >
                      View Usage
                    </Link>
                    <button
                      onClick={() => handleGenerateAnotherKey(api.name)}
                      disabled={generatingApiName !== null}
                      className="flex-1 h-9 bg-accent hover:bg-[#114524] disabled:bg-accent/60 text-white text-xs font-semibold rounded-lg custom-shadow transition-colors flex items-center justify-center gap-1 focus:outline-none cursor-pointer"
                    >
                      {generatingApiName === api.name ? (
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        "New Key"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

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
                Key Generated
              </span>
              <h3 className="text-lg font-bold text-foreground mt-3 tracking-tight">
                New API Key Credentials
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-normal">
                An active credentials token has been created for your unlocked endpoint.
              </p>
            </div>

            {/* Warn box */}
            <div className="flex gap-3 p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-900">Security Warning</h4>
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
                className="shrink-0 p-1.5 text-muted-foreground hover:text-slate-850 transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
                title="Copy API Key"
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
                Close & Go to Keys Panel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
