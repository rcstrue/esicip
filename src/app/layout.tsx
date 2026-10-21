import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ESIC IP Bulk Registration Helper",
  description:
    "Validate ESIC employee CSVs, translate labels to portal codes, and export a queue.json / Chrome extension for the ESIC IP bulk-registration flow. No captcha after login.",
  keywords: [
    "ESIC",
    "ESIC IP registration",
    "bulk registration",
    "ESIC portal",
    "CSV validator",
    "Chrome extension",
  ],
  authors: [{ name: "rcstrue" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ESIC IP Bulk Registration Helper",
    description:
      "Validate ESIC employee CSVs and export a queue.json / Chrome extension for the ESIC IP bulk-registration flow.",
    siteName: "ESIC IP Helper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESIC IP Bulk Registration Helper",
    description:
      "Validate ESIC employee CSVs and export a queue.json / Chrome extension for the ESIC IP bulk-registration flow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
