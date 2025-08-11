import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "https://your-project.supabase.co") {
    // If Supabase is not configured, allow all routes for development
    console.warn("Supabase not configured. Skipping authentication middleware.")
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is not signed in and the current path is not the home page redirect the user to the home page
    if (!session && req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // If user is signed in and the current path is the home page redirect the user to the dashboard
    if (session && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // Continue without authentication if there's an error
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
