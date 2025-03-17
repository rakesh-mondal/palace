"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Building2, XCircle, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { DateRangeSelector } from "@/components/DateRangeSelector"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import { SpaceUtilizationHeatmap } from "@/components/SpaceUtilizationHeatmap"
import { Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

export function BookingPerformance() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  const [filterSpace, setFilterSpace] = useState<string>("all")
  const [filterActivityType, setFilterActivityType] = useState<string>("all")
  const [filterBookingType, setFilterBookingType] = useState<string>("all")

  const bookingData = useMemo(
    () => ({
      metrics: [
        {
          label: "Total Bookings",
          value: "856",
          change: "+12%",
          trend: "up",
          bgColor: "bg-card",
          icon: Calendar,
          ariaLabel: "Total bookings: 856, up 12% from last month",
        },
        {
          label: "Best Space",
          value: "Palace One",
          subValue: "289 bookings",
          trend: "up",
          bgColor: "bg-card",
          icon: Building2,
          ariaLabel: "Best performing space: Palace One with 289 bookings",
        },
        {
          label: "Cancellations",
          value: "45",
          subValue: "5.2% of total bookings",
          trend: "down",
          bgColor: "bg-card",
          icon: XCircle,
          ariaLabel: "45 cancellations, 5.2% of total bookings",
        },
        {
          label: "New Bookings Growth",
          value: "+32%",
          subValue: {
            current: "485",
            previous: "367",
            label: "Current vs Previous Month",
          },
          trend: "up",
          bgColor: "bg-card",
          icon: TrendingUp,
          ariaLabel: "New bookings growth: 32%, with 485 current month bookings vs 367 previous month",
        },
        {
          label: "First-time Users",
          value: "156",
          subValue: {
            bookings: "485",
            percentage: "32%",
            label: "of total users",
          },
          trend: "up",
          bgColor: "bg-card",
          icon: Users,
          ariaLabel: "156 first-time users with 485 bookings, representing 32% of total users",
        },
      ],
      activityTypes: [
        { name: "Strength Training", value: 35, date: new Date(), color: "#96A090" },
        { name: "Physiotherapy", value: 25, date: new Date(), color: "#A3D977" },
        { name: "Yoga", value: 22, date: new Date(), color: "#EAD3AB" },
        { name: "Pilates", value: 18, date: new Date(), color: "#F4C542" },
      ],
      spacePerformance: [
        { name: "Palace One", bookings: 289, color: "#96A090" },
        { name: "Palace Two", bookings: 245, color: "#A3D977" },
        { name: "Palace Three", bookings: 198, color: "#EAD3AB" },
        { name: "Palace Four", bookings: 124, color: "#F4C542" },
      ],
      sessionTypes: [
        { name: "Self-workout", value: 40, color: "#96A090" },
        { name: "1-on-1", value: 30, color: "#A3D977" },
        { name: "2-on-1", value: 20, color: "#EAD3AB" },
        { name: "3-on-1", value: 10, color: "#E57373" },
      ],
      hourlyDistribution: {
        labels: [
          "6 AM",
          "7 AM",
          "8 AM",
          "9 AM",
          "10 AM",
          "11 AM",
          "12 PM",
          "1 PM",
          "2 PM",
          "3 PM",
          "4 PM",
          "5 PM",
          "6 PM",
          "7 PM",
          "8 PM",
          "9 PM",
          "10 PM",
        ],
        data: [1, 12, 18, 22, 51, 48, 49, 43, 31, 25, 13, 30, 21, 8, 8, 5, 1],
      },
    }),
    [],
  )

  // Mock filter data
  const spaces = [
    { id: "palace-one", name: "Palace One" },
    { id: "palace-two", name: "Palace Two" },
    { id: "palace-three", name: "Palace Three" },
    { id: "palace-four", name: "Palace Four" },
  ]

  const activityTypes = [
    { id: "strength-training", name: "Strength Training" },
    { id: "physiotherapy", name: "Physiotherapy" },
    { id: "yoga", name: "Yoga" },
    { id: "pilates", name: "Pilates" },
  ]

  const bookingTypes = [
    { id: "one-on-one", name: "One on One" },
    { id: "self-workout", name: "Self Workout" },
    { id: "two-on-one", name: "2 on 1" },
    { id: "three-on-one", name: "3 on 1" },
  ]

  const chartOptions = useMemo(
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
              const label = context.label || ""
              const value = context.raw || 0
              const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ${value} (${percentage}%)`
            },
          },
        },
      },
    }),
    [],
  )

  const hourlyDistributionOptions = useMemo(
    () => ({
      ...chartOptions,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#E5E7EB",
          },
          ticks: {
            stepSize: 10,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        ...chartOptions.plugins,
        legend: {
          display: false, // Hide the legend
        },
        title: {
          display: true,
          text: "Distribution of Bookings Across Times",
          font: {
            size: 16,
          },
        },
      },
    }),
    [chartOptions],
  )

  const hourlyDistributionData = useMemo(
    () => ({
      labels: bookingData.hourlyDistribution.labels,
      datasets: [
        {
          data: bookingData.hourlyDistribution.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)", // Soft red
            "rgba(54, 162, 235, 0.7)", // Soft blue
            "rgba(255, 206, 86, 0.7)", // Soft yellow
            "rgba(75, 192, 192, 0.7)", // Soft teal
            "rgba(153, 102, 255, 0.7)", // Soft purple
            "rgba(255, 159, 64, 0.7)", // Soft orange
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [bookingData.hourlyDistribution],
  )

  const activityTypesData = useMemo(
    () => ({
      labels: bookingData.activityTypes.map((item) => item.name),
      datasets: [
        {
          label: "Number of Bookings",
          data: bookingData.activityTypes.map((item) => item.value),
          backgroundColor: bookingData.activityTypes.map((item) => item.color),
        },
      ],
    }),
    [bookingData.activityTypes],
  )

  const spacePerformanceData = useMemo(
    () => ({
      labels: bookingData.spacePerformance.map((item) => item.name),
      datasets: [
        {
          label: "Number of Bookings",
          data: bookingData.spacePerformance.map((item) => item.bookings),
          backgroundColor: bookingData.spacePerformance.map((item) => item.color),
        },
      ],
    }),
    [bookingData.spacePerformance],
  )

  const sessionTypesData = useMemo(
    () => ({
      labels: bookingData.sessionTypes.map((item) => item.name),
      datasets: [
        {
          data: bookingData.sessionTypes.map((item) => item.value),
          backgroundColor: bookingData.sessionTypes.map((item) => item.color),
        },
      ],
    }),
    [bookingData.sessionTypes],
  )

  // Function to export chart data
  const exportChartData = (chartId: string, data: any) => {
    // In a real application, you would convert the data to CSV or Excel format
    // For this demo, we'll just create a simple CSV string
    let csvContent = "data:text/csv;charset=utf-8,"

    if (chartId === "bookings-by-activity") {
      csvContent += "Activity Type,Number of Bookings\n"
      data.labels.forEach((label: string, index: number) => {
        csvContent += `${label},${data.datasets[0].data[index]}\n`
      })
    } else if (chartId === "space-performance") {
      csvContent += "Space,Number of Bookings\n"
      data.labels.forEach((label: string, index: number) => {
        csvContent += `${label},${data.datasets[0].data[index]}\n`
      })
    } else if (chartId === "booking-type-breakup") {
      csvContent += "Booking Type,Percentage\n"
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
    <div className="space-y-4 animate-fade-in" role="region" aria-label="Booking Performance Dashboard">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Booking Performance</h2>
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

      {/* Metrics Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
        {bookingData.metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden rounded-lg border bg-white" aria-label={metric.ariaLabel}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">{metric.label}</span>
                  <metric.icon className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </div>
                <span className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</span>
                {typeof metric.subValue === "string" ? (
                  <span className="text-sm text-gray-600 font-medium">{metric.subValue}</span>
                ) : metric.subValue && "current" in metric.subValue ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Month</span>
                      <span className="font-medium">{metric.subValue.current}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Previous Month</span>
                      <span className="font-medium">{metric.subValue.previous}</span>
                    </div>
                    <span className="text-sm text-gray-600">{metric.subValue.label}</span>
                  </div>
                ) : metric.subValue && "bookings" in metric.subValue ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Bookings</span>
                      <span className="font-medium">{metric.subValue.bookings}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">
                        {metric.subValue.percentage} {metric.subValue.label}
                      </span>
                    </div>
                  </div>
                ) : null}
                {metric.change && (
                  <span
                    className={cn(
                      "text-sm font-semibold mt-2",
                      metric.trend === "up" ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {metric.change} vs previous month
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hourly Distribution and Space Utilization Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Hourly Distribution Chart */}
        <Card className="overflow-hidden bg-white">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">Hourly Booking Distribution</CardTitle>
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
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[400px]">
              <Bar options={hourlyDistributionOptions} data={hourlyDistributionData} />
            </div>
          </CardContent>
        </Card>

        {/* Space Utilization Heatmap */}
        <Card className="overflow-hidden bg-white">
          <SpaceUtilizationHeatmap />
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="overflow-hidden bg-white">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">Bookings by Activity Type</CardTitle>
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
                onClick={() => exportChartData("bookings-by-activity", activityTypesData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-center">
            <div
              className="h-[200px] w-full max-w-md"
              role="img"
              aria-label="Bar chart showing booking distribution by activity type"
            >
              <Bar options={chartOptions} data={activityTypesData} />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">Space Performance</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => exportChartData("space-performance", spacePerformanceData)}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-center">
            <div
              className="h-[180px] w-full max-w-md"
              role="img"
              aria-label="Bar chart showing space performance based on bookings"
            >
              <Bar options={{ ...chartOptions, indexAxis: "y" as const }} data={spacePerformanceData} />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">Break-up by Booking Type</CardTitle>
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
                onClick={() => exportChartData("booking-type-breakup", sessionTypesData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div
              className="flex items-center justify-between h-[180px]"
              role="img"
              aria-label="Pie chart showing break-up of booking types"
            >
              <Pie options={chartOptions} data={sessionTypesData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Export a DateFilter component for external use if needed
BookingPerformance.DateFilter = function DateFilter() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  return (
    <DateRangeSelector
      date={date}
      onDateChange={(newDate) => {
        setDate(newDate)
        // Here you would typically fetch new data based on the selected date range
        console.log("New date range selected:", newDate)
      }}
    />
  )
}

