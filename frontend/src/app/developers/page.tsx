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
    python: "pip install x-agi-sdk",
    node: "npm install @x-agi/sdk",
    go: "go get github.com/x-agi/x-agi-go"
  }

  const sdkCodeSnippets = {
    python: `import x_agi

client = x_agi.Client(api_key="ks_sandbox_your_secret_key")

# Fetch latest crop health metrics
ndvi = client.vegetation.ndvi(
    farm_id="farm_abc123",
    date="2026-06-12"
)

print(f"Crop Health (NDVI): {ndvi.value} - {ndvi.interpretation}")`,
    node: `import x_agi from '@x-agi/sdk';

const client = new X-AGI({
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
	"github.com/x-agi/x-agi-go"
)

func main() {
	client := x_agi.NewClient("ks_sandbox_your_secret_key")
	ctx := context.Background()

	ndvi, _ := client.Vegetation.NDVI(ctx, "farm_abc123", "2026-06-12")
	fmt.Printf("Crop Health (NDVI): %f - %s\\n", ndvi.Value, ndvi.Interpretation)
}`
  }

  return (
    <main className="bg-background min-h-screen font-sans text-foreground">
      {/* Hero Header */}
      <section className="bg-card border-b border-border text-foreground pt-16 pb-20 px-6 relative overflow-hidden custom-shadow">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto z-10 relative">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest border border-accent/20">
              Developer Hub
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Build the Future of <span className="text-accent">Precision Agriculture</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Integrate Sentinel-2 multi-spectral crop indices, hyperlocal meteorological telemetry, and automated GeoJSON plot boundary processing with developer-first API integrations.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/register" 
                className="btn-primary-hero text-accent-foreground px-6 py-3 rounded-xl text-sm font-bold transition-all custom-shadow inline-flex items-center gap-2"
              >
                Get Free API Key <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/docs" 
                className="bg-subtle hover:bg-muted text-foreground border border-border px-6 py-3 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2 custom-shadow"
              >
                <BookOpen className="w-4 h-4 text-muted-foreground" /> Read API Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Comprehensive Spatial Telemetry APIs
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to map, analyze, and optimize crop yields on a single unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Satellite Indices",
              desc: "Query high-resolution NDVI, NDRE, EVI, and SAVI vegetation indices calculated from fresh orbital passes.",
              icon: Sprout,
              color: "text-accent bg-accent/10"
            },
            {
              title: "Water & Moisture",
              desc: "Track canopy water stress indices (NDMI) and delineate surface waterlogged grids (NDWI) on demand.",
              icon: Layers,
              color: "text-blue-500 bg-blue-500/10"
            },
            {
              title: "Weather Telemetry",
              desc: "Retrieve hyperlocal growing degree days (GDD), temperature history, and rain accumulation mapped to your centroid.",
              icon: Cloud,
              color: "text-amber-500 bg-amber-500/10"
            },
            {
              title: "Farm Registry",
              desc: "Register complex spatial boundaries as simple GeoJSON polygons. The API manages coordinates mapping for you.",
              icon: Map,
              color: "text-purple-500 bg-purple-500/10"
            }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="bg-background p-6 border border-border rounded-2xl hover:border-accent/40 custom-shadow hover-glow transition-all space-y-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Developer Path: Quickstart & Reference */}
      <section className="bg-subtle border-y border-border/60 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Quickstart Highlight */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
              01 / Getting Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Make Your First Call in 5 Minutes
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
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
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
              02 / API Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Comprehensive API Reference
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
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
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
              03 / Native Libraries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Integration Ready SDKs
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              In addition to our REST endpoints, we publish open-source SDKs for Python, Node.js, and Go. Standardize authentication, auto-retry logic, and types validation directly in your codebase.
            </p>
            
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex justify-between text-xs text-muted-foreground border-b border-slate-100 pb-2">
                <span>Version</span>
                <span className="font-mono font-bold text-foreground">v1.2.0</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground border-b border-slate-100 pb-2">
                <span>License</span>
                <span className="font-bold text-foreground">MIT (Open Source)</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Base API Endpoint</span>
                <span className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">https://api.x-agi.dev</span>
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
                    activeSdk === "python" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-slate-200"
                  }`}
                >
                  python
                </button>
                <button
                  onClick={() => setActiveSdk("node")}
                  className={`px-4 py-3 text-xs font-bold font-mono transition-colors ${
                    activeSdk === "node" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-slate-200"
                  }`}
                >
                  node.js
                </button>
                <button
                  onClick={() => setActiveSdk("go")}
                  className={`px-4 py-3 text-xs font-bold font-mono transition-colors ${
                    activeSdk === "go" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-slate-200"
                  }`}
                >
                  go
                </button>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono tracking-widest">SDK PREVIEW</span>
            </div>

            {/* Install Cmd */}
            <div className="flex justify-between items-center bg-slate-950 px-5 py-3 border-b border-slate-900 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-bold select-none">$</span>
                <span>{sdkInstallCmds[activeSdk]}</span>
              </div>
              <button 
                onClick={() => handleCopy(sdkInstallCmds[activeSdk])}
                className="text-muted-foreground hover:text-white transition-colors"
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
                className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
                title="Copy code snippet"
              >
                {copiedText === sdkCodeSnippets[activeSdk] ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Support & Community Help */}
      <section className="bg-card border-t border-border py-16 px-6 text-center custom-shadow relative z-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <Terminal className="w-8 h-8 text-accent mx-auto" />
          <h2 className="text-2xl font-extrabold text-foreground">Need Help with Integration?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            Connect directly with our solutions engineering desk. We help agritech teams customize indices calculations queries.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link 
              href="/contact-sales" 
              className="bg-accent hover:bg-accent-strong text-accent-foreground text-xs font-bold px-6 py-2.5 rounded-lg transition-all custom-shadow"
            >
              Contact Solutions Engineers
            </Link>
            <a 
              href="mailto:support@x-agi.dev" 
              className="border border-border hover:border-accent hover:bg-subtle text-foreground text-xs font-bold px-6 py-2.5 rounded-lg transition-all"
            >
              support@x-agi.dev
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
