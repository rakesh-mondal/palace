"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Upload, MoreHorizontal } from "lucide-react"
import { CorporateEmployeeDetailsModal } from "@/components/CorporateEmployeeDetailsModal"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
type RegistrationStatus = "Active" | "Inactive" | "Pending"

interface CorporateEmployee {
  userId: string
  fullName: string
  mobileNumber: string
  corporateAssociation: string
  registrationStatus: RegistrationStatus
  totalBookings: number
  lastBookingDate: string
  bookingCancellationRate: number
  email: string
  department: string
  position: string
  joinDate: string
  spacesAccessed: string[]
  createdAt: string
  updatedAt: string
}

// Dummy data
const dummyCorporateEmployees: CorporateEmployee[] = [
  {
    userId: "CE001",
    fullName: "John Smith",
    mobileNumber: "+852 9876 5432",
    corporateAssociation: "TechCorp Ltd.",
    registrationStatus: "Active",
    totalBookings: 15,
    lastBookingDate: "2023-06-15",
    bookingCancellationRate: 5,
    email: "john.smith@techcorp.com",
    department: "IT",
    position: "Senior Developer",
    joinDate: "2022-01-15",
    spacesAccessed: ["Gym A", "Meeting Room 1"],
    createdAt: "2023-01-01T09:00:00Z",
    updatedAt: "2023-06-15T14:30:00Z",
  },
  {
    userId: "CE002",
    fullName: "Emma Wong",
    mobileNumber: "+852 9765 4321",
    corporateAssociation: "FinanceHub Inc.",
    registrationStatus: "Active",
    totalBookings: 22,
    lastBookingDate: "2023-06-17",
    bookingCancellationRate: 0,
    email: "emma.wong@financehub.com",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "2021-11-01",
    spacesAccessed: ["Meeting Room 2", "Yoga Studio"],
    createdAt: "2022-12-15T10:30:00Z",
    updatedAt: "2023-06-17T16:45:00Z",
  },
  {
    userId: "CE003",
    fullName: "Michael Chan",
    mobileNumber: "+852 9654 3210",
    corporateAssociation: "MarketPro Co.",
    registrationStatus: "Inactive",
    totalBookings: 8,
    lastBookingDate: "2023-05-20",
    bookingCancellationRate: 12.5,
    email: "michael.chan@marketpro.com",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "2022-03-01",
    spacesAccessed: ["Conference Room A"],
    createdAt: "2023-02-01T11:15:00Z",
    updatedAt: "2023-05-20T09:20:00Z",
  },
  {
    userId: "CE004",
    fullName: "Sophia Lee",
    mobileNumber: "+852 9543 2109",
    corporateAssociation: "TechCorp Ltd.",
    registrationStatus: "Active",
    totalBookings: 30,
    lastBookingDate: "2023-06-18",
    bookingCancellationRate: 3.33,
    email: "sophia.lee@techcorp.com",
    department: "Human Resources",
    position: "HR Manager",
    joinDate: "2021-09-15",
    spacesAccessed: ["Meeting Room 1", "Gym A", "Yoga Studio"],
    createdAt: "2022-11-01T08:45:00Z",
    updatedAt: "2023-06-18T17:30:00Z",
  },
  {
    userId: "CE005",
    fullName: "David Lau",
    mobileNumber: "+852 9432 1098",
    corporateAssociation: "FinanceHub Inc.",
    registrationStatus: "Pending",
    totalBookings: 0,
    lastBookingDate: "",
    bookingCancellationRate: 0,
    email: "david.lau@financehub.com",
    department: "Operations",
    position: "Operations Analyst",
    joinDate: "2023-06-01",
    spacesAccessed: [],
    createdAt: "2023-06-01T09:00:00Z",
    updatedAt: "2023-06-01T09:00:00Z",
  },
  {
    userId: "CE006",
    fullName: "Grace Chen",
    mobileNumber: "+852 9321 0987",
    corporateAssociation: "MarketPro Co.",
    registrationStatus: "Active",
    totalBookings: 18,
    lastBookingDate: "2023-06-16",
    bookingCancellationRate: 5.56,
    email: "grace.chen@marketpro.com",
    department: "Sales",
    position: "Sales Representative",
    joinDate: "2022-07-01",
    spacesAccessed: ["Conference Room A", "Meeting Room 2"],
    createdAt: "2023-01-15T13:20:00Z",
    updatedAt: "2023-06-16T15:10:00Z",
  },
  {
    userId: "CE007",
    fullName: "Alex Yeung",
    mobileNumber: "+852 9210 9876",
    corporateAssociation: "TechCorp Ltd.",
    registrationStatus: "Active",
    totalBookings: 25,
    lastBookingDate: "2023-06-18",
    bookingCancellationRate: 4,
    email: "alex.yeung@techcorp.com",
    department: "IT",
    position: "System Administrator",
    joinDate: "2022-02-15",
    spacesAccessed: ["Gym A", "Meeting Room 1", "Conference Room A"],
    createdAt: "2023-02-20T10:00:00Z",
    updatedAt: "2023-06-18T18:45:00Z",
  },
  {
    userId: "CE008",
    fullName: "Olivia Tam",
    mobileNumber: "+852 9109 8765",
    corporateAssociation: "FinanceHub Inc.",
    registrationStatus: "Inactive",
    totalBookings: 12,
    lastBookingDate: "2023-05-30",
    bookingCancellationRate: 8.33,
    email: "olivia.tam@financehub.com",
    department: "Finance",
    position: "Accountant",
    joinDate: "2022-04-01",
    spacesAccessed: ["Meeting Room 2"],
    createdAt: "2023-03-01T09:30:00Z",
    updatedAt: "2023-05-30T16:20:00Z",
  },
  {
    userId: "CE009",
    fullName: "Daniel Wong",
    mobileNumber: "+852 9098 7654",
    corporateAssociation: "MarketPro Co.",
    registrationStatus: "Active",
    totalBookings: 20,
    lastBookingDate: "2023-06-17",
    bookingCancellationRate: 5,
    email: "daniel.wong@marketpro.com",
    department: "Marketing",
    position: "Content Strategist",
    joinDate: "2022-08-15",
    spacesAccessed: ["Conference Room A", "Yoga Studio"],
    createdAt: "2023-01-10T11:45:00Z",
    updatedAt: "2023-06-17T14:30:00Z",
  },
  {
    userId: "CE010",
    fullName: "Emily Cheung",
    mobileNumber: "+852 9987 6543",
    corporateAssociation: "TechCorp Ltd.",
    registrationStatus: "Active",
    totalBookings: 28,
    lastBookingDate: "2023-06-18",
    bookingCancellationRate: 3.57,
    email: "emily.cheung@techcorp.com",
    department: "Product",
    position: "Product Manager",
    joinDate: "2021-12-01",
    spacesAccessed: ["Meeting Room 1", "Conference Room A", "Gym A"],
    createdAt: "2022-12-05T08:15:00Z",
    updatedAt: "2023-06-18T19:00:00Z",
  },
]

