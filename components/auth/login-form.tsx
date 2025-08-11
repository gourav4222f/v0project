"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isConfigured = supabaseUrl && supabaseKey && supabaseUrl !== "https://your-project.supabase.co"

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!isConfigured) {
        // Demo mode
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setError("Demo mode: Please use the demo dashboard instead.")
        setTimeout(() => {
          router.push("/demo")
        }, 2000)
        return
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          {isConfigured ? "Enter your credentials to access your account" : "Demo mode - Use demo dashboard instead"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConfigured && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode:</strong> Supabase is not configured.
              <Button variant="link" className="p-0 h-auto ml-1" onClick={() => router.push("/demo")}>
                Try the demo instead
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <div className="text-center space-y-2">
            <Button type="button" variant="link" onClick={() => router.push("/signup")} className="text-sm">
              Don't have an account? Sign up
            </Button>
            {!isConfigured && (
              <Button type="button" variant="outline" onClick={() => router.push("/demo")} className="w-full">
                Try Demo Dashboard
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
