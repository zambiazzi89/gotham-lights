import { Card } from '@/components/ui/card'
import ChatMessages from './ChatMessages'
import MessageRequestApproval from './MessageRequestApproval'
import ChatTextarea from './ChatTextarea'
import { ConversationWithMessages } from '@/lib/types'

export default function ChatContent({
  username,
  conversation,
  status,
}: {
  username: string
  conversation: ConversationWithMessages
  status: string
}) {
  return (
    <Card className="bg-secondary flex flex-col flex-grow p-4">
      <ChatMessages username={username} messages={conversation.messages} />
      {status === 'Pending' ? (
        <div className="h-[50%] flex flex-col items-center justify-center">
          {conversation.messages[0].from_username !== username ? (
            <MessageRequestApproval
              from_username={conversation.messages[0].from_username}
              conversationId={conversation.id}
            />
          ) : (
            <>
              <div>Your message is pending approval from the recipient.</div>
              <div>If approved, the chat will be enabled.</div>
            </>
          )}
        </div>
      ) : (
        <ChatTextarea conversationId={conversation.id} />
      )}
    </Card>
  )
}
