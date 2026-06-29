import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import AdminLayout from "@/components/admin/layout"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bjwfyqapksqurilqoalq.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    redirect("/admin-login")
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect("/admin-login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  console.log("=== SERVER-SIDE (LAYOUT) ROLE CHECK ===")
  console.log("User ID:", user.id)
  console.log("Profile Data returned:", profile)
  console.log("Profile Error returned:", profileError)
  console.log("Comparison Check: profile?.role !== 'admin' is", profile?.role !== 'admin')
  console.log("=======================================")

  if (profileError || profile?.role !== "admin") {
    console.log("LAYOUT BLOCKED: Redirecting to /dashboard")
    redirect("/dashboard")
  }

  return <AdminLayout>{children}</AdminLayout>
}
