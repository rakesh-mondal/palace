"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  Users,
  MapPin,
  LinkIcon,
  Dumbbell,
  Settings,
  Briefcase,
  Info,
  Calendar,
  ImageIcon,
  ChevronRight,
  PlusCircle,
  UserX,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditSpaceForm } from "@/components/EditSpaceForm"
import type { Space } from "@/types/space"

export const dynamic = "force-dynamic"

const spaces = [
  { id: "space1", name: "Swire Properties Wellness Center", type: "Multi-purpose", capacity: 100 },
  { id: "space2", name: "JLL Fitness Hub", type: "Gym", capacity: 50 },
  { id: "space3", name: "WeWork Collaborative Space", type: "Multi-purpose", capacity: 80 },
]

export default function SpaceDetailsPage({ params }: { params: { id: string } }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()
  const [spaceData, setSpaceData] = useState<Space>({
    id: "1",
    name: "Palace One",
    type: "Meeting Room",
    district: "Central",
    location: "1 Palace Avenue, Central, Hong Kong",
    googleMapsLink: "https://goo.gl/maps/examplePalaceOne",
    capacity: 50,
    status: "Active",
    description: "A modern meeting room with state-of-the-art facilities.",
    openTime: "06:00",
    closeTime: "22:00",
    minimumBookingDuration: 1,
    accessType: "Keycard",
    proxyDoorId: "PAL12345",
    vationxReaderId: "VX67890",
    vationxReaderGroupId: "VXGRP12345",
    activityTypes: ["Meeting", "Conference", "Workshop"],
    features: ["Wi-Fi", "Video Conferencing", "Smart Board", "Catering Service"],
    equipments: [
      "Dual Adjustable Pulley",
      "Incline Hyper Back Extension",
      "Lat Row Combo",
      "Leg Extension/Leg Curl Combo",
      "Leg Platform",
      "Pendulum Squat",
      "Power Rack",
      "Air Bike",
    ],
    coverPhoto:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2707f.jpg-6b7vAzkWrb5NfdPVY9NhjGvWQgYDmn.jpeg",
    photos: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2673f.jpg-BF30MGT29dCyCy9CUJdTYdr1e6isBN.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2711f.jpg-8umTnSSTOBDJUbgJ2eoDCL03BHtLO8.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2707f.jpg-6b7vAzkWrb5NfdPVY9NhjGvWQgYDmn.jpeg",
    ],
    photo360Url: "https://example.com/360-palace-one",
    unavailableDates: [
      { from: "2024-07-15", to: "2024-07-20" },
      { from: "2024-12-24", to: "2024-12-26" },
    ],
    entityRelationships: {
      developers: [{ id: "1", name: "Royal Developments Ltd." }],
      operators: [
        { id: "2", name: "Palace Management Co.", role: "Facility Management" },
        { id: "3", name: "Elite Events Ltd.", role: "Event Operations" },
      ],
      corporates: [
        { id: "4", name: "Global Corp", role: "Corporate Member" },
        { id: "5", name: "Tech Innovators Inc.", role: "Corporate Member" },
      ],
      managers: [{ id: "6", name: "Sarah Johnson", role: "Facility Manager" }],
      executives: [{ id: "7", name: "Michael Chen", role: "Operations Director" }],
    },
    lastModified: new Date().toISOString(),
  })

  const [existingUsers, setExistingUsers] = useState([
    { id: "u1", name: "John Doe", role: "Manager" },
    { id: "u2", name: "Jane Smith", role: "Executive" },
    { id: "u3", name: "Bob Johnson", role: "Operator" },
    { id: "u4", name: "Alice Brown", role: "Developer" },
  ])

  const handleSave = () => {
    setIsEditMode(false)
  }

  const selectUser = (entityType: string, userId: string) => {
    const user = existingUsers.find((u) => u.id === userId)
    if (user) {
      const updatedRelationships = { ...spaceData.entityRelationships }
      updatedRelationships[entityType] = [
        ...updatedRelationships[entityType],
        { id: user.id, name: user.name, role: user.role },
      ]
      setSpaceData({ ...spaceData, entityRelationships: updatedRelationships })
    }
  }

  const removeUser = (type: string, id: string) => {
    const updatedRelationships = { ...spaceData.entityRelationships }
    updatedRelationships[type] = updatedRelationships[type].filter((user) => user.id !== id)
    setSpaceData({ ...spaceData, entityRelationships: updatedRelationships })
  }

  const renderEntityRelationships = () => {
    return (
      <div className="space-y-6">
        {Object.entries(spaceData.entityRelationships).map(([type, entities]) => (
          <div key={type}>
            <div className="flex items-center justify-between gap-2 mb-3">
              {type === "developers" && <Building2 className="w-5 h-5 text-blue-500" />}
              {type === "operators" && <Settings className="w-5 h-5 text-green-500" />}
              {type === "corporates" && <Briefcase className="w-5 h-5 text-purple-500" />}
              {type === "managers" && <Users className="w-5 h-5 text-orange-500" />}
              {type === "executives" && <Users className="w-5 h-5 text-red-500" />}
              <h3 className="font-semibold flex-grow">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Assign User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add {type.slice(0, -1)}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Select User</Label>
                      <Select onValueChange={(value) => selectUser(type, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {entities.map((entity) => (
                <div key={entity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{entity.name}</span>
                    {entity.role && <span className="ml-2 text-sm text-gray-500">({entity.role})</span>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUser(type, entity.id)}
                    className="text-red-600"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handleEditSpace = (updatedData: Partial<Space>) => {
    // Update the space data
    setSpaceData((prevData) => ({ ...prevData, ...updatedData }))
    setIsEditModalOpen(false) // This will close the edit modal
    // Here you would typically also make an API call to update the space on the server
  }

  useEffect(() => {
    if (params.id === "new") {
      router.push("/space/new")
    } else {
      // In a real application, you would fetch the space data from an API
      // For now, we'll use dummy data based on the ID
      const spaceId = params.id
      const spaceName = `Palace ${spaceId}`

      // Define equipment lists for different spaces
      const gymEquipment = [
        "Dual Adjustable Pulley",
        "Incline Hyper Back Extension",
        "Lat Row Combo",
        "Leg Extension/Leg Curl Combo",
        "Leg Platform",
        "Pendulum Squat",
        "Power Rack",
        "Air Bike",
      ]

      const palaceThreeEquipment = [
        "Reformer",
        "Cadillac",
        "High Chair",
        "Ladder Barrel",
        "Wunda Chair",
        "Arm Chair",
        "Swedish / Stall Bar",
        "Foldable Yoga Mat",
        "Physio Table",
        "Electotherapy & Ultrasound Device",
      ]

      const palaceFourEquipment = [
        "Dual Adjustable Pulley",
        "Incline Hyper Back Extension",
        "Lat Row Combo",
        "Leg Extension/Leg Curl Combo",
        "Leg Platform",
        "Pendulum Squat",
        "Power Rack",
        "Rower",
        "Atlantis Smith Machine",
        "Olympic Weight Sets",
        "Adjustable Benches",
        "Functional Trainer",
      ]

      // Set equipment based on space ID
      let equipmentList = gymEquipment
      if (spaceId === "3") {
        equipmentList = palaceThreeEquipment
      } else if (spaceId === "4") {
        equipmentList = palaceFourEquipment
      }

      // Set the same gym photos for Palace One and Palace Two
      const gymPhotos = {
        coverPhoto:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2707f.jpg-6b7vAzkWrb5NfdPVY9NhjGvWQgYDmn.jpeg",
        photos: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2673f.jpg-BF30MGT29dCyCy9CUJdTYdr1e6isBN.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2711f.jpg-8umTnSSTOBDJUbgJ2eoDCL03BHtLO8.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220614-ThePalace-S8-2707f.jpg-6b7vAzkWrb5NfdPVY9NhjGvWQgYDmn.jpeg",
        ],
      }

      // Set Pilates studio photos for Palace Three
      const pilatesPhotos = {
        coverPhoto:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC9604-Enhanced-NRcomp-cI44eXqEAtmLccybpMekdJn32i0Avs.jpeg",
        photos: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC9627-Enhanced-NRcomp-d2s2aE9P5HOIjkC1jgvUUvyFnoMKAX.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC9612-Enhanced-NRcomp-h2yiwPjtTNwPnAbwXlf86voHNJJA6O.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC9604-Enhanced-NRcomp-cI44eXqEAtmLccybpMekdJn32i0Avs.jpeg",
        ],
      }

      // Set premium gym photos for Palace Four
      const premiumGymPhotos = {
        coverPhoto:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC8114-Enhanced-NR05covercomp-NFOezlIumyNmmWQHU1PlDTJxDkyno1.jpeg",
        photos: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC8117-Enhanced-NR052comp-Uqh4K6LL8BaL6RYuB0kJfIjPbrqAyo.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC8134-Enhanced-NR053comp-q9jri8LWxeHLRUgxhPy59OQBh9l2jA.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC8114-Enhanced-NR05covercomp-NFOezlIumyNmmWQHU1PlDTJxDkyno1.jpeg",
        ],
      }

      // Set location based on space ID
      let location = "1 Palace Avenue, Central, Hong Kong"
      if (spaceId === "1" || spaceId === "2") {
        location = "5/F, 46 Lyndhurst Terrace, Central, Hong Kong"
      } else if (spaceId === "3") {
        location = "16/F, The Plaza LKF, 21 D'Aguilar Street, Central, Hong Kong"
      } else if (spaceId === "4") {
        location = "2/F, Winsome House, 73 Wyndham Street, Central, Hong Kong"
      }

      setSpaceData((prevData) => ({
        ...prevData,
        id: spaceId,
        name: spaceName,
        location: location,
        capacity: spaceId === "1" ? 4 : spaceId === "2" ? 6 : spaceId === "3" ? 4 : 6, // Updated capacity values
        equipments: equipmentList,
        ...(spaceId === "1" || spaceId === "2" ? gymPhotos : {}),
        ...(spaceId === "3" ? pilatesPhotos : {}),
        ...(spaceId === "4" ? premiumGymPhotos : {}),
      }))
    }
  }, [params.id, router])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push("/space")} size="sm">
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{spaceData.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {spaceData.district}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={spaceData.status === "Active" ? "success" : "warning"}
                aria-label={`Status: ${spaceData.status}`}
              >
                {spaceData.status}
              </Badge>
              <Button onClick={() => setIsEditModalOpen(true)} aria-label={"Edit space"}>
                Edit Space
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-hidden bg-white">
            <DialogHeader>
              <DialogTitle>Edit Space</DialogTitle>
            </DialogHeader>
            <EditSpaceForm space={spaceData} onSubmit={handleEditSpace} onCancel={() => setIsEditModalOpen(false)} />
          </DialogContent>
        </Dialog>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Entity Relationships (now hidden) */}
          <div className="hidden"></div>

          {/* Main Content Area */}
          <div className="w-full">
            {/* Quick Info */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Capacity</div>
                  <div className="text-2xl font-semibold">{spaceData.capacity}</div>
                  <div className="text-sm text-gray-500">people</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Operating Hours</div>
                  <div className="text-2xl font-semibold">{spaceData.openTime}</div>
                  <div className="text-sm text-gray-500">to {spaceData.closeTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Minimum Booking</div>
                  <div className="text-2xl font-semibold">{spaceData.minimumBookingDuration}</div>
                  <div className="text-sm text-gray-500">hour</div>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="details" className="bg-white rounded-lg border" aria-label="Space details">
              <TabsList
                className="w-full border-b rounded-none h-auto p-0 flex flex-wrap"
                aria-label="Space detail sections"
              >
                <TabsTrigger
                  value="details"
                  className="flex gap-2 px-4 py-3 data-[state=active]:border-b-2 flex-grow"
                  aria-label="Details section"
                >
                  <Info className="w-4 h-4" aria-hidden="true" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="media"
                  className="flex gap-2 px-4 py-3 data-[state=active]:border-b-2 flex-grow"
                  aria-label="Media section"
                >
                  <ImageIcon className="w-4 h-4" aria-hidden="true" />
                  Media
                </TabsTrigger>
                <TabsTrigger
                  value="equipment"
                  className="flex gap-2 px-4 py-3 data-[state=active]:border-b-2 flex-grow"
                  aria-label="Equipment section"
                >
                  <Dumbbell className="w-4 h-4" aria-hidden="true" />
                  Equipment
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="flex gap-2 px-4 py-3 data-[state=active]:border-b-2 flex-grow"
                  aria-label="Availability section"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Availability
                </TabsTrigger>
                <TabsTrigger
                  value="roles"
                  className="flex gap-2 px-4 py-3 data-[state=active]:border-b-2 flex-grow"
                  aria-label="User Roles & Permissions section"
                >
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  User Roles & Permissions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Space ID</div>
                        <div className="font-medium">{spaceData.id}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{spaceData.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Google Maps</div>
                        <a
                          href={spaceData.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          View Location
                        </a>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Access Type</div>
                        <div className="font-medium">{spaceData.accessType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-medium">{spaceData.status}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Last Modified</div>
                        <div className="font-medium">{new Date(spaceData.lastModified).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Activities</h3>
                    <div className="flex flex-wrap gap-2">
                      {spaceData.activityTypes.map((activity) => (
                        <Badge key={activity} variant="secondary">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Features</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {spaceData.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Access Control */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Access Control</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Proxy Door ID</div>
                        <div className="font-medium">{spaceData.proxyDoorId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Vationx Reader ID</div>
                        <div className="font-medium">{spaceData.vationxReaderId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Reader Group ID</div>
                        <div className="font-medium">{spaceData.vationxReaderGroupId}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Cover Photo</h3>
                    <div className="relative">
                      <Image
                        src={spaceData.coverPhoto || "/placeholder.svg"}
                        alt={getSpaceImageAlt(params.id, "cover")}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-[400px]"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                        {getSpaceImageCaption(params.id, "cover")}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Image
                          src={spaceData.photos[0] || "/placeholder.svg"}
                          alt={getSpaceImageAlt(params.id, "gallery1")}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-[200px]"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                          {getSpaceImageCaption(params.id, "gallery1")}
                        </div>
                      </div>
                      <div className="relative">
                        <Image
                          src={spaceData.photos[1] || "/placeholder.svg"}
                          alt={getSpaceImageAlt(params.id, "gallery2")}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-[200px]"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                          {getSpaceImageCaption(params.id, "gallery2")}
                        </div>
                      </div>
                      <div className="relative">
                        <Image
                          src={spaceData.photos[2] || "/placeholder.svg"}
                          alt={getSpaceImageAlt(params.id, "gallery3")}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-[200px]"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                          {getSpaceImageCaption(params.id, "gallery3")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">360° View</h3>
                    <a
                      href={spaceData.photo360Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View 360° Photo Tour
                    </a>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="equipment" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">{spaceData.equipmentsTitle}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {spaceData.equipments.map((equipment) => (
                        <div key={equipment} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Dumbbell className="w-4 h-4 text-gray-400" />
                          {equipment}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="availability" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Unavailable Dates</h3>
                    <div className="space-y-2">
                      {spaceData.unavailableDates.map((date, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>From: {date.from}</span>
                          </div>
                          <span>To: {date.to}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roles" className="p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">User Roles & Permissions</h3>
                  {renderEntityRelationships()}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get appropriate alt text based on space ID and image type
function getSpaceImageAlt(spaceId: string, imageType: string): string {
  if (spaceId === "3") {
    // Palace Three - Pilates Studio
    switch (imageType) {
      case "cover":
        return "Palace Three Pilates Studio - Main Studio Area"
      case "gallery1":
        return "Palace Three Pilates Studio - Reformer Equipment"
      case "gallery2":
        return "Palace Three Pilates Studio - Studio View"
      case "gallery3":
        return "Palace Three Pilates Studio - Full Studio View"
      default:
        return "Palace Three Pilates Studio"
    }
  } else if (spaceId === "4") {
    // Palace Four - Premium Gym
    switch (imageType) {
      case "cover":
        return "Palace Four Premium Gym - Strength Training Area"
      case "gallery1":
        return "Palace Four Premium Gym - Power Rack and Free Weights"
      case "gallery2":
        return "Palace Four Premium Gym - Functional Training Area"
      case "gallery3":
        return "Palace Four Premium Gym - Strength Training Equipment"
      default:
        return "Palace Four Premium Gym"
    }
  } else {
    // Palace One and Two - Standard Gym
    switch (imageType) {
      case "cover":
        return "Palace Fitness Center - Main Workout Area"
      case "gallery1":
        return "Palace Fitness Center - Free Weights Area"
      case "gallery2":
        return "Palace Fitness Center - Power Rack Area"
      case "gallery3":
        return "Palace Fitness Center - Strength Equipment"
      default:
        return "Palace Fitness Center"
    }
  }
}

// Helper function to get appropriate caption text based on space ID and image type
function getSpaceImageCaption(spaceId: string, imageType: string): string {
  if (spaceId === "3") {
    // Palace Three - Pilates Studio
    switch (imageType) {
      case "cover":
        return "Pilates Studio"
      case "gallery1":
        return "Reformer Equipment"
      case "gallery2":
        return "Studio View"
      case "gallery3":
        return "Full Studio View"
      default:
        return "Pilates Studio"
    }
  } else if (spaceId === "4") {
    // Palace Four - Premium Gym
    switch (imageType) {
      case "cover":
        return "Premium Strength Training Area"
      case "gallery1":
        return "Power Rack and Free Weights"
      case "gallery2":
        return "Functional Training Area"
      case "gallery3":
        return "Strength Training Equipment"
      default:
        return "Premium Gym"
    }
  } else {
    // Palace One and Two - Standard Gym
    switch (imageType) {
      case "cover":
        return "Main Workout Area"
      case "gallery1":
        return "Free Weights Area"
      case "gallery2":
        return "Power Rack Area"
      case "gallery3":
        return "Strength Equipment"
      default:
        return "Fitness Center"
    }
  }
}

