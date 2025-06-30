"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, BarChart3, Globe, Zap, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations and intelligent analysis of your data",
    href: "/dashboard",
  },
  {
    icon: BarChart3,
    title: "3D Data Visualization",
    description: "Explore your data in immersive 3D environments with interactive charts",
    href: "/analytics",
  },
  {
    icon: Globe,
    title: "Real-time Collaboration",
    description: "Connect and collaborate with others in real-time with AI assistance",
    href: "/chat",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description: "Automate workflows with intelligent AI-driven processes",
    href: "/automation",
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-purple-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Powered by Advanced AI</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">AI Explorer</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of data interaction with AI-powered insights, immersive 3D visualizations, and
              intelligent automation
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-purple-400 text-purple-300 hover:bg-purple-400/10"
              >
                <Link href="/analytics">View Demo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover how AI Explorer transforms your data experience with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 mb-4">{feature.description}</CardDescription>
                    <Button asChild variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-0">
                      <Link href={feature.href}>
                        Learn more <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl p-8 md:p-12 text-center border border-purple-500/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Data Experience?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already leveraging AI to unlock insights and drive innovation
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/dashboard">
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
