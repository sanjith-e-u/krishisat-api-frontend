import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — KrishiSat",
  description: "KrishiSat API reference and developer documentation.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
