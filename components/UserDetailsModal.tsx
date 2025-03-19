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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="container-padding border-b bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                  {user.fullName}
                  {user.vipStatus && (
                    <Badge variant="default" className="ml-2">
                      VIP
                    </Badge>
                  )}
                </DialogTitle>
                <p className="text-body-sm text-muted-foreground mt-1">
                  {user.userType} · {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="button-padding-md">
                    <Flag className="h-4 w-4 mr-2" />
                    Flag User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Flag this user?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will mark the user for review. The user will be notified and their access may be restricted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onFlag}>Flag User</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="button-padding-md">
                    <XCircle className="h-4 w-4 mr-2" />
                    Deactivate
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deactivate this user?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will prevent the user from accessing the system. All their current bookings will be cancelled.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeactivate}>Deactivate</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="container-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-body-sm">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-body-sm">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      {user.mobileNumber}
                    </div>
                    {user.corporateAssociations.length > 0 && (
                      <div className="flex items-center text-body-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
                        {user.corporateAssociations.join(", ")}
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center text-body-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      Created: {formatDate(user.createdAt)}
                    </div>
                    <div className="flex items-center text-body-sm">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      Last Updated: {formatDate(user.updatedAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Booking Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-body-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-semibold">{user.totalBookings}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-body-sm text-muted-foreground">Cancellation Rate</p>
                      <p className="text-2xl font-semibold">{user.bookingCancellationRate}%</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-body-sm text-muted-foreground">Spaces Accessed</p>
                    <div className="flex flex-wrap gap-2">
                      {user.spacesAccessed.map((space) => (
                        <Badge key={space} variant="secondary">
                          {space}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Packages & Subscriptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Packages & Subscriptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.trainerPackages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-body-sm text-muted-foreground">Trainer Packages</p>
                      <div className="space-y-2">
                        {user.trainerPackages.map((pkg, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded-md">
                            <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-body-sm font-medium">{pkg.trainerName}</p>
                              <p className="text-body-sm text-muted-foreground">{pkg.packageDetails}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.spacePackages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-body-sm text-muted-foreground">Space Packages</p>
                      <div className="space-y-2">
                        {user.spacePackages.map((pkg, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded-md">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-body-sm">{pkg.packageDetails}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-body-sm text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Total Payments
                      </div>
                      <p className="text-2xl font-semibold">${user.totalPaymentSummary}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-body-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        Outstanding
                      </div>
                      <p className="text-2xl font-semibold text-destructive">${user.outstandingDues}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

