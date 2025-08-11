"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, DollarSign, Clock, AlertTriangle } from "lucide-react"

interface Profile {
  id: string
  role: string
  full_name: string
  branch_id?: string
}

interface TeacherDashboardProps {
  profile: Profile
}

export function TeacherDashboard({ profile }: TeacherDashboardProps) {
  // Mock data - in real app, fetch from Supabase
  const mockData = {
    classes: [
      { id: 1, name: "Mathematics Grade 10", students: 25, nextClass: "2024-01-15 10:00" },
      { id: 2, name: "Physics Grade 11", students: 20, nextClass: "2024-01-15 14:00" },
      { id: 3, name: "Mathematics Grade 12", students: 18, nextClass: "2024-01-16 09:00" },
    ],
    todaySchedule: [
      { time: "09:00", class: "Mathematics Grade 10", room: "Room 101" },
      { time: "11:00", class: "Physics Grade 11", room: "Room 203" },
      { time: "14:00", class: "Mathematics Grade 12", room: "Room 101" },
    ],
    pendingTasks: [
      { id: 1, task: "Grade Assignment 3", class: "Mathematics Grade 10", due: "2024-01-16" },
      { id: 2, task: "Prepare Quiz", class: "Physics Grade 11", due: "2024-01-17" },
    ],
    salary: { current: 45000, lastPaid: "2024-01-01" },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {profile.full_name}!</h1>
        <p className="text-muted-foreground">Manage your classes and students</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.classes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.classes.reduce((sum, cls) => sum + cls.students, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.todaySchedule.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.salary.current.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last paid: {mockData.salary.lastPaid}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.todaySchedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{schedule.class}</p>
                    <p className="text-sm text-muted-foreground">{schedule.room}</p>
                  </div>
                </div>
                <Badge variant="outline">{schedule.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Classes you're teaching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.classes.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.students} students</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm">Attendance</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>Tasks that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.class} • Due: {task.due}
                    </p>
                  </div>
                </div>
                <Button size="sm">Complete</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
