import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "webspoilt | Full Stack Developer",
  description: "Portfolio of Biswajeet Arukha - Full Stack Developer building secure, scalable solutions.",
  keywords: ["webspoilt", "Biswajeet Arukha", "Full Stack Developer", "Portfolio", "Next.js", "React", "Cybersecurity"],
  authors: [{ name: "Biswajeet Arukha" }],
  icons: "/favicon.png",
  openGraph: {
    title: "webspoilt | Full Stack Developer",
    description: "Portfolio of Biswajeet Arukha - Building secure, scalable solutions",
    url: "https://github.com/webspoilt",
    siteName: "webspoilt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "webspoilt | Full Stack Developer",
    description: "Portfolio of Biswajeet Arukha - Building secure, scalable solutions",
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
        <Analytics />
      </body>
    </html>
  );
}
