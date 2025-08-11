"use client"

import type { User } from "@supabase/auth-helpers-nextjs"
import { StudentDashboard } from "./student-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"
import { AccountantDashboard } from "./accountant-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { DashboardLayout } from "./dashboard-layout"

interface Profile {
  id: string
  role: "student" | "teacher" | "accountant" | "admin" | "alumni" | "parent"
  full_name: string
  branch_id?: string
}

interface DashboardContentProps {
  user: User
  profile: Profile
}

export function DashboardContent({ user, profile }: DashboardContentProps) {
  const renderDashboard = () => {
    switch (profile?.role) {
      case "student":
        return <StudentDashboard profile={profile} />
      case "teacher":
        return <TeacherDashboard profile={profile} />
      case "accountant":
        return <AccountantDashboard profile={profile} />
      case "admin":
        return <AdminDashboard profile={profile} />
      default:
        return <div>Role not recognized</div>
    }
  }

  return (
    <DashboardLayout user={user} profile={profile}>
      {renderDashboard()}
    </DashboardLayout>
  )
}
