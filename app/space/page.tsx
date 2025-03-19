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

interface Space {
  id: string
  name: string
  type: string
  capacity: number
  status: string
  district: string
  location: string
  capacityLimit: number
  openTime: string
  closeTime: string
  activityTypes: string[]
}

interface SpaceFormData {
  name: string
  activityTypes: string[]
  status: string
}

// Initial data to avoid hydration mismatches
const initialSpaces = [
  { 
    id: "1", 
    name: "Palace One", 
    type: "Meeting Room", 
    capacity: 4, 
    status: "Active",
    district: "Downtown",
    location: "Level 1, Block A",
    capacityLimit: 4,
    openTime: "09:00",
    closeTime: "18:00",
    activityTypes: ["Meeting", "Workshop"]
  },
  { 
    id: "2", 
    name: "Palace Two", 
    type: "Workspace", 
    capacity: 6, 
    status: "Active",
    district: "Midtown",
    location: "Level 2, Block B",
    capacityLimit: 6,
    openTime: "09:00",
    closeTime: "18:00",
    activityTypes: ["Workspace", "Meeting"]
  },
  { 
    id: "3", 
    name: "Palace Three", 
    type: "Event Space", 
    capacity: 4, 
    status: "Active",
    district: "Uptown",
    location: "Level 3, Block C",
    capacityLimit: 4,
    openTime: "09:00",
    closeTime: "22:00",
    activityTypes: ["Event", "Workshop"]
  },
  { 
    id: "4", 
    name: "Palace Four", 
    type: "Multi-purpose", 
    capacity: 6, 
    status: "Inactive",
    district: "Business District",
    location: "Level 4, Block D",
    capacityLimit: 6,
    openTime: "09:00",
    closeTime: "20:00",
    activityTypes: ["Meeting", "Event", "Workshop"]
  },
]

const initialInternalUsers = [
  { id: "int1", name: "John Doe", role: "Property Owner" },
  { id: "int2", name: "Jane Smith", role: "Manager" },
]

const initialExternalUsers = [
  { id: "ext1", name: "Acme Corp", role: "Operator" },
  { id: "ext2", name: "XYZ Inc", role: "Organization" },
]

export default function SpaceManagementPage() {
  const [mounted, setMounted] = useState(false)
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces)
  const [isGridView, setIsGridView] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false)
  const [internalUsers, setInternalUsers] = useState(initialInternalUsers)
  const [externalUsers, setExternalUsers] = useState(initialExternalUsers)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDelete = (id: string) => {
    setSpaces(spaces.filter(space => space.id !== id));
    toast({
      title: "Space deleted",
      description: "The space has been successfully deleted.",
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => space.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [spaces, searchQuery])

  const handleAddSpace = (data: SpaceFormData) => {
    const newSpace: Space = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      type: data.activityTypes[0],
      capacity: 4,
      status: data.status,
      district: "TBD",
      location: "TBD",
      capacityLimit: 4,
      openTime: "09:00",
      closeTime: "18:00",
      activityTypes: data.activityTypes
    }
    setSpaces([...spaces, newSpace])
    setIsAddSpaceModalOpen(false)
    toast({
      title: "Space added",
      description: "The new space has been successfully added.",
    })
  }

  const handleEdit = (space: Space) => {
    // TODO: Implement edit functionality
    console.log("Edit space:", space)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="container-padding">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Space Management</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsGridView(true)}
            className={isGridView ? "text-foreground" : "text-muted-foreground"}
            aria-label="Switch to grid view"
            aria-pressed={isGridView}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsGridView(false)}
            className={!isGridView ? "text-foreground" : "text-muted-foreground"}
            aria-label="Switch to list view"
            aria-pressed={!isGridView}
          >
            <LayoutList className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setIsAddSpaceModalOpen(true)}
            className="button-padding-md"
            aria-label="Add new space"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Space
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search spaces..."
            className="form-input pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search spaces"
          />
        </div>
        <div className="flex gap-2">
          <FilterMenu />
          <Button variant="outline" className="button-padding-sm" aria-label="Export spaces">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {isGridView ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredSpaces.map((space) => (
            <SpaceCard 
              key={space.id} 
              space={space} 
              onDelete={handleDelete}
              onEdit={handleEdit}
              aria-label={`Space: ${space.name}`} 
            />
          ))}
        </div>
      ) : (
        <SpaceListView 
          spaces={filteredSpaces} 
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {filteredSpaces.length === 0 && (
        <div className="text-center py-8">
          <p className="text-body-sm text-muted-foreground">No spaces found matching your criteria.</p>
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

