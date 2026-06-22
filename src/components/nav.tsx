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
                    : "text-slate-650 hover:text-[#14532D]"
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
            className="text-sm font-medium text-slate-650 hover:text-slate-900 px-3 py-1.5 transition-colors"
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
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-655 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Overlay for Mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-40 transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sliding Mobile Drawer Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 h-full w-[280px] bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col transition-transform duration-350 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4 select-none">
          <Logo size="sm" dark={false} />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
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
                  "text-base font-semibold py-1 transition-colors border-b border-slate-50/50 pb-1",
                  isActive
                    ? "text-[#14532D]"
                    : "text-slate-655 hover:text-[#14532D]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="mt-auto flex flex-col gap-3 pb-8">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center border border-slate-200 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
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
    </header>
  );
}
