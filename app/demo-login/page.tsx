import { DemoLogin } from "@/components/demo/demo-login"

export default function DemoLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduCRM Demo</h1>
          <p className="text-gray-600">Experience different user roles without creating an account</p>
        </div>
        <DemoLogin />
      </div>
    </div>
  )
}
