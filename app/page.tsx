"use client"

import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://your-project.supabase.co"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduCRM</h1>
          <p className="text-gray-600">Educational Institute Management System</p>
        </div>

        {!isConfigured ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Welcome to EduCRM Demo</h2>
              <p className="text-gray-600">Explore the full system with different user roles - no signup required!</p>

              <div className="space-y-3">
                <Button onClick={() => router.push("/demo-login")} className="w-full" size="lg">
                  🎭 Try Demo Login
                </Button>
                <Button onClick={() => router.push("/demo")} variant="outline" className="w-full">
                  Quick Demo Dashboard
                </Button>
                <Button onClick={() => router.push("/signup")} variant="outline" className="w-full">
                  Create Demo Account
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left mt-6">
                <p className="text-sm font-medium mb-2">Demo Features:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 6 different user roles to explore</li>
                  <li>• Complete sample data and workflows</li>
                  <li>• No registration or setup required</li>
                  <li>• Full feature demonstration</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <p className="text-sm font-medium mb-2">For Production Use:</p>
                <code className="text-xs bg-white p-2 rounded block">
                  NEXT_PUBLIC_SUPABASE_URL=your-url
                  <br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
                </code>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <LoginForm />
            <div className="text-center">
              <Button onClick={() => router.push("/demo-login")} variant="outline" size="sm">
                Or try the demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
