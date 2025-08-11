"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, Users, FileText, AlertCircle, CheckCircle } from "lucide-react"

interface Profile {
  id: string
  role: string
  full_name: string
  branch_id?: string
}

interface AccountantDashboardProps {
  profile: Profile
}

export function AccountantDashboard({ profile }: AccountantDashboardProps) {
  // Mock data - in real app, fetch from Supabase
  const mockData = {
    revenue: {
      thisMonth: 450000,
      lastMonth: 420000,
      target: 500000,
    },
    expenses: {
      thisMonth: 280000,
      lastMonth: 275000,
    },
    pendingPayments: [
      { id: 1, student: "John Doe", amount: 15000, dueDate: "2024-01-20", course: "Mathematics" },
      { id: 2, student: "Jane Smith", amount: 12000, dueDate: "2024-01-22", course: "Physics" },
      { id: 3, student: "Mike Johnson", amount: 18000, dueDate: "2024-01-25", course: "Chemistry" },
    ],
    salaryPayments: [
      { id: 1, teacher: "Dr. Smith", amount: 45000, status: "pending", dueDate: "2024-01-31" },
      { id: 2, teacher: "Prof. Johnson", amount: 50000, status: "paid", paidDate: "2024-01-01" },
    ],
  }

  const revenueGrowth = ((mockData.revenue.thisMonth - mockData.revenue.lastMonth) / mockData.revenue.lastMonth) * 100
  const expenseGrowth =
    ((mockData.expenses.thisMonth - mockData.expenses.lastMonth) / mockData.expenses.lastMonth) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
        <p className="text-muted-foreground">Manage finances and payments</p>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.revenue.thisMonth.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{revenueGrowth.toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.expenses.thisMonth.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />+{expenseGrowth.toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(mockData.revenue.thisMonth - mockData.expenses.thisMonth).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                ((mockData.revenue.thisMonth - mockData.expenses.thisMonth) / mockData.revenue.thisMonth) *
                100
              ).toFixed(1)}
              % margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.pendingPayments.length}</div>
            <p className="text-xs text-muted-foreground">
              ₹{mockData.pendingPayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Target Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Target</CardTitle>
          <CardDescription>Progress towards monthly revenue goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current: ₹{mockData.revenue.thisMonth.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Target: ₹{mockData.revenue.target.toLocaleString()}</span>
          </div>
          <Progress value={(mockData.revenue.thisMonth / mockData.revenue.target) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {((mockData.revenue.thisMonth / mockData.revenue.target) * 100).toFixed(1)}% of target achieved
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Student Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Student Payments</CardTitle>
            <CardDescription>Students with outstanding fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.pendingPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.student}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.course} • Due: {payment.dueDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{payment.amount.toLocaleString()}</p>
                  <Button size="sm" className="mt-1">
                    Send Reminder
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Salary Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Payments</CardTitle>
            <CardDescription>Teacher salary status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.salaryPayments.map((salary) => (
              <div key={salary.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {salary.status === "paid" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  )}
                  <div>
                    <p className="font-medium">{salary.teacher}</p>
                    <p className="text-sm text-muted-foreground">
                      {salary.status === "paid" ? `Paid: ${salary.paidDate}` : `Due: ${salary.dueDate}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{salary.amount.toLocaleString()}</p>
                  <Badge variant={salary.status === "paid" ? "default" : "destructive"}>{salary.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common financial tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Generate Invoice
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <DollarSign className="h-6 w-6 mb-2" />
              Record Payment
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <TrendingUp className="h-6 w-6 mb-2" />
              Financial Report
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Salary Management
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
