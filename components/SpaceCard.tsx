"use client"

import Link from "next/link"
import { Users, CircleDot, ArrowRight, Trash2 } from "lucide-react"
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

interface SpaceCardProps {
  space: Space
  onDelete: (id: string) => void
}

export function SpaceCard({ space, onDelete }: SpaceCardProps) {
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
    <Card className="hover:shadow-md transition-all duration-200 group h-full flex flex-col relative hover:border-[#858889] hover:bg-white">
      <CardContent className="p-4 flex-grow relative">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200 leading-tight">
              {space.name}
            </h3>
            <Badge
              variant="secondary"
              className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                space.status,
              )}`}
            >
              <CircleDot className="w-3 h-3 mr-1 text-[#77866E]" />
              {space.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-[#77866E]" />
              <span>{space.capacity} capacity</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-between items-center relative flex-wrap gap-2">
        <Link
          href={`/space/${space.id}`}
          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-[#77866E] hover:bg-[#EAD3AB] hover:text-[#242A34] h-9 rounded-full px-3"
        >
          View Details
          <ArrowRight className="ml-1 w-4 h-4 text-[#77866E]" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-red-500 transition-colors duration-200"
              aria-label={`Delete ${space.name}`}
            >
              <Trash2 className="w-4 h-4 text-[#E57373]" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this space?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the space "{space.name}" and remove all
                associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(space.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

