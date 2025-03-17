import type React from "react"
import { PageTitleProvider } from "@/lib/PageTitleContext"

export default function CalendarViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTitleProvider title="Calendar View">
      <div className="h-full">{children}</div>
    </PageTitleProvider>
  )
}

