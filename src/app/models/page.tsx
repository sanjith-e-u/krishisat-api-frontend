"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const models = [
  { width: "w-[150px]" },
  { width: "w-[175px]" }
];

export default function ModelsPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API registration call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-28 pb-16 px-6 text-center select-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-200 bg-amber-50 rounded-full font-mono text-[10px] font-bold text-amber-800 mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Coming Soon — Early Access Open
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
            X-AGI AI Models
          </h1>
          <p className="text-base sm:text-lg text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed font-sans">
            A new category of agricultural AI — purpose-built for precision intelligence tasks that satellite indices alone cannot solve. Details coming soon.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => {
                document.getElementById("early-access-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-[#14532D] hover:bg-[#114524] text-white h-10 px-6 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              Get Early Access
            </button>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-1 border border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-6 rounded-xl text-sm font-semibold transition-colors font-sans"
            >
              View Satellite APIs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Model Catalog Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {models.map((model, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all flex flex-col justify-between opacity-60 grayscale-[30%] select-none relative overflow-hidden min-h-[220px]"
            >
              <div>
                {/* Coming Soon badge */}
                <div className="absolute top-4 right-4 bg-amber-50 border border-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </div>

                {/* Tag and pricing block */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono bg-slate-100 text-slate-605 border border-slate-200 px-2 py-0.5 rounded w-fit font-bold uppercase tracking-wider">
                    AI Model
                  </span>
                </div>

                {/* Redacted Title */}
                <div className={`h-5 bg-slate-200/80 backdrop-blur-[3px] border border-slate-300/30 rounded-sm mb-3 ${model.width}`} />

                <p className="text-slate-500 text-xs font-sans mt-4">
                  Confidential — details will be revealed at launch.
                </p>
              </div>

              {/* Footer / Disabled Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3.5">
                <button
                  disabled
                  className="w-full h-10 bg-[#14532D]/50 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 cursor-not-allowed"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access Email capture Form */}
      <section id="early-access-form" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-[#2563EB] opacity-10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#22C55E] font-mono uppercase">
              EARLY ACCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
              Be the first to know.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              We&apos;re building something new. Our AI models go beyond indices — a different kind of agricultural intelligence. Drop your email and we&apos;ll reach out before we launch.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#22C55E] focus:border-[#22C55E]"
              />
              <button
                type="submit"
                disabled={submitting || submitted}
                className="h-11 px-6 rounded-xl bg-[#22C55E] hover:bg-[#1cbd53] disabled:bg-[#22C55E]/50 text-white font-semibold text-xs transition-all shadow-md shrink-0 flex items-center justify-center cursor-pointer font-sans"
              >
                {submitted ? "Joined!" : submitting ? "Submitting..." : "Notify Me"}
              </button>
            </form>

            {submitted && (
              <p className="text-xs text-[#22C55E] font-medium animate-in fade-in duration-300 font-sans">
                ✓ Thank you! You&apos;ve been added to the early access waitlist.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
