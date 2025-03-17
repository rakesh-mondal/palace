"use client"

import { useState } from "react"
import { InternalUserForm } from "@/components/InternalUserForm"
import { Button } from "@/components/ui/button"

// Mock data for spaces
const spaces = [
  { id: "space1", name: "Space 1" },
  { id: "space2", name: "Space 2" },
  { id: "space3", name: "Space 3" },
]

export default function OwnersPage() {
  const [owners, setOwners] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingOwner, setEditingOwner] = useState<any | null>(null)

  const handleSubmit = (data: any) => {
    if (editingOwner) {
      setOwners(
        owners.map((owner) => (owner.userId === editingOwner.userId ? { ...data, updatedAt: new Date() } : owner)),
      )
      setEditingOwner(null)
    } else {
      setOwners([...owners, { ...data, createdAt: new Date(), updatedAt: new Date() }])
    }
    setIsAdding(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Owners</h1>
      {!isAdding && !editingOwner && (
        <Button onClick={() => setIsAdding(true)} className="mb-4">
          Add Owner
        </Button>
      )}
      {(isAdding || editingOwner) && (
        <InternalUserForm onSubmit={handleSubmit} initialData={editingOwner || { role: "Owner" }} spaces={spaces} />
      )}
      <div className="space-y-4">
        {owners.map((owner) => (
          <div key={owner.userId} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">
              {owner.firstName} {owner.lastName}
            </h2>
            <p>Email: {owner.email}</p>
            <p>Mobile: {owner.mobileNumber}</p>
            <p>Status: {owner.status}</p>
            <Button onClick={() => setEditingOwner(owner)} className="mt-2">
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

