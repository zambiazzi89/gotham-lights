import { Card } from '@/components/ui/card'
import ChatMessages from './ChatMessages'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import db from '@/db/db'
import MessageRequestApproval from './MessageRequestApproval'
import ChatTextarea from './ChatTextarea'

export default async function ChatContent({
  conversationId,
  status,
}: {
  conversationId: string
  status: string
}) {
  const profile = await getDbProfileFromServer()

  const messages = await db.message.findMany({
    where: {
      conversation_id: conversationId,
    },
    orderBy: {
      created_at: 'asc',
    },
  })

  return (
    <Card className="bg-secondary flex flex-col flex-grow p-4">
      <ChatMessages username={profile.username} messages={messages} />
      {status === 'Pending' ? (
        <div className="h-[50%] flex flex-col items-center justify-center">
          {messages[0].from_username !== profile.username ? (
            <MessageRequestApproval
              from_username={messages[0].from_username}
              conversationId={conversationId}
            />
          ) : (
            <>
              <div>Your message is pending approval from the recipient.</div>
              <div>If approved, the chat will be enabled.</div>
            </>
          )}
        </div>
      ) : (
        <ChatTextarea conversationId={conversationId} />
      )}
    </Card>
  )
}
