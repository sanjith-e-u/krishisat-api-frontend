import React from "react";
import Link from "next/link";
import Logo from "@/components/brand/logo";

export default function Footer() {
  return (
    <footer className="bg-subtle border-t border-border text-muted-foreground font-sans">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center select-none mb-2">
              <Logo size="lg" dark />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Satellite intelligence, crop monitoring, weather APIs, and agricultural infrastructure for developers.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wider mb-5 uppercase font-mono">
              Product
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/marketplace" className="hover:text-accent transition-colors">
                  API Catalog
                </Link>
              </li>
              <li>
                <Link href="/models" className="hover:text-accent transition-colors">
                  AI Models
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-accent transition-colors">
                  Trust
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-muted-foreground/60 cursor-not-allowed">
                  Status <span className="text-[10px] text-muted-foreground/40 font-medium">(coming soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wider mb-5 uppercase font-mono">
              Developers
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/docs" className="hover:text-accent transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/developers/reference" className="hover:text-accent transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/developers/quickstart" className="hover:text-accent transition-colors">
                  Quickstart
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-accent transition-colors">
                  SDKs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wider mb-5 uppercase font-mono">
              Resources
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="mailto:support@x-agi.dev" className="hover:text-accent transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/60 cursor-not-allowed">
                  Changelog <span className="text-[10px] text-muted-foreground/40 font-medium">(coming soon)</span>
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/60 cursor-not-allowed">
                  System Status <span className="text-[10px] text-muted-foreground/40 font-medium">(coming soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wider mb-5 uppercase font-mono">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/60 cursor-not-allowed select-none">
                  Blog — launching soon
                </span>
              </li>
              <li>
                <Link href="/careers" className="hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-sans">
          <div>© 2026 X-AGI. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
