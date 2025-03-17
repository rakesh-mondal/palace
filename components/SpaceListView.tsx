"use client"

import Link from "next/link"
import { Users, CircleDot, ArrowRight, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Space } from "@/lib/store"

interface SpaceListViewProps {
  spaces: Space[]
  onDelete: (id: string) => void
}

export function SpaceListView({ spaces, onDelete }: SpaceListViewProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-500 bg-green-50"
      case "inactive":
        return "text-gray-500 bg-gray-100"
      default:
        return "text-yellow-500 bg-yellow-50"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spaces.map((space) => (
          <TableRow key={space.id}>
            <TableCell className="font-medium">{space.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#77866E]" />
                <span>{space.capacity}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                  space.status,
                )}`}
              >
                <CircleDot className="w-3 h-3 mr-1 text-[#77866E]" />
                {space.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-dark transition-colors duration-200 p-1 -m-1 rounded-md"
                >
                  <Link href={`/space/${space.id}`} className="flex items-center">
                    View
                    <ArrowRight className="ml-1 w-4 h-4 text-[#77866E]" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1 -m-1 rounded-md"
                  onClick={() => onDelete(space.id)}
                  aria-label={`Delete ${space.name}`}
                >
                  <Trash2 className="w-4 h-4 text-[#E57373]" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

