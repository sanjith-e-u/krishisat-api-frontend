"use client"

import React, { useState } from "react"
import { Eye, EyeOff, Copy, Trash2, Key, Check, Plus, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  env: "Sandbox" | "Production";
  created: string;
  status: "Active" | "Inactive";
}

const initialKeys: ApiKeyItem[] = [
  {
    id: "1",
    name: "Development Sandbox Key",
    key: "ks_test_9jF2k8L1m9P4w0XqZ",
    env: "Sandbox",
    created: "2026-06-10",
    status: "Active"
  },
  {
    id: "2",
    name: "Production Main API Key",
    key: "ks_live_3aD7s5N2p8K0w1YvR",
    env: "Production",
    created: "2026-06-11",
    status: "Active"
  }
]

export default function DashboardApiKeys() {
  const [keys, setKeys] = useState<ApiKeyItem[]>(initialKeys)
  const [modalOpen, setModalOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyEnv, setNewKeyEnv] = useState<"Sandbox" | "Production">("Sandbox")
  const [revealKeyId, setRevealKeyId] = useState<string | null>(null)
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  // Handle generation of a new key
  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyName) return

    const prefix = newKeyEnv === "Sandbox" ? "ks_test_" : "ks_live_"
    // Generate random alphanumeric characters
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let randomString = ""
    for (let i = 0; i < 17; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const newKey: ApiKeyItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: newKeyName,
      key: prefix + randomString,
      env: newKeyEnv,
      created: new Date().toISOString().split("T")[0],
      status: "Active"
    }

    setKeys([newKey, ...keys])
    setNewKeyName("")
    setNewKeyEnv("Sandbox")
    setModalOpen(false)
  }

  // Toggle activation state of a key
  const handleToggleStatus = (id: string) => {
    setKeys(
      keys.map((k) => {
        if (k.id === id) {
          return { ...k, status: k.status === "Active" ? "Inactive" : "Active" }
        }
        return k
      })
    )
  }

  // Delete a key
  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id))
  }

  // Copy key to clipboard
  const handleCopy = (id: string, keyValue: string) => {
    navigator.clipboard.writeText(keyValue)
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  return (
    <div className="space-y-8 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">API Keys</h1>
          <p className="text-sm text-slate-500 mt-1">Manage authentication credentials for your KrishiSat applications.</p>
          </div>
          
          <button
            onClick={() => setModalOpen(true)}
            className="h-10 bg-[#14532D] hover:bg-[#114524] text-white px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm focus:outline-none"
          >
            <Plus className="w-4 h-4" />
            <span>Generate API Key</span>
          </button>
        </div>

        {/* Security Warning Panel */}
        <div className="flex gap-3.5 p-4 bg-amber-50 border border-amber-200/80 rounded-xl max-w-3xl">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-900">Keep your secret keys secure</h4>
            <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
              These credentials grant full programmatic access to your KrishiSat index credits and farm registers. Never expose keys in client-side code, git repositories, or public forums.
            </p>
          </div>
        </div>

        {/* Keys List Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="text-left py-3 px-5 font-sans">Name</th>
                  <th className="text-left py-3 px-5 font-sans">Environment</th>
                  <th className="text-left py-3 px-5 font-sans">API Key Token</th>
                  <th className="text-left py-3 px-5 font-sans">Created</th>
                  <th className="text-left py-3 px-5 font-sans">Status</th>
                  <th className="text-right py-3 px-5 font-sans">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {keys.map((k) => {
                  const isRevealed = revealKeyId === k.id
                  const isCopied = copiedKeyId === k.id
                  return (
                    <tr key={k.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name */}
                      <td className="py-4.5 px-5 font-semibold text-slate-800">{k.name}</td>
                      
                      {/* Environment Badge */}
                      <td className="py-4.5 px-5">
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2.5 py-0.5 rounded font-mono uppercase tracking-wide",
                            k.env === "Production"
                              ? "bg-[#22C55E]/10 text-[#22C55E]"
                              : "bg-[#14532D]/5 text-[#14532D]"
                          )}
                        >
                          {k.env}
                        </span>
                      </td>

                      {/* Obfuscated Key */}
                      <td className="py-4.5 px-5 font-mono text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className="select-all">
                            {isRevealed ? k.key : `${k.key.substring(0, 8)}••••••••••••••••`}
                          </span>
                          <button
                            onClick={() => setRevealKeyId(isRevealed ? null : k.id)}
                            className="p-1 rounded text-slate-400 hover:text-slate-600 focus:outline-none"
                            title={isRevealed ? "Hide API key" : "Show API key"}
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Created date */}
                      <td className="py-4.5 px-5 text-slate-500 font-medium">{k.created}</td>

                      {/* Status */}
                      <td className="py-4.5 px-5">
                        <button
                          onClick={() => handleToggleStatus(k.id)}
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full select-none focus:outline-none flex items-center gap-1",
                            k.status === "Active"
                              ? "bg-emerald-50 text-[#14532D]"
                              : "bg-slate-100 text-slate-400"
                          )}
                        >
                          <span className={cn("w-1 h-1 rounded-full", k.status === "Active" ? "bg-[#22C55E]" : "bg-slate-400")} />
                          {k.status}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleCopy(k.id, k.key)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 transition-colors focus:outline-none flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                            title="Copy key token"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? "Copied" : "Copy"}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteKey(k.id)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 bg-white hover:bg-rose-50 transition-colors focus:outline-none"
                            title="Delete key credentials"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {keys.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <Key className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold">No active API credentials found.</p>
                      <p className="text-xs text-slate-400 mt-1">Generate a key above to start query integrations.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Generate API Key */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-none">
            {/* Backdrop */}
            <div
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            />

            {/* Modal Card */}
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 w-full max-w-[440px] z-50 animate-in slide-in-from-top-4 duration-300 flex flex-col gap-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Generate API Key</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Select scopes and labels for the new credential token.</p>
              </div>

              <form onSubmit={handleGenerateKey} className="flex flex-col gap-4">
                {/* Key Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="keyName" className="text-xs font-semibold text-slate-700">
                    Key Name
                  </label>
                  <input
                    id="keyName"
                    type="text"
                    required
                    placeholder="e.g. Sandbox Testing"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]/10 focus:border-[#14532D] transition-all"
                  />
                </div>

                {/* Scope Environment */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Environment Scope</span>
                  <div className="flex gap-3">
                    <label
                      className={cn(
                        "flex-1 border rounded-lg p-3 flex flex-col gap-1 cursor-pointer select-none transition-all",
                        newKeyEnv === "Sandbox"
                          ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                          : "border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <input
                        type="radio"
                        name="envType"
                        checked={newKeyEnv === "Sandbox"}
                        onChange={() => setNewKeyEnv("Sandbox")}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold text-slate-800">Sandbox</span>
                      <span className="text-[10px] text-slate-400 leading-normal">Query mock indexes. Quotas limited to 1,000 calls.</span>
                    </label>

                    <label
                      className={cn(
                        "flex-1 border rounded-lg p-3 flex flex-col gap-1 cursor-pointer select-none transition-all",
                        newKeyEnv === "Production"
                          ? "border-[#14532D] bg-[#14532D]/5 ring-2 ring-[#14532D]/10"
                          : "border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <input
                        type="radio"
                        name="envType"
                        checked={newKeyEnv === "Production"}
                        onChange={() => setNewKeyEnv("Production")}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold text-slate-800">Production</span>
                      <span className="text-[10px] text-slate-400 leading-normal">Invoke real satellite sensory math grids. Billing active.</span>
                    </label>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-2.5 mt-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="h-10 px-4 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-10 px-4 bg-[#14532D] hover:bg-[#114524] text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none shadow-sm"
                  >
                    Generate Key
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

    </div>
  )
}
