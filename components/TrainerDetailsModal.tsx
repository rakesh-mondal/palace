import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import type { Trainer } from "@/types/trainer"

interface TrainerDetailsModalProps {
  trainer: Trainer | null
  isOpen: boolean
  onClose: () => void
}

export function TrainerDetailsModal({ trainer, isOpen, onClose }: TrainerDetailsModalProps) {
  const formatDate = (date: string | null | undefined) => {
    if (!date) return "N/A"
    try {
      return format(new Date(date), "dd/MM/yyyy")
    } catch (error) {
      console.error("Invalid date:", date)
      return "Invalid Date"
    }
  }

  if (!trainer) {
    return null
  }

  const renderExpertise = (expertise: any, parentKey = "") => {
    if (!expertise || typeof expertise !== "object") {
      return null
    }

    return Object.entries(expertise).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="space-y-2">
            <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
            <div className="pl-4">{renderExpertise(value, key)}</div>
          </div>
        )
      }
      if (typeof value === "boolean" && value) {
        return (
          <Badge key={`${parentKey}-${key}`} variant="secondary" className="mr-2 mb-2">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Badge>
        )
      }
      return null
    })
  }

  const renderCertifications = (certifications: any = {}, parentKey = "") => {
    if (!certifications || typeof certifications !== "object") {
      return null
    }
    return Object.entries(certifications).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="space-y-2">
            <h4 className="font-medium uppercase">{key.toUpperCase()}</h4>
            <div className="pl-4 space-y-1">{renderCertifications(value, key)}</div>
          </div>
        )
      }
      if (typeof value === "boolean" && value) {
        return (
          <div key={`${parentKey}-${key}`} className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
          </div>
        )
      }
      return null
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {trainer.name}
            <Badge variant="outline" className="ml-2">
              {trainer.position}
            </Badge>
          </DialogTitle>
          <DialogDescription>View detailed information about this trainer.</DialogDescription>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID: {trainer.number}</p>
              </div>
            </div>
            <Badge
              variant={
                trainer.status === "Active" ? "success" : trainer.status === "Inactive" ? "destructive" : "warning"
              }
            >
              {trainer.status === "Active" ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : trainer.status === "Inactive" ? (
                <XCircle className="w-3 h-3 mr-1" />
              ) : (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {trainer.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto py-4 px-6">
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Gender</p>
                      <p>{trainer.gender}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Birthday</p>
                      <p>{formatDate(trainer.birthday)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Profile Headline</p>
                    <p>{trainer.profileHeadline}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {(trainer.languages ?? []).map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Professional Summary</h3>
                    <p className="text-sm">{trainer.professionalSummary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Year Started</p>
                      <p>{trainer.yearsStarted.year}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Years of Experience</p>
                      <p>{trainer.yearsStarted.numberOfYears} years</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Qualifications & Insurance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={trainer.certifiedPractitioner ? "text-green-500" : "text-red-500"} />
                        <span>Certified Practitioner</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={trainer.liabilityInsurance ? "text-green-500" : "text-red-500"} />
                        <span>Liability Insurance</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Legal Information</h3>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Tax ID/Passport Number</p>
                        <p>{trainer.taxIDPassportNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Professional Indemnification Insurance
                        </p>
                        <p>{trainer.levelOfProfessionalDemnificationInsurance}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle
                          className={trainer.legalProceedingInLast5Years ? "text-red-500" : "text-green-500"}
                        />
                        <span>Legal Proceedings in Last 5 Years</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Contractual Agreement</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">From</p>
                        <p>{trainer.contractualAgreement?.fromTime || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">To</p>
                        <p>{trainer.contractualAgreement?.toTime || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Bank Account Information</h3>
                    <p>{trainer.bankAccountInfo}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Remarks</h3>
                    <p>{trainer.remarks}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expertise">
              <Card>
                <CardHeader>
                  <CardTitle>Areas of Expertise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">{renderExpertise(trainer.expertise)}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">{renderCertifications(trainer.certifications ?? {})}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(trainer.experience ?? []).map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{exp.position}</h4>
                        <span className="text-sm text-muted-foreground">{exp.duration}</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Session Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {(trainer.sessionTypes ?? []).map((type, index) => (
                        <Badge key={index} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Expiry Date</h3>
                    <p>{formatDate(trainer.expiryDate)}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Promo Code</h3>
                    <p>{trainer.promoCode}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Pricing</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">1-on-1 Session</p>
                        <p>${trainer.pricing.oneOnOne}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">2-on-1 Session</p>
                        <p>${trainer.pricing.twoOnOne}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">3-on-1 Session</p>
                        <p>${trainer.pricing.threeOnOne}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Recent Booking History</h3>
                    <div className="space-y-2">
                      {(trainer.bookingHistory ?? []).map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{booking.client}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(booking.date)} - {booking.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{booking.type}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">{booking.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insurance">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p>{trainer.insurance?.name || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p>{trainer.insurance?.address || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p>{trainer.insurance?.phoneNumber || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{trainer.insurance?.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Training Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Training Type Offered</p>
                        <p>{trainer.insurance?.trainingTypeOffered || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Equipment Type Used</p>
                        <p>{trainer.insurance?.equipmentTypeUsed || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Contractual Agreement</p>
                        <p>{trainer.insurance?.contractualAgreement || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Training Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Number of Clients per Week</p>
                        <p>{trainer.insurance?.clientsPerWeek || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Training Hours per Week</p>
                        <p>{trainer.insurance?.trainingHoursPerWeek || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Number of Sessions per Week</p>
                        <p>{trainer.insurance?.sessionsPerWeek || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Trainer to Client Ratio</p>
                        <p>{trainer.insurance?.trainerToClientRatio || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Average Session Duration</p>
                        <p>{trainer.insurance?.averageSessionDuration || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Clients Age Range</p>
                        <p>{trainer.insurance?.clientsAge || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Qualifications and Insurance History</h3>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Qualification and Certification</p>
                      <p>{trainer.insurance?.qualificationAndCertification || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Previous Insurance Claimed</p>
                      <p>{trainer.insurance?.previousInsuranceClaimed ? "Yes" : "No"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Previous Insurance Declined or Issued at Special Terms
                      </p>
                      <p>{trainer.insurance?.previousInsuranceDeclined ? "Yes" : "No"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Has Ever Declared Bankruptcy</p>
                      <p>{trainer.insurance?.hasEverDeclaredBankruptcy ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t bg-muted/50 p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Created: {formatDate(trainer.createdAt)}</span>
              </div>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Updated: {formatDate(trainer.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

