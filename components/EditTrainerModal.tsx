"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Trainer, TrainerExpertise, TrainerCertification, TrainerInsurance } from "@/types/trainer"

interface EditTrainerModalProps {
  trainer?: Trainer
  isOpen: boolean
  onClose: () => void
  onSubmit: (trainer: Trainer) => void
}

export function EditTrainerModal({ trainer, isOpen, onClose, onSubmit }: EditTrainerModalProps) {
  const [formData, setFormData] = useState<Trainer>(() => ({
    id: "",
    name: "",
    number: "",
    position: "",
    gender: "",
    birthday: "",
    profileHeadline: "",
    professionalSummary: "",
    yearsStarted: { year: new Date().getFullYear(), numberOfYears: 0 },
    payThroughFPS: false,
    certifiedPractitioner: false,
    liabilityInsurance: false,
    taxIDPassportNumber: "",
    levelOfProfessionalDemnificationInsurance: "",
    legalProceedingInLast5Years: "",
    expertise: {} as TrainerExpertise,
    certifications: {} as TrainerCertification,
    languages: [],
    pricing: { oneOnOne: 0, twoOnOne: 0, threeOnOne: 0 },
    experience: [],
    contractualAgreement: { fromTime: "", toTime: "" },
    bankAccountInfo: {
      accountNumber: "",
      accountHolderName: "",
    },
    remarks: "",
    bookingHistory: [],
    sessionTypes: [],
    expiryDate: "",
    promoCode: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "Pending",
    availability: {
      unavailableTimeslots: [],
      unavailableDates: [],
    },
    insurance: {} as TrainerInsurance,
  }))

  useEffect(() => {
    if (trainer) {
      setFormData(trainer)
    }
  }, [trainer])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      if (field === "availability") {
        return {
          ...prev,
          availability: {
            ...prev.availability,
            ...value,
          },
        }
      }
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const handleNestedChange = (category: string, subcategory: string, field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]:
        category === "certifications"
          ? {
              ...(prev[category as keyof Trainer] || {}),
              [field]: value,
            }
          : {
              ...(prev[category as keyof Trainer] || {}),
              [subcategory]: {
                ...((prev[category as keyof Trainer] as any)?.[subcategory] || {}),
                [field]: value,
              },
            },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderExpertiseCheckboxes = (expertise: any, category: string) => {
    const expertiseItems = [
      "Strength training",
      "Functional training",
      "High intensity interval training",
      "Sports specific training",
      "Stretching and mobility",
      "Fat loss and toning",
      "Weight management",
    ]

    return expertiseItems.map((item, index) => (
      <div key={item} className="flex items-center space-x-2">
        <Checkbox
          id={`${category}-${index}`}
          checked={expertise[item.toLowerCase().replace(/ /g, "_")] || false}
          onCheckedChange={(checked) => {
            handleNestedChange(category, "strengthTraining", item.toLowerCase().replace(/ /g, "_"), checked as boolean)
          }}
        />
        <Label htmlFor={`${category}-${index}`}>{item}</Label>
      </div>
    ))
  }

  const renderCertificationCheckboxes = (certifications: any, category: string) => {
    const certificationItems = [
      { key: "nasm", label: "National Academy of Sports Medicine (NASM)" },
      { key: "certified_personal_trainer", label: "Certified personal trainer" },
      { key: "certified_nutrition_coach", label: "Certified nutrition coach" },
      { key: "certified_wellness_coach", label: "Certified wellness coach" },
    ]

    return certificationItems.map((item) => (
      <div key={item.key} className="flex items-center space-x-2">
        <Checkbox
          id={`${category}-${item.key}`}
          checked={(certifications && certifications[item.key]) || false}
          onCheckedChange={(checked) => {
            handleNestedChange(category, "certifications", item.key, checked as boolean)
          }}
        />
        <Label htmlFor={`${category}-${item.key}`}>{item.label}</Label>
      </div>
    ))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{trainer ? "Edit Trainer" : "Add New Trainer"}</DialogTitle>
          <DialogDescription>
            {trainer ? "Update the trainer's information." : "Add a new trainer to the system."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic-info" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
              </TabsList>

              <TabsContent value="basic-info">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Edit the trainer's basic details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Trainer ID</Label>
                        <Input id="number" value={formData.number} readOnly />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Input
                          id="birthday"
                          type="date"
                          value={formData.birthday}
                          onChange={(e) => handleChange("birthday", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Select value={formData.position} onValueChange={(value) => handleChange("position", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal Trainer">Personal Trainer</SelectItem>
                          <SelectItem value="Physiotherapist">Physiotherapist</SelectItem>
                          <SelectItem value="Yoga Instructor">Yoga Instructor</SelectItem>
                          <SelectItem value="Pilates Instructor">Pilates Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profileHeadline">Profile Headline</Label>
                      <Input
                        id="profileHeadline"
                        value={formData.profileHeadline}
                        onChange={(e) => handleChange("profileHeadline", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(formData.languages ?? []).map((lang, index) => (
                          <Badge key={index} variant="secondary">
                            {lang}
                            <button
                              type="button"
                              className="ml-1 hover:text-destructive"
                              onClick={() =>
                                handleChange(
                                  "languages",
                                  formData.languages.filter((_, i) => i !== index),
                                )
                              }
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Select
                        onValueChange={(value) => {
                          if (!formData.languages.includes(value)) {
                            handleChange("languages", [...formData.languages, value])
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Add a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Cantonese">Cantonese</SelectItem>
                          <SelectItem value="Mandarin">Mandarin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>Edit professional details and qualifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="professionalSummary">Professional Summary</Label>
                      <Textarea
                        id="professionalSummary"
                        value={formData.professionalSummary}
                        onChange={(e) => handleChange("professionalSummary", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="yearsStarted.year">Year Started</Label>
                        <Input
                          type="number"
                          value={formData.yearsStarted.year}
                          onChange={(e) =>
                            handleChange("yearsStarted", {
                              ...formData.yearsStarted,
                              year: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearsStarted.numberOfYears">Years of Experience</Label>
                        <Input
                          type="number"
                          value={formData.yearsStarted.numberOfYears}
                          onChange={(e) =>
                            handleChange("yearsStarted", {
                              ...formData.yearsStarted,
                              numberOfYears: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Qualifications & Insurance</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="certifiedPractitioner"
                            checked={formData.certifiedPractitioner}
                            onCheckedChange={(checked) => handleChange("certifiedPractitioner", checked)}
                          />
                          <Label htmlFor="certifiedPractitioner">Certified Practitioner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="liabilityInsurance"
                            checked={formData.liabilityInsurance}
                            onCheckedChange={(checked) => handleChange("liabilityInsurance", checked)}
                          />
                          <Label htmlFor="liabilityInsurance">Liability Insurance</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Legal Information</h3>
                      <div className="space-y-2">
                        <div className="space-y-2">
                          <Label htmlFor="taxIDPassportNumber">Tax ID/Passport Number</Label>
                          <Input
                            id="taxIDPassportNumber"
                            value={formData.taxIDPassportNumber}
                            onChange={(e) => handleChange("taxIDPassportNumber", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="levelOfProfessionalDemnificationInsurance">
                            Professional Indemnification Insurance Level
                          </Label>
                          <Input
                            id="levelOfProfessionalDemnificationInsurance"
                            value={formData.levelOfProfessionalDemnificationInsurance}
                            onChange={(e) => handleChange("levelOfProfessionalDemnificationInsurance", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="legalProceedingInLast5Years">Legal Proceedings in Last 5 Years</Label>
                          <Input
                            id="legalProceedingInLast5Years"
                            value={formData.legalProceedingInLast5Years}
                            onChange={(e) => handleChange("legalProceedingInLast5Years", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Contractual Agreement</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contractualAgreement.fromTime">From</Label>
                          <Input
                            id="contractualAgreement.fromTime"
                            type="datetime-local"
                            value={formData.contractualAgreement?.fromTime ?? ""}
                            onChange={(e) =>
                              handleChange("contractualAgreement", {
                                ...formData.contractualAgreement,
                                fromTime: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contractualAgreement.toTime">To</Label>
                          <Input
                            id="contractualAgreement.toTime"
                            type="datetime-local"
                            value={formData.contractualAgreement?.toTime ?? ""}
                            onChange={(e) =>
                              handleChange("contractualAgreement", {
                                ...formData.contractualAgreement,
                                toTime: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bankAccountInfo.accountNumber">Bank Account Number</Label>
                      <Input
                        id="bankAccountInfo.accountNumber"
                        value={formData.bankAccountInfo?.accountNumber ?? ""}
                        onChange={(e) =>
                          handleChange("bankAccountInfo", {
                            ...formData.bankAccountInfo,
                            accountNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bankAccountInfo.accountHolderName">Account Holder Name</Label>
                      <Input
                        id="bankAccountInfo.accountHolderName"
                        value={formData.bankAccountInfo?.accountHolderName ?? ""}
                        onChange={(e) =>
                          handleChange("bankAccountInfo", {
                            ...formData.bankAccountInfo,
                            accountHolderName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea
                        id="remarks"
                        value={formData.remarks}
                        onChange={(e) => handleChange("remarks", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expertise">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                    <CardDescription>Select the trainer's areas of expertise.</CardDescription>
                  </CardHeader>
                  <CardContent>{renderExpertiseCheckboxes(formData.expertise, "expertise")}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                    <CardDescription>Select the trainer's certifications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderCertificationCheckboxes(formData.certifications || {}, "certifications")}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                    <CardDescription>Edit the trainer's work experience.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {(formData.experience ?? []).map((exp, index) => (
                      <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                        <div className="space-y-2">
                          <Label htmlFor={`experience.${index}.position`}>Position</Label>
                          <Input
                            id={`experience.${index}.position`}
                            value={exp.position}
                            onChange={(e) =>
                              handleChange("experience", [
                                ...formData.experience.slice(0, index),
                                { ...exp, position: e.target.value },
                                ...formData.experience.slice(index + 1),
                              ])
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`experience.${index}.company`}>Company</Label>
                          <Input
                            id={`experience.${index}.company`}
                            value={exp.company}
                            onChange={(e) =>
                              handleChange("experience", [
                                ...formData.experience.slice(0, index),
                                { ...exp, company: e.target.value },
                                ...formData.experience.slice(index + 1),
                              ])
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`experience.${index}.duration`}>Duration</Label>
                          <Input
                            id={`experience.${index}.duration`}
                            value={exp.duration}
                            onChange={(e) =>
                              handleChange("experience", [
                                ...formData.experience.slice(0, index),
                                { ...exp, duration: e.target.value },
                                ...formData.experience.slice(index + 1),
                              ])
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            handleChange(
                              "experience",
                              formData.experience.filter((_, i) => i !== index),
                            )
                          }
                        >
                          Remove Experience
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        handleChange("experience", [
                          ...formData.experience,
                          { position: "", company: "", duration: "" },
                        ])
                      }
                    >
                      Add Experience
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                    <CardDescription>Set the trainer's unavailable timeslots and dates.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Unavailable Timeslots</h3>
                      {(formData.availability?.unavailableTimeslots || []).map((timeslot, index) => (
                        <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                          <div className="space-y-2">
                            <Label htmlFor={`unavailableTimeslots.${index}.dayOfWeek`}>Day of Week</Label>
                            <Select
                              value={timeslot.dayOfWeek}
                              onValueChange={(value) =>
                                handleChange("availability", {
                                  ...formData.availability,
                                  unavailableTimeslots: [
                                    ...formData.availability.unavailableTimeslots.slice(0, index),
                                    { ...timeslot, dayOfWeek: value },
                                    ...formData.availability.unavailableTimeslots.slice(index + 1),
                                  ],
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select day of week" />
                              </SelectTrigger>
                              <SelectContent>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                                  (day) => (
                                    <SelectItem key={day} value={day}>
                                      {day}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`unavailableTimeslots.${index}.fromTime`}>From Time</Label>
                            <Input
                              id={`unavailableTimeslots.${index}.fromTime`}
                              type="time"
                              value={timeslot.fromTime}
                              onChange={(e) =>
                                handleChange("availability", {
                                  ...formData.availability,
                                  unavailableTimeslots: [
                                    ...formData.availability.unavailableTimeslots.slice(0, index),
                                    { ...timeslot, fromTime: e.target.value },
                                    ...formData.availability.unavailableTimeslots.slice(index + 1),
                                  ],
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`unavailableTimeslots.${index}.toTime`}>To Time</Label>
                            <Input
                              id={`unavailableTimeslots.${index}.toTime`}
                              type="time"
                              value={timeslot.toTime}
                              onChange={(e) =>
                                handleChange("availability", {
                                  ...formData.availability,
                                  unavailableTimeslots: [
                                    ...formData.availability.unavailableTimeslots.slice(0, index),
                                    { ...timeslot, toTime: e.target.value },
                                    ...formData.availability.unavailableTimeslots.slice(index + 1),
                                  ],
                                })
                              }
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              handleChange("availability", {
                                ...formData.availability,
                                unavailableTimeslots: formData.availability.unavailableTimeslots.filter(
                                  (_, i) => i !== index,
                                ),
                              })
                            }
                          >
                            Remove Timeslot
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() =>
                          handleChange("availability", {
                            unavailableTimeslots: [
                              ...(formData.availability?.unavailableTimeslots || []),
                              { dayOfWeek: "", fromTime: "", toTime: "" },
                            ],
                          })
                        }
                      >
                        Add Unavailable Timeslot
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Unavailable Dates</h3>
                      {(formData.availability?.unavailableDates || []).map((date, index) => (
                        <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                          <div className="space-y-2">
                            <Label htmlFor={`unavailableDates.${index}`}>Unavailable Date</Label>
                            <Input
                              id={`unavailableDates.${index}`}
                              type="date"
                              value={date}
                              onChange={(e) =>
                                handleChange("availability", {
                                  ...formData.availability,
                                  unavailableDates: [
                                    ...formData.availability.unavailableDates.slice(0, index),
                                    e.target.value,
                                    ...formData.availability.unavailableDates.slice(index + 1),
                                  ],
                                })
                              }
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              handleChange("availability", {
                                ...formData.availability,
                                unavailableDates: formData.availability.unavailableDates.filter((_, i) => i !== index),
                              })
                            }
                          >
                            Remove Date
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() =>
                          handleChange("availability", {
                            unavailableDates: [...(formData.availability?.unavailableDates || []), ""],
                          })
                        }
                      >
                        Add Unavailable Date
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>Edit the trainer's insurance details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurance.name">Name</Label>
                      <Input
                        id="insurance.name"
                        value={formData.insurance?.name ?? ""}
                        onChange={(e) => handleChange("insurance", { ...formData.insurance, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.address">Address</Label>
                      <Input
                        id="insurance.address"
                        value={formData.insurance?.address ?? ""}
                        onChange={(e) => handleChange("insurance", { ...formData.insurance, address: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.phoneNumber">Phone Number</Label>
                      <Input
                        id="insurance.phoneNumber"
                        value={formData.insurance?.phoneNumber ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, phoneNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.email">Email</Label>
                      <Input
                        id="insurance.email"
                        type="email"
                        value={formData.insurance?.email ?? ""}
                        onChange={(e) => handleChange("insurance", { ...formData.insurance, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.trainingTypeOffered">Training Type Offered</Label>
                      <Input
                        id="insurance.trainingTypeOffered"
                        value={formData.insurance?.trainingTypeOffered ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, trainingTypeOffered: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.equipmentTypeUsed">Equipment Type Used</Label>
                      <Input
                        id="insurance.equipmentTypeUsed"
                        value={formData.insurance?.equipmentTypeUsed ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, equipmentTypeUsed: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.contractualAgreement">Contractual Agreement</Label>
                      <Input
                        id="insurance.contractualAgreement"
                        value={formData.insurance?.contractualAgreement ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, contractualAgreement: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.clientsPerWeek">Number of Clients per Week</Label>
                      <Input
                        id="insurance.clientsPerWeek"
                        type="number"
                        value={formData.insurance?.clientsPerWeek ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, clientsPerWeek: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.trainingHoursPerWeek">Training Hours per Week</Label>
                      <Input
                        id="insurance.trainingHoursPerWeek"
                        type="number"
                        value={formData.insurance?.trainingHoursPerWeek ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", {
                            ...formData.insurance,
                            trainingHoursPerWeek: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.sessionsPerWeek">Number of Sessions per Week</Label>
                      <Input
                        id="insurance.sessionsPerWeek"
                        type="number"
                        value={formData.insurance?.sessionsPerWeek ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, sessionsPerWeek: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.trainerToClientRatio">Trainer to Client Ratio</Label>
                      <Input
                        id="insurance.trainerToClientRatio"
                        value={formData.insurance?.trainerToClientRatio ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, trainerToClientRatio: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.averageSessionDuration">Average Session Duration</Label>
                      <Input
                        id="insurance.averageSessionDuration"
                        value={formData.insurance?.averageSessionDuration ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, averageSessionDuration: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.clientsAge">Clients Age Range</Label>
                      <Input
                        id="insurance.clientsAge"
                        value={formData.insurance?.clientsAge ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", { ...formData.insurance, clientsAge: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance.qualificationAndCertification">Qualification and Certification</Label>
                      <Input
                        id="insurance.qualificationAndCertification"
                        value={formData.insurance?.qualificationAndCertification ?? ""}
                        onChange={(e) =>
                          handleChange("insurance", {
                            ...formData.insurance,
                            qualificationAndCertification: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance.previousInsuranceClaimed"
                        checked={formData.insurance?.previousInsuranceClaimed ?? false}
                        onCheckedChange={(checked) =>
                          handleChange("insurance", { ...formData.insurance, previousInsuranceClaimed: checked })
                        }
                      />
                      <Label htmlFor="insurance.previousInsuranceClaimed">Previous Insurance Claimed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance.previousInsuranceDeclined"
                        checked={formData.insurance?.previousInsuranceDeclined ?? false}
                        onCheckedChange={(checked) =>
                          handleChange("insurance", { ...formData.insurance, previousInsuranceDeclined: checked })
                        }
                      />
                      <Label htmlFor="insurance.previousInsuranceDeclined">
                        Previous Insurance Declined or Issued at Special Terms
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance.hasEverDeclaredBankruptcy"
                        checked={formData.insurance?.hasEverDeclaredBankruptcy ?? false}
                        onCheckedChange={(checked) =>
                          handleChange("insurance", { ...formData.insurance, hasEverDeclaredBankruptcy: checked })
                        }
                      />
                      <Label htmlFor="insurance.hasEverDeclaredBankruptcy">Has Ever Declared Bankruptcy</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>

        <DialogFooter className="p-6 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {trainer ? "Update Trainer" : "Add Trainer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

