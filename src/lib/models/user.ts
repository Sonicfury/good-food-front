import type { Role } from './role'

export type User = {
  id: number
  email: string
  firstname: string
  lastname: string
  address1?: string
  address2?: string
  zipCode?: string
  city?: string
  primaryPhone: string
  secondaryPhone?: string
  birthDate?: Date
  createdAt: Date
  updatedAt: Date
  disabledAt?: Date
  roles: Role[]
}