export default function CorporateEmployeesListPage() {
  const [employees, setEmployees] = useState<CorporateEmployee[]>(dummyCorporateEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState<CorporateEmployee[]>(dummyCorporateEmployees)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | "All">("All")
  const [selectedEmployee, setSelectedEmployee] = useState<CorporateEmployee | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null)

  const filterEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.mobileNumber.includes(searchQuery) ||
        employee.corporateAssociation.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "All" || employee.registrationStatus === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [employees, searchQuery, statusFilter])

  useMemo(() => {
    setFilteredEmployees(filterEmployees)
    setCurrentPage(1)
  }, [filterEmployees])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  const handleDeleteEmployee = (userId: string) => {
    setEmployeeToDelete(userId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteEmployee = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter((employee) => employee.userId !== employeeToDelete))
      setIsDeleteDialogOpen(false)
      setEmployeeToDelete(null)
      toast({
        title: "Employee Removed",
        description: "The employee has been successfully removed from the system.",
      })
    }
  }

  const handleDownloadTemplate = () => {
    const headers = ["Full Name", "Mobile Number", "Email", "Department", "Position", "Join Date"]
    const csvContent = [
      headers.join(","),
      "John Doe,+852 1234 5678,john.doe@example.com,IT,Software Engineer,2023-07-01",
      "Jane Smith,+852 9876 5432,jane.smith@example.com,HR,HR Manager,2023-07-02",
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "employee_template.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    toast({
      title: "Template Downloaded",
      description: "The employee list template has been downloaded.",
    })
  }

  const handleUploadEmployeeList = (event: React.ChangeEvent<HTMLInputElement>) => {
    // In a real application, this would process the uploaded Excel file
    // For this example, we'll just show a toast notification
    if (event.target.files && event.target.files[0]) {
      toast({
        title: "File Uploaded",
        description: "The employee list has been uploaded successfully.",
      })
    }
  }

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Corporate Employees List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1 min-w-[200px] max-w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as RegistrationStatus | "All")}
            >
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
            <Button variant="outline" size="sm" onClick={() => document.getElementById("upload-input")?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Employee List
            </Button>
            <input
              id="upload-input"
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleUploadEmployeeList}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Corporate Association</TableHead>
                <TableHead>Registration Status</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Last Booking Date</TableHead>
                <TableHead>Cancellation Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.map((employee) => (
                <TableRow key={employee.userId}>
                  <TableCell>{employee.userId}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.mobileNumber}</TableCell>
                  <TableCell>{employee.corporateAssociation}</TableCell>
                  <TableCell>{getStatusBadge(employee.registrationStatus)}</TableCell>
                  <TableCell>{employee.totalBookings}</TableCell>
                  <TableCell>{employee.lastBookingDate || "N/A"}</TableCell>
                  <TableCell>{employee.bookingCancellationRate}%</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteEmployee(employee.userId)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of{" "}
              {filteredEmployees.length} employees
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink onClick={() => paginate(page)} isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      {selectedEmployee && (
        <CorporateEmployeeDetailsModal
          employee={selectedEmployee}
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the employee from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteEmployee}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

