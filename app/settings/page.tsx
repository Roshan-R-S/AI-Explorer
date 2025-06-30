"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHighContrast } from "@/hooks/use-high-contrast"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Bell, Brain, Key, Monitor, Moon, Palette, Settings, Shield, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { reducedMotion, setReducedMotion } = useReducedMotion()
  const { highContrast, setHighContrast } = useHighContrast()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    aiInsights: true,
    realTime: true,
  })
  const [aiSettings, setAiSettings] = useState({
    autoAnalysis: true,
    confidenceThreshold: 80,
    insightFrequency: "hourly",
    personalizedRecommendations: true,
  })

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Customize your AI Explorer experience and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="John" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">
                    Timezone
                  </Label>
                  <Select defaultValue="utc">
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="cet">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme & Display
                </CardTitle>
                <CardDescription>Customize the look and feel of your interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-white">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "light", icon: Sun, label: "Light" },
                      { value: "dark", icon: Moon, label: "Dark" },
                      { value: "system", icon: Monitor, label: "System" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "outline"}
                        className={`flex flex-col gap-2 h-20 ${
                          theme === option.value
                            ? "bg-purple-600 text-white"
                            : "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        }`}
                        onClick={() => setTheme(option.value)}
                      >
                        <option.icon className="w-5 h-5" />
                        <span className="text-sm">{option.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Reduced Motion</Label>
                      <p className="text-sm text-gray-400">Minimize animations and transitions</p>
                    </div>
                    <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">High Contrast</Label>
                      <p className="text-sm text-gray-400">Increase contrast for better visibility</p>
                    </div>
                    <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Push Notifications</Label>
                      <p className="text-sm text-gray-400">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">AI Insights</Label>
                      <p className="text-sm text-gray-400">Notifications for new AI insights</p>
                    </div>
                    <Switch
                      checked={notifications.aiInsights}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, aiInsights: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Real-time Updates</Label>
                      <p className="text-sm text-gray-400">Live data and metric updates</p>
                    </div>
                    <Switch
                      checked={notifications.realTime}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, realTime: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Configuration
                </CardTitle>
                <CardDescription>Customize AI behavior and analysis settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Automatic Analysis</Label>
                      <p className="text-sm text-gray-400">Enable continuous data analysis</p>
                    </div>
                    <Switch
                      checked={aiSettings.autoAnalysis}
                      onCheckedChange={(checked) => setAiSettings((prev) => ({ ...prev, autoAnalysis: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Confidence Threshold</Label>
                    <p className="text-sm text-gray-400 mb-2">
                      Minimum confidence level for AI insights ({aiSettings.confidenceThreshold}%)
                    </p>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={aiSettings.confidenceThreshold}
                      onChange={(e) =>
                        setAiSettings((prev) => ({ ...prev, confidenceThreshold: Number.parseInt(e.target.value) }))
                      }
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Insight Frequency</Label>
                    <Select
                      value={aiSettings.insightFrequency}
                      onValueChange={(value) => setAiSettings((prev) => ({ ...prev, insightFrequency: value }))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Personalized Recommendations</Label>
                      <p className="text-sm text-gray-400">AI-powered personalized suggestions</p>
                    </div>
                    <Switch
                      checked={aiSettings.personalizedRecommendations}
                      onCheckedChange={(checked) =>
                        setAiSettings((prev) => ({ ...prev, personalizedRecommendations: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-3">
                  <Label className="text-white">Connected AI Services</Label>
                  <div className="space-y-2">
                    {[
                      { name: "OpenAI GPT-4", status: "connected", type: "Text Analysis" },
                      { name: "Hugging Face", status: "connected", type: "ML Models" },
                      { name: "Google AI", status: "disconnected", type: "Vision API" },
                    ].map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                      >
                        <div>
                          <p className="text-white font-medium">{service.name}</p>
                          <p className="text-sm text-gray-400">{service.type}</p>
                        </div>
                        <Badge
                          className={
                            service.status === "connected"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        >
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>Manage your account security and data privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Update Password</Button>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-transparent border-purple-400 text-purple-300 hover:bg-purple-400/10"
                    >
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Data Encryption</Label>
                      <p className="text-sm text-gray-400">Encrypt sensitive data at rest</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Analytics Tracking</Label>
                      <p className="text-sm text-gray-400">Allow usage analytics collection</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-3">
                  <Label className="text-white">API Keys</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">Production API Key</p>
                          <p className="text-sm text-gray-400">Last used 2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700">
                    Generate New API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
