import type { Metadata } from "next"
import Link from "next/link"
import { Check, Zap, Building2, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing — KrishiSat API Platform",
  description: "Transparent, usage-based pricing for agricultural intelligence APIs. Start free, scale as you grow.",
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "For testing, prototyping, and early sandbox agritech developments.",
    credits: "1,000",
    features: [
      "1,000 monthly API credits",
      "Core vegetation indices (NDVI, NDRE)",
      "Standard response latency",
      "1 Sandbox API key",
      "Community Discord support",
      "Complete REST documentation"
    ],
    cta: "Get Started Free",
    highlight: false,
    icon: Code,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ month",
    description: "For production-ready agricultural platforms and monitoring applications.",
    credits: "50,000",
    features: [
      "50,000 monthly API credits",
      "Full index suite (NDVI, NDRE, NDWI, NDMI, SAVI, CI)",
      "Prioritized satellite ingress queues",
      "Weather telemetry & GDD APIs",
      "5 active Production API keys",
      "Priority email support (4hr SLA)",
      "99.9% API uptime guarantee"
    ],
    cta: "Start Pro Plan",
    highlight: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For enterprise agritechs, regional cooperatives, and government bodies.",
    credits: "Unlimited",
    features: [
      "Custom monthly API credit volumes",
      "Dedicated Sentinel ingress pipelines",
      "Sub-150ms calculation response SLA",
      "Dedicated solutions architect",
      "Custom data retention periods",
      "On-premise deployment options",
      "Priority 24/7 support contracts"
    ],
    cta: "Contact Sales",
    highlight: false,
    icon: Building2,
  }
]

const faq = [
  { q: "What is an API credit?", a: "Each API call costs credits depending on the complexity of the endpoint. NDVI/NDRE/NDWI/NDMI/SAVI/CI each cost 2 credits. Weather telemetry and Farm Registration cost 1 credit per call." },
  { q: "Do unused credits roll over?", a: "Credits reset monthly. Unused credits do not roll over. Enterprise plans can negotiate custom rollover terms with our team." },
  { q: "Can I upgrade or downgrade anytime?", a: "Yes. You can switch plans at any time from your dashboard billing settings. Changes take effect immediately on the next billing cycle." },
  { q: "How does Pay-As-You-Go overage work?", a: "If you consume all included credits on the Pro plan, we don't block your API keys. Additional queries are automatically billed at $0.005 per credit on your monthly invoice." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, UPI, corporate bank wires, and can issue automated purchase order invoices for Enterprise clients." }
]

export default function PricingPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="text-center pt-24 pb-12 px-6 border-b border-slate-100">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Pricing</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">Simple, transparent pricing</h1>
        <p className="text-lg text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
          Start small, scale as your coverage expands. Pay only for the telemetry your systems consume.
        </p>
      </section>

      {/* Pay-as-you-go Explanation Banner */}
      <section className="max-w-6xl mx-auto px-6 pt-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-extrabold text-slate-900">💡 Pay-As-You-Go Credit System</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Each API call consumes credits depending on the complexity of the sensor calculations (e.g. 1 credit for weather, 2 credits for NDVI). If you exceed your plan&apos;s monthly included credits, additional requests are automatically billed at a flat rate of <strong className="text-slate-800 font-bold">$0.005 per credit</strong>. No service interruptions, no overage shocks.
            </p>
          </div>
          <Link href="/developers/reference" className="text-xs font-bold text-primary bg-primary/8 px-4 py-2.5 rounded-xl hover:bg-primary/10 transition-colors shrink-0">
            View API Credit Spec
          </Link>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div key={plan.name} className={`relative rounded-2xl p-8 flex flex-col border ${
                plan.highlight
                  ? "border-primary bg-primary text-white shadow-2xl shadow-primary/20"
                  : "border-slate-200 bg-white"
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-agri text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${
                  plan.highlight ? "bg-white/15" : "bg-slate-50 border border-slate-100"
                }`}>
                  <Icon className={`w-5 h-5 ${plan.highlight ? "text-white" : "text-primary"}`} />
                </div>

                <div className="mb-2">
                  <h2 className={`text-lg font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h2>
                  <p className={`text-xs leading-relaxed mt-1 ${plan.highlight ? "text-white/70" : "text-slate-400"}`}>{plan.description}</p>
                </div>

                <div className="mt-6 mb-8">
                  <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                  <span className={`text-xs ml-1 ${plan.highlight ? "text-white/60" : "text-slate-400"}`}>{plan.period}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-agri" : "text-agri"}`} />
                      <span className={plan.highlight ? "text-white/90" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta === "Contact Sales" ? "/contact-sales" : "/register"}
                  className={`w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                    plan.highlight
                      ? "bg-white text-primary hover:bg-slate-50"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-10 text-center">Frequently asked questions</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="border border-slate-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-slate-900">{item.q}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">Have more questions?</p>
          <Link href="/trust" className="text-sm font-semibold text-primary hover:underline mt-1 inline-block">View our security and trust documentation →</Link>
        </div>
      </section>
    </main>
  )
}
