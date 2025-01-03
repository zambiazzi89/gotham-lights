export type LatLong = {
  lat: number
  lng: number
}

export type Signal = {
  id: string
  created_at: Date
  updated_at: Date | null
  subway_line: string | null
  location_name: string
  latitude: number
  longitude: number
  date_encounter: Date
  title: string
  content: string
  created_by_username: string
  connection_found: boolean
}

export type SignalComment = {
  id: string
  created_at: Date
  updated_at: Date | null
  content: string
  created_by_username: string
  signal_id: string
}

export type SignalWithComments = {
  id: string
  created_at: Date
  updated_at: Date | null
  subway_line: string | null
  location_name: string
  latitude: number
  longitude: number
  date_encounter: Date
  title: string
  content: string
  created_by_username: string
  connection_found: boolean
  comments: SignalComment[]
}

export type SignalWithCommentsAndReads = {
  id: string
  created_at: Date
  updated_at: Date | null
  subway_line: string | null
  location_name: string
  latitude: number
  longitude: number
  date_encounter: Date
  title: string
  content: string
  created_by_username: string
  connection_found: boolean
  comments: SignalComment[]
  signal_read_by_username: SignalReadByUsername[]
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

export type ConversationWithMessagesAndParticipants = {
  id: string
  created_at: Date
  updated_at: Date | null
  status: string
  last_message: string
  last_sent_by: string
  read: boolean
  messages: Message[]
  conversation_participants: ConversationParticipant[]
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

export type SignalReadByUsername = {
  id: string
  created_at: Date
  updated_at: Date | null
  read: boolean
  signal_id: string
  username: string
}
