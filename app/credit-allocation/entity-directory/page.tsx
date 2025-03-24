"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  XCircle,
  Users,
  Clock,
  Crown,
  Building,
  Briefcase,
  Building2,
  UserCircle,
} from "lucide-react"
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
import { MoreHorizontal } from "lucide-react"
import { useEntity } from "@/lib/contexts/EntityContext"
import { EntityRole } from "@/lib/types/entity"
import { toast } from "@/components/ui/use-toast"

// Entity type icons
const entityTypeIcons = {
  Developer: <Crown className="h-4 w-4" />,
  Operator: <Building className="h-4 w-4" />,
  Corporate: <Building2 className="h-4 w-4" />,
  Employee: <UserCircle className="h-4 w-4" />,
}

export default function EntityDirectoryPage() {
  const {
    entities,
    currentUserRole,
    canViewEntity,
    canAllocateHours,
    getMappedEntities,
  } = useEntity()

  const [searchTerm, setSearchTerm] = useState("")
  const [entityType, setEntityType] = useState<EntityRole | "all">("all")
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null)

  // Filter entities based on permissions and search
  const filteredEntities = entities.filter((entity) => {
    if (!canViewEntity(entity.id)) return false

    const matchesSearch =
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = entityType === "all" || entity.role === entityType

    return matchesSearch && matchesType
  })

  // Get entity type badge color
  const getEntityTypeBadge = (type: EntityRole) => {
    switch (type) {
      case "Developer":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">{type}</span>
      case "Operator":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{type}</span>
      case "Corporate":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">{type}</span>
      case "Employee":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{type}</span>
    }
  }

  // Handle entity view
  const handleViewEntity = (entityId: string) => {
    if (canViewEntity(entityId)) {
      setSelectedEntity(entityId)
    } else {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this entity.",
        variant: "destructive",
      })
    }
  }

  // Handle entity revoke
  const handleRevokeEntity = (entityId: string) => {
    const entity = entities.find(e => e.id === entityId)
    if (!entity) return

    if (!canAllocateHours(currentUserRole, entityId)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to revoke allocations for this entity.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Hours Revoked",
      description: `Successfully revoked allocations for ${entity.name}`,
    })
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
                    <Select value={entityType} onValueChange={(value) => setEntityType(value as EntityRole | "all")}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {Object.keys(entityTypeIcons).map((type) => (
                          <SelectItem key={type} value={type}>
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
                      <TableHead className="text-right">Hours Allocated</TableHead>
                      <TableHead className="text-right">Hours Reserved</TableHead>
                      <TableHead className="text-right">Available Hours</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntities.map((entity) => (
                      <TableRow
                        key={entity.id}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedEntity === entity.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {entityTypeIcons[entity.role]}
                            <span>{entity.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getEntityTypeBadge(entity.role)}</TableCell>
                        <TableCell className="text-right">{entity.allocatedHours.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{entity.reservedHours.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{entity.availableHours.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewEntity(entity.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {canAllocateHours(currentUserRole, entity.id) && (
                                <DropdownMenuItem
                                  onClick={() => handleRevokeEntity(entity.id)}
                                  className="text-red-600"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Revoke Access
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
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
                  {entities.map(entity => {
                    if (entity.id !== selectedEntity) return null
                    return (
                      <div key={entity.id}>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Entity Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Name:</span>
                              <span className="font-medium">{entity.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Type:</span>
                              <span className="font-medium">{entity.role}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Hours Summary</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Allocated:</span>
                              <span className="font-medium">{entity.allocatedHours.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Reserved:</span>
                              <span className="font-medium">{entity.reservedHours.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Available:</span>
                              <span className="font-medium">{entity.availableHours.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress
                              value={
                                ((entity.allocatedHours - entity.availableHours) /
                                  entity.allocatedHours) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                        </div>

                        {entity.employees.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Employees</h4>
                            <div className="space-y-2">
                              {entity.employees.map(employee => (
                                <div key={employee.id} className="flex justify-between text-sm">
                                  <span className="text-gray-500">{employee.name}</span>
                                  <span className="font-medium">{employee.allocatedHours} hours</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {getMappedEntities(entity.id).length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Mapped Entities</h4>
                            <div className="space-y-2">
                              {getMappedEntities(entity.id).map(mappedEntity => (
                                <div key={mappedEntity.id} className="flex justify-between text-sm">
                                  <span className="text-gray-500">{mappedEntity.name}</span>
                                  <span className="font-medium">{mappedEntity.role}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
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

