"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    x.set(xPct);
    y.set(yPct);
    ref.current.style.setProperty("--mx", `${xPct * 100}%`);
    ref.current.style.setProperty("--my", `${yPct * 100}%`);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    if (ref.current) {
      ref.current.style.setProperty("--mx", "50%");
      ref.current.style.setProperty("--my", "50%");
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
