export type SignalCardType = {
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
