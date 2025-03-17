"use client"

import { ExternalUserPage } from "@/components/ExternalUserPage"

// Mock data for spaces
const spaces = [
  { id: "space1", name: "Yoga Studio A", type: "Studio", capacity: 20 },
  { id: "space2", name: "Gym Space B", type: "Gym", capacity: 50 },
  { id: "space3", name: "Multi-purpose Room C", type: "Multi-purpose", capacity: 30 },
]

// Enhanced dummy data for operators
const dummyOperators = [
  {
    id: "OPR00001",
    name: "JLL (Jones Lang LaSalle)",
    registeredAddress: "7/F, One Taikoo Place, 979 King's Road, Quarry Bay, Hong Kong",
    mobileNumber: "+85293456789",
    email: "contact.hk@jll.com",
    assignedSpaces: ["space1", "space2", "space3"],
    status: "Active",
    createdAt: "2023-03-10T13:45:00Z",
    updatedAt: "2023-08-15T10:20:00Z",
    type: "Operator",
    associatedSpacesCount: 15,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JLL-RmpbPxsK0IGisorlexDCIsAyqrBmkB.png",
    websiteUrl: "https://www.jll.com.hk",
  },
  {
    id: "OPR00002",
    name: "WeWork",
    registeredAddress: "535 Jaffe Road, Causeway Bay, Hong Kong",
    mobileNumber: "+85294567890",
    email: "hk@wework.com",
    assignedSpaces: ["space2", "space3"],
    status: "Active",
    createdAt: "2023-04-05T08:30:00Z",
    updatedAt: "2023-09-01T15:10:00Z",
    type: "Operator",
    associatedSpacesCount: 12,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-15%20at%2010.18.40@2x-ZDXZMWhwmiVvHsaKftU22lLBrYOqPz.png",
    websiteUrl: "https://www.wework.com",
  },
]

export default function OperatorsPage() {
  return <ExternalUserPage userType="Operator" initialUsers={dummyOperators} spaces={spaces} />
}

