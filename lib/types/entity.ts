export type EntityRole = 'Developer' | 'Operator' | 'Corporate' | 'Employee'

export interface Entity {
  id: string
  name: string
  role: EntityRole
  parentId?: string // For hierarchical relationships
  mappedSpaces: string[] // IDs of spaces mapped to this entity
  allocatedHours: number
  reservedHours: number // Hours reserved for internal employee use
  availableHours: number
  employees: Employee[]
  mappedEntities: string[] // IDs of entities mapped to this one
}

export interface Employee {
  id: string
  name: string
  entityId: string
  allocatedHours: number
}

export interface AllocationPermission {
  canAllocateToOperators: boolean
  canAllocateToCorporates: boolean
  canReserveHours: boolean
}

export interface AccessPermission {
  canView: boolean
  canEdit: boolean
}

export const getRolePermissions = (role: EntityRole): AllocationPermission => {
  switch (role) {
    case 'Developer':
      return {
        canAllocateToOperators: true,
        canAllocateToCorporates: true,
        canReserveHours: true
      }
    case 'Operator':
      return {
        canAllocateToOperators: false,
        canAllocateToCorporates: true,
        canReserveHours: true
      }
    default:
      return {
        canAllocateToOperators: false,
        canAllocateToCorporates: false,
        canReserveHours: false
      }
  }
}

export const getAccessPermissions = (userRole: EntityRole, targetRole: EntityRole): AccessPermission => {
  switch (userRole) {
    case 'Developer':
      return {
        canView: targetRole === 'Operator' || targetRole === 'Corporate',
        canEdit: false
      }
    case 'Operator':
      return {
        canView: targetRole === 'Corporate',
        canEdit: false
      }
    default:
      return {
        canView: false,
        canEdit: false
      }
  }
} 