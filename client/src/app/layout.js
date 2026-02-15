"use client"

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer on dashboard routes
  const isDashboardRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin-dashboard');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className="min-h-screen bg-background">
            {!isDashboardRoute && <Navbar />}
            <main>{children}</main>
            {!isDashboardRoute && <Footer />}
          </div>
          <Toaster richColors position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
