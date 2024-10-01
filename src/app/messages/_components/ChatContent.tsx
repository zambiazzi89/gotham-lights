import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ChatMessages from './ChatMessages'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import db from '@/db/db'

export default async function ChatContent({
  conversationId,
  status,
}: {
  conversationId: string
  status: string
}) {
  const profile = await getDbProfileFromServer()

  const messages = await db.message.findMany({
    where: {
      conversation_id: conversationId,
    },
    orderBy: {
      created_at: 'asc',
    },
  })

  return (
    <Card className="bg-secondary flex flex-col flex-grow p-4">
      <ChatMessages username={profile.username} messages={messages} />
      {status === 'Pending' ? (
        <div className=" w-full flex flex-col items-center justify-center">
          <div>Your message is pending approval from the recipient.</div>
          <div>Please be patient. Once approved, the chat will be enabled.</div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Textarea />
          <Button variant={'outline'} className="h-full">
            Send
          </Button>
        </div>
      )}
    </Card>
  )
}
