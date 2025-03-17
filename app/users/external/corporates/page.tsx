"use client"

import { ExternalUserPage } from "@/components/ExternalUserPage"

// Mock data for spaces
const spaces = [
  { id: "space1", name: "Yoga Studio A", type: "Studio", capacity: 20 },
  { id: "space2", name: "Gym Space B", type: "Gym", capacity: 50 },
  { id: "space3", name: "Multi-purpose Room C", type: "Multi-purpose", capacity: 30 },
]

// Enhanced dummy data for corporates
const dummyCorporates = [
  {
    id: "COR00001",
    name: "Deloitte",
    registeredAddress: "35/F One Pacific Place, 88 Queensway, Hong Kong",
    mobileNumber: "+85295678901",
    email: "hkinfo@deloitte.com",
    assignedSpaces: ["space1", "space2", "space3"],
    status: "Active",
    createdAt: "2023-05-20T10:00:00Z",
    updatedAt: "2023-10-10T09:45:00Z",
    type: "Corporate",
    associatedSpacesCount: 5,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Deloitte%20&%20Touche-jKXNcIt8qJ68TmAjjD4HJYZGEJ8MGJ.png",
    websiteUrl: "https://www2.deloitte.com/hk/en.html",
  },
  {
    id: "COR00002",
    name: "CLSA",
    registeredAddress: "18/F, One Pacific Place, 88 Queensway, Hong Kong",
    mobileNumber: "+85296789012",
    email: "info@clsa.com",
    assignedSpaces: ["space2", "space3"],
    status: "Active",
    createdAt: "2023-06-15T14:30:00Z",
    updatedAt: "2023-11-05T11:20:00Z",
    type: "Corporate",
    associatedSpacesCount: 3,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5UnZQby9vG1qtMkrPbulaTrEiIbvbf.png",
    websiteUrl: "https://www.clsa.com",
  },
  {
    id: "COR00003",
    name: "CBRE",
    registeredAddress: "Level 27, One Pacific Place, 88 Queensway, Hong Kong",
    mobileNumber: "+852 2820 2800",
    email: "corpcomm@cbre.com",
    assignedSpaces: ["space1", "space2"],
    status: "Active",
    createdAt: "2023-07-01T08:00:00Z",
    updatedAt: "2023-12-15T16:30:00Z",
    type: "Corporate",
    associatedSpacesCount: 2,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-03-05%20at%2009.11.19%402x-QaFG7zq6Y8rWzlzdRRYVuBxLnjNFhS.png",
    websiteUrl: "https://www.cbre.com.hk/",
  },
  {
    id: "COR00004",
    name: "Carlyle Group Inc.",
    registeredAddress: "Central, Hong Kong",
    mobileNumber: "+852 9095 1337",
    email: "info@carlyle.com",
    assignedSpaces: ["space1"],
    status: "Active",
    createdAt: "2023-08-10T09:15:00Z",
    updatedAt: "2023-12-20T14:25:00Z",
    type: "Corporate",
    associatedSpacesCount: 1,
    logo: "/placeholder.svg?height=80&width=200",
    websiteUrl: "https://www.carlyle.com/",
  },
  {
    id: "COR00005",
    name: "Audemars Piguet Holdings",
    registeredAddress: "Causeway Bay, Hong Kong",
    mobileNumber: "+852 2375 2800",
    email: "info@audemarspiguet.com",
    assignedSpaces: ["space2"],
    status: "Active",
    createdAt: "2023-09-05T11:30:00Z",
    updatedAt: "2024-01-15T10:45:00Z",
    type: "Corporate",
    associatedSpacesCount: 1,
    logo: "/placeholder.svg?height=80&width=200",
    websiteUrl: "https://www.audemarspiguet.com/com/en/home.html",
  },
  {
    id: "COR00006",
    name: "Christie's",
    registeredAddress: "Central, Hong Kong",
    mobileNumber: "+852 2760 1766",
    email: "info@christies.com",
    assignedSpaces: ["space3"],
    status: "Active",
    createdAt: "2023-10-12T13:45:00Z",
    updatedAt: "2024-02-08T09:30:00Z",
    type: "Corporate",
    associatedSpacesCount: 1,
    logo: "/placeholder.svg?height=80&width=200",
    websiteUrl: "https://www.christies.com/",
  },
]

export default function CorporatesPage() {
  return <ExternalUserPage userType="Corporate" initialUsers={dummyCorporates} spaces={spaces} />
}

