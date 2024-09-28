import * as React from 'react'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import ConversationSnippetCard from './ConversationSnippetCard'
import { Conversation } from '@/lib/types'

const dummySnippets = [
  {
    id: 1,
    username: 'johndoe',
    lastMessage: 'Hello, how are you?',
    timestamp: new Date(),
    selected: true,
  },
  {
    id: 2,
    username: 'janedoe',
    lastMessage: 'Sure why not!',
    timestamp: new Date(),
  },
  {
    id: 3,
    username: 'ashton',
    lastMessage: 'Hi!',
    timestamp: new Date(),
    newMessage: true,
  },
  {
    id: 4,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date(),
  },
  {
    id: 5,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date(),
  },
  {
    id: 6,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date(),
  },
  {
    id: 7,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date(),
  },
]

export default function ConversationSnippets({
  conversations,
}: {
  conversations: Conversation[]
}) {
  console.log(conversations)
  conversations.map((conversation) => console.log(conversation.messages))
  return (
    <Card className="h-[75svh] overflow-y-auto w-80 py-4 self-center">
      <ScrollArea className="h-full">
        <div className="p-4">
          {conversations.map((conversation) => (
            <ConversationSnippetCard
              key={conversation.id}
              username={conversation.messages[0].from_username}
              lastMessage={conversation.messages[0].content}
              timestamp={conversation.messages[0].created_at}
              selected={false}
              newMessage={true}
            />
          ))}
          {dummySnippets.map((snippet) => (
            <ConversationSnippetCard
              key={snippet.id}
              username={snippet.username}
              lastMessage={snippet.lastMessage}
              timestamp={snippet.timestamp}
              selected={snippet.selected}
              newMessage={snippet.newMessage}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
