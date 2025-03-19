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
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-input pl-10"
          aria-label="Search users"
        />
      </div>
      
      <div className="flex items-center gap-2">
        {selectedUsers.length > 0 && (
          <Button 
            variant="outline" 
            className="button-padding-sm text-destructive hover:text-destructive-foreground hover:bg-destructive"
            onClick={onDeleteSelected}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedUsers.length})
          </Button>
        )}
        
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <CSVLink data={exportData} filename={exportFilename} className="no-underline">
          <Button variant="outline" className="button-padding-sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CSVLink>

        <Button className="button-padding-sm" onClick={onAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add {userType}
        </Button>
      </div>
    </div>
  )
}

