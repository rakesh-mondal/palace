import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, Building2, Calendar, Clock, MapPin, Briefcase, UserCircle } from "lucide-react"
import { format } from "date-fns"

interface CorporateEmployeeDetailsModalProps {
  employee: {
    userId: string
    fullName: string
    mobileNumber: string
    corporateAssociation: string
    registrationStatus: string
    totalBookings: number
    lastBookingDate: string
    bookingCancellationRate: number
    email: string
    department: string
    position: string
    joinDate: string
    spacesAccessed: string[]
    createdAt: string
    updatedAt: string
  }
  isOpen: boolean
  onClose: () => void
}

export function CorporateEmployeeDetailsModal({ employee, isOpen, onClose }: CorporateEmployeeDetailsModalProps) {
  if (!employee) return null

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{employee.fullName}</DialogTitle>
                <p className="text-sm text-muted-foreground">ID: {employee.userId}</p>
              </div>
            </div>
            <Badge variant="outline" className={getStatusColor(employee.registrationStatus)}>
              {employee.registrationStatus}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto py-4 px-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="col-span-2">
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{employee.mobileNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{employee.corporateAssociation}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {employee.department} - {employee.position}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Joined: {formatDate(employee.joinDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Booking Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-lg font-bold">{employee.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cancellation Rate</p>
                    <p className="text-lg font-bold">{employee.bookingCancellationRate}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">Last Booking</span>
                  <span className="text-sm font-medium">
                    {employee.lastBookingDate ? formatDate(employee.lastBookingDate) : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Spaces Accessed
                </h3>
                {employee.spacesAccessed.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {employee.spacesAccessed.map((space, index) => (
                      <div key={index} className="p-1 bg-muted rounded text-xs">
                        {space}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No spaces accessed yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t bg-muted/50 p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Created: {formatDate(employee.createdAt)}</span>
              </div>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Updated: {formatDate(employee.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

