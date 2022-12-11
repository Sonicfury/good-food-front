export type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  address1: string
  address2: string
  zipCode: string
  city: string
  primaryPhone: string
  secondaryPhone: string
  birthDate: string
  createdAt: string
  updatedAt: string
  disableAt: boolean
  roles: [
    {
      id: number
      name: string
    },
  ]
}
