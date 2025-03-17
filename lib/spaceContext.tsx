"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import type { Space } from "@/types/space"

// If the above import doesn't work, add this type definition:
// type Space = {
//   id: string
//   name: string
//   description: string
//   // Add other properties as needed
// }

interface SpaceContextType {
  spaces: Space[]
  loading: boolean
  error: string | null
  fetchSpaces: () => Promise<void>
  updateSpace: (updatedSpace: Space) => Promise<void>
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined)

export const useSpaceContext = () => {
  const context = useContext(SpaceContext)
  if (!context) {
    throw new Error("useSpaceContext must be used within a SpaceProvider")
  }
  return context
}

export const SpaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSpaces = async () => {
    setLoading(true)
    setError(null)
    try {
      // Mock data
      const mockSpaces: Space[] = [
        { id: "1", name: "Space 1", description: "Description 1" },
        { id: "2", name: "Space 2", description: "Description 2" },
      ]
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSpaces(mockSpaces)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(`Failed to fetch spaces. ${errorMessage}`)
      console.error("Error fetching spaces:", err)
      toast({
        title: "Error fetching spaces",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateSpace = async (updatedSpace: Space) => {
    setLoading(true)
    setError(null)
    try {
      // In a real application, this would be an API call
      const response = await fetch(`/api/spaces/${updatedSpace.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpace),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      setSpaces(spaces.map((space) => (space.id === updatedSpace.id ? updatedSpace : space)))
      toast({
        title: "Space updated successfully",
        description: "The space details have been updated.",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(`Failed to update space. ${errorMessage}`)
      console.error("Error updating space:", err)
      toast({
        title: "Error updating space",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpaces()
  }, [fetchSpaces]) // Added fetchSpaces to the dependency array

  return (
    <SpaceContext.Provider value={{ spaces, loading, error, fetchSpaces, updateSpace }}>
      {children}
    </SpaceContext.Provider>
  )
}

