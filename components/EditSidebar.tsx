"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { InternalUserForm } from "@/components/InternalUserForm"

interface EditSidebarProps {
  isOpen: boolean
  onClose: () => void
  userData: any
  onSubmit: (data: any) => void
  spaces: { id: string; name: string }[]
}

export function EditSidebar({ isOpen, onClose, userData, onSubmit, spaces }: EditSidebarProps) {
  const handleSubmit = (data: any) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white">
        <SheetHeader>
          <SheetTitle>Edit {userData?.role}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-6">
          <InternalUserForm onSubmit={handleSubmit} initialData={userData} spaces={spaces} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

