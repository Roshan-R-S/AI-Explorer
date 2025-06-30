"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Activity, Users, Globe, Zap, TrendingUp, TrendingDown, Wifi, Server } from "lucide-react"

interface MetricData {
  timestamp: string
  value: number
}

interface RealTimeMetric {
  id: string
  name: string
  value: number
  unit: string
  change: number
  status: "up" | "down" | "stable"
  icon: any
  color: string
  data: MetricData[]
}

// Initialize with some starting data
const generateInitialData = () => {
  const now = new Date()
  return Array.from({ length: 20 }, (_, i) => {
    const timestamp = new Date(now.getTime() - (19 - i) * 10000) // 10 second intervals
    return {
      timestamp: timestamp.toLocaleTimeString(),
      value: Math.random() * 100 + 50, // Random value between 50-150
    }
  })
}

export function RealTimeMetrics() {
  const [mounted, setMounted] = useState(false)
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([
    {
      id: "active-users",
      name: "Active Users",
      value: 1247,
      unit: "",
      change: 12.5,
      status: "up",
      icon: Users,
      color: "#3b82f6",
      data: generateInitialData(),
    },
    {
      id: "requests-per-sec",
      name: "Requests/sec",
      value: 342,
      unit: "/s",
      change: -2.1,
      status: "down",
      icon: Activity,
      color: "#10b981",
      data: generateInitialData(),
    },
    {
      id: "response-time",
      name: "Response Time",
      value: 145,
      unit: "ms",
      change: 5.3,
      status: "up",
      icon: Zap,
      color: "#f59e0b",
      data: generateInitialData(),
    },
    {
      id: "server-load",
      name: "Server Load",
      value: 67,
      unit: "%",
      change: -1.2,
      status: "down",
      icon: Server,
      color: "#ef4444",
      data: generateInitialData(),
    },
  ])

  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          // Generate realistic variations based on metric type
          let variation = 0
          switch (metric.id) {
            case "active-users":
              variation = (Math.random() - 0.5) * 50 // ±25 users
              break
            case "requests-per-sec":
              variation = (Math.random() - 0.5) * 40 // ±20 requests
              break
            case "response-time":
              variation = (Math.random() - 0.5) * 30 // ±15ms
              break
            case "server-load":
              variation = (Math.random() - 0.5) * 10 // ±5%
              break
          }

          const newValue = Math.max(
            0,
            Math.min(metric.value + variation, metric.id === "server-load" ? 100 : Number.POSITIVE_INFINITY),
          )
          const change = ((newValue - metric.value) / metric.value) * 100

          const newDataPoint = {
            timestamp: new Date().toLocaleTimeString(),
            value: newValue,
          }

          return {
            ...metric,
            value: newValue,
            change: change,
            status: change > 1 ? "up" : change < -1 ? "down" : "stable",
            data: [...metric.data.slice(-19), newDataPoint], // Keep last 20 points
          }
        }),
      )
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [mounted])

  // Simulate connection status changes occasionally
  useEffect(() => {
    if (!mounted) return

    const statusInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every 15 seconds
        const statuses: ("connected" | "connecting" | "disconnected")[] = ["connecting", "disconnected"]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        setConnectionStatus(randomStatus)

        // Reset to connected after a short time
        setTimeout(() => setConnectionStatus("connected"), 3000)
      }
    }, 15000)

    return () => clearInterval(statusInterval)
  }, [mounted])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-400"
      case "connecting":
        return "bg-yellow-500/20 text-yellow-400"
      case "disconnected":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="w-4 h-4" />
      case "connecting":
        return <Activity className="w-4 h-4 animate-pulse" />
      case "disconnected":
        return <Globe className="w-4 h-4" />
    }
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return Math.round(value)
    }
    if (unit === "ms") {
      return Math.round(value)
    }
    return Math.round(value).toLocaleString()
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              <span className="ml-2 text-gray-400">Loading real-time metrics...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Real-time Metrics</CardTitle>
            <Badge className={getStatusColor(connectionStatus)}>
              {getStatusIcon()}
              <span className="ml-1 capitalize">{connectionStatus}</span>
            </Badge>
          </div>
          <CardDescription>Live system performance and user activity metrics</CardDescription>
        </CardHeader>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                <div className="flex items-center gap-1 text-xs">
                  {metric.status === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : metric.status === "down" ? (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  ) : (
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  )}
                  <span
                    className={
                      metric.status === "up"
                        ? "text-green-400"
                        : metric.status === "down"
                          ? "text-red-400"
                          : "text-gray-400"
                    }
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <CardTitle className="text-sm text-gray-400">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                {formatValue(metric.value, metric.unit)}
                {metric.unit}
              </div>

              {/* Mini Chart */}
              {metric.data.length > 0 && (
                <div className="h-16 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={metric.color}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Progress bar for percentage metrics */}
              {metric.unit === "%" && <Progress value={Math.min(metric.value, 100)} className="mt-2 h-2" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metrics.slice(0, 2).map((metric) => (
          <Card key={`detailed-${metric.id}`} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                {metric.name} Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="timestamp" stroke="#9ca3af" fontSize={10} tick={{ fill: "#9ca3af" }} />
                    <YAxis stroke="#9ca3af" fontSize={10} tick={{ fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value: number) => [`${formatValue(value, metric.unit)}${metric.unit}`, metric.name]}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metric.color}
                      strokeWidth={2}
                      dot={{ fill: metric.color, strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, stroke: metric.color, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
