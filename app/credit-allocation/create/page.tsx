"use client"

import { CreateAllocationForm } from "./CreateAllocationForm"
import { useRouter } from "next/navigation"

export default function CreateAllocationPage() {
  const router = useRouter()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Allocation</h2>
          <p className="text-muted-foreground">
            Create a new credit allocation for a recipient.
          </p>
        </div>
      </div>
      <div className="rounded-md border p-6">
        <CreateAllocationForm onSuccess={() => router.push("/credit-allocation")} />
      </div>
    </div>
  )
} 