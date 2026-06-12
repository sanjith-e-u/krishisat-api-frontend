import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Lock, Globe, Server, Clock, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Trust & Security — KrishiSat API Platform",
  description: "KrishiSat security practices, data privacy, reliability commitments, and compliance certifications.",
}

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

const uptime = [
  { month: "Jan 26", uptime: "99.98%" }, { month: "Feb 26", uptime: "100.00%" },
  { month: "Mar 26", uptime: "99.97%" }, { month: "Apr 26", uptime: "100.00%" },
  { month: "May 26", uptime: "99.99%" }, { month: "Jun 26", uptime: "99.98%" }
]

export default function TrustPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="text-center pt-24 pb-16 px-6 border-b border-slate-100 bg-slate-50/60">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Trust & Security</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">Built for enterprise-grade reliability</h1>
        <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
          KrishiSat is designed from the ground up to be secure, private, and resilient — so your agricultural operations never go dark.
        </p>
      </section>

      {/* Security Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Security practices</h2>
        <p className="text-slate-500 mb-12">How we protect your API keys, farm data, and satellite telemetry.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div key={pillar.title} className="p-6 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Uptime History */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-6">
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
          <p className="text-xs text-slate-400 mt-6">
            Live status available at <a href="https://status.krishisat.io" className="text-primary underline">status.krishisat.io</a>
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
            { label: "Billing information", retention: "7 years (legal)", sharing: "Stripe PCI DSS vaulted", encryption: "Tokenized — no raw card data stored" }
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 border border-slate-200 rounded-xl bg-white text-sm items-center">
              <span className="font-bold text-slate-800">{row.label}</span>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Retention</div>
                <div className="text-slate-600 font-semibold">{row.retention}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Third-party sharing</div>
                <div className="text-slate-600 font-semibold">{row.sharing}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Encryption</div>
                <div className="text-slate-600 font-semibold">{row.encryption}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <p className="text-slate-500 mb-4 text-sm">Have security questions or want to request a custom compliance review?</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-primary text-white h-11 px-8 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
          Talk to our security team →
        </Link>
      </section>
    </main>
  )
}
