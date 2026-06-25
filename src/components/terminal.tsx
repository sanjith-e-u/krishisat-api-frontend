"use client"

import React, { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"

const JSON_CONTENT = `{
  "farm_id": "KR-1024",
  "ndvi": 0.82,
  "ndmi": 0.67,
  "weather": {
    "temp": 29,
    "rainfall": 12
  },
  "status": "success",
  "latency": "420ms"
}`

export default function Terminal() {
  const [copied, setCopied] = useState(false)
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      setDisplayedText(JSON_CONTENT.slice(0, i))
      i++
      if (i > JSON_CONTENT.length) {
        clearInterval(intervalId)
      }
    }, 25) // Typing speed
    return () => clearInterval(intervalId)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON_CONTENT)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy JSON: ", err)
    }
  }

  // Primitive syntax highlighter for the JSON typing effect
  const renderHighlightedText = (text: string) => {
    // We regex split to find strings, numbers, syntax
    const parts = text.split(/(".*?"|[\{\}\[\]:,]|\b\d+(?:\.\d+)?\b|\b(?:true|false|null)\b)/g)
    return parts.map((part, i) => {
      if (!part) return null
      
      // Strings
      if (part.startsWith('"') && part.endsWith('"')) {
        // Simple heuristic: if it is followed by a colon soon after, it's a key
        const textAfter = text.slice(text.indexOf(part) + part.length)
        const isKey = /^\\s*:/.test(textAfter)
        
        if (isKey) return <span key={i} className="text-muted-foreground">{part}</span>
        return <span key={i} className="text-accent">{part}</span>
      }
      
      // Numbers
      if (/^\\d+(?:\\.\\d+)?$/.test(part)) return <span key={i} className="text-amber-500">{part}</span>
      
      // Syntax
      if (/[\\{\\}\\[\\]:,]/.test(part)) return <span key={i} className="text-muted-foreground">{part}</span>
      
      return <span key={i} className="text-foreground">{part}</span>
    })
  }

  return (
    <div className="ring-gilt glass-panel rounded-xl overflow-hidden font-mono w-full max-w-4xl mx-auto z-10 relative">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      <div className="bg-noise" />
      
      {/* Top Bar */}
      <div className="bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-border/50 relative z-10 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
          </div>
          
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-background border border-border shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-ring"></span>
            <span className="text-[9px] uppercase font-bold text-foreground tracking-wider">LIVE</span>
          </div>

          <div className="text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wide truncate">
            POST /v1/intelligence
          </div>
        </div>

        <div className="flex items-center gap-3 text-[9px] sm:text-[10px] text-muted-foreground font-mono ml-auto">
          <span className="hidden sm:inline-block">ap-south-1</span>
          <span className="hidden sm:inline-block">req: 8c1a…f0d2</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all border border-border/50 shrink-0"
            title="Copy JSON response"
          >
            {copied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Body: 2-column split */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/50 relative z-10">
        
        {/* Left Column: Request */}
        <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed overflow-x-auto text-left bg-background/20">
          <div className="text-muted-foreground mb-3 opacity-50 text-[10px] uppercase tracking-wider font-semibold"># request</div>
          <pre className="font-mono text-[10px] sm:text-xs text-muted-foreground">
            <span className="text-accent font-semibold">POST</span> <span className="text-foreground">/v1/intelligence</span> HTTP/1.1
            <br />
            Host: <span className="text-foreground">api.x-agi.dev</span>
            <br />
            Authorization: <span className="text-foreground">Bearer ks_live_...</span>
            <br />
            Content-Type: <span className="text-foreground">application/json</span>
            <br />
            <br />
            <span className="text-muted-foreground">{"{"}</span>
            <br />
            &nbsp;&nbsp;<span className="text-muted-foreground">&quot;farm_id&quot;</span>: <span className="text-accent">&quot;KR-1024&quot;</span>,
            <br />
            &nbsp;&nbsp;<span className="text-muted-foreground">&quot;indices&quot;</span>: [<span className="text-accent">&quot;ndvi&quot;</span>, <span className="text-accent">&quot;ndmi&quot;</span>],
            <br />
            &nbsp;&nbsp;<span className="text-muted-foreground">&quot;include_weather&quot;</span>: <span className="text-amber-500">true</span>
            <br />
            <span className="text-muted-foreground">{"}"}</span>
          </pre>
        </div>

        {/* Right Column: Response */}
        <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed overflow-x-auto text-left bg-transparent">
          <div className="flex justify-between items-center mb-3">
            <div className="text-muted-foreground opacity-50 text-[10px] uppercase tracking-wider font-semibold"># response</div>
            <span className="bg-accent/10 text-accent text-[9px] px-1.5 py-0.5 rounded font-mono font-bold border border-accent/20">
              200 OK
            </span>
          </div>
          <pre className="font-mono text-[10px] sm:text-xs">
            {renderHighlightedText(displayedText)}
            <span className="inline-block text-accent animate-pulse align-middle ml-0.5">▮</span>
          </pre>
        </div>

      </div>
    </div>
  )
}
