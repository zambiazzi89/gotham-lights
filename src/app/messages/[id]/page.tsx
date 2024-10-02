import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import {
  ConversationWithMessages,
  ConversationWithParticipants,
} from '@/lib/types'
import db from '@/db/db'
import { redirect } from 'next/navigation'
import ConversationSnippets from '../_components/ConversationSnippets'
import ChatContent from '../_components/ChatContent'

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
    await db.conversation.findMany({
      where: {
        conversation_participants: {
          some: { participant_username: profile.username },
        },
      },
      include: {
        conversation_participants: {
          select: {
            participant_username: true,
          },
          where: { participant_username: { not: profile.username } },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    })

  const selectedConversation: ConversationWithMessages | null =
    await db.conversation.findUnique({
      where: {
        conversation_participants: {
          some: { participant_username: profile.username },
        },
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    })

  if (!selectedConversation) {
    console.error('No conversation found for id', conversationId)
    redirect('/messages')
  }

  return (
    <div className="w-full">
      <div className="h-full flex p-4 gap-4">
        <ConversationSnippets
          conversations={conversations}
          username={profile.username}
        />
        <ChatContent
          conversationId={selectedConversation.id}
          status={selectedConversation.status}
        />
      </div>
    </div>
  )
}
