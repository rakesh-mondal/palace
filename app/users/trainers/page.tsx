"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrainerDetailsModal } from "@/components/TrainerDetailsModal"
import { EditTrainerModal } from "@/components/EditTrainerModal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import type { Trainer } from "@/types/trainer"

// Mock data
const mockTrainers: Trainer[] = [
  {
    name: "John Smith",
    number: "TR001",
    profilePic: "/placeholder.svg",
    position: "Personal Trainer",
    gender: "Male",
    birthday: "1990-01-01",
    profileHeadline: "Expert Personal Trainer with 10+ years experience",
    professionalSummary: "Specialized in strength training and rehabilitation",
    yearsStarted: {
      year: 2014,
      numberOfYears: 10,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "A123456",
    levelOfProfessionalDemnificationInsurance: "Premium",
    legalProceedingInLast5Years: false,
    expertise: {
      strengthTraining: ["Functional training", "High intensity interval training", "Sports specific training"],
    },
    certifications: {
      nasm: ["Certified personal trainer", "Certified nutrition coach"],
    },
    languages: ["English", "Cantonese"],
    pricing: {
      oneOnOne: 800,
      twoOnOne: 1200,
      threeOnOne: 1500,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "Sarah Chen",
    number: "TR002",
    profilePic: "/placeholder.svg",
    position: "Physiotherapist",
    gender: "Female",
    birthday: "1988-05-15",
    profileHeadline: "Sports Physiotherapist & Rehabilitation Specialist",
    professionalSummary: "Expert in sports injuries and rehabilitation",
    yearsStarted: {
      year: 2012,
      numberOfYears: 12,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "B234567",
    levelOfProfessionalDemnificationInsurance: "Premium Plus",
    legalProceedingInLast5Years: false,
    expertise: {
      physiotherapy: ["Sports massage", "Musculoskeletal", "Sports Physiotherapy"],
    },
    certifications: {
      aaspf: ["Sports massage certification"],
    },
    languages: ["English", "Mandarin Chinese", "Cantonese"],
    pricing: {
      oneOnOne: 1000,
      twoOnOne: 1800,
      threeOnOne: 2400,
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "Emily Wong",
    number: "TR003",
    profilePic: "/placeholder.svg",
    position: "Yoga Instructor",
    gender: "Female",
    birthday: "1992-08-20",
    profileHeadline: "Certified Yoga Instructor & Mindfulness Coach",
    professionalSummary: "Specializing in mat yoga and meditation",
    yearsStarted: {
      year: 2016,
      numberOfYears: 8,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "C345678",
    levelOfProfessionalDemnificationInsurance: "Standard",
    legalProceedingInLast5Years: false,
    expertise: {
      yoga: ["Mat yoga"],
    },
    languages: ["English", "Cantonese"],
    pricing: {
      oneOnOne: 700,
      twoOnOne: 1100,
      threeOnOne: 1400,
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "Michael Chang",
    number: "TR004",
    profilePic: "/placeholder.svg",
    position: "Pilates Instructor",
    gender: "Male",
    birthday: "1985-11-30",
    profileHeadline: "Classical Pilates Expert",
    professionalSummary: "Specialized in classical and contemporary Pilates",
    yearsStarted: {
      year: 2010,
      numberOfYears: 14,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "D456789",
    levelOfProfessionalDemnificationInsurance: "Premium",
    legalProceedingInLast5Years: false,
    expertise: {
      pilates: ["Classic pilates", "Contemporary Pilates"],
    },
    languages: ["English", "Mandarin Chinese"],
    pricing: {
      oneOnOne: 900,
      twoOnOne: 1600,
      threeOnOne: 2100,
    },
    createdAt: "2024-01-25",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "David Lee",
    number: "TR005",
    profilePic: "/placeholder.svg",
    position: "Personal Trainer",
    gender: "Male",
    birthday: "1989-03-25",
    profileHeadline: "Weight Management & Strength Training Specialist",
    professionalSummary: "Focus on weight loss and muscle building",
    yearsStarted: {
      year: 2015,
      numberOfYears: 9,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "E567890",
    levelOfProfessionalDemnificationInsurance: "Standard",
    legalProceedingInLast5Years: false,
    expertise: {
      strengthTraining: ["Weight management", "Fat loss and toning", "Functional training"],
    },
    certifications: {
      faa: ["Certified personal trainer"],
    },
    languages: ["English", "Korean"],
    pricing: {
      oneOnOne: 750,
      twoOnOne: 1300,
      threeOnOne: 1800,
    },
    createdAt: "2024-01-30",
    updatedAt: "2024-02-24",
    status: "Inactive",
  },
  {
    name: "Lisa Wang",
    number: "TR006",
    profilePic: "/placeholder.svg",
    position: "Physiotherapist",
    gender: "Female",
    birthday: "1987-07-12",
    profileHeadline: "Specialized in Sports Injuries & Rehabilitation",
    professionalSummary: "Expert in injury prevention and recovery",
    yearsStarted: {
      year: 2011,
      numberOfYears: 13,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "F678901",
    levelOfProfessionalDemnificationInsurance: "Premium Plus",
    legalProceedingInLast5Years: false,
    expertise: {
      physiotherapy: ["Sports Physiotherapy", "Acupuncture/dry needling"],
    },
    languages: ["English", "Mandarin Chinese"],
    pricing: {
      oneOnOne: 950,
      twoOnOne: 1700,
      threeOnOne: 2300,
    },
    createdAt: "2024-02-01",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "Tom Wilson",
    number: "TR007",
    profilePic: "/placeholder.svg",
    position: "Personal Trainer",
    gender: "Male",
    birthday: "1993-09-08",
    profileHeadline: "Sports Performance Specialist",
    professionalSummary: "Focused on athletic performance enhancement",
    yearsStarted: {
      year: 2017,
      numberOfYears: 7,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "G789012",
    levelOfProfessionalDemnificationInsurance: "Standard",
    legalProceedingInLast5Years: false,
    expertise: {
      strengthTraining: ["Sports specific training", "High intensity interval training"],
    },
    languages: ["English", "French"],
    pricing: {
      oneOnOne: 800,
      twoOnOne: 1400,
      threeOnOne: 1900,
    },
    createdAt: "2024-02-05",
    updatedAt: "2024-02-24",
    status: "Pending",
  },
  {
    name: "Grace Liu",
    number: "TR008",
    profilePic: "/placeholder.svg",
    position: "Yoga Instructor",
    gender: "Female",
    birthday: "1991-12-15",
    profileHeadline: "Aerial Yoga Specialist",
    professionalSummary: "Expert in aerial and mat yoga techniques",
    yearsStarted: {
      year: 2015,
      numberOfYears: 9,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "H890123",
    levelOfProfessionalDemnificationInsurance: "Premium",
    legalProceedingInLast5Years: false,
    expertise: {
      yoga: ["Mat yoga", "Aerial yoga"],
    },
    languages: ["English", "Mandarin Chinese", "Cantonese"],
    pricing: {
      oneOnOne: 850,
      twoOnOne: 1500,
      threeOnOne: 2000,
    },
    createdAt: "2024-02-10",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "Alex Kim",
    number: "TR009",
    profilePic: "/placeholder.svg",
    position: "Pilates Instructor",
    gender: "Male",
    birthday: "1986-04-20",
    profileHeadline: "Pre/Post Natal Pilates Specialist",
    professionalSummary: "Specialized in pre and post natal Pilates",
    yearsStarted: {
      year: 2013,
      numberOfYears: 11,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "I901234",
    levelOfProfessionalDemnificationInsurance: "Premium",
    legalProceedingInLast5Years: false,
    expertise: {
      pilates: ["Pre/Post natal pilates", "Classic pilates"],
    },
    languages: ["English", "Korean"],
    pricing: {
      oneOnOne: 900,
      twoOnOne: 1600,
      threeOnOne: 2100,
    },
    createdAt: "2024-02-15",
    updatedAt: "2024-02-24",
    status: "Active",
  },
  {
    name: "Sophie Zhang",
    number: "TR010",
    profilePic: "/placeholder.svg",
    position: "Physiotherapist",
    gender: "Female",
    birthday: "1990-06-28",
    profileHeadline: "Musculoskeletal Specialist",
    professionalSummary: "Expert in musculoskeletal rehabilitation",
    yearsStarted: {
      year: 2014,
      numberOfYears: 10,
    },
    payThroughFPS: true,
    certifiedPractitioner: true,
    liabilityInsurance: true,
    taxIDPassportNumber: "J012345",
    levelOfProfessionalDemnificationInsurance: "Premium Plus",
    legalProceedingInLast5Years: false,
    expertise: {
      physiotherapy: ["Musculoskeletal", "Stretch therapy"],
    },
    languages: ["English", "Mandarin Chinese"],
    pricing: {
      oneOnOne: 1000,
      twoOnOne: 1800,
      threeOnOne: 2400,
    },
    createdAt: "2024-02-20",
    updatedAt: "2024-02-24",
    status: "Active",
  },
]

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPosition, setFilterPosition] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [trainerToDelete, setTrainerToDelete] = useState<Trainer | null>(null)

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.position.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPosition =
        filterPosition === "all" || trainer.position.toLowerCase().replace(" ", "-") === filterPosition
      const matchesStatus = filterStatus === "all" || trainer.status === filterStatus

      return matchesSearch && matchesPosition && matchesStatus
    })
  }, [trainers, searchQuery, filterPosition, filterStatus])

  const handleEdit = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setIsEditModalOpen(true)
  }

  const handleDelete = (trainer: Trainer) => {
    setTrainerToDelete(trainer)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (trainerToDelete) {
      setTrainers(trainers.filter((t) => t.number !== trainerToDelete.number))
      toast({
        title: "Trainer deleted",
        description: `${trainerToDelete.name} has been removed from the system.`,
      })
      setTrainerToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleUpdateTrainer = (updatedTrainer: Trainer) => {
    setTrainers(trainers.map((t) => (t.number === updatedTrainer.number ? updatedTrainer : t)))
    setIsEditModalOpen(false)
    toast({
      title: "Trainer updated",
      description: "The trainer information has been updated successfully.",
    })
  }

  const handleDeactivate = (trainer: Trainer) => {
    // Update the trainer status to "Inactive"
    const updatedTrainer = { ...trainer, status: "Inactive", updatedAt: new Date().toISOString() }
    setTrainers(trainers.map((t) => (t.number === trainer.number ? updatedTrainer : t)))
    toast({
      title: "Trainer deactivated",
      description: `${trainer.name} has been deactivated and can no longer accept new bookings.`,
    })
  }

  const handleActivate = (trainer: Trainer) => {
    // Update the trainer status to "Active"
    const updatedTrainer = { ...trainer, status: "Active", updatedAt: new Date().toISOString() }
    setTrainers(trainers.map((t) => (t.number === trainer.number ? updatedTrainer : t)))
    toast({
      title: "Trainer activated",
      description: `${trainer.name} has been activated and can now accept new bookings.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <Button
          onClick={() => {
            setSelectedTrainer(null)
            setIsEditModalOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trainers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] max-w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search trainers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="personal-trainer">Personal Trainer</SelectItem>
                <SelectItem value="physiotherapist">Physiotherapist</SelectItem>
                <SelectItem value="yoga-instructor">Yoga Instructor</SelectItem>
                <SelectItem value="pilates-instructor">Pilates Instructor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainers.map((trainer) => (
                <TableRow key={trainer.number}>
                  <TableCell>{trainer.number}</TableCell>
                  <TableCell>{trainer.name}</TableCell>
                  <TableCell>{trainer.position}</TableCell>
                  <TableCell>{trainer.languages.join(", ")}</TableCell>
                  <TableCell>{getStatusBadge(trainer.status)}</TableCell>
                  <TableCell>{trainer.yearsStarted.numberOfYears} years</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTrainer(trainer)
                            setIsViewModalOpen(true)
                          }}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(trainer)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {trainer.status === "Active" ? (
                          <DropdownMenuItem onClick={() => handleDeactivate(trainer)} className="text-orange-600">
                            Deactivate
                          </DropdownMenuItem>
                        ) : trainer.status === "Inactive" ? (
                          <DropdownMenuItem onClick={() => handleActivate(trainer)} className="text-green-600">
                            Activate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleDelete(trainer)} className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Modal */}
      {selectedTrainer && (
        <TrainerDetailsModal
          trainer={selectedTrainer}
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {/* Edit Modal */}
      <EditTrainerModal
        trainer={selectedTrainer}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateTrainer}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the trainer
              {trainerToDelete && ` ${trainerToDelete.name}`} and remove their data from the system. Consider
              deactivating the trainer instead to retain historical data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

