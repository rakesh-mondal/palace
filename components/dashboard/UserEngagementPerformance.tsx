"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Users, Activity, Filter } from "lucide-react"
import { DateRangeSelector } from "@/components/DateRangeSelector"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)

export function UserEngagementPerformance() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  const [filterSpace, setFilterSpace] = useState<string>("all")

  // Mock filter data
  const spaces = [
    { id: "palace-one", name: "Palace One" },
    { id: "palace-two", name: "Palace Two" },
    { id: "palace-three", name: "Palace Three" },
    { id: "palace-four", name: "Palace Four" },
  ]

  // Update the mock data to include VIP vs regular users
  const userEngagementData = {
    newUsers: {
      total: 234,
      vip: 45,
      regular: 189,
    },
    newTrainers: {
      total: 25,
      breakdown: [
        { type: "Personal Trainer", count: 10, bookings: 80, color: "#96A090" },
        { type: "Physiotherapist", count: 6, bookings: 45, color: "#A3D977" },
        { type: "Pilates Instructor", count: 5, bookings: 35, color: "#EAD3AB" },
        { type: "Yoga Instructor", count: 4, bookings: 30, color: "#F4C542" },
      ],
      totalBookings: 190,
    },
    activityBreakdown: [
      { type: "Personal Training", bookings: 450, percentage: 40, color: "#96A090" },
      { type: "Physiotherapy", bookings: 280, percentage: 25, color: "#A3D977" },
      { type: "Pilates", bookings: 225, percentage: 20, color: "#EAD3AB" },
      { type: "Yoga", bookings: 170, percentage: 15, color: "#F4C542" },
    ],
    totalUniqueUsers: {
      total: 1247,
      vip: 208,
      regular: 1039,
    },
    topTrainers: [
      { name: "Sarah Chen", type: "Personal Trainer", sessions: 156 },
      { name: "Mike Johnson", type: "Physiotherapist", sessions: 142 },
      { name: "Emma Wilson", type: "Yoga Instructor", sessions: 128 },
      { name: "David Lee", type: "Pilates Instructor", sessions: 115 },
      { name: "Lisa Wang", type: "Personal Trainer", sessions: 98 },
    ],
    topUsers: [
      { name: "Oscar", sessions: 45, color: "#96A090", isVip: true },
      { name: "Steven", sessions: 42, color: "#A3D977", isVip: true },
      { name: "Jason", sessions: 38, color: "#EAD3AB", isVip: false },
      { name: "Emily", sessions: 35, color: "#F4C542", isVip: false },
      { name: "Sarah", sessions: 32, color: "#E57373", isVip: true },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  }

  const topUsersChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value,
        },
      },
    },
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.raw} sessions`
          },
        },
      },
    },
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">User Engagement Performance</h2>
        <DateRangeSelector
          date={dateRange}
          onDateChange={(newDateRange) => {
            setDateRange(
              newDateRange || {
                from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                to: new Date(),
              },
            )
            // Here you would typically fetch new data based on the selected date range
            console.log("New date range selected:", newDateRange)
          }}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* New Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{userEngagementData.newUsers.total}</div>
                <p className="text-xs text-muted-foreground">New signups this period</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">VIP Users</p>
                  <div className="text-base font-semibold">{userEngagementData.newUsers.vip}</div>
                  <p className="text-xs text-muted-foreground">
                    {((userEngagementData.newUsers.vip / userEngagementData.newUsers.total) * 100).toFixed(1)}% of new
                    users
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Regular Users</p>
                  <div className="text-base font-semibold">{userEngagementData.newUsers.regular}</div>
                  <p className="text-xs text-muted-foreground">
                    {((userEngagementData.newUsers.regular / userEngagementData.newUsers.total) * 100).toFixed(1)}% of
                    new users
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Trainers Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Trainers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{userEngagementData.newTrainers.total}</div>
                <p className="text-xs text-muted-foreground">Total new trainers onboarded</p>
              </div>
              {userEngagementData.newTrainers.breakdown.map((trainer) => (
                <div key={trainer.type} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{trainer.type}</p>
                    <p className="text-xs text-muted-foreground">{trainer.count} onboarded</p>
                  </div>
                  <div className="text-sm font-medium">{trainer.bookings} bookings</div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <p className="text-sm font-medium">Total Bookings</p>
                <p className="text-lg font-bold">{userEngagementData.newTrainers.totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Breakdown Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Breakdown</CardTitle>
            <div className="flex space-x-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Space</h4>
                      <Select value={filterSpace} onValueChange={setFilterSpace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select space" />
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
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Pie
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const label = context.label || ""
                          const value = context.raw as number
                          const total = (context.dataset.data as number[]).reduce((acc, cur) => acc + cur, 0)
                          const percentage = ((value / total) * 100).toFixed(1)
                          return `${label}: ${value} bookings (${percentage}%)`
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: userEngagementData.activityBreakdown.map((item) => item.type),
                  datasets: [
                    {
                      data: userEngagementData.activityBreakdown.map((item) => item.bookings),
                      backgroundColor: userEngagementData.activityBreakdown.map((item) => item.color),
                    },
                  ],
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Total Unique Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unique Users</CardTitle>
            <div className="flex space-x-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Space</h4>
                      <Select value={filterSpace} onValueChange={setFilterSpace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select space" />
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
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{userEngagementData.totalUniqueUsers.total}</div>
                <p className="text-xs text-muted-foreground">Users with at least 1 session</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">VIP Users</p>
                  <div className="text-base font-semibold">{userEngagementData.totalUniqueUsers.vip}</div>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (userEngagementData.totalUniqueUsers.vip / userEngagementData.totalUniqueUsers.total) *
                      100
                    ).toFixed(1)}
                    % of total users
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Regular Users</p>
                  <div className="text-base font-semibold">{userEngagementData.totalUniqueUsers.regular}</div>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (userEngagementData.totalUniqueUsers.regular / userEngagementData.totalUniqueUsers.total) *
                      100
                    ).toFixed(1)}
                    % of total users
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-4">Monthly Active Users</div>
            </div>
          </CardContent>
        </Card>

        {/* Top Trainers Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Trainers</CardTitle>
            <div className="flex space-x-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Space</h4>
                      <Select value={filterSpace} onValueChange={setFilterSpace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select space" />
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
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userEngagementData.topTrainers.map((trainer, index) => (
                <div key={trainer.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{trainer.name}</p>
                    <p className="text-xs text-muted-foreground">{trainer.type}</p>
                  </div>
                  <div className="text-sm font-medium">{trainer.sessions} sessions</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Users</CardTitle>
            <div className="flex space-x-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Space</h4>
                      <Select value={filterSpace} onValueChange={setFilterSpace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select space" />
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
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Bar
                options={{
                  ...topUsersChartOptions,
                  plugins: {
                    ...topUsersChartOptions.plugins,
                    tooltip: {
                      callbacks: {
                        label: (context: any) => {
                          const user = userEngagementData.topUsers[context.dataIndex]
                          return `${user.name} (${user.isVip ? "VIP" : "Regular"}): ${context.raw} sessions`
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: userEngagementData.topUsers.map((user) => `${user.name}${user.isVip ? " (VIP)" : ""}`),
                  datasets: [
                    {
                      label: "Sessions",
                      data: userEngagementData.topUsers.map((user) => user.sessions),
                      backgroundColor: userEngagementData.topUsers.map((user) => user.color),
                    },
                  ],
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

