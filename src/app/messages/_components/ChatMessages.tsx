import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

type Message = {
  id: string
  createdAt: Date
  fromUser: string
  toUser: string
  content: string
}

const messages: Message[] = [
  {
    id: '1',
    createdAt: new Date(2024, 8, 10),
    fromUser: 'johndoe',
    toUser: 'diegobz',
    content: 'Hello, how are you?',
  },
  {
    id: '2',
    createdAt: new Date(2024, 8, 11),
    fromUser: 'diegobz',
    toUser: 'johndoe',
    content: 'Good, you?',
  },
  {
    id: '3',
    createdAt: new Date(2024, 8, 10),
    fromUser: 'johndoe',
    toUser: 'diegobz',
    content: 'Lorem ipsum dolor sit amet, ',
  },
  {
    id: '4',
    createdAt: new Date(2024, 8, 11),
    fromUser: 'diegobz',
    toUser: 'johndoe',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  },
  {
    id: '5',
    createdAt: new Date(2024, 8, 10),
    fromUser: 'diegobz',
    toUser: 'johndoe',
    content: 'What about you?',
  },
  {
    id: '6',
    createdAt: new Date(2024, 8, 11),
    fromUser: 'johndoe',
    toUser: 'diegobz',
    content: 'Not much',
  },
  {
    id: '7',
    createdAt: new Date(),
    fromUser: 'johndoe',
    toUser: 'diegobz',
    content: 'Hello, how are you?',
  },
]

export default async function ChatMessages() {
  const profile = await getDbProfileFromServer()

  return (
    <div className="bg-background flex-grow mb-4 border-2 h-[60svh] overflow-y-auto">
      <ScrollArea className="h-full  px-2">
        {messages.map((message) => {
          return profile.username === message.fromUser ? (
            <Card
              key={message.id}
              className="w-fit p-4 my-2 bg-primary-20 ml-auto"
            >
              <div>{message.content}</div>
              <div>{message.createdAt.toLocaleString()}</div>
            </Card>
          ) : (
            <Card key={message.id} className="w-fit p-4 my-2">
              <div>{message.content}</div>
              <div>{message.createdAt.toLocaleString()}</div>
            </Card>
          )
        })}
      </ScrollArea>
    </div>
  )
}
