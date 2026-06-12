"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

const codeTabs = [
  {
    id: "curl",
    label: "cURL",
    language: "bash",
    code: `curl https://api.krishisat.dev/v1/intelligence \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{ "farm_id": "KR-1024",
        "indices": ["ndvi","ndmi","weather"] }'`,
    highlighted: (
      <span>
        <span className="text-slate-500">curl</span> <span className="text-cyan-400">https://api.krishisat.dev/v1/intelligence</span> \<br />
        {"  "}<span className="text-slate-405">-H</span> <span className="text-emerald-400">&quot;Authorization: Bearer $KSAT_KEY&quot;</span> \<br />
        {"  "}<span className="text-slate-405">-d</span> <span className="text-emerald-400">{"'{ \"farm_id\": \"KR-1024\", \"indices\": [\"ndvi\",\"ndmi\",\"weather\"] }'"}</span>
      </span>
    )
  },
  {
    id: "python",
    label: "Python",
    language: "python",
    code: `import krishisat

client = krishisat.Client(api_key="$KSAT_KEY")
result = client.intelligence.get(
    farm_id="KR-1024",
    indices=["ndvi", "ndmi", "weather"]
)
print(result.ndvi)  # 0.82`,
    highlighted: (
      <span>
        <span className="text-rose-400">import</span> <span className="text-white">krishisat</span><br /><br />
        <span className="text-white">client = krishisat.</span><span className="text-cyan-400">Client</span><span className="text-slate-400">(</span><span className="text-slate-300">api_key</span><span className="text-slate-400">=</span><span className="text-emerald-400">&quot;$KSAT_KEY&quot;</span><span className="text-slate-400">)</span><br />
        <span className="text-white">result = client.intelligence.</span><span className="text-cyan-400">get</span><span className="text-slate-400">(</span><br />
        {"    "}<span className="text-slate-300">farm_id</span><span className="text-slate-400">=</span><span className="text-emerald-400">&quot;KR-1024&quot;</span><span className="text-slate-400">,</span><br />
        {"    "}<span className="text-slate-300">indices</span><span className="text-slate-400">=</span><span className="text-slate-400">[</span><span className="text-emerald-400">&quot;ndvi&quot;</span><span className="text-slate-400">,</span> <span className="text-emerald-400">&quot;ndmi&quot;</span><span className="text-slate-400">,</span> <span className="text-emerald-400">&quot;weather&quot;</span><span className="text-slate-400">]</span><br />
        <span className="text-slate-400">)</span><br />
        <span className="text-cyan-400">print</span><span className="text-slate-400">(</span><span className="text-white">result.ndvi</span><span className="text-slate-400">)</span>  <span className="text-slate-500">{"# 0.82"}</span>
      </span>
    )
  },
  {
    id: "nodejs",
    label: "Node.js",
    language: "javascript",
    code: `import KrishiSat from 'krishisat';

const client = new KrishiSat({ apiKey: process.env.KSAT_KEY });
const result = await client.intelligence.get({
  farmId: 'KR-1024',
  indices: ['ndvi', 'ndmi', 'weather']
});
console.log(result.ndvi); // 0.82`,
    highlighted: (
      <span>
        <span className="text-rose-400">import</span> <span className="text-white">KrishiSat</span> <span className="text-rose-400">from</span> <span className="text-emerald-400">&apos;krishisat&apos;</span><span className="text-slate-400">;</span><br /><br />
        <span className="text-rose-400">const</span> <span className="text-white">client =</span> <span className="text-rose-400">new</span> <span className="text-cyan-400">KrishiSat</span><span className="text-slate-400">(</span><span className="text-slate-300">{"{ apiKey: process.env.KSAT_KEY }"}</span><span className="text-slate-400">)</span><br />
        <span className="text-rose-400">const</span> <span className="text-white">result =</span> <span className="text-rose-400">await</span> <span className="text-white">client.intelligence.</span><span className="text-cyan-400">get</span><span className="text-slate-400">(</span><span className="text-slate-300">{"{"}</span><br />
        {"  "}<span className="text-slate-300">farmId</span><span className="text-slate-400">:</span> <span className="text-emerald-400">&apos;KR-1024&apos;</span><span className="text-slate-400">,</span><br />
        {"  "}<span className="text-slate-300">indices</span><span className="text-slate-400">:</span> <span className="text-slate-400">[</span><span className="text-emerald-400">&apos;ndvi&apos;</span><span className="text-slate-400">,</span> <span className="text-emerald-400">&apos;ndmi&apos;</span><span className="text-slate-455">&apos;weather&apos;</span><span className="text-slate-400">]</span><br />
        <span className="text-slate-300">{"}"}</span><span className="text-slate-400">)</span><br />
        <span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-slate-400">(</span><span className="text-white">result.ndvi</span><span className="text-slate-400">)</span><span className="text-slate-400">;</span> <span className="text-slate-500">{"// 0.82"}</span>
      </span>
    )
  }
];

export default function CodeBlock() {
  const [activeTab, setActiveTab] = useState("curl");
  const [copied, setCopied] = useState(false);

  const activeTabContent = codeTabs.find((tab) => tab.id === activeTab) ?? codeTabs[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTabContent.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-[#0D1117] overflow-hidden flex flex-col font-mono text-xs sm:text-sm custom-shadow w-full">
      {/* Switcher & Copy Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          {codeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-[4px] text-xs font-mono font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-[4px] border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Display */}
      <div className="p-6 overflow-x-auto text-left min-h-[160px] flex items-center">
        <pre className="font-mono text-slate-300 w-full whitespace-pre-wrap sm:whitespace-pre">
          <code>{activeTabContent.highlighted}</code>
        </pre>
      </div>
    </div>
  );
}
