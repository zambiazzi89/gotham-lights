import db from '@/db/db'
import { Conversation } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function MessageBox({ username }: { username: string }) {
  const conversations: Conversation[] = await db.conversation.findMany({
    where: {
      conversation_participants: { some: { participant_username: username } },
    },
    orderBy: {
      updated_at: 'desc',
    },
  })

  if (conversations.length > 0) {
    redirect(`/messages/${conversations[0].id}`)
  }

  return (
    <div className="h-full flex p-4 gap-4">
      <div className="grid w-full place-content-center">
        No messages to display yet. Message someone!
      </div>
    </div>
  )
}
