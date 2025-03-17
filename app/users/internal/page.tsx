"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InternalUserForm } from "@/components/InternalUserForm"
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
import { Search, Download, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatisticsCard } from "@/components/StatisticsCard"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CSVLink } from "react-csv"

export const dynamic = "force-dynamic"

// Mock data for spaces
const spaces = [
  { id: "space1", name: "Yoga Studio A", type: "Studio", capacity: 20 },
  { id: "space2", name: "Gym Space B", type: "Gym", capacity: 50 },
  { id: "space3", name: "Multi-purpose Room C", type: "Multi-purpose", capacity: 30 },
]

// Dummy data for managers and executives
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

export default function InternalUsersPage() {
  const [managers, setManagers] = useState<any[]>([])
  const [executives, setExecutives] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [viewingUser, setViewingUser] = useState<any | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("managers")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const handleBulkDelete = () => {
    setManagers(managers.filter((manager) => !selectedUsers.includes(manager.userId)))
    setExecutives(executives.filter((executive) => !selectedUsers.includes(executive.userId)))
    setSelectedUsers([])
    setIsDeleteDialogOpen(false)
  }

  useEffect(() => {
    // Initialize with dummy data
    setManagers(dummyManagers)
    setExecutives(dummyExecutives)
  }, [])

  const handleAddUser = (userData: any) => {
    const newUser = {
      ...userData,
      userId: userData.userId || `USR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    if (newUser.role === "Manager") {
      setManagers([...managers, newUser])
    } else if (newUser.role === "Executive") {
      setExecutives([...executives, newUser])
    }
    setIsDialogOpen(false)
  }

  const handleEditUser = (userData: any) => {
    const updatedUser = {
      ...userData,
      updatedAt: new Date().toISOString(),
    }
    if (updatedUser.role === "Manager") {
      setManagers(managers.map((manager) => (manager.userId === updatedUser.userId ? updatedUser : manager)))
    } else if (updatedUser.role === "Executive") {
      setExecutives(executives.map((executive) => (executive.userId === updatedUser.userId ? updatedUser : executive)))
    }
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const openEditDialog = (user: any) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    setManagers(managers.filter((manager) => manager.userId !== userId))
    setExecutives(executives.filter((executive) => executive.userId !== userId))
    setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    setIsDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId) ? prevSelected.filter((id) => id !== userId) : [...prevSelected, userId],
    )
  }

  const openViewDialog = (user: any) => {
    setViewingUser(user)
    setIsViewDialogOpen(true)
  }

  const filteredUsers = useMemo(() => {
    const users = activeTab === "managers" ? managers : executives
    return users.filter((user) =>
      Object.values(user).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [managers, executives, searchQuery, activeTab])

  const paginatedUsers = useMemo(() => {
    const filtered =
      filterStatus && filterStatus !== "All Statuses"
        ? filteredUsers.filter((user) => user.status === filterStatus)
        : filteredUsers
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredUsers, filterStatus, currentPage, itemsPerPage])

  const totalPages = Math.ceil(
    (filterStatus && filterStatus !== "All Statuses"
      ? filteredUsers.filter((user) => user.status === filterStatus).length
      : filteredUsers.length) / itemsPerPage,
  )

  const statistics = [
    { title: "Total Users", value: filteredUsers.length, icon: "Users", color: "bg-blue-500" },
    {
      title: "Active Users",
      value: filteredUsers.filter((user) => user.status === "Active").length,
      icon: "UserCheck",
      color: "bg-green-500",
    },
    { title: "Managers", value: managers.length, icon: "Users", color: "bg-purple-500" },
    { title: "Executives", value: executives.length, icon: "Users", color: "bg-yellow-500" },
  ]

  const handleExport = () => {
    const csvData = filteredUsers.map((user) => ({
      ID: user.userId,
      Name: `${user.firstName} ${user.lastName}`,
      Email: user.email,
      Role: user.role,
      Status: user.status,
    }))
    return csvData
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const renderUserTable = (users: any[]) => (
    <Table aria-label={`${activeTab === "managers" ? "Managers" : "Executives"} list`}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox
              checked={users.every((user) => selectedUsers.includes(user.userId))}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedUsers([...selectedUsers, ...users.map((user) => user.userId)])
                } else {
                  setSelectedUsers(selectedUsers.filter((id) => !users.some((user) => user.userId === id)))
                }
              }}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedUsers.map((user) => (
          <TableRow key={user.userId} className="hover:bg-gray-50">
            <TableCell>
              <Checkbox
                checked={selectedUsers.includes(user.userId)}
                onCheckedChange={() => toggleUserSelection(user.userId)}
              />
            </TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobileNumber}</TableCell>
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
                  <DropdownMenuItem onClick={() => openViewDialog(user)}>View details</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEditDialog(user)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setUserToDelete(user.userId)
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
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Internal Users</h1>
      </div>

      <StatisticsCard statistics={statistics} />

      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        {selectedUsers.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsDeleteDialogOpen(true)}
            aria-label={`Delete ${selectedUsers.length} selected users`}
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected ({selectedUsers.length})
          </Button>
        )}
        <Select value={filterStatus || "All Statuses"} onValueChange={(value) => setFilterStatus(value)}>
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <CSVLink data={handleExport()} filename="internal_users.csv">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </CSVLink>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              onClick={() => setEditingUser(null)}
              className="flex items-center gap-2"
              aria-label="Add new internal user"
            >
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[715px] bg-white">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit Internal User" : "Add Internal User"}</DialogTitle>
            </DialogHeader>
            <InternalUserForm
              onSubmit={editingUser ? handleEditUser : handleAddUser}
              onCancel={() => setIsDialogOpen(false)}
              initialData={editingUser}
              spaces={spaces}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            aria-label="Internal users categories"
          >
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="managers" className="flex-1" aria-label="Managers tab">
                Managers
              </TabsTrigger>
              <TabsTrigger value="executives" className="flex-1" aria-label="Executives tab">
                Executives
              </TabsTrigger>
            </TabsList>
            <div className="p-4">
              <TabsContent value="managers">{renderUserTable(managers)}</TabsContent>
              <TabsContent value="executives">{renderUserTable(executives)}</TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected user(s) and remove their data from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ViewUserDetails isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} user={viewingUser} />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[70px] h-9">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

