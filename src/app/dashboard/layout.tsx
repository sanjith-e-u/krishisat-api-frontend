import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/layout"

export const metadata: Metadata = {
  title: "Dashboard — KrishiSat",
  description: "KrishiSat developer dashboard.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
