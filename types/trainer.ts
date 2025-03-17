export interface TrainerExpertise {
  strengthTraining?: boolean
  functionalTraining?: boolean
  highIntensityIntervalTraining?: boolean
  sportsSpecificTraining?: boolean
  stretchingAndMobility?: boolean
  fatLossAndToning?: boolean
  weightManagement?: boolean
}

export interface TrainerCertification {
  nationalAcademyOfSportsMedicine?: boolean
  certifiedPersonalTrainer?: boolean
  certifiedNutritionCoach?: boolean
  certifiedWellnessCoach?: boolean
}

export interface TrainerSession {
  id: string
  type: "1-on-1" | "2-on-1" | "3-on-1"
  date: string
  time: string
  status: "completed" | "upcoming" | "cancelled"
  clientId: string
  location: string
}

export interface TrainerExperience {
  position: string
  company: string
  duration: string
}

export interface TrainerBookingHistory {
  sessionId: string
  date: string
  time: string
  type: string
  status: string
  client: string
}

export interface TrainerInsurance {
  name: string
  address: string
  phoneNumber: string
  email: string
  trainingTypeOffered: string
  equipmentTypeUsed: string
  contractualAgreement: string
  clientsPerWeek: number
  trainingHoursPerWeek: number
  sessionsPerWeek: number
  trainerToClientRatio: string
  averageSessionDuration: string
  clientsAge: string
  qualificationAndCertification: string
  previousInsuranceClaimed: boolean
  previousInsuranceDeclined: boolean
  hasEverDeclaredBankruptcy: boolean
}

export interface TrainerAvailability {
  unavailableTimeslots: {
    dayOfWeek: string
    fromTime: string
    toTime: string
  }[]
  unavailableDates: string[]
}

export interface Trainer {
  id?: string
  name: string
  number: string
  position: string
  gender: string
  birthday: string
  profileHeadline: string
  professionalSummary: string
  yearsStarted: {
    year: number
    numberOfYears: number
  }
  payThroughFPS: boolean
  certifiedPractitioner: boolean
  liabilityInsurance: boolean
  taxIDPassportNumber: string
  levelOfProfessionalDemnificationInsurance: string
  legalProceedingInLast5Years: string
  expertise: TrainerExpertise
  certifications: TrainerCertification
  languages: string[]
  pricing: {
    oneOnOne: number
    twoOnOne: number
    threeOnOne: number
  }
  experience: TrainerExperience[]
  contractualAgreement: {
    fromTime: string
    toTime: string
  }
  bankAccountInfo: {
    accountNumber: string
    accountHolderName: string
  }
  remarks: string
  bookingHistory: TrainerBookingHistory[]
  sessionTypes: ("1-on-1" | "2-on-1" | "3-on-1")[]
  expiryDate: string
  promoCode: string
  createdAt: string
  updatedAt: string
  status: "Active" | "Inactive" | "Pending"
  availability: TrainerAvailability
  insurance: TrainerInsurance
}

