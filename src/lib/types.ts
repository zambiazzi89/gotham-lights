export type LatLong = {
  lat: number
  lng: number
}

export type Signal = {
  id: string
  createdAt: Date
  updatedAt: Date
  locationName: string
  latitude: number
  longitude: number
  dateOfEncounter: Date
  title: string
  content: string
  createdByUserId: string | null
}
