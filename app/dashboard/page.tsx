"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, DollarSign, Brain, Zap, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { RealAIInsights } from "@/components/real-ai-insights"
import { AIPoweredRecommendations } from "@/components/ai-powered-recommendations"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "-19%",
    trend: "down",
    icon: Activity,
    color: "text-orange-500",
  },
  {
    title: "AI Accuracy",
    value: "98.2%",
    change: "+2.1%",
    trend: "up",
    icon: Brain,
    color: "text-purple-500",
  },
]

const aiTasks = [
  { name: "Data Analysis", progress: 85, status: "processing" },
  { name: "Content Generation", progress: 92, status: "completed" },
  { name: "Predictive Modeling", progress: 67, status: "processing" },
  { name: "Sentiment Analysis", progress: 100, status: "completed" },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-purple-400">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading AI Dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">AI Dashboard</h1>
            <Badge className="bg-green-500/20 text-green-400">
              <Zap className="w-3 h-3 mr-1" />
              Live AI
            </Badge>
          </div>
          <p className="text-gray-400">Welcome back! Here's what's happening with your AI-powered insights.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                    <span className="text-gray-400">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Tasks */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="w-5 h-5 text-purple-400" />
                  AI Tasks
                </CardTitle>
                <CardDescription>Current AI processing status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiTasks.map((task, index) => (
                  <div key={task.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{task.name}</span>
                      <Badge
                        variant={task.status === "completed" ? "default" : "secondary"}
                        className={
                          task.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                    <div className="text-xs text-gray-400">{task.progress}% complete</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <RealAIInsights />
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <AIPoweredRecommendations />
        </motion.div>
      </div>
    </div>
  )
}
