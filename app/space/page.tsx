"use client"

import { useEffect, useState, useMemo } from "react"
import { Search, PlusCircle, LayoutGrid, LayoutList, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SpaceCard } from "@/components/SpaceCard"
import { SpaceListView } from "@/components/SpaceListView"
import { FilterMenu } from "@/components/FilterMenu"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddSpaceForm } from "@/components/AddSpaceForm"

export default function SpaceManagementPage() {
  const [spaces, setSpaces] = useState([])
  const [isGridView, setIsGridView] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false)
  const [internalUsers, setInternalUsers] = useState([])
  const [externalUsers, setExternalUsers] = useState([])

  useEffect(() => {
    // Load initial data or fetch from API
    setSpaces([
      { id: "1", name: "Palace One", type: "Meeting Room", capacity: 4, status: "Active" },
      { id: "2", name: "Palace Two", type: "Workspace", capacity: 6, status: "Active" },
      { id: "3", name: "Palace Three", type: "Event Space", capacity: 4, status: "Active" },
      { id: "4", name: "Palace Four", type: "Multi-purpose", capacity: 6, status: "Inactive" },
    ])

    // Mock data for internal and external users
    setInternalUsers([
      { id: "int1", name: "John Doe", role: "Property Owner" },
      { id: "int2", name: "Jane Smith", role: "Manager" },
    ])
    setExternalUsers([
      { id: "ext1", name: "Acme Corp", role: "Operator" },
      { id: "ext2", name: "XYZ Inc", role: "Organization" },
    ])
  }, [])

  const handleDelete = (id) => {
    setSpaces(spaces.filter((space) => space.id !== id))
    toast({
      title: "Space deleted",
      description: "The space has been successfully removed.",
    })
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => space.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [spaces, searchQuery])

  const handleAddSpace = (data) => {
    const newSpace = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      type: data.activityTypes[0],
      capacity: 4, // Set to 4 for new spaces
      status: data.status,
    }
    setSpaces([...spaces, newSpace])
    setIsAddSpaceModalOpen(false)
    toast({
      title: "Space added",
      description: "The new space has been successfully added.",
    })
  }

  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Space Management</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsGridView(true)}
            className={isGridView ? "text-[#242A34]" : "text-muted-foreground"}
            aria-label="Switch to grid view"
            aria-pressed={isGridView}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsGridView(false)}
            className={!isGridView ? "text-[#242A34]" : "text-muted-foreground"}
            aria-label="Switch to list view"
            aria-pressed={!isGridView}
          >
            <LayoutList className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setIsAddSpaceModalOpen(true)}
            className="flex items-center gap-2"
            aria-label="Add new space"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            Add Space
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#77866E] h-4 w-4" />
          <Input
            type="text"
            placeholder="Search spaces..."
            className="pl-10 h-8 text-sm"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search spaces"
          />
        </div>
        <div className="flex gap-2">
          <FilterMenu />
          <Button variant="outline" size="sm" className="flex items-center gap-2 h-8" aria-label="Export spaces">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {isGridView ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} onDelete={handleDelete} aria-label={`Space: ${space.name}`} />
          ))}
        </div>
      ) : (
        <SpaceListView spaces={filteredSpaces} onDelete={handleDelete} />
      )}

      {filteredSpaces.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No spaces found matching your criteria.</p>
        </div>
      )}

      <Dialog open={isAddSpaceModalOpen} onOpenChange={setIsAddSpaceModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Add New Space</DialogTitle>
          </DialogHeader>
          <AddSpaceForm
            onSubmit={handleAddSpace}
            onCancel={() => setIsAddSpaceModalOpen(false)}
            internalUsers={internalUsers}
            externalUsers={externalUsers}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

