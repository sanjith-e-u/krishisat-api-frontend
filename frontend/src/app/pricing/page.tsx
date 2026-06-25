import type { Metadata } from "next"
import Link from "next/link"
import { Check, Zap, Building2, Code, ArrowRight } from "lucide-react"
import { creditsToUsd, formatUsd } from "@/lib/pricing"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent per-call pricing for NDVI, NDMI, weather, and farm analytics APIs. Start free, scale as you grow.",
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "For testing, prototyping, and early sandbox agritech developments.",
    credits: "1,000 credits/mo",
    features: [
      "1,000 free credits per month",
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
    price: formatUsd(creditsToUsd(1)),
    period: "/ credit",
    description: "For production-ready agricultural platforms and monitoring applications.",
    credits: "Flexible",
    features: [
      `${formatUsd(creditsToUsd(1))} per credit consumed`,
      "1,000 credits = ~500 NDVI scans",
      "Endpoints cost 1-3 credits per call",
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
  { q: "Do you offer a free tier?", a: "Yes. Our Free tier includes 1,000 credits per month with no credit card required. Sign up at /register to get started immediately." },
  { q: "How does the Pay-As-You-Go pricing work?", a: "Your first 1,000 credits per month are free. Additional requests are billed at a flat rate of $0.005 per credit (1 credit = $0.005 USD). Each API endpoint costs between 1-3 credits per call depending on the data type." },
  { q: "Are there any setup fees or monthly commitments?", a: "No. There are no setup fees, monthly minimums, or long-term contracts. You can start and stop using the API at any time." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, corporate bank wires, and can issue automated purchase order invoices for Enterprise clients." },
  { q: "How often is satellite data updated?", a: "Sentinel-2 satellite imagery is processed every 5 days for most regions. Weather intelligence data refreshes every 6 hours. Historical data going back 24 months is available on all paid plans." },
  { q: "What happens if there's cloud cover over my farm?", a: "On days with >70% cloud cover, the API returns a cloud_coverage flag in the response and does not deduct credits from your balance. You are never charged for obscured imagery." },
  { q: "Can I access historical satellite data?", a: "Yes. All plans above Starter include up to 24 months of historical NDVI, NDMI, and NDWI data. Use the date_range parameter in your API call to specify a custom time window." },
  { q: "What is a credit?", a: "1 credit = $0.005 USD. Credits never expire and are shared across your entire team. Each API endpoint costs between 1–3 credits per call depending on the data type." }
]

export default function PricingPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <section className="text-center pt-24 pb-12 px-6 border-b border-border">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Pricing</span>
        <h1 className="text-4xl font-extrabold text-foreground mt-5 tracking-tight">Simple, transparent pricing</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
          Start small, scale as your coverage expands. Pay only for the telemetry your systems consume.
        </p>
      </section>

      {/* Pay-as-you-go Explanation Banner */}
      <section className="max-w-6xl mx-auto px-6 pt-12">
        <div className="bg-subtle border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 custom-shadow">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-extrabold text-foreground">💡 Pay-As-You-Go System</h3>
            <p className="text-xs text-slate-505 leading-relaxed max-w-2xl">
              X-AGI uses a simple usage-based model. Your first 1,000 credits each month are completely free. Subsequent requests are billed at a flat rate of <strong className="text-foreground font-bold">{formatUsd(creditsToUsd(1))} per credit</strong>. Endpoints cost between 1–3 credits per call depending on the data type. No monthly fees, no overage shocks, and no service interruptions.
            </p>
          </div>
          <Link
            href="/developers/reference"
            className="btn-secondary text-foreground px-5 py-2.5 rounded-lg text-xs font-semibold"
          >
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
                  : "border-border bg-background"
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-agri text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest custom-shadow">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${
                  plan.highlight ? "bg-background/15" : "bg-subtle border border-border"
                }`}>
                  <Icon className={`w-5 h-5 ${plan.highlight ? "text-white" : "text-primary"}`} />
                </div>

                <div className="mb-2">
                  <h2 className={`text-lg font-extrabold ${plan.highlight ? "text-white" : "text-foreground"}`}>{plan.name}</h2>
                  <p className={`text-xs leading-relaxed mt-1 ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>{plan.description}</p>
                </div>

                <div className="mt-6 mb-8">
                  <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-foreground"}`}>{plan.price}</span>
                  <span className={`text-xs ml-1 ${plan.highlight ? "text-white/60" : "text-slate-405"}`}>{plan.period}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-agri" : "text-agri"}`} />
                      <span className={plan.highlight ? "text-white/90" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta === "Contact Sales" ? "/contact-sales" : "/register"}
                  className={`w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                    plan.highlight
                      ? "bg-background text-primary hover:bg-subtle"
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

    {/* AI Models Pricing Callout */}
    <section className="max-w-6xl mx-auto px-6 pb-16 select-none">
      <div className="bg-subtle border border-slate-205 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 custom-shadow">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">
            AI MODELS PRICING
          </h3>
          <h4 className="text-base font-extrabold text-foreground mt-1 font-sans">
            AI model inference will be priced separately from API credits.
          </h4>
          <p className="text-xs text-slate-505 leading-relaxed mt-1 font-sans font-medium max-w-2xl">
            Pricing is being finalized with our early access partners. Sign up for early access to receive pricing and availability updates.
          </p>
        </div>
        <Link href="/models" className="text-xs font-bold text-accent hover:text-[#114524] bg-accent/10 px-4 py-2.5 rounded-xl hover:bg-accent/12 transition-all shrink-0 flex items-center gap-1.5 font-sans">
          Join the early access list <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-extrabold text-foreground mb-10 text-center">Frequently asked questions</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="border border-border rounded-xl p-6">
              <h3 className="text-sm font-bold text-foreground">{item.q}</h3>
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
