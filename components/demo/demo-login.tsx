"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, DollarSign, Settings, GraduationCap, UserCheck } from "lucide-react"

const demoUsers = [
  {
    id: "demo-admin",
    name: "Admin User",
    email: "admin@democrm.com",
    role: "admin",
    icon: Settings,
    description: "Full system access, user management, analytics",
    color: "bg-red-500",
  },
  {
    id: "demo-teacher",
    name: "Dr. Sarah Smith",
    email: "sarah.smith@democrm.com",
    role: "teacher",
    icon: GraduationCap,
    description: "Manage classes, mark attendance, view students",
    color: "bg-blue-500",
  },
  {
    id: "demo-accountant",
    name: "Mike Johnson",
    email: "mike.johnson@democrm.com",
    role: "accountant",
    icon: DollarSign,
    description: "Financial management, fee collection, reports",
    color: "bg-green-500",
  },
  {
    id: "demo-student",
    name: "John Doe",
    email: "john.doe@democrm.com",
    role: "student",
    icon: BookOpen,
    description: "View courses, attendance, fees, assignments",
    color: "bg-purple-500",
  },
  {
    id: "demo-parent",
    name: "Mrs. Cooper",
    email: "cooper.parent@democrm.com",
    role: "parent",
    icon: UserCheck,
    description: "View child's progress, attendance, fees",
    color: "bg-orange-500",
  },
  {
    id: "demo-alumni",
    name: "Alex Graduate",
    email: "alex.graduate@democrm.com",
    role: "alumni",
    icon: Users,
    description: "Alumni features, career tracking, events",
    color: "bg-indigo-500",
  },
]

export function DemoLogin() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const router = useRouter()

  const handleDemoLogin = (userRole: string) => {
    // Store the selected demo user in localStorage for the demo
    localStorage.setItem("demoUser", userRole)
    router.push("/demo")
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Demo Login</h2>
        <p className="text-muted-foreground">
          Choose a user role to explore the EduCRM system. No actual login required.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demoUsers.map((user) => {
          const IconComponent = user.icon
          return (
            <Card
              key={user.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedUser === user.role ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedUser(user.role)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${user.color} text-white`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription className="text-sm">{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{user.description}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDemoLogin(user.role)
                    }}
                    className="w-full"
                    variant={selectedUser === user.role ? "default" : "outline"}
                  >
                    Login as {user.role}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-blue-900">Quick Demo Access</h3>
            <p className="text-sm text-blue-700">
              Click any "Login as [role]" button above to instantly access that user's dashboard with sample data.
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <Button size="sm" onClick={() => handleDemoLogin("admin")} variant="outline">
                Quick Admin Access
              </Button>
              <Button size="sm" onClick={() => handleDemoLogin("student")} variant="outline">
                Quick Student Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
