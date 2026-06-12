"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  text: string;
  label: string;
  className?: string;
  onCopySuccess?: (msg: string) => void;
  toastMessage?: string;
}

export default function CopyButton({
  text,
  label,
  className,
  onCopySuccess,
  toastMessage = "Copied to clipboard"
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    void navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true)
        if (onCopySuccess) {
          onCopySuccess(toastMessage)
        }
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={`${label} - ${copied ? "Copied" : "Copy to clipboard"}`}
      className={cn(
        "flex items-center gap-1.5 text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#14532D] focus:ring-offset-1 focus:ring-offset-slate-900 rounded px-2 py-1 select-none",
        copied
          ? "text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20"
          : "text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/30",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="font-medium">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="font-medium">{label}</span>
        </>
      )}
    </button>
  )
}
