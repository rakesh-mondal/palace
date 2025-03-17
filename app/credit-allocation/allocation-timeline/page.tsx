"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Calendar,
  Clock,
  Download,
  Filter,
  List,
  Plus,
  Printer,
  Save,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
  BarChart3,
  Network,
  RefreshCw,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { DateRangeSelector } from "@/components/DateRangeSelector"

// Mock data for timeline events
const mockTimelineEvents = [
  {
    id: 1,
    date: new Date(2023, 0, 15, 10, 30),
    actionType: "created",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 201,
      name: "Acme Development",
      type: "developer",
    },
    hourAmount: 500,
    allocationPeriod: "January 2023",
    user: "John Smith",
    notes: "Initial allocation for Q1 projects",
    beforeState: null,
    afterState: {
      hourAmount: 500,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 2, 31),
    },
  },
  {
    id: 2,
    date: new Date(2023, 1, 5, 14, 15),
    actionType: "modified",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 201,
      name: "Acme Development",
      type: "developer",
    },
    hourAmount: 650,
    allocationPeriod: "February 2023",
    user: "John Smith",
    notes: "Increased allocation due to new project requirements",
    beforeState: {
      hourAmount: 500,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 2, 31),
    },
    afterState: {
      hourAmount: 650,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 2, 31),
    },
    relatedEventId: 1,
  },
  {
    id: 3,
    date: new Date(2023, 2, 20, 9, 45),
    actionType: "created",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 202,
      name: "BuildCo Operations",
      type: "operator",
    },
    hourAmount: 300,
    allocationPeriod: "March 2023",
    user: "Sarah Johnson",
    notes: "New allocation for BuildCo Operations team",
    beforeState: null,
    afterState: {
      hourAmount: 300,
      startDate: new Date(2023, 2, 1),
      endDate: new Date(2023, 4, 31),
    },
  },
  {
    id: 4,
    date: new Date(2023, 3, 10, 11, 0),
    actionType: "revoked",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 201,
      name: "Acme Development",
      type: "developer",
    },
    hourAmount: 200,
    allocationPeriod: "April 2023",
    user: "John Smith",
    notes: "Partial revocation due to project delays",
    beforeState: {
      hourAmount: 650,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 2, 31),
    },
    afterState: {
      hourAmount: 450,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 2, 31),
    },
    relatedEventId: 2,
  },
  {
    id: 5,
    date: new Date(2023, 4, 31, 16, 30),
    actionType: "expired",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 202,
      name: "BuildCo Operations",
      type: "operator",
    },
    hourAmount: 300,
    allocationPeriod: "May 2023",
    user: "System",
    notes: "Allocation period ended",
    beforeState: {
      hourAmount: 300,
      startDate: new Date(2023, 2, 1),
      endDate: new Date(2023, 4, 31),
    },
    afterState: {
      hourAmount: 0,
      startDate: new Date(2023, 2, 1),
      endDate: new Date(2023, 4, 31),
      status: "expired",
    },
    relatedEventId: 3,
  },
  {
    id: 6,
    date: new Date(2023, 5, 5, 10, 0),
    actionType: "created",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 203,
      name: "Global Enterprises",
      type: "corporate",
    },
    hourAmount: 1000,
    allocationPeriod: "June 2023",
    user: "Sarah Johnson",
    notes: "Q2 allocation for Global Enterprises",
    beforeState: null,
    afterState: {
      hourAmount: 1000,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 31),
    },
  },
  {
    id: 7,
    date: new Date(2023, 6, 15, 14, 0),
    actionType: "modified",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 203,
      name: "Global Enterprises",
      type: "corporate",
    },
    hourAmount: 1200,
    allocationPeriod: "July 2023",
    user: "John Smith",
    notes: "Increased allocation for additional projects",
    beforeState: {
      hourAmount: 1000,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 31),
    },
    afterState: {
      hourAmount: 1200,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 31),
    },
    relatedEventId: 6,
  },
  {
    id: 8,
    date: new Date(2023, 7, 20, 9, 30),
    actionType: "created",
    fromEntity: {
      id: 203,
      name: "Global Enterprises",
      type: "corporate",
    },
    toEntity: {
      id: 301,
      name: "Jane Doe",
      type: "employee",
    },
    hourAmount: 120,
    allocationPeriod: "August 2023",
    user: "Michael Brown",
    notes: "Allocation for employee project work",
    beforeState: null,
    afterState: {
      hourAmount: 120,
      startDate: new Date(2023, 7, 1),
      endDate: new Date(2023, 7, 31),
    },
  },
  {
    id: 9,
    date: new Date(2023, 8, 10, 11, 15),
    actionType: "revoked",
    fromEntity: {
      id: 203,
      name: "Global Enterprises",
      type: "corporate",
    },
    toEntity: {
      id: 301,
      name: "Jane Doe",
      type: "employee",
    },
    hourAmount: 40,
    allocationPeriod: "September 2023",
    user: "Michael Brown",
    notes: "Partial revocation due to employee leave",
    beforeState: {
      hourAmount: 120,
      startDate: new Date(2023, 7, 1),
      endDate: new Date(2023, 7, 31),
    },
    afterState: {
      hourAmount: 80,
      startDate: new Date(2023, 7, 1),
      endDate: new Date(2023, 7, 31),
    },
    relatedEventId: 8,
  },
  {
    id: 10,
    date: new Date(2023, 9, 1, 10, 0),
    actionType: "created",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 204,
      name: "TechBuild Solutions",
      type: "developer",
    },
    hourAmount: 800,
    allocationPeriod: "October 2023",
    user: "Sarah Johnson",
    notes: "Q4 allocation for new development partner",
    beforeState: null,
    afterState: {
      hourAmount: 800,
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 11, 31),
    },
  },
  {
    id: 11,
    date: new Date(2023, 10, 15, 13, 30),
    actionType: "modified",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 204,
      name: "TechBuild Solutions",
      type: "developer",
    },
    hourAmount: 950,
    allocationPeriod: "November 2023",
    user: "John Smith",
    notes: "Increased allocation for year-end projects",
    beforeState: {
      hourAmount: 800,
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 11, 31),
    },
    afterState: {
      hourAmount: 950,
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 11, 31),
    },
    relatedEventId: 10,
  },
  {
    id: 12,
    date: new Date(2023, 11, 31, 23, 59),
    actionType: "expired",
    fromEntity: {
      id: 101,
      name: "Corporate Admin",
      type: "admin",
    },
    toEntity: {
      id: 204,
      name: "TechBuild Solutions",
      type: "developer",
    },
    hourAmount: 950,
    allocationPeriod: "December 2023",
    user: "System",
    notes: "Allocation period ended",
    beforeState: {
      hourAmount: 950,
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 11, 31),
    },
    afterState: {
      hourAmount: 0,
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 11, 31),
      status: "expired",
    },
    relatedEventId: 11,
  },
]

