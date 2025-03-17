import type React from "react"
import { PageTitleProvider } from "@/lib/PageTitleContext"

export default function MyRecipientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTitleProvider title="My Recipients" description="Manage your hour allocation recipients">
      {children}
    </PageTitleProvider>
  )
}

