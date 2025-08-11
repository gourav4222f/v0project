"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Trash2, Database, AlertTriangle, CheckCircle } from "lucide-react"

export function DemoDataManager() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const supabase = createClient()

  const cleanupDemoData = async () => {
    if (!confirm("Are you sure you want to remove all demo data? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    setResult(null)

    try {
      // Call the cleanup function
      const { error } = await supabase.rpc("cleanup_demo_data")

      if (error) {
        throw error
      }

      setResult({
        success: true,
        message: "Demo data has been successfully removed from the system.",
      })
    } catch (error: any) {
      setResult({
        success: false,
        message: `Failed to cleanup demo data: ${error.message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const demoDataInfo = [
    { category: "Users", count: "20+", description: "Admin, teachers, students, parents, alumni" },
    { category: "Courses", count: "6", description: "Math, Physics, Chemistry, English, CS, Biology" },
    { category: "Enrollments", count: "15+", description: "Student course enrollments with progress" },
    { category: "Attendance", count: "50+", description: "Sample attendance records" },
    { category: "Fee Payments", count: "10+", description: "Paid, pending, and overdue payments" },
    { category: "Salary Records", count: "8", description: "Teacher salary records" },
    { category: "Notifications", count: "6", description: "Sample system notifications" },
    { category: "Events", count: "5", description: "Exams, meetings, workshops" },
    { category: "Study Materials", count: "6", description: "Course materials and resources" },
    { category: "Other Data", count: "Various", description: "Leave requests, audit logs, etc." },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Demo Data Management</span>
          </CardTitle>
          <CardDescription>Manage demo/seed data in the system for testing purposes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> This system currently contains demo data for testing purposes. In a production
              environment, you should remove this data and replace it with real institutional data.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            {demoDataInfo.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{item.category}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
                <Badge variant="outline">{item.count}</Badge>
              </div>
            ))}
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-4">
            <Button variant="destructive" onClick={cleanupDemoData} disabled={loading}>
              {loading ? (
                "Cleaning up..."
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove All Demo Data
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const sql = `-- Run this SQL to manually cleanup demo data
SELECT cleanup_demo_data();

-- Or run individual cleanup queries:
DELETE FROM audit_logs WHERE user_id LIKE 'demo-%';
DELETE FROM leave_requests WHERE teacher_id LIKE 'demo-%';
DELETE FROM study_materials WHERE course_id LIKE 'demo-%';
DELETE FROM events WHERE branch_id LIKE 'demo-%';
DELETE FROM notifications WHERE user_id LIKE 'demo-%';
DELETE FROM salary_records WHERE teacher_id LIKE 'demo-%';
DELETE FROM fee_payments WHERE student_id LIKE 'demo-%';
DELETE FROM attendance WHERE student_id LIKE 'demo-%';
DELETE FROM enrollments WHERE student_id LIKE 'demo-%';
DELETE FROM teacher_courses WHERE teacher_id LIKE 'demo-%';
DELETE FROM students WHERE id LIKE 'demo-%';
DELETE FROM teachers WHERE id LIKE 'demo-%';
DELETE FROM courses WHERE id LIKE 'demo-%';
DELETE FROM profiles WHERE id LIKE 'demo-%';
DELETE FROM branches WHERE id LIKE 'demo-%';`

                navigator.clipboard.writeText(sql)
                alert("SQL cleanup commands copied to clipboard!")
              }}
            >
              Copy SQL Commands
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Demo Data Details</CardTitle>
          <CardDescription>Overview of the demo data included in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Demo Users Created:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 2 Admin users (Admin User, Sarah Administrator)</li>
                <li>• 4 Teachers (Dr. John Smith, Prof. Emily Johnson, Dr. Michael Brown, Ms. Lisa Davis)</li>
                <li>• 2 Accountants (Robert Finance, Maria Accounts)</li>
                <li>• 10 Students (Alice Cooper, Bob Wilson, Charlie Brown, etc.)</li>
                <li>• 3 Parents and 2 Alumni users</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Demo Courses:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Advanced Mathematics ($15,000)</li>
                <li>• Physics Fundamentals ($18,000)</li>
                <li>• Chemistry Basics ($16,000)</li>
                <li>• English Literature ($12,000)</li>
                <li>• Computer Science ($25,000)</li>
                <li>• Biology Advanced ($20,000)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sample Data Includes:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Student enrollments with progress tracking</li>
                <li>• Attendance records (present, absent, late, excused)</li>
                <li>• Fee payments (paid, pending, overdue)</li>
                <li>• Teacher salary records</li>
                <li>• System notifications</li>
                <li>• Events and calendar items</li>
                <li>• Study materials and resources</li>
                <li>• Leave requests and audit logs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
