import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "API Reference — X-AGI Developers",
  description: "Complete API reference for all X-AGI satellite intelligence endpoints including NDVI, NDRE, Weather, and farm registration.",
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.X-AGI.dev"

const endpoints = [
  {
    method: "POST",
    path: "/v1/farms",
    summary: "Register Farm Boundary",
    description: "Register a GeoJSON polygon defining a field boundary. Returns a farm_id used in all subsequent telemetry calls.",
    credits: 1,
    body: `{
  "name": "string",         // Farm label
  "boundary": {             // GeoJSON Polygon
    "type": "Polygon",
    "coordinates": [[...]]
  }
}`,
    response: `{
  "farm_id": "farm_abc123",
  "name": "Wheat Field A",
  "area_ha": 12.4,
  "created_at": "2026-06-12T08:00:00Z"
}`
  },
  {
    method: "POST",
    path: "/v1/vegetation/ndvi",
    summary: "NDVI Vegetation Index",
    description: "Returns the Normalized Difference Vegetation Index (NDVI) for a registered farm boundary on the specified date.",
    credits: 2,
    body: `{
  "farm_id": "string",    // From POST /v1/farms
  "date": "YYYY-MM-DD"    // ISO 8601 date
}`,
    response: `{
  "farm_id": "farm_abc123",
  "index": "NDVI",
  "value": 0.74,
  "interpretation": "Healthy Dense Vegetation",
  "captured_at": "2026-06-12T08:14:22Z"
}`
  },
  {
    method: "POST",
    path: "/v1/vegetation/ndre",
    summary: "NDRE Chlorophyll Index",
    description: "Normalized Difference Red Edge index. Detects early nitrogen deficiencies and chlorophyll content variations.",
    credits: 2,
    body: `{
  "farm_id": "string",
  "date": "YYYY-MM-DD"
}`,
    response: `{
  "farm_id": "farm_abc123",
  "index": "NDRE",
  "value": 0.52,
  "interpretation": "Moderate Chlorophyll Content",
  "captured_at": "2026-06-12T08:14:22Z"
}`
  },
  {
    method: "POST",
    path: "/v1/vegetation/savi",
    summary: "SAVI Soil-Adjusted Index",
    description: "Soil-Adjusted Vegetation Index. Minimizes soil brightness influence on NDVI in arid or sparse crop regions.",
    credits: 2,
    body: `{
  "farm_id": "string",
  "date": "YYYY-MM-DD",
  "l_factor": 0.5         // optional, default 0.5
}`,
    response: `{
  "farm_id": "farm_abc123",
  "index": "SAVI",
  "value": 0.61,
  "l_factor": 0.5,
  "interpretation": "Moderate Vegetation",
  "captured_at": "2026-06-12T08:14:22Z"
}`
  },
  {
    method: "POST",
    path: "/v1/water/ndwi",
    summary: "NDWI Surface Water Index",
    description: "Normalized Difference Water Index for mapping open water bodies, flood extents, and irrigation pools.",
    credits: 2,
    body: `{
  "farm_id": "string",
  "date": "YYYY-MM-DD"
}`,
    response: `{
  "farm_id": "farm_abc123",
  "index": "NDWI",
  "value": -0.14,
  "interpretation": "Minimal Surface Water",
  "captured_at": "2026-06-12T08:14:22Z"
}`
  },
  {
    method: "POST",
    path: "/v1/water/ndmi",
    summary: "NDMI Moisture Index",
    description: "Normalized Difference Moisture Index. Detects canopy moisture levels and vegetation water stress conditions.",
    credits: 2,
    body: `{
  "farm_id": "string",
  "date": "YYYY-MM-DD"
}`,
    response: `{
  "farm_id": "farm_abc123",
  "index": "NDMI",
  "value": 0.21,
  "interpretation": "Moderate Moisture — Low Stress",
  "captured_at": "2026-06-12T08:14:22Z"
}`
  },
  {
    method: "POST",
    path: "/v1/weather",
    summary: "Hyperlocal Weather Telemetry",
    description: "Fetch growing degree days (GDD), precipitation accumulation, wind speed, and temperature data for a farm centroid.",
    credits: 1,
    body: `{
  "farm_id": "string",
  "date_from": "YYYY-MM-DD",
  "date_to": "YYYY-MM-DD"
}`,
    response: `{
  "farm_id": "farm_abc123",
  "period": { "from": "...", "to": "..." },
  "gdd": 48.2,
  "rainfall_mm": 12.4,
  "max_temp_c": 34.1,
  "min_temp_c": 22.8,
  "wind_kmh": 14.2
}`
  }
]

export default function ApiReferencePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/docs" className="text-xs text-slate-400 hover:text-primary font-semibold">Docs</Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-semibold text-slate-700">API Reference</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">API Reference</h1>
        <p className="text-lg text-slate-500 mt-3 max-w-2xl leading-relaxed">
          Complete endpoint documentation for all X-AGI satellite intelligence APIs.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <span className="text-xs font-semibold text-slate-400">Base URL</span>
          <code className="font-mono text-xs font-bold text-slate-800">{API_URL}</code>
        </div>
      </section>

      {/* Endpoints */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {endpoints.map((ep) => (
          <div key={ep.path} id={ep.path.replace(/\//g, "-").replace(/^-/, "")} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-black text-white bg-primary px-2 py-0.5 rounded font-mono uppercase tracking-wide">{ep.method}</span>
              <code className="text-lg font-bold text-slate-800 font-mono">{ep.path}</code>
              <span className="text-xs font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-full">{ep.credits} credit{ep.credits > 1 ? "s" : ""} / call</span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 mb-2">{ep.summary}</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">{ep.description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Request Body</div>
                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 text-[9px] text-slate-500 font-mono uppercase tracking-widest">JSON</div>
                  <pre className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto"><code>{ep.body}</code></pre>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">200 Response</div>
                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 text-[9px] text-slate-500 font-mono uppercase tracking-widest">JSON</div>
                  <pre className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto"><code>{ep.response}</code></pre>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-100 mt-12" />
          </div>
        ))}
      </section>

      {/* Footer CTA */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Ready to start building?</h2>
            <p className="text-sm text-slate-500 mt-1">Follow our quickstart guide to make your first API call.</p>
          </div>
          <Link href="/developers/quickstart" className="inline-flex items-center gap-2 bg-primary text-white h-10 px-6 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shrink-0">
            Open Quickstart <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
