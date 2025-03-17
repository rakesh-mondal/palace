"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalUserForm } from "@/components/ExternalUserForm"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ViewUserDetails } from "@/components/ViewUserDetails"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { MoreHorizontal, Mail, Phone } from "lucide-react"
import { StatisticsCard } from "@/components/StatisticsCard"
import { FilterExportToolbar } from "@/components/FilterExportToolbar"
import Image from "next/image"

interface ExternalUserPageProps {
  userType: "Developer" | "Operator" | "Corporate"
  initialUsers: any[]
  spaces: any[]
}

// const dummyUsers = [
//   {
//     id: "DEV00001",
//     name: "Swire Properties",
//     registeredAddress: "33/F, One Pacific Place, 88 Queensway, Hong Kong",
//     mobileNumber: "91234567",
//     email: "contact@swireproperties.com",
//     assignedSpaces: ["space1", "space2", "space3"],
//     status: "Active",
//     createdAt: "2023-01-15T09:30:00Z",
//     updatedAt: "2023-06-20T14:45:00Z",
//     type: "Premium Developer",
//     projectCount: 8,
//     associatedSpacesCount: 5,
//     logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&crop=center",
//     websiteUrl: "https://www.swireproperties.com",
//   },
//   {
//     id: "DEV00002",
//     name: "Future Systems Co",
//     registeredAddress: "456 Future Avenue, Hong Kong",
//     mobileNumber: "92345678",
//     email: "info@futuresystems.com",
//     assignedSpaces: ["space2", "space3"],
//     status: "Inactive",
//     createdAt: "2023-02-01T11:15:00Z",
//     updatedAt: "2023-07-05T16:30:00Z",
//     type: "Silver Partner",
//     projectCount: 3,
//     associatedSpacesCount: 2,
//     logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop&crop=center",
//     websiteUrl: "https://www.futuresystems.com",
//   },
//   {
//     id: "DEV00003",
//     name: "Smart Solutions HK",
//     registeredAddress: "789 Smart Road, Hong Kong",
//     mobileNumber: "93456789",
//     email: "contact@smartsolutionshk.com",
//     assignedSpaces: ["space1", "space3"],
//     status: "Active",
//     createdAt: "2023-03-10T13:45:00Z",
//     updatedAt: "2023-08-15T10:20:00Z",
//     type: "Bronze Partner",
//     projectCount: 2,
//     associatedSpacesCount: 2,
//     logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop&crop=center",
//     websiteUrl: "https://www.smartsolutionshk.com",
//   },
// ]

export function ExternalUserPage({ userType, initialUsers, spaces }: ExternalUserPageProps) {
  const [users, setUsers] = useState<any[]>(initialUsers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState<any | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All Statuses")

  const handleSubmit = (data: any) => {
    const timestamp = new Date().toISOString()
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...data, updatedAt: timestamp } : user)))
    } else {
      const newUser = {
        ...data,
        id: `${userType.substring(0, 3).toUpperCase()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        createdAt: timestamp,
        updatedAt: timestamp,
        associatedSpacesCount: data.assignedSpaces.length,
      }
      setUsers([...users, newUser])
    }
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleBulkDelete = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
    setIsDeleteDialogOpen(false)
  }

  const toggleUserSelection = (id: string) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]))
  }

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        Object.entries(user).some(
          ([key, value]) =>
            key !== "type" && typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
        ) &&
        (filterStatus === "All Statuses" || user.status === filterStatus),
    )
  }, [users, searchQuery, filterStatus])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const exportData = filteredUsers.map((user) => ({
    ID: user.id,
    Name: user.name,
    Email: user.email,
    Mobile: user.mobileNumber,
    Website: user.websiteUrl || "N/A",
    Status: user.status,
    "Associated Spaces": user.associatedSpacesCount,
  }))

  const statistics = [
    {
      title: `Total ${userType}s`,
      value: users.length,
      icon: "Users",
      color: "bg-blue-500",
    },
    {
      title: `Active ${userType}s`,
      value: users.filter((user) => user.status === "Active").length,
      icon: "UserCheck",
      color: "bg-green-500",
    },
    {
      title: "Assigned Spaces",
      value: users.reduce((sum, user) => sum + user.assignedSpaces.length, 0),
      icon: "LayoutGrid",
      color: "bg-purple-500",
    },
    {
      title: "Unique Spaces",
      value: [...new Set(users.flatMap((user) => user.assignedSpaces))].length,
      icon: "LayoutGrid",
      color: "bg-yellow-500",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <StatisticsCard statistics={statistics} />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">External {userType}s</h1>
      </div>

      <FilterExportToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        exportData={exportData}
        exportFilename={`external_${userType.toLowerCase()}s.csv`}
        selectedUsers={selectedUsers}
        onDeleteSelected={() => setIsDeleteDialogOpen(true)}
        onAddUser={() => setIsDialogOpen(true)}
        userType={userType}
      />

      {/* Remove this button
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" onClick={() => setEditingUser(null)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add {userType}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[715px] bg-white">
          <DialogHeader>
            <DialogTitle>{editingUser ? `Edit ${userType}` : `Add ${userType}`}</DialogTitle>
          </DialogHeader>
          <ExternalUserForm
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            initialData={editingUser}
            spaces={spaces}
            userType={userType}
          />
        </DialogContent>
      </Dialog>
      */}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[715px] bg-white">
          <DialogHeader>
            <DialogTitle>{editingUser ? `Edit ${userType}` : `Add ${userType}`}</DialogTitle>
          </DialogHeader>
          <ExternalUserForm
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            initialData={editingUser}
            spaces={spaces}
            userType={userType}
          />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>{userType}s List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={filteredUsers.every((user) => selectedUsers.includes(user.id))}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUsers(filteredUsers.map((user) => user.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>{userType}</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Assigned Spaces</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <Image src={user.logo || "/placeholder.svg"} alt={`${user.name} logo`} width={40} height={40} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{user.mobileNumber}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.websiteUrl ? (
                      <a
                        href={user.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {new URL(user.websiteUrl).hostname}
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{user.assignedSpaces.length}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            console.log("Opening user details:", user)
                            setViewingUser(user)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingUser(user)
                            setIsDialogOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUsers([user.id])
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected {userType.toLowerCase()}(s) and
              remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ViewUserDetails isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} user={viewingUser} />
    </div>
  )
}

