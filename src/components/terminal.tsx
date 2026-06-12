"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"

export default function Terminal() {
  const [copied, setCopied] = useState(false)

  const jsonContent = `{
  "farm_id": "KR-1024",
  "ndvi": 0.82,
  "ndmi": 0.67,
  "weather": {
    "temp": 29,
    "rainfall": 12
  },
  "status": "success",
  "latency": "420ms"
}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy JSON: ", err)
    }
  }

  return (
    <div
      className="rounded-xl border border-slate-700 overflow-hidden shadow-2xl shadow-black/50 font-mono w-full max-w-lg mx-auto md:mx-0 bg-[#0D1117]"
      style={{ filter: "drop-shadow(0 0 40px rgba(6,182,212,0.08))" }}
    >
      {/* Top Bar */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-1.5 w-1/4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
        </div>
        <div className="text-xs text-slate-400 font-mono tracking-wide truncate max-w-[200px] sm:max-w-none">
          POST /v1/intelligence
        </div>
        <div className="flex items-center justify-end gap-2 w-1/4">
          <span className="bg-green-500/10 text-green-400 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium border border-green-500/20">
            200 OK
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded bg-slate-900 hover:bg-slate-750 text-slate-400 hover:text-white transition-all border border-slate-700/50"
            title="Copy JSON response"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 text-sm leading-relaxed overflow-x-auto text-left">
        <pre className="font-mono text-xs sm:text-sm">
          <span className="text-slate-600">{"{"}</span>
          {"\n  "}
          <span className="text-slate-400">&quot;farm_id&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-emerald-400">&quot;KR-1024&quot;</span>
          <span className="text-slate-600">,</span>
          {"\n  "}
          <span className="text-slate-400">&quot;ndvi&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-amber-400">0.82</span>
          <span className="text-slate-600">,</span>
          {"\n  "}
          <span className="text-slate-400">&quot;ndmi&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-amber-400">0.67</span>
          <span className="text-slate-600">,</span>
          {"\n  "}
          <span className="text-slate-400">&quot;weather&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-slate-600">{"{"}</span>
          {"\n    "}
          <span className="text-slate-400">&quot;temp&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-amber-400">29</span>
          <span className="text-slate-600">,</span>
          {"\n    "}
          <span className="text-slate-400">&quot;rainfall&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-amber-400">12</span>
          {"\n  "}
          <span className="text-slate-600">{"}"}</span>
          <span className="text-slate-600">,</span>
          {"\n  "}
          <span className="text-slate-400">&quot;status&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-emerald-400">&quot;success&quot;</span>
          <span className="text-slate-600">,</span>
          {"\n  "}
          <span className="text-slate-400">&quot;latency&quot;</span>
          <span className="text-slate-600">:</span>{" "}
          <span className="text-emerald-400">&quot;420ms&quot;</span>
          {"\n"}
          <span className="text-slate-600">{"}"}</span>
        </pre>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-900 px-4 py-2.5 flex justify-between border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-slate-400">live</span>
        </div>
        <div>region: ap-south-1</div>
        <div className="hidden sm:block">req_id: 8c1a…f0d2</div>
      </div>
    </div>
  )
}
