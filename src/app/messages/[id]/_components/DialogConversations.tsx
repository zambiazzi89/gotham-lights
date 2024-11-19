import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ConversationWithParticipants } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import ConversationSnippetCard from './ConversationSnippetCard'
import { redirect } from 'next/navigation'

export function DialogConversations({
  conversations,
  username,
}: {
  conversations: ConversationWithParticipants[]
  username: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button variant="outline">Conversations</Button>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="h-full">
          <div className="p-4">
            {conversations.map((conversation) => {
              if (!conversation.conversation_participants[0]) {
                console.error(
                  'Invalid scenario, conversation_participants[0] is undefined',
                  conversation
                )
                redirect('/error?code=conversation_participants')
              }
              return (
                <DialogClose asChild key={conversation.id}>
                  <Link href={`/messages/${conversation.id}`}>
                    <ConversationSnippetCard
                      to_username={
                        conversation.conversation_participants[0]
                          .participant_username
                      }
                      lastMessage={conversation.last_message}
                      timestamp={
                        conversation.updated_at || conversation.created_at
                      }
                      selected={false}
                      lastByUser={username === conversation.last_sent_by}
                      read={
                        username === conversation.last_sent_by
                          ? true
                          : conversation.read
                      }
                      status={conversation.status}
                    />
                  </Link>
                </DialogClose>
              )
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
