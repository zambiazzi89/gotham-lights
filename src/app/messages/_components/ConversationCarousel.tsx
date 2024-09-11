import * as React from 'react'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import ConversationSnippetCard from './ConversationSnippetCard'

const dummySnippets = [
  {
    id: 1,
    username: 'johndoe',
    lastMessage: 'Hello, how are you?',
    timestamp: new Date().toLocaleString(),
    selected: true,
  },
  {
    id: 2,
    username: 'janedoe',
    lastMessage: 'Sure why not!',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    username: 'ashton',
    lastMessage: 'Hi!',
    timestamp: new Date().toLocaleString(),
    newMessage: true,
  },
  {
    id: 4,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 5,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 6,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 7,
    username: 'user1234',
    lastMessage: 'I think so.',
    timestamp: new Date().toLocaleString(),
  },
]

export default function ConversationCarousel() {
  return (
    <Card className="h-[85svh] overflow-y-auto w-80 py-4">
      <ScrollArea className="h-full">
        <div className="p-4">
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
