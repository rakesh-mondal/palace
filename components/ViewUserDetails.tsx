import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mail, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import Image from "next/image"

interface User {
  id: string
  userId?: string
  name?: string
  firstName?: string
  lastName?: string
  email: string
  mobileNumber: string
  role?: string
  type?: string
  status: string
  assignedSpaces: string[]
  createdAt: string
  updatedAt: string
  logo?: string
  websiteUrl?: string
}

interface ViewUserDetailsProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function ViewUserDetails({ isOpen, onClose, user }: ViewUserDetailsProps) {
  console.log("ViewUserDetails user data:", user)
  if (!user) return null

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "PPP")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid Date"
    }
  }

  const getRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      console.error("Error getting relative time:", error)
      return "Unknown"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "inactive":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const displayName = user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"
  const displayRole = user.role || user.type || "N/A"
  const assignedSpaces = user.assignedSpaces || []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-[#FFFFFF]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">User Details</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h3>
                <p className="text-lg font-semibold">{displayName}</p>
                <div className="flex items-center mt-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <p>{user.email || "N/A"}</p>
                </div>
                <div className="flex items-center mt-2">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <p>{user.mobileNumber || "N/A"}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Access Details</h3>
                <p className="text-base">
                  <span className="font-medium">Role:</span> {displayRole}
                </p>
                <div className="flex items-center mt-2">
                  <span className="font-medium mr-2">Status:</span>
                  <Badge
                    variant={user.status.toLowerCase() === "active" ? "success" : "secondary"}
                    className="flex items-center"
                  >
                    {getStatusIcon(user.status)}
                    <span className="ml-1">{user.status}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Assigned Spaces</h3>
              <div className="flex flex-wrap gap-2">
                {assignedSpaces.length > 0 ? (
                  assignedSpaces.map((space: string) => (
                    <Badge key={space} variant="outline">
                      {space}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No spaces assigned</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">System Info</h3>
                <p className="text-base">
                  <span className="font-medium">User ID:</span> {user.userId || user.id}
                </p>
              </div>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Created:</span> {getRelativeTime(user.createdAt)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{formatDate(user.createdAt)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Last Updated:</span> {getRelativeTime(user.updatedAt)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{formatDate(user.updatedAt)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          {(user.type === "Developer" || user.type === "Operator" || user.type === "Corporate") && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Company Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {user.logo ? (
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image
                          src={user.logo || "/placeholder.svg"}
                          alt={`${user.name} logo`}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">{user.name?.charAt(0) || "N/A"}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-base">
                      <span className="font-medium">Name:</span> {user.name || "N/A"}
                    </p>
                    <p className="text-base">
                      <span className="font-medium">Website:</span>{" "}
                      {user.websiteUrl ? (
                        <a
                          href={user.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {user.websiteUrl}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

