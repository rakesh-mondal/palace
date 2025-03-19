"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Eye,
  Edit2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Crown,
  Building,
  Briefcase,
  Building2,
  UserCircle,
  Edit,
  History,
  Download,
} from "lucide-react"
import { DateRangeSelector } from "@/components/DateRangeSelector"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from "lucide-react"

// Mock data for entities
const mockEntities = [
  {
    id: "ent-001",
    name: "Fitness First Global",
    type: "Owner",
    role: "System Owner",
    hoursReceived: 10000,
    hoursAllocated: 5000,
    hoursReserved: 0,
    availableHours: 5000,
    status: "Active",
    createdAt: "2023-01-01",
  },
  {
    id: "ent-002",
    name: "ABC Development",
    type: "Developer",
    role: "Property Developer",
    hoursReceived: 2000,
    hoursAllocated: 1500,
    hoursReserved: 0,
    availableHours: 500,
    status: "Active",
    createdAt: "2023-02-15",
  },
  {
    id: "ent-003",
    name: "XYZ Builders",
    type: "Developer",
    role: "Property Developer",
    hoursReceived: 1800,
    hoursAllocated: 1200,
    hoursReserved: 0,
    availableHours: 600,
    status: "Active",
    createdAt: "2023-03-10",
  },
  {
    id: "ent-004",
    name: "Global Operations",
    type: "Operator",
    role: "Property Manager",
    hoursReceived: 1500,
    hoursAllocated: 1000,
    hoursReserved: 0,
    availableHours: 500,
    status: "Active",
    createdAt: "2023-04-05",
  },
  {
    id: "ent-005",
    name: "City Managers",
    type: "Operator",
    role: "Property Manager",
    hoursReceived: 1200,
    hoursAllocated: 800,
    hoursReserved: 0,
    availableHours: 400,
    status: "Active",
    createdAt: "2023-05-20",
  },
  {
    id: "ent-006",
    name: "HSBC",
    type: "Corporate",
    role: "Corporate Client",
    hoursReceived: 1000,
    hoursAllocated: 600,
    hoursReserved: 0,
    availableHours: 400,
    status: "Active",
    createdAt: "2023-06-15",
  },
  {
    id: "ent-007",
    name: "CLSA",
    type: "Corporate",
    role: "Corporate Client",
    hoursReceived: 800,
    hoursAllocated: 500,
    hoursReserved: 0,
    availableHours: 300,
    status: "Active",
    createdAt: "2023-07-10",
  },
  {
    id: "ent-008",
    name: "CBRE",
    type: "Corporate",
    role: "Corporate Client",
    hoursReceived: 600,
    hoursAllocated: 400,
    hoursReserved: 0,
    availableHours: 200,
    status: "Active",
    createdAt: "2023-08-05",
  },
  {
    id: "ent-009",
    name: "John Smith",
    type: "Employee",
    role: "Corporate Employee",
    hoursReceived: 50,
    hoursAllocated: 30,
    hoursReserved: 0,
    availableHours: 20,
    status: "Active",
    createdAt: "2023-09-12",
  },
  {
    id: "ent-010",
    name: "Sarah Wong",
    type: "Employee",
    role: "Corporate Employee",
    hoursReceived: 50,
    hoursAllocated: 0,
    hoursReserved: 0,
    availableHours: 50,
    status: "Active",
    createdAt: "2023-10-01",
  },
]

// Mock data for hierarchy
const mockHierarchy = {
  allocatedFrom: [{ id: "ent-001", name: "Fitness First Global", type: "Owner", hours: 10000 }],
  allocatedTo: [
    { id: "ent-002", name: "ABC Development", type: "Developer", hours: 2000 },
    { id: "ent-003", name: "XYZ Builders", type: "Developer", hours: 1800 },
    { id: "ent-004", name: "Global Operations", type: "Operator", hours: 1500 },
    { id: "ent-005", name: "City Managers", type: "Operator", hours: 1200 },
    { id: "ent-006", name: "HSBC", type: "Corporate", hours: 1000 },
    { id: "ent-007", name: "CLSA", type: "Corporate", hours: 800 },
    { id: "ent-008", name: "CBRE", type: "Corporate", hours: 600 },
    { id: "ent-009", name: "John Smith", type: "Employee", hours: 50 },
    { id: "ent-010", name: "Sarah Wong", type: "Employee", hours: 50 },
  ],
}

// Entity type icons
const entityTypeIcons = {
  Owner: <Crown className="h-4 w-4" />,
  Developer: <Building className="h-4 w-4" />,
  Operator: <Briefcase className="h-4 w-4" />,
  Corporate: <Building2 className="h-4 w-4" />,
  Employee: <UserCircle className="h-4 w-4" />,
}

