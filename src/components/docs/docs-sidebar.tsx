"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import SearchInput from "./search-input"
import { DocSection } from "@/data/docs-sections"

interface DocsSidebarProps {
  activeSection: string;
  onScrollTo: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  gettingStartedSections: DocSection[];
  coreApiSections: DocSection[];
  referenceSections: DocSection[];
  activeSectionFilteredOut: boolean;
  totalFilteredCount: number;
}

export default function DocsSidebar({
  activeSection,
  onScrollTo,
  searchQuery,
  setSearchQuery,
  gettingStartedSections,
  coreApiSections,
  referenceSections,
  activeSectionFilteredOut,
  totalFilteredCount
}: DocsSidebarProps) {
  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 bg-background border-r border-slate-100 text-muted-foreground h-[calc(100vh-88px)] sticky top-[88px] overflow-y-auto px-6 py-8 flex-col justify-between z-20 select-none">
      <div>
        {/* Sidebar Header Search */}
        <div className="mb-6">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Active section filtered out warning */}
        {activeSectionFilteredOut && (
          <div className="mb-5 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-[11px] leading-relaxed font-sans">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span>Current section is hidden by search. </span>
              <button
                onClick={() => setSearchQuery("")}
                className="underline hover:text-amber-950 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400 rounded px-0.5"
              >
                Clear filter
              </button>
            </div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav aria-label="Documentation navigation" className="space-y-6">
          {/* Category: Getting Started */}
          {gettingStartedSections.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2 block font-sans">
                GETTING STARTED
              </h4>
              <ul className="space-y-1">
                {gettingStartedSections.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => onScrollTo(e, section.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none",
                          isActive
                            ? "bg-accent/5 text-accent font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-subtle"
                        )}
                      >
                        {section.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Category: Core APIs */}
          {coreApiSections.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2 block font-sans">
                CORE APIS
              </h4>
              <ul className="space-y-1">
                {coreApiSections.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => onScrollTo(e, section.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none",
                          isActive
                            ? "bg-accent/5 text-accent font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-subtle"
                        )}
                      >
                        <span>{section.title.split(" — ")[0]}</span>
                        {section.endpoint && (
                          <span className={cn(
                            "font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider",
                            section.endpoint.method === "GET" && "bg-sky-50 text-sky-700 border border-sky-100",
                            section.endpoint.method === "POST" && "bg-accent/10 text-accent"
                          )}>
                            {section.endpoint.method}
                          </span>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Category: Reference */}
          {referenceSections.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2 block font-sans">
                REFERENCE
              </h4>
              <ul className="space-y-1">
                {referenceSections.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => onScrollTo(e, section.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none",
                          isActive
                            ? "bg-accent/5 text-accent font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-subtle"
                        )}
                      >
                        {section.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Category: Developer Resources */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2 block font-sans">
              DEVELOPER RESOURCES
            </h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/developers/quickstart"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle"
                >
                  Quickstart
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/developers/reference"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle"
                >
                  Reference
                </Link>
              </li>
              <li>
                <button
                  onClick={(e) => onScrollTo(e, "support")}
                  className="w-full flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle text-left focus:outline-none"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>

          {/* Empty Search State inside Sidebar */}
          {totalFilteredCount === 0 && (
            <div className="py-4 text-center text-muted-foreground font-sans text-xs">
              No matching sections.
            </div>
          )}
        </nav>
      </div>
    </aside>
  )
}
