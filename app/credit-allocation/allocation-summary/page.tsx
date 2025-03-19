"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, Download, Printer, Share2, Crown, Building, Briefcase, Building2, UserCircle } from "lucide-react"
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Allocation Summary</h1>
        <p className="text-gray-500">Overview of credit allocations across the hierarchy</p>
      </div>

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-lg font-medium">Hours Allocated</CardTitle>
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
            <CardTitle className="text-lg font-medium">Hours Reserved</CardTitle>
            <CardDescription>Set aside for future use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">800</div>
              <Badge variant="outline" className="text-xs">
                8%
              </Badge>
            </div>
            <Progress value={8} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Available Hours</CardTitle>
            <CardDescription>Ready for allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">1,000</div>
              <Badge variant="outline" className="text-xs">
                10%
              </Badge>
            </div>
            <Progress value={10} className="h-2 mt-4" />
          </CardContent>
        </Card>
      </div>

      {/* Distribution by Entity Type */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Distribution by Entity Type</CardTitle>
          <CardDescription>Hours allocated across different entity types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Owners</span>
                </div>
                <span className="text-sm font-medium">10,000 hours</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Developers</span>
                </div>
                <span className="text-sm font-medium">3,800 hours</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Operators</span>
                </div>
                <span className="text-sm font-medium">2,700 hours</span>
              </div>
              <Progress value={27} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Corporates</span>
                </div>
                <span className="text-sm font-medium">1,500 hours</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Employees</span>
                </div>
                <span className="text-sm font-medium">200 hours</span>
              </div>
              <Progress value={2} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Allocators */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top Allocators</CardTitle>
          <CardDescription>Entities with the highest allocation activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hours Allocated</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Fitness First Global</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>8,200</TableCell>
                <TableCell>8</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">92%</span>
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
                <TableCell className="font-medium">ABC Development</TableCell>
                <TableCell>Developer</TableCell>
                <TableCell>2,700</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">85%</span>
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
                <TableCell className="font-medium">Global Operations</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>1,500</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">78%</span>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View All Allocators</Button>
          <Button variant="outline">Export Data</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

