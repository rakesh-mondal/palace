"use client"

import Link from "next/link"
import { Users, CircleDot, ArrowRight, Trash2, MoreVertical, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Space } from "@/lib/store"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SpaceCardProps {
  space: Space
  onEdit: (space: Space) => void
  onDelete: (space: Space) => void
}

export function SpaceCard({ space, onEdit, onDelete }: SpaceCardProps) {
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
    <div className="card">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{space.name}</h3>
            <p className="text-body-sm text-muted-foreground">{space.district}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(space)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(space)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-body-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{space.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-body-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Capacity: {space.capacityLimit}</span>
          </div>
          <div className="flex items-center space-x-2 text-body-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{space.openTime} - {space.closeTime}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant={space.status === 'Active' ? 'default' : 'secondary'}>
            {space.status}
          </Badge>
        </div>

        <div className="mt-4">
          <Link href={`/space/${space.id}`}>
            <Button variant="outline" className="w-full">
              View Space
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

