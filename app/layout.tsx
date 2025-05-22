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
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-b from-black to-zinc-900 min-h-screen overflow-x-hidden`}
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
