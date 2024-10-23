import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import RealtimeChat from './_components/RealtimeChat'
import {
  ConversationWithMessages,
  ConversationWithParticipants,
} from '@/lib/types'
import {
  getConversationWithMessages,
  getConversationWithParticipants,
} from './_actions/getConversationsAndMessages'
import updateConversationAsRead from './_actions/updateConversationAsRead'

export default async function MessagesById({
  params: id,
}: {
  params: { id: string }
}) {
  const { id: conversationId } = id
  const profile = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  const conversations: ConversationWithParticipants[] =
    await getConversationWithParticipants(profile.username)

  const selectedConversation: ConversationWithMessages | null =
    await getConversationWithMessages(profile.username, conversationId)

  if (!selectedConversation) {
    console.error('No conversation found for id', conversationId)
    redirect('/messages')
  }

  // If unread, mark it as read
  if (
    !selectedConversation.read &&
    selectedConversation?.last_sent_by !== profile.username
  ) {
    await updateConversationAsRead(selectedConversation.id)
  }

  return (
    <div className="w-full">
      <RealtimeChat
        username={profile.username}
        conversations={conversations}
        selectedConversation={selectedConversation}
      />
    </div>
  )
}
