import type { Metadata } from "next";
import './globals.css'
import { JetBrains_Mono } from "next/font/google"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono"
})

export const metadata: Metadata = {
  title: "AKD Dashboard Center",
  icons: "/favicon.png",
  description: "Welcome to AKD Dashboard Center. This Dashboard Optimized Reporting & Centralize Data for Mining Process",
  metadataBase: new URL('https://adisarana.id'),
  openGraph: {
    type: "website",
    url: "https://adisarana.id",
    title: "AKD Dashboard Center",
    description: "Welcome to AKD Dashboard Center. This Dashboard Optimized Reporting & Centralize Data for Mining Process",
    siteName: "Dashboard Center",
    images: 'https://raw.githubusercontent.com/rozy97/akd-dashboard-center/refs/heads/main/public/capture-main.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} antialiased`}>{children}</body>
    </html>
  )
}

