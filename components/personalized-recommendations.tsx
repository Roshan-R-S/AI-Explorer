"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react"

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

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Implement Dark Mode Toggle",
    description: "Based on user behavior analysis, 73% of your users prefer dark interfaces during evening hours.",
    category: "feature",
    priority: "high",
    estimatedImpact: "+15% user retention",
    confidence: 89,
    actionUrl: "/settings",
  },
  {
    id: "2",
    title: "Optimize Mobile Loading Speed",
    description:
      "AI detected that mobile users experience 2.3s longer load times. Optimizing images could improve this.",
    category: "optimization",
    priority: "high",
    estimatedImpact: "+22% mobile conversion",
    confidence: 94,
  },
  {
    id: "3",
    title: "Personalized Content Feed",
    description:
      "Machine learning suggests implementing personalized content recommendations based on user interaction patterns.",
    category: "content",
    priority: "medium",
    estimatedImpact: "+18% engagement",
    confidence: 82,
  },
  {
    id: "4",
    title: "Email Campaign Timing",
    description: "Optimal email send time for your audience is Tuesday 2:30 PM, based on historical engagement data.",
    category: "marketing",
    priority: "medium",
    estimatedImpact: "+12% open rate",
    confidence: 76,
  },
]

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

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleFeedback = (id: string, type: "like" | "dislike") => {
    // In a real app, this would send feedback to improve AI recommendations
    console.log(`Feedback for ${id}: ${type}`)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <CardTitle className="text-white">Personalized Recommendations</CardTitle>
        </div>
        <CardDescription>AI-powered suggestions tailored to your business needs</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse p-4 bg-slate-700/30 rounded-lg">
                <div className="h-4 bg-slate-600 rounded mb-2"></div>
                <div className="h-3 bg-slate-600 rounded w-3/4 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-600 rounded w-16"></div>
                  <div className="h-6 bg-slate-600 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}
