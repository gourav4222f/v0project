import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { UserManagement } from "@/components/admin/user-management"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default async function UsersPage() {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "https://your-project.supabase.co") {
    redirect("/demo")
  }

  try {
    const supabase = createServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/")
    }

    // Get user profile with role
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

    // Check if user is admin
    if (profile?.role !== "admin") {
      redirect("/dashboard")
    }

    return (
      <DashboardLayout user={session.user} profile={profile}>
        <UserManagement />
      </DashboardLayout>
    )
  } catch (error) {
    console.error("Users page error:", error)
    redirect("/")
  }
}
