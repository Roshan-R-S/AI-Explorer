"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, Activity, RefreshCw, TrendingUp } from "lucide-react"

// Sample data with proper structure
const revenueData = [
  { month: "Jan", revenue: 4000, users: 240, conversion: 2.4 },
  { month: "Feb", revenue: 3000, users: 198, conversion: 2.1 },
  { month: "Mar", revenue: 5000, users: 320, conversion: 2.8 },
  { month: "Apr", revenue: 4500, users: 290, conversion: 2.6 },
  { month: "May", revenue: 6000, users: 380, conversion: 3.1 },
  { month: "Jun", revenue: 5500, users: 350, conversion: 2.9 },
  { month: "Jul", revenue: 7000, users: 420, conversion: 3.4 },
  { month: "Aug", revenue: 6500, users: 400, conversion: 3.2 },
  { month: "Sep", revenue: 8000, users: 480, conversion: 3.8 },
  { month: "Oct", revenue: 7500, users: 460, conversion: 3.6 },
  { month: "Nov", revenue: 9000, users: 520, conversion: 4.1 },
  { month: "Dec", revenue: 8500, users: 500, conversion: 3.9 },
]

const categoryData = [
  { name: "Sales", value: 35, color: "#10b981" },
  { name: "Marketing", value: 25, color: "#f59e0b" },
  { name: "Support", value: 20, color: "#ef4444" },
  { name: "Development", value: 20, color: "#8b5cf6" },
]

const userActivityData = [
  { time: "00:00", active: 120 },
  { time: "04:00", active: 80 },
  { time: "08:00", active: 300 },
  { time: "12:00", active: 450 },
  { time: "16:00", active: 380 },
  { time: "20:00", active: 280 },
  { time: "23:59", active: 150 },
]

export function InteractiveCharts() {
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [timeRange, setTimeRange] = useState("12m")
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState(revenueData)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Update chart data when metric changes
    const getMetricData = () => {
      switch (selectedMetric) {
        case "revenue":
          return revenueData.map((d) => ({ ...d, value: d.revenue }))
        case "users":
          return revenueData.map((d) => ({ ...d, value: d.users }))
        case "conversion":
          return revenueData.map((d) => ({ ...d, value: d.conversion }))
        default:
          return revenueData.map((d) => ({ ...d, value: d.revenue }))
      }
    }

    setChartData(getMetricData())
  }, [selectedMetric, mounted])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate data refresh with slight variations
      const newData = revenueData.map((item) => ({
        ...item,
        revenue: Math.max(0, item.revenue + (Math.random() - 0.5) * 1000),
        users: Math.max(0, item.users + Math.floor((Math.random() - 0.5) * 50)),
        conversion: Math.max(0, item.conversion + (Math.random() - 0.5) * 0.5),
      }))

      const updatedData = newData.map((d) => ({
        ...d,
        value: selectedMetric === "revenue" ? d.revenue : selectedMetric === "users" ? d.users : d.conversion,
      }))

      setChartData(updatedData)
      setIsLoading(false)
    }, 1000)
  }

  const getMetricColor = () => {
    switch (selectedMetric) {
      case "revenue":
        return "#10b981"
      case "users":
        return "#3b82f6"
      case "conversion":
        return "#f59e0b"
      default:
        return "#10b981"
    }
  }

  const formatValue = (value: number) => {
    switch (selectedMetric) {
      case "revenue":
        return `$${value.toLocaleString()}`
      case "users":
        return value.toFixed(0)
      case "conversion":
        return `${value.toFixed(1)}%`
      default:
        return value.toString()
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              <span className="ml-2 text-gray-400">Loading charts...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Interactive Analytics</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="text-purple-400 hover:text-purple-300"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <CardDescription>Explore your data with interactive visualizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Metric:</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Time Range:</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="12m">12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge className="bg-purple-500/20 text-purple-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>

          {/* Main Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tick={{ fill: "#9ca3af" }} />
                <YAxis stroke="#9ca3af" fontSize={12} tick={{ fill: "#9ca3af" }} tickFormatter={formatValue} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [
                    formatValue(value),
                    selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
                  ]}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={getMetricColor()}
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                  dot={{ fill: getMetricColor(), strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: getMetricColor(), strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {categoryData.map((item) => (
                <Badge
                  key={item.name}
                  variant="secondary"
                  className="flex items-center gap-1 bg-slate-700/50 text-white"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name} ({item.value}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              User Activity (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tick={{ fill: "#9ca3af" }} />
                  <YAxis stroke="#9ca3af" fontSize={12} tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [value, "Active Users"]}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
