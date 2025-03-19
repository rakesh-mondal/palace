import "@/styles/globals.css"
import type { ReactNode } from "react"
import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Hanken_Grotesk } from "next/font/google"
import Loading from "./loading"
import React from "react"

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken-grotesk",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable}`}>
      <head>
        <title>Palace Studio</title>
      </head>
      <body 
        suppressHydrationWarning
        className={`${hankenGrotesk.variable} font-sans flex flex-col h-screen overflow-hidden`}
      >
        <SidebarProvider>
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar className="hidden md:flex" />
            <div className="flex-1 flex flex-col overflow-hidden bg-background">
              <SidebarInset className="flex-1 flex flex-col overflow-auto bg-white">
                <React.Suspense fallback={<Loading />}>
                  <main className="flex-1">{children}</main>
                </React.Suspense>
              </SidebarInset>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
