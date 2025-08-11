"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, DollarSign, TrendingUp, Settings, BarChart3, AlertTriangle, Database } from "lucide-react"

interface Profile {
  id: string
  role: string
  full_name: string
  branch_id?: string
}

interface AdminDashboardProps {
  profile: Profile
}

export function AdminDashboard({ profile }: AdminDashboardProps) {
  // Mock data - in real app, fetch from Supabase
  const mockData = {
    overview: {
      totalStudents: 1250,
      totalTeachers: 45,
      totalCourses: 25,
      monthlyRevenue: 450000,
      activeEnrollments: 2100,
    },
    recentActivities: [
      { id: 1, type: "enrollment", message: "New student enrolled in Mathematics", time: "2 hours ago" },
      { id: 2, type: "payment", message: "Fee payment received from John Doe", time: "4 hours ago" },
      { id: 3, type: "teacher", message: "New teacher added to Physics department", time: "1 day ago" },
    ],
    systemAlerts: [
      { id: 1, type: "warning", message: "Server maintenance scheduled for tonight", priority: "medium" },
      { id: 2, type: "info", message: "15 students have pending fee payments", priority: "low" },
    ],
    branchPerformance: [
      { name: "Main Campus", students: 800, revenue: 280000, growth: 12 },
      { name: "North Branch", students: 300, revenue: 120000, growth: 8 },
      { name: "South Branch", students: 150, revenue: 50000, growth: -2 },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive institute management overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalCourses}</div>
            <p className="text-xs text-muted-foreground">3 new this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.overview.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.activeEnrollments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      {mockData.systemAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle
                    className={`h-5 w-5 ${alert.priority === "medium" ? "text-orange-500" : "text-blue-500"}`}
                  />
                  <span>{alert.message}</span>
                </div>
                <Badge variant={alert.priority === "medium" ? "destructive" : "default"}>{alert.priority}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Branch Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
            <CardDescription>Performance metrics across all branches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.branchPerformance.map((branch, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{branch.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{branch.students} students</span>
                    <Badge variant={branch.growth > 0 ? "default" : "destructive"}>
                      {branch.growth > 0 ? "+" : ""}
                      {branch.growth}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Revenue: ₹{branch.revenue.toLocaleString()}</span>
                  <span>Growth: {branch.growth}%</span>
                </div>
                <Progress value={Math.abs(branch.growth) * 5} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === "enrollment" && <Users className="h-5 w-5 text-blue-500" />}
                  {activity.type === "payment" && <DollarSign className="h-5 w-5 text-green-500" />}
                  {activity.type === "teacher" && <BookOpen className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BookOpen className="h-6 w-6 mb-2" />
              Course Management
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BarChart3 className="h-6 w-6 mb-2" />
              Analytics
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Settings className="h-6 w-6 mb-2" />
              System Settings
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => (window.location.href = "/admin/demo-data")}
            >
              <Database className="h-6 w-6 mb-2" />
              Demo Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
