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
      messages: {
        orderBy: {
          created_at: 'desc', // Order messages by creation date in descending order
        },
        take: 1, // Only take the latest message },
      },
    },
  })

  return (
    <div className="h-full flex p-4 gap-4">
      <ConversationSnippets conversations={conversations} />
      <ChatContent />
    </div>
  )
}
