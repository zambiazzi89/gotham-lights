import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import ConversationSnippetCard from './ConversationSnippetCard'
import { ConversationWithParticipants } from '@/lib/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function ConversationSnippets({
  conversations,
  username,
  selectedConversationId,
}: {
  conversations: ConversationWithParticipants[]
  username: string
  selectedConversationId: string
}) {
  return (
    <Card className="h-[75svh] overflow-y-auto self-center">
      <ScrollArea className="h-full">
        <div className="p-2">
          {conversations.map((conversation) => {
            if (!conversation.conversation_participants[0]) {
              console.error(
                'Invalid scenario, conversation_participants[0] is undefined',
                conversation
              )
              redirect('/error?code=conversation_participants')
            }
            return (
              <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                <ConversationSnippetCard
                  to_username={
                    conversation.conversation_participants[0]
                      .participant_username
                  }
                  lastMessage={conversation.last_message}
                  timestamp={conversation.updated_at || conversation.created_at}
                  selected={conversation.id === selectedConversationId}
                  lastByUser={username === conversation.last_sent_by}
                  read={
                    username === conversation.last_sent_by
                      ? true
                      : conversation.read
                  }
                  status={conversation.status}
                />
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </Card>
  )
}
