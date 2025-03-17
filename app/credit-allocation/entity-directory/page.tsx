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
} from "lucide-react"
import { DateRangeSelector } from "@/components/DateRangeSelector"

// Mock data for entities
const mockEntities = [
  {
    id: "ent-001",
    name: "Fitness First Global",
    type: "Owner",
    role: "System Owner",
    hoursReceived: 10000,
    hoursAllocated: 8500,
    hoursReserved: 500,
    availableHours: 1000,
    status: "Active",
    createdAt: "2023-01-01",
  },
  {
    id: "ent-002",
    name: "Asia Pacific Development",
    type: "Developer",
    role: "Regional Developer",
    hoursReceived: 5000,
    hoursAllocated: 3200,
    hoursReserved: 800,
    availableHours: 1000,
    status: "Active",
    createdAt: "2023-02-15",
  },
  {
    id: "ent-003",
    name: "Hong Kong Operations",
    type: "Operator",
    role: "Local Operator",
    hoursReceived: 2500,
    hoursAllocated: 1800,
    hoursReserved: 200,
    availableHours: 500,
    status: "Active",
    createdAt: "2023-03-10",
  },
  {
    id: "ent-004",
    name: "HSBC Corporate",
    type: "Corporate",
    role: "Corporate Client",
    hoursReceived: 1000,
    hoursAllocated: 800,
    hoursReserved: 0,
    availableHours: 200,
    status: "Active",
    createdAt: "2023-04-05",
  },
  {
    id: "ent-005",
    name: "CBRE",
    type: "Corporate",
    role: "Corporate Client",
    hoursReceived: 800,
    hoursAllocated: 600,
    hoursReserved: 0,
    availableHours: 200,
    status: "Active",
    createdAt: "2023-05-20",
  },
  {
    id: "ent-006",
    name: "CLSA",
    type: "Corporate",
    role: "Corporate Client",
    hoursReceived: 500,
    hoursAllocated: 300,
    hoursReserved: 0,
    availableHours: 200,
    status: "Inactive",
    createdAt: "2023-06-15",
  },
  {
    id: "ent-007",
    name: "John Smith",
    type: "Employee",
    role: "Corporate Employee",
    hoursReceived: 50,
    hoursAllocated: 0,
    hoursReserved: 0,
    availableHours: 50,
    status: "Active",
    createdAt: "2023-07-10",
  },
  {
    id: "ent-008",
    name: "Sarah Wong",
    type: "Employee",
    role: "Corporate Employee",
    hoursReceived: 50,
    hoursAllocated: 0,
    hoursReserved: 0,
    availableHours: 50,
    status: "Active",
    createdAt: "2023-08-05",
  },
  {
    id: "ent-009",
    name: "Mark Johnson",
    type: "Employee",
    role: "Corporate Employee",
    hoursReceived: 80,
    hoursAllocated: 80,
    hoursReserved: 0,
    availableHours: 0,
    status: "Expired",
    createdAt: "2023-09-12",
  },
  {
    id: "ent-010",
    name: "Colliers International",
    type: "Operator",
    role: "Property Manager",
    hoursReceived: 350,
    hoursAllocated: 300,
    hoursReserved: 50,
    availableHours: 50,
    status: "Active",
    createdAt: "2023-10-01",
  },
]

// Mock data for hierarchy
const mockHierarchy = {
  allocatedFrom: [{ id: "ent-001", name: "Fitness First Global", type: "Owner", hours: 5000 }],
  allocatedTo: [
    { id: "ent-004", name: "HSBC Corporate", type: "Corporate", hours: 1000 },
    { id: "ent-005", name: "CBRE", type: "Corporate", hours: 800 },
    { id: "ent-006", name: "CLSA", type: "Corporate", hours: 500 },
    { id: "ent-007", name: "John Smith", type: "Employee", hours: 50 },
    { id: "ent-008", name: "Sarah Wong", type: "Employee", hours: 50 },
  ],
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
      <div className="flex flex-col space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Entity Directory</h1>
            <p className="text-muted-foreground">Manage and view all entities in the credit allocation system</p>
          </div>
          <Button className="mt-4 md:mt-0" size="sm" onClick={() => setIsAddEntityModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Entity
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total System Hours</p>
                  <h3 className="text-2xl font-bold mt-1">{totalSystemHours.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Flowing Through Selected</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {selectedEntity ? hoursFlowingThrough.toLocaleString() : "—"}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Utilized by Selected</p>
                  <h3 className="text-2xl font-bold mt-1">{selectedEntity ? hoursUtilized.toLocaleString() : "—"}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ArrowDownLeft className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search entities..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={entityType} onValueChange={setEntityType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Entity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
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

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Date Range Filter</h3>
              <DateRangeSelector dateRange={dateRange} onChange={setDateRange} />
            </div>
          </CardContent>
        </Card>

        {/* Entity Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Entities</CardTitle>
            <CardDescription>{filteredEntities.length} entities found</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredEntities.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No entities found</h3>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Entity Name</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Entity Type</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Role</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Hours Received</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Hours Allocated</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Hours Reserved</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Available Hours</th>
                      <th className="text-center py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-center py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntities.map((entity) => (
                      <tr
                        key={entity.id}
                        className={`border-b hover:bg-gray-50 ${selectedEntity === entity.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedEntity(entity.id)}
                      >
                        <td className="py-4 px-4">{entity.name}</td>
                        <td className="py-4 px-4">{getEntityTypeBadge(entity.type)}</td>
                        <td className="py-4 px-4">{entity.role}</td>
                        <td className="py-4 px-4 text-right">{entity.hoursReceived.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right">{entity.hoursAllocated.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right">{entity.hoursReserved.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right">{entity.availableHours.toLocaleString()}</td>
                        <td className="py-4 px-4 text-center">{getStatusBadge(entity.status)}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Details"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewEntity(entity.id)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Modify Allocations"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEntity(entity.id)
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Revoke Allocations"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRevokeEntity(entity.id)
                              }}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hierarchy Visualization */}
        {selectedEntity && (
          <Card>
            <CardHeader className="pb-0 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Entity Hierarchy</CardTitle>
                <CardDescription>View allocation relationships for {selectedEntityData?.name}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowHierarchy(!showHierarchy)}>
                {showHierarchy ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Hide Hierarchy
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show Hierarchy
                  </>
                )}
              </Button>
            </CardHeader>
            {showHierarchy && (
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-4">Hours Allocated From</h3>
                    {mockHierarchy.allocatedFrom.length === 0 ? (
                      <p className="text-sm text-gray-500">No allocations received</p>
                    ) : (
                      <ul className="space-y-3">
                        {mockHierarchy.allocatedFrom.map((entity) => (
                          <li key={entity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <div className="mr-3">{getEntityTypeBadge(entity.type)}</div>
                              <span>{entity.name}</span>
                            </div>
                            <span className="font-medium">{entity.hours.toLocaleString()} hours</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-4">Hours Allocated To</h3>
                    {mockHierarchy.allocatedTo.length === 0 ? (
                      <p className="text-sm text-gray-500">No allocations made</p>
                    ) : (
                      <ul className="space-y-3">
                        {mockHierarchy.allocatedTo.map((entity) => (
                          <li key={entity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <div className="mr-3">{getEntityTypeBadge(entity.type)}</div>
                              <span>{entity.name}</span>
                            </div>
                            <span className="font-medium">{entity.hours.toLocaleString()} hours</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

