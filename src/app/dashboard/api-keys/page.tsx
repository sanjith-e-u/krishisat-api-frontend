"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, Copy, Trash2, Key, Check, Plus, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface ApiKeyItem {
  id: string;
  profile_id: string;
  name: string;
  key_hash: string;
  status: "active" | "revoked" | "inactive";
  rate_limit_per_minute: number;
  created_at: string;
  env_scope: "sandbox" | "live";
  api_id: string;
  apis?: {
    name: string;
    endpoint: string;
  };
}

interface ApiOption {
  id: string;
  name: string;
  endpoint: string;
}

export default function DashboardApiKeys() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([])
  const [apis, setApis] = useState<ApiOption[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  // Key Generation Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [selectedApiId, setSelectedApiId] = useState("")
  const [newKeyEnv, setNewKeyEnv] = useState<"sandbox" | "live">("sandbox")
  const [generating, setGenerating] = useState(false)
  const [newPlaintextKey, setNewPlaintextKey] = useState<string | null>(null)
  
  // Revocation Confirmation
  const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null)

  // Copy Tooltips
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)
  const [copiedGeneratedKey, setCopiedGeneratedKey] = useState(false)

  // Fetch session, keys, and apis
  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        return
      }
      setUser(session.user)

      try {
        // Fetch keys joined with apis
        const keysRes = await supabase
          .from("api_keys")
          .select("*, apis(name, endpoint)")
          .eq("profile_id", session.user.id)
          .order("created_at", { ascending: false })
          

        // Fetch api catalog for generation dropdown
        const apisRes = await supabase
          .from("apis")
          .select("id, name, endpoint")
          

        if (keysRes.data) setKeys(keysRes.data)
        if (apisRes.data) {
          setApis(apisRes.data)
          if (apisRes.data.length > 0) {
            setSelectedApiId(apisRes.data[0].id)
          }
        }
      } catch (err) {
        console.error("Failed to load dashboard api keys:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const refreshKeys = async (userId: string) => {
    const keysRes = await supabase
      .from("api_keys")
      .select("*, apis(name, endpoint)")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false })
      
    if (keysRes.data) setKeys(keysRes.data)
  }

  // Handle generation of a new key via gateway
  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyName || !selectedApiId || !user) return

    setGenerating(true)
    try {
      const selectedApi = apis.find((a) => a.id === selectedApiId)
      if (!selectedApi) return

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch("http://localhost:8000/v1/keys/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          api_name: selectedApi.name,
          env_scope: newKeyEnv
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.detail?.error?.message || "Failed to generate key.")
      }

      const result = await response.json()
      if (result.key) {
        setNewPlaintextKey(result.key)
        await refreshKeys(user.id)
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while generating key.")
    } finally {
      setGenerating(false)
    }
  }

  // Revoke a key permanently
  const handleRevokeKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from("api_keys")
        .update({ status: "revoked" })
        .eq("id", id)
        

      if (error) throw error

      if (user) await refreshKeys(user.id)
    } catch (err) {
      alert("Failed to revoke API key.")
    } finally {
      setRevokingKeyId(null)
    }
  }

  // Copy key preview
  const handleCopyPreview = (id: string, previewStr: string) => {
    navigator.clipboard.writeText(previewStr)
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 1500)
  }

  const handleCopyGeneratedKey = () => {
    if (newPlaintextKey) {
      navigator.clipboard.writeText(newPlaintextKey)
      setCopiedGeneratedKey(true)
      setTimeout(() => setCopiedGeneratedKey(false), 1500)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setNewPlaintextKey(null)
    setNewKeyName("")
  }

  // Group keys by API Name
  const groupedKeys: { [apiName: string]: ApiKeyItem[] } = {}
  keys.forEach((k) => {
    const apiName = k.apis?.name || "Unknown API"
    if (!groupedKeys[apiName]) {
      groupedKeys[apiName] = []
    }
    groupedKeys[apiName].push(k)
  })

  const apiNames = Object.keys(groupedKeys)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <svg className="animate-spin h-8 w-8 text-[#14532D]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-8 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">API Keys</h1>
          <p className="text-sm text-slate-500 mt-1">Manage credentials to authenticate with the KrishiSat agriculture intelligence services.</p>
        </div>
        
        <button
          onClick={() => setModalOpen(true)}
          className="h-10 bg-[#14532D] hover:bg-[#114524] text-white px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm focus:outline-none cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate API Key</span>
        </button>
      </div>

      {/* Security Warning Panel */}
      <div className="flex gap-3.5 p-4 bg-amber-50 border border-amber-200/80 rounded-xl max-w-3xl select-none">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-amber-900">Keep secret keys protected</h4>
          <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
            API keys are hashed securely in the database. Full keys can only be shown and copied once on generation. Do not check keys into public source repositories.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {keys.length === 0 ? (
        <div className="py-16 text-center select-none bg-white border border-slate-200 rounded-xl max-w-3xl">
          <Key className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="text-sm font-semibold text-slate-800">No active API credentials found.</p>
          <p className="text-xs text-slate-450 mt-1.5 max-w-xs mx-auto">
            You need to purchase access to an API from the catalog to generate a secret credential.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 mt-5 h-9 px-4 bg-[#14532D] hover:bg-[#114524] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            Browse API Catalog
          </Link>
        </div>
      ) : (
        /* Grouped Keys Lists */
        <div className="space-y-8 max-w-5xl">
          {apiNames.map((apiName) => (
            <div key={apiName} className="space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest bg-slate-100/60 p-2 rounded-lg border border-slate-200/50 w-fit">
                {apiName} Keys
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {groupedKeys[apiName].map((k) => {
                  const isRevoked = k.status === "revoked"
                  const isCurrentlyRevoking = revokingKeyId === k.id
                  const isCopied = copiedKeyId === k.id

                  // Create key preview
                  const envTag = k.env_scope === "live" ? "live" : "sandbox"
                  const keyPreview = `ks_${envTag}_${apiName.toLowerCase().replace(" ", "_")}_xxxx`

                  return (
                    <div
                      key={k.id}
                      className={cn(
                        "bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all",
                        isRevoked && "opacity-55 bg-slate-50/50"
                      )}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3 select-none">
                          <span
                            className={cn(
                              "text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide",
                              isRevoked
                                ? "bg-slate-200 text-slate-400"
                                : k.env_scope === "live"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-blue-50 text-blue-700 border border-blue-100"
                            )}
                          >
                            {k.env_scope}
                          </span>

                          <span
                            className={cn(
                              "text-[9px] font-bold px-2 py-0.5 rounded-full",
                              isRevoked ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-700"
                            )}
                          >
                            {k.status}
                          </span>
                        </div>

                        <h3 className={cn("text-sm font-extrabold text-slate-800", isRevoked && "line-through text-slate-400")}>
                          {k.name}
                        </h3>

                        {/* Obfuscated Key Preview */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between font-mono text-xs text-slate-650 mt-3 select-all">
                          <span className="truncate max-w-[190px]">
                            {keyPreview}
                          </span>
                          <button
                            onClick={() => handleCopyPreview(k.id, keyPreview)}
                            className="p-1 rounded text-slate-400 hover:text-slate-850 cursor-pointer focus:outline-none"
                            title="Copy Key Preview"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center select-none text-xs">
                        <span className="text-[10px] text-slate-400 font-medium">
                          Created {new Date(k.created_at).toLocaleDateString()}
                        </span>

                        {isRevoked ? (
                          <span className="text-slate-405 font-bold italic">Revoked</span>
                        ) : isCurrentlyRevoking ? (
                          <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-1 duration-150">
                            <span className="text-[10px] font-semibold text-rose-650">Confirm?</span>
                            <button
                              onClick={() => handleRevokeKey(k.id)}
                              className="px-2 py-1 bg-rose-650 hover:bg-rose-700 text-white rounded text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setRevokingKeyId(null)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-semibold transition-colors cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRevokingKeyId(k.id)}
                            className="text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer"
                          >
                            Revoke Key
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Generate API Key */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-none">
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Modal Card */}
          <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 w-full max-w-[440px] z-50 animate-in slide-in-from-top-4 duration-300 flex flex-col gap-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Generate API Key</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Select target API and labeling scopes for the new credential.</p>
            </div>

            {newPlaintextKey ? (
              /* Success display */
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-900">Security Warning</h4>
                    <p className="text-xs text-rose-700 leading-normal mt-0.5">
                      Copy this key now. It will not be shown again.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between font-mono text-xs text-slate-800">
                  <span className="truncate max-w-[260px] select-all font-semibold text-slate-900">
                    {newPlaintextKey}
                  </span>
                  <button
                    onClick={handleCopyGeneratedKey}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
                  >
                    {copiedGeneratedKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in-50" />
                        <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] font-semibold text-slate-500">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCloseModal}
                    className="h-10 bg-[#14532D] hover:bg-[#114524] text-white px-5 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Generator Form */
              <form onSubmit={handleGenerateKey} className="flex flex-col gap-4">
                {/* Key Label */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="keyName" className="text-xs font-semibold text-slate-700">
                    Key Label Name
                  </label>
                  <input
                    id="keyName"
                    type="text"
                    required
                    placeholder="e.g. NDVI sandbox client"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]/10 focus:border-[#14532D] transition-all"
                  />
                </div>

                {/* Target API Selection */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="targetApi" className="text-xs font-semibold text-slate-700">
                    Target Endpoint API
                  </label>
                  <select
                    id="targetApi"
                    value={selectedApiId}
                    onChange={(e) => setSelectedApiId(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]/10 focus:border-[#14532D] transition-all"
                  >
                    {apis.map((api) => (
                      <option key={api.id} value={api.id}>
                        {api.name} Index ({api.endpoint})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scope Selection */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Environment Scope</span>
                  <div className="flex gap-3">
                    <label
                      className={cn(
                        "flex-1 border rounded-lg p-3 flex flex-col gap-1 cursor-pointer select-none transition-all",
                        newKeyEnv === "sandbox"
                          ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                          : "border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <input
                        type="radio"
                        name="envType"
                        checked={newKeyEnv === "sandbox"}
                        onChange={() => setNewKeyEnv("sandbox")}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold text-slate-800">Sandbox</span>
                      <span className="text-[10px] text-slate-400 leading-normal">Mock indices. Quotas limited to 1,000 calls.</span>
                    </label>

                    <label
                      className={cn(
                        "flex-1 border rounded-lg p-3 flex flex-col gap-1 cursor-pointer select-none transition-all",
                        newKeyEnv === "live"
                          ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                          : "border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <input
                        type="radio"
                        name="envType"
                        checked={newKeyEnv === "live"}
                        onChange={() => setNewKeyEnv("live")}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold text-slate-800">Production</span>
                      <span className="text-[10px] text-slate-400 leading-normal">Real Sentinel satellite pipelines. Billing active.</span>
                    </label>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-2.5 mt-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="h-10 px-4 border border-slate-200 rounded-lg text-slate-650 hover:bg-slate-50 text-sm font-semibold transition-colors focus:outline-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={generating}
                    className="h-10 px-4 bg-[#14532D] hover:bg-[#114524] disabled:bg-[#14532D]/50 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none shadow-sm cursor-pointer flex items-center justify-center min-w-[100px]"
                  >
                    {generating ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      "Generate"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
