import ConversationSnippets from './ConversationSnippets'
import ChatContent from './ChatContent'
import { DialogConversations } from './DialogConversations'
import {
  ConversationWithMessages,
  ConversationWithParticipants,
} from '@/lib/types'

export default function RealtimeChat({
  username,
  conversations,
  selectedConversation,
}: {
  username: string
  conversations: ConversationWithParticipants[]
  selectedConversation: ConversationWithMessages
}) {
  return (
    <div className="h-full flex flex-col items-center lg:flex-row lg:p-4 gap-4">
      <div className="hidden lg:block">
        <ConversationSnippets
          conversations={conversations}
          username={username}
        />
      </div>
      <div className="lg:hidden">
        <DialogConversations
          conversations={conversations}
          username={username}
        />
      </div>
      <div className="w-full">
        <ChatContent
          username={username}
          conversation={selectedConversation}
          status={selectedConversation.status}
        />
      </div>
    </div>
  )
}
