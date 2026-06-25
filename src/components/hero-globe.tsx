import React from "react";
import { cn } from "@/lib/utils";

export function HeroGlobe({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center pointer-events-none", className)}>
      {/* Central Glowing Sphere */}
      <div className="absolute w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
      <div className="absolute w-32 h-32 bg-accent/30 rounded-full blur-[40px]" />
      
      {/* SVG Rings & Meridians */}
      <svg className="absolute w-[800px] h-[800px]" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Meridian Wireframes (Static Sphere grid) */}
        <g className="text-accent opacity-20" stroke="currentColor" strokeWidth="1">
          <circle cx="400" cy="400" r="160" />
          <ellipse cx="400" cy="400" rx="80" ry="160" />
          <ellipse cx="400" cy="400" rx="160" ry="80" />
          <line x1="240" y1="400" x2="560" y2="400" />
          <line x1="400" y1="240" x2="400" y2="560" />
        </g>

        {/* Orbit 1 */}
        <g className="origin-center animate-[spin_45s_linear_infinite]">
          <ellipse cx="400" cy="400" rx="360" ry="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-accent/30" transform="rotate(20 400 400)" />
        </g>
        
        {/* Orbit 2 */}
        <g className="origin-center animate-[spin_60s_linear_infinite_reverse]">
          <ellipse cx="400" cy="400" rx="320" ry="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 16" className="text-accent/20" transform="rotate(-50 400 400)" />
        </g>
        
        {/* Orbit 3 */}
        <g className="origin-center animate-[spin_30s_linear_infinite]">
          <ellipse cx="400" cy="400" rx="280" ry="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" className="text-accent/40" transform="rotate(70 400 400)" />
        </g>
      </svg>
    </div>
  );
}
