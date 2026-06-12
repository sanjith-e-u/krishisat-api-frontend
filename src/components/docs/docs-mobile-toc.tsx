"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { DocSection } from "@/data/docs-sections"

interface DocsMobileTOCProps {
  activeSection: string;
  sections: DocSection[];
  onScrollTo: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
}

export default function DocsMobileTOC({
  activeSection,
  sections,
  onScrollTo
}: DocsMobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeSectionData = sections.find((s) => s.id === activeSection)
  const activeLabel = activeSectionData ? activeSectionData.title.split(" — ")[0] : "Sections"

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    onScrollTo(e, id)
    setIsOpen(false)
  }

  return (
    <nav
      aria-label="Documentation navigation"
      className="lg:hidden sticky top-[72px] left-0 right-0 bg-white/95 backdrop-blur border-b border-slate-200/80 z-30 select-none"
      ref={dropdownRef}
    >
      <div className="px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Toggle documentation table of contents"
          className="flex items-center gap-2 text-xs font-semibold text-slate-705 hover:text-slate-900 transition-colors bg-slate-50 border border-slate-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
        >
          <List className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Active: {activeLabel}</span>
          <ChevronDown
            className={cn("w-3.5 h-3.5 transition-transform duration-200 text-slate-400", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
          Documentation
        </span>
      </div>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200/80 shadow-lg max-h-[320px] overflow-y-auto z-40 animate-in fade-in slide-in-from-top-2 duration-150">
          <ul
            role="listbox"
            aria-label="Documentation topics"
            className="p-3 space-y-1 text-xs text-slate-500"
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <li key={section.id} role="option" aria-selected={isActive}>
                  <button
                    onClick={(e) => handleItemClick(e, section.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors font-medium text-left focus:outline-none",
                      isActive
                        ? "text-[#14532D] bg-[#14532D]/5 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <span>{section.title}</span>
                    {section.endpoint && (
                      <span className={cn(
                        "font-mono text-[9px] px-1.5 py-0.5 rounded ml-2 font-bold uppercase tracking-wider",
                        section.endpoint.method === "GET" && "bg-sky-50 text-sky-700 border border-sky-100",
                        section.endpoint.method === "POST" && "bg-[#14532D]/10 text-[#14532D]"
                      )}>
                        {section.endpoint.method}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
