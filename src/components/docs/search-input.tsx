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
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
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
        className="w-full h-10 bg-background border border-border text-foreground placeholder-slate-400 rounded-lg pl-9 pr-12 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all custom-shadow"
      />
      {value ? (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search input"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-muted-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-accent rounded my-1 mr-1"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      ) : (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground bg-muted border border-border rounded">
            ⌘K
          </kbd>
        </div>
      )}
    </div>
  )
}
