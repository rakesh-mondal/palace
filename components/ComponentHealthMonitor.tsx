"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

interface HealthCheck {
  component: string
  status: "healthy" | "unhealthy"
  lastChecked: Date
}

const ComponentHealthMonitor: React.FC = () => {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])

  useEffect(() => {
    const checkComponentHealth = async () => {
      // Simulate health checks for various components
      const components = ["Database", "API", "Authentication", "File Storage"]
      const updatedHealthChecks = await Promise.all(
        components.map(async (component) => {
          const status = await simulateHealthCheck(component)
          return {
            component,
            status,
            lastChecked: new Date(),
          }
        }),
      )

      setHealthChecks(updatedHealthChecks)

      // Notify if any component is unhealthy
      const unhealthyComponents = updatedHealthChecks.filter((check) => check.status === "unhealthy")
      if (unhealthyComponents.length > 0) {
        toast({
          title: "Component Health Alert",
          description: `${unhealthyComponents.length} component(s) are unhealthy. Check the health monitor for details.`,
          variant: "destructive",
        })
      }
    }

    // Run health checks every 5 minutes
    const intervalId = setInterval(checkComponentHealth, 5 * 60 * 1000)

    // Initial check
    checkComponentHealth()

    return () => clearInterval(intervalId)
  }, [])

  const simulateHealthCheck = async (component: string): Promise<"healthy" | "unhealthy"> => {
    // Simulate an API call or actual health check logic
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return Math.random() > 0.9 ? "unhealthy" : "healthy"
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Component Health Monitor</h2>
      <div className="space-y-2">
        {healthChecks.map((check) => (
          <div key={check.component} className="flex justify-between items-center">
            <span>{check.component}</span>
            <span
              className={`px-2 py-1 rounded ${
                check.status === "healthy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {check.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentHealthMonitor

