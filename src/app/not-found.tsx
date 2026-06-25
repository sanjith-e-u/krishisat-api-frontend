import React from "react";
import Link from "next/link";
import Logo from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-foreground flex flex-col justify-center items-center px-6 relative overflow-hidden text-white select-none">
      {/* Background radial glows for aesthetic consistency */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#2563EB] opacity-10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#06B6D4] opacity-5 blur-[100px] pointer-events-none" />

      <div className="z-10 text-center max-w-md flex flex-col items-center gap-6">
        <Link href="/">
          <Logo size="lg" dark />
        </Link>

        <div className="space-y-2.5 mt-4">
          <div className="text-sm font-mono uppercase tracking-widest text-[#22C55E] font-bold">
            Error 404 · Page Not Found
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Lost in orbit?
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            The page you are looking for doesn&apos;t exist or has been moved to a new coordinate.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
          <Link
            href="/"
            className="bg-[#22C55E] hover:bg-[#1cbd53] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors custom-shadow text-center"
          >
            Go Home
          </Link>
          <Link
            href="/docs"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors text-center"
          >
            View Docs
          </Link>
          <Link
            href="/register"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-lg text-xs font-bold transition-colors text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
