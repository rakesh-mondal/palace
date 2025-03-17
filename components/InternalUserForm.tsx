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
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import React from "react"

const phoneRegex = new RegExp(/^[0-9]{8,10}$/)

async function checkMobileNumberUnique(mobileNumber: string): Promise<boolean> {
  // This is a mock implementation. In a real application, you would check against your database.
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true
}

const schema = z.object({
  userId: z.string().min(8, "User ID must be at least 8 characters"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "No special characters allowed"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "No special characters allowed"),
  mobileNumber: z
    .string()
    .regex(phoneRegex, "Mobile number must be 8-10 digits")
    .refine(async (value) => {
      const isUnique = await checkMobileNumberUnique(value)
      return isUnique
    }, "Mobile number must be unique"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Manager", "Executive"]),
  assignedSpaces: z.array(z.string()).min(1, "At least one space must be assigned"),
  status: z.enum(["Active", "Inactive", "Pending"]),
})

type FormData = z.infer<typeof schema>

interface InternalUserFormProps {
  onSubmit: (data: FormData) => void
  onCancel: () => void
  initialData?: Partial<FormData>
  spaces: { id: string; name: string; type: string; capacity: number }[]
}

const generateUserId = () => {
  return `USR${Math.random().toString(36).substr(2, 8).toUpperCase()}`
}

export function InternalUserForm({ onSubmit, onCancel, initialData, spaces }: InternalUserFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      userId: generateUserId(),
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      role: "Manager",
      assignedSpaces: [],
      status: "Active",
    },
  })

  const onSubmitForm = async (data: FormData) => {
    setIsLoading(true)
    const fullMobileNumber = `+852${data.mobileNumber}`
    await onSubmit({ ...data, mobileNumber: fullMobileNumber })
    setIsLoading(false)
  }

  useEffect(() => {
    if (!initialData) {
      setValue("userId", generateUserId())
    }
  }, [initialData, setValue])

  const statusOptions = [
    { value: "Active", label: "Active", icon: CheckCircle, color: "text-green-500" },
    { value: "Inactive", label: "Inactive", icon: XCircle, color: "text-red-500" },
    { value: "Pending", label: "Pending", icon: AlertCircle, color: "text-yellow-500" },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="userId">User ID</Label>
          <Input id="userId" {...register("userId")} disabled className="h-8 bg-gray-100" />
          {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" {...register("email")} className="h-8" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} className="h-8" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} className="h-8" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md h-8">
              +852
            </span>
            <Input
              id="mobileNumber"
              {...register("mobileNumber")}
              className="h-8 rounded-none rounded-r-lg"
              placeholder="Enter 8-10 digit number"
            />
          </div>
          {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {spaces.map((space) => (
            <div key={space.id} className="flex items-center space-x-3">
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
              <Label htmlFor={space.id} className="text-sm font-normal">
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
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="h-8" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" variant="outline" className="h-8" onClick={() => reset()}>
          Reset Form
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="submit" disabled={isLoading || !isDirty} className="h-8">
              {isLoading ? "Updating..." : initialData ? "Update User" : "Add User"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[715px] bg-[#FFFFFF]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will {initialData ? "update" : "add"} the user. Please confirm to proceed.
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

