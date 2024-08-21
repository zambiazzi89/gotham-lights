export type LatLong = {
  lat: number
  lng: number
}

export type Signal = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  locationName: string
  latitude: number
  longitude: number
  dateOfEncounter: Date
  title: string
  content: string
  createdByUserId: string | null
}

export type User = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  kindeId: string
  firstName: string | null
  lastName: string | null
  emailAddress: string | null
  username: string | null
}
