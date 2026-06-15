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
  // Height mapping in pixels:
  // Desktop Navbar: 60px height (md)
  // Scrolled Navbar: 48px height (scrolled)
  // Mobile Navbar: 44px height (sm)
  // Footer: 52px height (lg)
  const heights = {
    sm: 44,
    scrolled: 48,
    md: 60,
    lg: 52
  }

  const height = heights[size] || 60
  // Aspect ratio is exactly 3.340
  const width = Math.round(height * 3.340)

  return (
    <div
      className={cn(
        "relative select-none flex items-center justify-start",
        dark && "brightness-0 invert opacity-90",
        className
      )}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <Image
        src="/logo.png"
        alt="KrishiSat Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </div>
  )
}
