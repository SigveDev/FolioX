"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Eye, Users, Globe, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = {
    totalViews: 12847,
    uniqueVisitors: 8234,
    avgSessionDuration: "2m 34s",
    bounceRate: "32%",
    topCountries: [
      { country: "United States", views: 4521, percentage: 35 },
      { country: "United Kingdom", views: 2134, percentage: 17 },
      { country: "Canada", views: 1876, percentage: 15 },
      { country: "Germany", views: 1234, percentage: 10 },
      { country: "Australia", views: 987, percentage: 8 },
    ],
    projectStats: [
      {
        id: 1,
        title: "FinTech Mobile Banking App",
        views: 4521,
        uniqueVisitors: 3234,
        avgTime: "3m 45s",
        conversionRate: "12%",
      },
      {
        id: 2,
        title: "E-commerce Platform Redesign",
        views: 3876,
        uniqueVisitors: 2987,
        avgTime: "2m 12s",
        conversionRate: "8%",
      },
      {
        id: 3,
        title: "Healthcare Dashboard",
        views: 2234,
        uniqueVisitors: 1876,
        avgTime: "4m 23s",
        conversionRate: "15%",
      },
    ],
    recentActivity: [
      { date: "2 hours ago", action: "New visitor from San Francisco viewed FinTech project" },
      { date: "4 hours ago", action: "Portfolio shared on LinkedIn - 23 clicks" },
      { date: "6 hours ago", action: "Contact form submitted from E-commerce project" },
      { date: "1 day ago", action: "Featured in design community - 156 views" },
      { date: "2 days ago", action: "New visitor from London spent 5m on Healthcare project" },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">FX</span>
              </div>
              <span className="font-bold">FolioX</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track your portfolio performance and visitor insights</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Unique Visitors</p>
                    <p className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+8%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Session</p>
                    <p className="text-2xl font-bold">{stats.avgSessionDuration}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+5%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{stats.bounceRate}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-red-600 mr-1 rotate-180" />
                  <span className="text-red-600">-3%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Project Performance */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Performance</CardTitle>
                  <CardDescription>How your individual projects are performing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {stats.projectStats.map((project) => (
                    <div key={project.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{project.title}</h4>
                        <Badge variant="outline">{project.conversionRate} conversion</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-semibold">{project.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Visitors</p>
                          <p className="font-semibold">{project.uniqueVisitors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg. Time</p>
                          <p className="font-semibold">{project.avgTime}</p>
                        </div>
                      </div>
                      <Progress value={(project.views / stats.totalViews) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Top Countries */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{country.country}</p>
                          <p className="text-sm text-muted-foreground">{country.views.toLocaleString()} views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{country.percentage}%</p>
                        <Progress value={country.percentage} className="h-1 w-16" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest interactions with your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Insights & Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions to improve your portfolio performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">📈 Growing Engagement</h4>
                <p className="text-sm text-blue-800">
                  Your FinTech project is performing exceptionally well with a 15% conversion rate. Consider creating
                  similar case studies to capitalize on this trend.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">🎯 Optimization Opportunity</h4>
                <p className="text-sm text-green-800">
                  Visitors spend 4+ minutes on your Healthcare project but conversion is low. Adding a clear
                  call-to-action could improve engagement.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">🌍 Global Reach</h4>
                <p className="text-sm text-purple-800">
                  35% of your traffic comes from the US. Consider adding timezone-specific contact information to
                  improve international client connections.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
