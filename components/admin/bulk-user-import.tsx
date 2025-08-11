"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, Loader2 } from "lucide-react"

interface BulkUserData {
  email: string
  fullName: string
  role: string
  phone?: string
}

export function BulkUserImport() {
  const [csvData, setCsvData] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: [],
  })
  const [showResults, setShowResults] = useState(false)
  const supabase = createClient()

  const downloadTemplate = () => {
    const template = `email,fullName,role,phone
john.doe@example.com,John Doe,student,+1234567890
jane.smith@example.com,Jane Smith,teacher,+1234567891
mike.johnson@example.com,Mike Johnson,accountant,+1234567892`

    const blob = new Blob([template], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "user-import-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const parseCsvData = (csv: string): BulkUserData[] => {
    const lines = csv.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())

    return lines
      .slice(1)
      .map((line) => {
        const values = line.split(",").map((v) => v.trim())
        const user: any = {}

        headers.forEach((header, index) => {
          user[header] = values[index] || ""
        })

        return {
          email: user.email,
          fullName: user.fullName,
          role: user.role || "student",
          phone: user.phone,
        }
      })
      .filter((user) => user.email && user.fullName)
  }

  const handleBulkImport = async () => {
    if (!csvData.trim()) {
      return
    }

    setLoading(true)
    setProgress(0)
    setShowResults(false)

    const users = parseCsvData(csvData)
    const results = { success: 0, failed: 0, errors: [] as string[] }

    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      setProgress(((i + 1) / users.length) * 100)

      try {
        // Generate a temporary password
        const tempPassword = Math.random().toString(36).slice(-8) + "A1!"

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: user.fullName,
            role: user.role,
            phone: user.phone,
          },
        })

        if (authError) throw authError

        // Update profile
        if (authData.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .update({
              full_name: user.fullName,
              role: user.role,
              phone: user.phone,
            })
            .eq("id", authData.user.id)

          if (profileError) throw profileError
        }

        results.success++
      } catch (error: any) {
        results.failed++
        results.errors.push(`${user.email}: ${error.message}`)
      }
    }

    setResults(results)
    setShowResults(true)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk User Import</CardTitle>
          <CardDescription>Import multiple users at once using CSV format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <span className="text-sm text-muted-foreground">Download the CSV template to get started</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="csvData">CSV Data</Label>
            <Textarea
              id="csvData"
              placeholder="Paste your CSV data here or type it manually..."
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Importing users...</span>
                <span className="text-sm">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button onClick={handleBulkImport} disabled={loading || !csvData.trim()} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Import Users
              </>
            )}
          </Button>

          {showResults && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <div>
                    <strong>Import Results:</strong>
                  </div>
                  <div>✅ Successfully created: {results.success} users</div>
                  <div>❌ Failed: {results.failed} users</div>
                  {results.errors.length > 0 && (
                    <div className="mt-2">
                      <strong>Errors:</strong>
                      <ul className="list-disc list-inside text-sm mt-1">
                        {results.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                        {results.errors.length > 5 && <li>... and {results.errors.length - 5} more errors</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
