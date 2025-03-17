"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
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
import { CheckCircle, XCircle, AlertCircle, Upload } from "lucide-react"
import React from "react"
import Image from "next/image"

const phoneRegex = new RegExp(/^[0-9]{8,10}$/)

const schema = z.object({
  id: z.string().min(8, "ID must be at least 8 characters"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "No special characters allowed"),
  registeredAddress: z
    .string()
    .min(2, "Address must be at least 2 characters")
    .max(100, "Address must not exceed 100 characters"),
  mobileNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  assignedSpaces: z.array(z.string()).min(1, "At least one space must be assigned"),
  associatedSpacesCount: z.number().optional(),
  status: z.enum(["Active", "Inactive", "Pending"]),
  logo: z.any().optional(),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
})

type FormData = z.infer<typeof schema>

interface ExternalUserFormProps {
  onSubmit: (data: FormData) => void
  onCancel: () => void
  initialData?: Partial<FormData>
  userType: "Developer" | "Operator" | "Corporate"
  spaces: { id: string; name: string; type: string; capacity: number }[]
}

const generateId = (userType: string) => {
  const prefix = userType.substring(0, 3).toUpperCase()
  return `${prefix}${Math.random().toString(36).substr(2, 8).toUpperCase()}`
}

export function ExternalUserForm({ onSubmit, onCancel, initialData, userType, spaces }: ExternalUserFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      id: generateId(userType),
      name: "",
      registeredAddress: "",
      mobileNumber: "",
      email: "",
      assignedSpaces: [],
      status: "Active",
      associatedSpacesCount: 0,
      logo: undefined,
      websiteUrl: "",
    },
  })

  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true)
    const fullMobileNumber = `+852${data.mobileNumber}`
    const associatedSpacesCount = data.assignedSpaces.length
    const logoUrl = data.logo ? (typeof data.logo === "string" ? data.logo : URL.createObjectURL(data.logo)) : undefined
    await onSubmit({ ...data, mobileNumber: fullMobileNumber, associatedSpacesCount, logoUrl })
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (!initialData) {
      setValue("id", generateId(userType))
    }
  }, [initialData, setValue, userType])

  const statusOptions = [
    { value: "Active", label: "Active", icon: CheckCircle, color: "text-green-500" },
    { value: "Inactive", label: "Inactive", icon: XCircle, color: "text-red-500" },
    { value: "Pending", label: "Pending", icon: AlertCircle, color: "text-yellow-500" },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="id">{userType} ID</Label>
          <Input id="id" {...register("id")} disabled className="bg-gray-100 h-8" />
          {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>}
        </div>
        <div>
          <Label htmlFor="name">{userType} Name</Label>
          <Input id="name" {...register("name")} className="h-8" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="registeredAddress">Registered Address</Label>
        <Input id="registeredAddress" {...register("registeredAddress")} className="h-8" />
        {errors.registeredAddress && <p className="text-red-500 text-xs mt-1">{errors.registeredAddress.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md h-8">
              +852
            </span>
            <Input
              id="mobileNumber"
              {...register("mobileNumber")}
              className="rounded-none rounded-r-lg h-8"
              placeholder="12345678"
            />
          </div>
          {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" {...register("email")} className="h-8" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} className="h-8">
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select a status">
                  {field.value && (
                    <div className="flex items-center">
                      {React.createElement(
                        statusOptions.find((s) => s.value === field.value)?.icon as React.ElementType,
                        {
                          className: `w-4 h-4 mr-2 ${statusOptions.find((s) => s.value === field.value)?.color}`,
                        },
                      )}
                      {field.value}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center">
                      <status.icon className={`w-4 h-4 mr-2 ${status.color}`} />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
      </div>
      <div>
        <Label>Assigned Spaces</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto">
          {spaces.map((space) => (
            <div key={space.id} className="flex items-center space-x-2">
              <Controller
                name="assignedSpaces"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={space.id}
                    checked={field.value.includes(space.id)}
                    onCheckedChange={(checked) => {
                      const updatedSpaces = checked
                        ? [...field.value, space.id]
                        : field.value.filter((id) => id !== space.id)
                      field.onChange(updatedSpaces)
                    }}
                  />
                )}
              />
              <Label htmlFor={space.id} className="text-sm">
                {space.name}
              </Label>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {control._formValues.assignedSpaces.length} of {spaces.length} spaces selected
        </div>
        {errors.assignedSpaces && <p className="text-red-500 text-xs mt-1">{errors.assignedSpaces.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="logo" className="text-xs font-medium">
          Company Logo
        </Label>
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="logo"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {field.value ? (
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                    <Image
                      src={typeof field.value === "string" ? field.value : URL.createObjectURL(field.value)}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">Click to upload logo</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                )}
                <input
                  id="logo"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert("File too large. Please select an image under 5MB")
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
        <Label htmlFor="websiteUrl" className="text-xs font-medium">
          Website URL
        </Label>
        <div className="relative flex items-center">
          {/* <div className="absolute left-3 flex items-center pointer-events-none">
            <Link className="h-4 w-4 text-gray-400" />
          </div> */}
          <Controller
            name="websiteUrl"
            control={control}
            render={({ field }) => (
              <Input {...field} id="websiteUrl" className="pl-10 h-10" placeholder="https://example.com" />
            )}
          />
        </div>
        {errors.websiteUrl && <p className="text-red-500 text-xs mt-1">{errors.websiteUrl.message}</p>}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} className="h-8">
          Cancel
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()} className="h-8">
          Reset Form
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="submit" disabled={isSubmitting || !isDirty} className="h-8">
              {isSubmitting ? "Updating..." : initialData ? `Update ${userType}` : `Add ${userType}`}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[715px] bg-[#FFFFFF]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will {initialData ? "update" : "add"} the {userType.toLowerCase()}. Please confirm to
                proceed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit(onSubmitForm)}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  )
}

