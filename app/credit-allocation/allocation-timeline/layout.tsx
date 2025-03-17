import type React from "react"
import { PageTitleProvider } from "@/lib/PageTitleContext"

export default function AllocationTimelineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTitleProvider
      title="Allocation Timeline"
      description="View and analyze the chronological flow of hour allocations"
    >
      {children}
    </PageTitleProvider>
  )
}

