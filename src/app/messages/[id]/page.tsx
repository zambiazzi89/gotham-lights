import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import {
  ConversationWithMessagesAndParticipants,
  ConversationWithParticipants,
} from '@/lib/types'
import {
  getConversationWithMessagesAndParticipants,
  getConversationWithParticipants,
} from './_actions/getConversationsAndMessages'
import updateConversationAsRead from './_actions/updateConversationAsRead'
import ConversationSnippets from './_components/ConversationSnippets'
import { DialogConversations } from './_components/DialogConversations'
import ChatContent from './_components/ChatContent'

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

  const selectedConversation: ConversationWithMessagesAndParticipants | null =
    await getConversationWithMessagesAndParticipants(
      profile.username,
      conversationId
    )

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
      <div className="h-full flex flex-col items-center lg:flex-row lg:p-4 gap-4">
        <div className="hidden lg:block">
          <ConversationSnippets
            conversations={conversations}
            username={profile.username}
          />
        </div>
        <div className="lg:hidden">
          <DialogConversations
            conversations={conversations}
            username={profile.username}
          />
        </div>
        <div className="w-full">
          <ChatContent
            username={profile.username}
            conversation={selectedConversation}
            status={selectedConversation.status}
          />
        </div>
      </div>
    </div>
  )
}
