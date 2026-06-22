import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageWrapper from "@/components/page-wrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const defaultOG = {
  title: "KrishiSat | Satellite APIs for Crop Monitoring",
  description: "Integrate NDVI, NDMI, weather intelligence, and farm analytics into your applications with a single satellite API. Built for agritech developers.",
  images: ["/og-image.png"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://krishisat-api-frontend.vercel.app"),
  title: {
    default: "KrishiSat | Satellite APIs for Crop Monitoring",
    template: "%s — KrishiSat"
  },
  description: "Integrate NDVI, NDMI, weather intelligence, and farm analytics into your applications with a single satellite API. Built for agritech developers.",
  openGraph: {
    ...defaultOG,
    type: "website",
    siteName: "KrishiSat",
  },
  twitter: {
    card: "summary_large_image",
    site: "@krishisat",
    images: ["/og-image.png"],
  },
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
