import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quickstart — KrishiSat",
  description: "Make your first KrishiSat API request in under 2 minutes.",
  openGraph: {
    title: "Quickstart — KrishiSat",
    description: "Make your first KrishiSat API request in under 2 minutes.",
    url: "https://krishisat.dev/developers/quickstart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quickstart — KrishiSat",
    description: "Make your first KrishiSat API request in under 2 minutes.",
  },
};

export default function QuickstartLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
