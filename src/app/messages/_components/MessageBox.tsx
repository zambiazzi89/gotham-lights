import db from '@/db/db'
import { Conversation } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function MessageBox({
  username,
  allBlocks,
}: {
  username: string
  allBlocks: string[]
}) {
  const conversations: Conversation[] = await db.conversation.findMany({
    where: {
      conversation_participants: {
        some: { participant_username: username },
        every: { participant_username: { notIn: allBlocks } },
      },
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
      <div className="flex flex-col w-full items-center">
        <div>No messages to display yet.</div>
        <div>Message someone!</div>
      </div>
    </div>
  )
}
