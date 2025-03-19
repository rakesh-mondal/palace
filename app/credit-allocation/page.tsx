"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreateAllocationForm } from "./create/CreateAllocationForm"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Eye, Edit, Clock, XCircle, Building2, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

// Mock data for current allocations
const mockAllocations = [
  {
    id: "1",
    recipient: "ABC Development",
    type: "Developer",
    hours: 100,
    allocatedBy: "John Doe",
    date: "2024-03-15",
    status: "Active",
    space: "Fitness First Global",
    month: "March",
    year: "2024",
    description: "Development team allocation for Q1 2024",
    hoursUsed: 45,
    hoursRemaining: 55,
  },
  {
    id: "2",
    recipient: "Global Operations",
    type: "Operator",
    hours: 75,
    allocatedBy: "Jane Smith",
    date: "2024-03-14",
    status: "Active",
    space: "Fitness First Global",
    month: "March",
    year: "2024",
    description: "Operations team allocation for March 2024",
    hoursUsed: 30,
    hoursRemaining: 45,
  },
  {
    id: "3",
    recipient: "XYZ Corporate",
    type: "Corporate",
    hours: 50,
    allocatedBy: "Mike Johnson",
    date: "2024-03-13",
    status: "Pending",
    space: "Fitness First Global",
    month: "March",
    year: "2024",
    description: "Corporate team allocation for March 2024",
    hoursUsed: 0,
    hoursRemaining: 50,
  },
]

export default function CreditAllocationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpace, setSelectedSpace] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false)
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false)
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false)
  const [modifiedHours, setModifiedHours] = useState("")
  const [extendMonths, setExtendMonths] = useState("")
  const { toast } = useToast()

  const filteredAllocations = mockAllocations.filter((allocation) => {
    const matchesSearch = allocation.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpace = selectedSpace === "all" || allocation.space === selectedSpace
    const matchesType = selectedType === "all" || allocation.type.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesSpace && matchesType
  })

  const handleViewDetails = (allocation: any) => {
    setSelectedAllocation(allocation)
    setIsViewModalOpen(true)
  }

  const handleRevoke = (allocation: any) => {
    setSelectedAllocation(allocation)
    setIsRevokeModalOpen(true)
  }

  const handleModify = (allocation: any) => {
    setSelectedAllocation(allocation)
    setModifiedHours(allocation.hours.toString())
    setIsModifyModalOpen(true)
  }

  const handleExtend = (allocation: any) => {
    setSelectedAllocation(allocation)
    setExtendMonths("")
    setIsExtendModalOpen(true)
  }

  const confirmRevoke = () => {
    // Here you would typically make an API call to revoke the hours
    toast({
      title: "Revoke Success",
      description: `Successfully revoked ${selectedAllocation.hours} hours from ${selectedAllocation.recipient}. These hours are now available for reallocation.`,
    })
    setIsRevokeModalOpen(false)
  }

  const confirmModify = () => {
    // Here you would typically make an API call to modify the hours
    toast({
      title: "Modify Success",
      description: `Successfully modified allocation for ${selectedAllocation.recipient} to ${modifiedHours} hours.`,
    })
    setIsModifyModalOpen(false)
  }

  const confirmExtend = () => {
    // Here you would typically make an API call to extend the allocation
    toast({
      title: "Extend Success",
      description: `Successfully extended allocation for ${selectedAllocation.recipient} by ${extendMonths} months.`,
    })
    setIsExtendModalOpen(false)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Credit Allocation</h2>
          <p className="text-muted-foreground">
            Viewing all allocations for March 2024. You can filter by space or recipient type using the filters above.
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Create Allocation</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Allocation</DialogTitle>
            </DialogHeader>
            <CreateAllocationForm onSuccess={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search allocations..."
            className="pl-8 h-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedSpace} onValueChange={setSelectedSpace}>
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue placeholder="Filter by space" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Spaces</SelectItem>
            <SelectItem value="Fitness First Global">Fitness First Global</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Developer">Developer</SelectItem>
            <SelectItem value="Operator">Operator</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="Employee">Employee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Recipient</TableHead>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead className="w-[100px]">Hours</TableHead>
              <TableHead className="w-[150px]">Allocated By</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAllocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell className="font-medium">{allocation.recipient}</TableCell>
                <TableCell>{allocation.type}</TableCell>
                <TableCell>{allocation.hours}</TableCell>
                <TableCell>{allocation.allocatedBy}</TableCell>
                <TableCell>{allocation.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={allocation.status === "Active" ? "default" : "secondary"}
                  >
                    {allocation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(allocation)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleModify(allocation)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modify Allocation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExtend(allocation)}>
                        <Clock className="mr-2 h-4 w-4" />
                        Extend Allocation
                      </DropdownMenuItem>
                      {allocation.status === "Active" && (
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleRevoke(allocation)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Revoke Hours
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Allocation Details</DialogTitle>
          </DialogHeader>
          {selectedAllocation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>Space</span>
                  </div>
                  <div className="font-medium">{selectedAllocation.space}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Recipient</span>
                  </div>
                  <div className="font-medium">{selectedAllocation.recipient}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Description</div>
                <div>{selectedAllocation.description}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Total Hours</div>
                  <div className="font-medium">{selectedAllocation.hours}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Hours Used</div>
                  <div className="font-medium">{selectedAllocation.hoursUsed}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Hours Remaining</div>
                  <div className="font-medium">{selectedAllocation.hoursRemaining}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Period</div>
                  <div className="font-medium">{selectedAllocation.month} {selectedAllocation.year}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant={selectedAllocation.status === "Active" ? "default" : "secondary"}>
                    {selectedAllocation.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Revoke Confirmation Modal */}
      <Dialog open={isRevokeModalOpen} onOpenChange={setIsRevokeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Hours</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke {selectedAllocation?.hours} hours from {selectedAllocation?.recipient} for {selectedAllocation?.space} for {selectedAllocation?.month} {selectedAllocation?.year}?
              <br /><br />
              This action will return these hours to your available pool and remove the recipient's access to them.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRevoke}>
              Revoke Hours
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modify Allocation Modal */}
      <Dialog open={isModifyModalOpen} onOpenChange={setIsModifyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Allocation</DialogTitle>
            <DialogDescription>
              Modify the number of hours allocated to {selectedAllocation?.recipient}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Hours</Label>
              <Input
                id="hours"
                type="number"
                value={modifiedHours}
                onChange={(e) => setModifiedHours(e.target.value)}
                placeholder="Enter new hours"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Current allocation: {selectedAllocation?.hours} hours
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModifyModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmModify}>
              Modify Hours
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Extend Allocation Modal */}
      <Dialog open={isExtendModalOpen} onOpenChange={setIsExtendModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extend Allocation</DialogTitle>
            <DialogDescription>
              Extend the allocation period for {selectedAllocation?.recipient}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Number of Months</Label>
              <Input
                id="months"
                type="number"
                value={extendMonths}
                onChange={(e) => setExtendMonths(e.target.value)}
                placeholder="Enter number of months"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Current period: {selectedAllocation?.month} {selectedAllocation?.year}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExtendModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmExtend}>
              Extend Period
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 