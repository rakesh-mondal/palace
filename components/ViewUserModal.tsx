"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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

// Note: This component doesn't use any console.log statements.
// For production, consider implementing proper error logging and handling.
// Example:
// - Use a logging service for critical errors
// - Implement user-friendly error messages for UI

interface ViewUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
  onEdit: (userData: any) => void
  onDelete: (userId: string) => void
  spaces: { id: string; name: string }[]
  description: string
}

export function ViewUserModal({ isOpen, onClose, user, onEdit, onDelete, spaces, description }: ViewUserModalProps) {
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false)

  const handleEdit = (userData: any) => {
    onEdit(userData)
    setIsEditSidebarOpen(false)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#FFFFFF]" description={description}>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View and manage user information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">User ID:</span>
            <span className="col-span-3">{user.userId}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Name:</span>
            <span className="col-span-3">{`${user.firstName} ${user.lastName}`}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Email:</span>
            <span className="col-span-3">{user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Mobile:</span>
            <span className="col-span-3">{user.mobileNumber}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Role:</span>
            <span className="col-span-3">{user.role}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">{user.status}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Created At:</span>
            <span className="col-span-3">{formatDate(user.createdAt)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Updated At:</span>
            <span className="col-span-3">{formatDate(user.updatedAt)}</span>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={() => setIsEditSidebarOpen(true)}>Edit</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user and remove their data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(user.userId)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}

