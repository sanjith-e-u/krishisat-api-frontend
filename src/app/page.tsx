import React from "react";
import Link from "next/link";
import {
  Activity,
  Zap,
  Map,
  Eye,
  Layers,
  Wind,
  Shield,
  Globe,
  ArrowRight,
  Database,
  Cpu,
} from "lucide-react";
import Terminal from "@/components/terminal";
import CodeBlock from "@/components/code-block";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] bg-[#0F172A] flex items-center py-20 overflow-hidden border-b border-slate-800">
        {/* Background Layers */}
        <div className="absolute inset-0 topo-pattern opacity-100 pointer-events-none" />
        
        {/* Dual Radial Glows */}
        <div className="absolute top-1/4 left-10 w-[400px] h-[400px] rounded-full bg-[#2563EB] opacity-20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[#06B6D4] opacity-[0.06] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (55%) */}
            <div className="lg:col-span-7 text-left flex flex-col items-start">
              {/* Version Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-slate-700 bg-slate-900/60 rounded-full font-mono text-xs text-slate-400 mb-8 select-none">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                v1.0 · Multi-Spectral Satellite · ap-south-1 live
              </div>

              {/* H1 Headline */}
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6">
                Agricultural Intelligence{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#06B6D4]">Infrastructure</span> for Developers
              </h1>

              {/* Subheadline */}
              <p className="font-sans text-slate-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
                Integrate crop health, water stress, weather intelligence, and farm analytics into your applications through a single satellite API platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  href="/developers"
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                  Start Building <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/developers"
                  className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-transparent"
                >
                  View Documentation
                </Link>
              </div>

              {/* Trust Numbers */}
              <div className="grid grid-cols-3 gap-8 w-full max-w-md pt-8 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">99.99%</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">API uptime</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">&lt;500ms</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">P95 latency</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">7</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">APIs live</div>
                </div>
              </div>
            </div>

            {/* Right Column (45%) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST METRICS BANNER */}
      <section className="bg-white border-y border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Col 1 */}
            <div className="flex flex-col items-center text-center p-2 first:pt-2 md:first:pt-2 md:p-4">
              <Activity className="w-5 h-5 text-[#2563EB] mb-3" />
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight">99.7%</div>
              <div className="text-xs text-[#64748B] mt-1 font-mono uppercase tracking-wider">API success rate</div>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-4 md:p-4">
              <Zap className="w-5 h-5 text-[#2563EB] mb-3" />
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight">&lt;420ms</div>
              <div className="text-xs text-[#64748B] mt-1 font-mono uppercase tracking-wider">Response time</div>
            </div>
            {/* Col 3 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-4 md:p-4">
              <Map className="w-5 h-5 text-[#2563EB] mb-3" />
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight">10m</div>
              <div className="text-xs text-[#64748B] mt-1 font-mono uppercase tracking-wider">Resolution</div>
            </div>
            {/* Col 4 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-4 md:p-4">
              <Eye className="w-5 h-5 text-[#2563EB] mb-3" />
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight">24/7</div>
              <div className="text-xs text-[#64748B] mt-1 font-mono uppercase tracking-wider">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT CATEGORIES */}
      <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#2563EB] font-mono uppercase">
              PRODUCT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2 mb-4">
              A unified intelligence layer for the field
            </h2>
            <p className="text-[#64748B] text-lg">
              Pick any combination of indices. One auth, one SDK, one response shape.
            </p>
          </div>

          {/* 2x2 Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 — Crop Health */}
            <div
              className="border border-[#E2E8F0] rounded-lg p-8 bg-white flex flex-col justify-between relative overflow-hidden custom-shadow group"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(10,54,34,0.06) 0%, transparent 60%)"
              }}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EF4444] via-[#FBBF24] to-[#22C55E]" />
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-6">
                  <Layers className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Crop Health</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  NDVI, NDRE, SAVI and CI indices to monitor vegetation density, chlorophyll, and biomass.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["/ndvi", "/ndre", "/savi", "/ci"].map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 2 — Water Intelligence */}
            <div
              className="border border-[#E2E8F0] rounded-lg p-8 bg-white flex flex-col justify-between relative overflow-hidden custom-shadow group"
              style={{
                backgroundImage: "radial-gradient(ellipse at top right, rgba(6,182,212,0.07) 0%, transparent 70%)"
              }}
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center mb-6">
                  <Activity className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Water</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  NDMI and NDWI for canopy water content, surface water accumulation, and drought stress.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["/ndmi", "/ndwi"].map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 3 — Weather Intelligence */}
            <div
              className="border border-[#E2E8F0] rounded-lg p-8 bg-white flex flex-col justify-between relative overflow-hidden custom-shadow group"
            >
              {/* Background pattern - faint sine wave */}
              <div className="absolute right-0 bottom-0 w-1/3 h-1/2 opacity-15 pointer-events-none">
                <svg className="w-full h-full text-[#06B6D4]" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 25 C 20 50, 40 0, 60 25 S 80 0, 100 25" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>
              </div>

              <div>
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center mb-6">
                  <Wind className="w-5 h-5 text-[#64748B]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Weather</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  Hyperlocal forecasts, precipitation tracking, temperature grids, and growing-degree days.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["/weather"].map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 4 — Farm Management */}
            <div
              className="border border-[#E2E8F0] rounded-lg p-8 bg-white flex flex-col justify-between relative overflow-hidden custom-shadow group"
            >
              {/* Background pattern - faint polygon grid */}
              <div className="absolute right-0 bottom-0 w-1/3 h-1/2 opacity-[0.06] text-[#2563EB] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="10,10 50,20 80,10 90,60 40,80" />
                  <polygon points="50,20 60,70 40,80" />
                </svg>
              </div>

              <div>
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-6">
                  <Map className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Farm Management</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  Register farm polygons, track per-plot telemetry, and schedule automated tile indexing.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["/farms"].map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-white py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-xs font-semibold tracking-widest text-[#2563EB] font-mono uppercase">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2">
              From polygon to production in three steps
            </h2>
          </div>

          {/* 3 Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col relative">
              <div className="text-5xl font-extrabold text-[#E2E8F0] font-mono mb-4">01</div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">Register a farm</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                POST a polygon GeoJSON, receive a stable <code className="font-mono text-xs bg-slate-100 px-1 rounded">farm_id</code>. Our system automatically indexes historical and current satellite tiles for the boundary.
              </p>
              {/* Separator on desktop */}
              <div className="hidden md:block absolute top-[28px] right-0 left-[20%] h-[1px] bg-slate-100 -z-10" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col relative">
              <div className="text-5xl font-extrabold text-[#E2E8F0] font-mono mb-4">02</div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">Call any API</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Request a single index or a structured payload of crop health, water, and weather diagnostics. One authentication token, one unified schema.
              </p>
              <div className="hidden md:block absolute top-[28px] right-0 left-[20%] h-[1px] bg-slate-100 -z-10" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col relative">
              <div className="text-5xl font-extrabold text-[#E2E8F0] font-mono mb-4">03</div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">Ship to production</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                P95 latency stays under 500ms via our global edge cache. Configure webhooks to alert you immediately of crop stress anomalies or weather developments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: API QUICK START */}
      <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#2563EB] font-mono uppercase">
                API
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2 mb-6">
                One request. Every index.
              </h2>
              <p className="text-[#64748B] text-base sm:text-lg mb-8 leading-relaxed">
                A single endpoint returns all agricultural intelligence indices for a registered farm polygon. Forget stitching together multiple third-party API providers or normalizing complex geospatial data shapes.
              </p>
              <Link
                href="/developers"
                className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                Read the docs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Column */}
            <div className="flex justify-center w-full">
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: X BOSON AI STORY */}
      <section className="bg-[#0F172A] py-24 text-left relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 topo-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#06B6D4] font-mono uppercase inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
              POWERED BY X BOSON AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-6">
              One unified intelligence engine
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              KrishiSat is built on X Boson AI&apos;s agricultural intelligence engine —
              fusing satellite imagery, meteorological arrays, farm boundaries, and custom agronomic AI models into a single, developer-grade API surface.
            </p>
          </div>

          {/* 2x2 Grid of Mini Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-2">Satellite Intelligence</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Multi-spectral satellite imagery fusion, optimized for 10-meter resolution grids with a reliable 5-day cadence.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-2">Weather Intelligence</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Hyperlocal meteorological models, forecasts, and growing-degree day telemetry indexed directly to your farm boundaries.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-500/10 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-2">Farm Intelligence</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Unified polygon registry, automated tile overlap alignment, and historical time-series analytics.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-2">AI Intelligence</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Spectral signal fusion models that cross-reference sensor bands, soil metadata, and local moisture variables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING PREVIEW */}
      <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#2563EB] font-mono uppercase">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2 mb-3">
              Usage-based. No commitments.
            </h2>
            <p className="text-[#64748B]">
              Start free, scale with credits.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
            {/* Sandbox */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 flex flex-col justify-between custom-shadow relative">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-mono uppercase tracking-wide">Sandbox</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E2E8F0]">
                  <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Free</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> 5 registered farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Core vegetation indices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> 1,000 API calls / month
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Community support
                  </li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="w-full text-center border border-slate-300 hover:border-slate-500 text-slate-700 font-medium py-2.5 rounded-lg text-sm transition-colors mt-auto"
              >
                Start for Free →
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-[#2563EB] rounded-lg p-8 flex flex-col justify-between custom-shadow relative">
              <span className="bg-[#2563EB] text-white text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded absolute top-4 right-4">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-mono uppercase tracking-wide">Pro</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E2E8F0]">
                  <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight">$0.004</span>
                  <span className="text-slate-500 font-mono text-sm">/ credit</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Unlimited farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Full API access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Pooled credit model
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Email support + SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Usage analytics
                  </li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="w-full text-center bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-auto shadow-sm"
              >
                Start Building →
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 flex flex-col justify-between custom-shadow relative">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-mono uppercase tracking-wide">Enterprise</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E2E8F0]">
                  <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Custom</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Volume pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Dedicated SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> VPC deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Custom data cadence
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Dedicated support
                  </li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="w-full text-center border border-slate-300 hover:border-slate-500 text-slate-700 font-medium py-2.5 rounded-lg text-sm transition-colors mt-auto"
              >
                Contact Sales →
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1 transition-colors">
              See full pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: TRUST SIGNALS */}
      <section className="bg-white py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-white border-l-[3px] border-[#06B6D4]">
              <Zap className="w-5 h-5 text-[#06B6D4] mb-3" />
              <h4 className="text-base font-bold text-[#0F172A] mb-1">Sub-500ms P95</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Global edge caching with stale-while-revalidate protocols for immediate spatial data.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white border-l-[3px] border-[#2563EB]">
              <Shield className="w-5 h-5 text-[#2563EB] mb-3" />
              <h4 className="text-base font-bold text-[#0F172A] mb-1">SOC 2-aligned</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Encryption in transit and at rest. Pinned regional storage paths protect data boundary sovereignty.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white border-l-[3px] border-[#8B5CF6]">
              <Globe className="w-5 h-5 text-[#8B5CF6] mb-3" />
              <h4 className="text-base font-bold text-[#0F172A] mb-1">Worldwide coverage</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Multi-spectral optical sensor bands combined, offering 10m resolutions globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: BOTTOM CTA BANNER */}
      <section className="bg-[#0F172A] py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 topo-pattern opacity-5 pointer-events-none" />
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#2563EB] opacity-10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 z-10 relative flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Build with agricultural intelligence today.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-sans">
            Free sandbox. No credit card required. Production-ready in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/developers"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Start Building →
            </Link>
            <Link
              href="/pricing"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-transparent"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
