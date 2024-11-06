import { Card } from '@/components/ui/card'
import ChatMessages from './ChatMessages'
import MessageRequestApproval from './MessageRequestApproval'
import ChatTextarea from './ChatTextarea'
import { ConversationWithMessagesAndParticipants } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MdMoreVert } from 'react-icons/md'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function ChatContent({
  username,
  conversation,
  status,
}: {
  username: string
  conversation: ConversationWithMessagesAndParticipants
  status: string
}) {
  if (!conversation.conversation_participants[0]) {
    console.error(
      'Invalid scenario, conversation_participants[0] is undefined',
      conversation
    )
    redirect('/error')
  }

  const recipientUsername =
    conversation.conversation_participants[0].participant_username

  return (
    <Card className="bg-secondary flex flex-col flex-grow p-4">
      <div className="flex pt-2 pb-4 justify-end">
        <div>{recipientUsername}</div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdMoreVert className="text-xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-secondary">
            <DropdownMenuItem>
              <Link
                href={`/block-report/${recipientUsername}`}
                className="text-destructive w-full"
              >
                Block | Report
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
