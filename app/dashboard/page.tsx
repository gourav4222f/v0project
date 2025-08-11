import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
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

    return <DashboardContent user={session.user} profile={profile} />
  } catch (error) {
    console.error("Dashboard error:", error)
    redirect("/")
  }
}
