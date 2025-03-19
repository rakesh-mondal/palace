"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/ui/stepper"
import { toast } from "@/components/ui/use-toast"
import {
  Plus,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  Music,
  Dumbbell,
  LinkIcon,
  Upload,
  Link,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { SpaceIcon as Yoga } from "lucide-react"
import { MultiSelect } from "@/components/ui/multi-select"

const TOTAL_STEPS = 4

const activityTypesWithIcons = [
  { value: "yoga", label: "Yoga", icon: Yoga },
  { value: "pilates", label: "Pilates", icon: Dumbbell },
  { value: "meditation", label: "Meditation", icon: Heart },
  { value: "fitness", label: "Fitness", icon: Dumbbell },
  { value: "dance", label: "Dance", icon: Music },
  { value: "music", label: "Music", icon: Music },
]

const formSchema = z.object({
  name: z.string().min(1, "Space name is required"),
  district: z.string().min(1, "District is required"),
  location: z.string().min(1, "Location is required"),
  googleMapsLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  capacityLimit: z.number().min(1, "Capacity must be at least 1"),
  minimumBookingDuration: z.number().min(0.5, "Minimum booking duration must be at least 0.5 hours"),
  openTime: z.string().min(1, "Open time is required"),
  closeTime: z.string().min(1, "Close time is required"),
  activityTypes: z.array(z.string()).min(1, "Select at least one activity type"),
  features: z.array(z.string()),
  coverPhoto: z.any().optional(),
  photos: z.any().optional(),
  photo360Url: z.string().url("Invalid URL").optional().or(z.literal("")),
  equipments: z.array(z.string()),
  accessType: z.string().min(1, "Access type is required"),
  status: z.string().min(1, "Status is required"),
  unavailableDates: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      timeSlots: z.array(z.object({
        from: z.string(),
        to: z.string(),
        reason: z.string().optional()
      })).optional()
    })
  ).optional(),
  systemCalculatedHours: z.number().min(0),
  availableHoursForAllocation: z.number().min(0).refine(
    (val) => val <= (watch?.("systemCalculatedHours") || 0),
    {
      message: "Available hours for allocation cannot exceed system-calculated hours"
    }
  ),
  propertyOwners: z.array(z.string()),
  operators: z.array(z.string()),
  organizations: z.array(z.string()),
  managers: z.array(z.string()),
  proxyDoorId: z.string().optional(),
  vationxReaderId: z.string().optional(),
  vationxReaderGroupId: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const steps = ["Space Information", "Media & Equipment", "Access & Availability", "Entity Relationships"]

interface AddSpaceFormProps {
  onSubmit: (data: FormData) => void
  onCancel: () => void
  internalUsers: { id: string; name: string; role: string }[]
  externalUsers: { id: string; name: string; role: string }[]
}

