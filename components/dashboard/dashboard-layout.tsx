"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@supabase/auth-helpers-nextjs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Home,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Bell,
} from "lucide-react"

interface Profile {
  id: string
  role: "student" | "teacher" | "accountant" | "admin" | "alumni" | "parent"
  full_name: string
  branch_id?: string
}

interface DashboardLayoutProps {
  user: User
  profile: Profile
  children: React.ReactNode
}

export function DashboardLayout({ user, profile, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const getNavigationItems = () => {
    const baseItems = [
      { name: "Dashboard", href: "/dashboard", icon: Home },
      { name: "Calendar", href: "/calendar", icon: Calendar },
      { name: "Messages", href: "/messages", icon: MessageSquare },
      { name: "Notifications", href: "/notifications", icon: Bell },
    ]

    const roleSpecificItems = {
      student: [
        { name: "Courses", href: "/courses", icon: BookOpen },
        { name: "Attendance", href: "/attendance", icon: Calendar },
        { name: "Fees", href: "/fees", icon: DollarSign },
        { name: "Reports", href: "/reports", icon: FileText },
      ],
      teacher: [
        { name: "Classes", href: "/classes", icon: BookOpen },
        { name: "Students", href: "/students", icon: Users },
        { name: "Attendance", href: "/attendance", icon: Calendar },
        { name: "Materials", href: "/materials", icon: FileText },
        { name: "Salary", href: "/salary", icon: DollarSign },
      ],
      accountant: [
        { name: "Fee Management", href: "/fee-management", icon: DollarSign },
        { name: "Payments", href: "/payments", icon: DollarSign },
        { name: "Salary", href: "/salary-management", icon: DollarSign },
        { name: "Reports", href: "/financial-reports", icon: BarChart3 },
      ],
      admin: [
        { name: "Users", href: "/users", icon: Users },
        { name: "Courses", href: "/course-management", icon: BookOpen },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    }

    return [...baseItems, ...(roleSpecificItems[profile?.role] || [])]
  }

  const navigationItems = getNavigationItems()

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-6"}`}>
      <div className="flex items-center mb-8">
        <h2 className="text-xl font-bold">EduCRM</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              router.push(item.href)
              if (mobile) setSidebarOpen(false)
            }}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>

      <div className="border-t pt-4 mt-4">
        <div className="mb-4">
          <p className="text-sm font-medium">{profile?.full_name}</p>
          <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
