"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DebugSignupPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [fullName, setFullName] = useState("Test User")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testSignup = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log("Testing signup with:", { email, fullName })

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          role: "student",
          phone: "+1234567890",
        }),
      })

      const data = await response.json()
      console.log("Response:", { status: response.status, data })

      setResult({
        status: response.status,
        success: response.ok,
        data,
      })
    } catch (error: any) {
      console.error("Error:", error)
      setResult({
        status: "error",
        success: false,
        data: { error: error.message },
      })
    } finally {
      setLoading(false)
    }
  }

  const checkEnvironment = () => {
    const env = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT SET",
    }
    console.log("Environment:", env)
    setResult({ environment: env })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Debug Signup Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Email:</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Password:</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Full Name:</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={testSignup} disabled={loading}>
              {loading ? "Testing..." : "Test Signup API"}
            </Button>
            <Button variant="outline" onClick={checkEnvironment}>
              Check Environment
            </Button>
          </div>

          {result && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">Result:</div>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <strong>Environment Status:</strong>
            </p>
            <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Not set"}</p>
            <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Not set"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
