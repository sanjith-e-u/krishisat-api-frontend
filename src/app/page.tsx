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
import { Tilt } from "@/components/tilt";
import { MouseSpotlight } from "@/components/mouse-spotlight";
import { HeroGlobe } from "@/components/hero-globe";
import { Counter } from "@/components/counter";
import { Particles } from "@/components/particles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MouseSpotlight />
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] bg-background flex flex-col justify-start pt-32 pb-24 overflow-hidden border-b border-border">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-grid-fade opacity-100 pointer-events-none z-0" />
        <Particles className="z-0" />
        
        {/* Globe Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-30 mix-blend-screen w-full hidden md:flex justify-center animate-float">
          <HeroGlobe />
        </div>

        <div className="absolute inset-0 scanlines pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 w-full z-10 flex flex-col items-center text-center">
          
          {/* Top Content Stack */}
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card/60 backdrop-blur-sm rounded-full font-mono text-xs text-muted-foreground mb-8 select-none btn-magnetic">
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
              <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-accent" />
            </div>
            v1.0 · Multi-Spectral Satellite · ap-south-1 live
          </div>

          {/* H1 Headline */}
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            <span className="text-holo">Agricultural APIs</span>
            <span className="text-foreground/90"> & </span>
            <span className="font-serif-accent italic font-normal tracking-[-0.01em] text-gold-shimmer pr-2">intelligence</span>
            <span className="text-foreground/90">models</span>
          </h1>

          {/* Gilded Divider */}
          <div className="h-px w-40 mb-6 mx-auto" style={{ background: "linear-gradient(to right, transparent, color-mix(in oklab, var(--gold) 55%, transparent), color-mix(in oklab, var(--gold) 90%, transparent), color-mix(in oklab, var(--gold) 55%, transparent), transparent)" }} />

          {/* Subheadline */}
          <p className="font-sans text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed mb-8 mx-auto">
            Integrate crop health indices, water stress, weather intelligence, and AI-powered farm predictions into your applications through a single developer platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <Link
              href="/developers/quickstart"
              className="btn-primary-hero text-accent-foreground px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2"
            >
              Start Building <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="btn-secondary text-foreground px-6 py-3 rounded-lg text-sm font-medium"
            >
              View Documentation
            </Link>
            <Link
              href="/contact-sales"
              className="btn-tertiary-hero text-sm font-medium ml-2 flex items-center gap-1"
            >
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Footnote */}
          <div className="text-[11px] text-muted-foreground font-sans mb-12 select-none">
            Coming soon: X-AGI AI Models — a new category of agricultural intelligence.{" "}
            <Link href="/models" className="text-accent hover:underline font-semibold">
              Learn more →
            </Link>
          </div>

          {/* Marquee Ticker (Inline Block) */}
          <div className="w-full max-w-5xl border-y border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden py-4 flex items-center mb-16 rounded-xl">
            <div className="flex gap-16 w-max animate-marquee text-muted-foreground/60 opacity-60 grayscale font-sans font-bold text-sm tracking-widest uppercase items-center">
              <span>NDVI</span>
              <span>NDMI</span>
              <span>NDRE</span>
              <span>SAVI</span>
              <span>EVI</span>
              <span>NDWI</span>
              <span>Weather</span>
              <span>Farm Monitoring</span>
              <span>NDVI</span>
              <span>NDMI</span>
              <span>NDRE</span>
              <span>SAVI</span>
              <span>EVI</span>
              <span>NDWI</span>
              <span>Weather</span>
              <span>Farm Monitoring</span>
            </div>
          </div>

          {/* Code Panel (Terminal) */}
          <div className="w-full max-w-4xl mx-auto flex justify-center mb-12">
            <Terminal />
          </div>

          {/* Trust Metrics Banner (Moved from Section 2) */}
          <div className="w-full max-w-5xl bg-card/50 backdrop-blur-md rounded-xl p-6 custom-shadow border border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
              {/* Col 1 */}
              <div className="flex flex-col items-center text-center p-2 first:pt-2 md:first:pt-2 md:p-4">
                <Activity className="w-5 h-5 text-accent mb-3" />
                <Counter value={99.7} decimals={1} suffix="%" className="text-2xl font-bold text-foreground tracking-tight" />
                <div className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">API success rate</div>
              </div>
              {/* Col 2 */}
              <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-4 md:p-4">
                <Zap className="w-5 h-5 text-accent mb-3" />
                <Counter value={420} prefix="&lt;" suffix="ms" className="text-2xl font-bold text-foreground tracking-tight" />
                <div className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">Response time</div>
              </div>
              {/* Col 3 */}
              <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-4 md:p-4">
                <Map className="w-5 h-5 text-accent mb-3" />
                <Counter value={10} suffix="m" className="text-2xl font-bold text-foreground tracking-tight" />
                <div className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">Resolution</div>
              </div>
              {/* Col 4 */}
              <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-4 md:p-4">
                <Eye className="w-5 h-5 text-accent mb-3" />
                <div className="text-2xl font-bold text-foreground tracking-tight"><Counter value={24} />/7</div>
                <div className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: WHAT YOU GET */}
      <section className="bg-background py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-accent font-mono uppercase">
              WHAT YOU GET
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-foreground">
              Core Agricultural Telemetry APIs
            </h2>
            <p className="text-muted-foreground text-sm mt-3">
              X-AGI delivers production-ready agricultural data interfaces through three core endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* NDVI API */}
            <Tilt className="h-full">
              <div className="shine-host tilt-glow bg-card border border-border rounded-2xl p-8 custom-shadow flex flex-col justify-between h-full group hover-glow relative">
                <div className="shine-overlay" />
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">NDVI API (Crop Health)</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Retrieve Normalized Difference Vegetation Index (NDVI) values derived from Sentinel-2 bands to track temporal biomass changes, canopy chlorophyll absorption, and spatial crop vigor anomalies.
                  </p>
                </div>
                <div className="pt-6 border-t border-border/50 mt-6 flex justify-between items-center relative z-10">
                  <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">POST /v1/vegetation/ndvi</code>
                  <Link href="/docs#ndvi" className="text-xs text-accent hover:text-accent-strong hover:underline inline-flex items-center gap-1">
                    Docs <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Tilt>

            {/* Weather API */}
            <Tilt className="h-full">
              <div className="shine-host tilt-glow bg-card border border-border rounded-2xl p-8 custom-shadow flex flex-col justify-between h-full group hover-glow relative">
                <div className="shine-overlay" />
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
                    <Wind className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Weather API (Meteorology)</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Query hyperlocal meteorological telemetry including precipitation accumulation, hourly temperature profiles, relative humidity, wind vectors, and growing degree days (GDD) mapped to farm centroids.
                  </p>
                </div>
                <div className="pt-6 border-t border-border/50 mt-6 flex justify-between items-center relative z-10">
                  <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">POST /v1/weather</code>
                  <Link href="/docs#weather" className="text-xs text-accent hover:text-accent-strong hover:underline inline-flex items-center gap-1">
                    Docs <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Tilt>

            {/* Farm Monitoring */}
            <Tilt className="h-full">
              <div className="shine-host tilt-glow bg-card border border-border rounded-2xl p-8 custom-shadow flex flex-col justify-between h-full group hover-glow relative">
                <div className="shine-overlay" />
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Map className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Farm Monitoring</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Register geographic farm coordinates using GeoJSON boundary polygons to initiate automated temporal Sentinel tiling lookups, spatial indexes calculations, and cloud coverage filtering.
                  </p>
                </div>
                <div className="pt-6 border-t border-border/50 mt-6 flex justify-between items-center relative z-10">
                  <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">POST /v1/farms</code>
                  <Link href="/docs#farm-registration" className="text-xs text-accent hover:text-accent-strong hover:underline inline-flex items-center gap-1">
                    Docs <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT CATEGORIES */}
      <section className="bg-subtle py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest text-accent font-mono uppercase">
              PRODUCT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-2 mb-4">
              A unified intelligence layer for the field
            </h2>
            <p className="text-muted-foreground text-lg">
              Pick any combination of indices. One auth, one SDK, one response shape.
            </p>
          </div>

          {/* 2x2 Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 — Crop Health */}
            <div
              className="border border-border rounded-xl p-8 bg-card flex flex-col justify-between relative overflow-hidden custom-shadow group hover-glow transition-all"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-6">
                  <Layers className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Crop Health</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
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
                      <span className="font-mono text-xs bg-muted text-accent px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-accent hover:text-accent-strong text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors relative z-10"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 2 — Water Intelligence */}
            <div
              className="border border-border rounded-xl p-8 bg-card flex flex-col justify-between relative overflow-hidden custom-shadow group hover-glow transition-all"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center mb-6">
                  <Activity className="w-5 h-5 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Water</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Indices for crop moisture profiling, surface water boundaries, and drought stress.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "NDMI", desc: "Measure soil and vegetation water content to guide irrigation" },
                    { tag: "NDWI", desc: "Monitor surface water bodies and flood risk in farm boundaries" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-muted text-accent px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-accent hover:text-accent-strong text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors relative z-10"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 3 — Weather Intelligence */}
            <div
              className="border border-border rounded-xl p-8 bg-card flex flex-col justify-between relative overflow-hidden custom-shadow group hover-glow transition-all"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center mb-6">
                  <Wind className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Weather</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Hyperlocal meteorological forecasts, heat indicators, and accumulation grids.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "Weather", desc: "Hyperlocal forecasts, precipitation tracking, and growing-degree days" },
                    { tag: "LST", desc: "Measure land surface temperature to detect heat stress zones" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-muted text-accent px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-accent hover:text-accent-strong text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors relative z-10"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 4 — Farm Management */}
            <div
              className="border border-border rounded-xl p-8 bg-card flex flex-col justify-between relative overflow-hidden custom-shadow group hover-glow transition-all"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/15 flex items-center justify-center mb-6">
                  <Map className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Farm Management</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Register farm polygons, track per-plot telemetry, and schedule automated tile indexing.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { tag: "Farms", desc: "Register geographic farm coordinates using GeoJSON boundary polygons" }
                  ].map((item) => (
                    <div key={item.tag} className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs bg-muted text-accent px-2 py-0.5 rounded w-fit font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/marketplace"
                className="text-accent hover:text-accent-strong text-sm font-semibold inline-flex items-center gap-1.5 mt-auto transition-colors relative z-10"
              >
                Explore APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3.5: AI MODELS TEASER */}
      <section className="bg-background py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest text-accent font-mono uppercase">
              AI MODELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-2 mb-4">
              Agricultural AI Models — Coming Soon
            </h2>
            <p className="text-muted-foreground text-lg">
              Beyond indices — a new category of agricultural AI purpose-built for precision intelligence tasks that satellite telemetry alone cannot solve.
            </p>
          </div>

          {/* 2 Column Grid of Locked Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl">
            {/* Card 1 */}
            <div className="border border-border rounded-xl p-8 bg-card relative overflow-hidden custom-shadow select-none flex flex-col justify-between min-h-[260px] group transition-colors hover:border-accent/40">
              <div className="corner-texture" />
              <div>
                {/* Coming Soon badge */}
                <div className="absolute top-5 right-5 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </div>
                
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center custom-shadow">
                    <Cpu className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground font-bold tracking-widest uppercase">
                    AI MODEL · 01
                  </span>
                </div>
                
                {/* Heading */}
                <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3">
                  AI Model
                </h3>
                
                <p className="text-muted-foreground text-sm font-sans max-w-xs">
                  Confidential — details will be revealed at launch.
                </p>
              </div>

              {/* Ghost Button */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <button
                  disabled
                  className="btn-secondary w-full h-11 text-foreground rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 opacity-80 cursor-not-allowed"
                >
                  Request Access
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-border rounded-xl p-8 bg-card relative overflow-hidden custom-shadow select-none flex flex-col justify-between min-h-[260px] group transition-colors hover:border-accent/40">
              <div className="corner-texture" />
              <div>
                {/* Coming Soon badge */}
                <div className="absolute top-5 right-5 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </div>
                
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center custom-shadow">
                    <Cpu className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground font-bold tracking-widest uppercase">
                    AI MODEL · 02
                  </span>
                </div>
                
                {/* Heading */}
                <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3">
                  AI Model
                </h3>
                
                <p className="text-muted-foreground text-sm font-sans max-w-xs">
                  Confidential — details will be revealed at launch.
                </p>
              </div>

              {/* Ghost Button */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <button
                  disabled
                  className="btn-secondary w-full h-11 text-foreground rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 opacity-80 cursor-not-allowed"
                >
                  Request Access
                </button>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Link
              href="/models"
              className="text-accent hover:text-accent-strong text-sm font-semibold inline-flex items-center gap-1.5 transition-colors group"
            >
              Explore all models <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-subtle py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-xs font-semibold tracking-widest text-accent font-mono uppercase">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
              From polygon to production in three steps
            </h2>
          </div>

          {/* 3 Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border/50">
            
            {/* Step 1 */}
            <div className="p-7 bg-subtle/30 shine-host relative group overflow-hidden flex flex-col hover:bg-subtle/80 transition-colors">
              <div className="text-5xl font-extrabold text-border-strong font-mono mb-4 transition-colors group-hover:text-accent/80">01</div>
              <h3 className="text-lg font-bold text-foreground mb-3">Register a farm</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                POST a polygon GeoJSON, receive a stable <code className="font-mono text-[10px] bg-background text-accent px-1.5 py-0.5 rounded border border-border/50">farm_id</code>. Our system automatically indexes historical and current satellite tiles for the boundary.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Step 2 */}
            <div className="p-7 bg-subtle/30 shine-host relative group overflow-hidden flex flex-col hover:bg-subtle/80 transition-colors">
              <div className="text-5xl font-extrabold text-border-strong font-mono mb-4 transition-colors group-hover:text-accent/80">02</div>
              <h3 className="text-lg font-bold text-foreground mb-3">Call any API</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Request a single index or a structured payload of crop health, water, and weather diagnostics. One authentication token, one unified schema.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Step 3 */}
            <div className="p-7 bg-subtle/30 shine-host relative group overflow-hidden flex flex-col hover:bg-subtle/80 transition-colors">
              <div className="text-5xl font-extrabold text-border-strong font-mono mb-4 transition-colors group-hover:text-accent/80">03</div>
              <h3 className="text-lg font-bold text-foreground mb-3">Ship to production</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                P95 latency stays under 500ms via our global edge cache. Webhooks coming soon — subscribe to field alerts and anomaly notifications directly in your application.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 5: TRY API IN 10 SECONDS */}
      <section className="bg-background py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column (35%) */}
            <div className="w-full lg:w-[35%] space-y-6">
              <span className="text-xs font-semibold tracking-widest text-accent font-mono uppercase">
                DEVELOPER EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-2">
                Try API in 10 seconds
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Query our unified spatial analytics endpoints immediately. Enter your target coordinates as a GeoJSON polygon, select your agricultural indices, and retrieve real-time diagnostic indicators instantly.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "One token authentication for all data feeds",
                  "Standardized, developer-grade JSON payloads",
                  "Integrated edge caching for ultra-low latencies"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/register"
                  className="bg-accent hover:bg-accent-strong text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors custom-shadow"
                >
                  Start Sandbox
                </Link>
                <Link
                  href="/developers/reference"
                  className="btn-secondary text-foreground px-5 py-2.5 rounded-lg text-xs font-semibold"
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
      <section className="bg-background py-24 text-left relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 topo-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest text-accent font-mono uppercase inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              POWERED BY X BOSON AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-3 mb-6">
              One unified intelligence engine
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              X-AGI is built on X Boson AI&apos;s agricultural intelligence engine —
              fusing satellite imagery, meteorological arrays, farm boundaries, and custom agronomic AI models into a single, developer-grade API surface.
            </p>
          </div>

          {/* 2x2 Grid of Mini Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-card border border-border p-6 rounded-lg flex gap-4 hover-glow relative group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="text-foreground font-bold text-base mb-2">Satellite Intelligence</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Multi-spectral satellite imagery fusion, optimized for 10-meter resolution grids with a reliable 5-day cadence.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border p-6 rounded-lg flex gap-4 hover-glow relative group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="text-foreground font-bold text-base mb-2">Weather Intelligence</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hyperlocal meteorological models, forecasts, and growing-degree day telemetry indexed directly to your farm boundaries.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border p-6 rounded-lg flex gap-4 hover-glow relative group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="text-foreground font-bold text-base mb-2">Farm Intelligence</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unified polygon registry, automated tile overlap alignment, and historical time-series analytics.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-card border border-border p-6 rounded-lg flex gap-4 hover-glow relative group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="text-foreground font-bold text-base mb-2">AI Intelligence</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Spectral signal fusion models that cross-reference sensor bands, soil metadata, and local moisture variables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING PREVIEW */}
      <section className="bg-subtle py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-accent font-mono uppercase">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-2 mb-3">
              Usage-based. No commitments.
            </h2>
            <p className="text-muted-foreground">
              Start free, scale with credits.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
            {/* Sandbox / Free */}
            <div className="bg-card border border-border rounded-lg p-8 flex flex-col justify-between custom-shadow relative group hover-glow transition-all">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 font-mono uppercase tracking-wide">Free</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-border/50">
                  <span className="text-4xl font-extrabold text-foreground tracking-tight">Free</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> 1,000 API calls / month
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> No credit card required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Core vegetation indices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> 5 registered farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Community support
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="btn-secondary w-full text-center text-foreground font-medium py-2.5 rounded-lg text-sm transition-colors mt-auto btn-magnetic"
              >
                Start for Free →
              </Link>
            </div>

            {/* Pay-as-you-go */}
            <div className="bg-card border-2 border-accent/80 rounded-lg p-8 flex flex-col justify-between custom-shadow relative group hover-glow transition-all">
              <span className="bg-accent text-white text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded absolute top-4 right-4">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 font-mono uppercase tracking-wide">Pay-as-you-go</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-border/50">
                  <span className="text-4xl font-extrabold text-foreground tracking-tight">$0.005</span>
                  <span className="text-muted-foreground font-mono text-sm">/ credit</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-accent font-semibold">✓</span> $0.005 per credit consumed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent font-semibold">✓</span> Unlimited farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent font-semibold">✓</span> Full API access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent font-semibold">✓</span> Email support + SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent font-semibold">✓</span> Usage analytics
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center bg-accent hover:bg-accent-strong text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-auto custom-shadow btn-magnetic"
              >
                Start Building →
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-card border border-border rounded-lg p-8 flex flex-col justify-between custom-shadow relative group hover-glow transition-all">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 font-mono uppercase tracking-wide">Enterprise</h3>
                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-border/50">
                  <span className="text-4xl font-extrabold text-foreground tracking-tight">Custom</span>
                </div>
                <ul className="flex flex-col gap-4 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Custom volume pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Dedicated SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> VPC deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Custom data cadence
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Dedicated support
                  </li>
                </ul>
              </div>
              <Link
                href="/contact-sales"
                className="btn-secondary w-full text-center text-foreground font-medium py-2.5 rounded-lg text-sm mt-auto"
              >
                Contact Sales →
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="text-accent hover:text-accent-strong text-sm font-semibold inline-flex items-center gap-1 transition-colors">
              See full pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: TRUST SIGNALS */}
      <section className="bg-background py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border/50">
            {/* Card 1 */}
            <div className="p-8 sm:p-10 bg-subtle hover:bg-subtle/80 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0 border border-accent/20">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Sub-500ms P95</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Global edge caching with stale-while-revalidate protocols for immediate spatial data.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 sm:p-10 bg-subtle hover:bg-subtle/80 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0 border border-accent/20">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">SOC 2-aligned</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Encryption in transit and at rest. Pinned regional storage paths protect data boundary sovereignty.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 sm:p-10 bg-subtle hover:bg-subtle/80 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0 border border-accent/20">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Worldwide coverage</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Multi-spectral optical sensor bands combined, offering 10m resolutions globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: BOTTOM CTA BANNER */}
      <section className="bg-subtle py-24 text-center relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 topo-pattern opacity-5 pointer-events-none" />
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent opacity-[0.08] blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 z-10 relative flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Build with agricultural intelligence today.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-sans">
            Free sandbox. No credit card required. Production-ready in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/developers/quickstart"
              className="bg-accent hover:bg-accent/90 text-background px-6 py-3 rounded-lg text-sm font-bold transition-colors custom-shadow"
            >
              Start Building →
            </Link>
            <Link
              href="/contact-sales"
              className="border border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground px-6 py-3 rounded-lg text-sm font-bold transition-colors bg-transparent"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
