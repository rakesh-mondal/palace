"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  MessageSquare,
  Calendar,
  Building,
  Briefcase,
  UserCircle,
  ChevronRight,
  Loader2,
  Info,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Mock data for recipients
const mockRecipients = [
  {
    id: "rec-001",
    name: "Westfield Development",
    entityType: "Developer",
    totalHours: 800,
    hoursUsed: 320,
    hoursRemaining: 480,
    allocationPeriod: "May 2023",
    status: "Active",
    lastUpdated: "2023-05-10",
    notes: "Primary developer for north region projects",
    contact: "john.doe@westfield.com",
    phone: "+1 (555) 123-4567",
    allocations: [
      { month: "May 2023", amount: 300, status: "Completed" },
      { month: "Jun 2023", amount: 250, status: "Completed" },
      { month: "Jul 2023", amount: 250, status: "Active" },
    ],
  },
  {
    id: "rec-002",
    name: "Brookfield Properties",
    entityType: "Developer",
    totalHours: 650,
    hoursUsed: 400,
    hoursRemaining: 250,
    allocationPeriod: "May 2023",
    status: "Active",
    lastUpdated: "2023-05-12",
    notes: "Focused on commercial developments",
    contact: "sarah.smith@brookfield.com",
    phone: "+1 (555) 234-5678",
    allocations: [
      { month: "May 2023", amount: 250, status: "Completed" },
      { month: "Jun 2023", amount: 200, status: "Completed" },
      { month: "Jul 2023", amount: 200, status: "Active" },
    ],
  },
  {
    id: "rec-003",
    name: "Cushman & Wakefield",
    entityType: "Operator",
    totalHours: 450,
    hoursUsed: 450,
    hoursRemaining: 0,
    allocationPeriod: "April 2023",
    status: "Expired",
    lastUpdated: "2023-04-30",
    notes: "Property management for downtown locations",
    contact: "michael.johnson@cushwake.com",
    phone: "+1 (555) 345-6789",
    allocations: [{ month: "Apr 2023", amount: 450, status: "Completed" }],
  },
  {
    id: "rec-004",
    name: "JLL",
    entityType: "Operator",
    totalHours: 600,
    hoursUsed: 300,
    hoursRemaining: 300,
    allocationPeriod: "June 2023",
    status: "Active",
    lastUpdated: "2023-06-05",
    notes: "Manages multiple high-rise properties",
    contact: "emily.brown@jll.com",
    phone: "+1 (555) 456-7890",
    allocations: [
      { month: "Jun 2023", amount: 300, status: "Completed" },
      { month: "Jul 2023", amount: 300, status: "Active" },
    ],
  },
  {
    id: "rec-005",
    name: "CBRE",
    entityType: "Operator",
    totalHours: 500,
    hoursUsed: 100,
    hoursRemaining: 400,
    allocationPeriod: "July 2023",
    status: "Active",
    lastUpdated: "2023-07-01",
    notes: "New partnership for east region properties",
    contact: "david.wilson@cbre.com",
    phone: "+1 (555) 567-8901",
    allocations: [{ month: "Jul 2023", amount: 500, status: "Active" }],
  },
  {
    id: "rec-006",
    name: "Deloitte",
    entityType: "Corporate",
    totalHours: 300,
    hoursUsed: 50,
    hoursRemaining: 250,
    allocationPeriod: "July 2023",
    status: "Active",
    lastUpdated: "2023-07-03",
    notes: "Professional services firm",
    contact: "lisa.taylor@deloitte.com",
    phone: "+1 (555) 678-9012",
    allocations: [{ month: "Jul 2023", amount: 300, status: "Active" }],
  },
  {
    id: "rec-007",
    name: "PwC",
    entityType: "Corporate",
    totalHours: 250,
    hoursUsed: 0,
    hoursRemaining: 250,
    allocationPeriod: "August 2023",
    status: "Pending",
    lastUpdated: "2023-07-15",
    notes: "Allocation starts next month",
    contact: "robert.miller@pwc.com",
    phone: "+1 (555) 789-0123",
    allocations: [{ month: "Aug 2023", amount: 250, status: "Pending" }],
  },
  {
    id: "rec-008",
    name: "Jane Smith",
    entityType: "Employee",
    totalHours: 120,
    hoursUsed: 40,
    hoursRemaining: 80,
    allocationPeriod: "July 2023",
    status: "Active",
    lastUpdated: "2023-07-05",
    notes: "Senior architect at Westfield",
    contact: "jane.smith@westfield.com",
    phone: "+1 (555) 890-1234",
    allocations: [{ month: "Jul 2023", amount: 120, status: "Active" }],
  },
  {
    id: "rec-009",
    name: "Mark Johnson",
    entityType: "Employee",
    totalHours: 80,
    hoursUsed: 80,
    hoursRemaining: 0,
    allocationPeriod: "June 2023",
    status: "Expired",
    lastUpdated: "2023-06-30",
    notes: "Project manager at Brookfield",
    contact: "mark.johnson@brookfield.com",
    phone: "+1 (555) 901-2345",
    allocations: [{ month: "Jun 2023", amount: 80, status: "Completed" }],
  },
  {
    id: "rec-010",
    name: "Colliers International",
    entityType: "Operator",
    totalHours: 350,
    hoursUsed: 300,
    hoursRemaining: 50,
    allocationPeriod: "July 2023",
    status: "Active",
    lastUpdated: "2023-07-10",
    notes: "Expiring allocation, needs renewal",
    contact: "alex.williams@colliers.com",
    phone: "+1 (555) 012-3456",
    allocations: [{ month: "Jul 2023", amount: 350, status: "Active" }],
  },
]

