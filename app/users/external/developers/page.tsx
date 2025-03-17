"use client"

import { ExternalUserPage } from "@/components/ExternalUserPage"

export const dynamic = "force-dynamic"

// Mock data for spaces
const spaces = [
  { id: "space1", name: "Yoga Studio A", type: "Studio", capacity: 20 },
  { id: "space2", name: "Gym Space B", type: "Gym", capacity: 50 },
  { id: "space3", name: "Multi-purpose Room C", type: "Multi-purpose", capacity: 30 },
]

// Enhanced dummy data for developers
const dummyDevelopers = [
  {
    id: "DEV00001",
    name: "Swire Properties",
    registeredAddress: "33/F, One Pacific Place, 88 Queensway, Hong Kong",
    mobileNumber: "+85291234567",
    email: "contact@swireproperties.com",
    assignedSpaces: ["space1", "space2", "space3"],
    status: "Active",
    createdAt: "2023-01-15T09:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
    type: "Developer",
    projectCount: 8,
    associatedSpacesCount: 5,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Swire%20Properties-qIURFXPlxBNA9dIU4nDhF9G3mdJOKX.png",
    websiteUrl: "https://www.swireproperties.com",
  },
  {
    id: "DEV00002",
    name: "Henderson Land",
    registeredAddress: "456 Future Avenue, Hong Kong",
    mobileNumber: "+852 2908 8338",
    email: "Portfolio.Leasing@hld.com",
    assignedSpaces: ["space2", "space3"],
    status: "Active",
    createdAt: "2023-02-01T11:15:00Z",
    updatedAt: "2023-07-05T16:30:00Z",
    type: "Developer",
    projectCount: 3,
    associatedSpacesCount: 2,
    logo: "https://sjc.microlink.io/0YtZRGYqBR8MvhhH9xY3yZmiVRbFxWbslnfH9zK1lNMzd1nDmPE23dkWhKrAF6Sv-5ZbXhVe1LkKkRDrMFoHcQ.jpeg",
    websiteUrl: "https://www.hld.com/en",
  },
]

export default function DevelopersPage() {
  return <ExternalUserPage userType="Developer" initialUsers={dummyDevelopers} spaces={spaces} />
}