export default function EntityDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [entityType, setEntityType] = useState("all")
  const [status, setStatus] = useState("all")
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null)
  const [showHierarchy, setShowHierarchy] = useState(false)
  const [isAddEntityModalOpen, setIsAddEntityModalOpen] = useState(false)
  const [entities, setEntities] = useState(mockEntities)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter entities based on search and filters
  const filteredEntities = entities.filter((entity) => {
    const matchesSearch =
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = entityType === "all" || entity.type === entityType
    const matchesStatus = status === "all" || entity.status === status

    // Date range filtering
    const createdDate = new Date(entity.createdAt)
    const matchesDateRange = createdDate >= dateRange.from && createdDate <= dateRange.to

    return matchesSearch && matchesType && matchesStatus && matchesDateRange
  })

  // Get entity type badge color
  const getEntityTypeBadge = (type: string) => {
    switch (type) {
      case "Owner":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">{type}</span>
      case "Developer":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{type}</span>
      case "Operator":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">{type}</span>
      case "Corporate":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">{type}</span>
      case "Employee":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{type}</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{type}</span>
    }
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{status}</span>
      case "Inactive":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>
      case "Pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">{status}</span>
        )
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  // Calculate total hours for summary cards
  const totalSystemHours = entities.reduce((sum, entity) => sum + entity.hoursReceived, 0)
  const selectedEntityData = selectedEntity ? entities.find((e) => e.id === selectedEntity) : null
  const hoursFlowingThrough = selectedEntityData
    ? selectedEntityData.hoursReceived + selectedEntityData.hoursAllocated
    : 0
  const hoursUtilized = selectedEntityData ? selectedEntityData.hoursReceived - selectedEntityData.availableHours : 0

  // Handle entity view
  const handleViewEntity = (entityId: string) => {
    alert(`View details for entity ${entityId}`)
  }

  // Handle entity edit
  const handleEditEntity = (entityId: string) => {
    alert(`Edit entity ${entityId}`)
  }

  // Handle entity revoke
  const handleRevokeEntity = (entityId: string) => {
    alert(`Revoke allocations for entity ${entityId}`)
  }

  // Handle add entity form submission
  const handleAddEntity = (data: any) => {
    // In a real app, this would send the data to an API
    console.log("Adding new entity:", data)

    // For demo purposes, add the entity to the local state
    const newEntity = {
      id: data.entityId,
      name: data.name,
      type: data.entityType.charAt(0).toUpperCase() + data.entityType.slice(1),
      role: `${data.entityType.charAt(0).toUpperCase() + data.entityType.slice(1)}`,
      hoursReceived: data.skipAllocation ? 0 : Number.parseInt(data.allocationAmount) || 0,
      hoursAllocated: 0,
      hoursReserved: 0,
      availableHours: data.skipAllocation ? 0 : Number.parseInt(data.allocationAmount) || 0,
      status: data.status ? "Active" : "Inactive",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setEntities((prev) => [...prev, newEntity])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Entity Directory</h1>
        <p className="text-gray-500">View and manage entities in the credit allocation hierarchy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Entities</CardTitle>
              <CardDescription>View and manage all entities in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Input
                      placeholder="Search entities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-[300px]"
                    />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {Object.keys(entityTypeIcons).map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Hours Received</TableHead>
                      <TableHead className="text-right">Hours Allocated</TableHead>
                      <TableHead className="text-right">Hours Reserved</TableHead>
                      <TableHead className="text-right">Available Hours</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntities.map((entity) => (
                      <TableRow
                        key={entity.id}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedEntity === entity.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedEntity(entity.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {entityTypeIcons[entity.type as keyof typeof entityTypeIcons]}
                            <span>{entity.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{entity.type}</TableCell>
                        <TableCell>{entity.role}</TableCell>
                        <TableCell className="text-right">{entity.hoursReceived.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{entity.hoursAllocated.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{entity.hoursReserved.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{entity.availableHours.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(entity.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Entity Details</CardTitle>
              <CardDescription>View detailed information about the selected entity</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEntity ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Entity Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Name:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.type}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Role:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.role}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Created:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Hours Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Hours:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.hoursReceived.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Allocated:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.hoursAllocated.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Reserved:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.hoursReserved.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Available:</span>
                        <span className="font-medium">
                          {mockEntities.find((e) => e.id === selectedEntity)?.availableHours.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={
                          ((mockEntities.find((e) => e.id === selectedEntity)?.hoursAllocated || 0) /
                            (mockEntities.find((e) => e.id === selectedEntity)?.hoursReceived || 1)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Hierarchy Position</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">
                        {mockEntities.find((e) => e.id === selectedEntity)?.type === "Owner"
                          ? "Top level entity in the hierarchy"
                          : `Allocated by: ${
                              mockHierarchy.allocatedFrom.find((a) => a.id === selectedEntity)?.name ||
                              "Unknown"
                            }`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mockHierarchy.allocatedTo.filter((a) => a.id === selectedEntity).length > 0
                          ? `Allocated to: ${mockHierarchy.allocatedTo
                              .filter((a) => a.id === selectedEntity)
                              .map((a) => a.name)
                              .join(", ")}`
                          : "No allocations made to other entities"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Entity
                    </Button>
                    <Button variant="outline" size="sm">
                      <History className="mr-2 h-4 w-4" />
                      View History
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Details
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select an entity to view its details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

