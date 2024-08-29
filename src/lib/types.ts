export type LatLong = {
  lat: number
  lng: number
}

export type Signal = {
  id: string
  created_at: Date
  updated_at: Date | null
  location_name: string
  latitude: number
  longitude: number
  date_encounter: Date
  title: string
  content: string
  created_by_username: string | null
}

export type SignalComment = {
  id: string
  created_at: Date
  updated_at: Date | null
  content: string
  created_by_username: string | null
  signal_id: string
  profile: { username: string | null } | null
}

export type SignalWithComment = {
  id: string
  created_at: Date
  updated_at: Date | null
  location_name: string
  latitude: number
  longitude: number
  date_encounter: Date
  title: string
  content: string
  created_by_username: string | null
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
