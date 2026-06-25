"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function Particles({ className }: { className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 28 random particles only on the client to avoid hydration mismatch
    const generatedParticles: Particle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 10 + 10, // 10s to 20s float
      delay: Math.random() * 5, // 0s to 5s delay
    }));
    
    setParticles(generatedParticles);
  }, []);

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-0", className)} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float z-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            className="bg-accent rounded-full animate-pulse mix-blend-screen"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.15 + Math.random() * 0.25,
              animationDuration: `${p.duration * 0.4}s`,
              boxShadow: `0 0 ${p.size * 2}px var(--accent)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
