"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard"
import { AccountantDashboard } from "@/components/dashboard/accountant-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { ArrowLeft, Users, BookOpen, DollarSign, Settings, GraduationCap, UserCheck } from "lucide-react"

const mockUser = {
  id: "demo-user",
  email: "demo@educrm.com",
}

const mockProfiles = {
  student: {
    id: "demo-student",
    role: "student" as const,
    full_name: "John Doe",
    branch_id: "demo-branch",
  },
  teacher: {
    id: "demo-teacher",
    role: "teacher" as const,
    full_name: "Dr. Sarah Smith",
    branch_id: "demo-branch",
  },
  accountant: {
    id: "demo-accountant",
    role: "accountant" as const,
    full_name: "Mike Johnson",
    branch_id: "demo-branch",
  },
  admin: {
    id: "demo-admin",
    role: "admin" as const,
    full_name: "Admin User",
    branch_id: "demo-branch",
  },
  parent: {
    id: "demo-parent",
    role: "parent" as const,
    full_name: "Mrs. Cooper",
    branch_id: "demo-branch",
  },
  alumni: {
    id: "demo-alumni",
    role: "alumni" as const,
    full_name: "Alex Graduate",
    branch_id: "demo-branch",
  },
}

export function DemoDashboard() {
  const [selectedRole, setSelectedRole] = useState<keyof typeof mockProfiles>("student")

  useEffect(() => {
    // Check if a demo user was selected from the demo login page
    const savedDemoUser = localStorage.getItem("demoUser")
    if (savedDemoUser && savedDemoUser in mockProfiles) {
      setSelectedRole(savedDemoUser as keyof typeof mockProfiles)
    }
  }, [])

  const renderDashboard = () => {
    const profile = mockProfiles[selectedRole]

    switch (selectedRole) {
      case "student":
        return <StudentDashboard profile={profile} />
      case "teacher":
        return <TeacherDashboard profile={profile} />
      case "accountant":
        return <AccountantDashboard profile={profile} />
      case "admin":
        return <AdminDashboard profile={profile} />
      case "parent":
        return <StudentDashboard profile={profile} /> // Parent sees student-like view
      case "alumni":
        return <StudentDashboard profile={profile} /> // Alumni sees student-like view
      default:
        return <div>Role not found</div>
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <BookOpen className="h-4 w-4" />
      case "teacher":
        return <GraduationCap className="h-4 w-4" />
      case "accountant":
        return <DollarSign className="h-4 w-4" />
      case "admin":
        return <Settings className="h-4 w-4" />
      case "parent":
        return <UserCheck className="h-4 w-4" />
      case "alumni":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-xl font-semibold">EduCRM Demo</h1>
              <p className="text-sm text-muted-foreground">Explore different user roles and features</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Demo Mode</Badge>
            <Select value={selectedRole} onValueChange={(value: keyof typeof mockProfiles) => setSelectedRole(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon("student")}
                    <span>Student</span>
                  </div>
                </SelectItem>
                <SelectItem value="teacher">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon("teacher")}
                    <span>Teacher</span>
                  </div>
                </SelectItem>
                <SelectItem value="accountant">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon("accountant")}
                    <span>Accountant</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon("admin")}
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="parent">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon("parent")}
                    <span>Parent</span>
                  </div>
                </SelectItem>
                <SelectItem value="alumni">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon("alumni")}
                    <span>Alumni</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/demo-login")}>
              Change User
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Role Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getRoleIcon(selectedRole)}
              <span>Viewing as: {mockProfiles[selectedRole].full_name}</span>
            </CardTitle>
            <CardDescription>
              This is a demo of the {selectedRole} dashboard. All data shown is mock data for demonstration purposes.
              Switch roles using the dropdown above to explore different user experiences.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Dashboard Content */}
        {renderDashboard()}
      </div>
    </div>
  )
}
