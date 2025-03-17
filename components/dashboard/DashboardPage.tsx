"use client"

import { useState } from "react"
import { BookingPerformance } from "@/components/dashboard/BookingPerformance"
import { FinancialPerformance } from "@/components/dashboard/FinancialPerformance"
import { UserEngagementPerformance } from "@/components/dashboard/UserEngagementPerformance"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, DollarSign, Users } from "lucide-react"

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("booking")

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <Tabs defaultValue="booking" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground">
          <TabsTrigger
            value="booking"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Booking Performance</span>
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            <span>Financial Performance</span>
          </TabsTrigger>
          <TabsTrigger
            value="engagement"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            <span>User Engagement</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="booking" className="mt-6">
          <BookingPerformance />
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <FinancialPerformance />
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <UserEngagementPerformance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

