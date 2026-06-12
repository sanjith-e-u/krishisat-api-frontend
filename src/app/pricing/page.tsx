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
    credits: "1,000 API calls",
    features: [
      "1,000 monthly API calls",
      "No credit card required",
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
    name: "Pay-as-you-go",
    price: "$0.004",
    period: "/ API call",
    description: "For production-ready agricultural platforms and monitoring applications.",
    credits: "Flexible",
    features: [
      "$0.004 per API call after free tier",
      "Unlimited farms",
      "Full API access",
      "No monthly commitments",
      "Email support + SLA",
      "Usage analytics",
      "99.9% API uptime guarantee"
    ],
    cta: "Start Building",
    highlight: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For enterprise agritechs, regional cooperatives, and government bodies.",
    credits: "Custom",
    features: [
      "Custom volume pricing",
      "Dedicated SLA",
      "VPC deployment option",
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
  { q: "Do you offer a free tier?", a: "Yes. Our Free tier includes 1,000 API calls per month with no credit card required. Sign up at /register to get started immediately." },
  { q: "How does the Pay-As-You-Go pricing work?", a: "Your first 1,000 API calls per month are free. Additional requests are billed at a flat rate of $0.004 per API call. You only pay for the telemetry queries your systems consume." },
  { q: "Are there any setup fees or monthly commitments?", a: "No. There are no setup fees, monthly minimums, or long-term contracts. You can start and stop using the API at any time." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, corporate bank wires, and can issue automated purchase order invoices for Enterprise clients." }
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
            <h3 className="text-sm font-extrabold text-slate-900">💡 Pay-As-You-Go System</h3>
            <p className="text-xs text-slate-505 leading-relaxed max-w-2xl">
              KrishiSat uses a simple usage-based model. Your first 1,000 API calls each month are completely free. Subsequent requests are billed at a flat rate of <strong className="text-slate-800 font-bold">$0.004 per API call</strong>. No monthly fees, no overage shocks, and no service interruptions.
            </p>
          </div>
          <Link href="/developers/reference" className="text-xs font-bold text-primary bg-primary/8 px-4 py-2.5 rounded-xl hover:bg-primary/10 transition-colors shrink-0">
            View API Reference
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
                  <span className={`text-xs ml-1 ${plan.highlight ? "text-white/60" : "text-slate-405"}`}>{plan.period}</span>
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
              <p className="text-sm text-slate-505 mt-2 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-505">Have more questions?</p>
          <Link href="/trust" className="text-sm font-semibold text-primary hover:underline mt-1 inline-block">View our security and trust documentation →</Link>
        </div>
      </section>
    </main>
  )
}
