"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "APIs", href: "/marketplace" },
  { name: "Models", href: "/models" },
  { name: "Docs", href: "/docs" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 flex items-center",
        scrolled
          ? "h-[72px] bg-background/80 backdrop-blur-md border-b border-border custom-shadow"
          : "h-[72px] md:h-[88px] bg-background border-b border-border/50"
      )}
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center select-none mr-6">
          <img 
            src="/x-agi-full-logo.png" 
            alt="X-AGI Logo" 
            className="w-[130px] md:w-[160px] h-auto bg-transparent" 
          />
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center h-full gap-8 self-stretch">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative h-full flex items-center self-stretch",
                  isActive
                    ? "text-accent font-semibold"
                    : "text-muted-foreground hover:text-accent"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-accent rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-accent hover:bg-accent-strong text-accent-foreground px-5 py-2.5 text-xs font-semibold rounded-lg transition-colors custom-shadow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background hover-glow btn-magnetic"
          >
            Get API Key
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Overlay for Mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sliding Mobile Drawer Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 h-full w-[280px] bg-background border-l border-border shadow-2xl z-50 p-6 flex flex-col transition-transform duration-350 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-4 select-none">
          <Link href="/">
            <img src="/x-agi-full-logo.png" alt="X-AGI Logo" className="w-[130px] h-auto bg-transparent" />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-base font-semibold py-1 transition-colors border-b border-border/30 pb-1",
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 pb-8">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center border border-border py-3 rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center bg-accent hover:bg-accent-strong text-accent-foreground py-3 rounded-lg text-sm font-semibold transition-colors custom-shadow"
          >
            Get API Key
          </Link>
        </div>
      </div>
    </header>
  );
}
