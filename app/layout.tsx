import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnimatedFavicon from "@/components/AnimatedFavicon";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Japanese Green Hydrogen Technology | Hydrogen Energy Solutions",
  description:
    "Japanese hydrogen technology company: renewable green hydrogen production, safe metal-hydride storage, container-based transport and local fleet use for governments and industry worldwide.",
  openGraph: {
    title: "Japanese Green Hydrogen Technology",
    description:
      "Japanese hydrogen technology: production, storage, transport and consumption infrastructure for a global hydrogen society.",
    type: "website",
    images: ["/images/hero-storage-tanks.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <AnimatedFavicon />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )}