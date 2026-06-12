import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageWrapper from "@/components/page-wrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KrishiSat | Agricultural Intelligence Infrastructure",
  description: "Integrate satellite-derived crop health, water stress, weather intelligence, and farm analytics into your applications through a single API platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-text-primary">
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
