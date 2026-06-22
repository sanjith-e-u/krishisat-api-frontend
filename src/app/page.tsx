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
  Sprout,
} from "lucide-react";
import Terminal from "@/components/terminal";
import { ApiPlayground } from "@/components/api-playground";

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
                Satellite APIs & AI Models
              </h1>

              {/* Subheadline */}
              <p className="font-sans text-slate-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
                Integrate crop health indices, water stress, weather intelligence, and AI-powered farm predictions into your applications through a single developer platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href="/developers/quickstart"
                  className="bg-[#22C55E] hover:bg-[#1cbd53] text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2"
                >
                  Start Building <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-transparent"
                >
                  View Documentation
                </Link>
                <Link
                  href="/contact-sales"
                  className="text-slate-455 hover:text-white text-sm font-medium transition-colors ml-2"
                >
                  Contact Sales →
                </Link>
              </div>

              {/* Footnote */}
              <div className="text-[11px] text-slate-500 font-sans mb-12 select-none">
                Coming soon: KrishiSat AI Models — a new category of agricultural intelligence.{" "}
                <Link href="/models" className="text-[#22C55E] hover:underline font-semibold">
                  Learn more →
                </Link>
              </div>

              {/* Trust Numbers */}
              <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full max-w-lg pt-8 border-t border-slate-800">
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
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">2</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">AI Models coming soon</div>
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

      {/* SECTION 2.5: WHAT YOU GET */}
      <section className="bg-slate-900 py-24 border-b border-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#22C55E] font-mono uppercase">
              WHAT YOU GET
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
              Core Agricultural Telemetry APIs
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              KrishiSat delivers production-ready agricultural data interfaces through three core endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* NDVI API */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 flex items-center justify-center text-[#22C55E]">
                  <Sprout className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">NDVI API (Crop Health)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Retrieve Normalized Difference Vegetation Index (NDVI) values derived from Sentinel-2 bands to track temporal biomass changes, canopy chlorophyll absorption, and spatial crop vigor anomalies.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center">
                <code className="text-[10px] font-mono text-slate-500">POST /v1/vegetation/ndvi</code>
                <Link href="/docs#ndvi" className="text-xs text-[#22C55E] hover:underline inline-flex items-center gap-1">
                  Docs <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Weather API */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Weather API (Meteorology)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Query hyperlocal meteorological telemetry including precipitation accumulation, hourly temperature profiles, relative humidity, wind vectors, and growing degree days (GDD) mapped to farm centroids.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center">
                <code className="text-[10px] font-mono text-slate-500">POST /v1/weather</code>
                <Link href="/docs#weather" className="text-xs text-[#22C55E] hover:underline inline-flex items-center gap-1">
                  Docs <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Farm Monitoring */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                  <Map className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Farm Monitoring</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Register geographic farm coordinates using GeoJSON boundary polygons to initiate automated temporal Sentinel tiling lookups, spatial indexes calculations, and cloud coverage filtering.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center">
                <code className="text-[10px] font-mono text-slate-500">POST /v1/farms</code>
                <Link href="/docs#farm-registration" className="text-xs text-[#22C55E] hover:underline inline-flex items-center gap-1">
                  Docs <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
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
                  Satellite vegetation indices to monitor canopy health, density, and chlorophyll.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "NDVI", desc: "Detect crop health and growth stage from satellite imagery" },
                    { tag: "NDRE", desc: "Identify early chlorophyll stress invisible to standard cameras" },
                    { tag: "SAVI", desc: "Vegetation index adjusted for soil brightness in sparse cover areas" },
                    { tag: "CI", desc: "Estimate chlorophyll concentration as a proxy for crop nitrogen level" },
                    { tag: "EVI", desc: "Enhanced vegetation index for dense canopy and high-biomass crops" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-slate-100 text-[#14532D] px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{item.desc}</span>
                    </div>
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
                  Indices for crop moisture profiling, surface water boundaries, and drought stress.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "NDMI", desc: "Measure soil and vegetation water content to guide irrigation" },
                    { tag: "NDWI", desc: "Monitor surface water bodies and flood risk in farm boundaries" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-slate-100 text-[#14532D] px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{item.desc}</span>
                    </div>
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
                  Hyperlocal meteorological forecasts, heat indicators, and accumulation grids.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "Weather", desc: "Hyperlocal forecasts, precipitation tracking, and growing-degree days" },
                    { tag: "LST", desc: "Measure land surface temperature to detect heat stress zones" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-slate-100 text-[#14532D] px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{item.desc}</span>
                    </div>
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
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "Farms", desc: "Register geographic farm coordinates using GeoJSON boundary polygons" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-slate-100 text-[#14532D] px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{item.desc}</span>
                    </div>
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

      {/* SECTION 3.5: AI MODELS TEASER */}
      <section className="bg-white py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#2563EB] font-mono uppercase">
              AI MODELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2 mb-4">
              Agricultural AI Models — Coming Soon
            </h2>
            <p className="text-[#64748B] text-lg">
              Beyond indices — a new category of agricultural AI purpose-built for precision intelligence tasks that satellite telemetry alone cannot solve.
            </p>
          </div>

          {/* 2 Column Grid of Locked Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl">
            {/* Card 1 */}
            <div className="border border-[#E2E8F0] rounded-xl p-8 bg-slate-50/50 relative overflow-hidden custom-shadow opacity-60 grayscale-[30%] select-none flex flex-col justify-between min-h-[260px]">
              <div>
                {/* Coming Soon badge */}
                <div className="absolute top-4 right-4 bg-amber-50 border border-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </div>
                
                {/* Tag pill */}
                <span className="text-[9px] font-mono bg-slate-100 text-slate-605 border border-slate-200 px-2 py-0.5 rounded w-fit font-bold mb-5 block">
                  AI Model
                </span>
                
                {/* Redacted Title */}
                <div className="h-5 bg-slate-200/80 backdrop-blur-[3px] border border-slate-300/30 rounded-sm mb-3 w-[150px]" />
                
                <p className="text-slate-500 text-xs font-sans mt-4">
                  Confidential — details will be revealed at launch.
                </p>
              </div>

              {/* Disabled Button */}
              <div className="mt-6 pt-4 border-t border-slate-105/80">
                <button
                  disabled
                  className="w-full h-10 bg-[#14532D]/50 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 cursor-not-allowed"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-[#E2E8F0] rounded-xl p-8 bg-slate-50/50 relative overflow-hidden custom-shadow opacity-60 grayscale-[30%] select-none flex flex-col justify-between min-h-[260px]">
              <div>
                {/* Coming Soon badge */}
                <div className="absolute top-4 right-4 bg-amber-50 border border-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </div>
                
                {/* Tag pill */}
                <span className="text-[9px] font-mono bg-slate-100 text-slate-605 border border-slate-200 px-2 py-0.5 rounded w-fit font-bold mb-5 block">
                  AI Model
                </span>
                
                {/* Redacted Title */}
                <div className="h-5 bg-slate-200/80 backdrop-blur-[3px] border border-slate-300/30 rounded-sm mb-3 w-[175px]" />
                
                <p className="text-slate-500 text-xs font-sans mt-4">
                  Confidential — details will be revealed at launch.
                </p>
              </div>

              {/* Disabled Button */}
              <div className="mt-6 pt-4 border-t border-slate-105/80">
                <button
                  disabled
                  className="w-full h-10 bg-[#14532D]/50 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 cursor-not-allowed"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Link
              href="/models"
              className="text-[#2563EB] hover:text-[#1d4ed8] text-sm font-semibold inline-flex items-center gap-1.5 transition-colors group"
            >
              Explore all models <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
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
                  P95 latency stays under 500ms via our global edge cache. Webhooks coming soon — subscribe to field alerts and anomaly notifications directly in your application.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRY API IN 10 SECONDS */}
      <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column (35%) */}
            <div className="w-full lg:w-[35%] space-y-6">
              <span className="text-xs font-semibold tracking-widest text-[#2563EB] font-mono uppercase">
                DEVELOPER EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-2">
                Try API in 10 seconds
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Query our unified spatial analytics endpoints immediately. Enter your target coordinates as a GeoJSON polygon, select your agricultural indices, and retrieve real-time diagnostic indicators instantly.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "One token authentication for all data feeds",
                  "Standardized, developer-grade JSON payloads",
                  "Integrated edge caching for ultra-low latencies"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-[#64748B]">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/register"
                  className="bg-[#14532D] hover:bg-[#114524] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                  Start Sandbox
                </Link>
                <Link
                  href="/developers/reference"
                  className="border border-slate-300 hover:border-slate-400 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors bg-white"
                >
                  View API Reference
                </Link>
              </div>
            </div>

            {/* Right Column (65%) */}
            <div className="w-full lg:w-[65%] flex flex-col justify-center">
              <ApiPlayground />
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
            {/* Sandbox / Free */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 flex flex-col justify-between custom-shadow relative">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-mono uppercase tracking-wide">Free</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E2E8F0]">
                  <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Free</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> 1,000 API calls / month
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> No credit card required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Core vegetation indices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> 5 registered farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Community support
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center border border-slate-300 hover:border-slate-500 text-slate-700 font-medium py-2.5 rounded-lg text-sm transition-colors mt-auto"
              >
                Start for Free →
              </Link>
            </div>

            {/* Pay-as-you-go */}
            <div className="bg-white border-2 border-[#2563EB] rounded-lg p-8 flex flex-col justify-between custom-shadow relative">
              <span className="bg-[#2563EB] text-white text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded absolute top-4 right-4">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-mono uppercase tracking-wide">Pay-as-you-go</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E2E8F0]">
                  <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight">$0.005</span>
                  <span className="text-slate-500 font-mono text-sm">/ credit</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> $0.005 per credit consumed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Unlimited farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">✓</span> Full API access
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
                href="/register"
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
                    <span className="text-emerald-600">✓</span> Custom volume pricing
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
                href="/contact-sales"
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
              href="/developers/quickstart"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Start Building →
            </Link>
            <Link
              href="/contact-sales"
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
