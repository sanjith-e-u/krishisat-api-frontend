"use client";

import React, { useState } from "react";
import { Copy, Check, Play, CornerDownRight } from "lucide-react";

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
  const [result, setResult] = useState<object | null>(MOCK_RESPONSES.ndvi);
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
    <div className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl text-left select-none font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase tracking-widest">Interactive Sandbox</span>
          <h3 className="text-base font-extrabold text-white tracking-tight mt-0.5">Live API Simulation</h3>
        </div>
        <div className="flex gap-1.5">
          {["ndvi", "ndmi", "weather"].map((api) => (
            <button
              key={api}
              onClick={() => {
                setSelected(api);
                setResult(MOCK_RESPONSES[api]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border transition-all ${
                selected === api
                  ? "bg-[#22C55E] text-white border-[#22C55E]"
                  : "border-slate-800 text-slate-400 bg-slate-900/50 hover:bg-slate-900"
              }`}
            >
              {api.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Request Headers */}
        <div className="flex flex-col gap-1.5 bg-slate-950/45 border border-slate-800/40 rounded-xl px-4 py-3">
          <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest select-none">HTTP Request Headers</label>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="text-slate-400 select-none">Authorization:</span>
            <span className="text-slate-500 select-none">Bearer</span>
            <span className="text-[#22C55E] font-bold select-all">ks_sandbox_demo_key_92m4b</span>
          </div>
        </div>

        {/* Request endpoint & cost preview */}
        <div className="flex items-center justify-between gap-2 bg-slate-950/70 border border-slate-800/60 rounded-xl px-4 py-3 overflow-hidden">
          <div className="flex items-center gap-2 min-w-0">
            <CornerDownRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="font-mono text-xs text-white bg-slate-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider select-none shrink-0">
              POST
            </span>
            <code className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-none select-text">
              https://api.X-AGI.dev/v1/{selected === "weather" ? "weather" : `vegetation/${selected}`}
            </code>
          </div>
          <span className="text-[10px] font-bold text-slate-350 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded font-mono shrink-0 select-none">
            Cost: {API_COSTS[selected]} {API_COSTS[selected] === 1 ? "credit" : "credits"}
          </span>
        </div>

        {/* Trigger Button */}
        <button
          onClick={handleTry}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#1cbd53] disabled:bg-[#22C55E]/60 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              <span>Simulating network handshake...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Send mock API request</span>
            </>
          )}
        </button>

        {/* Response Display Box */}
        <div className="relative">
          <div className="flex justify-between items-center bg-slate-900 px-4 py-2 border-t border-x border-slate-850 rounded-t-xl">
            <span className="text-[10px] font-mono text-slate-450 font-bold uppercase tracking-wider">Response JSON</span>
            {result && (
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold focus:outline-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
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
          <pre className="bg-slate-950 border-b border-x border-slate-850 rounded-b-xl p-4 text-[11px] font-mono overflow-auto text-slate-300 max-h-[200px] leading-relaxed select-text">
            <code>
              {loading
                ? `{\n  "status": "pending",\n  "message": "resolving satellite tile indexes..."\n}`
                : result
                ? JSON.stringify(result, null, 2)
                : `{\n  "error": "No data returned"\n}`}
            </code>
          </pre>
        </div>

        {result && !loading && (
          <p className="text-[11px] text-slate-500 mt-2 text-center select-none">
            This is a mock response.{" "}
            <a href="/register" className="text-[#22C55E] hover:underline font-bold transition-colors">
              Get your free API key →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
