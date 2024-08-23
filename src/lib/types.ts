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
}
export type SignalWithUsername = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  locationName: string
  latitude: number
  longitude: number
  dateOfEncounter: Date
  title: string
  content: string
  user: { username: string | null } | null
}

export type SignalComment = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  content: string
  createdByUserId: string | null
  SignalId: string
  user: { username: string | null } | null
}

export type SignalWithCommentAndUsername = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  locationName: string
  latitude: number
  longitude: number
  dateOfEncounter: Date
  title: string
  content: string
  Comment: SignalComment[]
  user: { username: string | null } | null
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
