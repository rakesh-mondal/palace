"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, HelpCircle, Upload, Check, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for parent entities
const mockParentEntities = {
  owner: [{ id: "ent-001", name: "Fitness First Global" }],
  developer: [
    { id: "ent-001", name: "Fitness First Global" },
    { id: "ent-002", name: "Asia Pacific Development" },
  ],
  operator: [
    { id: "ent-001", name: "Fitness First Global" },
    { id: "ent-002", name: "Asia Pacific Development" },
    { id: "ent-003", name: "Hong Kong Operations" },
  ],
  corporate: [
    { id: "ent-001", name: "Fitness First Global" },
    { id: "ent-002", name: "Asia Pacific Development" },
    { id: "ent-003", name: "Hong Kong Operations" },
    { id: "ent-004", name: "HSBC Corporate" },
    { id: "ent-005", name: "CBRE" },
  ],
}

// Entity types
const entityTypes = [
  { id: "developer", label: "Developer" },
  { id: "operator", label: "Operator" },
  { id: "corporate", label: "Corporate" },
  { id: "employee", label: "Employee" },
]

// Months for allocation
const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]

// Years for allocation
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => ({
  value: (currentYear + i).toString(),
  label: (currentYear + i).toString(),
}))

// Departments/Teams
const departments = [
  { value: "management", label: "Management" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "IT" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
]

interface AddEntityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function AddEntityModal({ isOpen, onClose, onSubmit }: AddEntityModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    entityType: "corporate",
    name: "",
    entityId: `ENT-${Math.floor(1000 + Math.random() * 9000)}`,
    email: "",
    phone: "",
    description: "",
    status: true,
    profileImage: null,
    parentEntity: "",
    department: "",
    reportingStructure: "direct",
    allocationAmount: "",
    allocationMonth: currentYear.toString(),
    allocationYear: "1",
    allocationPurpose: "",
    skipAllocation: false,
    permissions: {
      canAllocateHours: false,
      canCreateEntities: false,
      canViewReports: true,
      canManageAllocations: false,
    },
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [availableHours, setAvailableHours] = useState(5000)

  // Reset modal when closed
  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setFormData({
        entityType: "corporate",
        name: "",
        entityId: `ENT-${Math.floor(1000 + Math.random() * 9000)}`,
        email: "",
        phone: "",
        description: "",
        status: true,
        profileImage: null,
        parentEntity: "",
        department: "",
        reportingStructure: "direct",
        allocationAmount: "",
        allocationMonth: currentYear.toString(),
        allocationYear: "1",
        allocationPurpose: "",
        skipAllocation: false,
        permissions: {
          canAllocateHours: false,
          canCreateEntities: false,
          canViewReports: true,
          canManageAllocations: false,
        },
        termsAccepted: false,
      })
      setErrors({})
    }
  }, [isOpen])

  // Update entity ID when name changes
  useEffect(() => {
    if (formData.name) {
      const nameInitials = formData.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 3)

      const randomNum = Math.floor(1000 + Math.random() * 9000)
      setFormData((prev) => ({
        ...prev,
        entityId: `${nameInitials}-${randomNum}`,
      }))
    }
  }, [formData.name])

  // Update available hours based on parent entity
  useEffect(() => {
    if (formData.parentEntity) {
      // In a real app, this would fetch the available hours from the parent entity
      const mockAvailableHours = {
        "ent-001": 10000,
        "ent-002": 5000,
        "ent-003": 2500,
        "ent-004": 1000,
        "ent-005": 800,
      }
      setAvailableHours(mockAvailableHours[formData.parentEntity as keyof typeof mockAvailableHours] || 0)
    }
  }, [formData.parentEntity])

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Handle nested form field changes (for permissions)
  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  // Handle file upload for profile image
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }))
    }
  }

  // Validate current step
  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name) newErrors.name = "Entity name is required"
      if (!formData.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
    }

    if (step === 2) {
      if (!formData.parentEntity) newErrors.parentEntity = "Parent entity is required"
    }

    if (step === 3 && !formData.skipAllocation) {
      if (!formData.allocationAmount) {
        newErrors.allocationAmount = "Allocation amount is required"
      } else if (Number.parseInt(formData.allocationAmount) > availableHours) {
        newErrors.allocationAmount = `Amount exceeds available hours (${availableHours})`
      }
    }

    if (step === 4) {
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(formData)
      onClose()
    }
  }

  // Get parent entities based on entity type
  const getParentEntities = () => {
    switch (formData.entityType) {
      case "developer":
        return mockParentEntities.owner
      case "operator":
        return [...mockParentEntities.owner, ...mockParentEntities.developer]
      case "corporate":
        return [...mockParentEntities.owner, ...mockParentEntities.developer, ...mockParentEntities.operator]
      case "employee":
        return [...mockParentEntities.developer, ...mockParentEntities.operator, ...mockParentEntities.corporate]
      default:
        return []
    }
  }

  // Get step title
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Entity Type & Basic Info"
      case 2:
        return "Hierarchy Setup"
      case 3:
        return "Initial Allocation"
      case 4:
        return "Permissions & Review"
      default:
        return ""
    }
  }

  // Render progress indicator
  const renderProgressIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  s < step
                    ? "bg-green-100 text-green-800 border-2 border-green-500"
                    : s === step
                      ? "bg-blue-100 text-blue-800 border-2 border-blue-500"
                      : "bg-gray-100 text-gray-800 border border-gray-300",
                )}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
              <span
                className={cn("text-xs mt-1 text-center", s === step ? "font-medium text-blue-800" : "text-gray-500")}
              >
                {s === 1 ? "Basic Info" : s === 2 ? "Hierarchy" : s === 3 ? "Allocation" : "Review"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
    )
  }

  // Render step 1: Entity Type & Basic Info
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Entity Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {entityTypes.map((type) => (
              <div
                key={type.id}
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all",
                  formData.entityType === type.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/50",
                )}
                onClick={() => handleChange("entityType", type.id)}
              >
                <div className="text-center">
                  <div className="font-medium">{type.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Entity Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter entity name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="entityId">
              Entity ID/Code
              <span className="ml-2 text-xs text-gray-500">(Auto-generated)</span>
            </Label>
            <Input
              id="entityId"
              value={formData.entityId}
              onChange={(e) => handleChange("entityId", e.target.value)}
              placeholder="Entity ID"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email address"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-xs text-gray-500">(Optional)</span>
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description/Notes <span className="text-xs text-gray-500">(Optional)</span>
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter description or notes"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="status" className="flex items-center space-x-2">
              <span>Status</span>
              <div className="relative inline-block">
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                  Set the initial status of this entity
                </div>
              </div>
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => handleChange("status", checked)}
              />
              <span className={formData.status ? "text-green-600" : "text-gray-500"}>
                {formData.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">
              Profile Image <span className="text-xs text-gray-500">(Optional)</span>
            </Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage as File) || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-xs text-center">No image</div>
                )}
              </div>
              <label className="cursor-pointer">
                <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </div>
                <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render step 2: Hierarchy Setup
  const renderStep2 = () => {
    const parentEntities = getParentEntities()

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="parentEntity">
            Parent Entity <span className="text-red-500">*</span>
            <span className="ml-2 text-xs text-gray-500">(Who will allocate hours to this entity)</span>
          </Label>
          <Select value={formData.parentEntity} onValueChange={(value) => handleChange("parentEntity", value)}>
            <SelectTrigger className={errors.parentEntity ? "border-red-500" : ""}>
              <SelectValue placeholder="Select parent entity" />
            </SelectTrigger>
            <SelectContent>
              {parentEntities.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.parentEntity && <p className="text-red-500 text-xs">{errors.parentEntity}</p>}
        </div>

        {formData.parentEntity && (
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-3">Hierarchy Visualization</div>
              <div className="relative py-8">
                {/* Parent Entity */}
                <div className="flex justify-center mb-8">
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-center w-48">
                    <div className="text-xs text-blue-600 font-medium mb-1">
                      {parentEntities.find((e) => e.id === formData.parentEntity)?.name}
                    </div>
                    <div className="text-xs text-gray-500">Parent Entity</div>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="absolute left-1/2 top-16 w-0.5 h-8 bg-gray-300"></div>

                {/* Current Entity */}
                <div className="flex justify-center">
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center w-48">
                    <div className="text-xs text-green-600 font-medium mb-1">{formData.name || "New Entity"}</div>
                    <div className="text-xs text-gray-500">
                      {entityTypes.find((t) => t.id === formData.entityType)?.label}
                    </div>
                  </div>
                </div>

                {/* Potential Child Entities (if applicable) */}
                {(formData.entityType === "developer" ||
                  formData.entityType === "operator" ||
                  formData.entityType === "corporate") && (
                  <>
                    <div className="absolute left-1/2 top-40 w-0.5 h-8 bg-gray-300"></div>
                    <div className="flex justify-center mt-8">
                      <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-center w-48">
                        <div className="text-xs text-gray-600 font-medium mb-1">Potential Child Entities</div>
                        <div className="text-xs text-gray-500">
                          {formData.entityType === "developer" && "Operators, Corporates, Employees"}
                          {formData.entityType === "operator" && "Corporates, Employees"}
                          {formData.entityType === "corporate" && "Employees"}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="reportingStructure">Reporting Structure</Label>
            <Select
              value={formData.reportingStructure}
              onValueChange={(value) => handleChange("reportingStructure", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reporting structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct Reporting</SelectItem>
                <SelectItem value="matrix">Matrix Reporting</SelectItem>
                <SelectItem value="functional">Functional Reporting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.entityType === "employee" || formData.entityType === "corporate") && (
            <div className="space-y-2">
              <Label htmlFor="department">Department/Team</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <HelpCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-800">Hierarchy Rules</h4>
              <p className="text-xs text-blue-700 mt-1">
                {formData.entityType === "developer" &&
                  "Developers can only be created by the Owner/Admin and can allocate hours to Operators, Corporates, and Employees."}
                {formData.entityType === "operator" &&
                  "Operators can be created by the Owner/Admin or Developers and can allocate hours to Corporates and Employees."}
                {formData.entityType === "corporate" &&
                  "Corporates can be created by the Owner/Admin, Developers, or Operators and can only allocate hours to their Employees."}
                {formData.entityType === "employee" &&
                  "Employees can be created by Developers, Operators, or Corporates and cannot allocate hours to others."}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render step 3: Initial Allocation
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="skipAllocation"
            checked={formData.skipAllocation}
            onCheckedChange={(checked) => handleChange("skipAllocation", checked === true)}
          />
          <Label htmlFor="skipAllocation" className="text-sm cursor-pointer">
            Skip initial allocation (can be done later)
          </Label>
        </div>

        {!formData.skipAllocation && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="allocationAmount">
                  Hours to Allocate <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="allocationAmount"
                    type="number"
                    value={formData.allocationAmount}
                    onChange={(e) => handleChange("allocationAmount", e.target.value)}
                    placeholder="Enter hours"
                    className={errors.allocationAmount ? "border-red-500" : ""}
                    min="1"
                    max={availableHours.toString()}
                  />
                </div>
                {errors.allocationAmount && <p className="text-red-500 text-xs">{errors.allocationAmount}</p>}
              </div>

              <div className="space-y-2">
                <Label>Available Hours from Parent</Label>
                <div className="h-10 flex items-center px-3 border border-gray-300 bg-gray-50 rounded-md text-gray-700">
                  {availableHours.toLocaleString()} hours
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-800">Allocation Impact</div>
                  <div className="text-xs text-blue-700 mt-1">
                    {formData.allocationAmount ? (
                      <>
                        After allocation, parent will have{" "}
                        <span className="font-medium">
                          {(availableHours - Number.parseInt(formData.allocationAmount || "0")).toLocaleString()}
                        </span>{" "}
                        hours remaining
                      </>
                    ) : (
                      "Enter an allocation amount to see the impact"
                    )}
                  </div>
                </div>
                {formData.allocationAmount && (
                  <div className="text-2xl font-bold text-blue-800">
                    {Number.parseInt(formData.allocationAmount).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="allocationMonth">Allocation Month</Label>
                <Select
                  value={formData.allocationMonth}
                  onValueChange={(value) => handleChange("allocationMonth", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allocationYear">Allocation Year</Label>
                <Select
                  value={formData.allocationYear}
                  onValueChange={(value) => handleChange("allocationYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allocationPurpose">
                Purpose/Description <span className="text-xs text-gray-500">(Optional)</span>
              </Label>
              <Textarea
                id="allocationPurpose"
                value={formData.allocationPurpose}
                onChange={(e) => handleChange("allocationPurpose", e.target.value)}
                placeholder="Enter purpose or description for this allocation"
                rows={3}
              />
            </div>
          </>
        )}

        {formData.skipAllocation && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">No Initial Allocation</h4>
                <p className="text-xs text-yellow-700 mt-1">
                  You've chosen to skip the initial allocation. The entity will be created with 0 hours. You can
                  allocate hours to this entity later from the parent entity's allocation management.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render step 4: Permissions & Review
  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">Role-based Permissions</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="canAllocateHours" className="cursor-pointer">
                Can allocate hours to others
              </Label>
              <Switch
                id="canAllocateHours"
                checked={formData.permissions.canAllocateHours}
                onCheckedChange={(checked) => handleNestedChange("permissions", "canAllocateHours", checked)}
                disabled={formData.entityType === "employee"}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="canCreateEntities" className="cursor-pointer">
                Can create new entities
              </Label>
              <Switch
                id="canCreateEntities"
                checked={formData.permissions.canCreateEntities}
                onCheckedChange={(checked) => handleNestedChange("permissions", "canCreateEntities", checked)}
                disabled={formData.entityType === "employee"}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="canViewReports" className="cursor-pointer">
                Can view reports
              </Label>
              <Switch
                id="canViewReports"
                checked={formData.permissions.canViewReports}
                onCheckedChange={(checked) => handleNestedChange("permissions", "canViewReports", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="canManageAllocations" className="cursor-pointer">
                Can manage allocations
              </Label>
              <Switch
                id="canManageAllocations"
                checked={formData.permissions.canManageAllocations}
                onCheckedChange={(checked) => handleNestedChange("permissions", "canManageAllocations", checked)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-base font-medium mb-4">Summary</h3>

          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">Entity Type</div>
                <div className="text-sm font-medium">
                  {entityTypes.find((t) => t.id === formData.entityType)?.label}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Entity Name</div>
                <div className="text-sm font-medium">{formData.name}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Entity ID</div>
                <div className="text-sm font-medium">{formData.entityId}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="text-sm font-medium">{formData.email}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="text-sm font-medium">
                  {formData.status ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-gray-600">Inactive</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Parent Entity</div>
                <div className="text-sm font-medium">
                  {getParentEntities().find((e) => e.id === formData.parentEntity)?.name || "None"}
                </div>
              </div>

              {!formData.skipAllocation && (
                <>
                  <div>
                    <div className="text-xs text-gray-500">Allocation Amount</div>
                    <div className="text-sm font-medium">
                      {formData.allocationAmount
                        ? `${Number.parseInt(formData.allocationAmount).toLocaleString()} hours`
                        : "None"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">Allocation Period</div>
                    <div className="text-sm font-medium">
                      {formData.allocationMonth && formData.allocationYear
                        ? `${months.find((m) => m.value === formData.allocationMonth)?.label} ${formData.allocationYear}`
                        : "None"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-4">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => handleChange("termsAccepted", checked === true)}
            className={errors.termsAccepted ? "border-red-500" : ""}
          />
          <div>
            <Label
              htmlFor="termsAccepted"
              className={cn("text-sm cursor-pointer", errors.termsAccepted ? "text-red-500" : "")}
            >
              I agree to the terms and conditions for entity creation and hour allocation
            </Label>
            {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
          </div>
        </div>
      </div>
    )
  }

  // Render current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Entity</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 140px)" }}>
          {renderProgressIndicator()}

          <div className="mb-4">
            <h3 className="text-lg font-medium">{getStepTitle()}</h3>
            <p className="text-sm text-gray-500">
              {step === 1 && "Enter basic information about the new entity"}
              {step === 2 && "Set up where this entity fits in the hierarchy"}
              {step === 3 && "Allocate initial hours to this entity"}
              {step === 4 && "Set permissions and review entity details"}
            </p>
          </div>

          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            {step < 4 ? (
              <Button onClick={handleNextStep}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Create Entity</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

