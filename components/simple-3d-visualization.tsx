"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CuboidIcon as Cube, BarChart3 } from "lucide-react"

// Simple 2D visualization that looks 3D-ish
const generateDataPoints = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 400 + 50,
    y: Math.random() * 300 + 50,
    size: Math.random() * 20 + 5,
    value: Math.random() * 100,
    category: ["Sales", "Marketing", "Support", "Development"][Math.floor(Math.random() * 4)],
  }))
}

const categoryColors = {
  Sales: "#10b981",
  Marketing: "#f59e0b",
  Support: "#ef4444",
  Development: "#8b5cf6",
}

export function Simple3DVisualization() {
  const [dataPoints, setDataPoints] = useState(() => generateDataPoints(30))
  const [selectedPoint, setSelectedPoint] = useState<any>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !isAnimating) return

    const interval = setInterval(() => {
      setDataPoints((prev) =>
        prev.map((point) => ({
          ...point,
          x: Math.max(50, Math.min(450, point.x + (Math.random() - 0.5) * 10)),
          y: Math.max(50, Math.min(350, point.y + (Math.random() - 0.5) * 10)),
          size: Math.max(5, Math.min(25, point.size + (Math.random() - 0.5) * 2)),
        })),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [mounted, isAnimating])

  const refreshData = () => {
    setDataPoints(generateDataPoints(30))
    setSelectedPoint(null)
  }

  if (!mounted) {
    return (
      <div className="h-[600px] w-full bg-slate-900 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">Loading visualization...</div>
      </div>
    )
  }

  return (
    <div className="h-[600px] w-full bg-slate-900 rounded-lg overflow-hidden relative">
      {/* SVG Visualization */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Data points */}
        {dataPoints.map((point) => (
          <g key={point.id}>
            {/* Shadow for 3D effect */}
            <circle
              cx={point.x + 3}
              cy={point.y + 3}
              r={point.size}
              fill="rgba(0,0,0,0.3)"
              className="cursor-pointer"
            />
            {/* Main point */}
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size}
              fill={categoryColors[point.category as keyof typeof categoryColors]}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              className="cursor-pointer hover:stroke-white transition-all duration-200"
              onClick={() => setSelectedPoint(point)}
              style={{
                filter: selectedPoint?.id === point.id ? "brightness(1.3)" : "brightness(1)",
                transform: selectedPoint?.id === point.id ? "scale(1.1)" : "scale(1)",
                transformOrigin: `${point.x}px ${point.y}px`,
              }}
            />
            {/* Value label */}
            <text
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {point.value.toFixed(0)}
            </text>
          </g>
        ))}

        {/* Selected point info */}
        {selectedPoint && (
          <g>
            <rect
              x={selectedPoint.x + 30}
              y={selectedPoint.y - 20}
              width="120"
              height="40"
              fill="rgba(31, 41, 55, 0.9)"
              stroke="#8b5cf6"
              strokeWidth="1"
              rx="4"
            />
            <text x={selectedPoint.x + 40} y={selectedPoint.y - 5} fill="white" fontSize="12" fontWeight="bold">
              {selectedPoint.category}
            </text>
            <text x={selectedPoint.x + 40} y={selectedPoint.y + 10} fill="#9ca3af" fontSize="10">
              Value: {selectedPoint.value.toFixed(1)}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4">
        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
          <Cube className="w-4 h-4" />
          Categories
        </h4>
        <div className="space-y-1">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm text-gray-300">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" onClick={refreshData} className="text-purple-400 hover:text-purple-300">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-purple-400 hover:text-purple-300"
          >
            {isAnimating ? "Pause" : "Play"}
          </Button>
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>👆 Click points for details</div>
          <div>🎬 {isAnimating ? "Animating" : "Paused"}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-white font-medium">Data Points</span>
        </div>
        <div className="text-lg font-bold text-white">{dataPoints.length}</div>
        <Badge className="bg-green-500/20 text-green-400 text-xs mt-1">Live</Badge>
      </div>
    </div>
  )
}
