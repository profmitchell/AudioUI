import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteSidebar } from "@/components/site-sidebar"
import { TopNav } from "@/components/top-nav"
import { LayoutProvider } from "@/components/layout-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "AudioUI - Modern Audio Interface Components",
  description: "Create beautiful, responsive audio interface components for the web",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="AudioUI" />
        <meta name="apple-mobile-web-app-title" content="AudioUI" />
        <link rel="icon" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-startup-image" href="/splash.png" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-b from-black to-zinc-900 min-h-screen overflow-x-hidden no-horizontal-scroll`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LayoutProvider>
            <div className="flex min-h-screen w-full">
              <SiteSidebar />
              <div className="flex-1 flex flex-col items-center">
                <TopNav />
                <main className="pt-14 px-6 md:px-8 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center">{children}</main>
              </div>
            </div>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
