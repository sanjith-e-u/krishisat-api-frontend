import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Lock, Globe, Server, Clock, Award, Sprout, Droplets, Landmark } from "lucide-react"

export const metadata: Metadata = {
  title: "Trust & Security — KrishiSat API Platform",
  description: "KrishiSat security practices, data privacy, reliability commitments, and compliance certifications.",
}

const stats = [
  { value: "10K+", label: "API calls processed", desc: "Programmatic requests analyzed daily" },
  { value: "99.98%", label: "Average Uptime", desc: "Historical availability of endpoints" },
  { value: "238ms", label: "Average Latency", desc: "Edge computation response period" },
  { value: "500K+", label: "Hectares Monitored", desc: "Total farmland boundaries mapped" }
]

const pillars = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II Ready",
    description: "Our infrastructure and operational procedures are aligned with SOC 2 Type II requirements. Third-party audit in progress for Q4 2026."
  },
  {
    icon: Lock,
    title: "256-bit TLS Encryption",
    description: "All API calls are encrypted in transit using TLS 1.3. Raster satellite data stored at rest using AES-256 encryption on isolated S3 buckets."
  },
  {
    icon: Globe,
    title: "GDPR & DPDP Compliant",
    description: "KrishiSat is fully compliant with EU GDPR and India's Digital Personal Data Protection Act 2023. Customer farm data is never sold or shared."
  },
  {
    icon: Server,
    title: "Redundant Infrastructure",
    description: "Multi-availability zone deployment across AWS Mumbai and Singapore regions ensures no single point of failure for your telemetry pipelines."
  },
  {
    icon: Clock,
    title: "99.9% Uptime SLA",
    description: "We commit to 99.9% monthly uptime for all production API endpoints. Customers receive credit reimbursements if SLAs are breached."
  },
  {
    icon: Award,
    title: "API Key Vault Security",
    description: "API keys are hashed using bcrypt before storage. Partial key previews displayed in the UI. Full key access only during initial generation."
  }
]

const dataSources = [
  {
    name: "ESA Copernicus Sentinel-2",
    type: "Satellite Imagery",
    desc: "10-meter spatial resolution multi-spectral bands (Red, NIR, SWIR, RedEdge) processed on a 5-day orbital return path."
  },
  {
    name: "NASA / USGS Landsat 8 & 9",
    type: "Satellite Imagery",
    desc: "Thermal Infrared Sensor (TIRS) telemetry utilized to estimate ground heat distributions and soil dehydration rates."
  },
  {
    name: "ECMWF ERA5 Models",
    type: "Climate Telemetry",
    desc: "Global reanalysis models providing historical meteorological data, dew point, and accumulated growing degree days (GDD)."
  },
  {
    name: "NOAA GFS Predictions",
    type: "Weather Forecasts",
    desc: "Global Forecast System arrays providing hourly temperature, precipitation maps, and frost risk warnings."
  }
]

const useCases = [
  {
    icon: Sprout,
    title: "Yield Forecasting & Crop Health",
    desc: "Agritech systems query NDVI and NDRE indices weekly to track canopy growth curves, forecast potential harvest weights, and trigger early nitrogen fertilizer alerts."
  },
  {
    icon: Droplets,
    title: "Precision Irrigation Scheduling",
    desc: "Farming platforms compare NDMI (moisture index) and NDWI (water index) to identify waterlogged plots or dry areas, automating valve controls to save resources."
  },
  {
    icon: Landmark,
    title: "Insurance Claims & Risk Auditing",
    desc: "Agrifinance providers verify field coordinates boundaries against historic seasonal indices to validate drought damages or flood insurance payouts."
  }
]

const uptime = [
  { month: "Jan 26", uptime: "99.98%" }, { month: "Feb 26", uptime: "100.00%" },
  { month: "Mar 26", uptime: "99.97%" }, { month: "Apr 26", uptime: "100.00%" },
  { month: "May 26", uptime: "99.99%" }, { month: "Jun 26", uptime: "99.98%" }
]

export default function TrustPage() {
  return (
    <main className="bg-white min-h-screen text-slate-800">
      {/* Hero */}
      <section className="text-center pt-24 pb-16 px-6 border-b border-slate-200 bg-slate-50/60">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Trust & Security</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">Built for enterprise-grade reliability</h1>
        <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
          KrishiSat is designed from the ground up to be secure, private, and resilient — so your agricultural operations never go dark.
        </p>
      </section>

      {/* Trust Stats Row */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-b border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <span className="text-3xl font-black text-primary block tracking-tight">{stat.value}</span>
              <span className="text-xs font-extrabold text-slate-900 block mt-1 uppercase tracking-wider">{stat.label}</span>
              <span className="text-[11px] text-slate-400 block mt-1 leading-normal">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Security Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Security practices</h2>
        <p className="text-slate-500 mb-12">How we protect your API keys, farm data, and satellite telemetry.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div key={pillar.title} className="p-6 border border-slate-200 rounded-xl hover:border-slate-350 transition-all bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Data Ingress Sources */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-agri uppercase tracking-widest font-mono">Telemetry Inputs</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">Data ingestion & satellite providers</h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              We compile multi-spectral telemetry from public space agencies and climate databases to feed our calculation algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataSources.map((source, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-extrabold text-white">{source.name}</span>
                    <span className="text-[9px] font-bold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {source.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{source.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Use Cases */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-slate-100">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Spatial Applications</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-slate-900">Real-world agricultural use cases</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            See how developers utilize our unified endpoints structure to support precise field workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-350 transition-all flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{uc.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Uptime History */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Historical Uptime</h2>
          <p className="text-slate-500 mb-10">Production API endpoint availability over the past 6 months.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {uptime.map((row) => (
              <div key={row.month} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                <div className="text-xl font-extrabold text-primary">{row.uptime}</div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">{row.month}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-6 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            All systems operational — 99.98% uptime this month (mock data)
          </p>
        </div>
      </section>

      {/* Data Practices */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Data handling</h2>
        <p className="text-slate-500 mb-8">How we collect, store, and use your agricultural telemetry data.</p>
        <div className="space-y-5">
          {[
            { label: "Farm GeoJSON boundaries", retention: "Until account deletion", sharing: "Never shared", encryption: "AES-256 at rest" },
            { label: "Satellite imagery metadata", retention: "90 days rolling cache", sharing: "Anonymous aggregates only", encryption: "AES-256 at rest" },
            { label: "API request logs", retention: "30 days", sharing: "Never shared", encryption: "TLS 1.3 in transit" },
            { label: "Billing information", retention: "7 years (legal)", sharing: "Stripe PCI DSS vaulted", encryption: "Tokenized — no card data stored" }
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 border border-slate-200 rounded-xl bg-white text-sm items-center">
              <span className="font-bold text-slate-800">{row.label}</span>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Retention</div>
                <div className="text-slate-605 font-semibold">{row.retention}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Third-party sharing</div>
                <div className="text-slate-605 font-semibold">{row.sharing}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Encryption</div>
                <div className="text-slate-605 font-semibold">{row.encryption}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <p className="text-slate-505 mb-4 text-sm">Have security questions or want to request a custom compliance review?</p>
        <Link href="/contact-sales" className="inline-flex items-center gap-2 bg-primary hover:bg-[#114524] text-white h-11 px-8 rounded-xl font-bold text-sm transition-colors shadow-md">
          Talk to solutions engineers →
        </Link>
      </section>
    </main>
  )
}
