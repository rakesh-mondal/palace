"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { EditSidebar } from "@/components/EditSidebar"
import { ViewUserModal } from "@/components/ViewUserModal"
import Link from "next/link"

// Note: This component doesn't use any console.log statements.
// For production, consider implementing proper error logging and handling.
// Example:
// - Use a logging service for critical errors
// - Implement user-friendly error messages for UI
// - Add error boundaries to catch and display errors gracefully

// Mock data for spaces
const spaces = [
  { id: "space1", name: "Space 1" },
  { id: "space2", name: "Space 2" },
  { id: "space3", name: "Space 3" },
]

// Dummy data for managers
const dummyManagers = [
  {
    userId: "MGR00001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobileNumber: "+85291234567",
    status: "Active",
    role: "Manager",
    assignedSpaces: ["space1", "space2"],
    createdAt: "2023-01-15T09:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
  },
  {
    userId: "MGR00002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    mobileNumber: "+85292345678",
    status: "Active",
    role: "Manager",
    assignedSpaces: ["space2", "space3"],
    createdAt: "2023-02-01T11:15:00Z",
    updatedAt: "2023-07-05T16:30:00Z",
  },
  {
    userId: "MGR00003",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    mobileNumber: "+85293456789",
    status: "Inactive",
    role: "Manager",
    assignedSpaces: ["space1"],
    createdAt: "2023-03-10T13:45:00Z",
    updatedAt: "2023-08-15T10:20:00Z",
  },
  {
    userId: "MGR00004",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    mobileNumber: "+85294567890",
    status: "Active",
    role: "Manager",
    assignedSpaces: ["space3"],
    createdAt: "2023-04-05T08:30:00Z",
    updatedAt: "2023-09-01T15:10:00Z",
  },
  {
    userId: "MGR00005",
    firstName: "David",
    lastName: "Lee",
    email: "david.lee@example.com",
    mobileNumber: "+85295678901",
    status: "Active",
    role: "Manager",
    assignedSpaces: ["space1", "space2", "space3"],
    createdAt: "2023-05-20T10:00:00Z",
    updatedAt: "2023-10-10T09:45:00Z",
  },
]

export default function ManagersPage() {
  const [managers, setManagers] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingManager, setEditingManager] = useState<any | null>(null)
  const [viewingManager, setViewingManager] = useState<any | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    // Initialize with dummy data
    setManagers(dummyManagers)
  }, [])

  const handleSubmit = (data: any) => {
    if (editingManager) {
      setManagers(
        managers.map((manager) =>
          manager.userId === editingManager.userId ? { ...data, updatedAt: new Date().toISOString() } : manager,
        ),
      )
      setEditingManager(null)
    } else {
      const newManager = {
        ...data,
        userId: `MGR${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setManagers([...managers, newManager])
    }
    setIsAdding(false)
  }

  const handleDelete = (userId: string) => {
    setManagers(managers.filter((manager) => manager.userId !== userId))
    setViewingManager(null)
    setIsViewModalOpen(false)
  }

  const handleViewManager = (manager: any) => {
    setViewingManager(manager)
    setIsViewModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link
          href="/users/internal"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back to Internal Users
        </Link>
        <h1 className="text-2xl font-bold">Managers</h1>
      </div>
      <Button onClick={() => setIsAdding(true)} className="mb-4">
        Add Manager
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Managers List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {managers.map((manager) => (
                <TableRow key={manager.userId}>
                  <TableCell>{manager.userId}</TableCell>
                  <TableCell>
                    {manager.firstName} {manager.lastName}
                  </TableCell>
                  <TableCell>{manager.email}</TableCell>
                  <TableCell>{manager.mobileNumber}</TableCell>
                  <TableCell>{manager.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleViewManager(manager)} variant="outline" size="sm">
                        View
                      </Button>
                      <Button onClick={() => setEditingManager(manager)} variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <EditSidebar
        isOpen={isAdding || !!editingManager}
        onClose={() => {
          setIsAdding(false)
          setEditingManager(null)
        }}
        userData={editingManager}
        onSubmit={handleSubmit}
        spaces={spaces}
      />
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setViewingManager(null)
        }}
        user={viewingManager}
        onEdit={handleSubmit}
        onDelete={handleDelete}
        spaces={spaces}
        description="View and manage manager details"
      />
    </div>
  )
}

