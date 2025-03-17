"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import { useState } from "react"

export function FilterMenu() {
  const [typeFilters, setTypeFilters] = useState<string[]>([])
  const [statusFilters, setStatusFilters] = useState<string[]>([])

  const handleTypeFilter = (type: string) => {
    setTypeFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilters((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
          <Filter className="w-4 h-4 text-[#77866E]" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Space Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {["Meeting Room", "Workspace", "Fitness", "Event Space", "Outdoor Space", "Recreation"].map((type) => (
          <DropdownMenuCheckboxItem
            key={type}
            checked={typeFilters.includes(type)}
            onCheckedChange={() => handleTypeFilter(type)}
          >
            {type}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={statusFilters.includes("Active")}
          onCheckedChange={() => handleStatusFilter("Active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statusFilters.includes("Inactive")}
          onCheckedChange={() => handleStatusFilter("Inactive")}
        >
          Inactive
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