// Action type color mapping
const actionTypeColors = {
  created: "bg-green-500",
  modified: "bg-blue-500",
  revoked: "bg-red-500",
  expired: "bg-gray-500",
}

const actionTypeIcons = {
  created: <Plus className="h-4 w-4" />,
  modified: <RefreshCw className="h-4 w-4" />,
  revoked: <X className="h-4 w-4" />,
  expired: <Clock className="h-4 w-4" />,
}

// Entity type color mapping
const entityTypeColors = {
  admin: "bg-purple-100 text-purple-800",
  developer: "bg-blue-100 text-blue-800",
  operator: "bg-orange-100 text-orange-800",
  corporate: "bg-green-100 text-green-800",
  employee: "bg-indigo-100 text-indigo-800",
}

export default function AllocationTimelinePage() {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewMode, setViewMode] = useState("chronological")
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  const [filters, setFilters] = useState({
    entityTypes: [],
    actionTypes: [],
    fromEntity: "",
    toEntity: "",
    year: "2023",
  })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Load mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockTimelineEvents)
      setFilteredEvents(mockTimelineEvents)
      setLoading(false)
    }, 1000)
  }, [])

  // Apply filters
  useEffect(() => {
    if (events.length === 0) return

    let filtered = [...events]

    // Filter by date range
    filtered = filtered.filter((event) => event.date >= dateRange.from && event.date <= dateRange.to)

    // Filter by entity types
    if (filters.entityTypes.length > 0) {
      filtered = filtered.filter((event) => filters.entityTypes.includes(event.toEntity.type))
    }

    // Filter by action types
    if (filters.actionTypes.length > 0) {
      filtered = filtered.filter((event) => filters.actionTypes.includes(event.actionType))
    }

    // Filter by from entity
    if (filters.fromEntity) {
      filtered = filtered.filter((event) =>
        event.fromEntity.name.toLowerCase().includes(filters.fromEntity.toLowerCase()),
      )
    }

    // Filter by to entity
    if (filters.toEntity) {
      filtered = filtered.filter((event) => event.toEntity.name.toLowerCase().includes(filters.toEntity.toLowerCase()))
    }

    // Filter by year
    if (filters.year !== "all") {
      filtered = filtered.filter((event) => event.date.getFullYear().toString() === filters.year)
    }

    setFilteredEvents(filtered)
  }, [events, filters, dateRange])

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (filteredEvents.length === 0)
      return {
        totalEvents: 0,
        totalHoursAllocated: 0,
        topAllocators: [],
        topRecipients: [],
        actionTypeCounts: {},
      }

    // Total hours allocated
    const totalHoursAllocated = filteredEvents.reduce((sum, event) => {
      if (event.actionType === "created" || event.actionType === "modified") {
        return sum + event.hourAmount
      }
      return sum
    }, 0)

    // Count events by allocator
    const allocatorCounts = {}
    filteredEvents.forEach((event) => {
      const allocatorId = event.fromEntity.id
      allocatorCounts[allocatorId] = allocatorCounts[allocatorId] || {
        id: allocatorId,
        name: event.fromEntity.name,
        count: 0,
        hours: 0,
      }
      allocatorCounts[allocatorId].count += 1
      if (event.actionType === "created" || event.actionType === "modified") {
        allocatorCounts[allocatorId].hours += event.hourAmount
      }
    })

    // Count events by recipient
    const recipientCounts = {}
    filteredEvents.forEach((event) => {
      const recipientId = event.toEntity.id
      recipientCounts[recipientId] = recipientCounts[recipientId] || {
        id: recipientId,
        name: event.toEntity.name,
        count: 0,
        hours: 0,
      }
      recipientCounts[recipientId].count += 1
      if (event.actionType === "created" || event.actionType === "modified") {
        recipientCounts[recipientId].hours += event.hourAmount
      }
    })

    // Count events by action type
    const actionTypeCounts = {}
    filteredEvents.forEach((event) => {
      actionTypeCounts[event.actionType] = (actionTypeCounts[event.actionType] || 0) + 1
    })

    // Get top allocators and recipients
    const topAllocators = Object.values(allocatorCounts)
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 3)

    const topRecipients = Object.values(recipientCounts)
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 3)

    return {
      totalEvents: filteredEvents.length,
      totalHoursAllocated,
      topAllocators,
      topRecipients,
      actionTypeCounts,
    }
  }, [filteredEvents])

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Toggle entity type filter
  const toggleEntityTypeFilter = (type) => {
    setFilters((prev) => {
      const entityTypes = [...prev.entityTypes]
      if (entityTypes.includes(type)) {
        return {
          ...prev,
          entityTypes: entityTypes.filter((t) => t !== type),
        }
      } else {
        return {
          ...prev,
          entityTypes: [...entityTypes, type],
        }
      }
    })
  }

  // Toggle action type filter
  const toggleActionTypeFilter = (type) => {
    setFilters((prev) => {
      const actionTypes = [...prev.actionTypes]
      if (actionTypes.includes(type)) {
        return {
          ...prev,
          actionTypes: actionTypes.filter((t) => t !== type),
        }
      } else {
        return {
          ...prev,
          actionTypes: [...actionTypes, type],
        }
      }
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      entityTypes: [],
      actionTypes: [],
      fromEntity: "",
      toEntity: "",
      year: "2023",
    })
    setDateRange({
      from: new Date(2023, 0, 1),
      to: new Date(2023, 11, 31),
    })
  }

  // Handle event selection
  const handleEventSelect = (event) => {
    setSelectedEvent(event.id === selectedEvent?.id ? null : event)
  }

  // Handle zoom change
  const handleZoomChange = (value) => {
    setZoomLevel(value[0])
  }

  // Calculate event size based on hour amount
  const getEventSize = (hourAmount) => {
    const baseSize = 12
    const maxSize = 24
    const factor = hourAmount / 1000 // Normalize by 1000 hours
    return Math.max(baseSize, Math.min(maxSize, baseSize + (maxSize - baseSize) * factor))
  }

  // Format date for display
  const formatEventDate = (date) => {
    return format(date, "MMM d, yyyy h:mm a")
  }

  // Get related events
  const getRelatedEvents = (eventId) => {
    const event = events.find((e) => e.id === eventId)
    if (!event) return []

    // Find all events in the chain
    const relatedChain = []
    let currentEvent = event

    // Look backward in the chain
    while (currentEvent.relatedEventId) {
      const prevEvent = events.find((e) => e.id === currentEvent.relatedEventId)
      if (prevEvent) {
        relatedChain.unshift(prevEvent)
        currentEvent = prevEvent
      } else {
        break
      }
    }

    // Add the current event
    relatedChain.push(event)

    // Look forward in the chain
    currentEvent = event
    const nextEvents = events.filter((e) => e.relatedEventId === currentEvent.id)
    relatedChain.push(...nextEvents)

    return relatedChain
  }

  // Render timeline event
  const renderTimelineEvent = (event) => {
    const isSelected = selectedEvent?.id === event.id
    const size = getEventSize(event.hourAmount)
    const relatedEvents = selectedEvent ? getRelatedEvents(selectedEvent.id) : []
    const isRelated = relatedEvents.some((e) => e.id === event.id)

    return (
      <div key={event.id} className={`relative mb-8 ml-6 ${isSelected ? "z-10" : "z-0"}`}>
        {/* Timeline connector */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 -ml-3"></div>

        {/* Event marker */}
        <div
          className={`absolute -left-3 flex items-center justify-center rounded-full cursor-pointer
            ${actionTypeColors[event.actionType]} 
            ${isSelected ? "ring-4 ring-offset-2 ring-blue-200" : ""}
            ${isRelated && !isSelected ? "ring-2 ring-blue-200" : ""}
            transition-all duration-200`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            marginTop: "2px",
          }}
          onClick={() => handleEventSelect(event)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-white">{actionTypeIcons[event.actionType]}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{event.actionType.charAt(0).toUpperCase() + event.actionType.slice(1)}</p>
                <p>{event.hourAmount} hours</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Event content */}
        <div className={`pl-6 ${isSelected ? "bg-blue-50 rounded-lg p-4 shadow-sm" : ""}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-500">{formatEventDate(event.date)}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={actionTypeColors[event.actionType]}>
                  <span className="text-white capitalize">{event.actionType}</span>
                </Badge>
                <span className="font-medium">{event.hourAmount} hours</span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">From: </span>
                <Badge variant="outline" className={entityTypeColors[event.fromEntity.type]}>
                  {event.fromEntity.name}
                </Badge>
                <span className="mx-2 text-gray-400">→</span>
                <span className="text-sm text-gray-600">To: </span>
                <Badge variant="outline" className={entityTypeColors[event.toEntity.type]}>
                  {event.toEntity.name}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span>Period: </span>
                <span className="font-medium">{event.allocationPeriod}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEventSelect(event)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isSelected ? "Collapse" : "Expand"}
            </Button>
          </div>

          {/* Expanded details */}
          {isSelected && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Action Details</h4>
                <div className="mt-1 text-sm">
                  <div>
                    <span className="text-gray-500">Performed by:</span> {event.user}
                  </div>
                  {event.notes && (
                    <div className="mt-1">
                      <span className="text-gray-500">Notes:</span> {event.notes}
                    </div>
                  )}
                </div>
              </div>

              {(event.beforeState || event.afterState) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">State Changes</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4 text-sm">
                    {event.beforeState && (
                      <div className="p-2 bg-gray-50 rounded border border-gray-200">
                        <div className="font-medium text-gray-700">Before</div>
                        <div>
                          <span className="text-gray-500">Hours:</span> {event.beforeState.hourAmount}
                        </div>
                        <div>
                          <span className="text-gray-500">Period:</span>{" "}
                          {format(event.beforeState.startDate, "MMM d, yyyy")} -{" "}
                          {format(event.beforeState.endDate, "MMM d, yyyy")}
                        </div>
                        {event.beforeState.status && (
                          <div>
                            <span className="text-gray-500">Status:</span> {event.beforeState.status}
                          </div>
                        )}
                      </div>
                    )}
                    {event.afterState && (
                      <div className="p-2 bg-gray-50 rounded border border-gray-200">
                        <div className="font-medium text-gray-700">After</div>
                        <div>
                          <span className="text-gray-500">Hours:</span> {event.afterState.hourAmount}
                          {event.beforeState && event.afterState.hourAmount !== event.beforeState.hourAmount && (
                            <span
                              className={`ml-2 ${event.afterState.hourAmount > event.beforeState.hourAmount ? "text-green-600" : "text-red-600"}`}
                            >
                              {event.afterState.hourAmount > event.beforeState.hourAmount ? (
                                <span className="flex items-center">
                                  <ArrowUpRight className="h-3 w-3 mr-1" />+
                                  {event.afterState.hourAmount - event.beforeState.hourAmount}
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <ArrowDownRight className="h-3 w-3 mr-1" />-
                                  {event.beforeState.hourAmount - event.afterState.hourAmount}
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-gray-500">Period:</span>{" "}
                          {format(event.afterState.startDate, "MMM d, yyyy")} -{" "}
                          {format(event.afterState.endDate, "MMM d, yyyy")}
                        </div>
                        {event.afterState.status && (
                          <div>
                            <span className="text-gray-500">Status:</span> {event.afterState.status}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Related events */}
              {relatedEvents.length > 1 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Related Events</h4>
                  <div className="mt-1 space-y-2">
                    {relatedEvents.map(
                      (relEvent) =>
                        relEvent.id !== event.id && (
                          <div
                            key={relEvent.id}
                            className="p-2 bg-gray-50 rounded border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                            onClick={() => handleEventSelect(relEvent)}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${actionTypeColors[relEvent.actionType]}`}></div>
                              <span className="text-sm capitalize">{relEvent.actionType}</span>
                              <span className="text-sm text-gray-500">{formatEventDate(relEvent.date)}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-1" />
                  View Full Details
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Render entity-focused view
  const renderEntityFocusedView = () => {
    // Group events by entity
    const entityGroups = {}

    filteredEvents.forEach((event) => {
      const entityId = event.toEntity.id
      if (!entityGroups[entityId]) {
        entityGroups[entityId] = {
          entity: event.toEntity,
          events: [],
        }
      }
      entityGroups[entityId].events.push(event)
    })

    return (
      <div className="space-y-8">
        {Object.values(entityGroups).map((group) => (
          <Card key={group.entity.id} className="overflow-hidden">
            <CardHeader className={`py-3 ${entityTypeColors[group.entity.type]}`}>
              <CardTitle className="text-lg flex items-center">
                {group.entity.name}
                <Badge variant="outline" className="ml-2 bg-white">
                  {group.entity.type}
                </Badge>
                <Badge className="ml-auto">{group.events.length} events</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {group.events.sort((a, b) => b.date - a.date).map((event) => renderTimelineEvent(event))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Render hierarchy view
  const renderHierarchyView = () => {
    return (
      <div className="flex justify-center p-4 h-[600px] bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <Network className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-700">Hierarchy Visualization</h3>
            <p className="mt-2 text-gray-500">
              This view shows the flow of allocations through the organizational hierarchy.
            </p>
            <p className="text-sm text-gray-400 mt-2">Interactive hierarchy visualization would be implemented here.</p>
          </div>
        </div>
      </div>
    )
  }

  // Render calendar view
  const renderCalendarView = () => {
    return (
      <div className="flex justify-center p-4 h-[600px] bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <Calendar className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-700">Calendar View</h3>
            <p className="mt-2 text-gray-500">This view shows allocations distributed across a monthly calendar.</p>
            <p className="text-sm text-gray-400 mt-2">Interactive calendar visualization would be implemented here.</p>
          </div>
        </div>
      </div>
    )
  }

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading timeline data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Allocation Timeline</h1>
          <p className="text-gray-500 mt-1">Visualize and analyze the chronological flow of hour allocations</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Printer className="h-4 w-4 mr-2" />
                  Print View
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Timeline
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="mb-2 block">Date Range</Label>
                <DateRangeSelector dateRange={dateRange} onChange={setDateRange} className="w-full" />
              </div>

              <div>
                <Label className="mb-2 block">Year</Label>
                <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Entity Types</Label>
                <div className="flex flex-wrap gap-2">
                  {["developer", "operator", "corporate", "employee"].map((type) => (
                    <Badge
                      key={type}
                      variant={filters.entityTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleEntityTypeFilter(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Action Types</Label>
                <div className="flex flex-wrap gap-2">
                  {["created", "modified", "revoked", "expired"].map((type) => (
                    <Badge
                      key={type}
                      variant={filters.actionTypes.includes(type) ? "default" : "outline"}
                      className={`cursor-pointer ${filters.actionTypes.includes(type) ? actionTypeColors[type] : ""}`}
                      onClick={() => toggleActionTypeFilter(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">From Entity</Label>
                <Input
                  placeholder="Search allocator..."
                  value={filters.fromEntity}
                  onChange={(e) => handleFilterChange("fromEntity", e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">To Entity</Label>
                <Input
                  placeholder="Search recipient..."
                  value={filters.toEntity}
                  onChange={(e) => handleFilterChange("toEntity", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>

              <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline and visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Timeline Visualization</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.5))}
                    disabled={zoomLevel <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider
                    value={[zoomLevel]}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={handleZoomChange}
                    className="w-24"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.5))}
                    disabled={zoomLevel >= 2}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save View
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">Save Current View</h4>
                        <div className="space-y-2">
                          <Label htmlFor="view-name">View Name</Label>
                          <Input id="view-name" placeholder="My Custom View" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="save-filters" />
                            <Label htmlFor="save-filters">Include current filters</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="save-date-range" />
                            <Label htmlFor="save-date-range">Include date range</Label>
                          </div>
                        </div>
                        <Button className="w-full">Save View</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              \`\`\`jsx
              <Tabs value={viewMode} onValueChange={setViewMode} className="mt-2">
                <TabsList>
                  <TabsTrigger value="chronological">
                    <List className="h-4 w-4 mr-2" />
                    Chronological
                  </TabsTrigger>
                  <TabsTrigger value="entity">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Entity-Focused
                  </TabsTrigger>
                  <TabsTrigger value="hierarchy">
                    <Network className="h-4 w-4 mr-2" />
                    Hierarchy
                  </TabsTrigger>
                  <TabsTrigger value="calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              \`\`\`
            </CardHeader>
            \`\`\`jsx
            <CardContent className="p-4">
              {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-700">No events found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters to see more results.</p>
                  <Button variant="outline" className="mt-4" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <Tabs value={viewMode} className="w-full">
                  <div
                    className="space-y-2 transition-all duration-300"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: "top left",
                      height: `${Math.max(600, filteredEvents.length * 100 * zoomLevel)}px`,
                      overflow: "auto",
                    }}
                  >
                    <TabsContent value="chronological" className="mt-0">
                      <div className="space-y-2">
                        {filteredEvents.sort((a, b) => b.date - a.date).map((event) => renderTimelineEvent(event))}
                      </div>
                    </TabsContent>

                    <TabsContent value="entity" className="mt-0">
                      {renderEntityFocusedView()}
                    </TabsContent>

                    <TabsContent value="hierarchy" className="mt-0">
                      {renderHierarchyView()}
                    </TabsContent>

                    <TabsContent value="calendar" className="mt-0">
                      {renderCalendarView()}
                    </TabsContent>
                  </div>
                </Tabs>
              )}
            </CardContent>
            \`\`\`
          </Card>
        </div>

        {/* Summary statistics */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Total Events</div>
                    <div className="text-2xl font-bold">{summaryStats.totalEvents}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Total Hours</div>
                    <div className="text-2xl font-bold">{summaryStats.totalHoursAllocated.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Action Type Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(summaryStats.actionTypeCounts).map(([type, count]) => (
                      <div key={type} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${actionTypeColors[type]} mr-2`}></div>
                        <div className="text-sm capitalize">{type}</div>
                        <div className="ml-auto text-sm font-medium">{count}</div>
                        <div className="w-16 h-2 bg-gray-100 ml-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${actionTypeColors[type]}`}
                            style={{ width: `${(count / summaryStats.totalEvents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Top Allocators</h4>
                  <div className="space-y-2">
                    {summaryStats.topAllocators.map((allocator) => (
                      <div key={allocator.id} className="flex items-center justify-between">
                        <div className="text-sm">{allocator.name}</div>
                        <div className="text-sm font-medium">{allocator.hours.toLocaleString()} hours</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Top Recipients</h4>
                  <div className="space-y-2">
                    {summaryStats.topRecipients.map((recipient) => (
                      <div key={recipient.id} className="flex items-center justify-between">
                        <div className="text-sm">{recipient.name}</div>
                        <div className="text-sm font-medium">{recipient.hours.toLocaleString()} hours</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Peak Allocation Periods</h4>
                  <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-gray-400">Monthly distribution chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Audit Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Timeline as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data as CSV
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Timeline
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Timeline View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

