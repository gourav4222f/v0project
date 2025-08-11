import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, role, phone } = await request.json()

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl === "https://your-project.supabase.co") {
      return NextResponse.json(
        {
          error: "Supabase is not configured. Please add your environment variables.",
        },
        { status: 500 },
      )
    }

    const supabase = createRouteHandlerClient({ cookies })

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role || "student",
          phone: phone || "",
        },
      },
    })

    if (error) {
      console.error("Supabase signup error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (data.user) {
      // Check if email confirmation is required
      if (data.user.email_confirmed_at) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully! You can now sign in.",
          user: data.user,
        })
      } else {
        return NextResponse.json({
          success: true,
          message: "Account created successfully! Please check your email for verification before signing in.",
          user: data.user,
        })
      }
    }

    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  } catch (error: any) {
    console.error("Signup API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
