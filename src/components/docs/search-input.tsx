"use client"

import React, { useEffect, useRef } from "react"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search documentation..."
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" aria-hidden="true" />
      </div>
      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search documentation"
        className="w-full h-10 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-12 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#14532D]/10 focus:border-[#14532D] transition-all shadow-sm"
      />
      {value ? (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search input"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-1 focus:ring-[#14532D] rounded my-1 mr-1"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      ) : (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ⌘K
          </kbd>
        </div>
      )}
    </div>
  )
}
