import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "https://your-project.supabase.co") {
    console.warn("Supabase environment variables not configured. Using mock client.")
    // Return a mock client for development
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: { message: "Supabase not configured. Please add your environment variables." },
          }),
        signUp: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: { message: "Supabase not configured. Please add your environment variables." },
          }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
      }),
    } as any
  }

  try {
    return createClientComponentClient()
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    throw error
  }
}

export const createServerClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "https://your-project.supabase.co") {
    console.warn("Supabase environment variables not configured. Using mock client.")
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
      }),
    } as any
  }

  try {
    return createServerComponentClient({ cookies })
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    throw error
  }
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          role: "student" | "teacher" | "accountant" | "admin" | "alumni" | "parent"
          phone: string | null
          address: string | null
          date_of_birth: string | null
          branch_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          role?: "student" | "teacher" | "accountant" | "admin" | "alumni" | "parent"
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          branch_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          role?: "student" | "teacher" | "accountant" | "admin" | "alumni" | "parent"
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          branch_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          syllabus: string | null
          fee: number
          duration_months: number | null
          branch_id: string | null
          created_at: string
          updated_at: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          status: "active" | "completed" | "dropped" | "suspended"
          enrolled_at: string
          completed_at: string | null
          progress: number
        }
      }
      attendance: {
        Row: {
          id: string
          student_id: string
          course_id: string
          teacher_id: string | null
          date: string
          status: "present" | "absent" | "late" | "excused"
          notes: string | null
          marked_at: string
          marked_by: string | null
        }
      }
      fee_payments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          amount_due: number
          amount_paid: number
          due_date: string
          paid_date: string | null
          status: "pending" | "paid" | "overdue" | "cancelled"
          payment_method: string | null
          transaction_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