export function AddSpaceForm({ onSubmit, onCancel, internalUsers, externalUsers }: AddSpaceFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customFeatures, setCustomFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false)
  const [customEquipments, setCustomEquipments] = useState<string[]>([])
  const [newEquipment, setNewEquipment] = useState("")
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false)

  console.log("Current step:", currentStep)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      district: "",
      location: "",
      googleMapsLink: "",
      description: "",
      capacityLimit: 0,
      minimumBookingDuration: 0.5,
      openTime: "",
      closeTime: "",
      activityTypes: [],
      features: [],
      coverPhoto: undefined,
      photos: undefined,
      photo360Url: "",
      equipments: [],
      accessType: "",
      status: "",
      unavailableDates: [],
      systemCalculatedHours: 0,
      availableHoursForAllocation: 0,
      propertyOwners: [],
      operators: [],
      organizations: [],
      managers: [],
      proxyDoorId: "",
      vationxReaderId: "",
      vationxReaderGroupId: "",
    },
  })

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      toast({
        title: "Space created successfully",
        description: "The new space has been added to the list.",
      })
      // Reset the form after successful submission
      reset()
      // Note: We're not calling onCancel() here to prevent automatic closing
    } catch (error) {
      console.error("Error creating space:", error)
      toast({
        title: "Error creating space",
        description: "An error occurred while creating the space. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    console.log("Current step before nextStep:", currentStep)
    if (currentStep < TOTAL_STEPS - 1) {
      const fieldsToValidate = getFieldsForStep(currentStep)
      const isStepValid = await trigger(fieldsToValidate)
      if (isStepValid) {
        setCurrentStep((prev) => {
          console.log("Moving to step:", prev + 1)
          return prev + 1
        })
      } else {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
      }
    } else {
      // If we're on the last step, submit the form
      handleSubmit(onFormSubmit)()
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0: // Space Information
        return [
          "name",
          "district",
          "location",
          "googleMapsLink",
          "description",
          "capacityLimit",
          "minimumBookingDuration",
          "openTime",
          "closeTime",
          "activityTypes",
          "features",
          "status",
        ]
      case 1: // Media & Equipment
        return ["coverPhoto", "photos", "photo360Url", "equipments"]
      case 2: // Access & Availability
        return ["accessType", "unavailableDates", "proxyDoorId", "vationxReaderId", "vationxReaderGroupId"]
      case 3: // Entity Relationships
        return ["propertyOwners", "operators", "organizations", "managers"]
      default:
        return []
    }
  }

  const addCustomFeature = () => {
    if (newFeature.trim()) {
      setCustomFeatures((prev) => [...prev, newFeature.trim()])
      setNewFeature("")
      setIsAddFeatureOpen(false)
      toast({
        title: "Feature added",
        description: `${newFeature.trim()} has been added to features.`,
      })
    } else {
      toast({
        title: "Invalid feature",
        description: "Please enter a feature name.",
        variant: "destructive",
      })
    }
  }

  const removeCustomFeature = (feature: string) => {
    setCustomFeatures((prev) => prev.filter((f) => f !== feature))
    const currentFeatures = watch("features")
    setValue(
      "features",
      currentFeatures.filter((f) => f !== feature),
      { shouldValidate: true },
    )
    toast({
      title: "Feature removed",
      description: `${feature} has been removed from features.`,
    })
  }

  const addCustomEquipment = () => {
    if (newEquipment.trim()) {
      setCustomEquipments((prev) => [...prev, newEquipment.trim()])
      setNewEquipment("")
      setIsAddEquipmentOpen(false)
      toast({
        title: "Equipment added",
        description: `${newEquipment.trim()} has been added to equipment.`,
      })
    } else {
      toast({
        title: "Invalid equipment",
        description: "Please enter an equipment name.",
        variant: "destructive",
      })
    }
  }

  const removeCustomEquipment = (equipment: string) => {
    setCustomEquipments((prev) => prev.filter((e) => e !== equipment))
    const currentEquipments = watch("equipments")
    setValue(
      "equipments",
      currentEquipments.filter((e) => e !== equipment),
      { shouldValidate: true },
    )
    toast({
      title: "Equipment removed",
      description: `${equipment} has been removed from equipment.`,
    })
  }

  console.log("Rendering step:", currentStep)

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 sm:p-6 space-y-4 pb-16">
      <Stepper steps={steps} currentStep={currentStep} className="mb-4" />

      <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2">
        {currentStep === 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium">
                  Space Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} id="name" className="h-10" />}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="district" className="text-xs font-medium">
                  District
                </Label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="central">Central</SelectItem>
                        <SelectItem value="kowloon">Kowloon</SelectItem>
                        <SelectItem value="newTerritories">New Territories</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs font-medium">
                    Location
                  </Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => <Input {...field} id="location" className="h-10" />}
                  />
                  {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleMapsLink" className="text-xs font-medium">
                    Google Maps Link
                  </Label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <Controller
                      name="googleMapsLink"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="googleMapsLink"
                          className="pl-10 h-10"
                          placeholder="https://example.com/location"
                        />
                      )}
                    />
                  </div>
                  {errors.googleMapsLink && <p className="text-red-500 text-xs">{errors.googleMapsLink.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-medium">
                  Description
                </Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Textarea {...field} id="description" className="h-[calc(100%-2rem)]" />}
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="capacityLimit" className="text-xs font-medium">
                  Capacity Limit
                </Label>
                <Controller
                  name="capacityLimit"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="capacityLimit"
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-10"
                    />
                  )}
                />
                {errors.capacityLimit && <p className="text-red-500 text-xs">{errors.capacityLimit.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumBookingDuration" className="text-xs font-medium">
                  Minimum Booking Duration (hours)
                </Label>
                <Controller
                  name="minimumBookingDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="sm"
                      type="number"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      id="minimumBookingDuration"
                      placeholder="Enter minimum booking duration"
                      className="h-10"
                    />
                  )}
                />
                {errors.minimumBookingDuration && (
                  <p className="text-red-500 text-xs">{errors.minimumBookingDuration.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="openTime" className="text-xs font-medium">
                  Open Time
                </Label>
                <Controller
                  name="openTime"
                  control={control}
                  render={({ field }) => <Input {...field} id="openTime" type="time" className="h-10" />}
                />
                {errors.openTime && <p className="text-red-500 text-xs">{errors.openTime.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeTime" className="text-xs font-medium">
                  Close Time
                </Label>
                <Controller
                  name="closeTime"
                  control={control}
                  render={({ field }) => <Input {...field} id="closeTime" type="time" className="h-10" />}
                />
                {errors.closeTime && <p className="text-red-500 text-xs">{errors.closeTime.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Activity Types</Label>
              <Controller
                name="activityTypes"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activityTypesWithIcons.map((activity) => {
                      const isSelected = field.value.includes(activity.value)
                      return (
                        <button
                          key={activity.value}
                          type="button"
                          onClick={() => {
                            const newValue = isSelected
                              ? field.value.filter((v: string) => v !== activity.value)
                              : [...field.value, activity.value]
                            field.onChange(newValue)
                          }}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <activity.icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{activity.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              />
              {errors.activityTypes && <p className="text-red-500 text-xs">{errors.activityTypes.message}</p>}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Features</Label>
                <Dialog open={isAddFeatureOpen} onOpenChange={setIsAddFeatureOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Feature
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Feature</DialogTitle>
                      <DialogDescription>Enter the name of the new feature you want to add.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Feature Name</Label>
                        <Input
                          placeholder="Enter feature name"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addCustomFeature()
                            }
                          }}
                          className="h-10"
                        />
                      </div>
                      <Button className="h-8" onClick={addCustomFeature}>
                        Add Feature
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Wi-Fi",
                  "Air Conditioning",
                  "Changing Rooms",
                  "Showers",
                  "Lockers",
                  "Parking",
                  ...customFeatures,
                ].map((feature) => (
                  <div key={feature} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="features"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id={`feature-${feature}`}
                            checked={field.value.includes(feature)}
                            onCheckedChange={(checked) => {
                              const updatedFeatures = checked
                                ? [...field.value, feature]
                                : field.value.filter((f) => f !== feature)
                              field.onChange(updatedFeatures)
                            }}
                          />
                        )}
                      />
                      <Label htmlFor={`feature-${feature}`} className="text-xs font-medium">
                        {feature}
                      </Label>
                    </div>
                    {customFeatures.includes(feature) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomFeature(feature)}
                        className="text-red-500 hover:text-red-600 h-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs font-medium">
                Space Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} className="h-10">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Active
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Inactive
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          Under Maintenance
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="coverPhoto" className="text-xs font-medium">
                Cover Photo
              </Label>
              <Controller
                name="coverPhoto"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="coverPhoto"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input
                        id="coverPhoto"
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              toast({
                                title: "File too large",
                                description: "Please select an image under 5MB",
                                variant: "destructive",
                              })
                              return
                            }
                            field.onChange(file)
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos" className="text-xs font-medium">
                Additional Photos
              </Label>
              <Controller
                name="photos"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="photos"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input
                        id="photos"
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg,image/gif"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          const validFiles = files.filter((file) => {
                            if (file.size > 5 * 1024 * 1024) {
                              toast({
                                title: "File too large",
                                description: `${file.name} is over 5MB`,
                                variant: "destructive",
                              })
                              return false
                            }
                            return true
                          })
                          field.onChange(validFiles)
                        }}
                      />
                    </label>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo360Url" className="text-xs font-medium">
                360° Photo URL
              </Label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <Link className="h-4 w-4 text-gray-400" />
                </div>
                <Controller
                  name="photo360Url"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="photo360Url"
                      className="pl-10 h-10 bg-gray-50 border-gray-300"
                      placeholder="https://example.com/360-photo"
                    />
                  )}
                />
              </div>
              {errors.photo360Url && <p className="text-red-500 text-xs">{errors.photo360Url.message}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Available Equipment</Label>
                <Dialog open={isAddEquipmentOpen} onOpenChange={setIsAddEquipmentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Equipment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Equipment</DialogTitle>
                      <DialogDescription>Enter the name of the new equipment you want to add.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Equipment Name</Label>
                        <Input
                          placeholder="Enter equipment name"
                          value={newEquipment}
                          onChange={(e) => setNewEquipment(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addCustomEquipment()
                            }
                          }}
                          className="h-10"
                        />
                      </div>
                      <Button className="h-8" onClick={addCustomEquipment}>
                        Add Equipment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Yoga Mats",
                  "Weights",
                  "Treadmills",
                  "Exercise Bikes",
                  "Resistance Bands",
                  "Foam Rollers",
                  ...customEquipments,
                ].map((equipment) => (
                  <div key={equipment} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="equipments"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id={`equipment-${equipment}`}
                            checked={field.value.includes(equipment)}
                            onCheckedChange={(checked) => {
                              const updatedEquipments = checked
                                ? [...field.value, equipment]
                                : field.value.filter((e) => e !== equipment)
                              field.onChange(updatedEquipments)
                            }}
                          />
                        )}
                      />
                      <Label htmlFor={`equipment-${equipment}`} className="text-xs font-medium">
                        {equipment}
                      </Label>
                    </div>
                    {customEquipments.includes(equipment) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomEquipment(equipment)}
                        className="text-red-500 hover:text-red-600 h-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hours Management</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Available Hours (as per System)</Label>
                  <Controller
                    name="systemCalculatedHours"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        disabled
                        className="bg-gray-100"
                        placeholder="Auto-calculated"
                      />
                    )}
                  />
                  <p className="text-sm text-muted-foreground">
                    System automatically calculates total operational hours
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Available Hours for Allocation</Label>
                  <Controller
                    name="availableHoursForAllocation"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={watch("systemCalculatedHours")}
                        placeholder="Enter available hours"
                      />
                    )}
                  />
                  <p className="text-sm text-muted-foreground">
                    Cannot exceed system-calculated hours
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Enhanced Availability Settings</h3>
              <div className="space-y-4">
                <Controller
                  name="unavailableDates"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-4">
                      {field.value?.map((date, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-md">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Unavailable Period {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newDates = [...field.value]
                                newDates.splice(index, 1)
                                field.onChange(newDates)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>From Date</Label>
                              <Input
                                type="date"
                                value={date.from}
                                onChange={(e) => {
                                  const newDates = [...field.value]
                                  newDates[index].from = e.target.value
                                  field.onChange(newDates)
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>To Date</Label>
                              <Input
                                type="date"
                                value={date.to}
                                onChange={(e) => {
                                  const newDates = [...field.value]
                                  newDates[index].to = e.target.value
                                  field.onChange(newDates)
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label>Time Slots (Optional)</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newDates = [...field.value]
                                  if (!newDates[index].timeSlots) {
                                    newDates[index].timeSlots = []
                                  }
                                  newDates[index].timeSlots.push({
                                    from: "",
                                    to: "",
                                    reason: ""
                                  })
                                  field.onChange(newDates)
                                }}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Time Slot
                              </Button>
                            </div>
                            
                            {date.timeSlots?.map((slot, slotIndex) => (
                              <div key={slotIndex} className="grid grid-cols-3 gap-4 items-start p-3 bg-gray-50 rounded-md">
                                <div className="space-y-2">
                                  <Label>From Time</Label>
                                  <Input
                                    type="time"
                                    value={slot.from}
                                    onChange={(e) => {
                                      const newDates = [...field.value]
                                      newDates[index].timeSlots[slotIndex].from = e.target.value
                                      field.onChange(newDates)
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>To Time</Label>
                                  <Input
                                    type="time"
                                    value={slot.to}
                                    onChange={(e) => {
                                      const newDates = [...field.value]
                                      newDates[index].timeSlots[slotIndex].to = e.target.value
                                      field.onChange(newDates)
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Reason (Optional)</Label>
                                  <div className="flex gap-2">
                                    <Input
                                      value={slot.reason || ""}
                                      onChange={(e) => {
                                        const newDates = [...field.value]
                                        newDates[index].timeSlots[slotIndex].reason = e.target.value
                                        field.onChange(newDates)
                                      }}
                                      placeholder="e.g., Maintenance"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const newDates = [...field.value]
                                        newDates[index].timeSlots.splice(slotIndex, 1)
                                        field.onChange(newDates)
                                      }}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          field.onChange([...field.value || [], { from: "", to: "", timeSlots: [] }])
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Unavailable Period
                      </Button>
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Access Control</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Access Type</Label>
                  <Controller
                    name="accessType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select access type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proxy">Proxy Card</SelectItem>
                          <SelectItem value="vationx">VationX</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Proxy Door ID</Label>
                  <Controller
                    name="proxyDoorId"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter Proxy Door ID" className="h-10" />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vationx Reader ID</Label>
                  <Controller
                    name="vationxReaderId"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter Vationx Reader ID" className="h-10" />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vationx Reader Group ID</Label>
                  <Controller
                    name="vationxReaderGroupId"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter Vationx Reader Group ID" className="h-10" />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Entity Relationships</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Property Owners</Label>
                <Controller
                  name="propertyOwners"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={internalUsers
                        .filter((user) => user.role === "Property Owner")
                        .map((user) => ({ label: user.name, value: user.id }))}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select property owners"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Operators</Label>
                <Controller
                  name="operators"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={externalUsers
                        .filter((user) => user.role === "Operator")
                        .map((user) => ({ label: user.name, value: user.id }))}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select operators"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Organizations</Label>
                <Controller
                  name="organizations"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={externalUsers
                        .filter((user) => user.role === "Organization")
                        .map((user) => ({ label: user.name, value: user.id }))}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select organizations"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Managers</Label>
                <Controller
                  name="managers"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={internalUsers
                        .filter((user) => user.role === "Manager")
                        .map((user) => ({ label: user.name, value: user.id }))}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select managers"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        {currentStep > 0 && (
          <Button type="button" onClick={prevStep} variant="outline" className="h-8 w-full sm:w-auto">
            Previous
          </Button>
        )}
        {currentStep < TOTAL_STEPS - 1 ? (
          <Button type="button" onClick={nextStep} className="h-8 w-full sm:w-auto">
            Next
          </Button>
        ) : (
          <Button type="button" onClick={nextStep} disabled={isSubmitting || !isValid} className="h-8">
            {isSubmitting ? "Creating Space..." : "Create Space"}
          </Button>
        )}
      </div>
    </form>
  )
}

