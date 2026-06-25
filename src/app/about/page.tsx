import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Satellite, Sprout } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Learn about X-AGI — our mission to give every farmer access to satellite intelligence through developer-friendly APIs.",
};

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-slate-800 pt-24 pb-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">
          Our Mission
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">
          Democratizing Planetary Agri-Intelligence
        </h1>
        <p className="text-lg text-slate-500 mt-4 leading-relaxed">
          At X-AGI, we build developer-first APIs that translate multi-spectral satellite imagery and complex climate models into action-oriented insights for precision agriculture.
        </p>
      </section>

      {/* Pillars */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Satellite className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Earth Observation</h3>
            <p className="text-xs text-slate-550 leading-relaxed">
              We leverage data from the European Space Agency and NASA, processing multi-spectral satellite passes to analyze crop chlorophyll absorption at 10m resolutions.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Planetary Scale</h3>
            <p className="text-xs text-slate-550 leading-relaxed">
              Our cloud infrastructures calculate NDVI, NDMI, and NDRE indices over hundreds of thousands of hectares daily, maintaining sub-second API latencies.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-605 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sustainable Yields</h3>
            <p className="text-xs text-slate-550 leading-relaxed">
              By equipping developers with precision tools, we enable agritech startups to design smarter irrigation scheduling and reduce chemical fertilization loading.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="max-w-4xl mx-auto px-6 py-12 prose prose-slate">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Why we built X-AGI</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Satellite data has been used by governments and large agricultural corporations for decades — but accessing it required expensive licenses, GIS specialists, and months of integration work. We built X-AGI to change that: a single API that gives any developer access to the same satellite intelligence that precision agriculture giants use, with a REST interface they can integrate in an afternoon.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          X-AGI is built for the agritech teams, farm management platforms, and agricultural fintech products that are transforming how food is grown — starting with India, and expanding globally.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
        <div className="bg-[#14532D] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-950 opacity-20 pointer-events-none topo-pattern" />
          <h2 className="text-2xl font-bold tracking-tight mb-3">Want to join our developer network?</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-8">
            Create a free developer account to query mock telemetry data in our Sandbox environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="bg-white text-[#14532D] hover:bg-slate-50 px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm text-center"
            >
              Get Free API Key
            </Link>
            <Link
              href="/contact-sales"
              className="border border-emerald-600 hover:border-emerald-400 text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all text-center flex items-center gap-1 justify-center"
            >
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer social links */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-12 border-t border-slate-100 flex justify-center gap-6 text-xs font-semibold text-slate-500">
        <a href="https://github.com/X-AGI" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        <a href="https://linkedin.com/company/X-AGI" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        <a href="mailto:hello@X-AGI.dev" className="hover:text-primary transition-colors">hello@X-AGI.dev</a>
      </div>
    </main>
  );
}
