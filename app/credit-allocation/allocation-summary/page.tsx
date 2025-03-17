"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, Download, Printer, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AllocationSummaryPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [viewLevel, setViewLevel] = useState("system")
  const [spaceFilter, setSpaceFilter] = useState("all")
  const [entityTypeFilter, setEntityTypeFilter] = useState("all")

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Allocation Summary</h1>
          <p className="text-muted-foreground">Comprehensive overview of system-wide allocations</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Time Period Selector */}
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-9 px-2 font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>March 2025</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Space Filter */}
          <Select value={spaceFilter} onValueChange={setSpaceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Space" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Spaces</SelectItem>
              <SelectItem value="conference">Conference Rooms</SelectItem>
              <SelectItem value="workstation">Workstations</SelectItem>
              <SelectItem value="event">Event Spaces</SelectItem>
              <SelectItem value="specialized">Specialized Rooms</SelectItem>
            </SelectContent>
          </Select>

          {/* Entity Type Filter */}
          <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Entity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="developer">Developers</SelectItem>
              <SelectItem value="operator">Operators</SelectItem>
              <SelectItem value="corporate">Corporates</SelectItem>
            </SelectContent>
          </Select>

          {/* View Level Selector */}
          <Select value={viewLevel} onValueChange={setViewLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System-wide</SelectItem>
              <SelectItem value="entity">By Entity Type</SelectItem>
            </SelectContent>
          </Select>

          {/* Export/Share/Print */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Hours in System</CardTitle>
            <CardDescription>All available hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">10,000</div>
              <Badge variant="outline" className="text-xs">
                Hours
              </Badge>
            </div>
            <Progress value={100} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Hours Allocated</CardTitle>
            <CardDescription>Assigned to entities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">8,200</div>
              <Badge variant="outline" className="text-xs">
                82%
              </Badge>
            </div>
            <Progress value={82} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Hours Utilized</CardTitle>
            <CardDescription>Actually used by recipients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">5,600</div>
              <Badge variant="outline" className="text-xs">
                56%
              </Badge>
            </div>
            <Progress value={56} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Allocation Efficiency</CardTitle>
            <CardDescription>Utilization of allocated hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">68%</div>
              <Badge className="bg-amber-500 text-xs">Medium</Badge>
            </div>
            <Progress value={68} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Hours Available</CardTitle>
            <CardDescription>Remaining for allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">1,800</div>
              <Badge variant="outline" className="text-xs">
                18%
              </Badge>
            </div>
            <Progress value={18} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Hours Expiring</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">320</div>
              <Badge variant="destructive" className="text-xs">
                Urgent
              </Badge>
            </div>
            <Progress value={3.2} className="h-2 mt-4 bg-red-100">
              <div className="h-full bg-red-500 rounded-full" style={{ width: "3.2%" }} />
            </Progress>
          </CardContent>
        </Card>
      </div>

      {/* Allocation Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Allocation by Entity Type</CardTitle>
            <CardDescription>Distribution across different entity categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="space-y-4 w-full px-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Developers</span>
                    <span>3,200 hours (39%)</span>
                  </div>
                  <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "39%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Operators</span>
                    <span>2,800 hours (34%)</span>
                  </div>
                  <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "34%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Corporates</span>
                    <span>2,200 hours (27%)</span>
                  </div>
                  <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "27%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Internal Reservations</span>
                    <span>1,800 hours (22%)</span>
                  </div>
                  <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "22%" }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allocation Status Distribution</CardTitle>
            <CardDescription>Current status of all allocations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="relative h-64 w-64">
                {/* Simplified pie chart representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">8,200</div>
                    <div className="text-sm text-muted-foreground">Total Hours</div>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {/* Active: 65% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="hsl(var(--primary))"
                    strokeWidth="50"
                    strokeDasharray="157.08 314.16"
                    strokeDashoffset="0"
                  />

                  {/* Pending: 15% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="hsl(var(--warning))"
                    strokeWidth="50"
                    strokeDasharray="47.12 314.16"
                    strokeDashoffset="-157.08"
                  />

                  {/* Expired: 12% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="50"
                    strokeDasharray="37.7 314.16"
                    strokeDashoffset="-204.2"
                  />

                  {/* Revoked: 8% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="hsl(var(--muted))"
                    strokeWidth="50"
                    strokeDasharray="25.13 314.16"
                    strokeDashoffset="-241.9"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-sm">Active (65%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm">Pending (15%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                <span className="text-sm">Expired (12%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-muted mr-2"></div>
                <span className="text-sm">Revoked (8%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Entities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Entities</CardTitle>
          <CardDescription>Highest performing allocation recipients and allocators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recipients">
            <TabsList className="mb-4">
              <TabsTrigger value="recipients">Top Recipients</TabsTrigger>
              <TabsTrigger value="allocators">Top Allocators</TabsTrigger>
            </TabsList>
            <TabsContent value="recipients">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Hours Allocated</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Acme Development</TableCell>
                    <TableCell>
                      <Badge variant="outline">Developer</Badge>
                    </TableCell>
                    <TableCell>1,800</TableCell>
                    <TableCell>1,260</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">70%</span>
                        <Badge className="bg-green-500">High</Badge>
                      </div>
                    </TableCell>
                    <TableCell>↗ +12%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Stellar Operations</TableCell>
                    <TableCell>
                      <Badge variant="outline">Operator</Badge>
                    </TableCell>
                    <TableCell>1,600</TableCell>
                    <TableCell>1,120</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">70%</span>
                        <Badge className="bg-green-500">High</Badge>
                      </div>
                    </TableCell>
                    <TableCell>↗ +8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CBRE</TableCell>
                    <TableCell>
                      <Badge variant="outline">Corporate</Badge>
                    </TableCell>
                    <TableCell>1,300</TableCell>
                    <TableCell>780</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">60%</span>
                        <Badge className="bg-amber-500">Medium</Badge>
                      </div>
                    </TableCell>
                    <TableCell>→ 0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nexus Development</TableCell>
                    <TableCell>
                      <Badge variant="outline">Developer</Badge>
                    </TableCell>
                    <TableCell>1,400</TableCell>
                    <TableCell>770</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">55%</span>
                        <Badge className="bg-amber-500">Medium</Badge>
                      </div>
                    </TableCell>
                    <TableCell>↘ -5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prime Operations</TableCell>
                    <TableCell>
                      <Badge variant="outline">Operator</Badge>
                    </TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>600</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">50%</span>
                        <Badge className="bg-red-500 text-white">Low</Badge>
                      </div>
                    </TableCell>
                    <TableCell>↘ -10%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="allocators">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Allocator</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Hours Allocated</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Avg. Efficiency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Smith</TableCell>
                    <TableCell>System Admin</TableCell>
                    <TableCell>3,200</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">72%</span>
                        <Badge className="bg-green-500">High</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>2,800</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">68%</span>
                        <Badge className="bg-green-500">High</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Michael Chen</TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>2,200</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">65%</span>
                        <Badge className="bg-amber-500">Medium</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View All Entities</Button>
          <Button variant="outline">Export Data</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

