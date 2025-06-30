"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ThumbsUp, ThumbsDown, ExternalLink, Zap, RefreshCw } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  category: "content" | "optimization" | "feature" | "marketing"
  priority: "high" | "medium" | "low"
  estimatedImpact: string
  confidence: number
  actionUrl?: string
}

export function AIPoweredRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateRecommendations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Sample user behavior and metrics
      const userBehavior = {
        avgSessionDuration: 245, // seconds
        pagesPerSession: 3.2,
        bounceRate: 0.32,
        topPages: ["/dashboard", "/analytics", "/chat"],
        deviceTypes: { desktop: 65, mobile: 30, tablet: 5 },
        trafficSources: { organic: 45, direct: 30, social: 15, paid: 10 },
      }

      const metrics = {
        conversionRate: 3.2,
        revenue: 45231.89,
        activeUsers: 2350,
        customerSatisfaction: 4.2,
        loadTime: 1.8,
      }

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userBehavior,
          metrics,
          context: "SaaS analytics platform focused on improving user engagement and conversion rates",
        }),
      })

      const newRecommendations = await response.json()
      setRecommendations(Array.isArray(newRecommendations) ? newRecommendations : [])
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
      setError("Failed to generate AI recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    generateRecommendations()
  }, [])

  const handleFeedback = async (id: string, type: "like" | "dislike") => {
    // In a real app, this would send feedback to improve AI recommendations
    console.log(`Feedback for ${id}: ${type}`)
    // You could send this to an analytics service or feedback API
  }

  const getCategoryColor = (category: Recommendation["category"]) => {
    switch (category) {
      case "content":
        return "bg-blue-500/20 text-blue-400"
      case "optimization":
        return "bg-green-500/20 text-green-400"
      case "feature":
        return "bg-purple-500/20 text-purple-400"
      case "marketing":
        return "bg-orange-500/20 text-orange-400"
    }
  }

  const getPriorityColor = (priority: Recommendation["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-white">AI Recommendations</CardTitle>
            <Badge className="bg-green-500/20 text-green-400">
              <Zap className="w-3 h-3 mr-1" />
              Live AI
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateRecommendations}
            disabled={isLoading}
            className="text-purple-400 hover:text-purple-300"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <CardDescription>AI-powered suggestions tailored to your business performance</CardDescription>
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
                <p className="font-medium">AI is generating personalized recommendations...</p>
                <p className="text-sm">Analyzing your data patterns</p>
              </div>
            </div>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-white text-sm">{rec.title}</h4>
                  <div className="flex gap-1">
                    <Badge className={getCategoryColor(rec.category)} variant="secondary">
                      {rec.category}
                    </Badge>
                    <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                      {rec.priority}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{rec.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-400">
                    <span className="text-green-400 font-medium">{rec.estimatedImpact}</span>
                    <span className="ml-2">• {rec.confidence}% confidence</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(rec.id, "like")}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-green-400"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(rec.id, "dislike")}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>

                  {rec.actionUrl && (
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 h-auto p-1">
                      Take Action <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No recommendations available</p>
            <Button onClick={generateRecommendations} className="bg-purple-600 hover:bg-purple-700">
              Generate AI Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
