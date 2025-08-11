"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface Profile {
  id: string
  role: string
  full_name: string
  branch_id?: string
}

interface StudentDashboardProps {
  profile: Profile
}

export function StudentDashboard({ profile }: StudentDashboardProps) {
  // Mock data - in real app, fetch from Supabase
  const mockData = {
    courses: [
      { id: 1, name: "Mathematics", progress: 75, nextClass: "2024-01-15 10:00" },
      { id: 2, name: "Physics", progress: 60, nextClass: "2024-01-15 14:00" },
      { id: 3, name: "Chemistry", progress: 85, nextClass: "2024-01-16 09:00" },
    ],
    attendance: { present: 85, total: 100 },
    fees: { paid: 15000, total: 20000, dueDate: "2024-01-20" },
    upcomingEvents: [
      { id: 1, title: "Mid-term Exam", date: "2024-01-25", type: "exam" },
      { id: 2, title: "Parent Meeting", date: "2024-01-30", type: "meeting" },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile.full_name}!</h1>
        <p className="text-muted-foreground">Here's your academic overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.courses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((mockData.attendance.present / mockData.attendance.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {mockData.attendance.present}/{mockData.attendance.total} classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.fees.total - mockData.fees.paid}</div>
            <p className="text-xs text-muted-foreground">Due by {mockData.fees.dueDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">Average across all courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your progress in enrolled courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.courses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{course.name}</span>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Next class: {new Date(course.nextClass).toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {event.type === "exam" ? (
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <Badge variant={event.type === "exam" ? "destructive" : "default"}>{event.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fee Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Payment</CardTitle>
          <CardDescription>Manage your fee payments and view history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Fee</p>
              <p className="text-2xl font-bold">₹{mockData.fees.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{mockData.fees.paid}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-red-600">₹{mockData.fees.total - mockData.fees.paid}</p>
            </div>
          </div>
          <Progress value={(mockData.fees.paid / mockData.fees.total) * 100} className="mb-4" />
          <div className="flex space-x-2">
            <Button>Pay Now</Button>
            <Button variant="outline">View History</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
