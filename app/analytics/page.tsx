"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Globe } from "lucide-react"
import { Simple3DVisualization } from "@/components/simple-3d-visualization"
import { InteractiveCharts } from "@/components/interactive-charts"
import { RealTimeMetrics } from "@/components/real-time-metrics"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("charts")

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Explore your data through interactive visualizations and real-time metrics</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Interactive Charts
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Real-time Metrics
            </TabsTrigger>
            <TabsTrigger value="3d" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Data Visualization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <InteractiveCharts />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <RealTimeMetrics />
          </TabsContent>

          <TabsContent value="3d" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Interactive Data Visualization</CardTitle>
                <CardDescription>Explore your data patterns with animated visualizations</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Simple3DVisualization />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
