"use client"

import { useCallback, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"

const ResponsiveHeatMap = dynamic(() => import("@nivo/heatmap").then((mod) => mod.ResponsiveHeatMap), { ssr: false })

// Mock data formatted specifically for Nivo heatmap
const initialMockData = [
  {
    id: "Monday",
    data: [
      { x: "Morning", y: 45 },
      { x: "Afternoon", y: 60 },
      { x: "Evening", y: 30 },
    ],
  },
  {
    id: "Tuesday",
    data: [
      { x: "Morning", y: 50 },
      { x: "Afternoon", y: 55 },
      { x: "Evening", y: 35 },
    ],
  },
  {
    id: "Wednesday",
    data: [
      { x: "Morning", y: 55 },
      { x: "Afternoon", y: 65 },
      { x: "Evening", y: 40 },
    ],
  },
  {
    id: "Thursday",
    data: [
      { x: "Morning", y: 40 },
      { x: "Afternoon", y: 70 },
      { x: "Evening", y: 45 },
    ],
  },
  {
    id: "Friday",
    data: [
      { x: "Morning", y: 35 },
      { x: "Afternoon", y: 50 },
      { x: "Evening", y: 55 },
    ],
  },
  {
    id: "Saturday",
    data: [
      { x: "Morning", y: 25 },
      { x: "Afternoon", y: 40 },
      { x: "Evening", y: 50 },
    ],
  },
  {
    id: "Sunday",
    data: [
      { x: "Morning", y: 20 },
      { x: "Afternoon", y: 30 },
      { x: "Evening", y: 25 },
    ],
  },
]

// Add this new constant for space-specific data
const spaceTypeData = {
  strength: [
    {
      id: "Monday",
      data: [
        { x: "Morning", y: 50 },
        { x: "Afternoon", y: 65 },
        { x: "Evening", y: 35 },
      ],
    },
    {
      id: "Tuesday",
      data: [
        { x: "Morning", y: 55 },
        { x: "Afternoon", y: 70 },
        { x: "Evening", y: 40 },
      ],
    },
    {
      id: "Wednesday",
      data: [
        { x: "Morning", y: 60 },
        { x: "Afternoon", y: 75 },
        { x: "Evening", y: 45 },
      ],
    },
    {
      id: "Thursday",
      data: [
        { x: "Morning", y: 45 },
        { x: "Afternoon", y: 80 },
        { x: "Evening", y: 50 },
      ],
    },
    {
      id: "Friday",
      data: [
        { x: "Morning", y: 40 },
        { x: "Afternoon", y: 55 },
        { x: "Evening", y: 60 },
      ],
    },
    {
      id: "Saturday",
      data: [
        { x: "Morning", y: 30 },
        { x: "Afternoon", y: 45 },
        { x: "Evening", y: 55 },
      ],
    },
    {
      id: "Sunday",
      data: [
        { x: "Morning", y: 25 },
        { x: "Afternoon", y: 35 },
        { x: "Evening", y: 30 },
      ],
    },
  ],
  physio: [
    {
      id: "Monday",
      data: [
        { x: "Morning", y: 40 },
        { x: "Afternoon", y: 55 },
        { x: "Evening", y: 25 },
      ],
    },
    {
      id: "Tuesday",
      data: [
        { x: "Morning", y: 45 },
        { x: "Afternoon", y: 60 },
        { x: "Evening", y: 30 },
      ],
    },
    {
      id: "Wednesday",
      data: [
        { x: "Morning", y: 50 },
        { x: "Afternoon", y: 65 },
        { x: "Evening", y: 35 },
      ],
    },
    {
      id: "Thursday",
      data: [
        { x: "Morning", y: 35 },
        { x: "Afternoon", y: 70 },
        { x: "Evening", y: 40 },
      ],
    },
    {
      id: "Friday",
      data: [
        { x: "Morning", y: 30 },
        { x: "Afternoon", y: 45 },
        { x: "Evening", y: 50 },
      ],
    },
    {
      id: "Saturday",
      data: [
        { x: "Morning", y: 20 },
        { x: "Afternoon", y: 35 },
        { x: "Evening", y: 45 },
      ],
    },
    {
      id: "Sunday",
      data: [
        { x: "Morning", y: 15 },
        { x: "Afternoon", y: 25 },
        { x: "Evening", y: 20 },
      ],
    },
  ],
  yoga: [
    {
      id: "Monday",
      data: [
        { x: "Morning", y: 60 },
        { x: "Afternoon", y: 50 },
        { x: "Evening", y: 45 },
      ],
    },
    {
      id: "Tuesday",
      data: [
        { x: "Morning", y: 65 },
        { x: "Afternoon", y: 55 },
        { x: "Evening", y: 50 },
      ],
    },
    {
      id: "Wednesday",
      data: [
        { x: "Morning", y: 70 },
        { x: "Afternoon", y: 60 },
        { x: "Evening", y: 55 },
      ],
    },
    {
      id: "Thursday",
      data: [
        { x: "Morning", y: 55 },
        { x: "Afternoon", y: 65 },
        { x: "Evening", y: 60 },
      ],
    },
    {
      id: "Friday",
      data: [
        { x: "Morning", y: 50 },
        { x: "Afternoon", y: 40 },
        { x: "Evening", y: 65 },
      ],
    },
    {
      id: "Saturday",
      data: [
        { x: "Morning", y: 40 },
        { x: "Afternoon", y: 30 },
        { x: "Evening", y: 60 },
      ],
    },
    {
      id: "Sunday",
      data: [
        { x: "Morning", y: 35 },
        { x: "Afternoon", y: 25 },
        { x: "Evening", y: 30 },
      ],
    },
  ],
  pilates: [
    {
      id: "Monday",
      data: [
        { x: "Morning", y: 35 },
        { x: "Afternoon", y: 45 },
        { x: "Evening", y: 40 },
      ],
    },
    {
      id: "Tuesday",
      data: [
        { x: "Morning", y: 40 },
        { x: "Afternoon", y: 50 },
        { x: "Evening", y: 45 },
      ],
    },
    {
      id: "Wednesday",
      data: [
        { x: "Morning", y: 45 },
        { x: "Afternoon", y: 55 },
        { x: "Evening", y: 50 },
      ],
    },
    {
      id: "Thursday",
      data: [
        { x: "Morning", y: 30 },
        { x: "Afternoon", y: 60 },
        { x: "Evening", y: 55 },
      ],
    },
    {
      id: "Friday",
      data: [
        { x: "Morning", y: 25 },
        { x: "Afternoon", y: 35 },
        { x: "Evening", y: 60 },
      ],
    },
    {
      id: "Saturday",
      data: [
        { x: "Morning", y: 15 },
        { x: "Afternoon", y: 25 },
        { x: "Evening", y: 55 },
      ],
    },
    {
      id: "Sunday",
      data: [
        { x: "Morning", y: 10 },
        { x: "Afternoon", y: 20 },
        { x: "Evening", y: 25 },
      ],
    },
  ],
}

export function SpaceUtilizationHeatmap() {
  const [spaceType, setSpaceType] = useState<string>("all")
  const [specificSpace, setSpecificSpace] = useState<string>("all")

  const mockData = useMemo(() => {
    if (spaceType === "all") return initialMockData
    return spaceTypeData[spaceType as keyof typeof spaceTypeData] || initialMockData
  }, [spaceType])

  const handleSpaceTypeChange = useCallback((value: string) => {
    setSpaceType(value)
  }, [])

  const handleSpecificSpaceChange = useCallback((value: string) => {
    setSpecificSpace(value)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Space Utilization</CardTitle>
        <div className="flex space-x-4">
          <Select onValueChange={handleSpaceTypeChange} defaultValue={spaceType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select space type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="strength">Strength Training</SelectItem>
              <SelectItem value="physio">Physiotherapy</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="pilates">Pilates</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSpecificSpaceChange} defaultValue={specificSpace}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select specific space" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Spaces</SelectItem>
              <SelectItem value="space1">Space 1</SelectItem>
              <SelectItem value="space2">Space 2</SelectItem>
              <SelectItem value="space3">Space 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height: "400px" }}>
          {typeof window !== "undefined" && (
            <ResponsiveHeatMap
              data={mockData}
              margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
              valueFormat=">-.2s"
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: "",
                legendOffset: 46,
              }}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time of Day",
                legendPosition: "middle",
                legendOffset: 36,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Day",
                legendPosition: "middle",
                legendOffset: -72,
              }}
              colors={{
                type: "sequential",
                scheme: "greens",
              }}
              emptyColor="#555555"
              borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
              annotations={[]}
              isInteractive={true}
              hoverTarget="cell"
              cellHoverOthersOpacity={0.25}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SpaceUtilizationHeatmap

