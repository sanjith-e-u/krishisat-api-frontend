"use client";

import { useEffect } from "react";

export function useActiveSection(setActive: (id: string) => void) {
  useEffect(() => {
    const container = document.querySelector("main");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: container,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      }
    );

    // Observe all headings that have ids in the docs page
    const elements = document.querySelectorAll("h2[id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [setActive]);
}
