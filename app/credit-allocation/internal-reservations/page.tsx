"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { AlertCircle, CalendarIcon, Edit, Info, Trash2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock spaces
const mockSpaces = [
  { id: 1, name: "Studio A" },
  { id: 2, name: "Studio B" },
  { id: 3, name: "Conference Room" },
  { id: 4, name: "Production Suite" },
]

// Mock data for demonstration
const mockData = {
  totalHours: 2000,
  reservedHours: 400,
  allocatedHours: 1200,
  availableHours: 400,
  spaceData: {
    1: { totalHours: 600, reservedHours: 120, allocatedHours: 350, availableHours: 130 },
    2: { totalHours: 500, reservedHours: 100, allocatedHours: 300, availableHours: 100 },
    3: { totalHours: 400, reservedHours: 80, allocatedHours: 250, availableHours: 70 },
    4: { totalHours: 500, reservedHours: 100, allocatedHours: 300, availableHours: 100 },
  },
  existingReservations: [
    {
      id: 1,
      spaceId: 1,
      spaceName: "Studio A",
      month: "January",
      year: 2023,
      hours: 50,
      purpose: "Internal team training",
      createdAt: "2023-01-05",
      status: "Active",
    },
    {
      id: 2,
      spaceId: 2,
      spaceName: "Studio B",
      month: "February",
      year: 2023,
      hours: 40,
      purpose: "Product development",
      createdAt: "2023-01-15",
      status: "Active",
    },
    {
      id: 3,
      spaceId: 1,
      spaceName: "Studio A",
      month: "March",
      year: 2023,
      hours: 60,
      purpose: "Client demos",
      createdAt: "2023-02-10",
      status: "Active",
    },
    {
      id: 4,
      spaceId: 3,
      spaceName: "Conference Room",
      month: "April",
      year: 2023,
      hours: 30,
      purpose: "Team building",
      createdAt: "2023-03-05",
      status: "Pending",
    },
  ],
}

