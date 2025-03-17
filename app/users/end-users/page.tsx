"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { UserDetailsModal } from "@/components/UserDetailsModal"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Types
type UserType = "Public" | "Corporate" | "Employee"
type UserStatus = "Active" | "Inactive" | "Flagged"

interface EndUser {
  userId: string
  fullName: string
  mobileNumber: string
  email: string
  corporateAssociations: string[]
  userType: UserType
  status: UserStatus
  totalBookings: number
  lastBookingDate: string
  upcomingBookings: Array<{ space: string; date: string; time: string; type: string }>
  trainerPackages: Array<{ trainerName: string; packageDetails: string }>
  spacePackages: Array<{ packageDetails: string }>
  freeTrials: boolean
  vipStatus: boolean
  totalPaymentSummary: number
  outstandingDues: number
  bookingCancellationRate: number
  spacesAccessed: string[]
  createdAt: string
  updatedAt: string
}

// Mock data
const mockUsers: EndUser[] = [
  {
    userId: "123e4567-e89b-12d3-a456-426614174000",
    fullName: "John Doe",
    mobileNumber: "12345678",
    email: "john.doe@example.com",
    corporateAssociations: ["Acme Corp"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 15,
    lastBookingDate: "2023-06-15T10:30:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-20", time: "14:00", type: "1-1 training" }],
    trainerPackages: [{ trainerName: "Jane Smith", packageDetails: "10 sessions" }],
    spacePackages: [{ packageDetails: "Monthly Gym Access" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 1500.0,
    outstandingDues: 0,
    bookingCancellationRate: 5,
    spacesAccessed: ["Gym A", "Yoga Studio B"],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
  },
  {
    userId: "223e4567-e89b-12d3-a456-426614174001",
    fullName: "Jane Smith",
    mobileNumber: "23456789",
    email: "jane.smith@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 8,
    lastBookingDate: "2023-06-10T15:45:00Z",
    upcomingBookings: [{ space: "Yoga Studio B", date: "2023-06-22", time: "09:00", type: "Group class" }],
    trainerPackages: [],
    spacePackages: [{ packageDetails: "10 Class Pass" }],
    freeTrials: true,
    vipStatus: false,
    totalPaymentSummary: 800.0,
    outstandingDues: 50.0,
    bookingCancellationRate: 2,
    spacesAccessed: ["Yoga Studio B"],
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-06-10T15:45:00Z",
  },
  {
    userId: "323e4567-e89b-12d3-a456-426614174002",
    fullName: "Bob Johnson",
    mobileNumber: "34567890",
    email: "bob.johnson@example.com",
    corporateAssociations: ["TechCorp"],
    userType: "Corporate",
    status: "Inactive",
    totalBookings: 20,
    lastBookingDate: "2023-05-20T11:00:00Z",
    upcomingBookings: [],
    trainerPackages: [{ trainerName: "Mike Brown", packageDetails: "5 sessions" }],
    spacePackages: [],
    freeTrials: false,
    vipStatus: false,
    totalPaymentSummary: 2000.0,
    outstandingDues: 200.0,
    bookingCancellationRate: 10,
    spacesAccessed: ["Gym A", "Pool C"],
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-05-20T11:00:00Z",
  },
  {
    userId: "423e4567-e89b-12d3-a456-426614174003",
    fullName: "Alice Williams",
    mobileNumber: "45678901",
    email: "alice.williams@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 30,
    lastBookingDate: "2023-06-18T17:30:00Z",
    upcomingBookings: [{ space: "Pool C", date: "2023-06-25", time: "16:00", type: "Lap swimming" }],
    trainerPackages: [{ trainerName: "Sarah Lee", packageDetails: "20 sessions" }],
    spacePackages: [{ packageDetails: "Annual Membership" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 3000.0,
    outstandingDues: 0,
    bookingCancellationRate: 1,
    spacesAccessed: ["Gym A", "Yoga Studio B", "Pool C"],
    createdAt: "2022-12-01T00:00:00Z",
    updatedAt: "2023-06-18T17:30:00Z",
  },
  {
    userId: "523e4567-e89b-12d3-a456-426614174004",
    fullName: "Charlie Brown",
    mobileNumber: "56789012",
    email: "charlie.brown@example.com",
    corporateAssociations: ["HealthCo"],
    userType: "Employee",
    status: "Active",
    totalBookings: 12,
    lastBookingDate: "2023-06-16T08:00:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-23", time: "07:00", type: "Personal training" }],
    trainerPackages: [{ trainerName: "David Wilson", packageDetails: "15 sessions" }],
    spacePackages: [],
    freeTrials: false,
    vipStatus: false,
    totalPaymentSummary: 1200.0,
    outstandingDues: 0,
    bookingCancellationRate: 0,
    spacesAccessed: ["Gym A"],
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-06-16T08:00:00Z",
  },
  {
    userId: "623e4567-e89b-12d3-a456-426614174005",
    fullName: "Diana Martinez",
    mobileNumber: "67890123",
    email: "diana.martinez@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Flagged",
    totalBookings: 5,
    lastBookingDate: "2023-06-05T14:15:00Z",
    upcomingBookings: [],
    trainerPackages: [],
    spacePackages: [{ packageDetails: "5 Class Pass" }],
    freeTrials: true,
    vipStatus: false,
    totalPaymentSummary: 250.0,
    outstandingDues: 100.0,
    bookingCancellationRate: 20,
    spacesAccessed: ["Yoga Studio B"],
    createdAt: "2023-05-01T00:00:00Z",
    updatedAt: "2023-06-05T14:15:00Z",
  },
  {
    userId: "723e4567-e89b-12d3-a456-426614174006",
    fullName: "Ethan Hunt",
    mobileNumber: "78901234",
    email: "ethan.hunt@example.com",
    corporateAssociations: ["SpyTech"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 25,
    lastBookingDate: "2023-06-17T20:00:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-24", time: "19:00", type: "Strength training" }],
    trainerPackages: [{ trainerName: "Frank Castle", packageDetails: "Unlimited sessions" }],
    spacePackages: [{ packageDetails: "Premium Membership" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 5000.0,
    outstandingDues: 0,
    bookingCancellationRate: 0,
    spacesAccessed: ["Gym A", "Pool C", "Yoga Studio B"],
    createdAt: "2022-11-15T00:00:00Z",
    updatedAt: "2023-06-17T20:00:00Z",
  },
  {
    userId: "823e4567-e89b-12d3-a456-426614174007",
    fullName: "Fiona Gallagher",
    mobileNumber: "89012345",
    email: "fiona.gallagher@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 18,
    lastBookingDate: "2023-06-14T10:30:00Z",
    upcomingBookings: [{ space: "Yoga Studio B", date: "2023-06-21", time: "18:00", type: "Hot yoga" }],
    trainerPackages: [],
    spacePackages: [{ packageDetails: "Monthly Yoga Pass" }],
    freeTrials: false,
    vipStatus: false,
    totalPaymentSummary: 900.0,
    outstandingDues: 0,
    bookingCancellationRate: 5,
    spacesAccessed: ["Yoga Studio B"],
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2023-06-14T10:30:00Z",
  },
  {
    userId: "923e4567-e89b-12d3-a456-426614174008",
    fullName: "George Costanza",
    mobileNumber: "90123456",
    email: "george.costanza@example.com",
    corporateAssociations: ["Vandelay Industries"],
    userType: "Corporate",
    status: "Inactive",
    totalBookings: 3,
    lastBookingDate: "2023-04-01T16:45:00Z",
    upcomingBookings: [],
    trainerPackages: [],
    spacePackages: [],
    freeTrials: true,
    vipStatus: false,
    totalPaymentSummary: 150.0,
    outstandingDues: 150.0,
    bookingCancellationRate: 33,
    spacesAccessed: ["Gym A"],
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2023-04-01T16:45:00Z",
  },
  {
    userId: "023e4567-e89b-12d3-a456-426614174009",
    fullName: "Holly Golightly",
    mobileNumber: "01234567",
    email: "holly.golightly@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 22,
    lastBookingDate: "2023-06-18T09:15:00Z",
    upcomingBookings: [{ space: "Pool C", date: "2023-06-25", time: "10:00", type: "Aqua aerobics" }],
    trainerPackages: [{ trainerName: "Ian Fleming", packageDetails: "8 sessions" }],
    spacePackages: [{ packageDetails: "Quarterly Membership" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 2200.0,
    outstandingDues: 0,
    bookingCancellationRate: 4,
    spacesAccessed: ["Pool C", "Gym A"],
    createdAt: "2022-12-10T00:00:00Z",
    updatedAt: "2023-06-18T09:15:00Z",
  },
  {
    userId: "123e4567-e89b-12d3-a456-426614174010",
    fullName: "Ian Malcolm",
    mobileNumber: "12345678",
    email: "ian.malcolm@example.com",
    corporateAssociations: ["Jurassic Industries"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 17,
    lastBookingDate: "2023-06-16T13:00:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-23", time: "14:00", type: "Cardio session" }],
    trainerPackages: [{ trainerName: "Jeff Goldblum", packageDetails: "12 sessions" }],
    spacePackages: [],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 1700.0,
    outstandingDues: 0,
    bookingCancellationRate: 0,
    spacesAccessed: ["Gym A", "Yoga Studio B"],
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-06-16T13:00:00Z",
  },
  {
    userId: "223e4567-e89b-12d3-a456-426614174011",
    fullName: "Julia Child",
    mobileNumber: "23456789",
    email: "julia.child@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 10,
    lastBookingDate: "2023-06-15T11:30:00Z",
    upcomingBookings: [{ space: "Yoga Studio B", date: "2023-06-22", time: "10:00", type: "Beginner's yoga" }],
    trainerPackages: [],
    spacePackages: [{ packageDetails: "10 Class Pass" }],
    freeTrials: false,
    vipStatus: false,
    totalPaymentSummary: 500.0,
    outstandingDues: 0,
    bookingCancellationRate: 10,
    spacesAccessed: ["Yoga Studio B"],
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2023-06-15T11:30:00Z",
  },
  {
    userId: "323e4567-e89b-12d3-a456-426614174012",
    fullName: "Keanu Reeves",
    mobileNumber: "34567890",
    email: "keanu.reeves@example.com",
    corporateAssociations: ["Matrix Corp"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 50,
    lastBookingDate: "2023-06-18T18:00:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-25", time: "17:00", type: "Martial arts training" }],
    trainerPackages: [{ trainerName: "Laurence Fishburne", packageDetails: "25 sessions" }],
    spacePackages: [{ packageDetails: "Annual Premium Membership" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 5000.0,
    outstandingDues: 0,
    bookingCancellationRate: 0,
    spacesAccessed: ["Gym A", "Yoga Studio B", "Pool C"],
    createdAt: "2022-10-01T00:00:00Z",
    updatedAt: "2023-06-18T18:00:00Z",
  },
  {
    userId: "423e4567-e89b-12d3-a456-426614174013",
    fullName: "Luna Lovegood",
    mobileNumber: "45678901",
    email: "luna.lovegood@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 15,
    lastBookingDate: "2023-06-17T14:30:00Z",
    upcomingBookings: [{ space: "Yoga Studio B", date: "2023-06-24", time: "09:00", type: "Meditation class" }],
    trainerPackages: [],
    spacePackages: [{ packageDetails: "Monthly Yoga Pass" }],
    freeTrials: true,
    vipStatus: false,
    totalPaymentSummary: 750.0,
    outstandingDues: 0,
    bookingCancellationRate: 6,
    spacesAccessed: ["Yoga Studio B"],
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2023-06-17T14:30:00Z",
  },
  {
    userId: "523e4567-e89b-12d3-a456-426614174014",
    fullName: "Marty McFly",
    mobileNumber: "56789012",
    email: "marty.mcfly@example.com",
    corporateAssociations: ["Time Travel Inc"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 88,
    lastBookingDate: "2023-06-18T16:00:00Z",
    upcomingBookings: [{ space: "Pool C", date: "2023-06-21", time: "15:00", type: "Swim practice" }],
    trainerPackages: [{ trainerName: "Doc Brown", packageDetails: "Unlimited sessions" }],
    spacePackages: [{ packageDetails: "Lifetime Membership" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 8800.0,
    outstandingDues: 0,
    bookingCancellationRate: 1,
    spacesAccessed: ["Gym A", "Pool C", "Yoga Studio B"],
    createdAt: "2022-07-03T00:00:00Z",
    updatedAt: "2023-06-18T16:00:00Z",
  },
  {
    userId: "623e4567-e89b-12d3-a456-426614174015",
    fullName: "Nemo Fish",
    mobileNumber: "67890123",
    email: "nemo.fish@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Active",
    totalBookings: 30,
    lastBookingDate: "2023-06-18T11:00:00Z",
    upcomingBookings: [{ space: "Pool C", date: "2023-06-20", time: "10:00", type: "Swimming lesson" }],
    trainerPackages: [{ trainerName: "Dory Blue", packageDetails: "20 sessions" }],
    spacePackages: [{ packageDetails: "Quarterly Pool Pass" }],
    freeTrials: false,
    vipStatus: false,
    totalPaymentSummary: 1500.0,
    outstandingDues: 0,
    bookingCancellationRate: 3,
    spacesAccessed: ["Pool C"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-06-18T11:00:00Z",
  },
  {
    userId: "723e4567-e89b-12d3-a456-426614174016",
    fullName: "Olivia Benson",
    mobileNumber: "78901234",
    email: "olivia.benson@example.com",
    corporateAssociations: ["NYPD Fitness"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 40,
    lastBookingDate: "2023-06-18T05:30:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-19", time: "05:30", type: "Strength training" }],
    trainerPackages: [{ trainerName: "Elliot Stabler", packageDetails: "30 sessions" }],
    spacePackages: [],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 4000.0,
    outstandingDues: 0,
    bookingCancellationRate: 0,
    spacesAccessed: ["Gym A", "Pool C"],
    createdAt: "2022-11-20T00:00:00Z",
    updatedAt: "2023-06-18T05:30:00Z",
  },
  {
    userId: "823e4567-e89b-12d3-a456-426614174017",
    fullName: "Peter Parker",
    mobileNumber: "89012345",
    email: "peter.parker@example.com",
    corporateAssociations: ["Daily Bugle"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 25,
    lastBookingDate: "2023-06-17T20:00:00Z",
    upcomingBookings: [{ space: "Gym A", date: "2023-06-20", time: "22:00", type: "Late night workout" }],
    trainerPackages: [],
    spacePackages: [{ packageDetails: "Flexible Hours Membership" }],
    freeTrials: false,
    vipStatus: false,
    totalPaymentSummary: 1250.0,
    outstandingDues: 0,
    bookingCancellationRate: 8,
    spacesAccessed: ["Gym A", "Yoga Studio B"],
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-06-17T20:00:00Z",
  },
  {
    userId: "923e4567-e89b-12d3-a456-426614174018",
    fullName: "Quentin Tarantino",
    mobileNumber: "90123456",
    email: "quentin.tarantino@example.com",
    corporateAssociations: [],
    userType: "Public",
    status: "Inactive",
    totalBookings: 7,
    lastBookingDate: "2023-05-01T14:00:00Z",
    upcomingBookings: [],
    trainerPackages: [],
    spacePackages: [],
    freeTrials: true,
    vipStatus: false,
    totalPaymentSummary: 350.0,
    outstandingDues: 100.0,
    bookingCancellationRate: 14,
    spacesAccessed: ["Yoga Studio B"],
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2023-05-01T14:00:00Z",
  },
  {
    userId: "023e4567-e89b-12d3-a456-426614174019",
    fullName: "Rachel Green",
    mobileNumber: "01234567",
    email: "rachel.green@example.com",
    corporateAssociations: ["Central Perk Fitness"],
    userType: "Corporate",
    status: "Active",
    totalBookings: 35,
    lastBookingDate: "2023-06-18T12:30:00Z",
    upcomingBookings: [{ space: "Yoga Studio B", date: "2023-06-21", time: "18:00", type: "Yoga for beginners" }],
    trainerPackages: [{ trainerName: "Phoebe Buffay", packageDetails: "15 sessions" }],
    spacePackages: [{ packageDetails: "Monthly All-Access Pass" }],
    freeTrials: false,
    vipStatus: true,
    totalPaymentSummary: 3500.0,
    outstandingDues: 0,
    bookingCancellationRate: 2,
    spacesAccessed: ["Gym A", "Yoga Studio B", "Pool C"],
    createdAt: "2022-12-25T00:00:00Z",
    updatedAt: "2023-06-18T12:30:00Z",
  },
]

const getStatusBadge = (status: UserStatus) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "Inactive":
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    case "Flagged":
      return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
  }
}

export default function EndUsersListPage() {
  const [users, setUsers] = useState<EndUser[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<EndUser[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState<UserType | "All">("All")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All")
  const [vipFilter, setVipFilter] = useState<boolean | "All">("All")
  const [selectedUser, setSelectedUser] = useState<EndUser | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobileNumber.includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesUserType = userTypeFilter === "All" || user.userType === userTypeFilter
      const matchesStatus = statusFilter === "All" || user.status === statusFilter
      const matchesVip = vipFilter === "All" || user.vipStatus === vipFilter
      return matchesSearch && matchesUserType && matchesStatus && matchesVip
    })
    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [users, searchQuery, userTypeFilter, statusFilter, vipFilter])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>End Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1 min-w-[200px] max-w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
              </div>
            </div>
            <Select value={userTypeFilter} onValueChange={(value) => setUserTypeFilter(value as UserType | "All")}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as UserStatus | "All")}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(vipFilter)}
              onValueChange={(value) => setVipFilter(value === "true" ? true : value === "false" ? false : "All")}
            >
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="VIP Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="true">VIP</SelectItem>
                <SelectItem value="false">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>VIP</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Outstanding Dues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.vipStatus ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.totalBookings}</TableCell>
                  <TableCell className={user.outstandingDues > 0 ? "text-red-500 font-bold" : ""}>
                    ${user.outstandingDues.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
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
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onDeactivate={() => {
            // Implement deactivation logic here
            setSelectedUser(null)
          }}
          onFlag={() => {
            // Implement flagging logic here
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

