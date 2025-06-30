"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, RefreshCw, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react"

interface Insight {
  id: string
  type: "trend" | "anomaly" | "opportunity" | "alert"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  timestamp: string
}

export function RealAIInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateInsights = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Sample data - in real app, this would come from your actual analytics
      const sampleData = {
        userEngagement: 75,
        conversionRate: 3.2,
        trafficSources: { organic: 45, direct: 30, social: 25 },
        timeRange: "last_30_days",
        revenue: 45231.89,
        activeUsers: 2350,
        pageViews: 15420,
        bounceRate: 0.32,
      }

      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: sampleData,
          context: "e-commerce analytics dashboard with focus on user engagement and conversion optimization",
        }),
      })

      const newInsights = await response.json()
      setInsights(Array.isArray(newInsights) ? newInsights : [])
    } catch (error) {
      console.error("Failed to generate insights:", error)
      setError("Failed to generate AI insights. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-generate insights on component mount
  useEffect(() => {
    generateInsights()
  }, [])

  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="w-4 h-4 text-blue-400" />
      case "opportunity":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "anomaly":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
    }
  }

  const getImpactColor = (impact: Insight["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-white">AI Insights</CardTitle>
            <Badge className="bg-green-500/20 text-green-400">
              <Zap className="w-3 h-3 mr-1" />
              Live AI
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateInsights}
            disabled={isLoading}
            className="text-purple-400 hover:text-purple-300"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <CardDescription>Real-time AI-powered insights from your business data</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mr-4"></div>
              <div className="text-gray-400">
                <p className="font-medium">AI is analyzing your data...</p>
                <p className="text-sm">This may take a few seconds</p>
              </div>
            </div>
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-medium text-white">{insight.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getImpactColor(insight.impact)}>{insight.impact}</Badge>
                    <span className="text-xs text-gray-400">{insight.confidence}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{new Date(insight.timestamp).toLocaleString()}</span>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 h-auto p-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No insights available</p>
            <Button onClick={generateInsights} className="bg-purple-600 hover:bg-purple-700">
              Generate AI Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
