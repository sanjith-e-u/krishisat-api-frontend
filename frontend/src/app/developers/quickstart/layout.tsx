import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quickstart Guide — X-AGI Developers",
  description: "Get started with the X-AGI Satellite Intelligence API. Make your first NDVI call in under 5 minutes.",
}

export default function QuickstartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
