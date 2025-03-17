"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowUpRight,
  CalendarIcon,
  ChevronDown,
  Download,
  Filter,
  Printer,
  Share2,
  Zap,
  BarChart3,
  Clock,
  CalendarIcon as CalendarIconFull,
  Building,
  Home,
  Users,
  Code,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Check,
  Info,
} from "lucide-react"
import { format } from "date-fns"

export default function UsageAnalyticsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [compareEnabled, setCompareEnabled] = useState(false)
  const [viewMode, setViewMode] = useState("overall")
  const [timeGranularity, setTimeGranularity] = useState("daily")

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usage Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into how allocated hours are being utilized</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start w-[240px] text-left font-normal">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {date ? format(date, "MMMM yyyy") : "Select period"}
                <ChevronDown className="w-4 h-4 ml-auto opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 border-b">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-7">
                    This Month
                  </Button>
                  <Button variant="outline" size="sm" className="h-7">
                    Last Month
                  </Button>
                  <Button variant="outline" size="sm" className="h-7">
                    Last Quarter
                  </Button>
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <Checkbox
                    id="compare"
                    checked={compareEnabled}
                    onCheckedChange={(checked) => setCompareEnabled(checked as boolean)}
                  />
                  <label
                    htmlFor="compare"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Compare with previous period
                  </label>
                </div>
              </div>
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">Overall</SelectItem>
              <SelectItem value="entity">By Entity Type</SelectItem>
              <SelectItem value="space">By Space</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
              </span>{" "}
              vs previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hrs</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 0.4 hrs
              </span>{" "}
              vs previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Peak Utilization</CardTitle>
            <CalendarIconFull className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tuesdays</div>
            <p className="text-xs text-muted-foreground">2-5pm (highest demand)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Least Utilized</CardTitle>
            <CalendarIconFull className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sundays</div>
            <p className="text-xs text-muted-foreground">8-11am (lowest demand)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Most Utilized Space</CardTitle>
            <Home className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Studio B</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 92%
              </span>{" "}
              utilization rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Utilization Trend</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">↑ 12%</div>
            <p className="text-xs text-muted-foreground">vs previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </CardTitle>
            <CardDescription>Refine analytics view</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Entity Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="developers" defaultChecked />
                  <label htmlFor="developers" className="text-sm">
                    Developers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="operators" defaultChecked />
                  <label htmlFor="operators" className="text-sm">
                    Operators
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="corporates" defaultChecked />
                  <label htmlFor="corporates" className="text-sm">
                    Corporates
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="employees" defaultChecked />
                  <label htmlFor="employees" className="text-sm">
                    Employees
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Space Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="studios" defaultChecked />
                  <label htmlFor="studios" className="text-sm">
                    Studios
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="meeting-rooms" defaultChecked />
                  <label htmlFor="meeting-rooms" className="text-sm">
                    Meeting Rooms
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="offices" defaultChecked />
                  <label htmlFor="offices" className="text-sm">
                    Offices
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="common-areas" defaultChecked />
                  <label htmlFor="common-areas" className="text-sm">
                    Common Areas
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Time Period</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekdays" defaultChecked />
                  <label htmlFor="weekdays" className="text-sm">
                    Weekdays
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekends" defaultChecked />
                  <label htmlFor="weekends" className="text-sm">
                    Weekends
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="business-hours" defaultChecked />
                  <label htmlFor="business-hours" className="text-sm">
                    Business Hours (9-5)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="after-hours" defaultChecked />
                  <label htmlFor="after-hours" className="text-sm">
                    After Hours
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Booking Duration</h3>
              <Slider defaultValue={[0, 8]} max={12} step={0.5} />
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">0 hrs</span>
                <span className="text-xs text-muted-foreground">12 hrs</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Utilization Threshold</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  Low
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Medium
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  High
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  All
                </Badge>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Main Analytics Content */}
        <div className="space-y-8 lg:col-span-3">
          {/* Primary Utilization Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Utilization Over Time</CardTitle>
              <CardDescription>Allocated hours vs. actual utilized hours</CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant={timeGranularity === "hourly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeGranularity("hourly")}
                >
                  Hourly
                </Button>
                <Button
                  variant={timeGranularity === "daily" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeGranularity("daily")}
                >
                  Daily
                </Button>
                <Button
                  variant={timeGranularity === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeGranularity("weekly")}
                >
                  Weekly
                </Button>
                <Button
                  variant={timeGranularity === "monthly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeGranularity("monthly")}
                >
                  Monthly
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              {/* Placeholder for stacked area chart */}
              <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Stacked Area Chart: Utilization Over Time</p>
                  <p className="text-xs text-muted-foreground">
                    Showing allocated vs. utilized hours with entity type breakdown
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span> Developers
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span> Operators
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full"></span> Corporates
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 border border-dashed border-gray-400 rounded-full"></span>{" "}
                Allocated
                <span className="inline-block w-3 h-3 bg-gray-400 rounded-full"></span> Utilized
              </div>
            </CardFooter>
          </Card>

          {/* Usage Patterns Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage Heatmap</CardTitle>
                <CardDescription>Utilization density by day and time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Placeholder for heatmap */}
                <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                  <div className="text-center">
                    <CalendarIconFull className="w-10 h-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Heatmap: Usage Patterns</p>
                    <p className="text-xs text-muted-foreground">
                      Days vs. hours with color intensity showing utilization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Distribution</CardTitle>
                <CardDescription>Breakdown by time, day, and entity type</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="time">
                  <TabsList className="w-full">
                    <TabsTrigger value="time" className="flex-1">
                      Time of Day
                    </TabsTrigger>
                    <TabsTrigger value="day" className="flex-1">
                      Day of Week
                    </TabsTrigger>
                    <TabsTrigger value="entity" className="flex-1">
                      Entity Type
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="time" className="h-[250px]">
                    {/* Placeholder for time distribution chart */}
                    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                      <div className="text-center">
                        <Clock className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Distribution by Time of Day</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="day" className="h-[250px]">
                    {/* Placeholder for day distribution chart */}
                    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                      <div className="text-center">
                        <CalendarIconFull className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Distribution by Day of Week</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="entity" className="h-[250px]">
                    {/* Placeholder for entity distribution chart */}
                    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Distribution by Entity Type</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Entity Utilization Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Entity Utilization Comparison</CardTitle>
              <CardDescription>Ranking entities by utilization metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="absolute">
                <TabsList className="w-full">
                  <TabsTrigger value="absolute" className="flex-1">
                    Absolute Hours
                  </TabsTrigger>
                  <TabsTrigger value="efficiency" className="flex-1">
                    Efficiency %
                  </TabsTrigger>
                  <TabsTrigger value="growth" className="flex-1">
                    Growth/Decline
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="absolute" className="h-[250px]">
                  {/* Placeholder for absolute hours chart */}
                  <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Entities Ranked by Absolute Hours</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="efficiency" className="h-[250px]">
                  {/* Placeholder for efficiency chart */}
                  <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Entities Ranked by Utilization Efficiency</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="growth" className="h-[250px]">
                  {/* Placeholder for growth chart */}
                  <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Entities Ranked by Growth/Decline</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Entity Utilization Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Entity</th>
                      <th className="px-4 py-3 text-right font-medium">Allocated</th>
                      <th className="px-4 py-3 text-right font-medium">Utilized</th>
                      <th className="px-4 py-3 text-right font-medium">Utilization %</th>
                      <th className="px-4 py-3 text-right font-medium">Trend</th>
                      <th className="px-4 py-3 text-right font-medium">vs Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Code className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Acme Development</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">1,200 hrs</td>
                      <td className="px-4 py-3 text-right">1,056 hrs</td>
                      <td className="px-4 py-3 text-right font-medium">88%</td>
                      <td className="px-4 py-3 text-right text-green-600">↑ 5%</td>
                      <td className="px-4 py-3 text-right text-green-600">+10%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-purple-500" />
                          <span>Global Corp</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">950 hrs</td>
                      <td className="px-4 py-3 text-right">798 hrs</td>
                      <td className="px-4 py-3 text-right font-medium">84%</td>
                      <td className="px-4 py-3 text-right text-green-600">↑ 12%</td>
                      <td className="px-4 py-3 text-right text-green-600">+6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-green-500" />
                          <span>Metro Operations</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">800 hrs</td>
                      <td className="px-4 py-3 text-right">584 hrs</td>
                      <td className="px-4 py-3 text-right font-medium">73%</td>
                      <td className="px-4 py-3 text-right text-red-600">↓ 3%</td>
                      <td className="px-4 py-3 text-right text-red-600">-5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Code className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Tech Innovators</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">650 hrs</td>
                      <td className="px-4 py-3 text-right">507 hrs</td>
                      <td className="px-4 py-3 text-right font-medium">78%</td>
                      <td className="px-4 py-3 text-right text-green-600">↑ 8%</td>
                      <td className="px-4 py-3 text-right">0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-purple-500" />
                          <span>CBRE</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">500 hrs</td>
                      <td className="px-4 py-3 text-right">365 hrs</td>
                      <td className="px-4 py-3 text-right font-medium">73%</td>
                      <td className="px-4 py-3 text-right text-green-600">↑ 2%</td>
                      <td className="px-4 py-3 text-right text-red-600">-5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Space Utilization Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Space Utilization Analytics</CardTitle>
              <CardDescription>Detailed breakdown by space type and location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-sm font-medium">Space Usage Breakdown</h3>
                  {/* Placeholder for space usage chart */}
                  <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                    <div className="text-center">
                      <Home className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Space Usage Distribution</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-medium">Occupancy Rates by Space</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Studio A</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Studio B</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Meeting Room C</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: "76%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Office Suite D</span>
                        <span className="text-sm font-medium">64%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-2 bg-orange-500 rounded-full" style={{ width: "64%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 mt-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-sm font-medium">Average Duration by Space</h3>
                  {/* Placeholder for duration chart */}
                  <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Average Booking Duration</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-medium">Underutilized Capacity</h3>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 mt-0.5 text-amber-500" />
                      <div>
                        <h4 className="font-medium">Potential Optimization Opportunities</h4>
                        <ul className="mt-2 ml-5 text-sm list-disc space-y-1">
                          <li>Office Suite E is only at 42% utilization</li>
                          <li>Weekend availability in Studio C is underutilized</li>
                          <li>Morning slots (8-10am) have low booking rates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Analytics Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Forecasting, anomalies, and optimization insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="forecast">
                <TabsList className="w-full">
                  <TabsTrigger value="forecast" className="flex-1">
                    Forecasting
                  </TabsTrigger>
                  <TabsTrigger value="anomalies" className="flex-1">
                    Anomaly Detection
                  </TabsTrigger>
                  <TabsTrigger value="correlation" className="flex-1">
                    Correlation Analysis
                  </TabsTrigger>
                  <TabsTrigger value="optimization" className="flex-1">
                    Optimization
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="forecast" className="space-y-4">
                  <div className="h-[200px] mt-4">
                    {/* Placeholder for forecasting chart */}
                    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Utilization Forecasting</p>
                        <p className="text-xs text-muted-foreground">Projected trends for next 3 months</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 mt-0.5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Forecast Insights</h4>
                        <p className="mt-1 text-sm">
                          Based on historical patterns, we expect a 15% increase in utilization over the next quarter,
                          with peak demand shifting toward mid-week afternoons.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="anomalies" className="space-y-4">
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 text-amber-500" />
                        <div>
                          <h4 className="font-medium">Unusual Patterns Detected</h4>
                          <ul className="mt-2 ml-5 text-sm list-disc space-y-1">
                            <li>Unexpected 40% drop in Studio A utilization on Thursdays</li>
                            <li>Abnormal spike in weekend bookings for Meeting Room B</li>
                            <li>Tech Innovators showing 30% decrease in utilization this month</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="h-[150px]">
                      {/* Placeholder for anomaly chart */}
                      <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                        <div className="text-center">
                          <AlertTriangle className="w-8 h-8 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">Anomaly Detection Visualization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="correlation" className="space-y-4">
                  <div className="h-[200px] mt-4">
                    {/* Placeholder for correlation chart */}
                    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-md">
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Correlation Analysis</p>
                        <p className="text-xs text-muted-foreground">Factors affecting utilization rates</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 mt-0.5 text-yellow-500" />
                      <div>
                        <h4 className="font-medium">Key Correlations Found</h4>
                        <ul className="mt-2 ml-5 text-sm list-disc space-y-1">
                          <li>Strong correlation between weather conditions and studio bookings</li>
                          <li>Entity size correlates with booking frequency but not duration</li>
                          <li>Negative correlation between advance notice and cancellation rate</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="optimization" className="space-y-4">
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md bg-green-50">
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Optimization Recommendations</h4>
                          <ul className="mt-2 ml-5 text-sm list-disc space-y-1">
                            <li>Reallocate 200 hours from Office Suite E to Studio B to match demand</li>
                            <li>Implement tiered pricing for peak hours (Tues-Thurs, 2-5pm)</li>
                            <li>Offer incentives for morning bookings to balance utilization</li>
                            <li>Consider converting Meeting Room D to additional studio space</li>
                          </ul>
                          <div className="mt-3">
                            <Button size="sm" className="gap-1">
                              <Check className="w-3 h-3" /> Apply Recommendations
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 mt-0.5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">"What-If" Scenario Modeling</h4>
                          <p className="mt-1 text-sm">Explore potential outcomes by adjusting allocation parameters.</p>
                          <div className="grid gap-4 mt-3 md:grid-cols-2">
                            <div>
                              <Label htmlFor="reallocation" className="text-xs">
                                Reallocation Amount
                              </Label>
                              <div className="flex mt-1 gap-2">
                                <Input
                                  id="reallocation"
                                  type="number"
                                  placeholder="Hours"
                                  className="h-8"
                                  defaultValue="200"
                                />
                                <Select defaultValue="studio-b">
                                  <SelectTrigger className="h-8 w-[120px]">
                                    <SelectValue placeholder="To Space" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="studio-a">Studio A</SelectItem>
                                    <SelectItem value="studio-b">Studio B</SelectItem>
                                    <SelectItem value="meeting-c">Meeting C</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="flex items-end">
                              <Button size="sm">Run Simulation</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

