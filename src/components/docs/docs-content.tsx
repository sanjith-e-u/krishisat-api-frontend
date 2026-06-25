"use client"

import React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import LanguageTabs from "./language-tabs"
import CopyButton from "./copy-button"
import { DocSection } from "@/data/docs-sections"

interface DocsContentProps {
  sections: DocSection[];
  activeTab: "curl" | "python" | "node";
  setActiveTab: (tab: "curl" | "python" | "node") => void;
  onCopySuccess: (msg: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export default function DocsContent({
  sections,
  activeTab,
  setActiveTab,
  onCopySuccess,
  searchQuery,
  onClearSearch
}: DocsContentProps) {
  return (
    <div className="max-w-[900px] mx-auto space-y-16 font-sans">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-[110px] border-b border-slate-100 pb-12 last:border-b-0 last:pb-0"
        >
          {/* Section Subtitle - 12px uppercase green */}
          <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#22C55E] mb-3 block font-bold">
            {section.subtitle}
          </span>

          {/* Section Title */}
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-5 font-sans">
            {section.title}
          </h2>

          {/* Redesigned API Endpoint Card - Stripe style */}
          {section.endpoint && (
            <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
              <div className="flex items-center gap-2.5">
                <span className={cn(
                  "font-mono text-[10px] tracking-wider text-white px-2 py-0.5 rounded font-bold uppercase select-none",
                  section.endpoint.method === "GET" && "bg-sky-600",
                  section.endpoint.method === "POST" && "bg-accent"
                )}>
                  {section.endpoint.method}
                </span>
                <span className="font-mono text-sm text-foreground font-semibold tracking-tight">
                  {section.endpoint.path}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground bg-slate-150 border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                  {section.endpoint.credits} {section.endpoint.credits === 1 ? "credit" : "credits"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Returns {section.title.split(" — ")[0]} analytics for registered farm boundaries.
              </p>
            </div>
          )}

          {/* Descriptive texts */}
          <div className="space-y-4 mb-8">
            {section.description.map((para, idx) => (
              <p 
                key={idx} 
                className="text-muted-foreground text-base leading-[1.8] max-w-4xl"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </div>

          {/* Mobile-Only Code Blocks Rendering (hidden on lg and larger screens) */}
          <div className="lg:hidden space-y-4 mt-8">
            
            {/* Request Snippet Block */}
            <div className="space-y-2">
              <div className="bg-slate-900 rounded-t-lg px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <LanguageTabs
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  sectionId={`${section.id}-mobile`}
                />
                
                <CopyButton
                  text={section.code[activeTab]}
                  label="Copy"
                  onCopySuccess={onCopySuccess}
                  toastMessage="Code snippet copied to clipboard"
                />
              </div>

              <div
                role="tabpanel"
                id={`panel-${section.id}-mobile-${activeTab}`}
                aria-labelledby={`tab-${section.id}-mobile-${activeTab}`}
              >
                <pre
                  tabIndex={0}
                  aria-label={`${activeTab} code example`}
                  className="bg-slate-950/80 p-4 text-xs font-mono leading-relaxed overflow-x-auto min-h-full text-left whitespace-pre text-slate-350 rounded-b-lg border border-slate-805 focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 focus:ring-offset-slate-900"
                >
                  <code>{section.code[activeTab]}</code>
                </pre>
              </div>
            </div>

            {/* Response Payload Block */}
            <div className="space-y-2 mt-4">
              <div className="bg-slate-900 border border-slate-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                  Response payload
                </span>
                
                <CopyButton
                  text={section.response}
                  label="Copy"
                  onCopySuccess={onCopySuccess}
                  toastMessage="Response payload copied to clipboard"
                />
              </div>
              <pre
                tabIndex={0}
                aria-label="Expected JSON response payload example"
                className="bg-slate-950/80 p-4 text-xs font-mono leading-relaxed overflow-x-auto min-h-full text-left whitespace-pre text-slate-350 rounded-b-lg border border-slate-805 focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 focus:ring-offset-slate-900"
              >
                <code>{section.response}</code>
              </pre>
            </div>

          </div>
        </section>
      ))}

      {/* Empty State for Search Filter */}
      {sections.length === 0 && (
        <div className="py-12 px-6 text-center text-muted-foreground max-w-md mx-auto bg-subtle border border-border/60 rounded-lg custom-shadow">
          <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
          <h3 className="font-bold text-foreground text-sm">No results match your search</h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-sans">
            Your search query &quot;{searchQuery}&quot; did not return any matches. Try looking for endpoints, headers, or terms like &quot;NDVI&quot; or &quot;SLA&quot;.
          </p>
          <button
            onClick={onClearSearch}
            className="mt-5 bg-accent hover:bg-[#114524] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent custom-shadow"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  )
}
