import * as React from 'react'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import ConversationSnippetCard from './ConversationSnippetCard'
import { Conversation } from '@/lib/types'

export default function ConversationSnippets({
  conversations,
  username,
}: {
  conversations: Conversation[]
  username: string
}) {
  return (
    <Card className="h-[75svh] overflow-y-auto py-4 self-center">
      <ScrollArea className="h-full">
        <div className="p-4">
          {conversations.map((conversation) => (
            <ConversationSnippetCard
              key={conversation.id}
              to_username={
                conversation.conversation_participants[0].participant_username
              }
              lastMessage={conversation.last_message}
              timestamp={conversation.updated_at || conversation.created_at}
              selected={false}
              lastByUser={username === conversation.last_sent_by}
              read={
                username === conversation.last_sent_by
                  ? true
                  : conversation.read
              }
              status={conversation.status}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
