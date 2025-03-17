"use client"

import { BookingPerformance } from "@/components/dashboard/BookingPerformance"
import { FinancialPerformance } from "@/components/dashboard/FinancialPerformance"

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Dashboard Overview</h1>

      <div className="space-y-8">
        <section aria-labelledby="booking-performance-heading">
          <BookingPerformance />
        </section>

        <section aria-labelledby="financial-performance-heading">
          <FinancialPerformance />
        </section>
      </div>
    </div>
  )
}

