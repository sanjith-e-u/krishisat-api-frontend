import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Cormorant_Garamond } from "next/font/google";
import PageWrapper from "@/components/page-wrapper";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-serif-accent",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400"],
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-serif-accent",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const defaultOG = {
  title: "X-AGI | Agricultural APIs for Crop Monitoring",
  description: "Integrate NDVI, NDMI, weather intelligence, and farm analytics into your applications with a single agricultural API. Built for agritech developers.",
  images: ["/og-image.png"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://X-AGI-api-frontend.vercel.app"),
  title: {
    default: "X-AGI | Agricultural APIs for Crop Monitoring",
    template: "%s — X-AGI"
  },
  description: "Integrate NDVI, NDMI, weather intelligence, and farm analytics into your applications with a single agricultural API. Built for agritech developers.",
  openGraph: {
    ...defaultOG,
    type: "website",
    siteName: "X-AGI",
  },
  twitter: {
    card: "summary_large_image",
    site: "{{TWITTER_HANDLE}}",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <ScrollProgress />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
