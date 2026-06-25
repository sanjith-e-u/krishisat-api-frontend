"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useActiveSection } from "@/hooks/useActiveSection"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  Layers,
  Zap,
  Shield,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Mail,
  Check,
  Copy,
  ArrowRight,
  Search,
} from "lucide-react"

const navGroups = [
  {
    label: "Getting Started",
    items: [
      { id: "introduction",   label: "Introduction" },
      { id: "authentication", label: "Authentication" },
      { id: "api-keys",       label: "API Keys" },
      { id: "rate-limits",    label: "Rate Limits" },
    ],
  },
  {
    label: "Core APIs",
    items: [
      { id: "farm-registration", label: "Farm Registration" },
      { id: "ndvi",              label: "NDVI" },
      { id: "ndmi",              label: "NDMI" },
      { id: "ndre",              label: "NDRE" },
      { id: "savi",              label: "SAVI" },
      { id: "ndwi",              label: "NDWI" },
      { id: "ci",                label: "CI Index" },
      { id: "weather",           label: "Weather" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "response-schema", label: "Response Schema" },
      { id: "error-codes",     label: "Error Codes" },
      { id: "support",         label: "Support" },
    ],
  },
]

// Plain string examples for copying to clipboard
function getPlainCode(section: string, lang: string): string {
  switch (section) {
    case "introduction":
    case "authentication":
    case "api-keys":
    case "rate-limits":
    case "response-schema":
    case "support":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/intelligence \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"farm_id":"farm_001","indices":["ndvi","ndmi","weather"]}'`;
      } else if (lang === "python") {
        return `import x_agi

client = x_agi.Client(
  api_key="$KSAT_KEY"
)

result = client.intelligence.get(
  farm_id="farm_001",
  indices=["ndvi", "ndmi", "weather"]
)

print(result.ndvi)  # 0.82`;
      } else {
        return `import x_agi from 'X-AGI'

const client = new X-AGI({
  apiKey: process.env.KSAT_KEY
})

const result = await client.intelligence.get({
  farmId: 'farm_001',
  indices: ['ndvi', 'ndmi', 'weather']
})

console.log(result.ndvi) // 0.82`;
      }
    case "farm-registration":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/farms \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"farm_name":"Rice Farm","polygon":{...GeoJSON...}}'`;
      } else if (lang === "python") {
        return `farm = client.farms.register(
  farm_name="Rice Farm",
  polygon=geojson_polygon
)
print(farm.farm_id)  # farm_001`;
      } else {
        return `const farm = await client.farms.register({
  farmName: 'Rice Farm',
  polygon: geojsonPolygon
})
console.log(farm.farmId) // farm_001`;
      }
    case "ndvi":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/vegetation/ndvi \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.vegetation.ndvi(farm_id="farm_001")
print(result.ndvi)  # 0.82`;
      } else {
        return `const result = await client.vegetation.ndvi({ farmId: 'farm_001' })
console.log(result.ndvi) // 0.82`;
      }
    case "ndmi":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/water/ndmi \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.water.ndmi(farm_id="farm_001")
print(result.ndmi)  # 0.67`;
      } else {
        return `const result = await client.water.ndmi({ farmId: 'farm_001' })
console.log(result.ndmi) // 0.67`;
      }
    case "ndre":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/vegetation/ndre \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.vegetation.ndre(farm_id="farm_001")
print(result.ndre)  # 0.61`;
      } else {
        return `const result = await client.vegetation.ndre({ farmId: 'farm_001' })
console.log(result.ndre) // 0.61`;
      }
    case "savi":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/vegetation/savi \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.vegetation.savi(farm_id="farm_001")
print(result.savi)  # 0.54`;
      } else {
        return `const result = await client.vegetation.savi({ farmId: 'farm_001' })
console.log(result.savi) // 0.54`;
      }
    case "ndwi":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/water/ndwi \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.water.ndwi(farm_id="farm_001")
print(result.ndwi)  # 0.23`;
      } else {
        return `const result = await client.water.ndwi({ farmId: 'farm_001' })
console.log(result.ndwi) // 0.23`;
      }
    case "ci":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/vegetation/ci \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.vegetation.ci(farm_id="farm_001")
print(result.ci)  # 2.14`;
      } else {
        return `const result = await client.vegetation.ci({ farmId: 'farm_001' })
console.log(result.ci) // 2.14`;
      }
    case "weather":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/weather \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":"farm_001"}'`;
      } else if (lang === "python") {
        return `result = client.weather.get(farm_id="farm_001")
print(result.temperature)  # 29`;
      } else {
        return `const result = await client.weather.get({ farmId: 'farm_001' })
console.log(result.temperature) // 29`;
      }
    case "error-codes":
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/vegetation/ndvi \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -d '{"farm_id":""}'

# Response
# {
#   "code": "INVALID_FARM_ID",
#   "message": "farm_id is missing or malformed",
#   "status": 400
# }`;
      } else if (lang === "python") {
        return `try:
  result = client.vegetation.ndvi(farm_id="")
except X-AGI.InvalidFarmIdError as e:
  print(e.code)    # INVALID_FARM_ID
  print(e.status)  # 400`;
      } else {
        return `try {
  const result = await client.vegetation.ndvi({ farmId: '' })
} catch (e) {
  console.log(e.code)   // INVALID_FARM_ID
  console.log(e.status) // 400
}`;
      }
    default:
      if (lang === "curl") {
        return `curl -X POST https://api.x-agi.dev/v1/intelligence \\
  -H "Authorization: Bearer $KSAT_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"farm_id":"farm_001","indices":["ndvi","ndmi","weather"]}'`;
      } else if (lang === "python") {
        return `import x_agi

client = x_agi.Client(
  api_key="$KSAT_KEY"
)

result = client.intelligence.get(
  farm_id="farm_001",
  indices=["ndvi", "ndmi", "weather"]
)

print(result.ndvi)  # 0.82`;
      } else {
        return `import x_agi from 'X-AGI'

const client = new X-AGI({
  apiKey: process.env.KSAT_KEY
})

const result = await client.intelligence.get({
  farmId: 'farm_001',
  indices: ['ndvi', 'ndmi', 'weather']
})

console.log(result.ndvi) // 0.82`;
      }
  }
}

