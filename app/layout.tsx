import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RideHub - Premium Car & Bike Rentals",
    template: "%s | RideHub"
  },
  description: "Rent premium cars and bikes at the best prices. Book your ride today with RideHub - your trusted vehicle rental partner.",
  keywords: ["car rental", "bike rental", "vehicle rental", "rent a car", "rent a bike", "affordable rentals"],
  authors: [{ name: "RideHub" }],
  creator: "RideHub",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    title: "RideHub - Premium Car & Bike Rentals",
    description: "Rent premium cars and bikes at the best prices. Book your ride today with RideHub.",
    siteName: "RideHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "RideHub - Premium Car & Bike Rentals",
    description: "Rent premium cars and bikes at the best prices. Book your ride today with RideHub.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
