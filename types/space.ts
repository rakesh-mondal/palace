export interface Space {
  id: string
  name: string
  type: string
  capacity: number
  location: string
  amenities: string[]
  availability: {
    start: string
    end: string
  }
  pricing: {
    hourly: number
    daily: number
    weekly: number
  }
  images: string[]
  description: string
}

export type { Space }