export default function InternalReservationsPage() {
  const [selectedSpace, setSelectedSpace] = useState<string>("")
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(new Date())
  const [reservationHours, setReservationHours] = useState(20)
  const [purpose, setPurpose] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false)
  const [formError, setFormError] = useState("")
  const [filteredReservations, setFilteredReservations] = useState(mockData.existingReservations)

  // Get metrics for the selected space
  const getSpaceMetrics = () => {
    if (!selectedSpace) return { totalHours: 0, reservedHours: 0, allocatedHours: 0, availableHours: 0 }
    return (
      mockData.spaceData[Number(selectedSpace)] || {
        totalHours: 0,
        reservedHours: 0,
        allocatedHours: 0,
        availableHours: 0,
      }
    )
  }

  const spaceMetrics = getSpaceMetrics()
  const maxAvailableHours = spaceMetrics.availableHours || 100

  // Filter reservations when space changes
  const handleSpaceChange = (value: string) => {
    setSelectedSpace(value)
    if (value) {
      setFilteredReservations(mockData.existingReservations.filter((res) => res.spaceId === Number(value)))
    } else {
      setFilteredReservations(mockData.existingReservations)
    }
  }

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedSpace) {
      setFormError("Please select a space")
      return
    }

    if (!selectedMonth) {
      setFormError("Please select a month")
      return
    }

    if (reservationHours <= 0) {
      setFormError("Hours must be greater than 0")
      return
    }

    if (reservationHours > maxAvailableHours) {
      setFormError(`Cannot reserve more than ${maxAvailableHours} hours for this space`)
      return
    }

    if (!purpose.trim()) {
      setFormError("Please provide a purpose for this reservation")
      return
    }

    // If all validation passes, clear error and submit
    setFormError("")

    // Here you would submit the reservation
    console.log({
      spaceId: selectedSpace,
      month: format(selectedMonth, "MMMM"),
      year: format(selectedMonth, "yyyy"),
      hours: reservationHours,
      purpose,
    })

    // Reset form
    setReservationHours(20)
    setPurpose("")
    setIsEditing(false)
  }

  const handleReservationEdit = (id: number) => {
    setSelectedReservation(id)
    setIsEditing(true)

    // Find the reservation and populate the form
    const reservation = mockData.existingReservations.find((r) => r.id === id)
    if (reservation) {
      // Set form values based on the selected reservation
      setSelectedSpace(reservation.spaceId.toString())
      setReservationHours(reservation.hours)
      setPurpose(reservation.purpose)

      // Set the month/year
      const date = new Date(
        reservation.year,
        [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].indexOf(reservation.month),
        1,
      )
      setSelectedMonth(date)
    }
  }

  const handleReservationDelete = (id: number) => {
    // Here you would delete the reservation
    console.log(`Deleting reservation ${id}`)
  }

  const handleShowImpactAnalysis = () => {
    setShowImpactAnalysis(!showImpactAnalysis)
  }

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Internal Reservations</h1>
        <p className="text-muted-foreground">Manage your internal hour reservations for developer and operator use</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {selectedSpace ? `${mockSpaces.find((s) => s.id === Number(selectedSpace))?.name} Hours` : "Total Hours"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedSpace ? spaceMetrics.totalHours : mockData.totalHours}</div>
            <p className="mt-1 text-xs text-muted-foreground">Hours received from Owner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reserved Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedSpace ? spaceMetrics.reservedHours : mockData.reservedHours}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Hours reserved for internal use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Allocated Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedSpace ? spaceMetrics.allocatedHours : mockData.allocatedHours}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Hours allocated to other entities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedSpace ? spaceMetrics.availableHours : mockData.availableHours}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Hours available to reserve/allocate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Reservation Form */}
        <Card className="lg:col-span-1">
          <CardHeader className="space-y-1">
            <CardTitle>{isEditing ? "Edit Reservation" : "Create Reservation"}</CardTitle>
            <CardDescription>Reserve hours for internal use by your team</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {formError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="space">Space</Label>
                <Select value={selectedSpace} onValueChange={handleSpaceChange}>
                  <SelectTrigger id="space">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSpaces.map((space) => (
                      <SelectItem key={space.id} value={space.id.toString()}>
                        {space.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select the space you want to reserve hours for</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">Month & Year</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {selectedMonth ? format(selectedMonth, "MMMM yyyy") : <span>Select month</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedMonth} onSelect={setSelectedMonth} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="hours">Hours to Reserve</Label>
                  <span className="text-sm text-muted-foreground">
                    {reservationHours} / {maxAvailableHours} available
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="hours"
                    value={[reservationHours]}
                    max={maxAvailableHours}
                    step={1}
                    onValueChange={(value) => setReservationHours(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={reservationHours}
                    onChange={(e) => setReservationHours(Number(e.target.value))}
                    className="w-20"
                    min={0}
                    max={maxAvailableHours}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose / Description</Label>
                <Textarea
                  id="purpose"
                  placeholder="Describe the purpose of this reservation"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleShowImpactAnalysis}>
                <Info className="w-4 h-4 mr-2" />
                {showImpactAnalysis ? "Hide" : "Show"} Impact Analysis
              </Button>

              {showImpactAnalysis && (
                <div className="p-4 space-y-3 border rounded-md bg-muted/50">
                  <h4 className="font-medium">Reservation Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Reserving {reservationHours} hours will reduce available hours for allocation to other entities.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current available hours:</span>
                      <span className="font-medium">{maxAvailableHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>After reservation:</span>
                      <span className="font-medium">{maxAvailableHours - reservationHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Historical average usage:</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setSelectedSpace("")
                setReservationHours(20)
                setPurpose("")
                setFormError("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleReservationSubmit}>{isEditing ? "Update Reservation" : "Create Reservation"}</Button>
          </CardFooter>
        </Card>

        {/* Existing Reservations */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Existing Reservations</CardTitle>
              <CardDescription>Manage your current internal reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                <Select value={selectedSpace} onValueChange={handleSpaceChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by space" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Spaces</SelectItem>
                    {mockSpaces.map((space) => (
                      <SelectItem key={space.id} value={space.id.toString()}>
                        {space.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Space</th>
                        <th className="px-4 py-3 text-left font-medium">Month/Year</th>
                        <th className="px-4 py-3 text-left font-medium">Hours</th>
                        <th className="px-4 py-3 text-left font-medium">Purpose</th>
                        <th className="px-4 py-3 text-left font-medium">Created</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                            No reservations found for the selected filters.
                          </td>
                        </tr>
                      ) : (
                        filteredReservations.map((reservation) => (
                          <tr key={reservation.id} className="border-t">
                            <td className="px-4 py-3">{reservation.spaceName}</td>
                            <td className="px-4 py-3">
                              {reservation.month} {reservation.year}
                            </td>
                            <td className="px-4 py-3">{reservation.hours}</td>
                            <td className="px-4 py-3">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="text-left">
                                    {reservation.purpose.length > 20
                                      ? `${reservation.purpose.substring(0, 20)}...`
                                      : reservation.purpose}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{reservation.purpose}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </td>
                            <td className="px-4 py-3">{reservation.createdAt}</td>
                            <td className="px-4 py-3">
                              <Badge variant={reservation.status === "Active" ? "default" : "outline"}>
                                {reservation.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReservationEdit(reservation.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReservationDelete(reservation.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

