import ConversationSnippets from './ConversationSnippets'
import ChatContent from './ChatContent'
import db from '@/db/db'
import { Conversation } from '@/lib/types'

export default async function MessageBox({ username }: { username: string }) {
  const conversations: Conversation[] = await db.conversation.findMany({
    where: {
      conversation_participants: { some: { participant_username: username } },
    },
    include: {
      conversation_participants: {
        select: {
          participant_username: true,
        },
        where: { participant_username: { not: username } },
      },
    },
    orderBy: {
      updated_at: 'desc',
    },
  })

  return (
    <div className="h-full flex p-4 gap-4">
      {conversations.length > 0 ? (
        <>
          <ConversationSnippets
            conversations={conversations}
            username={username}
          />
          <ChatContent
            conversationId={conversations[0].id}
            status={conversations[0].status}
          />
        </>
      ) : (
        <div className="grid w-full place-content-center">
          No messages to display yet. Message someone!
        </div>
      )}
    </div>
  )
}
