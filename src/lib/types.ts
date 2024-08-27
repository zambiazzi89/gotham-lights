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
  createdByUsername: string | null
}

export type SignalComment = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  content: string
  createdByUsername: string | null
  SignalId: string
  profile: { username: string | null } | null
}

export type SignalWithComment = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  locationName: string
  latitude: number
  longitude: number
  dateOfEncounter: Date
  title: string
  content: string
  createdByUsername: string | null
  comments: SignalComment[]
}

export type Profile = {
  id: string
  created_at: Date
  updated_at: Date | null
  first_name: string | null
  last_name: string | null
  email_address: string | null
  username: string | null
}
