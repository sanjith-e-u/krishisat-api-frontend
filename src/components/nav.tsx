"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Trust", href: "/trust" },
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
        "fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/80 shadow-sm transition-all duration-200 flex items-center",
        scrolled ? "h-[72px]" : "h-[72px] md:h-[88px]"
      )}
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center select-none">
          <Logo size={scrolled ? "scrolled" : "md"} dark={false} className="hidden md:block" />
          <Logo size="sm" dark={false} className="md:hidden" />
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
                    ? "text-[#14532D] font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#14532D] rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-[#14532D] hover:bg-[#114524] text-white px-5 py-2.5 text-xs font-semibold rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:ring-offset-2 focus:ring-offset-white"
          >
            Get API Key
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Full-screen Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className={cn(
            "md:hidden fixed inset-0 z-40 bg-white flex flex-col border-t border-slate-200 p-6 animate-in fade-in slide-in-from-top-4 duration-200",
            scrolled ? "top-[72px]" : "top-[72px] md:top-[88px]"
          )}
        >
          <nav className="flex flex-col gap-6 mt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-slate-100",
                    isActive
                      ? "text-[#14532D] font-semibold"
                      : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto flex flex-col gap-4 mb-10">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center border border-slate-200 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#14532D] hover:bg-[#114524] text-white py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              Get API Key
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
