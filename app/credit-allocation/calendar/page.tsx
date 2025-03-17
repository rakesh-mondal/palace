"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Filter, BarChart3, Users, X } from "lucide-react"

// Mock data for demonstration
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const ENTITY_TYPES = ["Developers", "Operators", "Corporates", "Employees"]
const YEARS = ["2023", "2024", "2025"]
const SPACE_TYPES = ["Office", "Meeting Room", "Event Space", "Coworking"]
const ALLOCATION_STATUS = ["Active", "Pending", "Expired", "Fully Utilized"]

const generateMockData = () => {
  const data = {}

  ENTITY_TYPES.forEach((entityType) => {
    data[entityType] = {}
    MONTHS.forEach((month) => {
      const hours = Math.floor(Math.random() * 200) + 50
      const utilized = Math.floor(Math.random() * hours)
      data[entityType][month] = {
        allocated: hours,
        utilized: utilized,
        reserved: Math.floor(Math.random() * (hours - utilized)),
        recipients: Array(Math.floor(Math.random() * 5) + 1)
          .fill(0)
          .map((_, i) => ({
            name: `${entityType.slice(0, -1)} ${i + 1}`,
            hours: Math.floor(Math.random() * 50) + 10,
          })),
      }
    })
  })

  return data
}

export default function CalendarView() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedView, setSelectedView] = useState("allocation")
  const [selectedFilters, setSelectedFilters] = useState({
    entityTypes: [...ENTITY_TYPES],
    spaceTypes: [...SPACE_TYPES],
    allocationStatus: [...ALLOCATION_STATUS],
  })
  const [showFilters, setShowFilters] = useState(false)
  const [calendarData, setCalendarData] = useState(generateMockData())
  const [selectedCell, setSelectedCell] = useState(null)
  const [summaryStats, setSummaryStats] = useState({
    totalAllocations: 0,
    monthlyAverage: 0,
    peakMonth: "",
    availableMonths: [],
  })

  // Calculate summary statistics
  useEffect(() => {
    const stats = { totalAllocations: 0, monthlyTotals: {} }

    Object.keys(calendarData).forEach((entityType) => {
      if (selectedFilters.entityTypes.includes(entityType)) {
        Object.keys(calendarData[entityType]).forEach((month) => {
          const allocation = calendarData[entityType][month].allocated
          stats.totalAllocations += allocation

          if (!stats.monthlyTotals[month]) {
            stats.monthlyTotals[month] = 0
          }
          stats.monthlyTotals[month] += allocation
        })
      }
    })

    const monthlyAverage = Math.round(stats.totalAllocations / 12)
    let peakMonth = MONTHS[0]
    let peakValue = 0
    const availableMonths = []

    Object.keys(stats.monthlyTotals).forEach((month) => {
      if (stats.monthlyTotals[month] > peakValue) {
        peakValue = stats.monthlyTotals[month]
        peakMonth = month
      }

      // Assuming a month has available hours if less than 80% allocated
      const totalPossible = Object.keys(calendarData).length * 200 // Rough estimate
      if (stats.monthlyTotals[month] < totalPossible * 0.8) {
        availableMonths.push(month)
      }
    })

    setSummaryStats({
      totalAllocations: stats.totalAllocations,
      monthlyAverage,
      peakMonth,
      availableMonths,
    })
  }, [calendarData, selectedFilters])

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }

      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }

      return newFilters
    })
  }

  const handleCellClick = (entityType, month) => {
    setSelectedCell({ entityType, month, data: calendarData[entityType][month] })
  }

  const getColorForEntityType = (entityType) => {
    const colors = {
      Developers: "bg-blue-500",
      Operators: "bg-green-500",
      Corporates: "bg-purple-500",
      Employees: "bg-amber-500",
    }
    return colors[entityType] || "bg-gray-500"
  }

  const getColorForEntityTypeLight = (entityType) => {
    const colors = {
      Developers: "bg-blue-100 text-blue-800",
      Operators: "bg-green-100 text-green-800",
      Corporates: "bg-purple-100 text-purple-800",
      Employees: "bg-amber-100 text-amber-800",
    }
    return colors[entityType] || "bg-gray-100 text-gray-800"
  }

  const getCellHeight = (value, maxValue = 200) => {
    const percentage = Math.min((value / maxValue) * 100, 100)
    return `${Math.max(percentage, 10)}%`
  }

  const getCellContent = (entityType, month) => {
    const data = calendarData[entityType][month]

    if (selectedView === "allocation") {
      return data.allocated
    } else if (selectedView === "reservation") {
      return data.reserved
    } else {
      return `${Math.round((data.utilized / data.allocated) * 100)}%`
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Allocations</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">{summaryStats.totalAllocations.toLocaleString()} hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Average</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">{summaryStats.monthlyAverage.toLocaleString()} hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Peak Allocation Month</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">{summaryStats.peakMonth}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Months with Available Hours</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">{summaryStats.availableMonths.length}</div>
            <div className="mt-1 text-sm text-muted-foreground">{summaryStats.availableMonths.join(", ")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls and Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>

          <Tabs value={selectedView} onValueChange={setSelectedView} className="ml-auto md:ml-0">
            <TabsList>
              <TabsTrigger value="allocation" className="gap-2">
                <Calendar size={16} />
                Allocation
              </TabsTrigger>
              <TabsTrigger value="reservation" className="gap-2">
                <Clock size={16} />
                Reservation
              </TabsTrigger>
              <TabsTrigger value="utilization" className="gap-2">
                <BarChart3 size={16} />
                Utilization
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="mb-8">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle>Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
              <X size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Entity Type</h3>
                <div className="space-y-3">
                  {ENTITY_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`entity-${type}`}
                        checked={selectedFilters.entityTypes.includes(type)}
                        onCheckedChange={() => handleFilterChange("entityTypes", type)}
                      />
                      <Label htmlFor={`entity-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium mb-2">Space Type</h3>
                <div className="space-y-3">
                  {SPACE_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`space-${type}`}
                        checked={selectedFilters.spaceTypes.includes(type)}
                        onCheckedChange={() => handleFilterChange("spaceTypes", type)}
                      />
                      <Label htmlFor={`space-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium mb-2">Allocation Status</h3>
                <div className="space-y-3">
                  {ALLOCATION_STATUS.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={selectedFilters.allocationStatus.includes(status)}
                        onCheckedChange={() => handleFilterChange("allocationStatus", status)}
                      />
                      <Label htmlFor={`status-${status}`}>{status}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Grid */}
        <Card className="flex-grow">
          <CardHeader className="pb-4">
            <CardTitle>Allocation Calendar {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                {/* Month Headers */}
                <div className="grid grid-cols-12 gap-2 mb-4">
                  {MONTHS.map((month) => (
                    <div key={month} className="py-3 text-sm font-medium text-center bg-gray-100 rounded">
                      {month}
                    </div>
                  ))}
                </div>

                {/* Calendar Rows */}
                <div className="space-y-2">
                  {ENTITY_TYPES.filter((type) => selectedFilters.entityTypes.includes(type)).map((entityType) => (
                    <div key={entityType} className="grid grid-cols-12 gap-2">
                      {MONTHS.map((month) => (
                        <div
                          key={`${entityType}-${month}`}
                          className={`relative h-20 border rounded cursor-pointer hover:border-primary transition-colors duration-200 ${
                            selectedCell && selectedCell.entityType === entityType && selectedCell.month === month
                              ? "border-primary border-2"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleCellClick(entityType, month)}
                        >
                          <div className="absolute top-0 left-0 w-full px-2 py-1">
                            <div
                              className={`inline-block px-1 text-xs font-medium rounded-sm ${getColorForEntityTypeLight(entityType)}`}
                            >
                              {entityType.slice(0, 3)}
                            </div>
                          </div>

                          <div
                            className={`absolute bottom-0 left-0 w-full ${getColorForEntityType(entityType)} bg-opacity-70 flex items-end justify-center text-white font-medium`}
                            style={{
                              height: getCellHeight(
                                selectedView === "allocation"
                                  ? calendarData[entityType][month].allocated
                                  : selectedView === "reservation"
                                    ? calendarData[entityType][month].reserved
                                    : calendarData[entityType][month].utilized,
                              ),
                            }}
                          >
                            <span className="p-1 text-sm">{getCellContent(entityType, month)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        {selectedCell && (
          <Card className="w-full lg:w-80 flex-shrink-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>
                  {selectedCell.month} {selectedYear}
                </span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCell(null)}>
                  <X size={16} />
                </Button>
              </CardTitle>
              <div
                className={`inline-block px-2 py-1 text-sm font-medium rounded-sm ${getColorForEntityTypeLight(selectedCell.entityType)}`}
              >
                {selectedCell.entityType}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Allocation Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-xs text-muted-foreground">Allocated</div>
                    <div className="font-bold">{selectedCell.data.allocated} hrs</div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-xs text-muted-foreground">Utilized</div>
                    <div className="font-bold">{selectedCell.data.utilized} hrs</div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-xs text-muted-foreground">Reserved</div>
                    <div className="font-bold">{selectedCell.data.reserved} hrs</div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-xs text-muted-foreground">Available</div>
                    <div className="font-bold">
                      {selectedCell.data.allocated - selectedCell.data.utilized - selectedCell.data.reserved} hrs
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Recipient Breakdown</h3>
                <div className="pr-2 space-y-2 max-h-40 overflow-y-auto">
                  {selectedCell.data.recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">{recipient.name}</span>
                      <span className="text-sm font-medium">{recipient.hours} hrs</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="flex-1">
                    Manage
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Users size={16} className="mr-2" />
                    Recipients
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

