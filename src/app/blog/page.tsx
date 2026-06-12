"use client";

import React from "react";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const posts = [
  {
    title: "Introducing Chlorophyll Index (CI) for Leaf Nitrogen Mapping",
    desc: "How we calculate early-growth canopy chlorophyll content using Sentinel-2 RedEdge bands to guide fertilizer applications.",
    date: "June 08, 2026",
    readTime: "6 min read",
    slug: "introducing-chlorophyll-index"
  },
  {
    title: "Optimizing Multi-Spectral Satellite Telemetry Pipelines",
    desc: "An engineering deep-dive on how we cache Copernicus raster layers and compute regional NDVI maps under 300ms.",
    date: "May 24, 2026",
    readTime: "10 min read",
    slug: "optimizing-satellite-telemetry-pipelines"
  },
  {
    title: "Weather Centroids: Mapped Growing Degree Days (GDD)",
    desc: "Why crop growth stage prediction relies on hyperlocal weather integration, and how to utilize our weather endpoints.",
    date: "April 15, 2026",
    readTime: "5 min read",
    slug: "weather-centroids-growing-degree-days"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen text-slate-800 pt-24 pb-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">
          Developer Blog
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">
          Agriculture & Satellite Engineering Insights
        </h1>
        <p className="text-lg text-slate-500 mt-4 leading-relaxed">
          Tutorials, engineering post-mortems, and spectral intelligence analyses.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4 select-none">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.date}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                {post.desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center select-none">
              <span className="text-xs font-bold text-primary inline-flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom Newsletter Stub */}
      <section className="max-w-xl mx-auto px-6 text-center py-16">
        <div className="flex flex-col items-center gap-4 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-base font-extrabold text-slate-900">Subscribe to updates</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Get technical notifications on API release notes, new indices, and satellite coverage expansions.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full mt-2">
            <input
              type="email"
              placeholder="you@company.com"
              required
              className="flex-1 h-9 px-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-[#114524] text-white px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
