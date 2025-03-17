"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Search, Building2, Users, MoreVertical, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

const SpaceManagementDashboard = () => {
  const [spaces, setSpaces] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: [],
    status: [],
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const savedSpaces = localStorage.getItem("spaces")
      if (savedSpaces) {
        setSpaces(JSON.parse(savedSpaces))
      }
    } catch (err) {
      setError("Failed to load spaces. Please try again later.")
      console.error("Error loading spaces:", err)
    }
  }, [])

  const filteredSpaces = useMemo(() => {
    return spaces.filter(
      (space) =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filters.type.length === 0 || filters.type.includes(space.type)) &&
        (filters.status.length === 0 || filters.status.includes(space.status)),
    )
  }, [spaces, searchQuery, filters])

  const toggleFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }))
  }

  const clearFilters = () => {
    setFilters({ type: [], status: [] })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Maintenance":
        return "bg-orange-50 text-orange-700"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Space Management</h2>
        <Link href="/space/new">
          <Button variant="default" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Space
          </Button>
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search spaces..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Space Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("Studio")}
              onCheckedChange={() => toggleFilter("type", "Studio")}
            >
              Studio
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("Gym")}
              onCheckedChange={() => toggleFilter("type", "Gym")}
            >
              Gym
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("Multi-purpose")}
              onCheckedChange={() => toggleFilter("type", "Multi-purpose")}
            >
              Multi-purpose
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.status.includes("Active")}
              onCheckedChange={() => toggleFilter("status", "Active")}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes("Maintenance")}
              onCheckedChange={() => toggleFilter("status", "Maintenance")}
            >
              Maintenance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes("Inactive")}
              onCheckedChange={() => toggleFilter("status", "Inactive")}
            >
              Inactive
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters}>Clear all filters</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        {filteredSpaces.map((space) => (
          <div key={space.id} className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <Link href={`/space/${space.id}`} className="flex-1">
                <h3 className="text-lg font-medium">{space.name}</h3>
                <div className="flex items-center gap-6 mt-1 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{space.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{space.capacity} capacity</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className={getStatusColor(space.status)}>
                  {space.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-6 text-gray-500">No spaces found matching your criteria.</div>
        )}
      </div>
    </div>
  )
}

export default SpaceManagementDashboard

