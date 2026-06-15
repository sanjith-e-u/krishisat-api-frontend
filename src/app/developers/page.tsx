"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  Sprout, 
  Cloud, 
  Map, 
  Terminal, 
  ArrowRight, 
  BookOpen, 
  Layers,
  Check,
  Copy
} from "lucide-react"

export default function DevelopersHubPage() {
  const [activeSdk, setActiveSdk] = useState<"python" | "node" | "go">("python")
  const [copiedText, setCopiedText] = useState("")

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const sdkInstallCmds = {
    python: "pip install krishisat-sdk",
    node: "npm install @krishisat/sdk",
    go: "go get github.com/krishisat/krishisat-go"
  }

  const sdkCodeSnippets = {
    python: `import krishisat

client = krishisat.Client(api_key="ks_sandbox_your_secret_key")

# Fetch latest crop health metrics
ndvi = client.vegetation.ndvi(
    farm_id="farm_abc123",
    date="2026-06-12"
)

print(f"Crop Health (NDVI): {ndvi.value} - {ndvi.interpretation}")`,
    node: `import KrishiSat from '@krishisat/sdk';

const client = new KrishiSat({
  apiKey: 'ks_sandbox_your_secret_key'
});

// Fetch latest crop health metrics
const ndvi = await client.vegetation.ndvi({
  farmId: 'farm_abc123',
  date: '2026-06-12'
});

console.log(\`Crop Health (NDVI): \${ndvi.value} - \${ndvi.interpretation}\`);`,
    go: `package main

import (
	"context"
	"fmt"
	"github.com/krishisat/krishisat-go"
)

func main() {
	client := krishisat.NewClient("ks_sandbox_your_secret_key")
	ctx := context.Background()

	ndvi, _ := client.Vegetation.NDVI(ctx, "farm_abc123", "2026-06-12")
	fmt.Printf("Crop Health (NDVI): %f - %s\\n", ndvi.Value, ndvi.Interpretation)
}`
  }

  return (
    <main className="bg-white min-h-screen font-sans text-slate-800">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white pt-16 pb-20 px-6 relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto z-10 relative">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold text-agri bg-agri/10 px-3 py-1 rounded-full uppercase tracking-widest border border-agri/20">
              Developer Hub
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Build the Future of <span className="text-[#22C55E]">Precision Agriculture</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Integrate Sentinel-2 multi-spectral crop indices, hyperlocal meteorological telemetry, and automated GeoJSON plot boundary processing with developer-first API integrations.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/register" 
                className="bg-[#14532D] hover:bg-[#114524] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                Get Free API Key <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/docs" 
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-slate-400" /> Read API Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Spatial Telemetry APIs
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to map, analyze, and optimize crop yields on a single unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Satellite Indices",
              desc: "Query high-resolution NDVI, NDRE, EVI, and SAVI vegetation indices calculated from fresh orbital passes.",
              icon: Sprout,
              color: "text-emerald-600 bg-emerald-50"
            },
            {
              title: "Water & Moisture",
              desc: "Track canopy water stress indices (NDMI) and delineate surface waterlogged grids (NDWI) on demand.",
              icon: Layers,
              color: "text-blue-600 bg-blue-50"
            },
            {
              title: "Weather Telemetry",
              desc: "Retrieve hyperlocal growing degree days (GDD), temperature history, and rain accumulation mapped to your centroid.",
              icon: Cloud,
              color: "text-amber-600 bg-amber-50"
            },
            {
              title: "Farm Registry",
              desc: "Register complex spatial boundaries as simple GeoJSON polygons. The API manages coordinates mapping for you.",
              icon: Map,
              color: "text-indigo-600 bg-indigo-50"
            }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="p-6 border border-slate-200/80 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all space-y-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Developer Path: Quickstart & Reference */}
      <section className="bg-slate-50 border-y border-slate-200/60 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Quickstart Highlight */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              01 / Getting Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Make Your First Call in 5 Minutes
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our Quickstart guide walks you through setting up a sandbox API key, registering a field boundary using custom polygons, and fetching your first vegetation report using cURL or HTTP packages.
            </p>
            <div className="pt-2">
              <Link 
                href="/developers/quickstart" 
                className="text-primary hover:text-[#114524] text-sm font-bold inline-flex items-center gap-1.5 transition-all group"
              >
                Go to Quickstart Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Reference Highlight */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              02 / API Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive API Reference
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explore our developer-friendly endpoint specifications. We detail query parameters, rate limits, credit usage schemas, standard HTTP errors, and response envelopes for all telemetry indicators.
            </p>
            <div className="pt-2">
              <Link 
                href="/developers/reference" 
                className="text-primary hover:text-[#114524] text-sm font-bold inline-flex items-center gap-1.5 transition-all group"
              >
                Open API Reference <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SDK section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              03 / Native Libraries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Integration Ready SDKs
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              In addition to our REST endpoints, we publish open-source SDKs for Python, Node.js, and Go. Standardize authentication, auto-retry logic, and types validation directly in your codebase.
            </p>
            
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>Version</span>
                <span className="font-mono font-bold text-slate-800">v1.2.0</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>License</span>
                <span className="font-bold text-slate-800">MIT (Open Source)</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Base API Endpoint</span>
                <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">https://api.krishisat.dev</span>
              </div>
            </div>
          </div>

          {/* Right code/terminal column */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Header Tabs */}
            <div className="flex justify-between items-center bg-slate-900 px-4 border-b border-slate-800">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSdk("python")}
                  className={`px-4 py-3 text-xs font-bold font-mono transition-colors ${
                    activeSdk === "python" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  python
                </button>
                <button
                  onClick={() => setActiveSdk("node")}
                  className={`px-4 py-3 text-xs font-bold font-mono transition-colors ${
                    activeSdk === "node" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  node.js
                </button>
                <button
                  onClick={() => setActiveSdk("go")}
                  className={`px-4 py-3 text-xs font-bold font-mono transition-colors ${
                    activeSdk === "go" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  go
                </button>
              </div>
              <span className="text-[10px] text-slate-600 font-mono tracking-widest">SDK PREVIEW</span>
            </div>

            {/* Install Cmd */}
            <div className="flex justify-between items-center bg-slate-950 px-5 py-3 border-b border-slate-900 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-bold select-none">$</span>
                <span>{sdkInstallCmds[activeSdk]}</span>
              </div>
              <button 
                onClick={() => handleCopy(sdkInstallCmds[activeSdk])}
                className="text-slate-500 hover:text-white transition-colors"
                title="Copy install command"
              >
                {copiedText === sdkInstallCmds[activeSdk] ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Code Snippet */}
            <div className="relative">
              <pre className="p-6 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
                <code>{sdkCodeSnippets[activeSdk]}</code>
              </pre>
              <button 
                onClick={() => handleCopy(sdkCodeSnippets[activeSdk])}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                title="Copy code snippet"
              >
                {copiedText === sdkCodeSnippets[activeSdk] ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Support & Community Help */}
      <section className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <Terminal className="w-8 h-8 text-primary mx-auto" />
          <h2 className="text-2xl font-extrabold">Need Help with Integration?</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            Connect directly with our solutions engineering desk. We help agritech teams customize indices calculations queries.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link 
              href="/contact-sales" 
              className="bg-primary hover:bg-[#114524] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all"
            >
              Contact Solutions Engineers
            </Link>
            <a 
              href="mailto:support@krishisat.dev" 
              className="border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-bold px-6 py-2.5 rounded-lg transition-all"
            >
              support@krishisat.dev
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
