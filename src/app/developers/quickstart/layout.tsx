import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quickstart Guide — KrishiSat Developers",
  description: "Get started with the KrishiSat Satellite Intelligence API. Make your first NDVI call in under 5 minutes.",
}

export default function QuickstartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
