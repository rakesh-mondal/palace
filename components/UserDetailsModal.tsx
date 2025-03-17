"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  User,
  Award,
  CheckCircle,
  XCircle,
  Flag,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Package,
  CreditCard,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"

interface UserDetailsModalProps {
  user: {
    userId: string
    fullName: string
    mobileNumber: string
    email: string
    corporateAssociations: string[]
    userType: string
    status: string
    totalBookings: number
    lastBookingDate: string
    upcomingBookings: Array<{ space: string; date: string; time: string; type: string }>
    trainerPackages: Array<{ trainerName: string; packageDetails: string }>
    spacePackages: Array<{ packageDetails: string }>
    freeTrials: boolean
    vipStatus: boolean
    totalPaymentSummary: number
    outstandingDues: number
    bookingCancellationRate: number
    spacesAccessed: string[]
    createdAt: string
    updatedAt: string
  }
  isOpen: boolean
  onClose: () => void
  onDeactivate: () => void
  onFlag: () => void
}

export function UserDetailsModal({ user, isOpen, onClose, onDeactivate, onFlag }: UserDetailsModalProps) {
  if (!user) return null

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  {user.fullName}
                  {user.vipStatus && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 ml-2">
                      <Award className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">ID: {user.userId}</p>
              </div>
            </div>
            <Badge variant="outline" className={getStatusColor(user.status)}>
              {user.status === "Active" ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              {user.status}
            </Badge>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.mobileNumber}</span>
                  </div>
                  <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {user.corporateAssociations.length > 0 ? user.corporateAssociations.join(", ") : "None"}
                    </span>
                  </div>
                  <Separator />
                  <div className="pt-2">
                    <Badge variant="secondary">{user.userType}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Statistics Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Booking Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{user.totalBookings}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Cancellation Rate</p>
                      <p className="text-2xl font-bold">{user.bookingCancellationRate}%</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Last Booking</span>
                      </div>
                      <span className="text-sm font-medium">{formatDate(user.lastBookingDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Bookings Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Upcoming Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.upcomingBookings.length > 0 ? (
                    <div className="space-y-3">
                      {user.upcomingBookings.map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{booking.space}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.date} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">{booking.type}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No upcoming bookings</p>
                  )}
                </CardContent>
              </Card>

              {/* Packages Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Active Packages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.spacePackages.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Space Packages</h4>
                      {user.spacePackages.map((pkg, index) => (
                        <div key={index} className="p-2 bg-muted rounded-lg text-sm">
                          {pkg.packageDetails}
                        </div>
                      ))}
                    </div>
                  )}
                  {user.trainerPackages.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Trainer Packages</h4>
                      {user.trainerPackages.map((pkg, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-lg text-sm">
                          <span>{pkg.trainerName}</span>
                          <Badge variant="secondary">{pkg.packageDetails}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Free Trials</span>
                    <Badge variant={user.freeTrials ? "success" : "secondary"}>
                      {user.freeTrials ? "Active" : "Not Active"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Financial Information Card - Full Width */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Payments</p>
                    <p className="text-2xl font-bold">{formatCurrency(user.totalPaymentSummary)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding Dues</p>
                    <p className={`text-2xl font-bold ${user.outstandingDues > 0 ? "text-red-600" : ""}`}>
                      {formatCurrency(user.outstandingDues)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/50 p-4 sticky bottom-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Created: {formatDate(user.createdAt)}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Updated: {formatDate(user.updatedAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Deactivate User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will deactivate the user. They will no longer be able to access the system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeactivate}>Deactivate</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-yellow-600 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Flag User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will flag the user for review. Their account may be restricted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onFlag}>Flag User</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency: "HKD",
  }).format(amount)
}

