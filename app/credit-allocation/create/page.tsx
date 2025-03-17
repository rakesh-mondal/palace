"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ChevronRight, Info, Users } from "lucide-react"

export default function CreateAllocationPage() {
  // State for form values
  const [userRole, setUserRole] = useState("Owner")
  const [selectedSpace, setSelectedSpace] = useState("")
  const [recipientType, setRecipientType] = useState("")
  const [recipient, setRecipient] = useState("")
  const [availableHours, setAvailableHours] = useState(100)
  const [hoursToAllocate, setHoursToAllocate] = useState(0)
  const [reserveForInternal, setReserveForInternal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(new Date())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [currentTab, setCurrentTab] = useState("form")

  // Derived state
  const remainingHours = availableHours - hoursToAllocate
  const isFormValid =
    selectedSpace &&
    recipientType &&
    recipient &&
    hoursToAllocate > 0 &&
    hoursToAllocate <= availableHours &&
    selectedMonth &&
    agreeToTerms

  // Mock data for spaces
  const spaces = [
    { id: "space1", name: "Studio A" },
    { id: "space2", name: "Conference Room B" },
    { id: "space3", name: "Fitness Center" },
    { id: "space4", name: "Rooftop Garden" },
  ]

  // Get available recipient types based on user role
  const getRecipientTypes = () => {
    switch (userRole) {
      case "Owner":
        return ["Developers", "Operators", "Corporates"]
      case "Developer":
        return ["Corporates", "Operators", "Own Employees"]
      case "Operator":
        return ["Corporates", "Own Employees"]
      case "Corporate":
        return ["Own Employees"]
      default:
        return []
    }
  }

  // Mock data for recipients based on type
  const getRecipients = (type: string) => {
    switch (type) {
      case "Developers":
        return [
          { id: "dev1", name: "ABC Development" },
          { id: "dev2", name: "XYZ Builders" },
          { id: "dev3", name: "Future Spaces" },
        ]
      case "Operators":
        return [
          { id: "op1", name: "Global Operations" },
          { id: "op2", name: "City Managers" },
          { id: "op3", name: "Space Operators Inc." },
        ]
      case "Corporates":
        return [
          { id: "corp1", name: "HSBC" },
          { id: "corp2", name: "CLSA" },
          { id: "corp3", name: "CBRE" },
          { id: "corp4", name: "Morgan Stanley" },
        ]
      case "Own Employees":
        return [
          { id: "emp1", name: "Marketing Team" },
          { id: "emp2", name: "Sales Department" },
          { id: "emp3", name: "Executive Suite" },
        ]
      default:
        return []
    }
  }

  // Mock current allocations data
  const currentAllocations = [
    {
      id: 1,
      space: "Studio A",
      recipient: "HSBC",
      recipientType: "Corporate",
      hours: 20,
      month: "January",
      year: 2023,
      status: "Active",
    },
    {
      id: 2,
      space: "Conference Room B",
      recipient: "CLSA",
      recipientType: "Corporate",
      hours: 15,
      month: "January",
      year: 2023,
      status: "Active",
    },
    {
      id: 3,
      space: "Fitness Center",
      recipient: "Marketing Team",
      recipientType: "Own Employees",
      hours: 10,
      month: "December",
      year: 2022,
      status: "Expired",
    },
    {
      id: 4,
      space: "Studio A",
      recipient: "Global Operations",
      recipientType: "Operator",
      hours: 25,
      month: "February",
      year: 2023,
      status: "Active",
    },
    {
      id: 5,
      space: "Rooftop Garden",
      recipient: "ABC Development",
      recipientType: "Developer",
      hours: 30,
      month: "January",
      year: 2023,
      status: "Revoked",
    },
  ]

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the allocation to the backend
    alert("Allocation submitted successfully!")
    // Reset form
    setSelectedSpace("")
    setRecipientType("")
    setRecipient("")
    setHoursToAllocate(0)
    setReserveForInternal(false)
    setAgreeToTerms(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Allocation</h1>
        <p className="text-gray-500">Allocate hours to entities in your organization hierarchy</p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground">
          <TabsTrigger
            value="form"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex items-center gap-2"
          >
            <span>Allocation Form</span>
          </TabsTrigger>
          <TabsTrigger
            value="current"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex items-center gap-2"
          >
            <span>Current Allocations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main allocation form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>New Hour Allocation</CardTitle>
                  <CardDescription>Allocate your available hours to entities in your hierarchy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Space Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Space Selection</h3>
                      <div className="space-y-2">
                        <Label htmlFor="space">Space</Label>
                        <Select value={selectedSpace} onValueChange={setSelectedSpace}>
                          <SelectTrigger id="space">
                            <SelectValue placeholder="Select a space" />
                          </SelectTrigger>
                          <SelectContent>
                            {spaces.map((space) => (
                              <SelectItem key={space.id} value={space.id}>
                                {space.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">Select the space for which you want to allocate hours</p>
                      </div>
                    </div>

                    {/* Entity selection section */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Entity Selection</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="allocator">Allocator</Label>
                          <Input id="allocator" value={userRole} disabled />
                          <p className="text-xs text-gray-500">Your current role in the system</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recipientType">Recipient Type</Label>
                          <Select value={recipientType} onValueChange={setRecipientType}>
                            <SelectTrigger id="recipientType">
                              <SelectValue placeholder="Select recipient type" />
                            </SelectTrigger>
                            <SelectContent>
                              {getRecipientTypes().map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient">Specific Recipient</Label>
                        <Select value={recipient} onValueChange={setRecipient} disabled={!recipientType}>
                          <SelectTrigger id="recipient">
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            {getRecipients(recipientType).map((r) => (
                              <SelectItem key={r.id} value={r.id}>
                                {r.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Hours allocation section */}
                    <div className="space-y-6 pt-6 border-t">
                      <h3 className="text-lg font-medium">Hours Allocation</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="availableHours">Available to Allocate</Label>
                          <Input id="availableHours" value={availableHours} disabled />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hoursToAllocate">Hours to Allocate</Label>
                          <Input
                            id="hoursToAllocate"
                            type="number"
                            min="0"
                            max={availableHours}
                            value={hoursToAllocate}
                            onChange={(e) => setHoursToAllocate(Number(e.target.value))}
                          />
                          {hoursToAllocate > availableHours && (
                            <p className="text-xs text-red-500">Cannot allocate more than available hours</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reserveInternal"
                          checked={reserveForInternal}
                          onCheckedChange={(checked) => setReserveForInternal(checked as boolean)}
                          disabled={!["Developer", "Operator"].includes(userRole)}
                        />
                        <div>
                          <Label htmlFor="reserveInternal">Reserve for internal use</Label>
                          <p className="text-xs text-gray-500">
                            When checked, these hours will be reserved for your organization's internal use and cannot
                            be allocated further to other entities
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-5 rounded-md flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Allocation Impact</p>
                          <p className="text-sm text-blue-700">
                            After this allocation, you will have <strong>{remainingHours}</strong> hours remaining.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time period selection */}
                    <div className="space-y-6 pt-6 border-t">
                      <h3 className="text-lg font-medium">Time Period</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="month">Month</Label>
                            <Select
                              value={selectedMonth ? selectedMonth.getMonth().toString() : ""}
                              onValueChange={(value) => {
                                const newDate = new Date(selectedYear, Number.parseInt(value), 1)
                                setSelectedMonth(newDate)
                              }}
                            >
                              <SelectTrigger id="month">
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
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
                                ].map((month, index) => (
                                  <SelectItem key={month} value={index.toString()}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Select
                              value={selectedYear.toString()}
                              onValueChange={(value) => {
                                setSelectedYear(Number.parseInt(value))
                                if (selectedMonth) {
                                  const newDate = new Date(Number.parseInt(value), selectedMonth.getMonth(), 1)
                                  setSelectedMonth(newDate)
                                }
                              }}
                            >
                              <SelectTrigger id="year">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="bg-white rounded-md border p-4 shadow-sm">
                          {selectedMonth && (
                            <Calendar
                              mode="single"
                              selected={selectedMonth}
                              onSelect={setSelectedMonth}
                              disabled={(date) =>
                                date.getMonth() !== selectedMonth.getMonth() ||
                                date.getFullYear() !== selectedMonth.getFullYear()
                              }
                              className="rounded-md"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Terms agreement */}
                    <div className="pt-4 border-t">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="terms" className="font-medium">
                            I agree to the terms of allocation
                          </Label>
                          <p className="text-xs text-gray-500">
                            By checking this box, you confirm that you understand the allocation rules and that this
                            allocation cannot be modified after submission.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit" disabled={!isFormValid} onClick={handleSubmit}>
                    Create Allocation
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Allocation rules panel */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Allocation Rules</CardTitle>
                  <CardDescription>Guidelines for creating allocations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Available Hours</h4>
                    <p className="text-sm text-gray-600">
                      You have a maximum of <strong>{availableHours}</strong> hours available to allocate for the
                      selected space.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Hierarchy Permissions</h4>
                    <p className="text-sm text-gray-600">
                      As a <strong>{userRole}</strong>, you can allocate hours to:
                    </p>
                    <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                      {getRecipientTypes().map((type) => (
                        <li key={type}>{type}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Time Constraints</h4>
                    <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                      <li>Allocations must be for a full calendar month</li>
                      <li>You cannot allocate for past months</li>
                      <li>Allocations can be made up to 12 months in advance</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-md flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Important Note</p>
                      <p className="text-sm text-amber-700">
                        Once submitted, allocations cannot be modified. They can only be revoked, which will return the
                        hours to your available balance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="current" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Allocations</CardTitle>
              <CardDescription>View your existing hour allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex flex-wrap gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by space" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Spaces</SelectItem>
                        {spaces.map((space) => (
                          <SelectItem key={space.id} value={space.id}>
                            {space.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
                        <SelectItem value="jan">January 2023</SelectItem>
                        <SelectItem value="feb">February 2023</SelectItem>
                        <SelectItem value="dec">December 2022</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="corp">Corporates</SelectItem>
                        <SelectItem value="dev">Developers</SelectItem>
                        <SelectItem value="op">Operators</SelectItem>
                        <SelectItem value="emp">Employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View Allocation Hierarchy
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentAllocations.map((allocation) => (
                    <div key={allocation.id} className="border rounded-md p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{allocation.recipient}</h4>
                            <Badge variant="outline">{allocation.recipientType}</Badge>
                            {allocation.status === "Active" && (
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            )}
                            {allocation.status === "Expired" && (
                              <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
                            )}
                            {allocation.status === "Revoked" && (
                              <Badge className="bg-red-100 text-red-800">Revoked</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Space: {allocation.space} • {allocation.hours} hours • {allocation.month} {allocation.year}
                          </p>
                        </div>

                        <Button variant="ghost" size="sm">
                          View Allocation Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

