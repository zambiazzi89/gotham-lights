import ConversationSnippets from './ConversationSnippets'
import ChatContent from './ChatContent'
import db from '@/db/db'
import { Conversation } from '@/lib/types'

export default async function MessageBox({ username }: { username: string }) {
  const conversations: Conversation[] = await db.conversation
    .findMany({
      where: {
        conversation_participants: { some: { participant_username: username } },
      },
      include: {
        messages: {
          orderBy: {
            created_at: 'desc', // Order messages by creation date in descending order
          },
        },
      },
    })
    .then((conversations) =>
      conversations.sort(
        (a, b) =>
          b.messages[0].created_at.getTime() -
          a.messages[0].created_at.getTime()
      )
    )

  return (
    <div className="h-full flex p-4 gap-4">
      {conversations.length > 0 ? (
        <>
          <ConversationSnippets conversations={conversations} />
          <ChatContent firstConversationMessages={conversations[0].messages} />
        </>
      ) : (
        <div className="grid w-full place-content-center">
          No messages to display yet. Message someone!
        </div>
      )}
    </div>
  )
}
