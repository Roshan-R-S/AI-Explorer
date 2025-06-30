"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"

interface Insight {
  id: string
  type: "trend" | "anomaly" | "opportunity" | "alert"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  timestamp: string
}

const mockInsights: Insight[] = [
  {
    id: "1",
    type: "trend",
    title: "User Engagement Spike",
    description:
      "AI detected a 45% increase in user engagement over the past 3 days, primarily driven by mobile users.",
    confidence: 92,
    impact: "high",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "opportunity",
    title: "Content Optimization",
    description:
      "Machine learning analysis suggests optimizing content for evening hours could increase conversion by 23%.",
    confidence: 87,
    impact: "medium",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "anomaly",
    title: "Unusual Traffic Pattern",
    description:
      "Detected irregular traffic patterns from European regions. Recommend investigating potential bot activity.",
    confidence: 78,
    impact: "medium",
    timestamp: "6 hours ago",
  },
  {
    id: "4",
    type: "alert",
    title: "Performance Threshold",
    description: "API response times approaching critical threshold. AI recommends scaling infrastructure.",
    confidence: 95,
    impact: "high",
    timestamp: "8 hours ago",
  },
]

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

export function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setInsights(mockInsights)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const refreshInsights = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate new insights
      const shuffled = [...mockInsights].sort(() => Math.random() - 0.5)
      setInsights(shuffled)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-white">AI Insights</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshInsights}
            disabled={isLoading}
            className="text-purple-400 hover:text-purple-300"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <CardDescription>Real-time AI-generated insights from your data</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
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
                  <span className="text-xs text-gray-400">{insight.timestamp}</span>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 h-auto p-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
