import type { Metadata } from "next"
import Link from "next/link"
import { Check, Zap, Building2, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing — KrishiSat API Platform",
  description: "Transparent, usage-based pricing for agricultural intelligence APIs. Start free, scale as you grow.",
}

const plans = [
  {
    name: "Developer",
    price: "₹999",
    period: "/ month",
    description: "For prototyping and early-stage agritech applications.",
    credits: "10,000",
    features: [
      "10,000 monthly API credits",
      "Core vegetation indices (NDVI, NDRE)",
      "Standard response latency",
      "Community Discord access",
      "Basic documentation",
      "2 API keys"
    ],
    cta: "Start Developer Plan",
    highlight: false,
    icon: Code,
  },
  {
    name: "Professional",
    price: "₹4,999",
    period: "/ month",
    description: "For production-ready agricultural dashboards and platforms.",
    credits: "60,000",
    features: [
      "60,000 monthly API credits",
      "Full index suite (NDVI, NDRE, NDWI, NDMI, SAVI, CI)",
      "Prioritized response queues",
      "Weather telemetry APIs",
      "Email & Slack support",
      "Unlimited API keys",
      "SLA 99.9% uptime"
    ],
    cta: "Start Professional Plan",
    highlight: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large-scale agricultural operations and government bodies.",
    credits: "Unlimited",
    features: [
      "Unlimited API credit volumes",
      "Dedicated satellite ingress pipelines",
      "Sub-150ms response SLA",
      "Dedicated solutions architect",
      "Custom data retention periods",
      "On-premise deployment options",
      "Priority 24/7 support"
    ],
    cta: "Contact Sales",
    highlight: false,
    icon: Building2,
  }
]

const faq = [
  { q: "What is an API credit?", a: "Each API call costs credits depending on the endpoint. NDVI/NDRE/NDWI/NDMI/SAVI/CI each cost 2 credits. Weather telemetry and Farm Registration cost 1 credit per call." },
  { q: "Do unused credits roll over?", a: "Credits reset monthly. Unused credits do not roll over. Enterprise plans can negotiate custom rollover terms with our team." },
  { q: "Can I upgrade or downgrade anytime?", a: "Yes. You can switch plans at any time from your dashboard billing settings. Changes take effect immediately on the next billing cycle." },
  { q: "Is there a free tier?", a: "We are launching a free tier with 1,000 monthly credits in Q3 2026. Join our waitlist on the platform to be notified." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, UPI, NEFT/RTGS bank transfers, and can issue invoices for Enterprise accounts." }
]

export default function PricingPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="text-center pt-24 pb-12 px-6 border-b border-slate-100">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Pricing</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">Simple, transparent pricing</h1>
        <p className="text-lg text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
          Start small, scale as your coverage expands. No hidden fees. Pay only for what your systems consume.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
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
                  href="/register"
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
