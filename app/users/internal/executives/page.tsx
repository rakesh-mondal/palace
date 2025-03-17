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

// Dummy data for executives
const dummyExecutives = [
  {
    userId: "EXE00001",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    mobileNumber: "+85296789012",
    status: "Active",
    role: "Executive",
    assignedSpaces: ["space1", "space2", "space3"],
    createdAt: "2023-01-05T08:30:00Z",
    updatedAt: "2023-06-15T14:20:00Z",
  },
  {
    userId: "EXE00002",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    mobileNumber: "+85297890123",
    status: "Active",
    role: "Executive",
    assignedSpaces: ["space1", "space2"],
    createdAt: "2023-02-10T10:45:00Z",
    updatedAt: "2023-07-20T11:30:00Z",
  },
  {
    userId: "EXE00003",
    firstName: "Carol",
    lastName: "Davis",
    email: "carol.davis@example.com",
    mobileNumber: "+85298901234",
    status: "Inactive",
    role: "Executive",
    assignedSpaces: ["space3"],
    createdAt: "2023-03-15T13:15:00Z",
    updatedAt: "2023-08-25T09:10:00Z",
  },
  {
    userId: "EXE00004",
    firstName: "Daniel",
    lastName: "Miller",
    email: "daniel.miller@example.com",
    mobileNumber: "+85299012345",
    status: "Active",
    role: "Executive",
    assignedSpaces: ["space1", "space3"],
    createdAt: "2023-04-20T09:00:00Z",
    updatedAt: "2023-09-05T16:45:00Z",
  },
  {
    userId: "EXE00005",
    firstName: "Eva",
    lastName: "Wilson",
    email: "eva.wilson@example.com",
    mobileNumber: "+85290123456",
    status: "Active",
    role: "Executive",
    assignedSpaces: ["space2"],
    createdAt: "2023-05-25T11:30:00Z",
    updatedAt: "2023-10-10T13:15:00Z",
  },
]

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState<any | null>(null)
  const [viewingExecutive, setViewingExecutive] = useState<any | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    // Initialize with dummy data
    setExecutives(dummyExecutives)
  }, [])

  const handleSubmit = (data: any) => {
    if (editingExecutive) {
      setExecutives(
        executives.map((executive) =>
          executive.userId === editingExecutive.userId ? { ...data, updatedAt: new Date().toISOString() } : executive,
        ),
      )
      setEditingExecutive(null)
    } else {
      const newExecutive = {
        ...data,
        userId: `EXE${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setExecutives([...executives, newExecutive])
    }
    setIsAdding(false)
  }

  const handleDelete = (userId: string) => {
    setExecutives(executives.filter((executive) => executive.userId !== userId))
    setViewingExecutive(null)
    setIsViewModalOpen(false)
  }

  const handleViewExecutive = (executive: any) => {
    setViewingExecutive(executive)
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
        <h1 className="text-2xl font-bold">Executives</h1>
      </div>
      <Button onClick={() => setIsAdding(true)} className="mb-4">
        Add Executive
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Executives List</CardTitle>
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
              {executives.map((executive) => (
                <TableRow key={executive.userId}>
                  <TableCell>{executive.userId}</TableCell>
                  <TableCell>
                    {executive.firstName} {executive.lastName}
                  </TableCell>
                  <TableCell>{executive.email}</TableCell>
                  <TableCell>{executive.mobileNumber}</TableCell>
                  <TableCell>{executive.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleViewExecutive(executive)} variant="outline" size="sm">
                        View
                      </Button>
                      <Button onClick={() => setEditingExecutive(executive)} variant="outline" size="sm">
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
        isOpen={isAdding || !!editingExecutive}
        onClose={() => {
          setIsAdding(false)
          setEditingExecutive(null)
        }}
        userData={editingExecutive}
        onSubmit={handleSubmit}
        spaces={spaces}
      />
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setViewingExecutive(null)
        }}
        user={viewingExecutive}
        onEdit={handleSubmit}
        onDelete={handleDelete}
        spaces={spaces}
        description="View and manage executive details"
      />
    </div>
  )
}

