"use client"

import React, { useRef } from "react"
import { cn } from "@/lib/utils"

type TabLang = "curl" | "python" | "node"

interface LanguageTabsProps {
  activeTab: TabLang;
  onChange: (tab: TabLang) => void;
  sectionId: string;
}

const languages: { key: TabLang; label: string }[] = [
  { key: "curl", label: "cURL" },
  { key: "python", label: "Python" },
  { key: "node", label: "Node.js" }
]

export default function LanguageTabs({
  activeTab,
  onChange,
  sectionId
}: LanguageTabsProps) {
  const tabRefs = {
    curl: useRef<HTMLButtonElement>(null),
    python: useRef<HTMLButtonElement>(null),
    node: useRef<HTMLButtonElement>(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentLang: TabLang) => {
    const currentIndex = languages.findIndex(l => l.key === currentLang)
    let targetIndex = currentIndex

    if (e.key === "ArrowRight") {
      targetIndex = (currentIndex + 1) % languages.length
    } else if (e.key === "ArrowLeft") {
      targetIndex = (currentIndex - 1 + languages.length) % languages.length
    } else if (e.key === "Home") {
      targetIndex = 0
    } else if (e.key === "End") {
      targetIndex = languages.length - 1
    } else {
      return // Don't prevent defaults for other keys (like tab)
    }

    e.preventDefault()
    const targetLang = languages[targetIndex].key
    onChange(targetLang)
    
    // Set focus to the new tab button
    setTimeout(() => {
      tabRefs[targetLang].current?.focus()
    }, 0)
  }

  return (
    <div
      role="tablist"
      aria-label="Code language selection"
      className="flex gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800/40"
    >
      {languages.map(({ key, label }) => {
        const isActive = activeTab === key
        return (
          <button
            key={key}
            ref={tabRefs[key]}
            role="tab"
            id={`tab-${sectionId}-${key}`}
            aria-selected={isActive}
            aria-controls={`panel-${sectionId}-${key}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(key)}
            onKeyDown={(e) => handleKeyDown(e, key)}
            className={cn(
              "px-3 py-1.5 rounded-md text-[10px] font-mono font-semibold uppercase transition-all duration-200 select-none focus:outline-none focus:ring-1 focus:ring-[#14532D] focus:ring-offset-1 focus:ring-offset-slate-950",
              isActive
                ? "text-white bg-[#14532D] shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
