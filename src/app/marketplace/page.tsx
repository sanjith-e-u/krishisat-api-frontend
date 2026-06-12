import type { Metadata } from "next"
import Link from "next/link"
import { Sprout, Droplets, Cloud, MapPin, TreePine, Leaf, BarChart2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "API Catalog — KrishiSat",
  description: "Browse the complete KrishiSat agricultural intelligence API catalog. Vegetation indices, water stress, weather telemetry, and farm management.",
}

const categories = [
  {
    id: "vegetation",
    label: "Vegetation & Crops",
    icon: Sprout,
    color: "emerald",
    apis: [
      { name: "NDVI", path: "/v1/vegetation/ndvi", desc: "Crop health biomass and vigor indices", credits: 2, status: "Live", useCase: "Yield forecasting & temporal vigor monitoring" },
      { name: "NDRE", path: "/v1/vegetation/ndre", desc: "Chlorophyll content nitrogen stress estimation", credits: 2, status: "Live", useCase: "Fertilizer optimization & chlorophyll loading maps" },
      { name: "SAVI", path: "/v1/vegetation/savi", desc: "Soil-adjusted vegetation metrics for sparse crops", credits: 2, status: "Live", useCase: "Sparse crop tracking & dryland farming monitoring" },
      { name: "CI (Chlorophyll Index)", path: "/v1/vegetation/ci", desc: "Early-season chlorophyll loading maps", credits: 3, status: "Live", useCase: "Early-growth staging & leaf-nitrogen scans" },
      { name: "EVI", path: "/v1/vegetation/evi", desc: "Enhanced vegetation tracking for dense canopies", credits: 2, status: "Beta", useCase: "Forestry canopy density & dense plantation logging" }
    ]
  },
  {
    id: "water",
    label: "Water & Moisture",
    icon: Droplets,
    color: "sky",
    apis: [
      { name: "NDWI", path: "/v1/water/ndwi", desc: "Surface water and flood boundaries mapping", credits: 2, status: "Live", useCase: "Waterlogging delineation & irrigation reservoir tracking" },
      { name: "NDMI", path: "/v1/water/ndmi", desc: "Canopy moisture and crops water stress profiling", credits: 2, status: "Live", useCase: "Dryland farming stress profiling & water scheduling alerts" },
      { name: "Irrigation Index", path: "/v1/water/irrigation", desc: "Pivot sprinkler irrigation efficiency tracking", credits: 3, status: "Coming Soon", useCase: "Plot pivot spray optimization & canopy loss prevention" }
    ]
  },
  {
    id: "weather",
    label: "Weather & Climate",
    icon: Cloud,
    color: "indigo",
    apis: [
      { name: "Weather Telemetry", path: "/v1/weather", desc: "Hyperlocal GDD, precipitation, and temperature history", credits: 1, status: "Live", useCase: "Growing Degree Days crop staging & local rainfall maps" },
      { name: "Frost Alert", path: "/v1/weather/frost", desc: "Sub-zero temperature probability alerts grids", credits: 2, status: "Beta", useCase: "Early winter crop frost protection warning alerts" },
      { name: "Drought Index", path: "/v1/weather/drought", desc: "SPI-based macro drought severity metrics", credits: 3, status: "Coming Soon", useCase: "Regional weather insurance risk modeling audits" }
    ]
  },
  {
    id: "farms",
    label: "Farm Management",
    icon: MapPin,
    color: "amber",
    apis: [
      { name: "Farm Registration", path: "/v1/farms", desc: "Register and index spatial GeoJSON boundaries", credits: 1, status: "Live", useCase: "Spatial data indexing & multi-spectral boundary mapping" },
      { name: "Field Segmentation", path: "/v1/farms/segments", desc: "Auto-zone field plots into micro-segments", credits: 5, status: "Beta", useCase: "Variable rate fertilization zone layout generation" }
    ]
  },
  {
    id: "forestry",
    label: "Forestry",
    icon: TreePine,
    color: "teal",
    apis: [
      { name: "Canopy Coverage", path: "/v1/forestry/canopy", desc: "Tree canopy density mapping indexes", credits: 3, status: "Coming Soon", useCase: "Wood density estimates & carbon stock verification" },
      { name: "Deforestation Alert", path: "/v1/forestry/deforestation", desc: "Real-time forest loss detections", credits: 4, status: "Coming Soon", useCase: "Illegal logging reports & green-cover audits" }
    ]
  }
]

const statusColors: Record<string, string> = {
  "Live": "bg-emerald-50 text-[#14532D] border border-emerald-100",
  "Beta": "bg-sky-50 text-sky-700 border border-sky-100",
  "Coming Soon": "bg-slate-50 text-slate-500 border border-slate-200"
}

export default function MarketplacePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200 pt-24 pb-16 px-6 text-center">
        <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">API Catalog</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">Agricultural Intelligence API Catalog</h1>
        <p className="text-lg text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
          Explore the complete suite of KrishiSat satellite telemetry and farm management APIs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/developers/quickstart" className="inline-flex items-center gap-2 bg-primary text-white h-10 px-6 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/developers/reference" className="inline-flex items-center gap-2 border border-slate-200 h-10 px-6 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            Full Reference
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-slate-200 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6 justify-center sm:justify-start text-sm text-slate-500">
          {[
            { label: "Live APIs", value: "8" },
            { label: "Beta APIs", value: "3" },
            { label: "Coming Soon", value: "4" },
            { label: "Avg Latency", value: "238ms" },
            { label: "Uptime", value: "99.98%" }
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-800">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-primary/8 rounded-xl flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">{category.label}</h2>
                <span className="text-xs font-semibold text-slate-400">{category.apis.length} APIs available</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.apis.map((api) => (
                  <Link
                    key={api.path}
                    href="/developers/reference"
                    className="group p-5 border border-slate-200 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[api.status]}`}>
                          {api.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          {api.credits} cr (~${(api.credits * 0.005).toFixed(3)}) / call
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-primary transition-colors">{api.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{api.desc}</p>
                      
                      {/* Use Case */}
                      {api.useCase && (
                        <div className="mt-3.5 bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                          <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider">Primary Use Case</span>
                          <span className="text-[11px] text-slate-605 mt-0.5 block font-medium leading-relaxed">{api.useCase}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center">
                      <code className="text-[10px] font-mono text-slate-500">{api.path}</code>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-colors animate-in fade-in" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center">
        <Leaf className="w-8 h-8 text-agri mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold mb-3">Start building agricultural intelligence</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Join 847+ agritech developers using KrishiSat&apos;s satellite APIs to power smart farming applications.
        </p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-agri text-white h-11 px-8 rounded-xl font-bold text-sm hover:bg-agri/90 transition-colors">
          Get your free API key <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  )
}
