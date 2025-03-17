"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { DateRangeSelector } from "@/components/DateRangeSelector"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import { Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title, PointElement, LineElement)

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HKD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function FinancialPerformance() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  const [filterSpace, setFilterSpace] = useState<string>("all")
  const [filterActivityType, setFilterActivityType] = useState<string>("all")
  const [filterBookingType, setFilterBookingType] = useState<string>("all")

  // Updated mock data with more realistic values
  const financialData = React.useMemo(
    () => ({
      revenueByStatus: [
        { status: "Completed", amount: 850000, hours: 8500, color: "#96A090" },
        { status: "Paid", amount: 1250000, hours: 12500, color: "#A3D977" },
        { status: "Pending", amount: 450000, hours: 4500, color: "#EAD3AB" },
      ],
      revenueByActivity: [
        { name: "Strength Training", revenue: 750000, hours: 5000, color: "#96A090" },
        { name: "Pilates", revenue: 520000, hours: 4000, color: "#A3D977" },
        { name: "Yoga", revenue: 680000, hours: 5500, color: "#EAD3AB" },
        { name: "Physiotherapy", revenue: 600000, hours: 3000, color: "#F4C542" },
      ],
      revenueByBookingType: [
        { type: "One on One", revenue: 1200000, color: "#96A090" },
        { type: "Self Workout", revenue: 580000, color: "#A3D977" },
        { type: "2 on 1", revenue: 450000, color: "#EAD3AB" },
        { type: "3 on 1", revenue: 320000, color: "#F4C542" },
      ],
      topPerformingSpaces: [
        { name: "Palace One", revenue: 720000, hours: 6000, color: "#96A090" },
        { name: "Palace Two", revenue: 680000, hours: 5500, color: "#A3D977" },
        { name: "Palace Three", revenue: 580000, hours: 4800, color: "#EAD3AB" },
        { name: "Palace Four", revenue: 570000, hours: 4700, color: "#F4C542" },
      ],
      cancellationRevenueLoss: 150000,
      monthOverMonth: {
        currentMonthRevenue: 2550000,
        previousMonthRevenue: 2320000,
        revenueGrowth: 9.9,
      },
    }),
    [],
  )

  // Mock filter data
  const spaces = React.useMemo(
    () => [
      { id: "palace-one", name: "Palace One" },
      { id: "palace-two", name: "Palace Two" },
      { id: "palace-three", name: "Palace Three" },
      { id: "palace-four", name: "Palace Four" },
    ],
    [],
  )

  const activityTypes = React.useMemo(
    () => [
      { id: "strength-training", name: "Strength Training" },
      { id: "physiotherapy", name: "Physiotherapy" },
      { id: "yoga", name: "Yoga" },
      { id: "pilates", name: "Pilates" },
    ],
    [],
  )

  const bookingTypes = React.useMemo(
    () => [
      { id: "one-on-one", name: "One on One" },
      { id: "self-workout", name: "Self Workout" },
      { id: "two-on-one", name: "2 on 1" },
      { id: "three-on-one", name: "3 on 1" },
    ],
    [],
  )

  const totalRevenue = React.useMemo(
    () => financialData.revenueByStatus.reduce((sum, item) => sum + item.amount, 0),
    [financialData],
  )

  const chartOptions = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.dataset.label || ""
              if (label) {
                label += ": "
              }
              if (context.parsed.y !== null) {
                label += formatCurrency(context.parsed.y)
              }
              return label
            },
          },
        },
      },
    }),
    [],
  )

  const barChartOptions = React.useMemo(
    () => ({
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
          beginAtZero: true,
          grid: {
            display: true,
            color: "#E5E7EB",
          },
          ticks: {
            callback: (value: number) => formatCurrency(value),
            font: {
              size: 12,
            },
          },
        },
      },
    }),
    [chartOptions],
  )

  const revenueByStatusData = React.useMemo(
    () => ({
      labels: financialData.revenueByStatus.map((item) => item.status),
      datasets: [
        {
          data: financialData.revenueByStatus.map((item) => item.amount),
          backgroundColor: financialData.revenueByStatus.map((item) => item.color),
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    }),
    [financialData],
  )

  const revenueByActivityData = React.useMemo(
    () => ({
      labels: financialData.revenueByActivity.map((item) => item.name),
      datasets: [
        {
          type: "bar" as const,
          label: "Total Revenue",
          data: financialData.revenueByActivity.map((item) => item.revenue),
          backgroundColor: financialData.revenueByActivity.map((item) => item.color),
        },
      ],
    }),
    [financialData],
  )

  const revenueByBookingTypeData = React.useMemo(
    () => ({
      labels: financialData.revenueByBookingType.map((item) => item.type),
      datasets: [
        {
          data: financialData.revenueByBookingType.map((item) => item.revenue),
          backgroundColor: financialData.revenueByBookingType.map((item) => item.color),
        },
      ],
    }),
    [financialData],
  )

  const topPerformingSpacesData = React.useMemo(
    () => ({
      labels: financialData.topPerformingSpaces.map((item) => item.name),
      datasets: [
        {
          type: "bar" as const,
          label: "Total Revenue",
          data: financialData.topPerformingSpaces.map((item) => item.revenue),
          backgroundColor: financialData.topPerformingSpaces.map((item) => item.color),
        },
      ],
    }),
    [financialData],
  )

  // Function to export chart data
  const exportChartData = (chartId: string, data: any) => {
    // In a real application, you would convert the data to CSV or Excel format
    // For this demo, we'll just create a simple CSV string
    let csvContent = "data:text/csv;charset=utf-8,"

    if (chartId === "total-revenue") {
      csvContent += "Revenue Status,Amount\n"
      data.labels.forEach((label: string, index: number) => {
        csvContent += `${label},${data.datasets[0].data[index]}\n`
      })
    } else if (chartId === "revenue-by-activity") {
      csvContent += "Activity,Revenue\n"
      data.labels.forEach((label: string, index: number) => {
        csvContent += `${label},${data.datasets[0].data[index]}\n`
      })
    } else if (chartId === "top-performing-spaces") {
      csvContent += "Space,Revenue\n"
      data.labels.forEach((label: string, index: number) => {
        csvContent += `${label},${data.datasets[0].data[index]}\n`
      })
    } else if (chartId === "revenue-by-session-type") {
      csvContent += "Session Type,Revenue\n"
      data.labels.forEach((label: string, index: number) => {
        csvContent += `${label},${data.datasets[0].data[index]}\n`
      })
    }

    // Create a download link and trigger it
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${chartId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      {/* Financial Performance Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Financial Performance</h2>
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="flex space-x-2">
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
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter by Activity Type</h4>
                        <Select value={filterActivityType} onValueChange={setFilterActivityType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Activities</SelectItem>
                            {activityTypes.map((activity) => (
                              <SelectItem key={activity.id} value={activity.id}>
                                {activity.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter by Booking Type</h4>
                        <Select value={filterBookingType} onValueChange={setFilterBookingType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select booking type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Booking Types</SelectItem>
                            {bookingTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => exportChartData("total-revenue", revenueByStatusData)}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              <div className="mt-4 h-[180px]">
                <Bar
                  options={{
                    ...barChartOptions,
                    plugins: {
                      ...barChartOptions.plugins,
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  data={revenueByStatusData}
                />
              </div>
            </CardContent>
          </Card>

          {/* Achieved Unit Rate Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achieved Unit Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    (financialData.revenueByStatus.find((item) => item.status === "Completed")?.amount ?? 0) /
                      (financialData.revenueByStatus.find((item) => item.status === "Completed")?.hours ?? 1),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Achieved rate per hour for completed bookings</p>
              </div>
            </CardContent>
          </Card>

          {/* Month-over-Month Comparison Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Month-over-Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(financialData.monthOverMonth.currentMonthRevenue)}
                  </div>
                  <p className="text-xs text-muted-foreground">Current Month Revenue</p>
                </div>

                <div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(financialData.monthOverMonth.previousMonthRevenue)}
                  </div>
                  <p className="text-xs text-muted-foreground">Previous Month Revenue</p>
                </div>

                <div className="pt-4">
                  <div className="text-sm font-medium text-muted-foreground">Growth</div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold">
                      {formatCurrency(
                        financialData.monthOverMonth.currentMonthRevenue -
                          financialData.monthOverMonth.previousMonthRevenue,
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        financialData.monthOverMonth.revenueGrowth > 0 ? "text-green-600" : "text-red-600",
                      )}
                    >
                      ({financialData.monthOverMonth.revenueGrowth > 0 ? "+" : ""}
                      {financialData.monthOverMonth.revenueGrowth}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Revenue Loss Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancellation Revenue Loss</CardTitle>
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
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Activity Type</h4>
                      <Select value={filterActivityType} onValueChange={setFilterActivityType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activities</SelectItem>
                          {activityTypes.map((activity) => (
                            <SelectItem key={activity.id} value={activity.id}>
                              {activity.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Booking Type</h4>
                      <Select value={filterBookingType} onValueChange={setFilterBookingType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select booking type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Booking Types</SelectItem>
                          {bookingTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-destructive">
                  {formatCurrency(financialData.cancellationRevenueLoss)}
                </div>
                <p className="text-xs text-muted-foreground">Lost revenue from cancellations</p>
                <div className="text-sm text-destructive">
                  {((financialData.cancellationRevenueLoss / totalRevenue) * 100).toFixed(1)}% of total revenue
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {/* Revenue by Activity Type */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue by Activity</CardTitle>
              <div className="flex space-x-2">
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
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => exportChartData("revenue-by-activity", revenueByActivityData)}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar options={barChartOptions} data={revenueByActivityData} />
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left font-medium">Activity</th>
                      <th className="text-right font-medium">Total Revenue</th>
                      <th className="text-right font-medium">Unit Hourly Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.revenueByActivity.map((item) => (
                      <tr key={item.name}>
                        <td className="py-2">{item.name}</td>
                        <td className="text-right">{formatCurrency(item.revenue)}</td>
                        <td className="text-right">{formatCurrency(item.revenue / item.hours)}/hr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Spaces */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performing Spaces</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => exportChartData("top-performing-spaces", topPerformingSpacesData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar options={barChartOptions} data={topPerformingSpacesData} />
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left font-medium">Space</th>
                      <th className="text-right font-medium">Total Revenue</th>
                      <th className="text-right font-medium">Unit Hourly Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.topPerformingSpaces.map((item) => (
                      <tr key={item.name}>
                        <td className="py-2">{item.name}</td>
                        <td className="text-right">{formatCurrency(item.revenue)}</td>
                        <td className="text-right">{formatCurrency(item.revenue / item.hours)}/hr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Booking Type */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue by Session Type</CardTitle>
            <div className="flex space-x-2">
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
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by Activity Type</h4>
                      <Select value={filterActivityType} onValueChange={setFilterActivityType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activities</SelectItem>
                          {activityTypes.map((activity) => (
                            <SelectItem key={activity.id} value={activity.id}>
                              {activity.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => exportChartData("revenue-by-session-type", revenueByBookingTypeData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Pie options={chartOptions} data={revenueByBookingTypeData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

