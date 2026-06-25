"use client";

import React, { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [position, setPosition] = useState({ x: 50, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="hidden [@media(pointer:fine)]:block pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 mix-blend-screen"
      style={{
        background: `radial-gradient(180px circle at ${position.x}% ${position.y}%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 60%)`,
      }}
    />
  );
}
