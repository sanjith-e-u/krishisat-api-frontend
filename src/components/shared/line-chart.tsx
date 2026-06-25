"use client"

import React, { useState } from "react"

interface ChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartProps {
  data: ChartDataPoint[];
  color?: string;                  // e.g. "#22C55E" or "#14532D"
  height?: number;                 // default 220
  tooltipFormatter?: (value: number) => string;
}

export default function LineChart({
  data,
  color = "#22C55E",
  height = 220,
  tooltipFormatter = (v) => v.toLocaleString()
}: LineChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null)

  // Unique ID for SVG gradients to prevent collisions
  const gradId = React.useId().replace(/:/g, "")

  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-xs text-muted-foreground">
        No chart data available.
      </div>
    )
  }

  const width = 800
  const paddingX = 40
  const paddingY = 30

  const values = data.map((d) => d.value)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  
  // Grid bounds configuration
  const yMax = maxValue === minValue ? maxValue + 10 : maxValue * 1.05
  const yMin = maxValue === minValue ? Math.max(0, minValue - 10) : Math.max(0, minValue - (yMax - minValue) * 0.05)

  const getX = (index: number) => {
    const totalPoints = data.length - 1
    return paddingX + (index / (totalPoints || 1)) * (width - 2 * paddingX)
  }

  const getY = (val: number) => {
    const range = yMax - yMin
    return height - paddingY - ((val - yMin) / (range || 1)) * (height - 2 * paddingY)
  }

  // Generate SVG path points
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ")
  const areaPoints = `${getX(0)},${height - paddingY} ${points} ${getX(data.length - 1)},${height - paddingY}`

  // Grid lines
  const gridCount = 4
  const gridLines = Array.from({ length: gridCount }).map((_, i) => {
    const val = yMin + (yMax - yMin) * (i / (gridCount - 1))
    return val
  })



  return (
    <div className="relative w-full overflow-hidden pt-4 select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={`gradient-${gradId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {gridLines.map((val, idx) => (
          <line
            key={idx}
            x1={paddingX}
            y1={getY(val)}
            x2={width - paddingX}
            y2={getY(val)}
            stroke="#F1F5F9"
            strokeWidth="1.5"
            strokeDasharray={idx === 0 ? "none" : "4 4"}
          />
        ))}

        {/* Area fill */}
        <polygon points={areaPoints} fill={`url(#gradient-${gradId})`} />

        {/* Stroke Line */}
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" />

        {/* Data points circles */}
        {data.map((d, i) => {
          const cx = getX(i)
          const cy = getY(d.value)
          const isCurrent = hoveredIdx === i

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={isCurrent ? 6 : 4}
              fill="#FFFFFF"
              stroke={color}
              strokeWidth="2.5"
              className="transition-all duration-150 cursor-pointer focus:outline-none focus:stroke-slate-900"
              role="button"
              tabIndex={0}
              aria-label={`${d.label}: ${tooltipFormatter(d.value)}`}
              onMouseEnter={() => {
                setHoveredIdx(i)
                setHoveredPoint({ x: cx, y: cy, label: d.label, value: d.value })
              }}
              onMouseLeave={() => {
                setHoveredIdx(null)
                setHoveredPoint(null)
              }}
              onFocus={() => {
                setHoveredIdx(i)
                setHoveredPoint({ x: cx, y: cy, label: d.label, value: d.value })
              }}
              onBlur={() => {
                setHoveredIdx(null)
                setHoveredPoint(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setHoveredIdx(i)
                  setHoveredPoint({ x: cx, y: cy, label: d.label, value: d.value })
                }
              }}
            />
          )
        })}

        {/* X-Axis Labels */}
        {data.filter((_, idx) => data.length <= 12 || idx % Math.ceil(data.length / 10) === 0).map((d, i) => {
          const originalIndex = data.indexOf(d)
          return (
            <text
              key={i}
              x={getX(originalIndex)}
              y={height - 8}
              textAnchor="middle"
              fill="#94A3B8"
              className="text-[9px] font-mono font-bold"
            >
              {d.label}
            </text>
          )
        })}
      </svg>

      {/* Tooltip Overlay */}
      {hoveredPoint && (
        <div
          className="absolute bg-slate-900 text-white rounded-lg p-2 custom-shadow text-[10px] z-20 flex flex-col gap-0.5 border border-slate-800 pointer-events-none"
          style={{
            left: `${(hoveredPoint.x / width) * 100}%`,
            top: `${(hoveredPoint.y / height) * 100 - 30}%`,
            transform: "translate(-50%, -100%)"
          }}
        >
          <span className="text-muted-foreground font-mono text-[8px] font-bold uppercase">{hoveredPoint.label}</span>
          <span className="font-bold text-[#22C55E]">{tooltipFormatter(hoveredPoint.value)}</span>
        </div>
      )}
    </div>
  )
}
