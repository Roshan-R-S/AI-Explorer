"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { RealAIChat } from "@/components/real-ai-chat"

const mockUsers = [
  { id: "1", name: "Alice Johnson", status: "online" },
  { id: "2", name: "Bob Smith", status: "away" },
  { id: "3", name: "Carol Davis", status: "online" },
  { id: "4", name: "David Wilson", status: "offline" },
]

export default function ChatPage() {
  const [onlineUsers] = useState(mockUsers.filter((u) => u.status === "online"))

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Sidebar - Online Users */}
          <Card className="bg-slate-800/50 border-slate-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                Online ({onlineUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-slate-700 text-white text-xs">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{user.name}</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Online</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Chat Area */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                      AI-Powered Chat
                    </CardTitle>
                    <CardDescription>Chat with AI assistant powered by real OpenAI integration</CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    <Zap className="w-3 h-3 mr-1" />
                    Live AI
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <RealAIChat />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
