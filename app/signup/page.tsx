"use client"

import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduCRM</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
