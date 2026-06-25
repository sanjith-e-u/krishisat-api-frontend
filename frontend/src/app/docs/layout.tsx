import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — X-AGI",
  description: "X-AGI API reference and developer documentation.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