// Entity type icons
const entityTypeIcons = {
  Developer: <Building className="h-4 w-4" />,
  Operator: <Briefcase className="h-4 w-4" />,
  Corporate: <Building className="h-4 w-4" />,
  Employee: <UserCircle className="h-4 w-4" />,
}

// Status badge variants
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Expired":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "Pending":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Revoked":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

// Entity type badge variants
const getEntityTypeBadgeVariant = (entityType: string) => {
  switch (entityType) {
    case "Developer":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    case "Operator":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Corporate":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    case "Employee":
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function MyRecipientsPage() {
  const [loading, setLoading] = useState(true)
  const [recipients, setRecipients] = useState<any[]>([])
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    entityType: "all",
    status: "all",
    period: "current",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showHierarchy, setShowHierarchy] = useState(false)
  const [chartView, setChartView] = useState("pie")

  // Load mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecipients(mockRecipients)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter recipients based on search and filters
  const filteredRecipients = recipients.filter((recipient) => {
    // Search term filter
    if (searchTerm && !recipient.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Entity type filter
    if (filters.entityType !== "all" && recipient.entityType !== filters.entityType) {
      return false
    }

    // Status filter
    if (filters.status !== "all" && recipient.status !== filters.status) {
      return false
    }

    // Period filter (simplified for demo)
    if (filters.period === "current" && !recipient.allocationPeriod.includes("July")) {
      return false
    } else if (filters.period === "next" && !recipient.allocationPeriod.includes("August")) {
      return false
    }

    return true
  })

  // Handle row selection
  const toggleRowSelection = (id: string) => {
    setSelectedRecipients((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([])
    } else {
      setSelectedRecipients(filteredRecipients.map((r) => r.id))
    }
  }

  // Handle recipient click
  const handleRecipientClick = (recipient: any) => {
    setSelectedRecipient(recipient)
  }

  // Calculate summary metrics
  const summaryMetrics = {
    totalRecipients: recipients.length,
    totalHoursAllocated: recipients.reduce((sum, r) => sum + r.totalHours, 0),
    activeAllocations: recipients.filter((r) => r.status === "Active").length,
    expiringSoon: recipients.filter((r) => r.status === "Active" && r.hoursRemaining < 100).length,
  }

  // Calculate entity type distribution for chart
  const entityDistribution = recipients.reduce((acc: any, recipient) => {
    const { entityType, totalHours } = recipient
    if (!acc[entityType]) {
      acc[entityType] = 0
    }
    acc[entityType] += totalHours
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Recipients</h1>
            <p className="text-muted-foreground">
              View and manage all entities that receive hour allocations from you. This is your allocation hierarchy
              overview.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </div>
        </div>

        {/* Alert explaining the hierarchy view */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800">Hierarchy Overview</h3>
                <p className="text-sm text-blue-700">
                  This page shows all entities downstream from you in the allocation hierarchy. If you are a Developer,
                  you'll see Operators, Corporates, and Employees you've distributed hours to. If you're an Operator,
                  you'll see Corporates and Employees. This helps you understand and manage your allocation
                  distribution.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summaryMetrics.totalRecipients}</div>
              <p className="text-xs text-gray-500 mt-1">Across all entity types</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Hours Allocated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summaryMetrics.totalHoursAllocated.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Current allocation period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Allocations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summaryMetrics.activeAllocations}</div>
              <p className="text-xs text-gray-500 mt-1">Recipients with active hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summaryMetrics.expiringSoon}</div>
              <p className="text-xs text-gray-500 mt-1">Need attention in next 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search recipients..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", showFilters ? "rotate-180" : "")} />
            </Button>
            <Select value={chartView} onValueChange={setChartView}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Chart View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showHierarchy ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHierarchy(!showHierarchy)}
            >
              <Users className="h-4 w-4 mr-2" />
              Hierarchy View
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        <Collapsible open={showFilters}>
          <CollapsibleContent className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Entity Type</label>
                <Select
                  value={filters.entityType}
                  onValueChange={(value) => setFilters({ ...filters, entityType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Allocation Period</label>
                <Select value={filters.period} onValueChange={(value) => setFilters({ ...filters, period: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Periods</SelectItem>
                    <SelectItem value="current">Current Month</SelectItem>
                    <SelectItem value="next">Next Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters({
                      entityType: "all",
                      status: "all",
                      period: "current",
                    })
                    setSearchTerm("")
                  }}
                >
                  Reset Filters
                </Button>
                <Button variant="default" size="sm">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipients Table */}
        <div className={cn("lg:col-span-2", selectedRecipient ? "lg:col-span-2" : "lg:col-span-3")}>
          {/* Bulk Actions */}
          {selectedRecipients.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{selectedRecipients.length}</span> recipients selected
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Clock className="mr-2 h-4 w-4" />
                      Extend Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <XCircle className="mr-2 h-4 w-4" />
                      Revoke Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Note to Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" onClick={() => setSelectedRecipients([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={filteredRecipients.length > 0 && selectedRecipients.length === filteredRecipients.length}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Entity Type</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                        <span className="ml-2">Loading recipients...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredRecipients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No recipients found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecipients.map((recipient) => (
                    <TableRow
                      key={recipient.id}
                      className={cn("cursor-pointer", selectedRecipient?.id === recipient.id ? "bg-gray-50" : "")}
                      onClick={() => handleRecipientClick(recipient)}
                    >
                      <TableCell className="w-[40px]" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRecipients.includes(recipient.id)}
                          onCheckedChange={() => toggleRowSelection(recipient.id)}
                          aria-label={`Select ${recipient.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            {entityTypeIcons[recipient.entityType as keyof typeof entityTypeIcons]}
                          </div>
                          <div>
                            <div className="font-medium">{recipient.name}</div>
                            <div className="text-xs text-gray-500">{recipient.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("font-normal", getEntityTypeBadgeVariant(recipient.entityType))}
                        >
                          {recipient.entityType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium">
                          {recipient.hoursRemaining} / {recipient.totalHours}
                        </div>
                        <div className="w-full mt-1">
                          <Progress value={(recipient.hoursUsed / recipient.totalHours) * 100} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span>{recipient.allocationPeriod}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("font-normal", getStatusBadgeVariant(recipient.status))}>
                          {recipient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(recipient.lastUpdated).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleRecipientClick(recipient)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modify Allocation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Extend Allocation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4" />
                              Revoke Hours
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Data Visualization */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Allocation Distribution</h2>
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="p-4 border rounded-lg">
                <div className="h-64 flex items-center justify-center">
                  {chartView === "pie" && (
                    <div className="text-center">
                      <PieChart className="h-32 w-32 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Pie chart showing allocation distribution by entity type
                      </p>
                    </div>
                  )}
                  {chartView === "bar" && (
                    <div className="text-center">
                      <BarChart3 className="h-32 w-32 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Bar chart showing allocation distribution by entity type
                      </p>
                    </div>
                  )}
                  {chartView === "line" && (
                    <div className="text-center">
                      <LineChart className="h-32 w-32 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Line chart showing allocation trends over time</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="table" className="p-4 border rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Entity Type
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hours Allocated
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(entityDistribution).map(([type, hours]) => (
                        <tr key={type}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{hours as number}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            {Math.round(((hours as number) / summaryMetrics.totalHoursAllocated) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedRecipient && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recipient Details</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRecipient(null)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      {entityTypeIcons[selectedRecipient.entityType as keyof typeof entityTypeIcons]}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedRecipient.name}</h3>
                      <p className="text-sm text-gray-500">{selectedRecipient.entityType}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Contact</p>
                      <p>{selectedRecipient.contact}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p>{selectedRecipient.phone}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Notes</p>
                    <p>{selectedRecipient.notes}</p>
                  </div>
                </div>

                {/* Allocation Summary */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Allocation Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Hours:</span>
                      <span className="font-medium">{selectedRecipient.totalHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Hours Used:</span>
                      <span className="font-medium">{selectedRecipient.hoursUsed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Hours Remaining:</span>
                      <span className="font-medium">{selectedRecipient.hoursRemaining}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Utilization Rate:</span>
                      <span className="font-medium">
                        {Math.round((selectedRecipient.hoursUsed / selectedRecipient.totalHours) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress
                      value={(selectedRecipient.hoursUsed / selectedRecipient.totalHours) * 100}
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Allocation History */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Allocation History</h4>
                  <div className="space-y-3">
                    {selectedRecipient.allocations.map((allocation: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            allocation.status === "Active"
                              ? "bg-green-500"
                              : allocation.status === "Pending"
                                ? "bg-blue-500"
                                : "bg-gray-500",
                          )}
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between text-sm">
                            <span>{allocation.month}</span>
                            <span className="font-medium">{allocation.amount} hours</span>
                          </div>
                          <div className="text-xs text-gray-500">{allocation.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Modify Allocation
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    Extend Allocation
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600">
                    <XCircle className="mr-2 h-4 w-4" />
                    Revoke Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Hierarchy Visualization */}
      <Collapsible open={showHierarchy}>
        <CollapsibleContent className="mt-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Allocation Hierarchy</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-[#77866E] text-white rounded-lg mb-2">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-sm font-medium">You (Owner/Admin)</div>
                <div className="text-xs text-gray-500">10,000 total hours</div>
                <ChevronDown className="my-2 h-5 w-5 text-gray-400" />
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-purple-100 text-purple-800 rounded-lg mb-2">
                      <Building className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium">Developers</div>
                    <div className="text-xs text-gray-500">4,500 hours</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 text-blue-800 rounded-lg mb-2">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium">Operators</div>
                    <div className="text-xs text-gray-500">3,500 hours</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-amber-100 text-amber-800 rounded-lg mb-2">
                      <Building className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium">Corporates</div>
                    <div className="text-xs text-gray-500">2,000 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

