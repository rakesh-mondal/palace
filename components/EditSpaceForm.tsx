"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertCircle, Upload, Link } from "lucide-react"
import { useState } from "react"

const spaceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must not exceed 50 characters"),
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
  status: z.enum(["Active", "Inactive", "Maintenance"]),
  unavailableDates: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
      }),
    )
    .optional(),
  proxyDoorId: z.string().optional(),
  vationxReaderId: z.string().optional(),
  vationxReaderGroupId: z.string().optional(),
})

type FormData = z.infer<typeof spaceSchema>

interface EditSpaceFormProps {
  space: FormData
  onSubmit: (data: FormData) => void
  onCancel: () => void
}

const activityTypesWithIcons = [
  { value: "yoga", label: "Yoga", icon: "Yoga" },
  { value: "pilates", label: "Pilates", icon: "Dumbbell" },
  { value: "meditation", label: "Meditation", icon: "Heart" },
  { value: "fitness", label: "Fitness", icon: "Dumbbell" },
  { value: "dance", label: "Dance", icon: "Music" },
  { value: "music", label: "Music", icon: "Music" },
]

const statusOptions = [
  { value: "Active", label: "Active", icon: CheckCircle, color: "text-green-500" },
  { value: "Inactive", label: "Inactive", icon: XCircle, color: "text-red-500" },
  { value: "Maintenance", label: "Maintenance", icon: AlertCircle, color: "text-yellow-500" },
]

const features = [
  "Wi-Fi",
  "Air Conditioning",
  "Changing Rooms",
  "Showers",
  "Lockers",
  "Parking",
  "Video Conferencing",
  "Smart Board",
  "Catering Service",
]

const equipments = [
  "Yoga Mats",
  "Weights",
  "Treadmills",
  "Exercise Bikes",
  "Resistance Bands",
  "Foam Rollers",
  "Conference System",
  "Display Screens",
  "Microphones",
  "Projector",
]

const handleFormSubmit = async (
  data: FormData,
  onSubmit: (data: FormData) => void,
  onCancel: () => void,
  setIsSubmitting: (isSubmitting: boolean) => void,
) => {
  setIsSubmitting(true)
  try {
    await onSubmit(data)
    toast({
      title: "Space updated successfully",
      description: "The space details have been updated.",
    })
    onCancel() // This will close the edit modal
  } catch (error) {
    toast({
      title: "Error updating space",
      description: "An error occurred while updating the space. Please try again.",
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false)
  }
}

export function EditSpaceForm({ space, onSubmit, onCancel }: EditSpaceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("space-information")

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(spaceSchema),
    defaultValues: space,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit((data) => {
          if (isDirty) {
            setShowConfirmDialog(true)
          } else {
            toast({
              title: "No changes made",
              description: "Please make some changes before updating.",
            })
          }
        })(e)
      }}
      className="space-y-6 p-6 max-h-[calc(85vh-120px)] overflow-y-auto"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="sticky top-0 z-10 w-full grid grid-cols-4 bg-white mb-6">
          <TabsTrigger value="space-information">Space Information</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="access-availability">Access & Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="space-information" className="space-y-6 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Space Name</Label>
              <Input id="name" {...register("name")} className="h-10" />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" {...register("district")} className="h-10" />
              {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} className="h-10" />
            {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleMapsLink">Google Maps Link</Label>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="googleMapsLink"
                {...register("googleMapsLink")}
                className="pl-10 h-10"
                placeholder="https://example.com/location"
              />
            </div>
            {errors.googleMapsLink && <p className="text-red-500 text-xs">{errors.googleMapsLink.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} className="h-[calc(100%-2rem)]" />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacityLimit">Capacity Limit</Label>
              <Input
                id="capacityLimit"
                type="number"
                {...register("capacityLimit", { valueAsNumber: true })}
                className="h-10"
              />
              {errors.capacityLimit && <p className="text-red-500 text-xs">{errors.capacityLimit.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumBookingDuration">Minimum Booking Duration (hours)</Label>
              <Input
                id="minimumBookingDuration"
                type="number"
                step="0.1"
                {...register("minimumBookingDuration", { valueAsNumber: true })}
                className="h-10"
              />
              {errors.minimumBookingDuration && (
                <p className="text-red-500 text-xs">{errors.minimumBookingDuration.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openTime">Open Time</Label>
              <Input id="openTime" type="time" {...register("openTime")} className="h-10" />
              {errors.openTime && <p className="text-red-500 text-xs">{errors.openTime.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeTime">Close Time</Label>
              <Input id="closeTime" type="time" {...register("closeTime")} className="h-10" />
              {errors.closeTime && <p className="text-red-500 text-xs">{errors.closeTime.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Activity Types</Label>
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
            <Label>Features</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="features"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
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
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Space Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} className="h-10">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className={`h-4 w-4 ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6 pb-4">
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
            <Label htmlFor="photo360Url">360° Photo URL</Label>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="photo360Url"
                {...register("photo360Url")}
                className="pl-10 h-10"
                placeholder="https://example.com/360-photo"
              />
            </div>
            {errors.photo360Url && <p className="text-red-500 text-xs">{errors.photo360Url.message}</p>}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6 pb-4">
          <div className="space-y-4">
            <Label>Available Equipment</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {equipments.map((equipment) => (
                <div key={equipment} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="equipments"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
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
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="access-availability" className="space-y-6 pb-4">
          <div className="space-y-2">
            <Label htmlFor="accessType">Access Type</Label>
            <Controller
              name="accessType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} className="h-10">
                  <SelectTrigger>
                    <SelectValue placeholder="Select access type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Access</SelectItem>
                    <SelectItem value="private">Private Access</SelectItem>
                    <SelectItem value="membersOnly">Members Only</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.accessType && <p className="text-red-500 text-xs">{errors.accessType.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="proxyDoorId">Proxy Door ID</Label>
            <Input id="proxyDoorId" {...register("proxyDoorId")} placeholder="Enter Proxy Door ID" className="h-10" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vationxReaderId">Vationx Reader ID</Label>
            <Input
              id="vationxReaderId"
              {...register("vationxReaderId")}
              placeholder="Enter Vationx Reader ID"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vationxReaderGroupId">Vationx Reader Group ID</Label>
            <Input
              id="vationxReaderGroupId"
              {...register("vationxReaderGroupId")}
              placeholder="Enter Vationx Reader Group ID"
              className="h-10"
            />
          </div>

          <div className="space-y-4">
            <Label>Unavailable Dates</Label>
            <Controller
              name="unavailableDates"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <div className="space-y-4">
                  {field.value.map((date, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          type="date"
                          value={date.from}
                          onChange={(e) => {
                            const newDates = [...field.value]
                            newDates[index].from = e.target.value
                            field.onChange(newDates)
                          }}
                          className="h-10"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="date"
                          value={date.to}
                          onChange={(e) => {
                            const newDates = [...field.value]
                            newDates[index].to = e.target.value
                            field.onChange(newDates)
                          }}
                          className="h-10"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newDates = field.value.filter((_, i) => i !== index)
                          field.onChange(newDates)
                        }}
                        className="h-8"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      field.onChange([...field.value, { from: "", to: "" }])
                    }}
                    className="w-[200px] h-8"
                  >
                    Add Date Range
                  </Button>
                </div>
              )}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 flex justify-end space-x-2 pt-4 mt-6 bg-white border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Space"}
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will update the space details. Please confirm to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleSubmit(() => handleFormSubmit(watch(), onSubmit, onCancel, setIsSubmitting))()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Space"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )
}

