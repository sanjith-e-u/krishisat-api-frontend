"use client"

import React from "react"
import { Search } from "lucide-react"

interface ApiItem {
  name: string;
  description: string;
  endpoint: string;
  method: "POST" | "GET";
  credits: number;
  status: "Active" | "Maintenance";
  dataType: string;
}

const apisList: ApiItem[] = [
  {
    name: "NDVI API",
    description: "Normalized Difference Vegetation Index tracking crop health, biomass densities, and spatial crop vigor logs.",
    endpoint: "/v1/vegetation/ndvi",
    method: "POST",
    credits: 2,
    status: "Active",
    dataType: "Raster Overlay / Float"
  },
  {
    name: "NDRE API",
    description: "Red Edge Index detecting early canopy leaf chlorophyll variances and crop nitrogen deficiencies.",
    endpoint: "/v1/vegetation/ndre",
    method: "POST",
    credits: 2,
    status: "Active",
    dataType: "Raster Overlay / Float"
  },
  {
    name: "Weather API",
    description: "Hyperlocal meteorological centroid telemetry providing GDD calculations, wind speeds, and precipitation grids.",
    endpoint: "/v1/weather",
    method: "POST",
    credits: 1,
    status: "Active",
    dataType: "JSON Telemetry"
  },
  {
    name: "Farm Registration API",
    description: "Register GeoJSON field boundaries to index spatial metadata and prepare satellite ingress pipelines.",
    endpoint: "/v1/farms",
    method: "POST",
    credits: 1,
    status: "Active",
    dataType: "JSON Reference"
  },
  {
    name: "NDWI API",
    description: "Normalized Difference Water Index measuring surface water pooling, irrigation logs, and flood boundaries.",
    endpoint: "/v1/water/ndwi",
    method: "POST",
    credits: 2,
    status: "Active",
    dataType: "Raster Overlay / Float"
  },
  {
    name: "NDMI API",
    description: "Normalized Difference Moisture Index monitoring canopy water stress levels and vegetation moisture loss.",
    endpoint: "/v1/water/ndmi",
    method: "POST",
    credits: 2,
    status: "Active",
    dataType: "Raster Overlay / Float"
  }
]

export default function DashboardApis() {
  return (
    <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">API Index Catalog</h1>
            <p className="text-sm text-slate-500 mt-1">Explore and test KrishiSat telemetry API endpoints.</p>
          </div>
          
          {/* Mock filter */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search indexes..."
              className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#14532D]"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apisList.map((api) => (
            <div key={api.name} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
              <div>
                {/* Badge Row */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[9px] font-bold text-white bg-[#14532D] px-2 py-0.5 rounded uppercase tracking-wider select-none">
                    {api.method}
                  </span>
                  <span className="bg-emerald-50 border border-emerald-150 text-[#14532D] text-[10px] font-semibold px-2 py-0.5 rounded-full select-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
                    {api.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{api.name}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{api.description}</p>
              </div>

              {/* Specifications Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Endpoint</span>
                  <code className="font-mono font-semibold text-slate-800">{api.endpoint}</code>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Payload Type</span>
                  <span className="text-slate-600 font-semibold">{api.dataType}</span>
                </div>
                <div className="flex justify-between text-[11px] items-center">
                  <span className="text-slate-400 font-medium">Cost per call</span>
                  <span className="font-bold text-[#14532D] bg-[#14532D]/5 px-2 py-0.5 rounded text-[10px]">
                    {api.credits} {api.credits === 1 ? "credit" : "credits"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

    </div>
  )
}
