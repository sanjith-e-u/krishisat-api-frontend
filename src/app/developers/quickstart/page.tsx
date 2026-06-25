"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Terminal, Key, Satellite, ArrowRight, Code, CheckCircle } from "lucide-react"

const API_URL = "https://api.X-AGI.dev"

const PYTHON_CODE = `import requests

API_KEY = "ks_live_your_key_here"
BASE_URL = "https://api.X-AGI.dev/v1"

payload = {
    "farm_id": "farm_abc123",
    "geometry": {
        "type": "Polygon",
        "coordinates": [[[77.21, 28.63], [77.22, 28.63], [77.22, 28.64], [77.21, 28.64], [77.21, 28.63]]]
    },
    "date": "2024-01-15"
}

response = requests.post(
    f"{BASE_URL}/ndvi",
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    json=payload
)
print(response.json())`

const NODE_CODE = `const response = await fetch("https://api.X-AGI.dev/v1/ndvi", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ks_live_your_key_here",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    farm_id: "farm_abc123",
    geometry: {
      type: "Polygon",
      coordinates: [[[77.21, 28.63], [77.22, 28.63], [77.22, 28.64], [77.21, 28.64], [77.21, 28.63]]]
    },
    date: "2024-01-15"
  })
});
const data = await response.json();
console.log(data);`

const steps = [
  {
    step: "01",
    title: "Create your account",
    description: "Register on X-AGI and verify your email address.",
    code: null,
    link: "/register",
    linkLabel: "Create account →"
  },
  {
    step: "02",
    title: "Generate an API key",
    description: "Navigate to Dashboard → API Keys and generate your first key. Select Sandbox for testing.",
    code: `# Your key will look like this\nks_sandbox_Xq9mR4bL...`,
    link: "/dashboard/api-keys",
    linkLabel: "Open API Keys →"
  },
  {
    step: "03",
    title: "Register your first farm",
    description: "Submit a GeoJSON polygon defining your field boundary to receive a farm_id used in all subsequent calls.",
    code: `curl -X POST ${API_URL}/v1/farms \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Wheat Field A",
    "boundary": {
      "type": "Polygon",
      "coordinates": [[
        [77.21, 28.63], [77.25, 28.63],
        [77.25, 28.59], [77.21, 28.59],
        [77.21, 28.63]
      ]]
    }
  }'`,
    link: null,
    linkLabel: null
  },
  {
    step: "04",
    title: "Call your first NDVI index",
    description: "Use the farm_id from Step 3 to fetch the latest vegetation health index.",
    code: `curl -X POST ${API_URL}/v1/vegetation/ndvi \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "farm_id": "farm_abc123",
    "date": "2026-06-12"
  }'

# Response
{
  "farm_id": "farm_abc123",
  "index": "NDVI",
  "value": 0.74,
  "interpretation": "Healthy Dense Vegetation",
  "captured_at": "2026-06-12T08:14:22Z"
}`,
    link: null,
    linkLabel: null
  }
]

export default function QuickstartPage() {
  const [activeTab, setActiveTab] = useState<"curl" | "python" | "node">("curl")

  useEffect(() => {
    const savedTab = localStorage.getItem("codeTab")
    if (savedTab === "curl" || savedTab === "python" || savedTab === "node") {
      setActiveTab(savedTab)
    }
  }, [])

  const handleTabChange = (tab: "curl" | "python" | "node") => {
    setActiveTab(tab)
    localStorage.setItem("codeTab", tab)
  }

  return (
    <main className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/docs" className="text-xs text-slate-400 hover:text-primary font-semibold">Docs</Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-semibold text-slate-700">Quickstart</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Quickstart Guide</h1>
        <p className="text-lg text-slate-500 mt-3 max-w-2xl leading-relaxed">
          Make your first satellite vegetation call in under 5 minutes.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 select-none">
            <Terminal className="w-3 h-3" /> cURL / Python / Node.js
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 select-none">
            <Key className="w-3 h-3" /> API Key auth
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 select-none">
            <Satellite className="w-3 h-3" /> NDVI Index
          </span>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-12">
        {steps.map((step, idx) => (
          <div key={step.step} className="flex gap-8">
            <div className="flex flex-col items-center shrink-0 select-none">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">
                {idx < steps.length - 1 ? step.step : <CheckCircle className="w-5 h-5" />}
              </div>
              {idx < steps.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 mt-3" />}
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center gap-3 mb-1 select-none">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{step.step}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{step.title}</h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{step.description}</p>

              {step.link && (
                <Link href={step.link} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline mt-3 select-none">
                  {step.linkLabel} <ArrowRight className="w-3 h-3" />
                </Link>
              )}

              {idx === 3 ? (
                <div className="mt-4 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900 select-none">
                    <div className="flex gap-2">
                      {(["curl", "python", "node"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleTabChange(lang)}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                            activeTab === lang
                              ? "bg-[#14532D] text-white font-extrabold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {lang === "curl" ? "cURL" : lang === "python" ? "Python" : "Node.js"}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <pre className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
                    <code>
                      {activeTab === "curl"
                        ? step.code
                        : activeTab === "python"
                        ? PYTHON_CODE
                        : NODE_CODE}
                    </code>
                  </pre>
                </div>
              ) : (
                step.code && (
                  <div className="mt-4 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-900 select-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-slate-500 font-mono ml-2 uppercase tracking-widest">terminal</span>
                    </div>
                    <pre className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )
              )}

              {idx === 2 && (
                <div className="mt-4 p-4 rounded-xl border border-emerald-800/20 bg-emerald-50/20 text-xs text-slate-650 leading-relaxed font-sans">
                  💡 <strong>Don&apos;t have a GeoJSON polygon?</strong> Use{" "}
                  <a
                    href="https://geojson.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    geojson.io
                  </a>{" "}
                  to draw your farm boundary and export it directly.
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Next Steps */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 px-6 select-none">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extrabold text-slate-900 mb-8">What&apos;s next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Full API Reference", desc: "Browse all endpoints, parameters, and response schemas.", href: "/developers/reference", icon: Code },
              { title: "Full Documentation", desc: "Explore tutorials, SDK guides, and index interpretation.", href: "/docs", icon: Satellite }
            ].map((card) => {
              const Icon = card.icon
              return (
                <Link key={card.title} href={card.href} className="group flex gap-4 p-6 bg-white border border-slate-200 rounded-xl hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors ml-auto self-center shrink-0" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
