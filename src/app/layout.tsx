import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Nunito_Sans, Space_Mono } from "next/font/google";
import type React from "react";
import { Footer } from "./_components/footer";
import { NavBar } from "./_components/navbar";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AstraQ Cyber Defence - AI-Powered Cybersecurity Solutions",
  description:
    "Enterprise-grade AI-powered cybersecurity solutions. Threat detection, incident response, and compliance management for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          spaceMono.variable,
          nunito.variable,
          "font-sans antialiased",
        )}
      >
        <main className="min-h-screen bg-background">
          <NavBar />
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
