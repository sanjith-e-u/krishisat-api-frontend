"use client";

import React, { useState } from "react";
import { Copy, Check, Zap, CornerDownRight } from "lucide-react";

const MOCK_RESPONSES: Record<string, object> = {
  ndvi: {
    farm_id: "farm_demo_001",
    date: "2026-06-12",
    index: "NDVI",
    mean: 0.72,
    min: 0.41,
    max: 0.89,
    healthy_percentage: 84.3,
    stressed_percentage: 9.2,
    cloud_coverage: 5.1,
    credits_used: 1,
    unit: "normalized [-1, 1]"
  },
  ndmi: {
    farm_id: "farm_demo_001",
    date: "2026-06-12",
    index: "NDMI",
    mean: 0.31,
    water_stress_level: "Moderate",
    irrigation_recommended: true,
    credits_used: 2
  },
  weather: {
    farm_id: "farm_demo_001",
    timestamp: "2026-06-12T06:00:00Z",
    temperature_c: 24.5,
    humidity_pct: 67,
    rainfall_mm: 0,
    wind_speed_kmh: 12,
    condition: "Partly cloudy",
    credits_used: 1
  }
};

const API_COSTS: Record<string, number> = {
  ndvi: 1,
  ndmi: 2,
  weather: 1
};

export function ApiPlayground() {
  const [selected, setSelected] = useState<string>("ndvi");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<object | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTry = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult(MOCK_RESPONSES[selected]);
    }, 850);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full text-left select-none font-sans bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow">
      <div className="flex border-b border-border mb-8">
        <div className="flex gap-8">
          {["ndvi", "ndmi", "weather"].map((api) => (
            <button
              key={api}
              onClick={() => {
                setSelected(api);
                setResult(null);
              }}
              className={`pb-3 text-xs sm:text-sm font-bold font-mono transition-all border-b-2 -mb-[1px] ${
                selected === api
                  ? "text-accent border-accent"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {api.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Request Headers */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest select-none ml-1">Authorization Header</label>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs overflow-x-auto whitespace-nowrap scrollbar-none bg-subtle border border-border rounded-xl px-4 py-3.5">
            <span className="text-muted-foreground select-none">Authorization:</span>
            <span className="text-muted-foreground select-none">Bearer</span>
            <span className="text-accent font-bold select-all">ks_sandbox_demo_key_92m4b</span>
          </div>
        </div>

        {/* Request endpoint & cost preview */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest select-none ml-1">Endpoint</label>
          <div className="flex items-center justify-between gap-2 bg-subtle border border-border rounded-xl px-4 py-3.5 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <CornerDownRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="font-mono text-[10px] text-foreground bg-background border border-border px-2 py-0.5 rounded uppercase font-bold tracking-wider select-none shrink-0">
                POST
              </span>
              <code className="font-mono text-xs text-foreground overflow-x-auto whitespace-nowrap scrollbar-none select-text">
                https://api.x-agi.dev/v1/{selected === "weather" ? "weather" : `vegetation/${selected}`}
              </code>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground bg-background border border-border px-2.5 py-0.5 rounded font-mono shrink-0 select-none hidden sm:inline-block">
              Cost: {API_COSTS[selected]} {API_COSTS[selected] === 1 ? "credit" : "credits"}
            </span>
          </div>
        </div>

        {/* Trigger Button */}
        <button
          onClick={handleTry}
          disabled={loading}
          className="w-full py-3 mt-2 rounded-xl bg-accent hover:bg-accent/90 disabled:bg-accent/60 text-background text-sm font-bold transition-all custom-shadow flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin inline-block" />
              <span>Simulating network handshake...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-current" />
              <span>Send mock API request</span>
            </>
          )}
        </button>

        {/* Response Display Box */}
        <div className="relative mt-4">
          <div className="flex justify-between items-center bg-subtle px-4 py-2.5 border-t border-x border-border rounded-t-xl">
            <span className="text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-wider">Response JSON</span>
            {result && (
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-semibold focus:outline-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent" />
                    <span className="text-accent font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            )}
          </div>
          <pre className="bg-background border-b border-x border-border rounded-b-xl p-5 text-[12px] font-mono overflow-auto text-foreground max-h-[250px] leading-relaxed select-text">
            <code>
              {loading
                ? `{\n  "status": "pending",\n  "message": "resolving satellite tile indexes..."\n}`
                : result
                ? JSON.stringify(result, null, 2)
                : `// click 'Send mock API request' to view response`}
            </code>
          </pre>
        </div>

        {result && !loading && (
          <p className="text-[11px] text-muted-foreground mt-4 text-center select-none">
            This is a mock response.{" "}
            <a href="/register" className="text-accent hover:underline font-bold transition-colors">
              Get your free API key →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