// JSX syntax highlighted rendering
function renderCode(section: string, lang: string): React.ReactNode {
  switch (section) {
    case "introduction":
    case "authentication":
    case "api-keys":
    case "rate-limits":
    case "response-schema":
    case "support":
      if (lang === "curl") {
        return (
          <span>
            <span className="text-rose-400">curl</span> <span className="text-muted-foreground">-X</span> <span className="text-white">POST</span> <span className="text-cyan-400">https://api.x-agi.dev/v1/intelligence</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Authorization: Bearer $KSAT_KEY&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Content-Type: application/json&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-d</span> <span className="text-emerald-400">{"'{\"farm_id\":\"farm_001\",\"indices\":[\"ndvi\",\"ndmi\",\"weather\"]}'"}</span>
          </span>
        )
      } else if (lang === "python") {
        return (
          <span>
            <span className="text-rose-400">import</span> <span className="text-white">X-AGI</span><br /><br />
            <span className="text-white">client = X-AGI.</span><span className="text-cyan-400">Client</span><span className="text-muted-foreground">(</span><br />
            {"  "}<span className="text-muted-foreground">api_key</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;$KSAT_KEY&quot;</span><br />
            <span className="text-muted-foreground">)</span><br /><br />
            <span className="text-white">result = client.intelligence.</span><span className="text-cyan-400">get</span><span className="text-muted-foreground">(</span><br />
            {"  "}<span className="text-muted-foreground">farm_id</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;farm_001&quot;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">indices</span><span className="text-muted-foreground">=</span><span className="text-muted-foreground">[</span><span className="text-emerald-400">&quot;ndvi&quot;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&quot;ndmi&quot;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&quot;weather&quot;</span><span className="text-muted-foreground">]</span><br />
            <span className="text-muted-foreground">)</span><br /><br />
            <span className="text-cyan-400">print</span><span className="text-muted-foreground">(</span><span className="text-white">result.ndvi</span><span className="text-muted-foreground">)</span>  <span className="text-muted-foreground">{"# 0.82"}</span>
          </span>
        )
      } else {
        return (
          <span>
            <span className="text-rose-400">import</span> <span className="text-white">X-AGI</span> <span className="text-rose-400">from</span> <span className="text-emerald-400">&apos;X-AGI&apos;</span><br /><br />
            <span className="text-rose-400">const</span> <span className="text-white">client =</span> <span className="text-rose-400">new</span> <span className="text-cyan-400">X-AGI</span><span className="text-muted-foreground">({"{"}</span><br />
            {"  "}<span className="text-muted-foreground">apiKey</span><span className="text-muted-foreground">:</span> <span className="text-white">process.env.KSAT_KEY</span><br />
            <span className="text-muted-foreground">{"})"}</span><br /><br />
            <span className="text-rose-400">const</span> <span className="text-white">result =</span> <span className="text-rose-400">await</span> <span className="text-white">client.intelligence.</span><span className="text-cyan-400">get</span><span className="text-muted-foreground">({"{"}</span><br />
            {"  "}<span className="text-muted-foreground">farmId</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&apos;farm_001&apos;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">indices</span><span className="text-muted-foreground">:</span> <span className="text-muted-foreground">[</span><span className="text-emerald-400">&apos;ndvi&apos;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&apos;ndmi&apos;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&apos;weather&apos;</span><span className="text-muted-foreground">]</span><br />
            <span className="text-muted-foreground">{"})"}</span><br /><br />
            <span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-muted-foreground">(</span><span className="text-white">result.ndvi</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"// 0.82"}</span>
          </span>
        )
      }
    case "farm-registration":
      if (lang === "curl") {
        return (
          <span>
            <span className="text-rose-400">curl</span> <span className="text-muted-foreground">-X</span> <span className="text-white">POST</span> <span className="text-cyan-400">https://api.x-agi.dev/v1/farms</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Authorization: Bearer $KSAT_KEY&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Content-Type: application/json&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-d</span> <span className="text-emerald-400">{"'{\"farm_name\":\"Rice Farm\",\"polygon\":{...GeoJSON...}}'"}</span>
          </span>
        )
      } else if (lang === "python") {
        return (
          <span>
            <span className="text-white">farm = client.farms.</span><span className="text-cyan-400">register</span><span className="text-muted-foreground">(</span><br />
            {"  "}<span className="text-muted-foreground">farm_name</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;Rice Farm&quot;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">polygon</span><span className="text-muted-foreground">=</span><span className="text-white">geojson_polygon</span><br />
            <span className="text-muted-foreground">)</span><br />
            <span className="text-cyan-400">print</span><span className="text-muted-foreground">(</span><span className="text-white">farm.farm_id</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"# farm_001"}</span>
          </span>
        )
      } else {
        return (
          <span>
            <span className="text-rose-400">const</span> <span className="text-white">farm =</span> <span className="text-rose-400">await</span> <span className="text-white">client.farms.</span><span className="text-cyan-400">register</span><span className="text-muted-foreground">({"{"}</span><br />
            {"  "}<span className="text-muted-foreground">farmName</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&apos;Rice Farm&apos;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">polygon</span><span className="text-muted-foreground">:</span> <span className="text-white">geojsonPolygon</span><br />
            <span className="text-muted-foreground">{"})"}</span><br />
            <span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-muted-foreground">(</span><span className="text-white">farm.farmId</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"// farm_001"}</span>
          </span>
        )
      }
    case "ndvi":
    case "ndmi":
    case "ndre":
    case "savi":
    case "ndwi":
    case "ci":
    case "weather":
      {
        const path = section === "ndvi" || section === "ndre" || section === "savi" || section === "ci"
          ? `/vegetation/${section}`
          : section === "ndmi" || section === "ndwi"
            ? `/water/${section}`
            : `/${section}`;
        const sdkMethod = section === "weather"
          ? "weather.get"
          : section === "ndmi" || section === "ndwi"
            ? `water.${section}`
            : `vegetation.${section}`;
        const value = section === "ndvi" ? "0.82" : section === "ndmi" ? "0.67" : section === "ndre" ? "0.61" : section === "savi" ? "0.54" : section === "ndwi" ? "0.23" : section === "ci" ? "2.14" : "29";
        const attr = section === "weather" ? "temperature" : section;
        
        if (lang === "curl") {
          return (
            <span>
              <span className="text-rose-400">curl</span> <span className="text-muted-foreground">-X</span> <span className="text-white">POST</span> <span className="text-cyan-400">https://api.x-agi.dev/v1{path}</span> \<br />
              {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Authorization: Bearer $KSAT_KEY&quot;</span> \<br />
              {"  "}<span className="text-muted-foreground">-d</span> <span className="text-emerald-400">{"'{\"farm_id\":\"farm_001\"}'"}</span>
            </span>
          )
        } else if (lang === "python") {
          return (
            <span>
              <span className="text-white">result = client.{sdkMethod}</span><span className="text-muted-foreground">(</span><span className="text-muted-foreground">farm_id</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;farm_001&quot;</span><span className="text-muted-foreground">)</span><br />
              <span className="text-cyan-400">print</span><span className="text-muted-foreground">(</span><span className="text-white">result.{attr}</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"# " + value}</span>
            </span>
          )
        } else {
          return (
            <span>
              <span className="text-rose-400">const</span> <span className="text-white">result =</span> <span className="text-rose-400">await</span> <span className="text-white">client.{sdkMethod}</span><span className="text-muted-foreground">({"{"}</span> <span className="text-muted-foreground">farmId</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&apos;farm_001&apos;</span> <span className="text-muted-foreground">{"})"}</span><br />
              <span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-muted-foreground">(</span><span className="text-white">result.{attr}</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"// " + value}</span>
            </span>
          )
        }
      }
    case "error-codes":
      if (lang === "curl") {
        return (
          <span>
            <span className="text-rose-400">curl</span> <span className="text-muted-foreground">-X</span> <span className="text-white">POST</span> <span className="text-cyan-400">https://api.x-agi.dev/v1/vegetation/ndvi</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Authorization: Bearer $KSAT_KEY&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-d</span> <span className="text-emerald-400">{"'{\"farm_id\":\"\"}'"}</span><br /><br />
            <span className="text-muted-foreground">{"# Response"}</span><br />
            <span className="text-muted-foreground">{"{"}</span><br />
            {"  "}<span className="text-muted-foreground">&quot;code&quot;</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&quot;INVALID_FARM_ID&quot;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">&quot;message&quot;</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&quot;farm_id is missing or malformed&quot;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">&quot;status&quot;</span><span className="text-muted-foreground">:</span> <span className="text-amber-400">400</span><br />
            <span className="text-muted-foreground">{"}"}</span>
          </span>
        )
      } else if (lang === "python") {
        return (
          <span>
            <span className="text-rose-400">try</span><span className="text-muted-foreground">:</span><br />
            {"  "}<span className="text-white">result = client.vegetation.</span><span className="text-cyan-400">ndvi</span><span className="text-muted-foreground">(</span><span className="text-muted-foreground">farm_id</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;&quot;</span><span className="text-muted-foreground">)</span><br />
            <span className="text-rose-400">except</span> <span className="text-white">X-AGI.InvalidFarmIdError</span> <span className="text-rose-400">as</span> <span className="text-white">e</span><span className="text-muted-foreground">:</span><br />
            {"  "}<span className="text-cyan-400">print</span><span className="text-muted-foreground">(</span><span className="text-white">e.code</span><span className="text-muted-foreground">)</span>    <span className="text-muted-foreground">{"# INVALID_FARM_ID"}</span><br />
            {"  "}<span className="text-cyan-400">print</span><span className="text-muted-foreground">(</span><span className="text-white">e.status</span><span className="text-muted-foreground">)</span>  <span className="text-muted-foreground">{"# 400"}</span>
          </span>
        )
      } else {
        return (
          <span>
            <span className="text-rose-400">try</span> <span className="text-muted-foreground">{"{"}</span><br />
            {"  "}<span className="text-rose-400">const</span> <span className="text-white">result =</span> <span className="text-rose-400">await</span> <span className="text-white">client.vegetation.</span><span className="text-cyan-400">ndvi</span><span className="text-muted-foreground">({"{"}</span> <span className="text-muted-foreground">farmId</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&apos;&apos;</span> <span className="text-muted-foreground">{"})"}</span><br />
            <span className="text-muted-foreground">{"}"}</span> <span className="text-rose-400">catch</span> <span className="text-muted-foreground">(</span><span className="text-white">e</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"{"}</span><br />
            {"  "}<span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-muted-foreground">(</span><span className="text-white">e.code</span><span className="text-muted-foreground">)</span>   <span className="text-muted-foreground">{"// INVALID_FARM_ID"}</span><br />
            {"  "}<span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-muted-foreground">(</span><span className="text-white">e.status</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"// 400"}</span>
            <br /><span className="text-muted-foreground">{"}"}</span>
          </span>
        )
      }
    default:
      if (lang === "curl") {
        return (
          <span>
            <span className="text-rose-400">curl</span> <span className="text-muted-foreground">-X</span> <span className="text-white">POST</span> <span className="text-cyan-400">https://api.x-agi.dev/v1/intelligence</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Authorization: Bearer $KSAT_KEY&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-H</span> <span className="text-emerald-400">&quot;Content-Type: application/json&quot;</span> \<br />
            {"  "}<span className="text-muted-foreground">-d</span> <span className="text-emerald-400">{"'{\"farm_id\":\"farm_001\",\"indices\":[\"ndvi\",\"ndmi\",\"weather\"]}'"}</span>
          </span>
        )
      } else if (lang === "python") {
        return (
          <span>
            <span className="text-rose-400">import</span> <span className="text-white">X-AGI</span><br /><br />
            <span className="text-white">client = X-AGI.</span><span className="text-cyan-400">Client</span><span className="text-muted-foreground">(</span><br />
            {"  "}<span className="text-muted-foreground">api_key</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;$KSAT_KEY&quot;</span><br />
            <span className="text-muted-foreground">)</span><br /><br />
            <span className="text-white">result = client.intelligence.</span><span className="text-cyan-400">get</span><span className="text-muted-foreground">(</span><br />
            {"  "}<span className="text-muted-foreground">farm_id</span><span className="text-muted-foreground">=</span><span className="text-emerald-400">&quot;farm_001&quot;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">indices</span><span className="text-muted-foreground">=</span><span className="text-muted-foreground">[</span><span className="text-emerald-400">&quot;ndvi&quot;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&quot;ndmi&quot;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&quot;weather&quot;</span><span className="text-muted-foreground">]</span><br />
            <span className="text-muted-foreground">)</span><br /><br />
            <span className="text-cyan-400">print</span><span className="text-muted-foreground">(</span><span className="text-white">result.ndvi</span><span className="text-muted-foreground">)</span>  <span className="text-muted-foreground">{"# 0.82"}</span>
          </span>
        )
      } else {
        return (
          <span>
            <span className="text-rose-400">import</span> <span className="text-white">X-AGI</span> <span className="text-rose-400">from</span> <span className="text-emerald-400">&apos;X-AGI&apos;</span><br /><br />
            <span className="text-rose-400">const</span> <span className="text-white">client =</span> <span className="text-rose-400">new</span> <span className="text-cyan-400">X-AGI</span><span className="text-muted-foreground">({"{"}</span><br />
            {"  "}<span className="text-muted-foreground">apiKey</span><span className="text-muted-foreground">:</span> <span className="text-white">process.env.KSAT_KEY</span><br />
            <span className="text-muted-foreground">{"})"}</span><br /><br />
            <span className="text-rose-400">const</span> <span className="text-white">result =</span> <span className="text-rose-400">await</span> <span className="text-white">client.intelligence.</span><span className="text-cyan-400">get</span><span className="text-muted-foreground">({"{"}</span><br />
            {"  "}<span className="text-muted-foreground">farmId</span><span className="text-muted-foreground">:</span> <span className="text-emerald-400">&apos;farm_001&apos;</span><span className="text-muted-foreground">,</span><br />
            {"  "}<span className="text-muted-foreground">indices</span><span className="text-muted-foreground">:</span> <span className="text-muted-foreground">[</span><span className="text-emerald-400">&apos;ndvi&apos;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-400">&apos;ndmi&apos;</span><span className="text-muted-foreground">,</span> <span className="text-emerald-455">&apos;weather&apos;</span><span className="text-muted-foreground">]</span><br />
            <span className="text-muted-foreground">{"})"}</span><br /><br />
            <span className="text-white">console.</span><span className="text-cyan-400">log</span><span className="text-muted-foreground">(</span><span className="text-white">result.ndvi</span><span className="text-muted-foreground">)</span> <span className="text-muted-foreground">{"// 0.82"}</span>
          </span>
        )
      }
  }
}

interface RequestField {
  field: string;
  type: string;
  required: string;
  description: string;
}

const ndviRequestFields: RequestField[] = [
  { field: "farm_id", type: "string", required: "Yes", description: "Registered farm ID" },
  { field: "date", type: "string", required: "No", description: "ISO 8601 date. Defaults to most recent available" },
]

const sectionSearchData: Record<string, { title: string; content: string }> = {
  introduction: {
    title: "Introduction",
    content: "X-AGI developer-first rest api crop health water weather farm management telemetry satellite"
  },
  authentication: {
    title: "Authentication",
    content: "security bearer token authorization header ks_live ks_test environment variables secret key"
  },
  "api-keys": {
    title: "API Keys",
    content: "sandbox live environment test live quota credits sandbox pro enterprise limit rate"
  },
  "rate-limits": {
    title: "Rate Limits",
    content: "throttling credits basic registry weather crop health moisture indices ndvi ndwi ndmi ndre savi ci"
  },
  "farm-registration": {
    title: "Farm Registration",
    content: "farms register polygon boundary coordinates geojson stable farm_id registry telemetry"
  },
  ndvi: {
    title: "NDVI — Crop Health",
    content: "vegetation analytics sentinel-2 healthy crops dense green vegetation density and health index"
  },
  ndmi: {
    title: "NDMI — Canopy Moisture",
    content: "water stress canopy moisture saturation drought sentinel-2 vegetation water content index"
  },
  ndre: {
    title: "NDRE — Chlorophyll Vigor",
    content: "early chlorophyll variations nitrogen stress canopy layers Sentinel-2 red edge index"
  },
  savi: {
    title: "SAVI — Sparse Canopy Index",
    content: "soil adjusted vegetation index sparse crops soil brightness vineyards canopy cover correction"
  },
  ndwi: {
    title: "NDWI — Water Logging",
    content: "open water boundaries irrigation flooding pooling risk surface water presence index"
  },
  ci: {
    title: "CI — Chlorophyll Content",
    content: "chlorophyll index leaf nitrogen levels photosynthetic potential fertilization canopy telemetry"
  },
  weather: {
    title: "Weather — Microclimate",
    content: "hyperlocal atmospheric measurements temperature rainfall precipitation humidity wind growing degree days gdd centroid"
  },
  "response-schema": {
    title: "Response Schema",
    content: "standard json envelope structure latency timestamp code message status machine-readable error"
  },
  "error-codes": {
    title: "Error Codes",
    content: "standard http status bad request unauthorized not found insufficient credits invalid polygon rate limit exceeded internal error"
  },
  support: {
    title: "Support",
    content: "technical questions integration help email support dashboard help desk average ticket response sla status"
  }
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [activeTab, setActiveTab] = useState("curl")
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(
      getPlainCode(activeSection, activeTab)
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const matchesSearch = (id: string) => {
    if (!searchQuery) return true
    const term = searchQuery.toLowerCase()
    const data = sectionSearchData[id]
    if (!data) return false
    return data.title.toLowerCase().includes(term) || data.content.toLowerCase().includes(term)
  }

  const activeSectionLabel = navGroups.flatMap(g => g.items).find(i => i.id === (activeSection === "errors" ? "error-codes" : activeSection))?.label || "Menu"

  useActiveSection(setActiveSection)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.querySelector<HTMLInputElement>("input[type='text']")?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const totalFilteredCount = Object.keys(sectionSearchData).filter(matchesSearch).length

  return (
    <div className="flex min-h-screen bg-background max-w-[1540px] mx-auto w-full">
      <span className="hidden" aria-hidden="true"><ChevronRight /></span>
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] shrink-0 bg-background border-r border-border sticky top-[72px] md:top-[88px] h-[calc(100vh-72px)] md:h-[calc(100vh-88px)] overflow-y-auto hidden md:flex flex-col z-20 select-none">
        <div className="px-5 pt-6 pb-6 flex-grow flex flex-col">
          {/* Sticky search input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-background border border-border text-foreground placeholder-slate-400 rounded-lg pl-9 pr-12 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all custom-shadow"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground bg-muted border border-border rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          <nav className="space-y-6">
            {navGroups.map((group) => {
              const visibleItems = group.items.filter(item => matchesSearch(item.id))
              if (visibleItems.length === 0) return null;
              return (
                <div key={group.label}>
                  <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2 block font-sans">
                    {group.label.toUpperCase()}
                  </span>
                  <ul className="space-y-1">
                    {visibleItems.map((item) => {
                      const anchorId = item.id === "error-codes" ? "errors" : item.id;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${anchorId}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveSection(anchorId);
                              document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors block",
                              activeSection === anchorId
                                ? "bg-accent/5 text-accent font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-subtle"
                            )}
                          >
                            {item.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
            })}

            {/* Developer Resources category replacing Need API Key? */}
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2 block font-sans">
                DEVELOPER RESOURCES
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/developers/quickstart"
                    className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle"
                  >
                    Quickstart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/developers/reference"
                    className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle"
                  >
                    Reference
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveSection("support");
                      document.getElementById("support")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-subtle text-left focus:outline-none"
                  >
                    Support
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* CENTER CONTENT */}
      <main className="flex-1 bg-background overflow-y-auto min-w-0 flex flex-col">
        {/* Mobile TOC Top Panel */}
        <div className="lg:hidden sticky top-[72px] left-0 right-0 bg-background/95 backdrop-blur border-b border-border/80 z-30 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-705 hover:text-foreground transition-colors bg-subtle border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent custom-shadow"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span>Active: {activeSectionLabel}</span>
            <svg className={cn("w-3.5 h-3.5 transition-transform duration-200 text-muted-foreground", mobileMenuOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-wider">
            Documentation
          </span>
        </div>

        {/* Mobile TOC Dropdown Options */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-[125px] bg-background border-b border-border shadow-lg max-h-[320px] overflow-y-auto z-40 p-3 space-y-1">
            {navGroups.map(group => {
              const items = group.items.filter(i => matchesSearch(i.id))
              if (items.length === 0) return null
              return (
                <div key={group.label} className="py-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 block mb-1">
                    {group.label}
                  </span>
                  {items.map(item => {
                    const anchorId = item.id === "error-codes" ? "errors" : item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${anchorId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(anchorId);
                          setMobileMenuOpen(false);
                          document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors block",
                          activeSection === anchorId
                            ? "bg-accent/5 text-accent font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )
            })}
          </div>
        )}

        {/* Main Content Area Container */}
        <div className="max-w-[900px] w-full mx-auto px-6 md:px-12 py-12">
          {totalFilteredCount === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <div className="p-4 bg-subtle border border-border rounded-full inline-block mb-4">
                <AlertTriangle className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground">No results found</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                We couldn&apos;t find any documentation sections matching &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 bg-accent hover:bg-[#114524] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors custom-shadow"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {/* Hero Block */}
              <div className={cn("mb-12", !matchesSearch("introduction") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Documentation
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                  Build with X-AGI
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  Programmatic access to crop health indices, water stress measurements,
                  and hyperlocal weather data for registered farm polygons.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href="/developers/quickstart"
                    className="bg-accent hover:bg-[#114524] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all custom-shadow inline-flex items-center gap-1.5"
                  >
                    Quickstart <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/register"
                    className="border border-border hover:border-accent text-slate-850 hover:text-accent px-6 py-3 rounded-lg text-sm font-semibold transition-all bg-transparent custom-shadow hover:bg-subtle"
                  >
                    Get API Key
                  </Link>
                </div>
              </div>

              {/* SECTION 1 — introduction */}
              <section id="introduction" className={cn("py-12", !matchesSearch("introduction") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Getting Started
                </span>
                <h2 id="introduction" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Introduction
                </h2>
                <div className="space-y-4 mb-4">
                  <p className="text-muted-foreground text-base leading-[1.8] max-w-4xl">
                    X-AGI is a REST API platform that provides satellite-derived agricultural intelligence. Register your farm polygons once and receive structured JSON telemetry from 8 dedicated endpoints covering crop health, water stress, and hyperlocal weather.
                  </p>
                  <p className="text-muted-foreground text-base leading-[1.8] max-w-4xl">
                    All APIs run on the base URL:
                  </p>
                </div>
                <div className="mb-6">
                  <code className="font-mono text-sm bg-accent/5 border border-accent/10 px-3 py-1.5 rounded-lg text-accent font-semibold inline-block select-all">
                    https://api.x-agi.dev
                  </code>
                </div>

                {/* 2x2 Grid of Capability Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Card 1 */}
                  <div className="bg-background border border-border rounded-xl p-6 custom-shadow hover:custom-shadow transition-shadow">
                    <Layers className="w-5 h-5 text-accent mb-3" />
                    <h4 className="text-sm font-bold text-foreground mb-1">Crop Health</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      NDVI, NDRE, SAVI, and CI indices from multi-spectral satellite imagery.
                    </p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-background border border-border rounded-xl p-6 custom-shadow hover:custom-shadow transition-shadow">
                    <Zap className="w-5 h-5 text-accent mb-3" />
                    <h4 className="text-sm font-bold text-foreground mb-1">Water Intelligence</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      NDMI and NDWI indices for moisture and water presence detection.
                    </p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-background border border-border rounded-xl p-6 custom-shadow hover:custom-shadow transition-shadow">
                    <Shield className="w-5 h-5 text-accent mb-3" />
                    <h4 className="text-sm font-bold text-foreground mb-1">Weather Intelligence</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Hyperlocal temperature, rainfall, humidity, wind, and growing degree days.
                    </p>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-background border border-border rounded-xl p-6 custom-shadow hover:custom-shadow transition-shadow">
                    <BookOpen className="w-5 h-5 text-accent mb-3" />
                    <h4 className="text-sm font-bold text-foreground mb-1">Farm Management</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Register and manage farm polygons with stable farm_id references.
                    </p>
                  </div>
                </div>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("introduction", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 2 — authentication */}
              <section id="authentication" className={cn("py-12 border-t border-border", !matchesSearch("authentication") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Getting Started
                </span>
                <h2 id="authentication" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Authentication
                </h2>
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  All requests require a Bearer token passed in the Authorization header. There are no cookies or session-based authentication methods.
                </p>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 mb-6 select-all">
                  <span className="text-muted-foreground">Authorization: </span>Bearer ks_live_xxxxxxxxxxxx
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-4 max-w-4xl">
                  X-AGI credentials contain specific prefixes to prevent key swap errors:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground text-sm">
                  <li>
                    Production key format: <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">ks_live_xxxxxxxxxxxx</code>
                  </li>
                  <li>
                    Sandbox key format: <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">ks_sandbox_xxxxxxxxxxxx</code>
                  </li>
                </ul>

                <div className="flex gap-3 p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-805 leading-relaxed">
                    Never commit your API key to version control. Use environment variables: <code className="font-mono bg-amber-100/85 px-1.5 py-0.5 rounded text-amber-900 font-semibold text-xs">KSAT_API_KEY</code>
                  </p>
                </div>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("authentication", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 3 — api-keys */}
              <section id="api-keys" className={cn("py-12 border-t border-border", !matchesSearch("api-keys") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Getting Started
                </span>
                <h2 id="api-keys" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  API Keys
                </h2>
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  API keys are scoped per environment. Each key belongs to either the Sandbox or Production environment and cannot be used interchangeably.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {/* Card 1 */}
                  <div className="flex-1 bg-background border border-border rounded-xl p-6 custom-shadow">
                    <h4 className="text-sm font-bold text-foreground mb-1 font-mono uppercase tracking-wide">Sandbox</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Free tier. 5 farms maximum. 1,000 API calls per month. Rate limited to 60 requests per minute.
                    </p>
                    <div className="text-[10px] font-mono font-semibold text-accent bg-accent/5 border border-accent/10 px-1.5 py-0.5 rounded inline-block">
                      ks_sandbox_
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="flex-1 bg-background border border-border rounded-xl p-6 custom-shadow">
                    <h4 className="text-sm font-bold text-foreground mb-1 font-mono uppercase tracking-wide">Production</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Pay-as-you-go model ($0.004 per call after free tier). Unlimited farms. 100,000 calls per day. Rate limited to 600 requests per minute.
                    </p>
                    <div className="text-[10px] font-mono font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-1.5 py-0.5 rounded inline-block">
                      ks_live_
                    </div>
                  </div>
                </div>

                <Link href="/register" className="text-accent hover:text-[#114524] text-sm font-semibold inline-flex items-center gap-1.5 transition-colors">
                  Get your API key <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-355">
                    <pre><code>{renderCode("api-keys", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 4 — rate-limits */}
              <section id="rate-limits" className={cn("py-12 border-t border-border", !matchesSearch("rate-limits") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Getting Started
                </span>
                <h2 id="rate-limits" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Rate Limits
                </h2>
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  Every API response includes rate limit headers you can use to manage request pacing:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground text-sm">
                  <li>
                    <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">X-RateLimit-Limit</code> — maximum requests allowed in the window.
                  </li>
                  <li>
                    <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">X-RateLimit-Remaining</code> — requests remaining in the current window.
                  </li>
                  <li>
                    <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">Retry-After</code> — seconds to wait before retrying (only on 429 responses).
                  </li>
                </ul>

                <div className="overflow-x-auto mb-4 border border-border rounded-lg">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Tier</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Per Minute</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Per Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-medium text-foreground">Sandbox</td>
                        <td className="py-3 px-4 text-muted-foreground">60</td>
                        <td className="py-3 px-4 text-muted-foreground">1,000</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-medium text-foreground">Pro</td>
                        <td className="py-3 px-4 text-muted-foreground">600</td>
                        <td className="py-3 px-4 text-muted-foreground">100,000</td>
                      </tr>
                      <tr className="">
                        <td className="py-3 px-4 font-medium text-foreground">Enterprise</td>
                        <td className="py-3 px-4 text-muted-foreground">Custom</td>
                        <td className="py-3 px-4 text-muted-foreground">Custom</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-xs text-muted-foreground italic">
                  Note: Exceeding limits returns HTTP 429 with a Retry-After header.
                </p>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("rate-limits", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 5 — farm-registration */}
              <section id="farm-registration" className={cn("py-12 border-t border-border", !matchesSearch("farm-registration") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="farm-registration" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Farm Registration
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/farms
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      1 credit
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Register a farm polygon boundary once to retrieve a unique, stable farm_id reference.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  Register a farm polygon to receive a stable farm_id. This ID is used in all subsequent API calls. You only need to register a farm once.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">farm_name</td>
                        <td className="py-3 px-4 text-muted-foreground">string</td>
                        <td className="py-3 px-4 text-accent font-semibold">Yes</td>
                        <td className="py-3 px-4 text-muted-foreground">Human-readable name for the farm</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">polygon</td>
                        <td className="py-3 px-4 text-muted-foreground">GeoJSON</td>
                        <td className="py-3 px-4 text-accent font-semibold">Yes</td>
                        <td className="py-3 px-4 text-muted-foreground">Polygon boundary of the farm area</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-foreground text-xs">metadata</td>
                        <td className="py-3 px-4 text-muted-foreground">object</td>
                        <td className="py-3 px-4 text-muted-foreground">No</td>
                        <td className="py-3 px-4 text-muted-foreground">Optional key-value metadata</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "status": "registered",
  "created_at": "2026-06-11T10:00:00Z"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("farm-registration", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 6 — ndvi */}
              <section id="ndvi" className={cn("py-12 border-t border-border", !matchesSearch("ndvi") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="ndvi" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  NDVI — Vegetation Index
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/vegetation/ndvi
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      2 credits
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Returns NDVI crop vegetation density and health analytics for a registered farm centroid.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  NDVI measures the density and health of vegetation using near-infrared and red light reflectance. Values range from -1 to +1. Healthy vegetation typically returns values above 0.6.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">farm_id</td>
                        <td className="py-3 px-4 text-muted-foreground">string</td>
                        <td className="py-3 px-4 text-accent font-semibold">Yes</td>
                        <td className="py-3 px-4 text-muted-foreground">Registered farm ID</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-foreground text-xs">date</td>
                        <td className="py-3 px-4 text-muted-foreground">string</td>
                        <td className="py-3 px-4 text-muted-foreground">No</td>
                        <td className="py-3 px-4 text-muted-foreground">ISO 8601 date. Defaults to most recent available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "ndvi": 0.82,
  "health": "Healthy",
  "date": "2026-06-11"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("ndvi", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 7 — ndmi */}
              <section id="ndmi" className={cn("py-12 border-t border-border", !matchesSearch("ndmi") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="ndmi" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  NDMI — Water Stress
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/water/ndmi
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      2 credits
                    </span>
                  </div>
                  <p className="text-xs text-slate-550 mt-1.5 leading-relaxed">
                    Returns NDMI canopy water stress and vegetation moisture content metrics.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  NDMI measures vegetation water content using near-infrared and short-wave infrared bands. Higher values indicate greater moisture content. Values above 0.4 indicate well-watered crops.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndviRequestFields.map((field) => (
                        <tr key={field.field} className="border-b border-border last:border-b-0">
                          <td className="py-3 px-4 font-mono text-foreground text-xs">{field.field}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.type}</td>
                          <td className={cn("py-3 px-4", field.required === "Yes" ? "text-accent font-semibold" : "text-muted-foreground")}>{field.required}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "ndmi": 0.67,
  "moisture_status": "Adequate",
  "date": "2026-06-11"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("ndmi", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 8 — ndre */}
              <section id="ndre" className={cn("py-12 border-t border-border", !matchesSearch("ndre") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="ndre" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  NDRE — Red Edge Index
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/vegetation/ndre
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      2 credits
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Returns NDRE Red Edge metrics for vegetation canopy chlorophyll vigor analysis.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  NDRE uses the red-edge spectral band to measure chlorophyll content in crop canopies. It is more sensitive than NDVI for detecting early stress and nitrogen deficiency.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndviRequestFields.map((field) => (
                        <tr key={field.field} className="border-b border-border last:border-b-0">
                          <td className="py-3 px-4 font-mono text-foreground text-xs">{field.field}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.type}</td>
                          <td className={cn("py-3 px-4", field.required === "Yes" ? "text-accent font-semibold" : "text-muted-foreground")}>{field.required}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "ndre": 0.61,
  "chlorophyll_status": "Normal",
  "date": "2026-06-11"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("ndre", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 9 — savi */}
              <section id="savi" className={cn("py-12 border-t border-border", !matchesSearch("savi") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="savi" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  SAVI — Soil Adjusted Vegetation Index
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/vegetation/savi
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      2 credits
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Returns SAVI Soil Adjusted Vegetation Index to correct background soil reflection noise.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  SAVI corrects NDVI for the influence of soil brightness on vegetation signal. It is particularly useful for fields with sparse canopy cover or bare soil patches.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndviRequestFields.map((field) => (
                        <tr key={field.field} className="border-b border-border last:border-b-0">
                          <td className="py-3 px-4 font-mono text-foreground text-xs">{field.field}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.type}</td>
                          <td className={cn("py-3 px-4", field.required === "Yes" ? "text-accent font-semibold" : "text-muted-foreground")}>{field.required}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "savi": 0.54,
  "canopy_density": "Moderate",
  "date": "2026-06-11"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("savi", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 10 — ndwi */}
              <section id="ndwi" className={cn("py-12 border-t border-border", !matchesSearch("ndwi") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="ndwi" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  NDWI — Normalized Difference Water Index
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/water/ndwi
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      2 credits
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Returns NDWI analytics for flood boundaries mapping and water presence identification.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  NDWI detects open water surfaces and waterlogged areas using green and near-infrared bands. Positive values suggest water presence. Useful for monitoring irrigation canals and flooded fields.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndviRequestFields.map((field) => (
                        <tr key={field.field} className="border-b border-border last:border-b-0">
                          <td className="py-3 px-4 font-mono text-foreground text-xs">{field.field}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.type}</td>
                          <td className={cn("py-3 px-4", field.required === "Yes" ? "text-accent font-semibold" : "text-muted-foreground")}>{field.required}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "ndwi": 0.23,
  "water_presence": "Detected",
  "date": "2026-06-11"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("ndwi", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 11 — ci */}
              <section id="ci" className={cn("py-12 border-t border-border", !matchesSearch("ci") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="ci" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  CI — Chlorophyll Index
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/vegetation/ci
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      3 credits
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Returns Chlorophyll Index for canopy nitrogen measurement.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  The Chlorophyll Index provides a direct estimate of canopy chlorophyll content and is strongly correlated with plant nitrogen status. Higher values indicate greater nitrogen sufficiency.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndviRequestFields.map((field) => (
                        <tr key={field.field} className="border-b border-border last:border-b-0">
                          <td className="py-3 px-4 font-mono text-foreground text-xs">{field.field}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.type}</td>
                          <td className={cn("py-3 px-4", field.required === "Yes" ? "text-accent font-semibold" : "text-muted-foreground")}>{field.required}</td>
                          <td className="py-3 px-4 text-muted-foreground">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "ci": 2.14,
  "nitrogen_indicator": "Sufficient",
  "date": "2026-06-11"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("ci", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 12 — weather */}
              <section id="weather" className={cn("py-12 border-t border-border", !matchesSearch("weather") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Core APIs
                </span>
                <h2 id="weather" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Weather Intelligence
                </h2>
                
                {/* Redesigned endpoint card */}
                <div className="bg-card border border-border/85 rounded-xl p-4 flex flex-col gap-1 mb-6 font-sans custom-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      POST
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
                      /v1/weather
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-md ml-auto select-none">
                      1 credit
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Returns hyperlocal temperature, rainfall, precipitation probability, humidity, and GDD parameters.
                  </p>
                </div>

                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  Returns hyperlocal weather data for the registered farm location. Data is sourced from a combination of satellite-derived estimates and ground-station interpolation.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Required</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 font-mono text-foreground text-xs">farm_id</td>
                        <td className="py-3 px-4 text-muted-foreground">string</td>
                        <td className="py-3 px-4 text-accent font-semibold">Yes</td>
                        <td className="py-3 px-4 text-muted-foreground">Registered farm ID</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs font-semibold text-muted-foreground mb-2.5">Response Payload</p>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "temperature": 29,
  "rainfall": 12,
  "humidity": 74,
  "wind_speed": 14,
  "growing_degree_days": 8.4,
  "updated_at": "2026-06-11T10:00:00Z"
}`}</code>
                </pre>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("weather", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 13 — response-schema */}
              <section id="response-schema" className={cn("py-12 border-t border-border", !matchesSearch("response-schema") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Reference
                </span>
                <h2 id="response-schema" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Response Schema
                </h2>
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  Every API response follows this envelope structure:
                </p>

                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300 mt-4 select-all">
                  <code>{`{
  "farm_id": "farm_001",
  "status": "success",
  "latency": "420ms",
  "data": { ... endpoint-specific payload ... },
  "timestamp": "2026-06-11T10:00:00Z"
}`}</code>
                </pre>

                <p className="text-muted-foreground leading-relaxed mt-6 mb-4 font-sans">
                  All error responses use this envelope:
                </p>
                
                <pre className="bg-[#111827] rounded-lg p-4 border border-slate-800 overflow-x-auto font-mono text-xs text-emerald-400 mb-6 select-all">
                  <code>{`{
  "code": "UNAUTHORIZED",
  "message": "Missing or invalid Authorization header",
  "status": 401
}`}</code>
                </pre>

                <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
                  <li>
                    <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">code</code> — machine-readable error identifier.
                  </li>
                  <li>
                    <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">message</code> — human-readable description.
                  </li>
                  <li>
                    <code className="font-mono text-xs bg-subtle border border-border px-1.5 py-0.5 rounded text-accent font-semibold">status</code> — mirrors the HTTP status code.
                  </li>
                </ul>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("response-schema", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 14 — error-codes */}
              <section id="error-codes" className={cn("py-12 border-t border-border", !matchesSearch("error-codes") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Reference
                </span>
                <h2 id="errors" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Error Codes
                </h2>
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  X-AGI uses standard HTTP status codes. All errors return the same JSON envelope shape.
                </p>

                <div className="overflow-x-auto mb-6 border border-border rounded-xl custom-shadow bg-background">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Status Code</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Error Code</th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">400</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">INVALID_FARM_ID</td>
                        <td className="py-3 px-4 text-muted-foreground">farm_id is missing or malformed</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">401</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">UNAUTHORIZED</td>
                        <td className="py-3 px-4 text-muted-foreground">Missing or invalid Authorization header</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">402</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">INSUFFICIENT_CREDITS</td>
                        <td className="py-3 px-4 text-muted-foreground">Account has insufficient credits</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">404</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">FARM_NOT_FOUND</td>
                        <td className="py-3 px-4 text-muted-foreground">No farm found with the given farm_id</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">422</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">INVALID_POLYGON</td>
                        <td className="py-3 px-4 text-muted-foreground">GeoJSON polygon is invalid or not closed</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">429</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">RATE_LIMIT_EXCEEDED</td>
                        <td className="py-3 px-4 text-muted-foreground">Too many requests — check the Retry-After header</td>
                      </tr>
                      <tr className="">
                        <td className="py-3 px-4 font-mono text-foreground text-xs">500</td>
                        <td className="py-3 px-4 font-mono text-rose-600 text-xs font-medium">INTERNAL_ERROR</td>
                        <td className="py-3 px-4 text-muted-foreground">Internal server error — retry with exponential backoff</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Note: All 4xx errors are deterministic. Retry logic should only be applied to 429 and 500 responses.
                </p>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-350">
                    <pre><code>{renderCode("error-codes", "curl")}</code></pre>
                  </div>
                </div>
              </section>

              {/* SECTION 15 — support */}
              <section id="support" className={cn("py-12 border-t border-border", !matchesSearch("support") && "hidden")}>
                <span className="text-xs font-semibold text-[#22C55E] mb-2 block uppercase tracking-wider">
                  Reference
                </span>
                <h2 id="support" className="text-3xl font-bold text-foreground mb-4 font-sans">
                  Support
                </h2>
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-4xl">
                  For technical questions, integration help, or enterprise inquiries, reach the X Boson AI team through the channels below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Card 1 */}
                  <div className="bg-background border border-border rounded-xl p-5 custom-shadow flex flex-col justify-between">
                    <div>
                      <MessageSquare className="w-4 h-4 text-accent mb-3" />
                      <h4 className="text-sm font-bold text-foreground mb-1">Documentation Feedback</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        Found an error or missing information in the docs? Open an issue on GitHub.
                      </p>
                    </div>
                    <a
                      href="https://github.com/sanjith-e-u/X-AGI-api-frontend/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-accent hover:text-[#114524] inline-flex items-center gap-1 transition-colors select-none"
                    >
                      Open an issue →
                    </a>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-background border border-border rounded-xl p-5 custom-shadow flex flex-col justify-between">
                    <div>
                      <Mail className="w-4 h-4 text-accent mb-3" />
                      <h4 className="text-sm font-bold text-foreground mb-1">Enterprise & Billing</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        For enterprise contracts, VPC deployments, or billing questions, email the team directly.
                      </p>
                    </div>
                    <a href="mailto:contact@xbosonai.com" className="text-xs font-semibold text-accent hover:text-[#114524] inline-flex items-center gap-1 transition-colors select-all">
                      contact@xbosonai.com
                    </a>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <span className="text-xs font-semibold text-muted-foreground">Docs</span>
                  <span className="text-muted-foreground text-xs">|</span>
                  <Link href="/pricing" className="text-xs font-semibold text-accent hover:text-[#114524] transition-colors">
                    View pricing →
                  </Link>
                </div>

                {/* Mobile Inline Code Example */}
                <div className="mt-8 block xl:hidden text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2 block">
                    cURL Example
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-355">
                    <pre><code>{renderCode("support", "curl")}</code></pre>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* RIGHT CODE PANEL */}
      <aside className="w-[380px] shrink-0 bg-[#111827] border-l border-slate-800 sticky top-[72px] md:top-[88px] h-[calc(100vh-72px)] md:h-[calc(100vh-88px)] overflow-y-auto hidden xl:flex flex-col z-10 select-none">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-800 shrink-0">
          <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            Example Request
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-slate-200 transition-colors focus:outline-none"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-[#22C55E] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Language Tab Bar */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/50 shrink-0">
          <div className="flex bg-slate-900 p-1 rounded-lg gap-1">
            {["curl", "python", "node"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all focus:outline-none",
                  activeTab === tab
                    ? "bg-accent text-white custom-shadow font-semibold"
                    : "text-muted-foreground hover:text-slate-200"
                )}
              >
                {tab === "curl" ? "cURL" : tab === "python" ? "Python" : "Node.js"}
              </button>
            ))}
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-y-auto">
          <pre className="bg-slate-950/40 p-6 text-[11px] font-mono leading-relaxed overflow-x-auto min-h-full text-left text-slate-300 border-none">
            <code>{renderCode(activeSection, activeTab)}</code>
          </pre>
        </div>
      </aside>
    </div>
  )
}
