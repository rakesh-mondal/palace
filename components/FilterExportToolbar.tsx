"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Trash2, Plus } from "lucide-react"
import { CSVLink } from "react-csv"

interface FilterExportToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterChange: (value: string) => void
  exportData: any[]
  exportFilename: string
  selectedUsers: string[]
  onDeleteSelected: () => void
  onAddUser: () => void
  userType: string
}

export function FilterExportToolbar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  exportData,
  exportFilename,
  selectedUsers,
  onDeleteSelected,
  onAddUser,
  userType,
}: FilterExportToolbarProps) {
  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9"
          aria-label="Search users"
        />
      </div>
      {selectedUsers.length > 0 && (
        <Button variant="outline" size="sm" className="h-9" onClick={onDeleteSelected}>
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Selected ({selectedUsers.length})
        </Button>
      )}
      <Select value={filterStatus} onValueChange={onFilterChange} aria-label="Filter by status">
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Statuses">All Statuses</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <CSVLink data={exportData} filename={exportFilename}>
        <Button variant="outline" size="sm" className="flex items-center gap-2" aria-label="Export data as CSV">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </CSVLink>
      <Button onClick={onAddUser} size="sm" className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add {userType}
      </Button>
    </div>
  )
}

