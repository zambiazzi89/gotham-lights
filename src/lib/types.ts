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
  created_by_username: string
}

export type SignalComment = {
  id: string
  created_at: Date
  updated_at: Date | null
  content: string
  created_by_username: string
  signal_id: string
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
  created_by_username: string
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

export type ProfileWithConversations = {
  id: string
  created_at: Date
  updated_at: Date | null
  first_name: string | null
  last_name: string | null
  email_address: string | null
  username: string | null
  conversations: ConversationParticipant[]
}

export type Conversation = {
  id: string
  created_at: Date
  updated_at: Date | null
  status: string
  last_message: string
  last_sent_by: string
  read: boolean
  messages?: Message[]
  conversation_participants?: ConversationParticipant[]
}

export type ConversationWithParticipants = {
  id: string
  created_at: Date
  updated_at: Date | null
  status: string
  last_message: string
  last_sent_by: string
  read: boolean
  messages?: Message[]
  conversation_participants: ConversationParticipant[]
}

export type ConversationWithMessages = {
  id: string
  created_at: Date
  updated_at: Date | null
  status: string
  last_message: string
  last_sent_by: string
  read: boolean
  messages: Message[]
  conversation_participants?: ConversationParticipant[]
}

export type ConversationParticipant = {
  participant_username: string
}

export type Message = {
  id: string
  created_at: Date
  updated_at: Date | null
  content: string
  conversation_id: string
  from_username: string
}
