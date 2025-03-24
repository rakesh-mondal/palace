"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Entity, EntityRole, Employee, getRolePermissions, getAccessPermissions } from '@/lib/types/entity'

interface EntityContextType {
  entities: Entity[]
  currentUserRole: EntityRole
  addEntity: (entity: Omit<Entity, 'id'>) => void
  allocateHours: (fromEntityId: string, toEntityId: string, hours: number) => boolean
  reserveHours: (entityId: string, hours: number) => boolean
  addEmployee: (entityId: string, employee: Omit<Employee, 'id' | 'entityId'>) => boolean
  canAllocateHours: (fromEntityId: string, toEntityId: string) => boolean
  canViewEntity: (entityId: string) => boolean
  getMappedEntities: (entityId: string) => Entity[]
}

const EntityContext = createContext<EntityContextType | undefined>(undefined)

export function EntityProvider({ children }: { children: ReactNode }) {
  const [entities, setEntities] = useState<Entity[]>([])
  const [currentUserRole, setCurrentUserRole] = useState<EntityRole>('Developer') // Default role for testing

  const addEntity = useCallback((entity: Omit<Entity, 'id'>) => {
    const newEntity: Entity = {
      ...entity,
      id: Math.random().toString(36).substr(2, 9),
    }
    setEntities(prev => [...prev, newEntity])
  }, [])

  const allocateHours = useCallback((fromEntityId: string, toEntityId: string, hours: number) => {
    const fromEntity = entities.find(e => e.id === fromEntityId)
    const toEntity = entities.find(e => e.id === toEntityId)

    if (!fromEntity || !toEntity || !canAllocateHours(fromEntityId, toEntityId)) {
      return false
    }

    if (fromEntity.availableHours < hours) {
      return false
    }

    setEntities(prev => prev.map(entity => {
      if (entity.id === fromEntityId) {
        return {
          ...entity,
          availableHours: entity.availableHours - hours
        }
      }
      if (entity.id === toEntityId) {
        return {
          ...entity,
          allocatedHours: entity.allocatedHours + hours,
          availableHours: entity.availableHours + hours
        }
      }
      return entity
    }))

    return true
  }, [entities])

  const reserveHours = useCallback((entityId: string, hours: number) => {
    const entity = entities.find(e => e.id === entityId)
    if (!entity) return false

    const permissions = getRolePermissions(entity.role)
    if (!permissions.canReserveHours) return false

    if (entity.availableHours < hours) return false

    setEntities(prev => prev.map(e => {
      if (e.id === entityId) {
        return {
          ...e,
          reservedHours: e.reservedHours + hours,
          availableHours: e.availableHours - hours
        }
      }
      return e
    }))

    return true
  }, [entities])

  const addEmployee = useCallback((entityId: string, employee: Omit<Employee, 'id' | 'entityId'>) => {
    const entity = entities.find(e => e.id === entityId)
    if (!entity) return false

    const newEmployee: Employee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
      entityId
    }

    setEntities(prev => prev.map(e => {
      if (e.id === entityId) {
        return {
          ...e,
          employees: [...e.employees, newEmployee]
        }
      }
      return e
    }))

    return true
  }, [entities])

  const canAllocateHours = useCallback((fromEntityId: string, toEntityId: string) => {
    const fromEntity = entities.find(e => e.id === fromEntityId)
    const toEntity = entities.find(e => e.id === toEntityId)

    if (!fromEntity || !toEntity) return false

    const permissions = getRolePermissions(fromEntity.role)

    if (toEntity.role === 'Operator') {
      return permissions.canAllocateToOperators
    }
    if (toEntity.role === 'Corporate') {
      return permissions.canAllocateToCorporates
    }

    return false
  }, [entities])

  const canViewEntity = useCallback((entityId: string) => {
    const targetEntity = entities.find(e => e.id === entityId)
    if (!targetEntity) return false

    const permissions = getAccessPermissions(currentUserRole, targetEntity.role)
    return permissions.canView
  }, [entities, currentUserRole])

  const getMappedEntities = useCallback((entityId: string) => {
    const entity = entities.find(e => e.id === entityId)
    if (!entity) return []

    return entities.filter(e => entity.mappedEntities.includes(e.id))
  }, [entities])

  const value = {
    entities,
    currentUserRole,
    addEntity,
    allocateHours,
    reserveHours,
    addEmployee,
    canAllocateHours,
    canViewEntity,
    getMappedEntities
  }

  return <EntityContext.Provider value={value}>{children}</EntityContext.Provider>
}

export const useEntity = () => {
  const context = useContext(EntityContext)
  if (context === undefined) {
    throw new Error('useEntity must be used within an EntityProvider')
  }
  return context
} 