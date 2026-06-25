"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "scrolled"
  dark?: boolean
  className?: string
}

export default function Logo({
  size = "md",
  dark = false,
  className
}: LogoProps) {
  const iconSizes = {
    sm: 24,
    scrolled: 26,
    md: 32,
    lg: 32
  }

  const textSizes = {
    sm: "text-xl",
    scrolled: "text-xl",
    md: "text-2xl",
    lg: "text-2xl"
  }

  const iconSize = iconSizes[size] || 32
  const textSize = textSizes[size] || "text-2xl"

  return (
    <div
      className={cn(
        "relative select-none flex items-center justify-start gap-2.5 transition-all duration-200",
        className
      )}
    >
      <Image
        src="/x-agi-mark.svg"
        alt="X-AGI Mark"
        width={iconSize}
        height={iconSize}
        priority
        className="object-contain"
      />
      <span className={cn(
        "font-extrabold tracking-tight font-sans",
        textSize,
        dark ? "text-white" : "text-foreground"
      )}>
        X-AGI
      </span>
    </div>
  )
}
