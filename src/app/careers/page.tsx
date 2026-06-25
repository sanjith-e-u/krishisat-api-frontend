"use client";

import React from "react";
import { ArrowRight, Briefcase, MapPin, DollarSign } from "lucide-react";

const jobs = [
  {
    role: "Senior Satellite Data Engineer",
    team: "Data Pipelines",
    loc: "Remote (Global) / Mumbai",
    salary: "$130k – $160k",
    slug: "senior-satellite-data-engineer"
  },
  {
    role: "Frontend Engineer (Next.js / Tailwind)",
    team: "Developer Tools",
    loc: "Remote (Global) / Bangalore",
    salary: "$90k – $120k",
    slug: "frontend-engineer"
  },
  {
    role: "Infrastructure Reliability Architect",
    team: "Systems & Security",
    loc: "Remote (Global) / Singapore",
    salary: "$140k – $180k",
    slug: "infra-reliability-architect"
  }
];

export default function CareersPage() {
  return (
    <main className="bg-white min-h-screen text-slate-800 pt-24 pb-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">
          Careers
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">
          Help Us Build the Agri-Developer Stack
        </h1>
        <p className="text-lg text-slate-500 mt-4 leading-relaxed">
          We are remote-first engineering teams working on planetary-scale spatial telemetry systems.
        </p>
      </section>

      {/* Jobs list */}
      <section className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 mb-6">Open Developer Roles</h2>
        {jobs.map((job) => (
          <div
            key={job.slug}
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                {job.role}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-450 font-medium select-none">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> {job.team}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {job.loc}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                </span>
              </div>
            </div>
            <button
              onClick={() => window.location.href = 'mailto:careers@X-AGI.dev'}
              className="bg-slate-50 group-hover:bg-primary text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-transparent px-4 py-2 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1 self-start md:self-center cursor-pointer"
            >
              Apply Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
