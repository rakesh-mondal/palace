"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateAllocationPage() {
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
    toast({
      title: "Allocation Created",
      description: "The credit allocation has been created successfully.",
    })
    router.push("/credit-allocation")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/credit-allocation"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Credit Allocation
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Credit Allocation</CardTitle>
          <CardDescription>
            Allocate credits to entities and set their available hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Entity Type</Label>
                <Select>
                  <SelectTrigger id="entityType">
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Entity</Label>
                <Select>
                  <SelectTrigger id="entity">
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entity1">Entity 1</SelectItem>
                    <SelectItem value="entity2">Entity 2</SelectItem>
                    <SelectItem value="entity3">Entity 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Available Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="Enter available hours"
                  min="0"
                />
              </div>

              <div>
                <Label>Valid From</Label>
                <Input
                  id="validFrom"
                  type="date"
                />
              </div>

              <div>
                <Label>Valid Until</Label>
                <Input
                  id="validUntil"
                  type="date"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.push("/credit-allocation")}>
                Cancel
              </Button>
              <Button type="submit">Create Allocation</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}