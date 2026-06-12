import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "API Reference — KrishiSat",
  description: "Complete API specification for KrishiSat crop health indices, water telemetry, and hyperlocal weather endpoints.",
  openGraph: {
    title: "API Reference — KrishiSat",
    description: "Complete API specification for KrishiSat crop health indices, water telemetry, and hyperlocal weather endpoints.",
    url: "https://krishisat.dev/developers/reference",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Reference — KrishiSat",
    description: "Complete API specification for KrishiSat crop health indices, water telemetry, and hyperlocal weather endpoints.",
  },
};

export default function ReferenceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
